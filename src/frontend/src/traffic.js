import { apiUrl } from "./api";

const SESSION_KEY = "site_session_id";
const TRAFFIC_KEY = "site_traffic_id";

let visitPromise = null;

export function getSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function getTrafficId() {
  const id = sessionStorage.getItem(TRAFFIC_KEY);
  return id ? Number(id) : null;
}

export function apiHeaders(extra = {}) {
  const trafficId = getTrafficId();
  return {
    "X-Session-Id": getSessionId(),
    ...(trafficId ? { "X-Traffic-Id": String(trafficId) } : {}),
    ...extra,
  };
}

async function postJson(path, body, { keepalive = false } = {}) {
  const response = await fetch(apiUrl(path), {
    method: "POST",
    headers: apiHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(body),
    keepalive,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `${path} failed (${response.status})${text ? `: ${text}` : ""}`,
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("json")) {
    return response.json();
  }

  return null;
}

/**
 * Record this tab's visit in traffic_logs. Resolves once per page load;
 * later calls reuse the same promise. Events should await this first.
 */
export function ensureVisit() {
  if (!visitPromise) {
    visitPromise = postJson("/api/web/visit", {
      sessionId: getSessionId(),
      referer: document.referrer || "",
    })
      .then((data) => {
        if (data?.trafficId) {
          sessionStorage.setItem(TRAFFIC_KEY, String(data.trafficId));
        }
        return data;
      })
      .catch((error) => {
        visitPromise = null;
        throw error;
      });
  }

  return visitPromise;
}

/** Log a user action to event_logs (waits for visit tracking first). */
export async function logEvent(eventName, detail) {
  await ensureVisit();

  const body = { event: eventName };
  if (detail != null && detail !== "") {
    body.detail = detail;
  }

  return postJson("/api/web/event", body);
}

/** Await event log, then navigate (prevents fetch abort on link clicks). */
export async function logEventThenNavigate(eventName, detail, navigate) {
  try {
    await logEvent(eventName, detail);
  } catch (error) {
    console.warn("Event logging failed", error);
  }
  navigate();
}
