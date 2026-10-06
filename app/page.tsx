import type { Metadata } from "next";
import { fetchMandiPrices, summariseByCommodity } from "@/lib/agmarknet";
import { POPULAR_COMMODITIES } from "@/lib/fallback-data";
import SearchBar from "@/components/SearchBar";
import CommodityCard from "@/components/CommodityCard";
import Link from "next/link";
import { CommoditySummary } from "@/lib/types";
import { Suspense } from "react";
import { CheckCircleIcon, MarketIcon, TrendIcon, ChartIcon, CropIcon, PinIcon, ArrowUpRightIcon } from "@/lib/portfolio-theme/icons";
import { MagneticButton } from "@infosiva/shared-ui/modern";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "MandiRates — Live Mandi Bhav Today | MSP Tracker India",
  description: "Today's mandi prices across India. See MSP gap instantly. Live data from Agmarknet. Check rates before you sell.",
};

const TN_COMMODITIES = ["Paddy(Dhan)(Common)", "Banana", "Tomato", "Onion", "Groundnut", "Coconut"];

function PriceTag({ val, type }: { val: number; type: 'modal' | 'min' | 'max' }) {
  const colors = { modal: 'var(--accent-ink)', min: 'var(--muted)', max: 'var(--accent-ink)' };
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
    <div style={{ background: 'var(--bg)', color: 'var(--ink)', minHeight: '100vh' }}>

      {/* ── HERO — data-first, no wasted space ── */}
      <section style={{ background: 'linear-gradient(180deg, var(--surface-2) 0%, var(--bg) 100%)', borderBottom: '1px solid color-mix(in srgb, var(--accent) 14%, transparent)', padding: '28px 0 20px' }}>
        <div className="max-w-6xl mx-auto px-4">

          {/* Top row: headline + live badge */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 stagger-1">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full animate-pulse inline-block" style={{ background: 'var(--accent-ink)' }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent-ink)' }}>
                  Live · Data from Agmarknet · {lastUpdated}
                </span>
              </div>
              <h1 className="font-black leading-tight" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', letterSpacing: '-0.03em', color: 'var(--ink)' }}>
                Today's mandi prices —<br />
                <span style={{ color: 'var(--accent-ink)' }}>before you load the truck.</span>
              </h1>
            </div>
            <div className="flex gap-2 text-sm shrink-0">
              {[['Every 6h', 'Updated'], ['Agmarknet', 'Source'], ['Free', 'No login']].map(([v, l]) => (
                <div key={l} className="data-card px-3 py-2 text-center">
                  <div className="font-black" style={{ color: 'var(--accent-ink)', fontSize: 16 }}>{v}</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Search bar — primary action */}
          <div className="max-w-xl mb-4 stagger-2">
            <SearchBar />
            <p className="text-xs mt-1.5" style={{ color: 'var(--muted)' }}>
              Search any crop · state · mandi — e.g. Tomato, Wheat, Onion
            </p>
          </div>

          {/* Top 3 price pills */}
          {topThree.length > 0 && (
            <div className="flex flex-wrap gap-2 stagger-3">
              {topThree.map((s) => (
                <div key={s.commodity} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                  style={{ background: '#fff', border: '1px solid color-mix(in srgb, var(--accent) 18%, transparent)', color: 'var(--ink)' }}>
                  <span className="font-semibold">{s.commodity.replace(/\(.*?\)/g,'').trim()}</span>
                  <span className="font-black" style={{ color: 'var(--accent-ink)' }}>₹{s.avgModal.toLocaleString('en-IN')}</span>
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>/qtl</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── MSP ALERT BANNER ── */}
      <div style={{ background: 'linear-gradient(90deg, var(--accent-ink), var(--accent-ink))', color: '#fff', padding: '10px 0' }}>
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
                <MarketIcon stroke="var(--accent-ink)" />
                <h2 className="font-bold text-lg" style={{ color: 'var(--ink)' }}>Tamil Nadu Markets Today</h2>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent-ink)' }}>Featured</span>
              </div>
              <span className="text-xs" style={{ color: 'var(--muted)' }}>₹ per quintal</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              {tnDisplay.map((s, i) => {
                const shades = ['var(--accent-ink)', 'var(--accent-ink)', 'var(--accent-ink)', 'var(--accent-ink)'];
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
              <div className="data-card overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: 'color-mix(in srgb, var(--accent) 08%, transparent)', borderBottom: '1px solid color-mix(in srgb, var(--accent) 14%, transparent)' }}>
                      <th className="px-4 py-2.5 text-left font-semibold" style={{ color: 'var(--accent-ink)' }}>Crop</th>
                      <th className="px-4 py-2.5 text-right font-semibold" style={{ color: 'var(--accent-ink)' }}>Min</th>
                      <th className="px-4 py-2.5 text-right font-semibold" style={{ color: 'var(--accent-ink)' }}>Modal</th>
                      <th className="px-4 py-2.5 text-right font-semibold" style={{ color: 'var(--accent-ink)' }}>Max</th>
                      <th className="px-4 py-2.5 text-right font-semibold hidden md:table-cell" style={{ color: 'var(--accent-ink)' }}>Mandis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tnSummaries.filter(s => s.avgModal > 0).slice(0, 8).map((s, i) => (
                      <tr key={s.commodity} className="price-row" style={{ borderBottom: '1px solid color-mix(in srgb, var(--accent) 08%, transparent)' }}>
                        <td className="px-4 py-2 font-medium" style={{ color: 'var(--ink)' }}>{s.commodity.replace(/\(.*?\)/g,'').trim()}</td>
                        <td className="px-4 py-2 text-right text-sm" style={{ color: 'var(--muted)' }}>₹{s.minPrice.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-2 text-right font-bold" style={{ color: 'var(--accent-ink)' }}>₹{s.avgModal.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-2 text-right text-sm" style={{ color: 'var(--accent-ink)' }}>₹{s.maxPrice.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-2 text-right hidden md:table-cell text-sm" style={{ color: 'var(--muted)' }}>{s.markets}</td>
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
              <h2 className="font-bold text-lg flex items-center gap-2" style={{ color: 'var(--ink)' }}>
                <TrendIcon stroke="var(--accent-ink)" />
                National Highlights
              </h2>
              <span className="text-xs" style={{ color: 'var(--muted)' }}>All India avg · ₹/qtl</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topThree.map((s, i) => {
                const shades = ['var(--accent-ink)', 'var(--accent-ink)', 'var(--accent-ink)'];
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
            <h2 className="font-bold text-lg" style={{ color: 'var(--ink)' }}>📦 Popular Commodities</h2>
            <span className="text-xs px-2 py-1 rounded" style={{ color: 'var(--muted)', background: 'color-mix(in srgb, var(--accent) 07%, transparent)' }}>₹ per quintal</span>
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
              <h2 className="font-bold text-lg flex items-center gap-2" style={{ color: 'var(--ink)' }}>
                <ChartIcon stroke="var(--accent-ink)" />
                All Commodities Today
              </h2>
              <span className="text-xs" style={{ color: 'var(--muted)' }}>
                Source: Agmarknet · Updated {lastUpdated}
              </span>
            </div>
            <div className="data-card overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'color-mix(in srgb, var(--accent) 08%, transparent)', borderBottom: '1px solid color-mix(in srgb, var(--accent) 14%, transparent)' }}>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--accent-ink)' }}>Commodity</th>
                    <th className="px-4 py-3 text-right font-semibold hidden sm:table-cell" style={{ color: 'var(--muted)' }}>Min ₹</th>
                    <th className="px-4 py-3 text-right font-semibold" style={{ color: 'var(--accent-ink)' }}>Modal ₹</th>
                    <th className="px-4 py-3 text-right font-semibold hidden sm:table-cell" style={{ color: 'var(--accent-ink)' }}>Max ₹</th>
                    <th className="px-4 py-3 text-right font-semibold hidden md:table-cell" style={{ color: 'var(--muted)' }}>Markets</th>
                  </tr>
                </thead>
                <tbody>
                  {summaries.slice(0, 25).map((s, i) => (
                    <tr key={s.commodity} className="price-row" style={{ borderBottom: '1px solid color-mix(in srgb, var(--accent) 08%, transparent)' }}>
                      <td className="px-4 py-2.5">
                        <Link href={`/prices/${encodeURIComponent(s.commodity.toLowerCase())}`}
                          className="font-medium hover:underline" style={{ color: 'var(--accent-ink)' }}>
                          {s.commodity}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5 text-right hidden sm:table-cell" style={{ color: 'var(--muted)' }}>₹{s.minPrice.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-2.5 text-right font-bold" style={{ color: 'var(--accent-ink)' }}>₹{s.avgModal.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-2.5 text-right hidden sm:table-cell" style={{ color: 'var(--accent-ink)' }}>₹{s.maxPrice.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-2.5 text-right hidden md:table-cell" style={{ color: 'var(--muted)' }}>{s.markets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: 'var(--surface-2)', borderTop: '1px solid color-mix(in srgb, var(--accent) 12%, transparent)', padding: '40px 0' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-black text-2xl text-center mb-8" style={{ color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Check the price in 2 taps
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01', Icon: CropIcon, title: 'Select commodity', desc: 'Tap to pick from wheat, rice, vegetables, pulses and every crop Agmarknet reports. No typing needed.' },
              { n: '02', Icon: PinIcon, title: 'Choose your mandi', desc: 'Filter by state → district → market. Prices from the mandi nearest to you.' },
              { n: '03', Icon: ArrowUpRightIcon, title: 'See today\'s rate', desc: 'Modal, min, and max price from today\'s arrivals. Compare against MSP instantly.' },
            ].map(s => (
              <div key={s.n} className="data-card p-5 flex gap-4">
                <s.Icon width={24} height={24} stroke="var(--accent-ink)" className="shrink-0" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--muted)' }}>{s.n}</div>
                  <h3 className="font-bold mb-1" style={{ color: 'var(--ink)' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, var(--accent-ink), var(--accent-ink))', color: '#fff', padding: '40px 0' }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-black text-2xl mb-2" style={{ letterSpacing: '-0.02em' }}>Sell at the right price, every time.</h2>
          <p className="opacity-80 mb-6 text-sm">Free. No account needed. All of India.</p>
          <Link href="#prices" className="inline-flex">
            <MagneticButton
              tabIndex={-1}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm"
              style={{ background: '#fff', color: 'var(--accent-ink)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
              Check Today's Prices →
            </MagneticButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
