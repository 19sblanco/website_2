// In the dev container, leave VITE_API_URL unset and use relative paths (Vite proxies /api).
// Set VITE_API_URL for direct backend access (e.g. production preview builds).
const apiBase = import.meta.env.VITE_API_URL ?? "";

export function apiUrl(path) {
  return `${apiBase}${path}`;
}
