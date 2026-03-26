# Phase 1: Foundation - Research

**Researched:** 2026-03-26
**Domain:** Vite static build pipeline + GitHub Pages deployment + CSS design system setup
**Confidence:** HIGH

## Summary

Phase 1 is a project transformation, not a greenfield setup. The current repo contains a fully-built React 19 + Tailwind + Dexie dashboard app. That codebase must be replaced with a vanilla-ts static landing page — different entry point, no React, no Tailwind, no router, no database. The transformation is the primary risk.

The foundation work covers three things: (1) wire the Vite build pipeline to output a GitHub Pages-deployable static site at `/forge/` base path, (2) configure the TypeScript project without React's JSX settings, and (3) establish the CSS custom properties design system (dark palette, Syne + DM Sans fonts, "F" logo). The fonts are already in `index.html` — that head block and the favicon SVG are the only reusable assets from the current codebase.

The design system for Phase 1 is CSS variables only — no component logic, no animations. The canvas must exist and be styled before any scroll narrative can be painted onto it in Phase 2.

**Primary recommendation:** Strip the repo to vanilla-ts, set `base: '/forge/'` in vite.config.ts, replace `src/main.tsx` with `src/main.ts`, add the GitHub Actions deploy workflow, and define CSS custom properties in a fresh `src/styles/tokens.css`. Do not carry forward any React/Tailwind/Dexie dependencies.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vite | 8.0.3 | Build tool + dev server | Already installed; supports vanilla-ts template out of the box |
| TypeScript | 5.9.3 | Type safety | Already installed; tsconfig needs jsx removed |
| gh-pages | 6.3.0 | Deploy dist/ to GitHub Pages branch | Simple npm-based alternative to GitHub Actions for manual deploys |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Google Fonts CDN | N/A | Syne + DM Sans font delivery | Already in index.html; free, no install needed |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| gh-pages npm package | GitHub Actions deploy.yml | Actions is the modern Vite-recommended approach; gh-pages is simpler for manual triggers with no CI setup required |

**Installation (new packages only):**
```bash
npm install --save-dev gh-pages
```

**What to remove:**
```bash
npm uninstall react react-dom react-router-dom @vitejs/plugin-react dexie dexie-react-hooks recharts lucide-react uuid date-fns @tailwindcss/vite tailwindcss @types/react @types/react-dom @types/uuid eslint-plugin-react-hooks eslint-plugin-react-refresh
```

**Version verified:** gh-pages 6.3.0 (npm view 2026-03-26), Vite 8.0.3 already installed.

## Architecture Patterns

### Recommended Project Structure (Post-Transformation)

```
forge/
├── src/
│   ├── main.ts              # Vanilla entry — no React
│   ├── styles/
│   │   ├── tokens.css       # CSS custom properties (colors, typography, spacing)
│   │   ├── reset.css        # Modern CSS reset
│   │   └── main.css         # Imports tokens + reset; global styles
│   └── assets/              # Any static assets referenced in TS
├── public/
│   ├── favicon.svg          # "F" logo SVG (already exists — keep)
│   └── icons.svg            # (already exists)
├── index.html               # Entry point — Google Fonts links already correct
├── vite.config.ts           # Must have base: '/forge/'
├── tsconfig.json            # Remove jsx setting
├── tsconfig.app.json        # Remove jsx: react-jsx
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions Pages deployment
└── package.json             # Scripts: dev, build, deploy, preview
```

### Pattern 1: Vite Base Path for GitHub Pages

**What:** Setting `base` in vite.config.ts ensures all asset paths are prefixed with the subpath.
**When to use:** Any Vite project deployed to a non-root GitHub Pages URL (username.github.io/repo-name/).

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/forge/',
  server: {
    port: 5180,
  },
})
```

Source: https://vite.dev/guide/static-deploy.html

### Pattern 2: CSS Custom Properties Design System (Dark Palette)

**What:** Define all design tokens as CSS custom properties on `:root`. Everything in the page consumes these variables — no Tailwind, no utility classes.
**When to use:** Single-page cinematic sites where full CSS control is required.

```css
/* src/styles/tokens.css */
:root {
  /* Typography */
  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;

  /* Color — dark monochrome */
  --color-bg: #0a0a0a;
  --color-surface: #111111;
  --color-surface-raised: #1a1a1a;
  --color-border: #222222;
  --color-text-primary: #f5f5f5;
  --color-text-secondary: #a0a0a0;
  --color-text-muted: #606060;
  --color-accent: #ffffff;

  /* Type scale — Syne headings */
  --text-display: 4.5rem;    /* 72px */
  --text-title: 3rem;        /* 48px */
  --text-subtitle: 2.25rem;  /* 36px */
  --text-section: 1.5rem;    /* 24px */

  /* Type scale — DM Sans body */
  --text-large: 1.125rem;    /* 18px */
  --text-base: 1rem;         /* 16px */

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;

  /* Layout */
  --nav-height: 4rem;
  --max-content: 72rem;
}
```

### Pattern 3: Vanilla Entry Point (No React)

**What:** `src/main.ts` is a plain TypeScript module — no JSX, no React imports.
**When to use:** Static pages with no component framework.

```typescript
// src/main.ts
import './styles/main.css'

// Minimal boot — Phase 2 will add scroll controller here
document.addEventListener('DOMContentLoaded', () => {
  console.log('Forge loaded')
})
```

### Pattern 4: "F" Logo (Already Exists as SVG)

The favicon.svg in `public/` already contains the correct "F" logo: black rounded square, white bold "F", system-ui font. For the nav, inline a simplified version or reference the same SVG.

```html
<!-- Nav logo — text-based fallback if SVG inline is overkill -->
<span class="nav-logo" aria-label="Forge">F</span>
```

### Pattern 5: GitHub Actions Deploy Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v4
        with:
          path: './dist'
      - id: deployment
        uses: actions/deploy-pages@v4
```

Source: https://vite.dev/guide/static-deploy.html

### Anti-Patterns to Avoid

- **Keeping React/Tailwind in the build:** Any leftover React plugin in vite.config.ts causes build errors with no JSX support in tsconfig.
- **Forgetting to remove `jsx: 'react-jsx'` from tsconfig.app.json:** TypeScript will fail to compile `.ts` files if jsx is set but no React is present.
- **Using absolute paths in CSS/JS:** `href="/styles/main.css"` becomes a 404 under `/forge/`. Let Vite handle all asset URLs — reference via import in main.ts.
- **Testing deploy only at root:** Always preview with `vite preview --base=/forge/` before pushing to Pages.
- **Leaving `src/` React components in place:** They don't need to compile for the build to succeed if not imported, but they create noise and can confuse future phases.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading | Custom font loader | Google Fonts CDN link in `<head>` | Browser handles caching, preconnect hint handles latency |
| Asset base path rewriting | Manual string replacement | `base: '/forge/'` in vite.config.ts | Vite rewrites all asset imports at build time |
| GitHub Pages deploy | Shell scripts, manual push | `gh-pages` package or GitHub Actions workflow | Handles gh-pages branch creation, CNAME preservation, orphan commit |
| CSS reset | Custom reset block | Modern CSS reset (small, inline in reset.css) | Browser quirks are well-documented; no need to rediscover them |

**Key insight:** The base path problem (INFRA-02) is the single most common cause of a working local build breaking on GitHub Pages. Set it first, verify with `vite preview --base=/forge/` before any other work.

## Common Pitfalls

### Pitfall 1: Forgetting `base` Until After Deployment

**What goes wrong:** All CSS/JS assets 404 on the deployed site. The page loads blank. Confusion follows as it works perfectly locally.
**Why it happens:** Local dev server serves from `/`. GitHub Pages serves from `/forge/`. Vite defaults to `base: '/'`.
**How to avoid:** Set `base: '/forge/'` in `vite.config.ts` as the very first code change in this phase. Verify immediately with `npm run build && npx vite preview`.
**Warning signs:** Running `npm run build` and seeing absolute asset URLs like `/assets/index-xxx.js` in `dist/index.html` (instead of `/forge/assets/...`).

### Pitfall 2: TypeScript Config Still Has JSX Settings

**What goes wrong:** `tsc -b` fails with "Cannot use JSX unless the '--jsx' flag is provided" or React type errors on non-React files.
**Why it happens:** `tsconfig.app.json` has `"jsx": "react-jsx"` and React types from when this was a React project.
**How to avoid:** Remove `"jsx": "react-jsx"` from tsconfig.app.json. Remove `@types/react` and `@types/react-dom` from devDependencies. Keep `"lib": ["ES2023", "DOM", "DOM.Iterable"]`.
**Warning signs:** Any `tsc` error mentioning JSX or React types.

### Pitfall 3: Google Fonts FOUT on Initial Load

**What goes wrong:** Flash of unstyled text — headings render in fallback system font for 0.5–2 seconds before Syne loads.
**Why it happens:** Browser fetches fonts asynchronously; CSS uses font before it's available.
**How to avoid:** `font-display: swap` is already set via the `&display=swap` parameter in the Google Fonts URL (already in index.html). Ensure the `<link rel="preconnect">` tags remain in `index.html`. Do NOT remove these when cleaning up the HTML.
**Warning signs:** Visible layout shift in the Network tab — fonts loading after first paint.

### Pitfall 4: Leftover ESLint Config Breaks After React Plugin Removal

**What goes wrong:** `npm run lint` throws errors about missing React-specific ESLint plugins after they're uninstalled.
**Why it happens:** `eslint.config.js` imports `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.
**How to avoid:** Update `eslint.config.js` to remove React plugin imports and rules after uninstalling those packages.
**Warning signs:** `eslint.config.js` imports modules that are no longer in `node_modules`.

### Pitfall 5: No GitHub Remote Set Up

**What goes wrong:** `npm run deploy` or `git push` fails. GitHub Actions workflow never runs.
**Why it happens:** Phase 1 is greenfield — the GitHub repo may not exist yet or the remote may not be wired.
**How to avoid:** Verify `git remote -v` shows an `origin` pointing to the GitHub repo before attempting any deploy step.
**Warning signs:** No output from `git remote -v`.

## Code Examples

### vite.config.ts (Final)

```typescript
// Source: https://vite.dev/guide/static-deploy.html
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: '/forge/',
  server: {
    port: 5180,
  },
  build: {
    outDir: 'dist',
  },
})
```

Note: Remove `@vitejs/plugin-react` and `@tailwindcss/vite` imports — they are React/Tailwind-specific.

### package.json Scripts (Updated)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "deploy": "gh-pages -d dist"
  }
}
```

`gh-pages -d dist` pushes the `dist/` folder to the `gh-pages` branch on the remote, which GitHub Pages serves.

### index.html (Cleaned)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/forge/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
    <title>Forge</title>
  </head>
  <body>
    <nav id="nav">
      <span class="nav-logo">F</span>
    </nav>
    <main id="app">
      <!-- Phase 2 sections go here -->
    </main>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

### src/styles/main.css

```css
/* Import order matters */
@import './reset.css';
@import './tokens.css';

body {
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
}

/* Navigation */
#nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  padding: 0 var(--space-md);
  z-index: 100;
  background: transparent;
}

.nav-logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-accent);
  letter-spacing: -0.02em;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `gh-pages` npm package for deploy | GitHub Actions with `actions/deploy-pages` | ~2022 | Actions is now the Vite-documented standard; gh-pages still works but is manual |
| Tailwind v3 config in tailwind.config.js | Tailwind v4 uses @theme in CSS | 2024 | Irrelevant — we're removing Tailwind entirely |
| `vitejs.dev` docs URL | `vite.dev` docs URL | ~2024 | Official docs now at vite.dev |

**Deprecated/outdated in this repo:**
- `@vitejs/plugin-react`: React JSX transform — not needed for vanilla-ts
- `@tailwindcss/vite`: Tailwind integration — not needed for plain CSS
- All Dexie/React/Router dependencies: SPA framework dependencies — not needed for static landing page

## Open Questions

1. **GitHub remote not confirmed**
   - What we know: `git remote -v` returned no output — no origin configured
   - What's unclear: Whether the GitHub repo exists and just isn't wired, or whether it needs to be created
   - Recommendation: Make creating/wiring the GitHub remote an explicit task in the plan. The deploy step depends on it.

2. **gh-pages vs GitHub Actions deploy**
   - What we know: Both approaches work. Vite docs recommend Actions. gh-pages package is simpler for local deploys.
   - What's unclear: Whether the user wants CI/CD auto-deploy on push, or a manual `npm run deploy` trigger
   - Recommendation: Implement both — GitHub Actions for CI, keep `npm run deploy` as manual escape hatch. Actions workflow only activates once the remote is set and the repo has GitHub Pages enabled in settings.

3. **ESLint config after React removal**
   - What we know: `eslint.config.js` imports react-hooks and react-refresh plugins
   - What's unclear: Whether to keep ESLint at all (only lints TypeScript for a simple static page)
   - Recommendation: Keep ESLint but strip to just `@eslint/js` + `typescript-eslint`. Remove react-specific plugins.

## Sources

### Primary (HIGH confidence)
- https://vite.dev/guide/static-deploy.html — Verified: base config, GitHub Actions workflow YAML, gh-pages approach
- Existing codebase inspection (`package.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/index.css`) — Verified: React/Tailwind stack is in place and must be removed

### Secondary (MEDIUM confidence)
- npm registry: `npm view vite version` → 8.0.3, `npm view gh-pages version` → 6.3.0, `npm view typescript version` → 6.0.2 (project uses 5.9.3 — fine, already installed)
- Existing pre-research docs (`.planning/research/STACK.md`, `ARCHITECTURE.md`, `PITFALLS.md`) — consensus with current findings

### Tertiary (LOW confidence)
- None required — all critical claims verified through codebase inspection and official docs

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified via codebase inspection + npm registry + official Vite docs
- Architecture: HIGH — existing repo structure fully inspected; transformation path is clear
- Pitfalls: HIGH — base path pitfall verified against official docs; JSX tsconfig pitfall verified by reading actual tsconfig.app.json; others from existing PITFALLS.md research

**Research date:** 2026-03-26
**Valid until:** 2026-06-26 (stable tools — Vite, gh-pages, TypeScript change slowly)

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INFRA-01 | Site deploys to GitHub Pages from the forge repository | GitHub Actions workflow (deploy.yml) + gh-pages package cover this; remote wiring is the prerequisite |
| INFRA-02 | Vite build pipeline outputs static assets with correct base path for GitHub Pages | `base: '/forge/'` in vite.config.ts; verified pattern from vite.dev docs |
| DESIGN-01 | Page uses Nordic Minimalist typography — Syne for headings, DM Sans for body | Google Fonts CDN links already in index.html; CSS custom properties map fonts to `--font-display` and `--font-body` |
| DESIGN-02 | Dark, moody, monochrome color palette applied throughout | CSS custom properties design system in tokens.css with dark palette (`--color-bg: #0a0a0a`, etc.) |
| DESIGN-03 | Minimal "F" logo displayed in navigation and as favicon | Favicon SVG already exists in public/; nav logo is a single styled `<span>` |
</phase_requirements>
