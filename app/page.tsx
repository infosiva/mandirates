import type { Metadata } from "next";
import { fetchMandiPrices, summariseByCommodity } from "@/lib/agmarknet";
import { POPULAR_COMMODITIES } from "@/lib/fallback-data";
import SearchBar from "@/components/SearchBar";
import CommodityCard from "@/components/CommodityCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import { CommoditySummary } from "@/lib/types";
import { Suspense } from "react";
import HeroSection       from "@/components/HeroSection";
import MarqueeBar        from "@/components/MarqueeBar";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesGrid      from "@/components/FeaturesGrid";
import FAQSection        from "@/components/FAQSection";
import FinalCTA          from "@/components/FinalCTA";
import StateFilter       from "@/components/StateFilter";

export const revalidate = 86400; // ISR every 24h

export const metadata: Metadata = {
  title: "MandiRates — Daily Mandi Prices & MSP Tracker India",
  description:
    "Today's mandi (market) prices for all major crops across India. Live data from Agmarknet. Check MSP, compare prices, get AI insights.",
};

const TN_COMMODITIES = ["Paddy(Dhan)(Common)", "Banana", "Tomato", "Onion", "Groundnut", "Coconut"];

export default async function HomePage() {
  const [allPrices, tnPrices] = await Promise.all([
    fetchMandiPrices(undefined, 200),
    fetchMandiPrices(undefined, 100, "Tamil Nadu"),
  ]);

  const summaries = summariseByCommodity(allPrices);
  const tnSummaries = summariseByCommodity(tnPrices);

  // Filter to popular commodities only, in order
  const popularSummaries: CommoditySummary[] = POPULAR_COMMODITIES.map(
    (name) =>
      summaries.find(
        (s) => s.commodity.toLowerCase() === name.toLowerCase()
      ) || {
        commodity: name,
        avgModal: 0,
        minPrice: 0,
        maxPrice: 0,
        markets: 0,
        states: 0,
        date: "",
      }
  ).filter((s) => s.avgModal > 0);

  const topThree = popularSummaries.slice(0, 3);

  // TN spotlight: top 4 by data availability, fallback to any available
  const tnSpotlight: CommoditySummary[] = TN_COMMODITIES.map(
    (name) =>
      tnSummaries.find(
        (s) => s.commodity.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(s.commodity.toLowerCase())
      )
  )
    .filter((s): s is CommoditySummary => !!s && s.avgModal > 0)
    .slice(0, 4);

  const tnAny = tnSummaries.filter((s) => s.avgModal > 0).slice(0, 4);
  const tnDisplay = tnSpotlight.length >= 2 ? tnSpotlight : tnAny;

  const TN_COLORS = [
    { bg: "from-emerald-600 to-teal-700", badge: "bg-emerald-500", text: "text-emerald-100" },
    { bg: "from-amber-500 to-orange-600", badge: "bg-amber-400", text: "text-amber-100" },
    { bg: "from-violet-600 to-purple-700", badge: "bg-violet-500", text: "text-violet-100" },
    { bg: "from-rose-500 to-pink-600", badge: "bg-rose-400", text: "text-rose-100" },
  ];

  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Marquee */}
      <MarqueeBar />

      {/* 2b. Live Now strip */}
      <div className="w-full border-b border-green-900/30" style={{ background: 'rgba(6, 30, 14, 0.6)' }}>
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-3 text-xs text-green-400/80">
          <span className="flex items-center gap-1.5 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            Live
          </span>
          <span className="text-gray-500">·</span>
          <span>
            Last updated: {summaries[0]?.date || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
          <span className="text-gray-500">·</span>
          <span>{summaries.length} prices loaded</span>
        </div>
      </div>

      {/* 3. Price Data */}
      <div id="prices" className="max-w-6xl mx-auto px-4 pt-2 pb-6 w-full">
        {/* Animated blob bg */}
        <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }} aria-hidden>
          <div style={{ position: 'absolute', top: '-15%', left: '-8%', width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(22,163,74,0.12) 0%, transparent 70%)', filter: 'blur(80px)',
            animation: 'blob1 14s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-6%', width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', filter: 'blur(90px)',
            animation: 'blob2 18s ease-in-out infinite' }} />
          <style>{`@keyframes blob1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,-20px) scale(1.08)}}
            @keyframes blob2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-25px,20px) scale(1.06)}}`}</style>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-xl mx-auto">
          <SearchBar />
        </div>

        {/* Ad Banner Top */}
        <AdBanner slot="1111111111" className="mb-8" />

        {/* Tamil Nadu Spotlight — shown first */}
        {tnDisplay.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🏛️</span>
              <div>
                <h2 className="text-xl font-bold text-green-300">
                  Tamil Nadu Markets Today
                </h2>
                <p className="text-xs text-gray-500">Live prices from TN mandis · ₹ per quintal</p>
              </div>
              <span className="ml-auto text-xs font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(22,163,74,0.18)', color: '#4ade80', border: '1px solid rgba(22,163,74,0.3)' }}>
                🌟 Featured State
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {tnDisplay.map((s, i) => {
                const c = TN_COLORS[i % TN_COLORS.length];
                return (
                  <div
                    key={s.commodity}
                    className={`bg-gradient-to-br ${c.bg} text-white rounded-2xl p-4 shadow-lg relative overflow-hidden`}
                  >
                    <div className={`absolute top-2 right-2 ${c.badge} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                      TN
                    </div>
                    <p className={`text-xs uppercase tracking-widest font-semibold ${c.text} mb-1`}>
                      {s.commodity.replace(/\(.*?\)/g, "").trim()}
                    </p>
                    <p className="text-2xl font-black mt-1">
                      ₹{s.avgModal.toLocaleString("en-IN")}
                    </p>
                    <p className={`${c.text} text-xs mt-0.5`}>avg modal / qtl</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] bg-white/20 rounded px-1.5 py-0.5">
                        {s.markets} mandis
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            {tnSummaries.length > 4 && (
              <div className="mt-3 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(22,163,74,0.15)', background: 'rgba(255,255,255,0.03)' }}>
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-green-800 to-teal-800 text-white">
                    <tr>
                      <th className="px-4 py-2 text-left">Crop</th>
                      <th className="px-4 py-2 text-right">Modal ₹</th>
                      <th className="px-4 py-2 text-right hidden sm:table-cell">Min</th>
                      <th className="px-4 py-2 text-right hidden sm:table-cell">Max</th>
                      <th className="px-4 py-2 text-right hidden md:table-cell">Mandis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tnSummaries.filter((s) => s.avgModal > 0).slice(0, 8).map((s, i) => (
                      <tr key={s.commodity} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(22,163,74,0.05)', borderBottom: '1px solid rgba(22,163,74,0.08)' }}>
                        <td className="px-4 py-2 font-medium text-green-300">
                          {s.commodity.replace(/\(.*?\)/g, "").trim()}
                        </td>
                        <td className="px-4 py-2 text-right font-bold text-emerald-400">
                          ₹{s.avgModal.toLocaleString("en-IN")}
                        </td>
                        <td className="px-4 py-2 text-right hidden sm:table-cell" style={{ color: 'rgba(238,244,238,0.45)' }}>
                          ₹{s.minPrice.toLocaleString("en-IN")}
                        </td>
                        <td className="px-4 py-2 text-right hidden sm:table-cell" style={{ color: 'rgba(238,244,238,0.45)' }}>
                          ₹{s.maxPrice.toLocaleString("en-IN")}
                        </td>
                        <td className="px-4 py-2 text-right hidden md:table-cell" style={{ color: 'rgba(238,244,238,0.45)' }}>
                          {s.markets}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Today's National Highlights */}
        {topThree.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-100">🇮🇳 National Highlights</h2>
              <span className="text-xs text-gray-500">All India avg · ₹/qtl</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topThree.map((s, i) => {
                const colors = [
                  "from-green-600 to-emerald-700",
                  "from-teal-600 to-cyan-700",
                  "from-lime-600 to-green-700",
                ];
                return (
                  <div
                    key={s.commodity}
                    className={`price-card bg-gradient-to-br ${colors[i % 3]} text-white rounded-2xl p-5 shadow-lg`}
                  >
                    <p className="text-xs uppercase tracking-widest font-semibold text-white/70 mb-1">
                      {s.commodity}
                    </p>
                    <p className="text-4xl font-black mt-1 leading-tight">
                      ₹{s.avgModal.toLocaleString("en-IN")}
                    </p>
                    <p className="text-white/60 text-xs mt-0.5">avg modal / quintal</p>
                    <div className="flex gap-2 mt-3">
                      <span className="text-[10px] bg-white/20 rounded-full px-2 py-0.5">{s.markets} markets</span>
                      <span className="text-[10px] bg-white/20 rounded-full px-2 py-0.5">{s.states} states</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Popular Commodities Grid */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-100">📦 Popular Commodities</h2>
            <span className="text-xs px-3 py-1 rounded-full" style={{ color: 'rgba(238,244,238,0.45)', background: 'rgba(255,255,255,0.06)' }}>₹ per quintal</span>
          </div>
          {/* State filter tabs */}
          <div className="mb-4">
            <Suspense fallback={null}>
              <StateFilter />
            </Suspense>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {popularSummaries.map((s, i) => (
              <CommodityCard key={s.commodity} summary={s} index={i} />
            ))}
          </div>
        </section>

        {/* Ad Banner Mid */}
        <AdBanner slot="2222222222" className="mb-8" />

        {/* MSP CTA — vibrant */}
        <section className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 mb-10 shadow-xl">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute right-0 top-0 w-48 h-48 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold text-white mb-2">
                📋 Kharif &amp; Rabi 2025-26
              </div>
              <h3 className="text-xl font-black text-white">
                MSP vs Mandi Prices
              </h3>
              <p className="text-white/80 text-sm mt-1">
                Are farmers getting fair prices? Compare live mandi rates against govt MSP.
              </p>
            </div>
            <Link
              href="/msp"
              className="shrink-0 bg-white text-orange-600 font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors shadow-lg whitespace-nowrap"
            >
              Check MSP →
            </Link>
          </div>
        </section>

        {/* All Commodities */}
        {summaries.length > POPULAR_COMMODITIES.length && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-100 mb-4">📊 All Commodities Today</h2>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(22,163,74,0.15)', background: 'rgba(255,255,255,0.02)' }}>
              <table className="w-full text-sm">
                <thead style={{ background: 'linear-gradient(90deg, #166534, #0f766e)' }} className="text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Commodity</th>
                    <th className="px-4 py-3 text-right">Modal ₹/qtl</th>
                    <th className="px-4 py-3 text-right hidden sm:table-cell">Min</th>
                    <th className="px-4 py-3 text-right hidden sm:table-cell">Max</th>
                    <th className="px-4 py-3 text-right hidden md:table-cell">Markets</th>
                  </tr>
                </thead>
                <tbody>
                  {summaries.slice(0, 20).map((s, i) => (
                    <tr key={s.commodity} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(22,163,74,0.04)', borderBottom: '1px solid rgba(22,163,74,0.08)' }}>
                      <td className="px-4 py-2">
                        <Link href={`/prices/${encodeURIComponent(s.commodity.toLowerCase())}`} className="text-green-400 font-medium hover:underline">
                          {s.commodity}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-right font-semibold text-green-400">
                        ₹{s.avgModal.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-2 text-right hidden sm:table-cell" style={{ color: 'rgba(238,244,238,0.4)' }}>
                        ₹{s.minPrice.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-2 text-right hidden sm:table-cell" style={{ color: 'rgba(238,244,238,0.4)' }}>
                        ₹{s.maxPrice.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-2 text-right hidden md:table-cell" style={{ color: 'rgba(238,244,238,0.4)' }}>
                        {s.markets}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {/* 4. How It Works */}
      <HowItWorksSection />

      {/* 5. Features Grid */}
      <Suspense fallback={null}>
        <FeaturesGrid />
      </Suspense>

      {/* 6. FAQ */}
      <FAQSection />

      {/* 7. Final CTA */}
      <FinalCTA />
    </div>
  );
}
