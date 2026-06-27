# Conduit — AI Data Automation Platform

> Built for Frontend Battle 3.0 — Round 1 | IIT Bhubaneswar | 26 June 2026

**Live Demo:** https://frontend-vibecoding.vercel.app
**GitHub:** https://github.com/najmabegum-dev/frontend-vibecoding

## What I Built
A premium, responsive SaaS landing page for a fictional AI data automation platform — engineered under a 4-hour competition deadline with strict architectural and performance constraints.

## Core Features

### Feature 1 — Matrix-Driven Pricing & Currency Switcher
- 3 tiers × Monthly/Annual × USD/INR/EUR computed from a multi-dimensional matrix
- 20% annual discount multiplier + regional tariff variables — zero hardcoded values
- Currency/billing switches update only the price text nodes via a plain JS pub-sub store outside React — zero parent re-renders, verified via MutationObserver

### Feature 2 — Bento-to-Accordion with Context Lock
- Desktop: asymmetric Bento Grid layout
- Mobile: touch-optimized Accordion
- Shared activeIndex state persists across breakpoint resize — active bento card maps instantly to open accordion panel
- Zero external UI or animation libraries

## Tech Stack
- React + Vite 5
- Tailwind CSS v4 (no config file — @theme block in CSS)
- Pure CSS animations and transitions
- No Framer Motion, no Radix, no Shadcn, no Headless UI

## Performance
- Entry animation total ≤ 500ms
- No layout thrashing or global re-renders
- Semantic HTML throughout — single h1, landmark elements, crawlable text nodes
```"*