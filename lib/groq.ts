import { CommoditySummary } from "./types";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function getAIInsight(
  commodity: string,
  summary: CommoditySummary
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey === "your_key_here") {
    return getFallbackInsight(commodity, summary);
  }

  const prompt = `You are an Indian agricultural market analyst. Provide a concise 3-4 sentence price insight for ${commodity} in Indian mandis.
Current data: Average modal price ₹${summary.avgModal}/quintal, range ₹${summary.minPrice}–₹${summary.maxPrice}/quintal across ${summary.markets} markets in ${summary.states} states.
Focus on: price trend, key factors affecting price, advice for farmers/traders. Keep it practical and in simple English.`;

  try {
    const res = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
        temperature: 0.7,
      }),
      next: { revalidate: 86400 }, // cache 24h
    });

    if (!res.ok) return getFallbackInsight(commodity, summary);

    const data = await res.json();
    return data.choices?.[0]?.message?.content || getFallbackInsight(commodity, summary);
  } catch {
    return getFallbackInsight(commodity, summary);
  }
}

function getFallbackInsight(commodity: string, summary: CommoditySummary): string {
  const priceLevel =
    summary.avgModal > 5000
      ? "high"
      : summary.avgModal > 2000
      ? "moderate"
      : "low";
  return `${commodity} is currently trading at an average modal price of ₹${summary.avgModal} per quintal across ${summary.markets} markets in ${summary.states} states. Prices range from ₹${summary.minPrice} to ₹${summary.maxPrice}/quintal indicating ${priceLevel} market activity. Farmers should compare local mandi prices before selling. Monitor arrivals and demand trends for better price realisation.`;
}
