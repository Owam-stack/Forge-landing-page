# Architecture Research — Forge Landing Page

## Component Boundaries

The landing page has 8 discrete components:

| Component | Responsibility | External Dependencies |
|---|---|---|
| **Navigation** | Fixed header with F logo, minimal nav | None |
| **Scroll Controller** | Reads scroll position, toggles `.is-visible` classes | IntersectionObserver API |
| **Narrative Section 1** | "Stuck?" — full-screen question + photography | Scroll Controller |
| **Narrative Section 2** | "Restless?" — full-screen question + photography | Scroll Controller |
| **Narrative Section 3** | "Scattered?" — full-screen question + photography | Scroll Controller |
| **Narrative Section 4** | "Undisciplined?" — full-screen question + photography | Scroll Controller |
| **Pillars Reveal** | "Forge." + discipline explanation + 3 pillars | Scroll Controller |
| **Waitlist Form** | Name, email, phone capture + "Coming Soon" | Formspree endpoint |

## Data Flow

Entirely unidirectional:

```
Scroll Position → IntersectionObserver → DOM class toggle → CSS transitions
```

The form is the only component touching external state (Formspree POST endpoint).

## Build Order (Critical for Roadmap Phases)

1. **Design tokens first** — everything consumes them (colors, typography, spacing)
2. **Reset + layout scaffolding** — full-bleed sections, viewport units
3. **Typography scale** — Syne + DM Sans with font loading strategy
4. **Section HTML structure** — semantic markup for all 8 components
5. **Scroll animations** — requires sections to exist (GSAP + ScrollTrigger)
6. **Waitlist form** — self-contained, can be built independently
7. **Navigation** — last, cosmetic layer

## Key Architecture Decisions

- **Plain HTML/CSS/JS** — NOT React. Static page for GitHub Pages.
- **IntersectionObserver over scroll event listeners** — performance critical
- **Animate `transform` + `opacity` only** — never layout properties like `height`/`top`
- **Single HTML file approach** — no routing, no SPA, pure scroll narrative

## Anti-Patterns to Avoid

- Scroll event listeners (use IntersectionObserver)
- Animating layout properties
- Building form without wiring submission endpoint in same phase
- Mixing React SPA patterns into static page

---
*Researched: 2026-03-26*
