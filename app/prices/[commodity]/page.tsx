import type { Metadata } from "next";
import { fetchMandiPrices, summariseByCommodity } from "@/lib/agmarknet";
import { getAIInsight } from "@/lib/groq";
import { MSP_MAP } from "@/lib/msp-data";
import { POPULAR_COMMODITIES } from "@/lib/fallback-data";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";

export const revalidate = 86400;

type Props = {
  params: Promise<{ commodity: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { commodity } = await params;
  const name = decodeURIComponent(commodity);
  const display = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    title: `${display} Price Today in India`,
    description: `Today's ${display} mandi prices across India. Check state-wise, market-wise ${display} rates in ₹ per quintal from Agmarknet.`,
    keywords: [
      `${display} price today`,
      `${display} mandi bhav`,
      `${display} rate India`,
      `agmarknet ${display}`,
    ],
  };
}

export async function generateStaticParams() {
  return POPULAR_COMMODITIES.map((c) => ({
    commodity: c.toLowerCase(),
  }));
}

export default async function CommodityPage({ params }: Props) {
  const { commodity } = await params;
  const name = decodeURIComponent(commodity);
  const display = name.charAt(0).toUpperCase() + name.slice(1);

  const prices = await fetchMandiPrices(display, 200);
  const [summary] = summariseByCommodity(prices);

  const mspKey = display.toLowerCase();
  const mspPrice = MSP_MAP[mspKey];

  const insight = summary ? await getAIInsight(display, summary) : null;

  const priceDiffPercent =
    mspPrice && summary
      ? Math.round(((summary.avgModal - mspPrice) / mspPrice) * 100)
      : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-green-700">
          Home
        </Link>{" "}
        / Prices /{" "}
        <span className="text-gray-800 font-medium">{display}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-green-800">
            {display} Price Today in India
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Live mandi prices · ₹ per quintal · Source: Agmarknet
          </p>
        </div>
        {summary && (
          <div className="bg-green-700 text-white rounded-xl px-6 py-4 text-right min-w-max">
            <p className="text-xs text-green-300 uppercase tracking-wide">
              Avg Modal Price
            </p>
            <p className="text-3xl font-bold">
              ₹{summary.avgModal.toLocaleString("en-IN")}
            </p>
            <p className="text-green-200 text-xs">
              {summary.markets} markets · {summary.states} states
            </p>
          </div>
        )}
      </div>

      {/* MSP comparison */}
      {mspPrice && summary && (
        <div
          className={`rounded-xl p-4 mb-6 border ${
            priceDiffPercent !== null && priceDiffPercent >= 0
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div>
              <span className="font-semibold text-gray-700">MSP 2025-26:</span>{" "}
              <span className="font-bold text-gray-800">
                ₹{mspPrice.toLocaleString("en-IN")}/quintal
              </span>
            </div>
            {priceDiffPercent !== null && (
              <span
                className={`sm:ml-4 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  priceDiffPercent >= 0
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {priceDiffPercent >= 0 ? "+" : ""}
                {priceDiffPercent}% vs MSP
              </span>
            )}
            <p className="text-xs text-gray-500 sm:ml-auto">
              {priceDiffPercent !== null && priceDiffPercent >= 0
                ? "✅ Mandi price is above MSP"
                : "⚠️ Mandi price is below MSP"}
            </p>
          </div>
        </div>
      )}

      {/* AI Insight */}
      {insight && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-2">
            🤖 AI Price Insight
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{insight}</p>
          <p className="text-xs text-gray-400 mt-2">
            Powered by Groq AI · For informational purposes only
          </p>
        </div>
      )}

      {/* Ad Banner */}
      <AdBanner slot="3333333333" className="mb-6" />

      {/* Price Table */}
      <section>
        <h2 className="text-xl font-bold text-green-800 mb-4">
          {display} Prices by Market
        </h2>
        {prices.length === 0 ? (
          <p className="text-gray-500 bg-white p-6 rounded-xl shadow text-center">
            No price data available for {display} today. Please check back
            later.
          </p>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">State</th>
                  <th className="px-4 py-3 text-left hidden sm:table-cell">
                    District
                  </th>
                  <th className="px-4 py-3 text-left">Market</th>
                  <th className="px-4 py-3 text-right hidden md:table-cell">
                    Variety
                  </th>
                  <th className="px-4 py-3 text-right">Min ₹</th>
                  <th className="px-4 py-3 text-right">Max ₹</th>
                  <th className="px-4 py-3 text-right font-bold">Modal ₹</th>
                  <th className="px-4 py-3 text-right hidden lg:table-cell">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {prices.map((p, i) => (
                  <tr
                    key={`${p.state}-${p.market}-${i}`}
                    className={i % 2 === 0 ? "bg-white" : "bg-green-50"}
                  >
                    <td className="px-4 py-2 text-gray-700">{p.state}</td>
                    <td className="px-4 py-2 text-gray-500 hidden sm:table-cell">
                      {p.district}
                    </td>
                    <td className="px-4 py-2 text-gray-800 font-medium">
                      {p.market}
                    </td>
                    <td className="px-4 py-2 text-gray-500 hidden md:table-cell text-right">
                      {p.variety}
                    </td>
                    <td className="px-4 py-2 text-right text-gray-600">
                      {Number(p.min_price).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-2 text-right text-gray-600">
                      {Number(p.max_price).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-2 text-right font-bold text-green-700">
                      {Number(p.modal_price).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-2 text-right text-gray-400 text-xs hidden lg:table-cell">
                      {p.arrival_date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Bottom ad */}
      <AdBanner slot="4444444444" className="mt-8" />

      {/* Other commodities */}
      <section className="mt-8">
        <h3 className="text-lg font-bold text-green-800 mb-3">
          Check Other Commodities
        </h3>
        <div className="flex flex-wrap gap-2">
          {POPULAR_COMMODITIES.filter(
            (c) => c.toLowerCase() !== name.toLowerCase()
          ).map((c) => (
            <Link
              key={c}
              href={`/prices/${c.toLowerCase()}`}
              className="bg-white border border-green-200 hover:border-green-500 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
