# workouts.tian.im

Training plans for Tian and his nephew James. **React + Vite + Tailwind CSS v4**, deployed to GitHub
Pages by GitHub Actions.

**Live:** https://workouts.tian.im/tian/ (Tian, 5-minute blocks) · https://workouts.tian.im/james/
(James, back-first barbell plan). The root URL redirects to `/tian/`; legacy `/for-james/` redirects
to `/james/`.

## What's here

```
tian/index.html       Vite entry — 5-minute block plan
james/index.html      Vite entry — barbell plan
src/
  index.css           Tailwind entry, design tokens, component classes, print styles
  App.jsx             James: page composition, sheet state, handlers
  main.jsx            James: React root + TrackerProvider
  tian/               Tian: separate entry, data, state and sections (see below)
  data/
    plan.js           Sessions, exercises, prescriptions, TOC + section order
    variations.js     Prog / Reg pair for every exercise
  state/
    TrackerContext.jsx  Sets, weights, localStorage persistence, derived stats
  hooks/
    useAcknowledged.js  Read-first acknowledgement (never gates content)
    useActiveSection.js Scroll spy for the sticky bar + Contents
    useRestTimer.js     End-timestamp rest countdown
  components/
    ui.jsx            Section, Card, Chip, Callout, RuleCard, Stat, MonoMeta…
    Sheet.jsx         Native <dialog>: bottom sheet on phones, left drawer on desktop
    ContentsSheet.jsx Table of contents
    RestTimer.jsx     Floating rest countdown with chime
    ExerciseCard.jsx  Title link, prescription, weight input, rest timer, set toggles
    SessionSection.jsx Day header, warm-up, exercises, cool-down
    Header.jsx, StickyBar.jsx, icons.jsx
  sections/           One component per page section (Hero → Calculators)
  lib/
    calc.js           1RM, BMR, TDEE, protein — pure functions
    nav.js            Instant section jumps
    rest.js           Rest parsing, clock formatting, completion chime
    links.js          YouTube form-search links
    tones.js          Session accent tokens
public/
  index.html          Root redirect → /tian/
  for-james/index.html Legacy redirect → /james/
  404.html, CNAME
scripts/
  calc.test.mjs       Unit tests for src/lib/calc.js
  tian.test.mjs       Unit tests for src/tian/lib/progress.js
AGENTS.md             Project rules and conventions
```

The Tian entry keeps its own data and state next to the app shell it reuses:

```
src/tian/
  TianApp.jsx         Page composition, runner state, contents sheet
  data/exercises.js   Movement library: name, Chinese name, one-line setup, unit
  data/program.js     Day types A–E, 8-week table, long block, tests, TOC + section order
  state/PlanContext.jsx  Week, day, logged sets, saved clocks, loads — localStorage
  hooks/useBlockClock.js 5-minute block countdown with pause/resume + rest chip
  lib/progress.js     Double-progression maths — pure functions, unit tested
  lib/today.js        Which block comes next
  components/         TianHeader, TianToc, BlockRunner
  sections/           Hero, Today, LongBlock, EightWeeks, Method, Test, Library, Safety, Setup
```

## Local development

```bash
npm install
npm run dev      # http://localhost:5173/tian/ and /james/
npm run build    # production build into dist/
npm run preview  # serve dist/
npm test         # unit tests for both plans
```

Vite builds both entries (`tian/index.html`, `james/index.html`) into `dist/`, with relative asset
URLs (`base: "./"`). That keeps the same build working on the custom domain and on the github.io
project path, and lets `public/` supply the redirect pages.

## Deployment

Every push to `develop` or `main` runs `.github/workflows/deploy.yml`:

1. `npm ci`
2. `npm run build`
3. upload `dist/` as the Pages artifact
4. deploy to the `github-pages` environment

Repo settings needed once:

- **Settings → Pages → Source: GitHub Actions**
- **Settings → Pages → Custom domain: `workouts.tian.im`** (the build also emits `CNAME`)
- DNS: `CNAME` record `workouts.tian.im` → `tian-im.github.io`

## The plans

### `/tian/` — 5-minute blocks

- **5 training days + 1 full day off.** Weekdays map to day types A–E (Mon A squat, Tue B push,
  Wed C hinge, Thu D pull, Fri E full-body unilateral); the weekend is one 20–30 minute long block
  or complete rest.
- **6–8 blocks per day, each capped at 5 minutes.** Every block is one movement done in 2–3 sets,
  with the rest inside the 5 minutes. The countdown is end-timestamp based, so leaving the tab and
  coming back does not drift.
- **Equipment ceiling: 2 × 10 kg dumbbells, a 10 kg vest, one band, an RV step, an optional
  playground bar.** Load comes from single-leg work, tempo (3 s down, 1 s pause) and frequency, not
  from a barbell.
- **8 weeks, no jumping.** Weeks 1–2 find the weight, 3–6 add load by double progression (top of the
  rep range at RIR 2 → +1 kg per hand), week 7 halves the blocks, week 8 tests five qualities.
- **Week 9 jumping is deliberately out of scope**; week 8 is the entry ticket (3 of 5 tests).
- Copy is Chinese; exercise names stay English so the YouTube search links work.

### `/james/` — back-first barbell plan

- **Sessions A–E** in a rolling rotation (not weekday-locked), 3-day floor of A, C, D.
- **Compound first**: each session opens with a barbell lift, including ramp sets.
- **Day C is the back-thickness day** — the reason the programme exists.
- **8-week block**: 2 weeks technique → 4 weeks build → deload → AMRAP test, using double
  progression (+2.5 kg upper / +5 kg lower when all sets hit the top of the rep range).
- **Read first** is a briefing, not a lock — nothing is hidden; the button only records that it's
  been read.
- **The six rules** sit below the plan.
- **Rest timer**: click any "rest 3 min" in a session to start a countdown; it rings when done.
- **Back-off sets**: each main lift finishes with one lighter set (~90%), marked with a dashed dot.
- **Execution-only cards**: each exercise shows the name (linked to a form video), prescription,
  rest timer, Prog/Reg and the tracker — no paragraphs to read mid-set.

## Editing the Tian plan

Day types and blocks live in `src/tian/data/program.js`; every movement in
`src/tian/data/exercises.js` needs a `name`, a Chinese `zh`, a one-line `setup` and a `unit`
(`次` or `秒`). Rest seconds are numbers (`rest: 90`), not parsed strings, because the block clock
uses them directly. Blocks are capped at 5 minutes — if a prescription needs longer, split it into
another block instead of extending the timer.

## Editing the James plan

Sessions and exercises are data, not markup:

```js
// src/data/plan.js
{
  id: "session-c", letter: "C", accent: "lime", label: "Priority day",
  title: "Back — thickness", duration: "~85 min",
  warmup: "…", cooldown: "…",
  exercises: [{ id: "C1", name: "Barbell Row", prescription: "4 × 5–6", notes: ["RIR 2", "2-0-1-1", "rest 3 min"], sets: 4, step: 2.5, … }]
}
```

Exercise titles link to a YouTube form search built from the name, rest notes must stay parseable
(`rest 3 min`, `rest 90 s`, `rest 3–4 min`) because the timer reads them, and every id needs a
`{ prog, reg }` pair in `src/data/variations.js` (enforced by `npm test`). New sections need an id
in `TOC_GROUPS` and `SECTION_ORDER` — the scroll spy and sticky tabs read from those.

## Local data

Browser-only keys, never sent anywhere:

- `tian-plan-v1` — `{ week, day, done: { "w3-A-a2": { sets: [{ reps, load }], finishedAt } },
  clocks: { "w3-A-a2": remainingSeconds }, loads: { "goblet-squat": 10 }, tests: { splitSquat: 14 } }`
- `james-plan-v1` — `{ weights: { C1: 80 }, done: { C1: [true, false, false, false] } }`
- `james-plan-read-v1` — `"1"` once the briefing is acknowledged

Private browsing wipes all of them on tab close.
