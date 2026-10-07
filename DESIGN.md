# MandiRates design

Source of truth: `design-system/` (MASTER.md, tokens, `components/AnimatedBg.tsx`). This file only records project choices.

- Accent: `#3f8f2a` (leaf green on cream); palette checked with `design-system/scripts/check-palettes.mjs`.
- Hub override: Edge Config `theme_mandirates.design` (dials, brief, palette, `layout.bgAnimation`/`bgSpeed`) wins over these values; loaded by `lib/theme-loader.ts` and applied in `app/layout.tsx`.
- Background: `components/AnimatedBg.tsx` (hub-driven, reduced-motion safe).
- Logo: `components/Logo.tsx` (MandiRates, accent on the second word), used in the navbar/header; favicon is `app/icon.svg` (same mark).
- ai-core: exempt: commodity prices come from public price feeds; no documents, RAG or memory. Chat uses the shared free-first chain.
