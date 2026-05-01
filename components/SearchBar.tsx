"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { POPULAR_COMMODITIES } from "@/lib/fallback-data";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    // Find matching commodity
    const match = POPULAR_COMMODITIES.find(
      (c) => c.toLowerCase() === trimmed.toLowerCase()
    );
    const commodity = match || trimmed;
    router.push(`/prices/${encodeURIComponent(commodity.toLowerCase())}`);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search commodity (e.g. Tomato, Wheat, Onion)..."
          list="commodity-suggestions"
          className="flex-1 px-4 py-3 rounded-lg border-2 border-green-300 focus:outline-none focus:border-green-600 text-gray-800 text-base shadow"
        />
        <datalist id="commodity-suggestions">
          {POPULAR_COMMODITIES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow"
        >
          Search
        </button>
      </div>
    </form>
  );
}
