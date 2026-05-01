import { MandiPrice, AgmarknetResponse, CommoditySummary } from "./types";
import { FALLBACK_PRICES } from "./fallback-data";

const BASE_URL =
  "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";
const API_KEY =
  process.env.DATA_GOV_API_KEY ||
  "579b464db66ec23bdd000001cdd3946e44ce4aad38d82beea2de9d6";

export async function fetchMandiPrices(
  commodity?: string,
  limit = 100
): Promise<MandiPrice[]> {
  try {
    const params = new URLSearchParams({
      "api-key": API_KEY,
      format: "json",
      limit: String(limit),
    });
    if (commodity) {
      params.set("filters[commodity]", commodity);
    }

    const res = await fetch(`${BASE_URL}?${params.toString()}`, {
      next: { revalidate: 21600 }, // 6 hours
    });

    if (!res.ok) throw new Error(`API responded with ${res.status}`);

    const data: AgmarknetResponse = await res.json();
    if (!data.records || data.records.length === 0) {
      return FALLBACK_PRICES.filter(
        (p) =>
          !commodity ||
          p.commodity.toLowerCase() === commodity.toLowerCase()
      );
    }
    return data.records;
  } catch {
    // Graceful fallback
    if (commodity) {
      const filtered = FALLBACK_PRICES.filter(
        (p) => p.commodity.toLowerCase() === commodity.toLowerCase()
      );
      return filtered.length > 0 ? filtered : FALLBACK_PRICES;
    }
    return FALLBACK_PRICES;
  }
}

export function summariseByCommodity(
  prices: MandiPrice[]
): CommoditySummary[] {
  const map: Record<string, MandiPrice[]> = {};
  for (const p of prices) {
    const key = p.commodity.trim();
    if (!map[key]) map[key] = [];
    map[key].push(p);
  }

  return Object.entries(map).map(([commodity, rows]) => {
    const modals = rows.map((r) => Number(r.modal_price)).filter((v) => v > 0);
    const mins = rows.map((r) => Number(r.min_price)).filter((v) => v > 0);
    const maxs = rows.map((r) => Number(r.max_price)).filter((v) => v > 0);
    const avgModal =
      modals.length > 0
        ? Math.round(modals.reduce((a, b) => a + b, 0) / modals.length)
        : 0;
    const states = new Set(rows.map((r) => r.state)).size;
    return {
      commodity,
      avgModal,
      minPrice: mins.length > 0 ? Math.min(...mins) : 0,
      maxPrice: maxs.length > 0 ? Math.max(...maxs) : 0,
      markets: rows.length,
      states,
      date: rows[0]?.arrival_date || "",
    };
  });
}
