# Coding Conventions

**Analysis Date:** 2026-03-26

## Naming Patterns

**Files:**
- Components: PascalCase, single file per feature (e.g., `Dashboard.tsx`, `Habits.tsx`)
- Utilities/lib: camelCase (e.g., `insights.ts`, `dates.ts`)
- Hooks: camelCase with `use` prefix (e.g., `useLiveQuery.ts`)
- Database/config: descriptive names (e.g., `index.ts` for db schema)

**Functions:**
- Async functions: plain camelCase or `generate`/`get`/`create` prefix pattern
- Example: `generateInsights()`, `getDayName()`, `getCurrentWeekDays()`
- Handler functions: `handleX` pattern (e.g., in component state)

**Variables:**
- Constants (module-level): UPPER_SNAKE_CASE (e.g., `CATEGORY_COLORS`, `EMPTY_FORM`, `DAY_NAMES`, `NAV_ITEMS`)
- Local state: camelCase (e.g., `todayStr`, `showForm`, `habits`, `weekLogs`)
- Component state: camelCase with clear intent (e.g., `form`, `insights`, `completionsByDay`)

**Types:**
- Interfaces: PascalCase (e.g., `Habit`, `Goal`, `JournalEntry`, `Insight`)
- Type unions from models: plain type name (e.g., `type Category = Habit['category']`)
- Record/mapping types: PascalCase or descriptive name (e.g., `CATEGORY_COLORS: Record<Category, string>`)

## Code Style

**Formatting:**
- Tool: ESLint with Flat Config (`eslint.config.js`)
- Extends: `@eslint/js`, `typescript-eslint`, `react-hooks`, `react-refresh`
- Language: ES2020, browser globals
- Strict TypeScript: `tsconfig.app.json` with strict checking enabled

**Linting:**
- React Hooks ESLint rules enabled (`eslint-plugin-react-hooks`)
- React Refresh support for hot module replacement
- TypeScript strict mode enforced

**Line Length & Structure:**
- No explicit line limit configured, but observed patterns stay under 120 chars
- Functions decomposed into logical steps (see `generateInsights()` for example)
- Inline comments mark logical sections (e.g., `// === HABIT PATTERNS ===`)

## Import Organization

**Order:**
1. React/framework imports (e.g., `import { useState } from 'react'`)
2. External libraries (e.g., `from 'date-fns'`, `from 'lucide-react'`)
3. Internal absolute imports (e.g., `from '@/db'`, `from '@/lib/dates'`)
4. Local/relative imports (rarely used; prefer absolute `@/` paths)

**Path Aliases:**
- `@/` maps to `src/` via `vite.config.ts` resolve alias
- Always use `@/` for imports within `src/` (e.g., `import { db } from '@/db'`)

**Example pattern:**
```typescript
import { useState } from 'react'
import { db, type Habit } from '@/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { today, getCurrentWeekDays, getDayName } from '@/lib/dates'
import { v4 as uuid } from 'uuid'
import { Plus, X, CheckCircle2 } from 'lucide-react'
```

## Error Handling

**Patterns:**
- Database queries wrapped with `.catch()` fallback (e.g., `db.habits.where('archived').equals(0).toArray().catch(() => db.habits.toArray())`)
- Async functions return data or empty arrays/objects on failure
- No explicit error throwing in utility functions; graceful degradation with defaults

**Example from `generateInsights():`
```typescript
const [habits, habitLogs, journalEntries, exerciseLogs, goals] = await Promise.all([
  db.habits.where('archived').equals(0).toArray().catch(() => db.habits.toArray()),
  db.habitLogs.where('date').between(thirtyDaysAgo, todayStr, true, true).toArray(),
  // ... other queries
])
```

## Logging

**Framework:** `console` (native)

**Patterns:**
- No explicit logging in utility functions; rely on browser DevTools
- No production logging infrastructure detected
- Debug-friendly function names (`generateInsights`, `getDayName`) aid troubleshooting

## Comments

**When to Comment:**
- Section markers for logical blocks (e.g., `// === MOOD + EXERCISE CORRELATION ===`)
- Non-obvious calculations or thresholds (seen in `insights.ts` with confidence scores and percentage thresholds)
- Logic that combines multiple data sources

**JSDoc/TSDoc:**
- Used sparingly
- Interface exports have type definitions (e.g., `export interface Insight { ... }`)
- No function-level JSDoc comments observed; types serve as documentation

## Function Design

**Size:**
- Utility functions: 300–400 lines acceptable for complex logic (e.g., `generateInsights()` is 391 lines but logically split into sections)
- Components: 50–350 lines depending on UI complexity
- Early return pattern used to reduce nesting

**Parameters:**
- Minimal parameters; prefer closure over long param lists
- Async functions may take no parameters (e.g., `generateInsights()`)
- Type-safe: all parameters typed (e.g., `function generateInsights(): Promise<Insight[]>`)

**Return Values:**
- Explicit return types required (TypeScript strict)
- Arrays and objects preferred over null/undefined (e.g., return `[]` not `null`)
- Promise-based for async work

## Module Design

**Exports:**
- Named exports preferred (e.g., `export function generateInsights()`, `export interface Insight`)
- Single re-export wrapper allowed (e.g., `useLiveQuery.ts` re-exports dexie hook)
- Database module exports types and singleton instance

**Barrel Files:**
- NOT used for general exports
- `@/db` is primary index for schema types and db instance
- Feature modules import directly: `import { db } from '@/db'` rather than from a barrel

## File Organization

**Pattern - Feature-based structure:**
```
src/
├── features/           # Feature modules (routed pages)
│   ├── journal/
│   ├── goals/
│   ├── habits/
│   └── dashboard/
├── components/         # Shared/layout components
├── lib/               # Utility functions
├── hooks/             # React hooks
├── db/                # Database schema & instance
└── main.tsx          # Entry point
```

**Feature files:**
- One component per file (e.g., `Habits.tsx` exports single `Habits` component)
- Component state and UI logic colocated
- Database operations via imported `db` instance and hooks

## Styling

**Framework:** Tailwind CSS 4.2 (via `@tailwindcss/vite`)

**Patterns:**
- Utility-first approach (classes like `flex`, `gap-3`, `px-3`, `py-2.5`)
- Custom color tokens in Tailwind config (e.g., `bg-forge`, `bg-forge-card`, `text-forge-muted`)
- Responsive: mobile-first (seen in `Layout.tsx` with `w-64 flex h-screen`)
- Hover states: `hover:text-forge`, `hover:bg-stone-100`

**CSS Classes (Tailwind):**
```typescript
// Example from Layout.tsx
className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-0.5 ${
  isActive ? 'bg-forge text-white' : 'text-forge-muted hover:text-forge hover:bg-stone-100'
}`}
```

---

*Convention analysis: 2026-03-26*
