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


## OWASP LLM Top 10 dispositions (gate item 45, 2026-10-07; list recalled from memory, unverified)
- LLM01 prompt injection: lib/guard.ts present, NOT yet wired into routes; no output filtering or tool sandbox review done. PARTIAL.
- LLM02 sensitive info disclosure: `redact()` helper available; not applied to every log. PARTIAL.
- LLM04/10 DoS / unbounded consumption: per-IP rate limit where present; token budgets not enforced. PARTIAL.
- LLM05 improper output handling: model output rendered as text; not audited for HTML sinks. UNVERIFIED.
- LLM06 excessive agency: no tool-calling agents audited. UNVERIFIED.
- Others (supply chain, poisoning, embeddings, misinformation): not assessed.


## ANIMATED SCOPE (gate items 19/21, derived from code 2026-10-07)
- Moves: AnimatedBg (ambient hero/background); CSS keyframes: ds-float, ds-shift, fw-spin, mandi-slide-bottom, mandi-slide-up, priceCardEnter; transitions on interactive elements.
- Trigger: page load (ambient) and hover/press (interactive). Reduced motion: honoured via prefers-reduced-motion block.
- STATUS: scope documented from existing code only. Skill-stack passes (ui-ux-pro-max, emil-design-eng, impeccable critique, review-animations) and 375/1280 screenshot review are NOT yet run for this app. Item 21 stays OPEN until they are.
