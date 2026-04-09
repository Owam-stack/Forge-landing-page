# Testing Patterns

**Analysis Date:** 2026-03-26

## Test Framework

**Status:** No testing framework configured

**Configuration:**
- No `jest.config.js`, `vitest.config.ts`, or test runner configuration detected
- No test-related dependencies in `package.json` (no vitest, jest, @testing-library)
- No test files in codebase (searches for `*.test.*`, `*.spec.*` returned only node_modules entries)

**Recommendations for future setup:**
- Consider Vitest for fast unit testing (modern, integrates with Vite)
- Add `@testing-library/react` for component testing
- Configure test runner script: `npm run test`

## Test File Organization

**Current State:**
- No test files exist in the codebase
- Future location should follow: `src/` with `.test.ts` or `.spec.ts` suffix, or `src/__tests__/` subdirectories

**Recommended Pattern:**
```
src/features/habits/
├── Habits.tsx          # Component
└── Habits.test.tsx     # Co-located test

src/lib/
├── insights.ts         # Utility function
└── insights.test.ts    # Co-located test

src/hooks/
├── useLiveQuery.ts     # Hook
└── useLiveQuery.test.ts # Co-located test
```

## Testing Strategy

**What to prioritize (in order):**

1. **Insights generation logic** (`src/lib/insights.ts`)
   - Complex multi-step calculations (habit patterns, mood correlations, energy trends)
   - Edge cases: empty data, insufficient samples, thresholds (e.g., `bestRate > 0.7`, `avgEnergy < 2.5`)
   - **Why:** Core business logic, high value, deterministic input/output

2. **Database queries and state** (`src/db/index.ts`)
   - Schema definitions and indexes
   - Type safety of database operations
   - **Why:** Data integrity critical; cascading impact on all features

3. **Component behavior** (e.g., `Habits.tsx`, `Goals.tsx`)
   - Form submission and state management
   - User interactions (toggling, adding, deleting items)
   - Integration with database queries via hooks
   - **Why:** UI correctness; end-to-end validation

4. **Utility functions** (`src/lib/dates.ts`, `src/lib/quotes.ts`)
   - Date calculations, formatting
   - **Why:** Lower risk; already well-tested by date-fns

## Mocking Strategy

**When writing tests, use the following approach:**

**Mock Database (Dexie):**
```typescript
// Example setup for insights tests
import { db } from '@/db'
import { vi } from 'vitest'

// Mock Dexie operations
vi.mock('@/db', () => ({
  db: {
    habits: { toArray: vi.fn(), filter: vi.fn() },
    habitLogs: { where: vi.fn() },
    journalEntries: { where: vi.fn() },
    exerciseLogs: { where: vi.fn() },
    goals: { where: vi.fn() },
  }
}))
```

**Mock useLiveQuery Hook:**
```typescript
// For component tests that depend on Dexie hooks
vi.mock('dexie-react-hooks', () => ({
  useLiveQuery: vi.fn((query, deps) => {
    // Return sample data
    return [{ id: '1', name: 'Test Habit' }]
  })
}))
```

**What to Mock:**
- Database operations (Dexie) — use fixtures instead of real DB
- External hooks (`useLiveQuery`)
- Date functions if testing time-dependent logic (use frozen dates via `vi.setSystemTime()`)
- UUID generation for reproducible IDs

**What NOT to Mock:**
- Internal utility functions (e.g., `generateInsights` logic itself when testing)
- Tailwind/CSS classes (test behavior, not styling)
- Core React hooks (`useState`, `useEffect`)
- date-fns functions (already well-tested)

## Fixtures and Test Data

**Location:** Create `src/__fixtures__/` or co-locate in test files

**Example fixtures (for insights tests):**
```typescript
export const fixtureHabits = [
  {
    id: '1',
    name: 'Morning jog',
    description: 'Run 5km',
    category: 'exercise' as const,
    frequency: 'daily' as const,
    timeOfDay: 'morning' as const,
    createdAt: '2026-03-01',
    archived: false,
  },
  // ... more test habits
]

export const fixtureHabitLogs = [
  {
    id: '1',
    habitId: '1',
    date: '2026-03-20',
    completed: true,
    note: 'Felt great',
    completedAt: '2026-03-20T06:00:00Z',
  },
  // ... more logs covering different days/completion states
]

export const fixtureInsightsExpected = {
  'habit-best-day': {
    type: 'pattern',
    title: "Sat's are your strongest day",
  },
  // ... expected insight keys
}
```

**Strategy:**
- Create fixture sets for "minimal data" (just enough for insight generation)
- Create fixture sets for "30-day data" (enough to trigger confidence scores)
- Create edge case fixtures (all completed, never completed, one entry, zero entries)

## Coverage

**Target:** No hard requirement yet (framework not set up)

**Recommended minimums once framework added:**
- Utility functions: 80%+ (deterministic, single responsibility)
- Components: 60%+ (UI behavior, critical state)
- Database schema: 100% (type definitions only, no runtime logic)

**View Coverage (once set up):**
```bash
npm run test -- --coverage
```

## Test Structure

**Pattern recommendation (using Vitest + React Testing Library):**

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { generateInsights } from '@/lib/insights'
import { db } from '@/db'
import { fixtureHabits, fixtureHabitLogs } from '@/__fixtures__/habits'

vi.mock('@/db')

describe('generateInsights', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('habit patterns', () => {
    it('identifies best day when completion > 70%', async () => {
      // Arrange: mock db with 30 days of logs, Saturdays 80% complete
      vi.mocked(db.habits.toArray).mockResolvedValue(fixtureHabits)
      vi.mocked(db.habitLogs.where).mockReturnValue({
        between: vi.fn().mockResolvedValue([
          // ... logs with Saturday bias
        ])
      })

      // Act
      const insights = await generateInsights()

      // Assert
      const bestDay = insights.find(i => i.id === 'habit-best-day')
      expect(bestDay).toBeDefined()
      expect(bestDay?.title).toContain("Sat")
      expect(bestDay?.confidence).toBe(1)
    })

    it('returns empty when less than 7 logs', async () => {
      // Setup minimal data
      const insights = await generateInsights()

      // Habit patterns should not appear
      expect(insights.find(i => i.id === 'habit-best-day')).toBeUndefined()
    })
  })

  describe('mood + exercise correlation', () => {
    it('detects mood boost from exercise', async () => {
      // Test correlation logic...
    })
  })
})
```

**Key patterns:**
- `describe` blocks for feature/function groupings
- `beforeEach` for setup/cleanup
- AAA pattern: Arrange, Act, Assert
- Mock clear between tests to prevent state leakage
- Snapshot testing only if visual/structure testing needed (not recommended for business logic)

## Async Testing

**Pattern (with Vitest):**
```typescript
it('generates insights from async queries', async () => {
  // Use async/await in test function
  vi.mocked(db.habits.toArray).mockResolvedValue(fixtureHabits)

  const insights = await generateInsights()

  expect(insights).toHaveLength(3)
})
```

**Avoid:**
- `.then()` chains in tests (use async/await)
- Unresolved promises (ensure `await` or return promise)
- Test timeout issues (configure via Vitest config if needed)

## Error Testing

**Pattern (graceful degradation):**
```typescript
it('returns empty insights when db query fails', async () => {
  // Current code has .catch(() => fallback), so test that behavior
  vi.mocked(db.habits.where).mockRejectedValue(new Error('DB offline'))

  const insights = await generateInsights()

  // Should not throw; returns graceful result
  expect(insights).toEqual(expect.any(Array))
})
```

**Note:** Current codebase prioritizes graceful degradation over error throwing, so tests should verify that failures don't crash the app.

## Component Testing

**Pattern (example for Habits.tsx):**
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Habits } from '@/features/habits/Habits'

vi.mock('dexie-react-hooks')

describe('Habits Component', () => {
  it('renders habit list when data loaded', () => {
    vi.mocked(useLiveQuery).mockReturnValue([fixtureHabits])

    render(<Habits />)

    expect(screen.getByText('Morning jog')).toBeInTheDocument()
  })

  it('adds habit on form submit', async () => {
    render(<Habits />)

    fireEvent.click(screen.getByRole('button', { name: /add/i }))
    fireEvent.change(screen.getByLabelText('Habit name'), { target: { value: 'Meditate' } })
    fireEvent.click(screen.getByRole('button', { name: /create/i }))

    // Verify db.habits.add() called
    expect(db.habits.add).toHaveBeenCalledWith(expect.objectContaining({ name: 'Meditate' }))
  })
})
```

## Test Commands

**Recommended scripts (add to `package.json` once framework set up):**
```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui"
  }
}
```

**Run commands:**
```bash
npm run test              # Run all tests once
npm run test:watch       # Watch mode, re-run on file change
npm run test:coverage    # Generate coverage report
npm run test:ui          # Open Vitest UI (interactive dashboard)
```

## Current Testing Gaps

**Areas without coverage:**
- All utility functions (`insights.ts`, `dates.ts`, `quotes.ts`)
- All React components (routed features, layout, shared components)
- Database schema and types (integration tests needed)
- Error conditions and edge cases

**High-priority to add first:**
1. `src/lib/insights.ts` — complex logic, many decision paths
2. `src/components/Layout.tsx` — navigation, routing integration
3. `src/features/habits/Habits.tsx` — form logic, live query integration

---

*Testing analysis: 2026-03-26*
