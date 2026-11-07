/* Plan data — single source of truth for sessions, exercises and prescriptions. */
export const SESSIONS = [
  {
    id: "session-a",
    letter: "A",
    accent: "ember",
    label: "Upper push",
    tocLabel: "Push",
    title: "Push — Bench strength",
    duration: "~70 min",
    warmup: "5 min rower or bike · band pull-aparts 2×15 · push-ups ×10 · ramp sets on bench.",
    cooldown: "Doorway chest stretch 2×30 s/side · overhead triceps stretch 2×30 s/side.",
    note: "",
    exercises: [
      {
        id: "A1",
        name: "Barbell Bench Press",
        cue: "Blades pinned, bar to lower chest, elbows ~45°.",
        prescription: "3 × 5–6",
        notes: [
          "RIR 2",
          "3-1-1-0",
          "rest 3 min"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "A2",
        name: "Seated Dumbbell Shoulder Press",
        cue: "Ribs down, press overhead without arching.",
        prescription: "3 × 8–10",
        notes: [
          "RIR 2",
          "rest 2 min"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "A3",
        name: "Incline Dumbbell Press",
        cue: "30° bench, deep stretch, press up and in.",
        prescription: "3 × 10–12",
        notes: [
          "RIR 1–2",
          "rest 90 s"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "A4",
        name: "Chest-Supported Row",
        cue: "Chest on the pad, elbows past ribs, 1 s squeeze.",
        prescription: "3 × 12–15",
        notes: [
          "RIR 1",
          "1 s squeeze",
          "rest 75 s"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "A5",
        name: "Cable Lateral Raise",
        cue: "Lead with the elbow, stop at shoulder height.",
        prescription: "3 × 15–20",
        notes: [
          "RIR 0–1",
          "rest 60 s"
        ],
        sets: 3,
        step: 1.25,
        placeholder: "—"
      },
      {
        id: "A6",
        name: "Rope Triceps Pushdown",
        cue: "Elbows pinned, spread the rope at the bottom.",
        prescription: "3 × 12–15",
        notes: [
          "RIR 1",
          "rest 60 s"
        ],
        sets: 3,
        step: 1.25,
        placeholder: "—"
      }
    ]
  },
  {
    id: "session-b",
    letter: "B",
    accent: "sand",
    label: "Lower",
    tocLabel: "Squat",
    title: "Squat — lower strength",
    duration: "~70 min",
    warmup: "5 min bike · leg swings 10/side · bodyweight squats ×15 · hip airplanes 8/side · ramp sets.",
    cooldown: "Couch stretch 2×45 s/side · pigeon 2×45 s/side · quad stretch 2×30 s/side.",
    note: "",
    exercises: [
      {
        id: "B1",
        name: "Back Squat",
        cue: "Brace, knees over toes, own the depth.",
        prescription: "3 × 5–6",
        notes: [
          "RIR 2",
          "3-1-1-0",
          "rest 3–4 min"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "B2",
        name: "Leg Press",
        cue: "Feet mid-platform, stop before the back tucks.",
        prescription: "3 × 10–12",
        notes: [
          "RIR 2",
          "rest 2 min"
        ],
        sets: 3,
        step: 5,
        placeholder: "—"
      },
      {
        id: "B3",
        name: "Leg Extension",
        cue: "Slow up, squeeze, slow down.",
        prescription: "3 × 12–15",
        notes: [
          "RIR 1",
          "2-1-1-1",
          "rest 60 s"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "B4",
        name: "Seated Leg Curl",
        cue: "Toes up, pause fully bent.",
        prescription: "3 × 12–15",
        notes: [
          "RIR 1",
          "rest 75 s"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "B5",
        name: "Standing Calf Raise",
        cue: "Full stretch, 2 s pause at the top.",
        prescription: "4 × 8–10",
        notes: [
          "RIR 1",
          "2 s pause",
          "rest 60 s"
        ],
        sets: 4,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "B6",
        name: "Hanging Knee Raise",
        cue: "Curl the pelvis, don't swing.",
        prescription: "3 × 10–15",
        notes: [
          "RIR 1",
          "rest 60 s"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "BW"
      }
    ]
  },
  {
    id: "session-c",
    letter: "C",
    accent: "lime",
    label: "Priority day",
    tocLabel: "Back thickness",
    title: "Back — thickness",
    duration: "~85 min",
    warmup: "5 min rower · scap pulldowns 2×10 · band pull-aparts 2×15 · empty-bar rows ×10 · ramp sets.",
    cooldown: "Lat stretch on the rack 2×30 s/side · child's pose 60 s · doorway chest stretch.",
    note: "Drop #7 and #6 — never drop #1 or #2. They're the reason this day exists.",
    exercises: [
      {
        id: "C1",
        name: "Barbell Row",
        cue: "Hinge to 30–45°, pull to lower ribs, torso still.",
        prescription: "4 × 5–6",
        notes: [
          "RIR 2",
          "2-0-1-1",
          "rest 3 min"
        ],
        sets: 4,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "C2",
        name: "Seal Row",
        cue: "Chest on the pad, elbows back and down, 1 s pause.",
        prescription: "4 × 8–10",
        notes: [
          "RIR 1–2",
          "1 s squeeze",
          "rest 2 min"
        ],
        sets: 4,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "C3",
        name: "Seated Cable Row — Neutral Grip",
        cue: "Blades forward, pull past neutral, chest tall.",
        prescription: "3 × 10–12",
        notes: [
          "RIR 1",
          "1 s hold",
          "rest 90 s"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "C4",
        name: "Straight-Arm Pulldown",
        cue: "Arms straight, reach forward, drive with the armpits.",
        prescription: "3 × 12–15",
        notes: [
          "RIR 1",
          "2-1-1-1",
          "rest 60 s"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "C5",
        name: "Barbell Shrug",
        cue: "Straight up, 2 s hold, no rolling.",
        prescription: "3 × 10–12",
        notes: [
          "RIR 1",
          "2 s hold",
          "rest 60 s"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "C6",
        name: "Face Pull",
        cue: "Rope at eye height, pull to forehead, hands back.",
        prescription: "3 × 15–20",
        notes: [
          "RIR 1",
          "rest 60 s"
        ],
        sets: 3,
        step: 1.25,
        placeholder: "—"
      },
      {
        id: "C7",
        name: "Reverse EZ-Bar Curl",
        cue: "Wrists neutral, elbows still.",
        prescription: "3 × 10–12",
        notes: [
          "RIR 1",
          "rest 60 s"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "—"
      }
    ]
  },
  {
    id: "session-d",
    letter: "D",
    accent: "ice",
    label: "Lower",
    tocLabel: "Hinge",
    title: "Hinge — deadlift strength",
    duration: "~75 min",
    warmup: "5 min bike · dowel hip hinge ×10 · glute bridge ×15 · dead hang 20 s · ramp sets.",
    cooldown: "Hamstring stretch 2×45 s/side · hip flexor stretch 2×30 s/side.",
    note: "",
    exercises: [
      {
        id: "D1",
        name: "Deadlift",
        cue: "Bar over mid-foot, slack out, reset every rep.",
        prescription: "3 × 4–5",
        notes: [
          "RIR 3",
          "reset each rep",
          "rest 3–4 min"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "D2",
        name: "Romanian Deadlift",
        cue: "Hips back, bar on the thighs, stop at the stretch.",
        prescription: "3 × 8–10",
        notes: [
          "RIR 2",
          "3-0-1-0",
          "rest 2 min"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "D3",
        name: "Bulgarian Split Squat",
        cue: "Front foot forward, knee over mid-foot, torso upright.",
        prescription: "3 × 8–10 / leg",
        notes: [
          "RIR 2",
          "rest 90 s"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "D4",
        name: "Lying Leg Curl",
        cue: "Hips down, curl fully, 3 s down.",
        prescription: "3 × 12–15",
        notes: [
          "RIR 1",
          "3-0-1-0",
          "rest 60 s"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "D5",
        name: "45° Back Extension",
        cue: "Brace, extend through the hips, not the spine.",
        prescription: "3 × 12–15",
        notes: [
          "RIR 1",
          "rest 60 s"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "BW"
      },
      {
        id: "D6",
        name: "Seated Calf Raise",
        cue: "Slow reps, full stretch, no bounce.",
        prescription: "4 × 12–15",
        notes: [
          "RIR 1",
          "rest 45 s"
        ],
        sets: 4,
        step: 2.5,
        placeholder: "—"
      }
    ]
  },
  {
    id: "session-e",
    letter: "E",
    accent: "violet",
    label: "Upper pull",
    tocLabel: "Width",
    title: "Width — lats & arms",
    duration: "~70 min",
    warmup: "5 min rower · dead hang 2×20 s · scap pull-ups 2×8 · band pull-aparts 2×15 · ramp sets.",
    cooldown: "Lat stretch on the rack 2×30 s/side · biceps wall stretch 2×30 s/side.",
    note: "",
    exercises: [
      {
        id: "E1",
        name: "Weighted Pull-Up",
        cue: "Dead hang, elbows to ribs, chin over the bar.",
        prescription: "4 × 6–8",
        notes: [
          "RIR 1–2",
          "rest 2–3 min"
        ],
        sets: 4,
        step: 2.5,
        placeholder: "BW"
      },
      {
        id: "E2",
        name: "One-Arm Dumbbell Row",
        cue: "Pull to the hip, no torso twist.",
        prescription: "3 × 8–10 / arm",
        notes: [
          "RIR 2",
          "rest 90 s"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "E3",
        name: "Wide-Grip Lat Pulldown",
        cue: "Wide grip, slow negative, chase the stretch.",
        prescription: "3 × 12–15",
        notes: [
          "RIR 1",
          "3-1-1-1",
          "rest 75 s"
        ],
        sets: 3,
        step: 2.5,
        placeholder: "—"
      },
      {
        id: "E4",
        name: "Incline Dumbbell Curl",
        cue: "Arms behind you, elbows still.",
        prescription: "3 × 10–12",
        notes: [
          "RIR 1",
          "rest 60 s"
        ],
        sets: 3,
        step: 1.25,
        placeholder: "—"
      },
      {
        id: "E5",
        name: "Cable Overhead Triceps Extension",
        cue: "Elbows forward, rope behind the head.",
        prescription: "3 × 10–12",
        notes: [
          "RIR 1",
          "rest 60 s"
        ],
        sets: 3,
        step: 1.25,
        placeholder: "—"
      },
      {
        id: "E6",
        name: "Rear-Delt Fly",
        cue: "Lead with the elbows, stop at shoulder height.",
        prescription: "3 × 15–20",
        notes: [
          "RIR 0–1",
          "rest 60 s"
        ],
        sets: 3,
        step: 1.25,
        placeholder: "—"
      },
      {
        id: "E7",
        name: "Dead Hang",
        cue: "Just hang, breathe.",
        prescription: "2 × max",
        notes: [
          "rest 60 s"
        ],
        sets: 2,
        step: 2.5,
        placeholder: "BW"
      }
    ]
  }
];

export const SESSION_BY_LETTER = Object.fromEntries(
  SESSIONS.map((session) => [session.letter, session]),
);

export const TOTAL_SETS = SESSIONS.reduce(
  (sum, session) => sum + session.exercises.reduce((n, ex) => n + ex.sets, 0),
  0,
);

export const TOC_GROUPS = [
  {
    label: "Start",
    items: [
      { id: "summary", label: "Summary" },
      { id: "read-first", label: "Read this first" },
    ],
  },
  {
    label: "Sessions",
    items: SESSIONS.map((session) => ({
      id: session.id,
      label: `Session ${session.letter} — ${session.tocLabel}`,
      accent: session.accent,
    })),
  },
  {
    label: "Programme",
    items: [
      { id: "progress", label: "This rotation, at a glance" },
      { id: "rotation", label: "The weekly rotation" },
      { id: "progression", label: "8-week progression" },
      { id: "back", label: "Back playbook" },
    ],
  },
  {
    label: "Reference",
    items: [
      { id: "recovery", label: "Fuel & recovery" },
      { id: "rules", label: "The six rules" },
      { id: "faq", label: "FAQ" },
      { id: "appendix", label: "Reference card" },
      { id: "calculators", label: "Calculators" },
    ],
  },
];

/** Page order — used by the scroll spy. Keep in sync with App.jsx. */
export const SECTION_ORDER = [
  "summary",
  "read-first",
  ...SESSIONS.map((session) => session.id),
  "progress",
  "rotation",
  "progression",
  "back",
  "recovery",
  "rules",
  "faq",
  "appendix",
  "calculators",
];
