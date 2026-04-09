# Architecture

**Analysis Date:** 2026-03-26

## Pattern Overview

**Overall:** Client-side single-page application (SPA) with feature-based modular architecture and local-first data persistence.

**Key Characteristics:**
- React 19 with functional components and hooks
- Decentralized state management via IndexedDB (Dexie)
- Feature-driven folder structure with minimal shared infrastructure
- Real-time reactive UI updates via Dexie React hooks
- Intelligent insight generation from accumulated user data
- No backend server — all data is client-local

## Layers

**Presentation Layer:**
- Purpose: UI components, routing, user interactions
- Location: `src/features/`, `src/components/`
- Contains: Feature pages (Dashboard, Habits, Goals, etc.), Layout wrapper, form components
- Depends on: React Router, Lucide icons, Recharts for visualization, database hooks
- Used by: React DOM, Vite build system

**State & Persistence Layer:**
- Purpose: Application state management, data persistence
- Location: `src/db/`
- Contains: Dexie database instance, TypeScript interfaces for all data models
- Depends on: Dexie ORM, IndexedDB (browser native)
- Used by: All feature pages, insights system, hooks

**Business Logic Layer:**
- Purpose: Data computations, insights generation, utility functions
- Location: `src/lib/`
- Contains: Insights generation (`insights.ts`), date utilities (`dates.ts`), quote selection (`quotes.ts`)
- Depends on: Database layer, date-fns library
- Used by: Feature pages, Dashboard

**Hooks Layer:**
- Purpose: Custom React hooks for state management patterns
- Location: `src/hooks/`
- Contains: `useLiveQuery` — wrapper around Dexie React hooks for reactive queries
- Depends on: Dexie React hooks, React
- Used by: All feature pages for data fetching

## Data Flow

**Feature Page Lifecycle:**

1. **Initialization** → Feature page component mounts (e.g., `Habits.tsx`)
2. **Query Definition** → `useLiveQuery` hook defines queries against Dexie database
3. **Data Subscription** → Component subscribes to live query results (re-renders on DB changes)
4. **User Interaction** → Button clicks trigger create/update/delete operations
5. **DB Update** → Dexie writes changes to IndexedDB
6. **Reactive Re-render** → Live query hook detects change, component re-renders with new data

Example: Toggling a habit in Dashboard:
```
User clicks checkbox → toggleHabit(habitId) → db.habitLogs.add/update() →
Dexie detects change → useLiveQuery re-triggers → UI updates with new completion state
```

**Insights Generation:**

1. Dashboard component mounts
2. `useEffect` calls `generateInsights()` whenever habits/logs change
3. `generateInsights()` fetches data from all tables (habits, logs, journal, exercise, goals)
4. Analyzes patterns: streak detection, mood-exercise correlation, energy trends, etc.
5. Returns 0-6 insights sorted by type (achievement → pattern → suggestion → warning)
6. Component renders insights in grid

**State Management:**
- **Local component state**: Form inputs (e.g., `const [form, setForm] = useState(EMPTY_FORM)`)
- **Database state**: All persistent data in Dexie tables
- **Derived state**: Computed values like streaks, averages, flags (calculated in components)
- No Redux/Zustand — Dexie with React hooks is sufficient for this app's scope

## Key Abstractions

**Database Entities:**
- **Habit**: Recurring actions (name, category, frequency, time-of-day)
- **HabitLog**: Daily completion records (habitId, date, completed flag, note)
- **Goal**: Long-term objectives with milestone tracking (status: active|completed|paused)
- **JournalEntry**: Daily reflections (mood, energy 1-5, content, gratitude tags)
- **LearningItem**: Skill/book/course progress tracking (status, progress %)
- **ExerciseLog**: Workout records (type, duration, sets, energy before/after)
- **DailySnapshot**: Aggregated daily metrics (habits completed, mood, energy, exercise minutes)

**Insights Type Taxonomy:**
- `achievement` — Positive milestones (e.g., "building momentum")
- `pattern` — Behavioral observations (e.g., "morning person")
- `suggestion` — Actionable recommendations (e.g., "reduce load on weak days")
- `warning` — Risk alerts (e.g., "habits slipping")

**Date Format Convention:**
- All date strings: `YYYY-MM-DD` (ISO 8601 short form)
- Stored as strings for consistent querying and range operations
- Formatted for display using `date-fns` helpers (`formatDisplay`, `formatShort`)

## Entry Points

**Main Entry Point:**
- Location: `src/main.tsx`
- Triggers: Application startup
- Responsibilities:
  - Mounts React app to DOM
  - Initializes React Router with layout and feature routes
  - Wraps tree in StrictMode for development checks
  - Loads global CSS

**Root Router:**
- Location: `src/main.tsx` (route definitions)
- Routes: `/` (Dashboard), `/habits`, `/goals`, `/journal`, `/learning`, `/exercise`
- Each route maps to a feature page component
- Layout wrapper provides sidebar navigation for all routes

**Feature Pages** (each is an entry point for its domain):
- `src/features/dashboard/Dashboard.tsx` — Overview, stats, today's habits, insights
- `src/features/habits/Habits.tsx` — CRUD habits, weekly calendar, streak tracking
- `src/features/goals/Goals.tsx` — CRUD goals with milestones, status filtering
- `src/features/journal/Journal.tsx` — Daily entries with mood, energy, gratitude
- `src/features/learning/Learning.tsx` — Learning items with progress tracking
- `src/features/exercise/Exercise.tsx` — Exercise logs with set tracking

## Error Handling

**Strategy:** Graceful degradation with inline messaging.

**Patterns:**
- Form validation: Check `.trim()` before submission, disable submit button if invalid
- Missing data: Show empty state UI ("No habits yet. Create some...") instead of errors
- Async operations: No explicit error boundaries; Dexie operations assumed to succeed
- Dexie query fallback: `db.habits.where('archived').equals(0).toArray().catch(() => db.habits.toArray())` handles schema evolution

## Cross-Cutting Concerns

**Logging:** Not implemented. Uses browser console for debugging (implicit).

**Validation:**
- Input validation in components (e.g., `!form.name.trim()` blocks submission)
- Date validation implicit via date-fns library
- No form library (Zod, Yup) — simple string checks

**Authentication:**
- Not implemented. App assumes single-user device context (browser IndexedDB is per-origin).
- No user login, no multi-user support, no data sync.

**Styling:**
- Tailwind CSS v4 with custom theme variables in `src/index.css`
- Design tokens: `--color-forge` (brand), `--color-forge-surface` (bg), `--color-forge-border` (dividers)
- Feature-specific accent colors: habit (#10b981), goal (#3b82f6), journal (#f59e0b), exercise (#ef4444)
- Components use inline Tailwind classes (no CSS modules)

**Icons:** Lucide React for all UI icons (Flame, Target, CheckCircle2, etc.)

**Charts:** Recharts for mood/energy trend visualization in Dashboard

---

*Architecture analysis: 2026-03-26*
