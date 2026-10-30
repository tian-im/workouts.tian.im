/* Plan data — single source of truth for sessions, exercises and prescriptions. */
export const SESSIONS = [
  {
    id: "session-a",
    letter: "A",
    accent: "ember",
    label: "Upper push",
    tocLabel: "Push",
    title: "Push — Bench strength",
    description: "Horizontal pressing power, then shoulder and triceps volume. The chest-supported row at the end feeds the back goal and keeps your shoulders from rounding forward.",
    duration: "~70 min",
    warmup: "5 min rower or bike · band pull-aparts 2×15 · push-ups ×10 · ramp sets on bench.",
    cooldown: "Doorway chest stretch 2×30 s/side · overhead triceps stretch 2×30 s/side.",
    note: "",
    exercises: [
      {
        id: "A1",
        name: "Barbell Bench Press",
        cue: "Shoulder blades pinned back and down. Bar to lower chest, elbows ~45° from your body. Drive your feet into the floor.",
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
        cue: "Bench upright, ribs down. Press until the dumbbells nearly touch, without flaring your lower back off the pad.",
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
        cue: "Bench at 30°. Let the dumbbells drift out for a real stretch at the bottom, then press up and slightly in.",
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
        cue: "Chest glued to the pad, no body english. Pull elbows past your ribs and hold one second at the top. This is back volume, not ego lifting.",
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
        cue: "Lead with the elbow, stop at shoulder height. Keep the cable behind your body so there's tension even at the bottom.",
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
        cue: "Elbows pinned to your sides, spread the rope at the bottom. Upper arms don't move.",
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
    description: "Heavy squat, then quad and hamstring volume. This is the day that makes everything else feel lighter.",
    duration: "~70 min",
    warmup: "5 min bike · leg swings 10/side · bodyweight squats ×15 · hip airplanes 8/side · ramp sets.",
    cooldown: "Couch stretch 2×45 s/side · pigeon 2×45 s/side · quad stretch 2×30 s/side.",
    note: "",
    exercises: [
      {
        id: "B1",
        name: "Back Squat",
        cue: "Brace, break at the hips and knees together, knees track over toes. Depth you can own — no bouncing out of the hole.",
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
        cue: "Feet mid-platform, lower until your lower back starts to tuck, then press without locking out hard.",
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
        cue: "Slow up, slow down, squeeze the quad at the top. No swinging the stack.",
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
        cue: "Toes pulled up, drive the pad down and back. Pause at the fully bent position — that's where the hamstring works hardest.",
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
        cue: "Full stretch at the bottom, 2 s pause at the top. Calves need the pause, not more weight.",
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
        cue: "Curl your pelvis up, don't just swing your legs. Slow on the way down.",
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
    description: "The whole point of the program. Heavy horizontal rowing first, then loaded stretch, traps and rear delts. Do this day fresh, not at the end of the week.",
    duration: "~85 min",
    warmup: "5 min rower · scap pulldowns 2×10 · band pull-aparts 2×15 · empty-bar rows ×10 · ramp sets.",
    cooldown: "Lat stretch on the rack 2×30 s/side · child's pose 60 s · doorway chest stretch.",
    note: "Drop #7 and #6 — never drop #1 or #2. They're the reason this day exists.",
    exercises: [
      {
        id: "C1",
        name: "Barbell Row",
        cue: "Hinge to ~30–45°, brace, pull to your lower ribs. Torso stays still — if you have to heave, the weight is too heavy. Straps are allowed here.",
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
        cue: "Chest supported removes the lower back entirely, so the mid-back has to do all the work. Pull elbows back and down, pause 1 s.",
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
        cue: "Let the shoulder blades travel forward at the start, then pull them back past neutral. Chest tall, no rocking.",
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
        cue: "Lats only — arms stay almost straight. Reach forward for the stretch, drive down with your armpits. This is the loaded-stretch lift.",
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
        cue: "Straight up, 2 s hold at the top, controlled down. No rolling. Use straps so grip isn't the limiting factor.",
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
        cue: "Rope at eye height, pull to your forehead and rotate your hands back. Light weight, high reps. This is shoulder insurance.",
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
        cue: "Trains the brachialis, which pushes the biceps up and adds arm thickness from the side. Wrists neutral, elbows still.",
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
    description: "Pull from the floor, then hamstrings, single-leg work and erectors. Deadlift is a skill: reset every rep, and stop the set when your back rounds.",
    duration: "~75 min",
    warmup: "5 min bike · dowel hip hinge ×10 · glute bridge ×15 · dead hang 20 s · ramp sets.",
    cooldown: "Hamstring stretch 2×45 s/side · hip flexor stretch 2×30 s/side.",
    note: "",
    exercises: [
      {
        id: "D1",
        name: "Deadlift — Conventional or Trap Bar",
        cue: "Bar over mid-foot, slack out of the bar, push the floor away. Reset your setup between reps. If the bar drifts forward, stop the set.",
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
        cue: "Soft knees, hips back, bar shaving the thighs. Stop when your hamstrings stretch — not when the bar hits the floor.",
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
        cue: "Front foot far enough forward that the knee stays over the mid-foot. Torso upright. This one will humble you — start light.",
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
        cue: "Hips down on the pad, curl all the way, lower over 3 s. Different knee angle than the seated version — that's why both are here.",
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
        cue: "Brace and extend through the hips, not by rounding and snapping the spine. This builds the erectors that make a back look thick from the side.",
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
        cue: "Knees bent hits the soleus. Slow reps, full stretch at the bottom, no bouncing.",
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
    description: "Vertical pulling for lat width, plus arms and rear delts. Width comes from the lats flaring out — thickness from Day C. You need both.",
    duration: "~70 min",
    warmup: "5 min rower · dead hang 2×20 s · scap pull-ups 2×8 · band pull-aparts 2×15 · ramp sets.",
    cooldown: "Lat stretch on the rack 2×30 s/side · biceps wall stretch 2×30 s/side.",
    note: "",
    exercises: [
      {
        id: "E1",
        name: "Weighted Pull-Up or Lat Pulldown",
        cue: "Start from a dead hang, pull elbows to your ribs, chin over the bar. Can't do 6 clean reps? Use the lat pulldown and earn the pull-up.",
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
        cue: "Brace a hand on the bench, pull the dumbbell toward your hip, let the shoulder blade travel. No torso twist.",
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
        cue: "Lighter than #1, wider grip, slower negative. Chase the stretch at the top and the squeeze at the bottom — this is a shaping lift.",
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
        cue: "Bench at 45–60°, arms hang behind you. That position stretches the long head — more range, more growth.",
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
        cue: "Rope behind your head, elbows pointing forward. The overhead position loads the long head — the one that adds size.",
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
        cue: "Reverse pec deck or cable. Lead with the elbows, stop at shoulder height. Rear delts fill the gap between your shoulders and your traps.",
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
        cue: "Just hang. Decompresses the spine, builds grip and shoulder health. Breathe.",
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
