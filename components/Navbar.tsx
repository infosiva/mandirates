import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-green-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="font-bold text-lg tracking-tight">
            Mandi<span className="text-yellow-300">Rates</span>
          </span>
        </Link>
        <div className="flex gap-4 text-sm font-medium">
          <Link
            href="/"
            className="hover:text-yellow-300 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/msp"
            className="hover:text-yellow-300 transition-colors"
          >
            MSP
          </Link>
          <Link
            href="/prices/tomato"
            className="hover:text-yellow-300 transition-colors"
          >
            Prices
          </Link>
        </div>
      </div>
    </nav>
  );
}
