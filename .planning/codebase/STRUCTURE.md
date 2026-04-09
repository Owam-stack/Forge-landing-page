# Codebase Structure

**Analysis Date:** 2026-03-26

## Directory Layout

```
forge/
├── src/                          # Source code
│   ├── features/                 # Feature modules (6 domains)
│   │   ├── dashboard/            # Overview and insights
│   │   ├── habits/               # Daily habit tracking
│   │   ├── goals/                # Goal management with milestones
│   │   ├── journal/              # Daily journal entries
│   │   ├── learning/             # Learning items tracking
│   │   └── exercise/             # Exercise log tracking
│   ├── components/               # Shared UI components
│   │   └── Layout.tsx            # App shell: sidebar + main area
│   ├── hooks/                    # Custom React hooks
│   │   └── useLiveQuery.ts       # Database query subscription wrapper
│   ├── lib/                      # Business logic and utilities
│   │   ├── insights.ts           # Insight generation algorithm
│   │   ├── dates.ts              # Date utilities
│   │   └── quotes.ts             # Daily quote data
│   ├── db/                       # Data persistence layer
│   │   └── index.ts              # Dexie database schema and types
│   ├── assets/                   # Static assets
│   ├── main.tsx                  # App entry point
│   └── index.css                 # Global styles + theme variables
├── public/                       # Public static files (favicon, etc.)
├── dist/                         # Built output (generated)
├── node_modules/                 # Dependencies
├── index.html                    # HTML template
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # Root TypeScript config
├── tsconfig.app.json             # App TypeScript config (strict mode)
├── tsconfig.node.json            # Node TypeScript config
├── package.json                  # Dependencies and scripts
├── eslint.config.js              # ESLint configuration
└── README.md                     # Project documentation
```

## Directory Purposes

**src/features/:**
- Purpose: Feature-driven modules, each handles one domain (habits, goals, etc.)
- Contains: Feature page components (e.g., `Habits.tsx`), form logic, filtering logic
- Key files:
  - `src/features/dashboard/Dashboard.tsx` (304 lines) — Highest traffic, shows all stats
  - `src/features/exercise/Exercise.tsx` (459 lines) — Largest component, set tracking complexity
  - `src/features/journal/Journal.tsx` (397 lines) — Mood/energy/gratitude tracking
  - `src/features/goals/Goals.tsx` (355 lines) — Goal + milestone management
  - `src/features/habits/Habits.tsx` (311 lines) — Habit CRUD + weekly calendar
  - `src/features/learning/Learning.tsx` (283 lines) — Learning progress tracking

**src/components/:**
- Purpose: Shared UI components used across features
- Contains: Layout wrapper that provides sidebar navigation and main area outlet
- Key files: `src/components/Layout.tsx` (65 lines) — Navigation sidebar, Outlet for routes

**src/hooks/:**
- Purpose: Custom React hooks for patterns and state management
- Contains: Wrapper around Dexie React hooks for type-safe database queries
- Key files: `src/hooks/useLiveQuery.ts` (3 lines) — Re-exports dexieUseLiveQuery with renamed export

**src/lib/:**
- Purpose: Business logic, algorithms, utilities (not UI-specific)
- Contains: Insights generation, date helpers, quote data
- Key files:
  - `src/lib/insights.ts` (390 lines) — Core algorithm: analyzes 30 days of data, generates 6 insight types
  - `src/lib/dates.ts` (28 lines) — Helper functions: `today()`, `getLast7Days()`, `formatDisplay()`, etc.
  - `src/lib/quotes.ts` (24 lines) — 17 motivational quotes, selected by day-of-year

**src/db/:**
- Purpose: Data layer — database schema, types, initialization
- Contains: Dexie instance, 7 entity interfaces, table definitions
- Key files: `src/db/index.ts` (115 lines) — Database schema with indexes for filtering/range queries

**src/assets/:**
- Purpose: Static assets (images, SVGs, etc.)
- Contains: Minimal content (likely empty or favicon)

**public/:**
- Purpose: Files served as-is (favicon, etc.)
- Contains: `favicon.svg`

**src/index.css:**
- Purpose: Global styles and theme variables
- Contains: Tailwind import, custom CSS variables (colors, fonts), scrollbar styling

## Key File Locations

**Entry Points:**
- `src/main.tsx` (28 lines) — React app initialization, route setup, DOM mounting
- `index.html` (17 lines) — HTML template, loads main.tsx, Google Fonts

**Configuration:**
- `vite.config.ts` — Vite + React + Tailwind setup, port 5180, path alias `@/`
- `tsconfig.app.json` — TypeScript strict mode enabled, target ES2023
- `eslint.config.js` — ESLint with React hooks and refresh rules

**Core Logic:**
- `src/db/index.ts` — Database schema (7 tables, indexes, TypeScript types)
- `src/lib/insights.ts` — Insight generation with 14+ insight types
- `src/components/Layout.tsx` — App shell with navigation

**Feature Pages:**
- `src/features/dashboard/Dashboard.tsx` — Main hub (stats, insights, today's habits)
- `src/features/habits/Habits.tsx` — Habit management + weekly calendar
- `src/features/goals/Goals.tsx` — Goal + milestone management
- `src/features/journal/Journal.tsx` — Daily entries with mood/energy tracking
- `src/features/learning/Learning.tsx` — Learning progress tracking
- `src/features/exercise/Exercise.tsx` — Exercise logging with sets

**Testing:**
- No test files present in codebase

## Naming Conventions

**Files:**
- Components: PascalCase, `.tsx` extension (e.g., `Dashboard.tsx`, `Layout.tsx`)
- Utilities: camelCase, `.ts` extension (e.g., `insights.ts`, `dates.ts`)
- Database: `index.ts` for exports from directories (e.g., `src/db/index.ts`)

**Directories:**
- Feature folders: kebab-case + lowercase (e.g., `features/dashboard/`, `features/habits/`)
- Grouped by domain: `features/`, `hooks/`, `lib/`, `components/`, `db/`

**Components:**
- PascalCase with export keyword (e.g., `export function Dashboard() { }`)
- No default exports; all use named exports

**Types & Interfaces:**
- PascalCase (e.g., `Habit`, `HabitLog`, `Insight`)
- Exported from `src/db/index.ts` for shared types

**Constants:**
- UPPER_SNAKE_CASE (e.g., `NAV_ITEMS`, `CATEGORY_COLORS`, `TABS`)
- Defined in components or features as needed
- Color maps: `Record<Category, string>` (e.g., `CATEGORY_COLORS: Record<Category, string>`)

**Variables & Functions:**
- camelCase (e.g., `toggleHabit`, `addGoal`, `generateInsights`)
- Props: camelCase (e.g., `icon`, `label`, `value`)

## Where to Add New Code

**New Feature:**
- Primary code: Create `src/features/[feature-name]/[Feature].tsx`
- Route: Add route to `src/main.tsx` in Routes
- Navigation: Add entry to `NAV_ITEMS` array in `src/components/Layout.tsx`
- Database: Add table and types to `src/db/index.ts` if new entities needed

**New Component:**
- Shared components: `src/components/[ComponentName].tsx`
- Feature-specific UI: Keep in feature folder (e.g., `src/features/habits/HabitCard.tsx`)

**New Utility Function:**
- Date operations: `src/lib/dates.ts`
- Business logic: `src/lib/[domain].ts` (create if needed)
- UI colors/constants: Define in feature component or add to `src/index.css`

**Database Model:**
- Add interface to `src/db/index.ts`
- Add EntityTable declaration to db instance
- Add to `db.version().stores()` with indexes

**Hook:**
- Custom hooks: `src/hooks/[useHookName].ts`
- Simple wrapper: Re-export or compose existing hooks

**Styling:**
- Inline Tailwind classes in JSX (no CSS modules)
- Custom theme colors in `src/index.css` as CSS variables
- Color palette: Use `--color-[name]` for consistent theme

## Special Directories

**node_modules/:**
- Purpose: Installed dependencies
- Generated: Yes (npm install)
- Committed: No (.gitignore)
- Key dependencies: React, React Router, Tailwind CSS, Dexie, Lucide, Recharts, date-fns

**dist/:**
- Purpose: Production build output
- Generated: Yes (vite build)
- Committed: No (.gitignore)
- Build command: `npm run build`

**.planning/codebase/:**
- Purpose: Codebase analysis documents (this structure)
- Generated: No (manually created)
- Committed: Yes (tracking architecture decisions)

## Path Alias

**@/ alias:**
- Resolves to: `src/`
- Usage: `import { db } from '@/db'` instead of `../../db`
- Configured in: `vite.config.ts` and `tsconfig.app.json`
- Applies to all source files

---

*Structure analysis: 2026-03-26*
