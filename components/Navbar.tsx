import { Logo } from '@/components/Logo'
import Link from "next/link";

export default function Navbar({ showMspLink = true }: { showMspLink?: boolean } = {}) {
  return (
    <nav className="mr-nav">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="MandiRates home">
          <Logo />
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
