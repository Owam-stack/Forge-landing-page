# Stack Research — Forge Landing Page

## Recommended Stack

### Core Build Tool
- **Vite 6.x + TypeScript 5.x** (vanilla-ts template)
- Static output for GitHub Pages, no framework overhead
- Confidence: HIGH

### Animation & Scroll
- **GSAP 3.12.x + ScrollTrigger plugin** — industry standard for scroll-pinning/scrub sequences
- CSS Scroll-Driven Animations are NOT ready to replace GSAP (partial Safari/Firefox support as of Aug 2025)
- Confidence: HIGH

### Smooth Scroll
- **Lenis 1.x** (optional) — buttery momentum scroll, integrates with GSAP ScrollTrigger
- Confidence: MEDIUM

### Styling
- **Plain CSS Custom Properties** — NOT Tailwind
- For a single cinematic page, Tailwind adds pipeline complexity without ergonomic benefit
- Full CSS control needed for Nordic Minimalist aesthetic
- Confidence: HIGH

### Typography
- **Google Fonts CDN** (Syne + DM Sans)
- Preconnect and `font-display=swap` for performance
- Confidence: HIGH

### Waitlist Form
- **Formspree** (free tier) — standard pairing with GitHub Pages
- Handles POST from static pages, no credentials exposed client-side (unlike EmailJS)
- Confidence: HIGH

### Deployment
- **gh-pages npm package** or GitHub Actions workflow
- Critical: set `base: '/forge/'` in `vite.config.ts` for non-root GH Pages deployment
- Confidence: HIGH

## What NOT to Use

| Library/Tool | Reason |
|---|---|
| React/Vue/Next.js | Unjustified overhead for a single static page |
| AOS / ScrollMagic | Outdated/abandoned |
| Netlify Forms | Requires Netlify hosting |
| Bootstrap | Fights cinematic full-bleed layouts |
| jQuery | Unnecessary dependency |
| Tailwind CSS | Over-engineered for single cinematic page; CSS custom properties give more control |

## Verification Needed

- CSS Scroll-Driven Animations browser support (may have improved since Aug 2025)
- GSAP 3.12.x latest patch version
- Formspree free tier limits

---
*Researched: 2026-03-26*
