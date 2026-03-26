<!-- GSD:project-start source:PROJECT.md -->
## Project

**Forge**

Forge is a self-improvement app that helps users build discipline and grow across key areas of life. The first deliverable is a static landing page hosted on GitHub Pages — a scroll-driven, cinematic experience that confronts visitors with their stagnation and presents Forge as the answer. The full app will include AI-powered coaching (Claude skill) that checks in with users, tracks mood and activity, and guides intentional growth.

**Core Value:** Help users build discipline through daily accountability and intentional practice — if everything else fails, the discipline engine must work.

### Constraints

- **Hosting**: GitHub Pages — static HTML/CSS/JS only, no server-side
- **Design system**: Nordic Minimalist — Syne + DM Sans, no deviations
- **Imagery**: Stock/placeholder images initially, user may replace later
- **Project location**: `~/Dev/forge`
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 5.9.3 - Application logic and type safety across frontend
- CSS - Styling via Tailwind CSS 4.2.2
- JavaScript - Build configuration and ES modules
## Runtime
- Node.js (managed via nvm, as per developer preferences)
- npm - Specified in package.json scripts
- Lockfile: package-lock.json present
## Frameworks
- React 19.2.4 - UI library with functional components and hooks
- React Router DOM 7.13.2 - Client-side routing for dashboard navigation
- Vite 8.0.1 - Build tool and dev server (port 5180)
- Tailwind CSS 4.2.2 - Utility-first CSS framework with custom color palette
- Tailwind CSS Vite Plugin 4.2.2 - Integration with Vite build pipeline
- Lucide React 1.7.0 - Icon library for navigation and dashboard visualizations
- Recharts 3.8.1 - Charting library for data visualization in dashboard
- Dexie 4.3.0 - IndexedDB wrapper and ORM for local client-side database
- Dexie React Hooks 4.2.0 - React hooks for reactive queries on Dexie database (useLiveQuery)
- date-fns 4.1.0 - Date formatting, manipulation, and calculations
- uuid 13.0.0 - UUID generation for record IDs
## Development Tools
- Not detected in current stack
- ESLint 9.39.4 - Static analysis and code quality
- @eslint/js 9.39.4 - ESLint recommended configurations
- typescript-eslint 8.57.0 - TypeScript linting rules
- eslint-plugin-react-hooks 7.0.1 - React Hooks rules enforcement
- eslint-plugin-react-refresh 0.5.2 - Vite React refresh validation
- globals 17.4.0 - Environment global variables
- @vitejs/plugin-react 6.0.1 - React JSX transformation plugin
- TypeScript compiler (tsc) - Invoked as build step before Vite
- TypeScript strict mode enabled - Enforces strict type safety
## Key Dependencies
- dexie (4.3.0) - The entire data persistence layer relies on this IndexedDB wrapper. No backend or API.
- react (19.2.4) - Core UI framework and React Router depend on this for all rendering
- react-router-dom (7.13.2) - Multi-page navigation within single-page application
- date-fns (4.1.0) - Central to date calculations in `src/lib/dates.ts` and insight generation in `src/lib/insights.ts`
- lucide-react (1.7.0) - All navigation icons and dashboard stat icons
- uuid (13.0.0) - Record ID generation for database entries
- recharts (3.8.1) - Charts and graphs in dashboard features
- tailwindcss (4.2.2) - Complete design system (custom colors: forge, habit, goal, journal, learning, exercise)
## Configuration Files
- `tsconfig.json` - Root reference file (monorepo-style structure)
- `tsconfig.app.json` - Application build configuration with strict mode enabled
- `tsconfig.node.json` - Build tooling configuration (Vite config compilation)
- `vite.config.ts` - Vite configuration with React and Tailwind plugins
- `eslint.config.js` - ESLint configuration (flat config format)
- `index.html` - Single entry point
## Build & Dev Scripts
## Platform Requirements
- Node.js with nvm (developer preference)
- npm for package management
- Modern browser with ES2023 support
- IndexedDB support (client-side storage)
- Static file hosting (S3, Netlify, Vercel, GitHub Pages, etc.)
- No backend server required — entirely client-side application
- Browser must support IndexedDB and ES2023 JavaScript
## Data Persistence
- Dexie (IndexedDB) - All data stored locally in browser
- Collections: habits, habitLogs, goals, journalEntries, learningItems, exerciseLogs, dailySnapshots
- No synchronization to backend — data is device-local only
## Special Features
- Application runs entirely in the browser
- No API calls or backend integration
- Data persists in client-side IndexedDB only
- No cloud synchronization or multi-device sync
- `--color-forge`: #111111 (primary dark)
- `--color-habit`: #10b981 (emerald for habit tracking)
- `--color-goal`: #3b82f6 (blue for goals)
- `--color-journal`: #f59e0b (amber for journal)
- `--color-learning`: #8b5cf6 (purple for learning)
- `--color-exercise`: #ef4444 (red for exercise)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Components: PascalCase, single file per feature (e.g., `Dashboard.tsx`, `Habits.tsx`)
- Utilities/lib: camelCase (e.g., `insights.ts`, `dates.ts`)
- Hooks: camelCase with `use` prefix (e.g., `useLiveQuery.ts`)
- Database/config: descriptive names (e.g., `index.ts` for db schema)
- Async functions: plain camelCase or `generate`/`get`/`create` prefix pattern
- Example: `generateInsights()`, `getDayName()`, `getCurrentWeekDays()`
- Handler functions: `handleX` pattern (e.g., in component state)
- Constants (module-level): UPPER_SNAKE_CASE (e.g., `CATEGORY_COLORS`, `EMPTY_FORM`, `DAY_NAMES`, `NAV_ITEMS`)
- Local state: camelCase (e.g., `todayStr`, `showForm`, `habits`, `weekLogs`)
- Component state: camelCase with clear intent (e.g., `form`, `insights`, `completionsByDay`)
- Interfaces: PascalCase (e.g., `Habit`, `Goal`, `JournalEntry`, `Insight`)
- Type unions from models: plain type name (e.g., `type Category = Habit['category']`)
- Record/mapping types: PascalCase or descriptive name (e.g., `CATEGORY_COLORS: Record<Category, string>`)
## Code Style
- Tool: ESLint with Flat Config (`eslint.config.js`)
- Extends: `@eslint/js`, `typescript-eslint`, `react-hooks`, `react-refresh`
- Language: ES2020, browser globals
- Strict TypeScript: `tsconfig.app.json` with strict checking enabled
- React Hooks ESLint rules enabled (`eslint-plugin-react-hooks`)
- React Refresh support for hot module replacement
- TypeScript strict mode enforced
- No explicit line limit configured, but observed patterns stay under 120 chars
- Functions decomposed into logical steps (see `generateInsights()` for example)
- Inline comments mark logical sections (e.g., `// === HABIT PATTERNS ===`)
## Import Organization
- `@/` maps to `src/` via `vite.config.ts` resolve alias
- Always use `@/` for imports within `src/` (e.g., `import { db } from '@/db'`)
## Error Handling
- Database queries wrapped with `.catch()` fallback (e.g., `db.habits.where('archived').equals(0).toArray().catch(() => db.habits.toArray())`)
- Async functions return data or empty arrays/objects on failure
- No explicit error throwing in utility functions; graceful degradation with defaults
## Logging
- No explicit logging in utility functions; rely on browser DevTools
- No production logging infrastructure detected
- Debug-friendly function names (`generateInsights`, `getDayName`) aid troubleshooting
## Comments
- Section markers for logical blocks (e.g., `// === MOOD + EXERCISE CORRELATION ===`)
- Non-obvious calculations or thresholds (seen in `insights.ts` with confidence scores and percentage thresholds)
- Logic that combines multiple data sources
- Used sparingly
- Interface exports have type definitions (e.g., `export interface Insight { ... }`)
- No function-level JSDoc comments observed; types serve as documentation
## Function Design
- Utility functions: 300–400 lines acceptable for complex logic (e.g., `generateInsights()` is 391 lines but logically split into sections)
- Components: 50–350 lines depending on UI complexity
- Early return pattern used to reduce nesting
- Minimal parameters; prefer closure over long param lists
- Async functions may take no parameters (e.g., `generateInsights()`)
- Type-safe: all parameters typed (e.g., `function generateInsights(): Promise<Insight[]>`)
- Explicit return types required (TypeScript strict)
- Arrays and objects preferred over null/undefined (e.g., return `[]` not `null`)
- Promise-based for async work
## Module Design
- Named exports preferred (e.g., `export function generateInsights()`, `export interface Insight`)
- Single re-export wrapper allowed (e.g., `useLiveQuery.ts` re-exports dexie hook)
- Database module exports types and singleton instance
- NOT used for general exports
- `@/db` is primary index for schema types and db instance
- Feature modules import directly: `import { db } from '@/db'` rather than from a barrel
## File Organization
- One component per file (e.g., `Habits.tsx` exports single `Habits` component)
- Component state and UI logic colocated
- Database operations via imported `db` instance and hooks
## Styling
- Utility-first approach (classes like `flex`, `gap-3`, `px-3`, `py-2.5`)
- Custom color tokens in Tailwind config (e.g., `bg-forge`, `bg-forge-card`, `text-forge-muted`)
- Responsive: mobile-first (seen in `Layout.tsx` with `w-64 flex h-screen`)
- Hover states: `hover:text-forge`, `hover:bg-stone-100`
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- React 19 with functional components and hooks
- Decentralized state management via IndexedDB (Dexie)
- Feature-driven folder structure with minimal shared infrastructure
- Real-time reactive UI updates via Dexie React hooks
- Intelligent insight generation from accumulated user data
- No backend server — all data is client-local
## Layers
- Purpose: UI components, routing, user interactions
- Location: `src/features/`, `src/components/`
- Contains: Feature pages (Dashboard, Habits, Goals, etc.), Layout wrapper, form components
- Depends on: React Router, Lucide icons, Recharts for visualization, database hooks
- Used by: React DOM, Vite build system
- Purpose: Application state management, data persistence
- Location: `src/db/`
- Contains: Dexie database instance, TypeScript interfaces for all data models
- Depends on: Dexie ORM, IndexedDB (browser native)
- Used by: All feature pages, insights system, hooks
- Purpose: Data computations, insights generation, utility functions
- Location: `src/lib/`
- Contains: Insights generation (`insights.ts`), date utilities (`dates.ts`), quote selection (`quotes.ts`)
- Depends on: Database layer, date-fns library
- Used by: Feature pages, Dashboard
- Purpose: Custom React hooks for state management patterns
- Location: `src/hooks/`
- Contains: `useLiveQuery` — wrapper around Dexie React hooks for reactive queries
- Depends on: Dexie React hooks, React
- Used by: All feature pages for data fetching
## Data Flow
```
```
- **Local component state**: Form inputs (e.g., `const [form, setForm] = useState(EMPTY_FORM)`)
- **Database state**: All persistent data in Dexie tables
- **Derived state**: Computed values like streaks, averages, flags (calculated in components)
- No Redux/Zustand — Dexie with React hooks is sufficient for this app's scope
## Key Abstractions
- **Habit**: Recurring actions (name, category, frequency, time-of-day)
- **HabitLog**: Daily completion records (habitId, date, completed flag, note)
- **Goal**: Long-term objectives with milestone tracking (status: active|completed|paused)
- **JournalEntry**: Daily reflections (mood, energy 1-5, content, gratitude tags)
- **LearningItem**: Skill/book/course progress tracking (status, progress %)
- **ExerciseLog**: Workout records (type, duration, sets, energy before/after)
- **DailySnapshot**: Aggregated daily metrics (habits completed, mood, energy, exercise minutes)
- `achievement` — Positive milestones (e.g., "building momentum")
- `pattern` — Behavioral observations (e.g., "morning person")
- `suggestion` — Actionable recommendations (e.g., "reduce load on weak days")
- `warning` — Risk alerts (e.g., "habits slipping")
- All date strings: `YYYY-MM-DD` (ISO 8601 short form)
- Stored as strings for consistent querying and range operations
- Formatted for display using `date-fns` helpers (`formatDisplay`, `formatShort`)
## Entry Points
- Location: `src/main.tsx`
- Triggers: Application startup
- Responsibilities:
- Location: `src/main.tsx` (route definitions)
- Routes: `/` (Dashboard), `/habits`, `/goals`, `/journal`, `/learning`, `/exercise`
- Each route maps to a feature page component
- Layout wrapper provides sidebar navigation for all routes
- `src/features/dashboard/Dashboard.tsx` — Overview, stats, today's habits, insights
- `src/features/habits/Habits.tsx` — CRUD habits, weekly calendar, streak tracking
- `src/features/goals/Goals.tsx` — CRUD goals with milestones, status filtering
- `src/features/journal/Journal.tsx` — Daily entries with mood, energy, gratitude
- `src/features/learning/Learning.tsx` — Learning items with progress tracking
- `src/features/exercise/Exercise.tsx` — Exercise logs with set tracking
## Error Handling
- Form validation: Check `.trim()` before submission, disable submit button if invalid
- Missing data: Show empty state UI ("No habits yet. Create some...") instead of errors
- Async operations: No explicit error boundaries; Dexie operations assumed to succeed
- Dexie query fallback: `db.habits.where('archived').equals(0).toArray().catch(() => db.habits.toArray())` handles schema evolution
## Cross-Cutting Concerns
- Input validation in components (e.g., `!form.name.trim()` blocks submission)
- Date validation implicit via date-fns library
- No form library (Zod, Yup) — simple string checks
- Not implemented. App assumes single-user device context (browser IndexedDB is per-origin).
- No user login, no multi-user support, no data sync.
- Tailwind CSS v4 with custom theme variables in `src/index.css`
- Design tokens: `--color-forge` (brand), `--color-forge-surface` (bg), `--color-forge-border` (dividers)
- Feature-specific accent colors: habit (#10b981), goal (#3b82f6), journal (#f59e0b), exercise (#ef4444)
- Components use inline Tailwind classes (no CSS modules)
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
