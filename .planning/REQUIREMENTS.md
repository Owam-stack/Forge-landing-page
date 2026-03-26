# Requirements: Forge

**Defined:** 2026-03-26
**Core Value:** Help users build discipline through daily accountability and intentional practice

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Scroll Narrative

- [ ] **NARR-01**: Visitor sees full-bleed cinematic sections — each question word (Stuck?, Restless?, Scattered?, Undisciplined?) displays full-screen with dark photography
- [ ] **NARR-02**: Text reveals animate as user scrolls into each section view
- [ ] **NARR-03**: "Forge." reveal section displays with discipline explanation and three pillars (Track Progress, Set Intentions, Daily Rituals)

### Design System

- [ ] **DESIGN-01**: Page uses Nordic Minimalist typography — Syne for headings, DM Sans for body text
- [ ] **DESIGN-02**: Dark, moody, monochrome color palette applied throughout
- [ ] **DESIGN-03**: Minimal "F" logo displayed in navigation and as favicon
- [ ] **DESIGN-04**: Page is fully responsive across mobile, tablet, and desktop viewports
- [ ] **DESIGN-05**: Smooth momentum scrolling via Lenis for premium feel

### Waitlist

- [ ] **WAIT-01**: Visitor can submit waitlist form with name, email, and phone number
- [ ] **WAIT-02**: "Coming Soon" displayed as bold statement near the form
- [ ] **WAIT-03**: Form shows success confirmation after submission and error state on failure

### Infrastructure

- [ ] **INFRA-01**: Site deploys to GitHub Pages from the forge repository
- [ ] **INFRA-02**: Vite build pipeline outputs static assets with correct base path for GitHub Pages
- [ ] **INFRA-03**: Animations respect `prefers-reduced-motion` with instant-reveal fallback

## v2 Requirements

### Visual Effects

- **FX-01**: Cinematic hold/pin on "Forge." reveal section during scroll
- **FX-02**: Scroll-synced parallax on photography for depth effect
- **FX-03**: Film grain overlay for cinematic texture
- **FX-04**: Section background color transitions on scroll

### Social & SEO

- **SEO-01**: OG meta tags for social sharing preview card
- **SEO-02**: Custom 404 page for GitHub Pages

### AI Coach

- **AI-01**: Claude skill integration for user check-ins and mood tracking
- **AI-02**: Personal data collection through prompted interactions
- **AI-03**: Discipline coaching through AI-guided conversations

## Out of Scope

| Feature | Reason |
|---------|--------|
| Full app build (auth, dashboard, tracking) | This milestone is landing page only — app comes after validation |
| User authentication | Not needed for a static landing page |
| Payment processing | No monetization yet |
| Social features | Solo discipline focus first |
| Fullpage.js forced snap scrolling | Kills natural scroll flow |
| Autoplay video backgrounds | Heavy, distracting, fights photography |
| Chat widget | Contradicts minimalist aesthetic |
| Multiple CTAs | One action only: join the waitlist |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Pending |
| INFRA-02 | Phase 1 | Pending |
| DESIGN-01 | Phase 1 | Pending |
| DESIGN-02 | Phase 1 | Pending |
| DESIGN-03 | Phase 1 | Pending |
| NARR-01 | Phase 2 | Pending |
| NARR-03 | Phase 2 | Pending |
| DESIGN-04 | Phase 2 | Pending |
| DESIGN-05 | Phase 2 | Pending |
| NARR-02 | Phase 3 | Pending |
| INFRA-03 | Phase 3 | Pending |
| WAIT-01 | Phase 3 | Pending |
| WAIT-02 | Phase 3 | Pending |
| WAIT-03 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 14 total
- Mapped to phases: 14
- Unmapped: 0

---
*Requirements defined: 2026-03-26*
*Last updated: 2026-03-26 after roadmap creation — all 14 v1 requirements mapped*
