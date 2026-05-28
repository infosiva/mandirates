import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(6,12,6,0.80)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(22,163,74,0.12)' }}>
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="font-black text-lg tracking-tight">
            <span className="text-green-400">Mandi</span>
            <span className="text-amber-400">Rates</span>
          </span>
          <span className="hidden sm:inline text-[10px] font-semibold px-2 py-0.5 rounded-full ml-1" style={{ background: 'rgba(22,163,74,0.18)', color: '#4ade80', border: '1px solid rgba(22,163,74,0.3)' }}>
            LIVE
          </span>
        </Link>

        {/* Ticker strip */}
        <div className="hidden md:flex items-center overflow-hidden flex-1 mx-8 max-w-xs">
          <div className="ticker-track text-xs gap-6 flex" style={{ color: 'rgba(238,244,238,0.5)' }}>
            {["Tomato ₹2,400", "Onion ₹1,800", "Paddy ₹2,183", "Groundnut ₹5,600", "Banana ₹1,200", "Tomato ₹2,400", "Onion ₹1,800", "Paddy ₹2,183", "Groundnut ₹5,600", "Banana ₹1,200"].map((item, i) => (
              <span key={i} className="whitespace-nowrap flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" style={{ boxShadow: '0 0 4px rgba(74,222,128,0.6)' }} />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm font-medium">
          <Link href="/" className="px-3 py-1.5 rounded-lg transition-colors" style={{ color: 'rgba(238,244,238,0.7)' }}>
            Home
          </Link>
          <Link href="/msp" className="px-3 py-1.5 rounded-lg transition-colors text-amber-400">
            MSP
          </Link>
          <Link href="/prices/tomato" className="px-3 py-1.5 rounded-lg transition-colors text-white font-semibold" style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)', boxShadow: '0 2px 12px rgba(22,163,74,0.35)' }}>
            Prices →
          </Link>
        </div>
      </div>
    </nav>
  );
}
