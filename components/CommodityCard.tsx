import Link from "next/link";
import { CommoditySummary } from "@/lib/types";
import { MSP_MAP } from "@/lib/msp-data";

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
  "border-emerald-700/40 hover:border-emerald-500/60",
  "border-amber-700/40 hover:border-amber-500/60",
  "border-teal-700/40 hover:border-teal-500/60",
  "border-violet-700/40 hover:border-violet-500/60",
  "border-rose-700/40 hover:border-rose-500/60",
  "border-blue-700/40 hover:border-blue-500/60",
];

const PRICE_COLORS = [
  "text-emerald-400",
  "text-amber-400",
  "text-teal-400",
  "text-violet-400",
  "text-rose-400",
  "text-blue-400",
];

const BAR_COLORS = [
  "bg-emerald-500",
  "bg-amber-500",
  "bg-teal-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-blue-500",
];

interface Props {
  summary: CommoditySummary;
  index?: number;
}

export default function CommodityCard({ summary, index = 0 }: Props) {
  const emoji = COMMODITY_EMOJI[summary.commodity] || "🌿";
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
  const priceColor = PRICE_COLORS[index % PRICE_COLORS.length];
  const barColor = BAR_COLORS[index % BAR_COLORS.length];

  // Sparkline heights for min / modal / max (proportional, 8px–28px range)
  const range = summary.maxPrice - summary.minPrice || 1;
  const minH = 8;
  const maxH = 28;
  const scaleH = (val: number) =>
    Math.round(minH + ((val - summary.minPrice) / range) * (maxH - minH));
  const modalH = scaleH(summary.avgModal);

  // Trend: modal vs midpoint of range
  const midpoint = (summary.minPrice + summary.maxPrice) / 2;
  const trendUp = summary.avgModal >= midpoint;

  // MSP delta
  const mspKey = Object.keys(MSP_MAP).find(
    (k) => summary.commodity.toLowerCase().includes(k) || k.includes(summary.commodity.toLowerCase())
  );
  const msp = mspKey ? MSP_MAP[mspKey] : null;
  const mspDiff = msp !== null ? Math.round(summary.avgModal - msp) : null;

  return (
    <Link
      href={`/prices/${encodeURIComponent(summary.commodity.toLowerCase())}`}
      className={`price-card block rounded-2xl border ${accent} p-4 transition-all`}
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start gap-2 min-w-0">
          <span className="text-xl leading-none">{emoji}</span>
          <div className="min-w-0">
            <h3 className="font-bold text-gray-200 text-sm leading-tight truncate">
              {summary.commodity}
            </h3>
            <p className="text-[10px] text-gray-500 mt-0.5">{summary.markets} markets</p>
          </div>
        </div>
        {/* Trend indicator */}
        <span
          className={`text-xs font-bold shrink-0 ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}
        >
          {trendUp ? '↑' : '↓'}
        </span>
      </div>

      {/* Price */}
      <p className={`${priceColor} font-black text-2xl leading-none mt-2`}>
        ₹{summary.avgModal.toLocaleString("en-IN")}
      </p>
      <p className="text-[10px] text-gray-500 mt-0.5">modal / quintal</p>

      {/* MSP delta badge */}
      {mspDiff !== null && (
        <span
          className={`inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            mspDiff >= 0
              ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/40'
              : 'bg-rose-900/60 text-rose-300 border border-rose-700/40'
          }`}
        >
          {mspDiff >= 0 ? '▲' : '▼'} ₹{Math.abs(mspDiff).toLocaleString('en-IN')} {mspDiff >= 0 ? 'above' : 'below'} MSP
        </span>
      )}

      {/* Price range */}
      <p className="text-[10px] text-gray-500 mt-1">
        ₹{summary.minPrice.toLocaleString("en-IN")} – ₹{summary.maxPrice.toLocaleString("en-IN")}
      </p>

      {/* Mini sparkline — 3 bars: min / modal / max */}
      <div className="flex items-end gap-1 mt-2 h-7">
        <div
          className={`w-2 rounded-sm opacity-50 ${barColor}`}
          style={{ height: `${minH}px` }}
          title={`Min: ₹${summary.minPrice}`}
        />
        <div
          className={`w-2 rounded-sm ${barColor}`}
          style={{ height: `${modalH}px` }}
          title={`Modal: ₹${summary.avgModal}`}
        />
        <div
          className={`w-2 rounded-sm opacity-70 ${barColor}`}
          style={{ height: `${maxH}px` }}
          title={`Max: ₹${summary.maxPrice}`}
        />
      </div>
    </Link>
  );
}
