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
        name: "Seal Row / Chest-Supported T-Bar Row",
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
        name: "Deadlift — Conventional or Trap Bar",
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
        name: "Weighted Pull-Up or Lat Pulldown",
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
