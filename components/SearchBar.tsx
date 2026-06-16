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
          className="flex-1 px-4 py-3 rounded-lg border-2 text-gray-800 text-base shadow"
          style={{ borderColor: 'rgba(217,119,6,0.3)' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#d97706')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(217,119,6,0.3)')}
        />
        <datalist id="commodity-suggestions">
          {POPULAR_COMMODITIES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <button
          type="submit"
          className="text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow active:scale-[0.97]"
          style={{ background: '#b45309' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#92400e')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#b45309')}
        >
          Search
        </button>
      </div>
    </form>
  );
}
