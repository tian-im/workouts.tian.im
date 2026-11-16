# AGENTS.md

Guidance for anyone — human or agent — changing this repo.

`workouts.tian.im` is a static site with two training plans: **React + Vite + Tailwind CSS v4**,
deployed to GitHub Pages by GitHub Actions. `/tian/` is Tian's own 5-minute-block plan; `/james/` is
James's barbell plan. The plan itself is content — treat the programming rules below as hard
requirements, not suggestions.

Rules 1–5 and the James-specific sections below describe `/james/`. The `/tian/` entry has its own
rules at the end of this file; where the two conflict (barbell compounds, 60–90 minute sessions),
the `/tian/` section wins for `/tian/`.

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
- Never render raw HTML strings (`dangerouslySetInnerHTML`). Copy lives in components or in the
  data modules under `src/data/`.
- **Exercise cards are execution-only**: name (links to the form video), prescription, rest timer,
  Prog/Reg and the tracker. No cue paragraphs or essays — form guidance lives behind the YouTube
  search link. Before adding copy to a card, ask whether it helps him finish the set.

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
- Main lifts carry one **back-off set** (~90% of the work weight, 1×5–6, RIR 3; pull-ups at
  bodyweight). It is the cheap way to add compound volume without lengthening the session; the last
  set dot is dashed to mark it.
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
- Every exercise links out to a form-video search (`src/lib/links.js`), states its rest period (rest
  text starts the timer), and carries a **Prog / Reg** pair in `src/data/variations.js`. A missing
  pair should fail the test suite, not silently render nothing.
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
8. Reference card → Calculators

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
- The Contents sheet uses `Sheet` (`side="left"`): a native `<dialog>`; do not reimplement focus
  trapping. `closeNow()` exists for jumps that must not wait for the animation.
- The rest timer lives in `useRestTimer` (end-timestamp based, so background throttling does not
  drift) and renders once in `App.jsx`; exercise cards only call `onStartRest(seconds, name)`.
  It rings with Web Audio (`lib/rest.js`) — no audio files, and `primeAudio()` must be called from
  the click that starts the timer.
- Weight inputs are uncontrolled (`defaultValue` + `resetToken`) so typing `62.` does not turn into
  `625`. Calculator inputs are controlled strings — that is fine because they are not reformatted.
- Import order: react → data/lib → state/hooks → components → sections.

## Stack and commands

```bash
npm install
npm run dev        # Vite dev server (http://localhost:5173/tian/ and /james/)
npm run build      # production build into dist/
npm run preview    # serve the built site
npm test           # unit tests for both plans (scripts/*.test.mjs)
```

- Entries: `tian/index.html` → `src/tian/main.jsx`, `james/index.html` → `src/main.jsx`. Both build
  to `dist/` with relative asset URLs (`base: "./"`), so they work on the custom domain and on the
  github.io project path.
- `public/` is copied verbatim: root redirect (→ `/tian/`), `/for-james/` legacy redirect,
  `404.html`, `CNAME`.
- Pages deploys on push to `develop` (and `main`).

## The `/tian/` entry

Tian trains in 5-minute blocks between work sessions, from an RV, with no gym.

### Hard requirements

- **Spend a whole 5 minutes, never more.** Every block in `src/tian/data/program.js` is one movement
  in 2–3 sets with its rest inside `BLOCK_SECONDS` (300). If a prescription does not fit, make
  another block — do not extend the timer.
- **Load comes from leverage, not from a barbell.** The ceiling is 2 × 10 kg dumbbells plus a 10 kg
  vest. Progress by single-leg variants, 3-second eccentrics, pauses and frequency. Never write a
  block that assumes a barbell, rack, machines or a 20 kg plate.
- **No jumping before week 9.** Weeks 1–8 build ankles, knees, hips and landing control
  (`Slow Step-Down`, calf work, isometrics). Week 8 tests five qualities; passing 3/5 is the entry
  ticket. Do not sneak plyometrics into the block list.
- **5 training days + 1 full day off.** Weekdays map A–E via `WEEKDAY_PLAN`; the weekend is the long
  block or complete rest. A 7th training day is a bug, not a bonus.
- **RIR 2 on main lifts, RIR 1 on isolation, never "to failure"** on calves, carries or isometrics.
- **Every block names its rest in seconds** (`rest: 90`). The countdown reads the number; there is no
  string parsing here, unlike James's `rest 3 min` notes.
- **Copy is Chinese; exercise names stay English** so the YouTube form search (built from the name
  via `lib/links.js`) still returns useful results.
- **Pausing is a feature.** Leaving mid-block must keep the remaining seconds and the logged sets;
  `useBlockClock` persists through `onPersist`, and `state.clocks[key] > 0` means "in progress".
- **Never prefill body data.** Week 1 finds the weight; suggested starting loads are written as
  "参考起点" and must stay editable.

### Structure

- `src/tian/data/exercises.js` — movement library: `name`, `zh`, one-line `setup`, `unit`, `perSide`.
- `src/tian/data/program.js` — `DAYS` (A–E, 6 required + 2 optional blocks each), `WEEKS`,
  `LONG_BLOCK`, `TESTS`, `TOC_GROUPS`, `SECTION_ORDER`.
- `src/tian/state/PlanContext.jsx` — `localStorage["tian-plan-v1"]`: week, day, logged sets, saved
  clocks, last loads, test results.
- `src/tian/lib/progress.js` — pure functions (`topRepsOf`, `setsFor`, `suggestNextLoad`,
  `totalVolume`, `blockStats`, `weekStats`), unit tested in `scripts/tian.test.mjs`.
- Section ids are `tian-hero`, `tian-today`, `tian-long`, `tian-weeks`, `tian-method`, `tian-test`,
  `tian-library`, `tian-safety`, `tian-setup`; they must stay in `TOC_GROUPS` so the scroll spy and
  contents sheet work.
- `BlockRunner` is a full-page view, not a dialog: while it is open, the rest of the page is not
  rendered. It owns the clock; `Today` only decides which block comes next (`lib/today.js`).

## Files

| Path | What lives there |
| --- | --- |
| `tian/index.html` | Vite entry for the 5-minute plan: meta, fonts, `#root` |
| `src/tian/data/program.js` | Day types A–E, 8-week table, long block, tests, TOC |
| `src/tian/data/exercises.js` | Movement library (name, 中文名, setup, unit) |
| `src/tian/state/PlanContext.jsx` | Week, day, sets, clocks, loads, tests, persistence |
| `src/tian/components/` | `TianHeader`, `TianToc`, `BlockRunner` |
| `src/tian/sections/` | Hero, Today, LongBlock, EightWeeks, Method, Test, Library, Safety, Setup |
| `src/tian/lib/progress.js` | Double-progression maths + block/week stats (tested) |
| `james/index.html` | Vite entry: meta, fonts, `#root` |
| `src/App.jsx` | page composition, sheet state, handlers |
| `src/data/plan.js` | sessions, exercises, prescriptions, TOC + section order |
| `src/data/variations.js` | Prog / Reg pair for every exercise |
| `src/state/TrackerContext.jsx` | sets, weights, persistence, derived stats |
| `src/hooks/` | `useAcknowledged`, `useActiveSection`, `useRestTimer` |
| `src/components/` | `ui.jsx`, `Sheet`/`ContentsSheet`, `RestTimer`, header, sticky bar, cards |
| `src/sections/` | one component per James section |
| `src/lib/` | `calc.js`, `nav.js`, `tones.js`, `rest.js`, `links.js` |
| `src/index.css` | design tokens + component classes + print styles |
| `public/` | redirects (root → `/tian/`), 404, CNAME |
| `scripts/calc.test.mjs` | node:test suite for `calc.js` |
| `scripts/tian.test.mjs` | node:test suite for `src/tian/lib/progress.js` |

## Editing the plan

- Exercises live in `src/data/plan.js` as name, prescription, notes, sets and step. Cues and session
  descriptions were deliberately removed (see the execution-only rule); don't reintroduce them
  without a reason.
- Each id needs a `{ prog, reg }` entry in `src/data/variations.js` (`npm test` enforces coverage).
- The YouTube link is derived from the name (`lib/links.js`), so keep names close to the common
  exercise name.
- Rest notes must stay parseable (`rest 3 min`, `rest 90 s`, `rest 3–4 min`) — the timer reads them.
- Session totals are derived from `sets`; don't hardcode counts anywhere.
- Tracking data: `localStorage["james-plan-v1"]`; read acknowledgement:
  `localStorage["james-plan-read-v1"]`. Never send either anywhere.

## Before you ship

1. `npm run build && npm test`
2. Check `/tian/` and `/james/` at 320, 390, 768 and 1440 — no overflow, sticky bar not covering headings.
3. `/tian/`: clear site data, start block 1, pause mid-block, reload — the block must resume at the same second with its sets intact. Start a strength block, log a set, check the rest chip and the next set's inherited load.
4. `/james/`: clear site data and reload — the briefing appears first, sessions are still reachable.
5. Open Contents → jump to a section; `/james/` rest time → timer starts, +30s works, stop clears it.
6. Print preview: no controls, no runner overlay, sessions and appendix present.
7. Commit with a message that says what changed for the trainee, not just which files moved.
