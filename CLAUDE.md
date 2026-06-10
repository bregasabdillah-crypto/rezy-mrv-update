# CLAUDE.md

Guidance for Claude Code (and other AI assistants) working in this repository.

## Project overview

**Rezycology MRV** ("rezy-mrv") is a single-page React app implementing a
Monitoring, Reporting & Verification (MRV) tool for a plastic-waste recycling
hub (Hub Depok-01, Indonesia). It digitizes the **PPRS v8** chain-of-custody
workflow for issuing Plastic Credits:

```
Collection → Transport → End-of-Waste Processing → VVB Verification → Credit Issuance
```

The app is bilingual (English / Indonesian), works offline-first via
`localStorage`, and can optionally sync to a Google Sheet through a Google
Apps Script Web App endpoint.

## Tech stack & structure

- **Create React App** (`react-scripts 5.0.1`), React 18, no TypeScript.
- Deployed on **Vercel** — `vercel.json` rewrites all paths to `/` for SPA routing.
- The entire application lives in **one file**: `App.js` (~2,560 lines). This
  is intentional for this project (single-file prototype/pilot app) — do not
  split it into modules unless explicitly asked.

```
index.html   — static shell, loads Google Fonts (DM Sans, DM Mono, Playfair Display)
index.js     — React root render, mounts <App />
App.js       — everything: i18n, design tokens, components, business logic
vercel.json  — SPA rewrite rule for Vercel
package.json — CRA scripts: `start`, `build`
```

There is no test suite, linter config, or CI configured beyond CRA defaults.

## Development workflow

```bash
npm install        # install deps (react, react-dom, react-scripts)
npm start          # CRA dev server (http://localhost:3000)
npm run build      # production build → build/
```

There is no `npm test` setup beyond the CRA default (no test files exist).
Verify changes by running the app and exercising the relevant flow in a
browser — there's no automated coverage to fall back on.

## Code map (App.js, top to bottom)

| Region | Lines (approx) | Purpose |
|---|---|---|
| `REZY_LOGO` | 3 | Base64 JPEG logo data URI |
| `C` (design tokens) | 5–26 | Color palette used via inline `style` everywhere |
| `TRANSLATIONS` / `useT` | 29–290 | EN/ID dictionary + translation hook `t(key)` |
| `ROLES` | 291–309 | Login roles, PINs, color, `access` array (tab gating) |
| Reference data | 312–341 | `FEEDSTOCK_TYPES`, `EOW_PROCESSES`, `EPR_BUYERS`, `VVB_BODIES`, `COLLECTORS`, `SCALES` |
| Date/geo utilities | 344–432 | `uid`, `nowISO`, `parseDate`, `fmtDate`, `fmtDateTime`, `kgToTonnes`, `getGeo`, `fmtGeo`, `geoUrl` |
| `MapPicker` | 437–706 | Leaflet/OSM map picker, loaded dynamically from CDN |
| `makeActivity` / `generateSerial` | 710–719 | Activity-log entries + PPRS v8 serial number generation |
| Storage helpers | 721–765 | `localStorage` load/save for batches & settings, Sheet load |
| Photo handling | 770–814 | `compressPhoto` (canvas-based thumbnailing), `syncPhotosToSheets` |
| Sheets sync | 817–887 | `stripForSheets`, `syncToSheets`, `testSheetsConnection` |
| UI atoms | 890–1113 | `Lbl`, `Inp`, `Sel`, `Btn`, `SignaturePad`, `Badge`, `Card`, `ActivityLog`, `SectionTitle`, `InfoRow` |
| `StageBar` | 1117–1147 | Progress indicator for Collection/Transport/Processing |
| `CertModal` | 1150–1245 | Plastic Credit Certificate (printable) |
| `RejectModal` | 1248–1265 | Rejection reason dialog |
| `LoginScreen` | 1268–1373 | Role selection + PIN login |
| `AnalyticsPanel` | 1376–1541 | KPI cards, pipeline/feedstock/weekly charts |
| `RezyMRVLive` (default export) | 1544–end | Main app: state, handlers, tab routing/render |

## Key conventions

- **Styling**: all inline `style={{ ... }}` objects using the `C` token
  object (e.g. `C.forest`, `C.charcoal`, `C.creamDark`). No CSS files, no
  CSS-in-JS library, no Tailwind. One global `<style>` block is injected via
  `useEffect` for keyframe animations and scrollbar hiding. Match this
  pattern — don't introduce a new styling approach.
- **i18n**: every user-facing string should have an `en` and `id` entry in
  `TRANSLATIONS` and be accessed via `t("key")` from `useT(lang)`. Keep both
  languages in sync when adding strings (some newer strings are English-only
  inline literals — prefer following the `t()` pattern for new text).
- **State & persistence**: batches and settings are arrays/objects held in
  React state (`batches`, `settings`, `sheetsUrl`) and persisted to
  `localStorage` under `STORAGE_KEY` (`"rezy-mrv-batches-depok"`) and
  `SETTINGS_KEY` (`"rezy-mrv-settings"`) via `mutateBatches`/`persistBatches`.
  Always go through `mutateBatches`/`updateBatch` to mutate `batches` so
  persistence stays consistent.
- **Batch lifecycle / status values**: `"collection" → "transport" →
  "processing" → "verified" → "credited"`, with `"rejected"` as a terminal
  alternative from `"processing"`. Each transition appends a `makeActivity(...)`
  entry to `batch.activities` (stage, actor, timestamp, geo, note) — this
  trail is shown in `ActivityLog` and the verification queue.
- **Roles & access gating**: `ROLES` defines `admin` and `operator` (with
  4-digit PINs `1234`/`5678`), each with an `access` array of tab keys
  (`dashboard`, `log`, `records`, `settings`). `NAV` items are filtered by
  `canAccess(tab)`. PINs are intentionally hardcoded for this pilot — the
  Settings tab text says as much ("update the ROLES constant in source").
- **Geolocation**: `getGeo(lat, lng)` tries `navigator.geolocation` and falls
  back to manual lat/lng (used by `MapPicker`). Every stage submission
  captures geo + a digital signature (`SignaturePad`) before proceeding.
- **PPRS v8 serial numbers**: generated by `generateSerial()` at credit
  issuance — encodes process type (`MR`/`CR`/`CP`/`ER`), VVB (`SCS`/`SUCO`),
  date, sequence, and tonnage. Don't change the format casually; it mirrors
  an external registry naming convention documented inline in `CertModal`.
- **Google Sheets sync**: optional, configured via an Apps Script Web App URL
  in Settings. `syncToSheets`/`syncPhotosToSheets` make `no-cors` GET requests
  with URL-encoded JSON payloads (size-limited to stay under URL length
  limits). `stripForSheets` controls exactly which batch fields are sent —
  update it if you add new batch fields that should sync. The corresponding
  Apps Script source (`rezy-mrv-apps-script.js`, referenced in the Settings
  instructions) is **not** part of this repo.
- **Photos**: stored as full-resolution base64 in `localStorage`/component
  state, but compressed to ~120px JPEGs (`compressPhoto`) before being sent
  to Sheets to stay within URL size limits.

## Known inconsistencies (be aware, don't "fix" silently)

- `TRANSLATIONS` includes role strings for `roleVerifier`/`roleBuyer` and a
  full "Verification Queue" tab (`tab === "verify"`), but `ROLES` currently
  only defines `admin` and `operator` — neither has `"verify"` in its
  `access` array, and `LoginScreen`'s `ROLE_KEYS` only maps `admin`/
  `operator`. The verify tab and its approve button (which references
  `ROLES.verifier.name`, undefined) are effectively dead code paths from a
  previous version with VVB/Buyer roles. If asked to restore VVB/Buyer
  roles, reconcile `ROLES`, `LoginScreen.ROLE_KEYS`, and `NAV` together.
- `git log` shows a single "Add files via upload" commit — there's no
  established commit-message convention from history; use clear, descriptive
  messages.

## When making changes

- Keep edits localized within `App.js` using the existing component/section
  structure (the `// ─── Section ─── ` comment banners delineate regions).
- Preserve the bilingual contract: if you add a label/string shown to users,
  add both `en` and `id` translations.
- If you change the shape of a `batch` object (new fields, renamed fields),
  update: the initial batch object in `submitCollection`, `stripForSheets`,
  `CertModal`, the records/detail views, and any reset logic in `issueCredit`.
- Don't add new dependencies/build tooling without strong justification —
  this is a lightweight CRA app intended to stay simple to deploy on Vercel.
