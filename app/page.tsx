import type { Metadata } from "next";
import { fetchMandiPrices, summariseByCommodity } from "@/lib/agmarknet";
import { POPULAR_COMMODITIES } from "@/lib/fallback-data";
import SearchBar from "@/components/SearchBar";
import CommodityCard from "@/components/CommodityCard";
import Link from "next/link";
import { CommoditySummary } from "@/lib/types";
import { Suspense } from "react";
import { CheckCircleIcon, MarketIcon, TrendIcon, ChartIcon, CropIcon, PinIcon, ArrowUpRightIcon } from "@/lib/portfolio-theme/icons";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "MandiRates — Live Mandi Bhav Today | MSP Tracker India",
  description: "Today's mandi prices for 200+ crops across India. See MSP gap instantly. Live data from Agmarknet. Check rates before you sell.",
};

const TN_COMMODITIES = ["Paddy(Dhan)(Common)", "Banana", "Tomato", "Onion", "Groundnut", "Coconut"];

function PriceTag({ val, type }: { val: number; type: 'modal' | 'min' | 'max' }) {
  const colors = { modal: '#166534', min: '#6b8f6b', max: '#d97706' };
  return (
    <span style={{ color: colors[type], fontWeight: type === 'modal' ? 700 : 400 }}>
      ₹{val.toLocaleString('en-IN')}
    </span>
  );
}

export default async function HomePage() {
  const [allPrices, tnPrices] = await Promise.all([
    fetchMandiPrices(undefined, 200),
    fetchMandiPrices(undefined, 100, "Tamil Nadu"),
  ]);

  const summaries = summariseByCommodity(allPrices);
  const tnSummaries = summariseByCommodity(tnPrices);

  const popularSummaries: CommoditySummary[] = POPULAR_COMMODITIES.map(
    (name) => summaries.find((s) => s.commodity.toLowerCase() === name.toLowerCase()) || {
      commodity: name, avgModal: 0, minPrice: 0, maxPrice: 0, markets: 0, states: 0, date: "",
    }
  ).filter((s) => s.avgModal > 0);

  const topThree = popularSummaries.slice(0, 3);

  const tnDisplay = (() => {
    const spotlight = TN_COMMODITIES.map((name) =>
      tnSummaries.find((s) => s.commodity.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(s.commodity.toLowerCase()))
    ).filter((s): s is CommoditySummary => !!s && s.avgModal > 0).slice(0, 4);
    return spotlight.length >= 2 ? spotlight : tnSummaries.filter((s) => s.avgModal > 0).slice(0, 4);
  })();

  const lastUpdated = summaries[0]?.date || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>

      {/* ── HERO — data-first, no wasted space ── */}
      <section style={{ background: 'linear-gradient(180deg, #fff7ed 0%, #fffbf5 100%)', borderBottom: '1px solid rgba(217,119,6,0.14)', padding: '28px 0 20px' }}>
        <div className="max-w-6xl mx-auto px-4">

          {/* Top row: headline + live badge */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 stagger-1">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ background: '#16a34a' }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#b45309' }}>
                  Live · Data from Agmarknet · {lastUpdated}
                </span>
              </div>
              <h1 className="font-black leading-tight" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', letterSpacing: '-0.03em', color: '#1c1410' }}>
                Today's mandi prices —<br />
                <span style={{ color: '#d97706' }}>before you load the truck.</span>
              </h1>
            </div>
            <div className="flex gap-2 text-sm shrink-0">
              {[['500+', 'Mandis'], ['200+', 'Crops'], ['Every 6h', 'Updated']].map(([v, l]) => (
                <div key={l} className="data-card px-3 py-2 text-center">
                  <div className="font-black" style={{ color: '#d97706', fontSize: 16 }}>{v}</div>
                  <div className="text-xs" style={{ color: '#92765a' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Search bar — primary action */}
          <div className="max-w-xl mb-4 stagger-2">
            <SearchBar />
            <p className="text-xs mt-1.5" style={{ color: '#92765a' }}>
              Search any crop · state · mandi — e.g. Tomato, Wheat, Onion
            </p>
          </div>

          {/* Top 3 price pills */}
          {topThree.length > 0 && (
            <div className="flex flex-wrap gap-2 stagger-3">
              {topThree.map((s) => (
                <div key={s.commodity} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                  style={{ background: '#fff', border: '1px solid rgba(217,119,6,0.18)', color: '#1c1410' }}>
                  <span className="font-semibold">{s.commodity.replace(/\(.*?\)/g,'').trim()}</span>
                  <span className="font-black" style={{ color: '#d97706' }}>₹{s.avgModal.toLocaleString('en-IN')}</span>
                  <span className="text-xs" style={{ color: '#92765a' }}>/qtl</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── MSP ALERT BANNER ── */}
      <div style={{ background: 'linear-gradient(90deg, #b45309, #92400e)', color: '#fff', padding: '10px 0' }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircleIcon />
            <span className="font-semibold">Kharif & Rabi 2025-26 MSP declared</span>
            <span className="opacity-75 hidden sm:inline">— Are farmers getting fair prices?</span>
          </div>
          <Link href="/msp" className="text-xs font-bold px-3 py-1 rounded-full active:scale-[0.97] transition-transform"
            style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}>
            Compare MSP vs Mandi →
          </Link>
        </div>
      </div>

      {/* ── MAIN DATA AREA — no gap ── */}
      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* Tamil Nadu spotlight */}
        {tnDisplay.length > 0 && (
          <section className="mb-8 stagger-1">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MarketIcon stroke="#d97706" />
                <h2 className="font-bold text-lg" style={{ color: '#1c1410' }}>Tamil Nadu Markets Today</h2>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: 'rgba(217,119,6,0.12)', color: '#b45309' }}>Featured</span>
              </div>
              <span className="text-xs" style={{ color: '#92765a' }}>₹ per quintal</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              {tnDisplay.map((s, i) => {
                const shades = ['#b45309', '#c2700a', '#d97706', '#e08214'];
                const bg = shades[i % shades.length];
                return (
                  <div key={s.commodity} className="text-white rounded-xl p-4 relative overflow-hidden price-card-enter" style={{ background: bg }}>
                    <div className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.25)' }}>TN</div>
                    <p className="text-xs font-semibold uppercase tracking-wide opacity-80 mb-1">
                      {s.commodity.replace(/\(.*?\)/g,'').trim()}
                    </p>
                    <p className="text-2xl font-black">₹{s.avgModal.toLocaleString('en-IN')}</p>
                    <p className="text-xs opacity-60 mt-0.5">{s.markets} mandis</p>
                  </div>
                );
              })}
            </div>

            {/* TN full table */}
            {tnSummaries.length > 4 && (
              <div className="data-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: 'rgba(217,119,6,0.08)', borderBottom: '1px solid rgba(217,119,6,0.14)' }}>
                      <th className="px-4 py-2.5 text-left font-semibold" style={{ color: '#b45309' }}>Crop</th>
                      <th className="px-4 py-2.5 text-right font-semibold" style={{ color: '#b45309' }}>Min</th>
                      <th className="px-4 py-2.5 text-right font-semibold" style={{ color: '#b45309' }}>Modal</th>
                      <th className="px-4 py-2.5 text-right font-semibold" style={{ color: '#b45309' }}>Max</th>
                      <th className="px-4 py-2.5 text-right font-semibold hidden md:table-cell" style={{ color: '#b45309' }}>Mandis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tnSummaries.filter(s => s.avgModal > 0).slice(0, 8).map((s, i) => (
                      <tr key={s.commodity} className="price-row" style={{ borderBottom: '1px solid rgba(217,119,6,0.08)' }}>
                        <td className="px-4 py-2 font-medium" style={{ color: '#1c1410' }}>{s.commodity.replace(/\(.*?\)/g,'').trim()}</td>
                        <td className="px-4 py-2 text-right text-sm" style={{ color: '#92765a' }}>₹{s.minPrice.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-2 text-right font-bold" style={{ color: '#b45309' }}>₹{s.avgModal.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-2 text-right text-sm" style={{ color: '#d97706' }}>₹{s.maxPrice.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-2 text-right hidden md:table-cell text-sm" style={{ color: '#92765a' }}>{s.markets}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* National highlights */}
        {topThree.length > 0 && (
          <section className="mb-8 stagger-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg flex items-center gap-2" style={{ color: '#1c1410' }}>
                <TrendIcon stroke="#d97706" />
                National Highlights
              </h2>
              <span className="text-xs" style={{ color: '#92765a' }}>All India avg · ₹/qtl</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topThree.map((s, i) => {
                const shades = ['#92400e', '#b45309', '#d97706'];
                return (
                  <div key={s.commodity} className="text-white rounded-xl p-5 price-card-enter" style={{ background: shades[i % 3] }}>
                    <p className="text-xs uppercase tracking-widest font-semibold opacity-70 mb-1">{s.commodity}</p>
                    <p className="text-4xl font-black leading-tight">₹{s.avgModal.toLocaleString('en-IN')}</p>
                    <p className="text-xs opacity-60 mt-0.5">avg modal / quintal</p>
                    <div className="flex gap-2 mt-3">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>{s.markets} markets</span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>{s.states} states</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Popular commodities */}
        <section className="mb-8 stagger-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg" style={{ color: '#1a2e1a' }}>📦 Popular Commodities</h2>
            <span className="text-xs px-2 py-1 rounded" style={{ color: '#92765a', background: 'rgba(217,119,6,0.07)' }}>₹ per quintal</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {popularSummaries.map((s, i) => (
              <CommodityCard key={s.commodity} summary={s} index={i} />
            ))}
          </div>
        </section>

        {/* All commodities table */}
        {summaries.length > POPULAR_COMMODITIES.length && (
          <section className="mb-8 stagger-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg flex items-center gap-2" style={{ color: '#1c1410' }}>
                <ChartIcon stroke="#d97706" />
                All Commodities Today
              </h2>
              <span className="text-xs" style={{ color: '#92765a' }}>
                Source: Agmarknet · Updated {lastUpdated}
              </span>
            </div>
            <div className="data-card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'rgba(217,119,6,0.08)', borderBottom: '1px solid rgba(217,119,6,0.14)' }}>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: '#b45309' }}>Commodity</th>
                    <th className="px-4 py-3 text-right font-semibold hidden sm:table-cell" style={{ color: '#92765a' }}>Min ₹</th>
                    <th className="px-4 py-3 text-right font-semibold" style={{ color: '#b45309' }}>Modal ₹</th>
                    <th className="px-4 py-3 text-right font-semibold hidden sm:table-cell" style={{ color: '#d97706' }}>Max ₹</th>
                    <th className="px-4 py-3 text-right font-semibold hidden md:table-cell" style={{ color: '#92765a' }}>Markets</th>
                  </tr>
                </thead>
                <tbody>
                  {summaries.slice(0, 25).map((s, i) => (
                    <tr key={s.commodity} className="price-row" style={{ borderBottom: '1px solid rgba(217,119,6,0.08)' }}>
                      <td className="px-4 py-2.5">
                        <Link href={`/prices/${encodeURIComponent(s.commodity.toLowerCase())}`}
                          className="font-medium hover:underline" style={{ color: '#b45309' }}>
                          {s.commodity}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5 text-right hidden sm:table-cell" style={{ color: '#92765a' }}>₹{s.minPrice.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-2.5 text-right font-bold" style={{ color: '#b45309' }}>₹{s.avgModal.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-2.5 text-right hidden sm:table-cell" style={{ color: '#d97706' }}>₹{s.maxPrice.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-2.5 text-right hidden md:table-cell" style={{ color: '#92765a' }}>{s.markets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: '#fff7ed', borderTop: '1px solid rgba(217,119,6,0.12)', padding: '40px 0' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-black text-2xl text-center mb-8" style={{ color: '#1c1410', letterSpacing: '-0.02em' }}>
            Check the price in 2 taps
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01', Icon: CropIcon, title: 'Select commodity', desc: 'Tap to pick from wheat, rice, vegetables, pulses and 200+ crops. No typing needed.' },
              { n: '02', Icon: PinIcon, title: 'Choose your mandi', desc: 'Filter by state → district → market. Prices from the mandi nearest to you.' },
              { n: '03', Icon: ArrowUpRightIcon, title: 'See today\'s rate', desc: 'Modal, min, and max price from today\'s arrivals. Compare against MSP instantly.' },
            ].map(s => (
              <div key={s.n} className="data-card p-5 flex gap-4">
                <s.Icon width={24} height={24} stroke="#d97706" className="shrink-0" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#92765a' }}>{s.n}</div>
                  <h3 className="font-bold mb-1" style={{ color: '#1c1410' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#5c4a3a' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #b45309, #92400e)', color: '#fff', padding: '40px 0' }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-black text-2xl mb-2" style={{ letterSpacing: '-0.02em' }}>Sell at the right price, every time.</h2>
          <p className="opacity-80 mb-6 text-sm">Free. No account needed. 500+ mandis, all of India.</p>
          <Link href="#prices"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm active:scale-[0.97] transition-transform"
            style={{ background: '#fff', color: '#b45309', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
            Check Today's Prices →
          </Link>
        </div>
      </section>
    </div>
  );
}
