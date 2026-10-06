// Consent-gated anonymous usage ping + structured error log. No new deps.
export function track(event: string, props: Record<string, string | number> = {}) {
  try {
    if (localStorage.getItem("cookie_consent_v1") !== "accepted") return;
    navigator.sendBeacon?.("/api/usage", JSON.stringify({ event, ...props, ts: Date.now() }));
  } catch {}
}
export function logError(scope: string, err: unknown) {
  console.error(JSON.stringify({ level: "error", scope, msg: err instanceof Error ? err.message : String(err), ts: new Date().toISOString() }));
}
