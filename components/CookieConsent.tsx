"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { track } from "@/lib/telemetry";

const COOKIE_KEY = "cookie_consent_v1";

function grant(on: boolean) {
  try {
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("consent", "update", {
      analytics_storage: on ? "granted" : "denied",
    });
  } catch {}
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
    else { grant(consent === "accepted"); track("page_view", { path: location.pathname }); }
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_KEY, "accepted");
    grant(true);
    track("consent_accept");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(COOKIE_KEY, "declined");
    grant(false);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[9998] p-4 md:p-6 border-t backdrop-blur-sm"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm" style={{ color: "var(--ink-2)" }}>
          <p>
            We use cookies to improve your experience and show relevant ads via{" "}
            <strong>Google AdSense</strong>. By clicking
            &ldquo;Accept&rdquo; you consent to our use of cookies.{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
            {" · "}
            <Link href="/terms" className="underline">
              Terms
            </Link>
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-xs rounded-lg border transition-colors min-h-[44px]" style={{ borderColor: "var(--border)", color: "var(--ink-2)" }}
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-xs rounded-lg font-medium transition-colors min-h-[44px]" style={{ background: "var(--accent-ink)", color: "#fff" }}
          >
            Accept all cookies
          </button>
        </div>
      </div>
    </div>
  );
}
