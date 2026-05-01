import { fetchMandiPrices } from "@/lib/agmarknet";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const commodity = searchParams.get("commodity") || undefined;
  const limit = Number(searchParams.get("limit") || "100");

  try {
    const prices = await fetchMandiPrices(commodity, limit);
    return Response.json({ success: true, count: prices.length, data: prices });
  } catch (err) {
    return Response.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
