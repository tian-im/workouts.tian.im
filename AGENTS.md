# AGENTS.md

Guidance for anyone — human or agent — changing this repo.

`workouts.tian.im` is a static training site for James: **React + Vite + Tailwind CSS v4**, deployed
to GitHub Pages by GitHub Actions. The plan itself is content — treat the programming rules below as
hard requirements, not suggestions.

## Non-negotiable rules

### 1. Mobile first, light colour scheme, reusable components

- Design and verify from **320 px up**. Check 320 / 390 / 768 / 1440 before shipping.
- Light "paper + ink" palette. Use the tokens in `src/index.css` (`--color-panel`, `--color-chalk`,
  `--color-lime`, `--color-highlight`, …). Never hardcode hex values in JSX.
- Tap targets ≥ 44 px (`h-11` / `min-h-11`). No horizontal scrolling at any width.
- **Compose, don't copy.** Shared primitives live in `src/components/ui.jsx` (`Section`,
  `SectionHead`, `Card`, `Chip`, `Callout`, `RuleCard`, `Stat`, `MonoMeta`). A new pattern seen three
  times becomes a component or a class in `src/index.css` — never a fourth copy of the markup.
- One section = one component in `src/sections/`. Sections receive callbacks and data as props; they
  do not reach into the DOM (except the deliberate `jumpTo` navigation helper).
- Interactive styling for native controls lives in CSS component classes (`.set-dot`,
  `.weight-input`, `.toc-link`, `.calc-input`, `.detail-*`) because those states are hard to express
  cleanly with utilities alone.
- Never render raw HTML strings (`dangerouslySetInnerHTML`). Reference copy is structured data in
  `src/data/panels.js`.

### 2. Compound movement first — including warm-up sets

- Every session opens with a barbell compound (bench, squat, row, deadlift, pull-up). No exceptions,
  no reordering: the compound gets the freshest effort and the longest rest.
- **Ramp sets are part of the session**, not optional: bar × 10 → 40% × 5 → 60% × 3 → 80% × 1 →
  work sets. Every session keeps its `warmup` string.
- Compounds are never taken to failure: RIR 2 on working sets, RIR 3 on deadlifts.
- New exercises go after the compound, never before.

### 3. Progressive overload

- Double progression: when every set hits the top of its rep range at RIR 2, add **2.5 kg** upper
  body or **5 kg** lower body next session. Not before, not by feel.
- 8-week block: weeks 1–2 technique (RIR 3–4) → weeks 3–6 build → week 7 deload (same load, half the
  sets) → week 8 AMRAP test.
- Every exercise must state sets × reps, RIR, rest and (where relevant) tempo, and must be loggable
  in the tracker. An exercise that cannot progress is a bug.

### 4. Avoid injury at all costs

- **Warm up and cool down on every session.** Each session in `src/data/plan.js` has `warmup` and
  `cooldown` strings; neither may be dropped.
- **Isolation work does not need failure.** RIR 0–1 is plenty; the muscle still grows. Never write
  "to failure" on curls, raises, pushdowns, face pulls, leg extensions or calves.
- **At least one stretch/mobility session per week.** Scheduled in Recovery (`Stretch & mobility
  session`, ~20 min). If you restructure the week, keep it.
- Stop a set when form changes — technique failure is real failure.
- Every exercise needs an easier regression and a harder progression (`src/data/details.js`; shown in
  the detail sheet).
- Load jumps stay conservative: 2.5 kg upper / 5 kg lower, no maxing outside the week 8 test.

### 5. Calculation functions

All maths lives in `src/lib/calc.js` as pure functions (no DOM, no React), unit tested in
`scripts/calc.test.mjs`:

| Function | Purpose |
| --- | --- |
| `estimate1RM(weightKg, reps)` | Epley one-rep max estimate |
| `percentageTable(oneRM)` | working weights at 85 / 80 / 75 / 70%, rounded to 2.5 kg |
| `bmrMifflin({ sex, weightKg, heightCm, age })` | Mifflin–St Jeor BMR |
| `tdee(bmr, activityFactor)` | total daily energy expenditure |
| `proteinRange(weightKg, { min, max })` | daily protein grams at 1.6–2.2 g/kg |
| `leanGainCalories(tdee, surplus)` | TDEE + 250 kcal |

Rules for this file:

- Keep functions pure and dependency-free; return `null` for unusable input rather than `NaN`.
- Add a test for every new function (`npm test`).
- Wire new calculators into `src/sections/Calculators.jsx` and the Contents sheet.
- Never prefill personal data (age, height, weight) — use placeholders and show `—` until the user
  types. Do not assume James's bodyweight.

## Page structure

Order is deliberate:

1. Summary (`Hero`)
2. Read this first — a briefing, **never a gate**. Nothing is hidden; the acknowledgement only
   records that it's been read and jumps to Session A.
3. Sessions A–E (`SessionSection` → `ExerciseCard`)
4. Progress
5. Rotation / Progression / Back playbook
6. Recovery (fuel, sleep, **stretch session**)
7. **The six rules** — deliberately *below* the plan
8. FAQ → Reference card → Calculators

When adding a section:

- Create `src/sections/YourSection.jsx`, render it in `App.jsx`, and add `{ id, label }` to
  `TOC_GROUPS` in `src/data/plan.js`.
- Add the id to `SECTION_ORDER` — the scroll spy and sticky tab highlighting read from it.
- Keep the session ids `#session-a` … `#session-e`; the tracker and tabs depend on them.

## React conventions

- Function components + hooks only. No class components, no router (the page is a single document;
  navigation is `jumpTo` + history hash).
- State that survives reloads goes through `TrackerProvider` (`src/state/TrackerContext.jsx`) or
  `useAcknowledged`; everything else is local `useState`.
- Never store derived data: session progress is computed from `state.done` in `stats`.
- Sheets are one `Sheet` component with `side="left" | "right"`. Both are native `<dialog>`; do not
  reimplement focus trapping. `closeNow()` exists for jumps that must not wait for the animation.
- Weight inputs are uncontrolled (`defaultValue` + `resetToken`) so typing `62.` does not turn into
  `625`. Calculator inputs are controlled strings — that is fine because they are not reformatted.
- Import order: react → data/lib → state/hooks → components → sections.

## Stack and commands

```bash
npm install
npm run dev        # Vite dev server (http://localhost:5173/james/)
npm run build      # production build into dist/
npm run preview    # serve the built site
npm test           # calculation unit tests
```

- Entry: `james/index.html` → `src/main.jsx`. Built to `dist/james/index.html` with relative asset
  URLs (`base: "./"`), so it works both on the custom domain and on the github.io project path.
- `public/` is copied verbatim: root redirect, `/for-james/` legacy redirect, `404.html`, `CNAME`.
- Pages deploys on push to `develop` (and `main`).

## Files

| Path | What lives there |
| --- | --- |
| `james/index.html` | Vite entry: meta, fonts, `#root` |
| `src/App.jsx` | page composition, sheet state, handlers |
| `src/data/plan.js` | sessions, exercises, prescriptions, TOC + section order |
| `src/data/details.js` | per-exercise why / mistakes / easier / harder |
| `src/data/panels.js` | structured reference copy for the detail sheet |
| `src/state/TrackerContext.jsx` | sets, weights, persistence, derived stats |
| `src/hooks/` | `useAcknowledged`, `useActiveSection` |
| `src/components/` | `ui.jsx`, sheets, header, sticky bar, exercise/session cards |
| `src/sections/` | one component per page section |
| `src/lib/` | `calc.js`, `nav.js`, `tones.js` |
| `src/index.css` | design tokens + component classes + print styles |
| `public/` | redirects, 404, CNAME |
| `scripts/calc.test.mjs` | node:test suite for `calc.js` |

## Editing the plan

- Exercises live in `src/data/plan.js`; the detail sheet entry keyed by the same id lives in
  `src/data/details.js`. Missing entry → the `i` button opens an empty panel.
- Session totals are derived from `sets`; don't hardcode counts anywhere.
- Tracking data: `localStorage["james-plan-v1"]`; read acknowledgement:
  `localStorage["james-plan-read-v1"]`. Never send either anywhere.

## Before you ship

1. `npm run build && npm test`
2. Check `/james/` at 320, 390, 768 and 1440 — no overflow, sticky bar not covering headings.
3. Clear site data and reload: the briefing appears first, sessions are still reachable.
4. Open Contents → jump to a section; open an exercise `i` → check notes and close with Esc.
5. Print preview: no controls, no ack card, sessions and appendix present.
6. Commit with a message that says what changed for James, not just which files moved.
