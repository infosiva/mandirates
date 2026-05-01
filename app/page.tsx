import type { Metadata } from "next";
import { fetchMandiPrices, summariseByCommodity } from "@/lib/agmarknet";
import { POPULAR_COMMODITIES } from "@/lib/fallback-data";
import SearchBar from "@/components/SearchBar";
import CommodityCard from "@/components/CommodityCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import { CommoditySummary } from "@/lib/types";

export const revalidate = 86400; // ISR every 24h

export const metadata: Metadata = {
  title: "AgriPrice India — Daily Mandi Prices & MSP Tracker",
  description:
    "Today's mandi (market) prices for all major crops across India. Live data from Agmarknet. Check MSP, compare prices, get AI insights.",
};

export default async function HomePage() {
  const allPrices = await fetchMandiPrices(undefined, 200);
  const summaries = summariseByCommodity(allPrices);

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-3">
          🌾 AgriPrice India
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Daily mandi prices · MSP tracker · AI price insights
        </p>
        <SearchBar />
      </section>

      {/* Ad Banner Top */}
      <AdBanner slot="1111111111" className="mb-8" />

      {/* Today's Highlights */}
      {topThree.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-green-800 mb-4">
            Today&apos;s Market Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topThree.map((s) => (
              <div
                key={s.commodity}
                className="bg-green-700 text-white rounded-xl p-5 shadow"
              >
                <p className="text-sm uppercase tracking-wide text-green-200">
                  {s.commodity}
                </p>
                <p className="text-3xl font-bold mt-1">
                  ₹{s.avgModal.toLocaleString("en-IN")}
                </p>
                <p className="text-green-200 text-sm">avg modal / quintal</p>
                <p className="text-xs text-green-300 mt-2">
                  {s.markets} markets · {s.states} states
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Popular Commodities Grid */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-green-800">
            Popular Commodities
          </h2>
          <span className="text-xs text-gray-500">₹ per quintal</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {popularSummaries.map((s) => (
            <CommodityCard key={s.commodity} summary={s} />
          ))}
        </div>
      </section>

      {/* Ad Banner Mid */}
      <AdBanner slot="2222222222" className="mb-8" />

      {/* MSP CTA */}
      <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-yellow-800">
            Check MSP 2025-26
          </h3>
          <p className="text-sm text-yellow-700 mt-1">
            Compare current mandi prices against Minimum Support Price for
            Kharif &amp; Rabi crops.
          </p>
        </div>
        <Link
          href="/msp"
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
        >
          View MSP →
        </Link>
      </section>

      {/* All Commodities */}
      {summaries.length > POPULAR_COMMODITIES.length && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-green-800 mb-4">
            All Commodities Today
          </h2>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Commodity</th>
                  <th className="px-4 py-3 text-right">Modal ₹/qtl</th>
                  <th className="px-4 py-3 text-right hidden sm:table-cell">
                    Min
                  </th>
                  <th className="px-4 py-3 text-right hidden sm:table-cell">
                    Max
                  </th>
                  <th className="px-4 py-3 text-right hidden md:table-cell">
                    Markets
                  </th>
                </tr>
              </thead>
              <tbody>
                {summaries.slice(0, 20).map((s, i) => (
                  <tr
                    key={s.commodity}
                    className={i % 2 === 0 ? "bg-white" : "bg-green-50"}
                  >
                    <td className="px-4 py-2">
                      <Link
                        href={`/prices/${encodeURIComponent(s.commodity.toLowerCase())}`}
                        className="text-green-700 font-medium hover:underline"
                      >
                        {s.commodity}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-right font-semibold text-green-800">
                      ₹{s.avgModal.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-2 text-right text-gray-500 hidden sm:table-cell">
                      ₹{s.minPrice.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-2 text-right text-gray-500 hidden sm:table-cell">
                      ₹{s.maxPrice.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-2 text-right text-gray-500 hidden md:table-cell">
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
  );
}
