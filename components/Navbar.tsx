import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="font-black text-lg tracking-tight">
            <span className="text-green-700">Mandi</span>
            <span className="text-amber-500">Rates</span>
          </span>
          <span className="hidden sm:inline text-[10px] font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full border border-green-200 ml-1">
            LIVE
          </span>
        </Link>

        {/* Ticker strip */}
        <div className="hidden md:flex items-center overflow-hidden flex-1 mx-8 max-w-xs">
          <div className="ticker-track text-xs text-gray-500 gap-6 flex">
            {["Tomato ₹2,400", "Onion ₹1,800", "Paddy ₹2,183", "Groundnut ₹5,600", "Banana ₹1,200", "Tomato ₹2,400", "Onion ₹1,800", "Paddy ₹2,183", "Groundnut ₹5,600", "Banana ₹1,200"].map((item, i) => (
              <span key={i} className="whitespace-nowrap flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm font-medium">
          <Link href="/" className="px-3 py-1.5 rounded-lg hover:bg-green-50 text-green-700 transition-colors">
            Home
          </Link>
          <Link href="/msp" className="px-3 py-1.5 rounded-lg hover:bg-amber-50 text-amber-700 transition-colors">
            MSP
          </Link>
          <Link href="/prices/tomato" className="px-3 py-1.5 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors">
            Prices →
          </Link>
        </div>
      </div>
    </nav>
  );
}
