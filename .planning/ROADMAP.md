# Roadmap: Forge

## Overview

Three phases that turn an empty repo into a live, scroll-driven cinematic landing page on GitHub Pages. Phase 1 lays the deployable foundation — design tokens, scaffold, CI. Phase 2 builds the scroll narrative — all sections with photography and typography in place. Phase 3 wires animations and the waitlist form, completing the experience.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Vite + TypeScript scaffold deployable to GitHub Pages with design tokens applied
- [ ] **Phase 2: Scroll Narrative** - All sections rendered with photography, typography, and responsive layout
- [ ] **Phase 3: Animation + Waitlist** - Scroll reveals wired, waitlist form live, site shippable

## Phase Details

### Phase 1: Foundation
**Goal**: A deployable Vite + TypeScript project on GitHub Pages with the design system applied as CSS custom properties — the canvas everything else paints onto
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, DESIGN-01, DESIGN-02, DESIGN-03
**Success Criteria** (what must be TRUE):
  1. Running `npm run build && npm run deploy` pushes a live site to GitHub Pages with no 404s on assets
  2. The deployed page loads with Syne and DM Sans fonts, dark monochrome palette, and the "F" logo visible in the nav
  3. A local preview at `/forge/` base path shows the correct styles (validates GitHub Pages subpath config)
**Plans**: TBD

Plans:
- [ ] 01-01: Vite scaffold, GitHub Pages deploy pipeline, base path config
- [ ] 01-02: CSS design tokens, typography scale, dark palette, "F" logo

### Phase 2: Scroll Narrative
**Goal**: Every section of the scroll story exists with copy, photography, and correct viewport sizing — the full page readable before any scroll animation is wired
**Depends on**: Phase 1
**Requirements**: NARR-01, NARR-03, DESIGN-04, DESIGN-05
**Success Criteria** (what must be TRUE):
  1. Visitor can scroll through all five full-screen sections: Stuck?, Restless?, Scattered?, Undisciplined?, and the Forge. reveal
  2. Each question section shows dark cinematic photography filling the full viewport with the question word overlaid
  3. The "Forge." section displays the three pillars (Track Progress, Set Intentions, Daily Rituals) with discipline explanation copy
  4. The page is fully readable and correctly laid out on mobile (375px), tablet (768px), and desktop (1280px) viewports
  5. Lenis momentum scroll is active — scrolling feels weighted and premium, not janky
**Plans**: TBD

Plans:
- [ ] 02-01: Section shells with `100dvh` sizing, photography, and copy
- [ ] 02-02: Responsive layout polish and Lenis integration

### Phase 3: Animation + Waitlist
**Goal**: The cinematic experience is complete — text reveals animate on scroll, the waitlist form captures real submissions, and the site is ready to ship
**Depends on**: Phase 2
**Requirements**: NARR-02, INFRA-03, WAIT-01, WAIT-02, WAIT-03
**Success Criteria** (what must be TRUE):
  1. Scrolling into each question section triggers a text reveal animation — the word fades/rises into view as the section enters the viewport
  2. Visitor can submit their name, email, and phone number via the waitlist form and sees a success confirmation message
  3. Submitting an invalid or incomplete form shows a clear error state without a page reload
  4. A visitor with `prefers-reduced-motion` enabled sees instant section reveals instead of animated ones
  5. "Coming Soon" statement is prominently displayed near the waitlist form
**Plans**: TBD

Plans:
- [ ] 03-01: GSAP ScrollTrigger text reveal animations with `prefers-reduced-motion` fallback
- [ ] 03-02: Formspree waitlist form with validation, success/error states, and "Coming Soon" copy

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/2 | Not started | - |
| 2. Scroll Narrative | 0/2 | Not started | - |
| 3. Animation + Waitlist | 0/2 | Not started | - |
