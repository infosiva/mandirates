import Link from "next/link";
import { CommoditySummary } from "@/lib/types";

const COMMODITY_EMOJI: Record<string, string> = {
  Tomato: "🍅",
  Onion: "🧅",
  Potato: "🥔",
  Wheat: "🌾",
  Rice: "🍚",
  Maize: "🌽",
  Cotton: "🪴",
  Soybean: "🫘",
  Turmeric: "🟡",
  Chilli: "🌶️",
  Garlic: "🧄",
};

interface Props {
  summary: CommoditySummary;
}

export default function CommodityCard({ summary }: Props) {
  const emoji = COMMODITY_EMOJI[summary.commodity] || "🌿";
  return (
    <Link
      href={`/prices/${encodeURIComponent(summary.commodity.toLowerCase())}`}
      className="block bg-white rounded-xl shadow hover:shadow-md transition-shadow border border-green-100 p-4 hover:border-green-400"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{emoji}</span>
        <div>
          <h3 className="font-semibold text-gray-800 text-base">
            {summary.commodity}
          </h3>
          <p className="text-xs text-gray-500">{summary.markets} markets</p>
        </div>
      </div>
      <div className="mt-1">
        <p className="text-green-700 font-bold text-xl">
          ₹{summary.avgModal.toLocaleString("en-IN")}
        </p>
        <p className="text-xs text-gray-500">modal price / quintal</p>
        <p className="text-xs text-gray-400 mt-1">
          ₹{summary.minPrice.toLocaleString("en-IN")} –{" "}
          ₹{summary.maxPrice.toLocaleString("en-IN")}
        </p>
      </div>
    </Link>
  );
}
