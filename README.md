# workouts.tian.im

Training plans for the nephews. **React + Vite + Tailwind CSS v4**, deployed to GitHub Pages by
GitHub Actions.

**Live plan:** https://workouts.tian.im/james/ · legacy `/for-james/` redirects there.

## What's here

```
james/index.html      Vite entry (meta, fonts, #root)
src/
  App.jsx             Page composition, sheet state, handlers
  main.jsx            React root + TrackerProvider
  index.css           Tailwind entry, design tokens, component classes, print styles
  data/
    plan.js           Sessions, exercises, prescriptions, TOC + section order
    details.js        Per-exercise why / mistakes / easier / harder
    panels.js         Structured reference copy for the detail sheet
  state/
    TrackerContext.jsx  Sets, weights, localStorage persistence, derived stats
  hooks/
    useAcknowledged.js  Read-first acknowledgement (never gates content)
    useActiveSection.js Scroll spy for the sticky bar + Contents
  components/
    ui.jsx            Section, Card, Chip, Callout, RuleCard, Stat, MonoMeta…
    Sheet.jsx         Native <dialog>: bottom sheet on phones, side drawer on desktop
    ContentsSheet.jsx Table of contents
    DetailSheet.jsx   Exercise notes and reference panels
    ExerciseCard.jsx  Prescription, weight input, set toggles
    SessionSection.jsx Day header, warm-up, exercises, cool-down
    Header.jsx, StickyBar.jsx, icons.jsx
  sections/           One component per page section (Hero → Calculators)
  lib/
    calc.js           1RM, BMR, TDEE, protein — pure functions
    nav.js            Instant section jumps
    tones.js          Session accent tokens
public/
  index.html          Root redirect → /james/
  for-james/index.html Legacy redirect → /james/
  404.html, CNAME
scripts/calc.test.mjs Unit tests for src/lib/calc.js
AGENTS.md             Project rules and conventions
```

## Local development

```bash
npm install
npm run dev      # http://localhost:5173/james/
npm run build    # production build into dist/
npm run preview  # serve dist/
npm test         # calculation unit tests
```

Vite builds from the `james/index.html` entry into `dist/james/index.html`, with relative asset URLs
(`base: "./"`). That keeps the same build working on the custom domain and on the github.io project
path, and lets `public/` supply the redirect pages.

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

## The plan

- **Sessions A–E** in a rolling rotation (not weekday-locked), 3-day floor of A, C, D.
- **Compound first**: each session opens with a barbell lift, including ramp sets.
- **Day C is the back-thickness day** — the reason the programme exists.
- **8-week block**: 2 weeks technique → 4 weeks build → deload → AMRAP test, using double
  progression (+2.5 kg upper / +5 kg lower when all sets hit the top of the rep range).
- **Read first** is a briefing, not a lock — nothing is hidden; the button only records that it's
  been read.
- **The six rules** sit below the plan.

## Editing the plan

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

Every exercise id needs a matching entry in `src/data/details.js` (why / mistakes / easier /
harder). New sections need an id in `TOC_GROUPS` and `SECTION_ORDER` — the scroll spy and sticky
tabs read from those.

## Local data

Two browser-only keys, never sent anywhere:

- `james-plan-v1` — `{ weights: { C1: 80 }, done: { C1: [true, false, false, false] } }`
- `james-plan-read-v1` — `"1"` once the briefing is acknowledged

Private browsing wipes both on tab close.
