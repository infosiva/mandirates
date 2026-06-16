import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(250,253,247,0.95)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(217,119,6,0.14)',
    }}>
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl">🌾</span>
          <span className="font-black text-lg tracking-tight">
            <span style={{ color: '#1c1410' }}>Mandi</span>
            <span style={{ color: '#d97706' }}>Rates</span>
          </span>
          <span className="hidden sm:inline text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(22,163,74,0.10)', color: '#16a34a', border: '1px solid rgba(22,163,74,0.2)' }}>
            LIVE
          </span>
        </Link>

        <div className="hidden md:flex flex-1 overflow-hidden mx-4 max-w-sm">
          <div className="ticker-track text-xs gap-6 flex" style={{ color: '#5c4a3a' }}>
            {["🌾 Wheat ₹2,183","🧅 Onion ₹1,800","🍅 Tomato ₹2,400","🥜 Groundnut ₹5,600","🫘 Soybean ₹4,200",
              "🌾 Wheat ₹2,183","🧅 Onion ₹1,800","🍅 Tomato ₹2,400","🥜 Groundnut ₹5,600","🫘 Soybean ₹4,200"].map((item, i) => (
              <span key={i} className="whitespace-nowrap flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#16a34a' }} />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm font-medium shrink-0">
          <Link href="/" className="px-3 py-1.5 rounded-lg transition-colors" style={{ color: '#5c4a3a' }}>Home</Link>
          <Link href="/msp" className="px-3 py-1.5 rounded-lg font-semibold" style={{ color: '#b45309' }}>MSP</Link>
          <Link href="/prices/tomato"
            className="px-4 py-1.5 rounded-lg font-bold text-white active:scale-[0.97] transition-transform"
            style={{ background: 'linear-gradient(135deg,#d97706,#b45309)', boxShadow: '0 2px 10px rgba(217,119,6,0.3)' }}>
            Prices →
          </Link>
        </div>
      </div>
    </nav>
  );
}
