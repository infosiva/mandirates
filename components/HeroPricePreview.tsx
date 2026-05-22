// components/HeroPricePreview.tsx — static preview of commodity prices shown in hero
// Sample data only — real data is fetched server-side in page.tsx
export default function HeroPricePreview() {
  const preview = [
    { commodity: 'Wheat',    mandi: 'Hapur, UP',       price: '₹2,183', trend: '+1.2%', up: true  },
    { commodity: 'Tomato',   mandi: 'Kolar, Karnataka', price: '₹2,400', trend: '-3.5%', up: false },
    { commodity: 'Onion',    mandi: 'Nashik, MH',      price: '₹1,800', trend: '+0.8%', up: true  },
  ]

  return (
    <div className="rounded-2xl border border-green-200 bg-white shadow-sm overflow-hidden mx-auto max-w-md">
      <div className="bg-gradient-to-r from-green-700 to-teal-700 px-4 py-2.5 flex items-center justify-between">
        <span className="text-white text-xs font-bold uppercase tracking-wider">Today&apos;s Sample Prices</span>
        <span className="flex items-center gap-1 text-green-200 text-[10px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
          Live
        </span>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-green-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold text-green-800">Commodity</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-green-800">Mandi</th>
            <th className="px-4 py-2 text-right text-xs font-semibold text-green-800">Price/qtl</th>
            <th className="px-4 py-2 text-right text-xs font-semibold text-green-800">Change</th>
          </tr>
        </thead>
        <tbody>
          {preview.map((row, i) => (
            <tr key={row.commodity} className={i % 2 === 0 ? 'bg-white' : 'bg-green-50/50'}>
              <td className="px-4 py-2.5 font-semibold text-slate-800">{row.commodity}</td>
              <td className="px-4 py-2.5 text-slate-500 text-xs">{row.mandi}</td>
              <td className="px-4 py-2.5 text-right font-bold text-green-800">{row.price}</td>
              <td className={`px-4 py-2.5 text-right text-xs font-semibold ${row.up ? 'text-emerald-600' : 'text-rose-500'}`}>
                {row.up ? '▲' : '▼'} {row.trend}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-2 bg-green-50 border-t border-green-100 text-center">
        <span className="text-xs text-green-600">Sample data · Scroll down for live prices</span>
      </div>
    </div>
  )
}
