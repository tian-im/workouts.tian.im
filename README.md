# workouts.tian.im

Training plans for the nephews. Static site, Tailwind CSS, deployed to GitHub Pages by GitHub Actions.

**Live plan:** https://workouts.tian.im/for-james/

## What's here

```
for-james/index.html   The plan itself (sessions, rotation, progression, references)
assets/app.js          Set tracker (localStorage), detail sheet, scroll-spy
src/input.css          Tailwind entry + design tokens + component classes
public/CNAME           Custom domain written into the build
scripts/build.mjs      Copies pages, compiles Tailwind into dist/
.github/workflows/     Build + deploy to Pages on push to develop or main
index.html             Root redirect → /for-james/
404.html               Not-found page
```

## Local development

```bash
npm install
npm run dev      # builds dist/ and serves it at http://localhost:3000
npm run build    # production build into dist/
```

`npm run dev` uses `npx serve dist`. If port 3000 is taken, pass another one with
`npx serve dist -l 5050`.

## Deployment

Every push to `develop` or `main` runs the workflow in `.github/workflows/deploy.yml`:

1. `npm ci`
2. `npm run build` (Tailwind CLI → `dist/assets/style.css`)
3. upload `dist/` as the Pages artifact
4. deploy to the `github-pages` environment

Repo settings needed once:

- **Settings → Pages → Build and deployment → Source: GitHub Actions**
- **Settings → Pages → Custom domain: `workouts.tian.im`** (the build also emits `CNAME`)
- DNS: `CNAME` record `workouts.tian.im` → `tian-im.github.io`

## Page structure

- **Summary** — hero, key numbers, entry point.
- **Read this first** — the six rules plus the non-negotiables. The plan below is gated until
  the acknowledgement button is pressed (`localStorage["james-plan-read-v1"]`). Deep links into a
  session unlock it automatically; print always shows everything.
- **Sessions A–E** — the plan itself, with the tracker.
- **Progress** — at-a-glance bars for each session, fed by the same state.
- **Rotation / Progression / Back playbook** — how the programme works.
- **Fuel & recovery, FAQ, Appendix** — reference material.

**Contents** (the hamburger in the header and in the sticky bar) opens the table of contents:
bottom sheet on phones, left drawer on desktop. Tapping an entry jumps instantly to that section
(smooth scrolling across a 13,000 px page feels broken, so TOC jumps are instant).

## How the plan is structured

- **Sessions A–E** in a rolling rotation (not weekday-locked), with a 3-day floor of A, C, D.
- **Compound first**: each session opens with a barbell lift (bench, squat, row, deadlift, pull-up).
- **Day C is the back-thickness day** — it is the reason the program exists.
- **8-week block**: 2 weeks technique → 4 weeks build → deload → AMRAP test, using double
  progression (+2.5 kg upper / +5 kg lower when all sets hit the top of the rep range).

### Editing the plan

Exercise cards are plain HTML in `for-james/index.html`. Each one carries `data-ex="A1"` and a
`data-sets`-worth of `.set-dot` buttons. Per-exercise reference content (why it's here, mistakes,
easier/harder swaps) lives in the `EX` map at the top of `assets/app.js`. Adding an exercise means
adding a card **and** an entry keyed to the same id.

### Tracking data

Two keys, both local-only:

- `james-plan-v1` — `{ weights: { A1: 60 }, done: { A1: [true, false, false] } }`
- `james-plan-read-v1` — `"1"` once the briefing is acknowledged

No accounts, no backend. Private browsing wipes both on tab close.
