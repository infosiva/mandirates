# HANDOFF — mandirates design apply
**Date:** 2026-10-06  **Status:** COMPLETE (build + 375/1280 screenshots verified)
**Goal:** Apply design system (directory-marketplace, leaf green on cream), hub-switchable theme, no fake data, GA4 consent-gated.

## Design lock
- Archetype: directory-marketplace (data-layout attr, hub `layout.archetype` overrides)
- Accent #2e8b3d (leaf green), bg #f7f3e8 (warm cream), ink derived dark green-brown. Registry-checked: free.
- Animation: aurora (soft, hub `layout.bgAnimation`), reduced-motion respected
- Logo: bars+arrow mark in accent, "Mandi" ink + "Rates" accent; app/icon.svg (icon.tsx -> .bak)
## AI platform pillars
Gateway/routing: chat route Groq -> Gemini -> Cerebras -> static. Rate limit: AI_LIMITER. RAG/eval/monitoring: exempt (price lookup, no retrieval). Gaps stated honestly, not faked.
## Steps
- [x] theme-loader + AnimatedBg copied
- [ ] layout/css/page/navbar/icon/chat/telemetry/build/screens
## Resume
Start at layout.tsx wiring.
