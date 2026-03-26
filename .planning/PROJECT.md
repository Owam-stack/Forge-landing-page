# Forge

## What This Is

Forge is a self-improvement app that helps users build discipline and grow across key areas of life. The first deliverable is a static landing page hosted on GitHub Pages — a scroll-driven, cinematic experience that confronts visitors with their stagnation and presents Forge as the answer. The full app will include AI-powered coaching (Claude skill) that checks in with users, tracks mood and activity, and guides intentional growth.

## Core Value

Help users build discipline through daily accountability and intentional practice — if everything else fails, the discipline engine must work.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Static landing page hosted on GitHub Pages
- [ ] Scroll-driven emotional narrative (Stuck? → Restless? → Scattered? → Undisciplined? → Forge.)
- [ ] Dark, cinematic full-bleed photography between each question word
- [ ] "Discipline" reveal section explaining app pillars (Track Progress, Set Intentions, Daily Rituals)
- [ ] Waitlist form capturing name, email, and phone number
- [ ] "Coming Soon" bold statement
- [ ] Nordic Minimalist design system (Syne + DM Sans typography)
- [ ] Monochrome/dark palette with premium feel
- [ ] Minimal "F" logo
- [ ] Mobile-responsive design
- [ ] AI coach integration (Claude skill) for user check-ins, mood tracking, personal data collection
- [ ] Discipline coaching through prompted interactions

### Out of Scope

- Full app build (this milestone is landing page only) — app comes after validation
- User authentication — not needed for a static landing page
- Payment processing — no monetization yet
- Social features — solo discipline focus first

## Context

- **Creator**: Hlomla — personal project
- **Inspiration**: ju.st/eat/meat scroll-driven storytelling, Emergent typography templates (Nordic Minimalist selected)
- **Design reference**: Dark, moody, confrontational — not bright wellness. Shadows, grain, contrast. Like an intervention through design.
- **Typography**: Syne (primary/headings — Display 72px Bold, Title 48px Semibold, Subtitle 36px Medium, Section 24px Semibold) + DM Sans (body — Large 18px Regular, Regular 16px Regular)
- **Three pillars**: Track Progress (visualizations, metrics), Set Intentions (goals, actionable plans), Daily Rituals (habits, guided practices)
- **Scroll narrative**: Each question word appears full-screen with striking photography. Questions stack emotional tension. "Forge." lands as both the app name and a command — forge yourself.
- **Hosting**: GitHub Pages, repo on Hlomla's personal GitHub profile
- **Future AI**: Claude skill that acts as a discipline coach — prompts users about how they're feeling, what they're doing, collects personal data to personalize growth paths

## Constraints

- **Hosting**: GitHub Pages — static HTML/CSS/JS only, no server-side
- **Design system**: Nordic Minimalist — Syne + DM Sans, no deviations
- **Imagery**: Stock/placeholder images initially, user may replace later
- **Project location**: `~/Dev/forge`

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Nordic Minimalist typography (Syne + DM Sans) | Scandinavian clean, spacious, calm — matches discipline/intentionality theme | — Pending |
| Scroll-driven narrative over traditional sections | Inspired by ju.st — emotional impact over information density | — Pending |
| Dark/moody imagery over bright wellness aesthetic | Confrontational tone — this isn't a spa, it's about facing yourself | — Pending |
| "F" minimal logo | Clean, bold, unmistakable — matches Nordic Minimalist ethos | — Pending |
| Waitlist (name, email, phone) over direct signup | App not built yet — validate interest first | — Pending |
| GitHub Pages hosting | Free, simple, personal project — no backend needed for landing page | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-26 after initialization*
