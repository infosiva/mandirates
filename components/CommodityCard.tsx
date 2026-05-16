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
  Banana: "🍌",
  Groundnut: "🥜",
  Coconut: "🥥",
  Sugarcane: "🎋",
};

const CARD_ACCENTS = [
  "border-emerald-200 hover:border-emerald-400 bg-gradient-to-br from-white to-emerald-50",
  "border-amber-200 hover:border-amber-400 bg-gradient-to-br from-white to-amber-50",
  "border-teal-200 hover:border-teal-400 bg-gradient-to-br from-white to-teal-50",
  "border-violet-200 hover:border-violet-400 bg-gradient-to-br from-white to-violet-50",
  "border-rose-200 hover:border-rose-400 bg-gradient-to-br from-white to-rose-50",
  "border-blue-200 hover:border-blue-400 bg-gradient-to-br from-white to-blue-50",
];

const PRICE_COLORS = [
  "text-emerald-700",
  "text-amber-600",
  "text-teal-700",
  "text-violet-700",
  "text-rose-600",
  "text-blue-700",
];

interface Props {
  summary: CommoditySummary;
  index?: number;
}

export default function CommodityCard({ summary, index = 0 }: Props) {
  const emoji = COMMODITY_EMOJI[summary.commodity] || "🌿";
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
  const priceColor = PRICE_COLORS[index % PRICE_COLORS.length];

  return (
    <Link
      href={`/prices/${encodeURIComponent(summary.commodity.toLowerCase())}`}
      className={`price-card block rounded-2xl border-2 ${accent} p-4 transition-all`}
    >
      <div className="flex items-start gap-2 mb-2">
        <span className="text-2xl leading-none">{emoji}</span>
        <div className="min-w-0">
          <h3 className="font-bold text-gray-800 text-sm leading-tight truncate">
            {summary.commodity}
          </h3>
          <p className="text-[10px] text-gray-400 mt-0.5">{summary.markets} markets</p>
        </div>
      </div>
      <p className={`${priceColor} font-black text-2xl leading-none mt-2`}>
        ₹{summary.avgModal.toLocaleString("en-IN")}
      </p>
      <p className="text-[10px] text-gray-400 mt-0.5">modal / quintal</p>
      <div className="flex items-center gap-1 mt-2">
        <span className="text-[10px] text-gray-400">
          ₹{summary.minPrice.toLocaleString("en-IN")} – ₹{summary.maxPrice.toLocaleString("en-IN")}
        </span>
      </div>
    </Link>
  );
}
