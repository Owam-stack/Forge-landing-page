# Project Research Summary

**Project:** Forge Landing Page
**Domain:** Static cinematic landing page / waitlist capture
**Researched:** 2026-03-26
**Confidence:** HIGH

## Executive Summary

Forge is a single-page, scroll-driven cinematic landing page whose purpose is emotional narrative delivery and waitlist capture. The established expert pattern for this type of product is a static HTML/CSS/JS build (no framework) deployed to GitHub Pages, using GSAP ScrollTrigger for scroll-pinned animations and plain CSS custom properties for design tokens. The Nordic Minimalist aesthetic demands full creative control over layout and typography — Tailwind and React SPA patterns both fight this and must be avoided.

The recommended approach is Vite 6 + TypeScript as the build layer (vanilla-ts template), GSAP 3.12 + ScrollTrigger for all scroll animation, optional Lenis for momentum scroll, Google Fonts (Syne + DM Sans) for typography, and Formspree for the waitlist form. The architecture is deliberately simple: eight discrete components, unidirectional data flow driven entirely by scroll position, no client-side state management, and one external dependency (Formspree POST). The critical dependency ordering is design tokens first, then layout, then typography, then sections, then scroll animations — skipping this order causes painful rewrites.

The top risks are all well-understood and preventable: GitHub Pages subpath asset 404s (set `base: '/forge/'` in Vite config immediately), iOS `100vh` cutoff (use `100dvh` throughout), and font loading races breaking GSAP split-text animations (gate all GSAP initialization on `document.fonts.ready`). Image optimization is the only open unknown — appropriate compression targets and tooling need to be chosen when real photography assets are available.

## Key Findings

### Recommended Stack

The stack is deliberately minimal. Vite 6 with the vanilla-ts template produces a static build with no framework overhead, which is exactly right for a single-page scroll narrative. GSAP ScrollTrigger is the only credible choice for scroll-pinned animations — CSS Scroll-Driven Animations still lack full Safari/Firefox support as of the research date. Plain CSS custom properties are preferred over Tailwind because a cinematic full-bleed layout requires surgical CSS control that utility classes obstruct.

**Core technologies:**
- **Vite 6 + TypeScript 5**: build tooling — static output, fast HMR, typed codebase
- **GSAP 3.12 + ScrollTrigger**: scroll animation — industry standard, handles passive listeners correctly
- **Lenis 1.x** (optional): momentum scroll — buttery feel, integrates with ScrollTrigger
- **Plain CSS Custom Properties**: styling — full control, no utility class overhead
- **Google Fonts CDN (Syne + DM Sans)**: typography — with preconnect and font-display:swap
- **Formspree**: waitlist form — no client-side keys, works on static pages
- **gh-pages or GitHub Actions**: deployment — to GitHub Pages

### Expected Features

The feature set is intentionally restrained. One CTA (waitlist), no navigation links, no multiple competing actions. Everything serves the scroll narrative.

**Must have (table stakes):**
- Full-bleed sections with cinematic photography — core visual identity
- Sticky/pinned sections during scroll — GSAP ScrollTrigger pin
- Text reveal on scroll — IntersectionObserver + CSS transitions
- Mobile responsive with touch-friendly interactions
- Working waitlist form (name, email, phone)
- Load performance under 3 seconds — image optimization critical
- Fluid typography with `clamp()` at all viewports
- `prefers-reduced-motion` support — accessibility requirement
- Favicon + OG meta tags for social sharing

**Should have (differentiators):**
- Scroll-synced parallax on photography — GSAP scrub
- Character/word-level text animation (Syne headline splits)
- Film grain overlay via CSS pseudo-element
- Cinematic hold on "Forge." reveal — ScrollTrigger pin with delay
- Smooth momentum scroll (Lenis)
- Section color transitions on scroll

**Deliberately excluded (anti-features):**
- Forced scroll snapping (Fullpage.js)
- Autoplay video backgrounds
- Multiple CTAs or navigation links
- Cookie banner, chat widget, social share buttons
- Scroll progress indicator

### Architecture Approach

The architecture is a pure static scroll narrative with eight components and zero client-side state. All interactivity flows unidirectionally: scroll position triggers IntersectionObserver, which toggles DOM classes, which drive CSS transitions. The form is the only component touching external infrastructure (Formspree). There is no routing, no component tree, no hydration — just a single HTML file with modular CSS and JS files.

**Major components:**
1. **Navigation** — fixed header with F logo, cosmetic layer built last
2. **Scroll Controller** — IntersectionObserver toggling `.is-visible` classes across all sections
3. **Narrative Sections (x4)** — "Stuck?", "Restless?", "Scattered?", "Undisciplined?" full-screen questions with photography
4. **Pillars Reveal** — "Forge." + discipline explanation + 3 pillars, GSAP-pinned
5. **Waitlist Form** — Formspree POST, self-contained, buildable independently

**Key architectural rules:**
- Animate `transform` + `opacity` only — never layout properties
- IntersectionObserver over scroll event listeners — mandatory for iOS performance
- Single HTML file — no SPA routing

### Critical Pitfalls

1. **GitHub Pages subpath 404s** — Set `base: '/forge/'` in `vite.config.ts` on day one. Test with `vite preview --base=/forge/` before every deployment. This is caught in setup, not debugging.

2. **iOS `100vh` cutting off full-screen sections** — Use `100dvh` everywhere from the start. The Safari toolbar eats `100vh`. Fallback: `min-height: -webkit-fill-available`.

3. **Font loading race breaking GSAP split-text** — Gate all GSAP initialization inside `document.fonts.ready`. Syne character splits reflow if font loads after GSAP measures DOM, breaking all animation timing. This is the single most common failure mode for typography-first scroll pages.

4. **Unoptimized images destroying LCP** — Target under 200KB per image, WebP/AVIF format, eager-load the hero, lazy-load everything below fold. Largest Contentful Paint must stay under 4s.

5. **Scroll jank on iOS Safari** — Never use `scroll` event + `getBoundingClientRect()` in a loop. GSAP ScrollTrigger and IntersectionObserver handle passive listeners correctly. Any deviation from this causes visible 60fps drops on mobile.

## Implications for Roadmap

Based on research, the build order is deterministic because of hard dependencies: design tokens must exist before layout, layout before typography, typography before sections, sections before scroll animations. The form and navigation are independent and can be built in any late phase.

### Phase 1: Project Foundation
**Rationale:** GitHub Pages subpath pitfall must be addressed at setup, not discovered during deployment. Vite config, folder structure, and design tokens are prerequisites for everything else.
**Delivers:** Working Vite + TypeScript scaffold deployable to GitHub Pages, with CSS custom properties for all design tokens (colors, type scale, spacing, motion)
**Addresses:** Full control design foundation, no rework later
**Avoids:** GitHub Pages 404 pitfall (set `base: '/forge/'` now)

### Phase 2: Layout Scaffolding + Typography
**Rationale:** Full-bleed section layout and typography are the canvas on which all animations are painted. Typography must be loaded and measured before GSAP can split text.
**Delivers:** All 8 section shells with correct viewport sizing, Syne + DM Sans loaded with `font-display:swap` and preconnect, `100dvh` on all full-screen sections, fluid type scale with `clamp()`
**Uses:** Google Fonts CDN, CSS custom properties
**Avoids:** iOS `100vh` pitfall, GSAP font race condition

### Phase 3: Section Content + Photography
**Rationale:** Static content and optimized images must exist before scroll animations can be calibrated. Image dimensions affect ScrollTrigger pin calculations.
**Delivers:** All narrative sections populated with copy and photography, images compressed to WebP/AVIF under 200KB each, lazy loading configured
**Avoids:** LCP performance pitfall

### Phase 4: Scroll Animations
**Rationale:** GSAP ScrollTrigger requires the full DOM to exist. This is the most complex phase and depends on all prior phases being stable.
**Delivers:** Section reveal animations, GSAP-pinned "Forge." reveal, scroll-synced parallax on photography, character/word-level text animations, section color transitions
**Uses:** GSAP 3.12 + ScrollTrigger, optional Lenis
**Avoids:** Scroll jank pitfall, `prefers-reduced-motion` must be wired here

### Phase 5: Waitlist Form + Polish
**Rationale:** Form is self-contained and can be built any time, but is placed last so polish and the "looks done but isn't" checklist can be addressed in the same phase.
**Delivers:** Formspree-wired waitlist form with validation and success/error states, film grain overlay, favicon, OG meta tags, 404 page for GitHub Pages
**Uses:** Formspree free tier
**Avoids:** Form API key exposure pitfall, missing meta tag checklist items

### Phase Ordering Rationale

- Design tokens before layout — prevents design drift and token rewrites mid-build
- Typography before animations — `document.fonts.ready` gate requires fonts to be wired before GSAP init
- Content + images before animation — ScrollTrigger pin calculations are sensitive to image dimensions
- Form independent but deferred — reduces cognitive load during complex animation phase
- Navigation built last — cosmetic, zero dependencies, confirmed by ARCHITECTURE.md

### Research Flags

Phases with standard, well-documented patterns (skip `/gsd:research-phase`):
- **Phase 1 (Foundation):** Vite + GitHub Pages setup is thoroughly documented
- **Phase 2 (Layout/Typography):** CSS viewport units and Google Fonts patterns are standard
- **Phase 5 (Form):** Formspree integration is straightforward

Phases that may benefit from targeted research during planning:
- **Phase 4 (Scroll Animations):** GSAP ScrollTrigger + Lenis integration has version-specific gotchas. Recommend checking GSAP 3.12 changelog and Lenis compatibility notes before implementation.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Clear consensus — GSAP + Vite + static are proven choices. CSS Scroll-Driven Animations exclusion confirmed by browser support data. |
| Features | HIGH | Anti-features are as important as features here. Single-CTA discipline is well-reasoned. |
| Architecture | HIGH | Unidirectional scroll-driven DOM pattern is canonical for this type of page. Component boundaries are clean. |
| Pitfalls | HIGH | All 7 pitfalls are specific, actionable, and phase-mapped. No vague warnings. |

**Overall confidence:** HIGH

### Gaps to Address

- **Image assets not yet available:** Compression targets (under 200KB per image) and tooling (imagemin, Squoosh, etc.) need to be confirmed when real photography is in hand. Placeholder strategy needed for early phases.
- **Lenis integration decision deferred:** Lenis is optional. The call on whether to include it should be made during Phase 4 based on scroll feel testing without it first.
- **Formspree endpoint URL:** Needs a Formspree account and form registration before Phase 5. Should be created during or before Phase 5 planning, not during implementation.
- **CSS Scroll-Driven Animations browser support:** May have improved since August 2025 research cutoff. Worth a quick check before committing to GSAP-only for simple reveals (GSAP remains the right call for complex sequences regardless).

## Sources

### Primary (HIGH confidence)
- GSAP documentation + ScrollTrigger docs — animation patterns, pin behavior, Lenis integration
- Vite documentation — vanilla-ts template, base config for subpath deployment
- MDN Web Docs — IntersectionObserver API, `100dvh`, `font-display`, CSS custom properties
- GitHub Pages documentation — deployment, subpath configuration, CNAME
- Formspree documentation — static page POST integration, free tier

### Secondary (MEDIUM confidence)
- Community consensus on GSAP + Lenis pairing — multiple sources confirm compatibility
- Web.dev performance guidelines — LCP targets, image optimization thresholds

### Tertiary (LOW confidence)
- CSS Scroll-Driven Animations browser support status — research cutoff August 2025, may have changed

---
*Research completed: 2026-03-26*
*Ready for roadmap: yes*
