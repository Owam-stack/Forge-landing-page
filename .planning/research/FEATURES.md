# Features Research — Forge Landing Page

## Table Stakes (must have or users leave)

| Feature | Complexity | Notes |
|---|---|---|
| Full-bleed sections with cinematic photography | LOW | CSS `object-fit: cover` + viewport units |
| Smooth scroll behavior | LOW | CSS `scroll-behavior: smooth` or Lenis |
| Sticky/pinned sections during scroll | MEDIUM | GSAP ScrollTrigger `pin: true` |
| Text reveal on scroll | MEDIUM | IntersectionObserver + CSS transitions |
| Mobile responsive | MEDIUM | Viewport-first design, touch-friendly |
| Working waitlist form | LOW | Formspree integration |
| Load performance < 3s | MEDIUM | Image optimization, lazy loading |
| Legible typography at all viewports | LOW | Fluid type scale with clamp() |
| `prefers-reduced-motion` support | LOW | Disable animations for accessibility |
| Favicon + OG meta tags | LOW | Social sharing preview |

## Differentiators (competitive advantage)

| Feature | Complexity | Notes |
|---|---|---|
| Scroll-synced parallax on photography | MEDIUM | GSAP scrub animation |
| Character/word-level text animation | HIGH | Split text + stagger timing |
| Film grain overlay | LOW | CSS pseudo-element + noise texture |
| Cinematic hold on "Forge." reveal | MEDIUM | ScrollTrigger pin with delay |
| Smooth momentum scrolling (Lenis) | LOW | Buttery feel without scroll hijacking |
| Section color transitions on scroll | MEDIUM | CSS custom property scrub |
| Ambient cursor effects | MEDIUM | Mouse-follow with blend mode |

## Anti-Features (deliberately NOT building)

| Feature | Reason |
|---|---|
| Fullpage.js forced snap scrolling | Kills natural scroll flow, frustrates users |
| Autoplay video backgrounds | Heavy, distracting, fights photography |
| Lottie animations | Over-engineered for typography-first page |
| Chat widget | Contradicts minimalist aesthetic |
| Cookie banner (if no analytics) | Unnecessary friction |
| Social share buttons | Clutters the narrative |
| Multiple CTAs / navigation links | One action: join the waitlist |
| Scroll progress percentage indicator | Breaks immersion |

## Critical Dependency

Fonts must be loaded before GSAP fires — use `document.fonts.ready`. Otherwise Syne character splits reflow and break animation timing. This is the most common failure mode for typography-first scroll pages.

## Feature Dependencies

```
Design Tokens → Typography → Sections → Scroll Animations → Parallax/Effects
                                      → Waitlist Form (independent)
```

---
*Researched: 2026-03-26*
