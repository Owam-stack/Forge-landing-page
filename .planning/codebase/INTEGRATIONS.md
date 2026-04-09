# External Integrations

**Analysis Date:** 2026-03-26

## Overview

**Integration Model:** None

This is a fully client-side, local-first application with **zero external integrations**. All data is persisted locally in the browser using IndexedDB via Dexie. There are no API calls, backend dependencies, or third-party service integrations.

## APIs & External Services

**Status:** Not applicable

No external APIs are used. The application does not make HTTP requests to any backend services or third-party APIs.

## Data Storage

**Databases:**
- IndexedDB (browser local storage via Dexie)
  - Provider: Browser-native storage
  - Connection: Direct browser API
  - Client: Dexie 4.3.0 (IndexedDB wrapper and query engine)

**Stored Collections:**
- `habits` - User habit definitions with categories and scheduling
- `habitLogs` - Daily completion logs for each habit
- `goals` - Long-term goals with milestone tracking
- `journalEntries` - Daily mood/energy/reflection logs
- `learningItems` - Learning resources (books, courses, skills)
- `exerciseLogs` - Exercise sessions with type, duration, and energy metrics
- `dailySnapshots` - Daily summary aggregates of habits, mood, energy, and journaling

**File Storage:**
- None — application handles only text/numeric data in database

**Caching:**
- None — no external caching layer required

## Authentication & Identity

**Auth Provider:** Not applicable

No authentication system. Application is single-user and local to the device. No login, user accounts, or identity verification.

## Monitoring & Observability

**Error Tracking:** None

**Logs:** None

Application runs entirely in the browser with no error reporting or logging infrastructure. Errors only appear in browser console.

## CI/CD & Deployment

**Hosting:**
- Static file hosting required (Netlify, Vercel, GitHub Pages, AWS S3 + CloudFront, or similar)
- No backend server, database server, or dynamic infrastructure needed

**CI Pipeline:** None detected

**Build Process:**
- TypeScript compilation: `tsc -b` (before bundling)
- Vite bundling: `vite build` (produces static assets in `dist/`)
- ESLint checks available: `npm run lint`

## Environment Configuration

**Required env vars:** None

The application has no environment-specific configuration. It works identically in all environments.

**Secrets location:** Not applicable

No API keys, tokens, or secrets are needed.

## Webhooks & Callbacks

**Incoming:** None

**Outgoing:** None

## Data Synchronization

**Cloud Sync:** Not implemented

Data is device-local only. Users cannot synchronize habit tracking, goals, or journal entries across devices. Each device maintains its own separate IndexedDB database.

**Offline Capability:** Full

Application works offline. All data access and manipulation happens locally without requiring internet connectivity.

## Third-Party Dependencies (Non-Backend)

**UI/UX Only:**
- Lucide React 1.7.0 — Icon library (CDN or bundled)
- Recharts 3.8.1 — Charting library (bundled)
- Google Fonts — Syne and DM Sans font families (loaded from fonts.googleapis.com in HTML)

**No dependency on external services or APIs for these packages.**

## Notes on Extensibility

**To add integrations in the future:**

1. **Cloud Sync:** Add Supabase, Firebase, or similar to sync IndexedDB
   - Update `src/db/index.ts` with sync logic
   - Add environment variables for auth
   - Add API client (fetch or axios)

2. **Data Export:** Currently possible via IndexedDB export (browser DevTools)
   - Could add CSV/JSON export feature without backend

3. **Multi-Device Sync:** Requires backend database + auth
   - Would need API client in `src/lib/` directory
   - New integration points in individual feature files

4. **Analytics:** Could add privacy-first local analytics (no external calls)
   - Keep data local, generate reports in browser

---

*Integration audit: 2026-03-26*
