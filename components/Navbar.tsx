import Link from "next/link";

export default function Navbar({ showMspLink = true }: { showMspLink?: boolean } = {}) {
  return (
    <nav className="mr-nav">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="MandiRates home">
          <span className="mr-logo" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="14" width="3.4" height="7" rx="1" fill="#fff" />
              <rect x="9.3" y="9.5" width="3.4" height="11.5" rx="1" fill="#fff" />
              <rect x="15.6" y="5" width="3.4" height="16" rx="1" fill="#fff" />
              <path d="M3 9l5-4 3.5 3L19 2M15 2h4v4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-black text-lg tracking-tight">
            <span style={{ color: "var(--ink)" }}>Mandi</span>
            <span style={{ color: "var(--accent-ink)" }}>Rates</span>
          </span>
        </Link>
        <div className="flex items-center gap-0.5 sm:gap-1 text-sm font-medium shrink-0">
          <Link href="/" className="mr-nav-link">Home</Link>
          {showMspLink && <Link href="/msp" className="mr-nav-link" style={{ color: "var(--accent-ink)", fontWeight: 600 }}>MSP</Link>}
          <Link href="/prices/tomato" className="mr-btn">Prices →</Link>
        </div>
      </div>
    </nav>
  );
}
