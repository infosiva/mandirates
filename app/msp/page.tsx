import type { Metadata } from "next";
import { MSP_DATA } from "@/lib/msp-data";
import { fetchMandiPrices, summariseByCommodity } from "@/lib/agmarknet";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "MSP 2025-26 — Minimum Support Price for All Crops",
  description:
    "MSP (Minimum Support Price) for Kharif and Rabi crops 2025-26 announced by Government of India. Compare with current mandi prices.",
  keywords: [
    "MSP 2025",
    "minimum support price",
    "MSP wheat",
    "MSP paddy",
    "kharif MSP",
    "rabi MSP",
  ],
};

export default async function MSPPage() {
  // Fetch live mandi prices for MSP crops
  const allPrices = await fetchMandiPrices(undefined, 500);
  const summaries = summariseByCommodity(allPrices);

  const summaryMap: Record<string, number> = {};
  for (const s of summaries) {
    summaryMap[s.commodity.toLowerCase()] = s.avgModal;
  }

  const kharif = MSP_DATA.filter((c) => c.season === "Kharif");
  const rabi = MSP_DATA.filter((c) => c.season === "Rabi");

  function renderTable(crops: typeof MSP_DATA, season: string) {
    return (
      <div className="mb-10">
        <h2 className="text-xl font-bold text-green-800 mb-3">
          {season} Season 2025-26
        </h2>
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Crop</th>
                <th className="px-4 py-3 text-right">MSP ₹/quintal</th>
                <th className="px-4 py-3 text-right hidden sm:table-cell">
                  Mandi Price ₹/qtl
                </th>
                <th className="px-4 py-3 text-right hidden sm:table-cell">
                  Vs MSP
                </th>
                <th className="px-4 py-3 text-center hidden md:table-cell">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {crops.map((crop, i) => {
                const mandiPrice = summaryMap[crop.name.toLowerCase()];
                const diff =
                  mandiPrice
                    ? Math.round(((mandiPrice - crop.msp) / crop.msp) * 100)
                    : null;
                return (
                  <tr
                    key={crop.name}
                    className={i % 2 === 0 ? "bg-white" : "bg-green-50"}
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/prices/${crop.name.toLowerCase()}`}
                        className="font-semibold text-green-700 hover:underline"
                      >
                        {crop.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-gray-800">
                      ₹{crop.msp.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell text-gray-600">
                      {mandiPrice
                        ? `₹${mandiPrice.toLocaleString("en-IN")}`
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell">
                      {diff !== null ? (
                        <span
                          className={`font-semibold ${
                            diff >= 0 ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {diff >= 0 ? "+" : ""}
                          {diff}%
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      {diff !== null ? (
                        diff >= 0 ? (
                          <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                            Above MSP
                          </span>
                        ) : (
                          <span className="inline-block bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-medium">
                            Below MSP
                          </span>
                        )
                      ) : (
                        <span className="text-gray-400 text-xs">No data</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-green-700">
          Home
        </Link>{" "}
        / <span className="text-gray-800 font-medium">MSP 2025-26</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-green-800">
          MSP 2025-26 — Minimum Support Price
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          Official MSP announced by Government of India for Kharif &amp; Rabi
          crops. Compared with live Agmarknet mandi prices.
        </p>
      </div>

      {/* Info box */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 text-sm text-yellow-800">
        <strong>What is MSP?</strong> Minimum Support Price is the price set by
        the Government of India at which government agencies purchase crops from
        farmers, ensuring a floor price and protecting farmer income.
      </div>

      {/* Ad Banner */}
      <AdBanner slot="5555555555" className="mb-8" />

      {/* Tables */}
      {renderTable(kharif, "Kharif")}
      {renderTable(rabi, "Rabi")}

      {/* Bottom Ad */}
      <AdBanner slot="6666666666" className="mb-8" />

      {/* Disclaimer */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-500">
        <strong>Disclaimer:</strong> MSP figures are for 2025-26 season as
        announced by CACP / Government of India. Mandi prices are approximate
        averages from Agmarknet data and may vary by market, variety and date.
        Always verify with your local APMC before making selling decisions.
      </div>
    </div>
  );
}
