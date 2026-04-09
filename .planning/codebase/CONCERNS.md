# Codebase Concerns

**Analysis Date:** 2026-03-26

## Architecture & Code Organization

**Large Feature Components:**
- Issue: Feature components exceed 300-450 lines, violating the 300-line target from CLAUDE.md
- Files: `src/features/exercise/Exercise.tsx` (459 lines), `src/features/journal/Journal.tsx` (397 lines), `src/features/goals/Goals.tsx` (355 lines), `src/features/habits/Habits.tsx` (311 lines), `src/features/dashboard/Dashboard.tsx` (304 lines)
- Impact: Reduced readability, harder to test, increased cognitive load, violates personal code style guide
- Fix approach: Extract form sections into separate components (e.g., `ExerciseForm.tsx`, `ExerciseHistory.tsx`), extract type definitions and constants into separate files, create reusable sub-components

**Insights Module Complexity:**
- Issue: `src/lib/insights.ts` (390 lines) contains all insight generation logic in a single async function
- Files: `src/lib/insights.ts`
- Impact: Single responsibility violation, difficult to test individual insight types, hard to maintain
- Fix approach: Split into separate insight generators (e.g., `habitInsights.ts`, `exerciseInsights.ts`, `journalInsights.ts`), create a factory or composition pattern to combine results

## Data & State Management

**No Validation Layer:**
- Issue: Forms accept user input directly without validation before database insertion
- Files: `src/features/exercise/Exercise.tsx` (line 99-119), `src/features/journal/Journal.tsx` (lines 63-85), `src/features/goals/Goals.tsx`, `src/features/habits/Habits.tsx`
- Impact: Invalid data can enter database (negative durations, empty names, invalid dates), no user feedback on validation errors
- Fix approach: Add Zod schemas (already in package.json) for each entity type, validate before db.add/update, show validation errors in UI

**IndexedDB Schema Rigidity:**
- Issue: Single db.version(1) means schema changes require migration strategy that doesn't exist yet
- Files: `src/db/index.ts` (lines 105-113)
- Impact: If schema needs changes (new fields, indexes), no clear path forward for existing users
- Fix approach: Document versioning strategy, add numbered migration patterns, create utility functions for schema upgrades

**No Data Export/Backup:**
- Issue: All data stored in browser-local IndexedDB with no export, import, or backup mechanism
- Files: All database operations use only Dexie
- Impact: User data loss if browser storage is cleared, no way to backup or migrate to another device
- Fix approach: Add export-to-JSON and import-from-JSON utilities, consider periodic backup to localStorage or cloud

## Testing & Quality

**No Test Coverage:**
- Issue: Zero test files present (search for .test.ts, .spec.ts returned only node_modules)
- Files: No test files found in src/
- Impact: No automated verification of business logic, refactoring is risky, regressions can slip through
- Fix approach: Add vitest/jest configuration (already in devDeps: not present), start with unit tests for `src/lib/insights.ts` and `src/lib/dates.ts`, add component tests for critical features

**No Type Safety Enforcement:**
- Issue: ESLint config uses recommended TypeScript rules but not strict type checking
- Files: `eslint.config.js` (uses `tseslint.configs.recommended` only)
- Impact: Implicit `any` types possible, casting without validation, loose type coverage
- Fix approach: Upgrade to `tseslint.configs.strictTypeChecked`, add noImplicitAny: true in tsconfig.app.json, run tsc --strict to identify gaps

**Missing Error Boundaries:**
- Issue: No React error boundaries or try-catch in async database operations
- Files: All feature components (Exercise.tsx, Journal.tsx, etc.)
- Impact: Unhandled promise rejections crash silently, form submissions can fail without user feedback
- Fix approach: Create error boundary component, wrap all db operations in try-catch with user-facing error messages

## Performance & Scalability

**Inefficient Insight Generation:**
- Issue: `generateInsights()` performs multiple full-table scans and redundant computations (lines 26-32, 87-97, 163-175 of insights.ts)
- Files: `src/lib/insights.ts`
- Impact: Slow on large datasets, blocks UI while computing, no caching
- Fix approach: Add memoization or query result caching, batch database queries, generate insights in background worker

**No Pagination in Lists:**
- Issue: All queries return full result sets (e.g., `exerciseLogs.orderBy('date').reverse().toArray()`)
- Files: `src/features/exercise/Exercise.tsx` (line 74-76), `src/features/journal/Journal.tsx` (lines 40-47), all feature components
- Impact: Memory bloat with hundreds of entries, slow initial render, no virtual scrolling
- Fix approach: Implement pagination or cursor-based infinite scroll, use IndexedDB range queries with limits

## Security Considerations

**No Data Validation on Input:**
- Issue: Text inputs accept any content without sanitization or length limits
- Files: All form components
- Impact: Potential for DOM-based XSS if data is displayed unsanitized (low risk with React, but bad practice), massive entries could bloat database
- Fix approach: Add length limits to input fields (maxLength on HTMLInputElement), trim whitespace, validate string patterns with Zod

**No Authentication/Authorization:**
- Issue: All data is unencrypted in local IndexedDB, any script can access it
- Files: All database interactions
- Impact: Browser extensions, malicious scripts can read user's personal habits, goals, journal entries
- Fix approach: Document this limitation, recommend users only run on trusted devices, consider encryption at rest (later enhancement)

**Missing Content Security Policy:**
- Issue: No CSP headers or inline script restrictions
- Files: `index.html`
- Impact: Vulnerable to XSS injection
- Fix approach: Add CSP meta tag, disable inline styles where possible (currently using inline style props in Exercise.tsx)

## UI/UX Issues

**Hard-coded Colors as Inline Styles:**
- Issue: Colors defined as inline style props instead of using Tailwind/CSS variables
- Files: `src/features/exercise/Exercise.tsx` (lines 21-27, 56, 193-194, 234)
- Impact: Difficult to maintain consistent theming, violates Tailwind CSS best practices
- Fix approach: Extract colors to Tailwind config or CSS custom properties, use Tailwind classes

**No Loading States:**
- Issue: Database operations (add, update, delete) don't show loading indicators or disable buttons
- Files: All feature components with async handlers
- Impact: User can double-submit forms, no feedback that action is in progress
- Fix approach: Add loading state to useState, disable buttons while pending, show spinners

**Inconsistent Form UX:**
- Issue: Different components have different form patterns (Exercise uses onSubmit, Journal uses saveEntry button inline)
- Files: `src/features/exercise/Exercise.tsx`, `src/features/journal/Journal.tsx`, `src/features/habits/Habits.tsx`, etc.
- Impact: User confusion, harder to maintain consistency, code duplication
- Fix approach: Create reusable Form component with consistent save/cancel patterns

## Dependencies & Maintenance

**Missing Test Dependencies:**
- Issue: No testing framework installed (vitest, jest, @testing-library/react not in package.json)
- Files: `package.json`
- Impact: Cannot run tests, prevents test-driven development
- Fix approach: Add `vitest`, `@vitest/ui`, `@testing-library/react`, `@testing-library/user-event`

**No Backend/API Layer:**
- Issue: Application is purely frontend, no server-side logic for insights or data persistence
- Files: Entire src/
- Impact: Data is not synced across devices, no server-side validation, insights generation can't run scheduled
- Fix approach: Document as prototype limitation, or add backend (Node.js, Supabase, etc.) for future enhancement

**Unused Dependencies:**
- Issue: `recharts` in package.json but not imported anywhere
- Files: `package.json` (line 20)
- Impact: Unnecessary bundle bloat
- Fix approach: Either use recharts for Dashboard visualizations, or remove

## Fragile Areas

**Type Casting in Habit Time Selection:**
- Issue: `'anytime' as TimeOfDay` cast in Habits.tsx without strict type definition
- Files: `src/features/habits/Habits.tsx`
- Impact: Silent type mismatch if TimeOfDay type changes, could break habit creation
- Fix approach: Ensure TimeOfDay type is exported from db/index.ts, use const assertion instead of cast, validate against known values

**Insight ID Collision Risk:**
- Issue: Insight IDs are hard-coded strings (e.g., 'habit-best-day', 'mood-exercise-link') without uniqueness checks
- Files: `src/lib/insights.ts` (lines 62, 75, etc.)
- Impact: If same insight is generated twice (due to caching issue), duplicate IDs could break Dashboard display
- Fix approach: Make insight IDs deterministic with hash of parameters, or use UUID generation

**Date String Handling:**
- Issue: Date format assumed to be 'YYYY-MM-DD' throughout but validated nowhere
- Files: `src/lib/dates.ts`, `src/db/index.ts` (interface date fields), all components
- Impact: Invalid date strings could break sorting, filtering, comparisons silently
- Fix approach: Create strict date type or validation utility, use date-fns consistently for all date operations

## Missing Features/Gaps

**No Data Persistence Across Tabs:**
- Issue: IndexedDB is updated in one tab, other open tabs don't reflect changes (no storage events)
- Files: All components using useLiveQuery
- Impact: User opens app in two tabs, edits in one, other tab shows stale data
- Fix approach: Add storage event listener or use shared worker to broadcast changes

**No Offline Sync Strategy:**
- Issue: App works offline but has no sync queue for when user comes back online
- Files: All async db operations
- Impact: If backend is added later, offline changes could conflict
- Fix approach: Document as frontend-only limitation, or implement optimistic updates with conflict resolution

**No Goal Deadline Alerts:**
- Issue: Goals have targetDate but no notifications when deadline approaches
- Files: `src/features/goals/Goals.tsx`
- Impact: User could miss goal deadlines silently
- Fix approach: Add deadline warning insight to generateInsights(), or add notification system

---

*Concerns audit: 2026-03-26*
