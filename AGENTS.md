# AGENTS.md

Guidance for anyone — human or agent — changing this repo.

`workouts.tian.im` is a static training site for James, built with Tailwind CSS v4 and deployed to
GitHub Pages by GitHub Actions. The plan itself is content: treat the programming rules below as
hard requirements, not suggestions.

## Non-negotiable rules

### 1. Mobile first, light colour scheme, reusable components

- Design and verify from **320 px up**. Check 320 / 390 / 768 / 1440 before shipping.
- Light "paper + ink" palette. Use the tokens in `src/input.css` (`--color-panel`, `--color-chalk`,
  `--color-lime`, `--color-highlight`, …). Never hardcode hex values in markup.
- Tap targets ≥ 44 px (`h-11` / `min-h-11`). No horizontal scrolling at any width.
- Reuse component classes instead of copy-pasting utility soup: `.card`, `.chip`, `.ex-card`,
  `.ex-track`, `.set-dot`, `.weight-input`, `.toc-link`, `.calc-field`, `.calc-input`, `.detail-*`.
  If a pattern appears three times, promote it to a component class in `src/input.css`.
- Reference material belongs in the Contents sheet, not in a second page.

### 2. Compound movement first — including warm-up sets

- Every session opens with a barbell compound (bench, squat, row, deadlift, pull-up). No exceptions,
  no reordering: the compound gets the freshest effort and the longest rest.
- **Ramp sets are part of the session**, not optional: bar × 10 → 40% × 5 → 60% × 3 → 80% × 1 →
  work sets. Every session block must keep its warm-up line.
- Compounds are never taken to failure: RIR 2 on working sets, RIR 3 on deadlifts.
- If you add a new session or exercise, it goes after the compound, never before.

### 3. Progressive overload

- Double progression: when every set hits the top of its rep range at RIR 2, add **2.5 kg** upper
  body or **5 kg** lower body next session. Not before, not by feel.
- 8-week block: weeks 1–2 technique (RIR 3–4) → weeks 3–6 build → week 7 deload (same load, half the
  sets) → week 8 AMRAP test.
- Every exercise must state sets × reps, RIR, rest and (where relevant) tempo, and must be loggable
  in the tracker. An exercise that cannot progress is a bug.

### 4. Avoid injury at all costs

- **Warm up and cool down on every session.** Each session has a warm-up line and a cool-down line;
  neither may be dropped when editing.
- **Isolation work does not need failure.** RIR 0–1 is plenty; the muscle still grows. Never write
  "to failure" on curls, raises, pushdowns, face pulls, leg extensions or calves.
- **At least one stretch/mobility session per week.** It is a scheduled part of the plan (Recovery →
  "Stretch & mobility session", ~20 min), not a suggestion. If you restructure the week, keep it.
- Stop a set when form changes — technique failure is real failure.
- Every exercise needs an easier regression and a harder progression (the `i` sheet shows both).
- Load jumps stay conservative: 2.5 kg upper / 5 kg lower, no maxing outside the week 8 test.

### 5. Calculation functions

All maths lives in `assets/calc.js` as pure functions (no DOM), exposed as `window.Calc` and unit
tested in `scripts/calc.test.mjs`:

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
- Wire new calculators into `#calculators` and add them to the Contents sheet.
- Never prefill personal data (age, height, weight) — use placeholders and show `—` until the user
  types. Do not assume James's bodyweight.

## Page structure

Order is deliberate:

1. Summary (hero)
2. Read this first — a briefing, **never a gate**. Nothing is hidden; the acknowledgement button
   only records that it's been read and jumps to Session A.
3. Sessions A–E
4. Progress
5. Rotation / Progression / Back playbook
6. Recovery (fuel, sleep, **stretch session**)
7. **The six rules** — deliberately *below* the plan
8. FAQ → Reference card → Calculators

When adding a section:

- Give it a stable `id` and add a `data-toc-link` entry to the Contents sheet.
- Update the scroll-spy automatically via that link (no extra wiring needed).
- Keep the session ids `#session-a` … `#session-e`; the tracker and tabs depend on them.

## Stack and commands

```bash
npm install        # once
npm run dev        # build + serve dist/ locally
npm run build      # production build into dist/
npm test           # calculation unit tests
```

- No framework. Vanilla JS (`assets/app.js`), Tailwind v4 compiled by `scripts/build.mjs`.
- `public/CNAME` → `workouts.tian.im`. Pages deploys on push to `develop` (and `main`).
- Scripts are plain `<script defer>` (not modules) so the page also works from `file://`.

## Files

| Path | What lives there |
| --- | --- |
| `james/index.html` | the plan: copy, exercise cards, sections |
| `for-james/index.html` | legacy URL, redirects to `/james/` — do not add content here |
| `assets/app.js` | tracker, detail + contents sheets, gate state, calculators wiring, scroll spy |
| `assets/calc.js` | pure calculation functions |
| `src/input.css` | design tokens + component classes |
| `scripts/build.mjs` | copies static files, compiles Tailwind |
| `scripts/calc.test.mjs` | node:test suite for `calc.js` |
| `.github/workflows/deploy.yml` | build + deploy to Pages |

## Editing the plan

- An exercise card needs `data-ex="C1"` and a matching `EX.C1` entry in `assets/app.js`
  (why / mistakes / easier / harder). Missing entry → the `i` button silently does nothing.
- Session totals in the markup are the initial paint only; `render()` recomputes them from the dots.
  Keep the hardcoded number roughly right anyway.
- Tracking data lives under `localStorage["james-plan-v1"]`; the read acknowledgement under
  `localStorage["james-plan-read-v1"]`. Never send either anywhere.

## Before you ship

1. `npm run build && npm test`
2. Check `/james/` at 320, 390, 768 and 1440 — no overflow, sticky bar not covering headings.
3. Clear site data and reload: the briefing appears first, sessions are still reachable.
4. Print preview: no controls, no ack card, sessions and appendix present.
5. Commit with a message that says what changed for James, not just which files moved.
