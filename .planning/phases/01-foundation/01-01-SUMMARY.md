---
phase: 01-foundation
plan: "01"
subsystem: infra
tags: [vite, typescript, github-pages, github-actions, gh-pages, eslint]

# Dependency graph
requires: []
provides:
  - "Vanilla TypeScript Vite project with base: '/forge/' for GitHub Pages subpath"
  - "GitHub Actions deploy workflow targeting dist/ via actions/deploy-pages@v4"
  - "Clean ESLint config (no React plugins)"
  - "src/main.ts vanilla entry point"
  - "index.html with Syne+DM Sans fonts, nav/main layout, /forge/favicon.svg"
affects:
  - 02-landing-page
  - 03-waitlist

# Tech tracking
tech-stack:
  added: [gh-pages@6.3.0]
  patterns:
    - "Vite base: '/forge/' for GitHub Pages subpath deployment"
    - "tsc -b && vite build as two-step build (TypeScript then bundle)"
    - "GitHub Actions Pages deploy using actions/deploy-pages@v4 (no gh-pages npm script at CI level)"

key-files:
  created:
    - vite.config.ts
    - src/main.ts
    - .github/workflows/deploy.yml
  modified:
    - tsconfig.app.json
    - eslint.config.js
    - package.json
    - index.html

key-decisions:
  - "Set base: '/forge/' in vite.config.ts on day one — prevents GitHub Pages subpath 404s"
  - "Use gh-pages@6.3.0 for optional npm run deploy script; GitHub Actions is the primary CI path"
  - "Removed @types/node since no path alias needed in vanilla-ts scaffold (no resolve.alias)"
  - "favicon href set to /forge/favicon.svg (subpath-aware) to work on GitHub Pages"

patterns-established:
  - "Vanilla-ts entry: src/main.ts using DOMContentLoaded pattern"
  - "index.html: semantic nav#nav + main#app layout shell for Phase 2"

requirements-completed: [INFRA-01, INFRA-02]

# Metrics
duration: 3min
completed: 2026-03-26
---

# Phase 01 Plan 01: Strip React scaffold and wire GitHub Pages deploy pipeline

**Vanilla TypeScript Vite project with `base: '/forge/'`, GitHub Actions Pages workflow, and clean ESLint config — no React, Tailwind, or Dexie remaining**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-26T20:28:23Z
- **Completed:** 2026-03-26T20:31:03Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- Stripped 109 npm packages (React 19, Tailwind CSS 4, Dexie, all related types and ESLint plugins)
- Rewrote vite.config.ts with `base: '/forge/'` — dist/index.html now correctly references `/forge/assets/...`
- Created `.github/workflows/deploy.yml` with full GitHub Pages deploy pipeline (checkout, node setup, npm ci, build, upload-pages-artifact, deploy-pages)
- `tsc -b`, `vite build`, and `eslint .` all pass cleanly on the vanilla-ts scaffold

## Task Commits

Each task was committed atomically:

1. **Task 1: Strip React/Tailwind dependencies and transform to vanilla-ts scaffold** - `c43d7c4` (chore)
2. **Task 2: Add GitHub Actions deploy workflow** - `0abb7f1` (chore)

**Plan metadata:** (committed with docs commit below)

## Files Created/Modified

- `vite.config.ts` — `base: '/forge/'`, no plugins, port 5180
- `tsconfig.app.json` — Removed `jsx: react-jsx`, removed React types
- `eslint.config.js` — Removed react-hooks and react-refresh plugins; targets `**/*.{ts}` only
- `package.json` — Added `deploy` script; removed all React/Tailwind/Dexie dependencies
- `index.html` — `/forge/favicon.svg`, Syne+DM Sans Google Fonts, `nav#nav` + `main#app`, `/src/main.ts` script
- `src/main.ts` — Vanilla TypeScript entry (`DOMContentLoaded` → `console.log('Forge loaded')`)
- `.github/workflows/deploy.yml` — GitHub Actions Pages deploy workflow (full pipeline)
- `package-lock.json` — Updated after uninstall + gh-pages install

## Decisions Made

- Set `base: '/forge/'` in vite.config.ts on day one to prevent GitHub Pages subpath 404s
- Used `gh-pages@6.3.0` as dev dependency for optional `npm run deploy` CLI path; GitHub Actions is the primary deploy pipeline
- Removed `@types/node` since the `path` import for resolve alias was removed (no alias needed in vanilla scaffold)
- Favicon set to `/forge/favicon.svg` (subpath-aware) so it resolves correctly when served from `https://hlomla.github.io/forge/`

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. Build succeeded on first attempt after all changes applied.

## User Setup Required

Before the GitHub Actions workflow can deploy, two manual steps are required:

1. Add GitHub remote: `git remote add origin https://github.com/Hlomla/forge.git`
2. Push main branch: `git push -u origin main`
3. Enable GitHub Pages in repo Settings → Pages → Source: **GitHub Actions**

After that, any push to `main` triggers the deploy workflow automatically.

## Next Phase Readiness

- Build pipeline is clean — Phase 2 can add CSS and HTML sections immediately
- `src/main.ts` is the entry point; Phase 2 extends it with scroll logic
- `index.html` has the `main#app` placeholder ready for Phase 2 section injection
- No blockers for Phase 2 execution

---
*Phase: 01-foundation*
*Completed: 2026-03-26*
