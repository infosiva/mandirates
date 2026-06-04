import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(250,253,247,0.95)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(22,101,52,0.12)',
    }}>
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl">🌾</span>
          <span className="font-black text-lg tracking-tight">
            <span style={{ color: '#166534' }}>Mandi</span>
            <span style={{ color: '#d97706' }}>Rates</span>
          </span>
          <span className="hidden sm:inline text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(22,101,52,0.10)', color: '#166534', border: '1px solid rgba(22,101,52,0.2)' }}>
            LIVE
          </span>
        </Link>

        <div className="hidden md:flex flex-1 overflow-hidden mx-4 max-w-sm">
          <div className="ticker-track text-xs gap-6 flex" style={{ color: '#3d5a3d' }}>
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
          <Link href="/" className="px-3 py-1.5 rounded-lg transition-colors" style={{ color: '#3d5a3d' }}>Home</Link>
          <Link href="/msp" className="px-3 py-1.5 rounded-lg font-semibold" style={{ color: '#d97706' }}>MSP</Link>
          <Link href="/prices/tomato"
            className="px-4 py-1.5 rounded-lg font-bold text-white active:scale-[0.97]"
            style={{ background: 'linear-gradient(135deg,#166534,#15803d)', boxShadow: '0 2px 10px rgba(22,101,52,0.3)' }}>
            Prices →
          </Link>
        </div>
      </div>
    </nav>
  );
}
