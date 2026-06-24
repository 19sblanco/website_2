import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { GoogleAuth } from "google-auth-library";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT) || 8080;
const backendUrl = process.env.BACKEND_URL;
if (process.env.ProxyIamAuth) {
  const proxyIamAuth = process.env.ProxyIamAuth;
} else {
  const proxyIamAuth = false;
}

if (!backendUrl) {
  console.error("BACKEND_URL environment variable is required");
  process.exit(1);
}

const app = express();

app.get("/health", (_req, res) => {
  res.status(200).send("ok");
});

let idTokenClient;
async function getAuthorizationHeader() {
  if (!proxyIamAuth) {
    return undefined;
  }

  if (!idTokenClient) {
    const auth = new GoogleAuth();
    idTokenClient = await auth.getIdTokenClient(backendUrl);
  }

  const headers = await idTokenClient.getRequestHeaders();
  return headers.Authorization ?? headers.authorization;
}

app.use(
  async (req, res, next) => {
    if (!req.path.startsWith("/api")) {
      next();
      return;
    }

    if (!proxyIamAuth) {
      next();
      return;
    }

    try {
      const authorization = await getAuthorizationHeader();
      if (authorization) {
        req.headers.authorization = authorization;
      }
      next();
    } catch (err) {
      console.error("Failed to get identity token:", err);
      res.status(502).send("Failed to authenticate with backend");
    }
  },
  createProxyMiddleware({
    target: backendUrl,
    changeOrigin: true,
    pathFilter: "/api",
  }),
);

app.use(express.static(path.join(__dirname, "dist")));

// for files that don't start with /api, serve the index.html file
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(
    `Server listening on port ${port}, proxying /api to ${backendUrl}`,
  );
});
