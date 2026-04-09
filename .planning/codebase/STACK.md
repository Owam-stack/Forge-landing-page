# Technology Stack

**Analysis Date:** 2026-03-26

## Languages

**Primary:**
- TypeScript 5.9.3 - Application logic and type safety across frontend
- CSS - Styling via Tailwind CSS 4.2.2

**Secondary:**
- JavaScript - Build configuration and ES modules

## Runtime

**Environment:**
- Node.js (managed via nvm, as per developer preferences)

**Package Manager:**
- npm - Specified in package.json scripts
- Lockfile: package-lock.json present

## Frameworks

**Core:**
- React 19.2.4 - UI library with functional components and hooks
- React Router DOM 7.13.2 - Client-side routing for dashboard navigation
- Vite 8.0.1 - Build tool and dev server (port 5180)

**Styling:**
- Tailwind CSS 4.2.2 - Utility-first CSS framework with custom color palette
- Tailwind CSS Vite Plugin 4.2.2 - Integration with Vite build pipeline

**UI Components:**
- Lucide React 1.7.0 - Icon library for navigation and dashboard visualizations
- Recharts 3.8.1 - Charting library for data visualization in dashboard

**State & Data:**
- Dexie 4.3.0 - IndexedDB wrapper and ORM for local client-side database
- Dexie React Hooks 4.2.0 - React hooks for reactive queries on Dexie database (useLiveQuery)

**Utilities:**
- date-fns 4.1.0 - Date formatting, manipulation, and calculations
- uuid 13.0.0 - UUID generation for record IDs

## Development Tools

**Testing:**
- Not detected in current stack

**Linting & Formatting:**
- ESLint 9.39.4 - Static analysis and code quality
- @eslint/js 9.39.4 - ESLint recommended configurations
- typescript-eslint 8.57.0 - TypeScript linting rules
- eslint-plugin-react-hooks 7.0.1 - React Hooks rules enforcement
- eslint-plugin-react-refresh 0.5.2 - Vite React refresh validation
- globals 17.4.0 - Environment global variables

**Build:**
- @vitejs/plugin-react 6.0.1 - React JSX transformation plugin
- TypeScript compiler (tsc) - Invoked as build step before Vite

**Type Checking:**
- TypeScript strict mode enabled - Enforces strict type safety

## Key Dependencies

**Critical:**
- dexie (4.3.0) - The entire data persistence layer relies on this IndexedDB wrapper. No backend or API.
- react (19.2.4) - Core UI framework and React Router depend on this for all rendering
- react-router-dom (7.13.2) - Multi-page navigation within single-page application

**Utilities:**
- date-fns (4.1.0) - Central to date calculations in `src/lib/dates.ts` and insight generation in `src/lib/insights.ts`
- lucide-react (1.7.0) - All navigation icons and dashboard stat icons
- uuid (13.0.0) - Record ID generation for database entries

**UI & Data Visualization:**
- recharts (3.8.1) - Charts and graphs in dashboard features
- tailwindcss (4.2.2) - Complete design system (custom colors: forge, habit, goal, journal, learning, exercise)

## Configuration Files

**TypeScript:**
- `tsconfig.json` - Root reference file (monorepo-style structure)
- `tsconfig.app.json` - Application build configuration with strict mode enabled
  - Target: ES2023
  - Strict mode: enabled
  - noUnusedLocals, noUnusedParameters: enabled
  - Path alias: `@/*` → `src/*`
- `tsconfig.node.json` - Build tooling configuration (Vite config compilation)

**Build:**
- `vite.config.ts` - Vite configuration with React and Tailwind plugins
  - Dev server: port 5180
  - Path alias for imports: `@` resolves to `src/`

**Linting:**
- `eslint.config.js` - ESLint configuration (flat config format)
  - Extends: recommended JS, TypeScript ESLint, React Hooks, React Refresh
  - Files: `**/*.{ts,tsx}`
  - Ignored: `dist/`

**HTML Entry:**
- `index.html` - Single entry point
  - Imports fonts from Google Fonts (Syne for display, DM Sans for body)
  - Root element: `<div id="root">`
  - Loads `src/main.tsx` as ES module

## Build & Dev Scripts

**Available Commands:**
```bash
npm run dev      # Start Vite dev server (HMR enabled, port 5180)
npm run build    # Run tsc -b && vite build (type check then bundle)
npm run lint     # ESLint check on all files
npm run preview  # Preview production build locally
```

## Platform Requirements

**Development:**
- Node.js with nvm (developer preference)
- npm for package management
- Modern browser with ES2023 support
- IndexedDB support (client-side storage)

**Production:**
- Static file hosting (S3, Netlify, Vercel, GitHub Pages, etc.)
- No backend server required — entirely client-side application
- Browser must support IndexedDB and ES2023 JavaScript

## Data Persistence

**Database:**
- Dexie (IndexedDB) - All data stored locally in browser
- Collections: habits, habitLogs, goals, journalEntries, learningItems, exerciseLogs, dailySnapshots
- No synchronization to backend — data is device-local only

## Special Features

**Local-First Architecture:**
- Application runs entirely in the browser
- No API calls or backend integration
- Data persists in client-side IndexedDB only
- No cloud synchronization or multi-device sync

**Custom Color Palette (Tailwind):**
- `--color-forge`: #111111 (primary dark)
- `--color-habit`: #10b981 (emerald for habit tracking)
- `--color-goal`: #3b82f6 (blue for goals)
- `--color-journal`: #f59e0b (amber for journal)
- `--color-learning`: #8b5cf6 (purple for learning)
- `--color-exercise`: #ef4444 (red for exercise)

---

*Stack analysis: 2026-03-26*
