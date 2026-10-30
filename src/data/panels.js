/* Reference panels rendered in the detail sheet.
 * Structured blocks instead of raw HTML so they stay reusable and safe.
 */

export const PANELS = {
  howto: {
    eyebrow: "Start here",
    title: "How to use this page",
    blocks: [
      {
        t: "p",
        text: "The plan is five sessions in a fixed order. You don't need to know what day of the week it is — just which letter is next.",
      },
      { t: "h", text: "The loop" },
      {
        t: "list",
        items: [
          "Walk in, open Contents, tap the next session.",
          "Do the warm-up, then the exercises top to bottom. Compounds first, always.",
          "Log the weight and tap the set number as you finish each set.",
          "Next time, the numbers are still there. Add weight when the rule says so.",
        ],
      },
      { t: "h", text: "The buttons" },
      {
        t: "list",
        items: [
          "Contents jumps to any session, the rotation, progression, the back playbook or the appendix.",
          "i on any exercise opens form notes, common mistakes, and easier/harder swaps.",
          "Reset in the top bar clears every logged set. Individual sessions have their own reset at the bottom.",
          "Print gives you a clean paper version if you'd rather not use your phone.",
        ],
      },
      { t: "h", text: "The briefing" },
      {
        t: "p",
        text: "The briefing at the top is a prompt, not a lock — every section is always reachable. Marking it read only records that you've seen it and jumps you to Session A.",
      },
      { t: "h", text: "Where the data lives" },
      {
        t: "p",
        text: "Everything is stored in this browser only — no account, no server. Clearing site data or using private mode will wipe it.",
      },
    ],
  },

  rir: {
    eyebrow: "Autoregulation",
    title: "Reps in Reserve (RIR)",
    blocks: [
      {
        t: "p",
        text: "RIR is how many clean reps you had left when you stopped the set. It's the difference between training hard and training yourself into the ground.",
      },
      { t: "h", text: "How to judge it" },
      {
        t: "list",
        items: [
          "RIR 4 — could have done four more. Feels easy. Weeks 1–2 only.",
          "RIR 2 — bar speed slowing, form still perfect. This is where most work happens.",
          "RIR 1 — one rep left, and you know it. Isolation work.",
          "RIR 0 — nothing left. Week 8 test only.",
        ],
      },
      { t: "h", text: "The honest test" },
      {
        t: "p",
        text: "If your form changes — back rounds, knees cave, bar path drifts — the set is over, whatever number you had in mind. Technique failure is real failure.",
      },
      { t: "h", text: "Why not just go to failure?" },
      {
        t: "p",
        text: "Failure costs far more recovery than it returns in stimulus. On a 5-day rotation you can't afford to be wrecked for two days after every session. Isolation work grows just fine at RIR 1.",
      },
    ],
  },

  tempo: {
    eyebrow: "Notation",
    title: "Tempo: 3-1-1-0",
    blocks: [
      { t: "p", text: "Four numbers, in seconds, in this order:" },
      {
        t: "list",
        items: [
          "3 — lowering the weight (eccentric).",
          "1 — pause in the stretched position.",
          "1 — driving the weight up (concentric).",
          "0 — rest at the top before the next rep.",
        ],
      },
      { t: "h", text: "Why bother" },
      {
        t: "p",
        text: "Tempo keeps the set honest when the weight is light. It also stops you from bouncing, which is how most people get hurt and how most reps get wasted.",
      },
      { t: "h", text: "If no tempo is written" },
      {
        t: "p",
        text: "Control the negative for about 2 s and don't let the stack drop. That's it.",
      },
    ],
  },

  block: {
    eyebrow: "Programme",
    title: "How the 8-week block works",
    blocks: [
      {
        t: "p",
        text: "One block is eight weeks of the same five sessions, with the loading rules changing.",
      },
      {
        t: "list",
        items: [
          "Weeks 1–2 — Technique. RIR 3–4, technique first, log everything.",
          "Weeks 3–6 — Build. RIR 2, double progression: reps first, then weight.",
          "Week 7 — Deload. Same weights, half the sets. No sets near failure.",
          "Week 8 — Test. One top set to technical failure on the five main lifts.",
        ],
      },
      { t: "h", text: "What the test actually does" },
      {
        t: "p",
        text: "It gives you a real number to recalculate working weights from, instead of guessing. Take the reps you hit, estimate your 5-rep max, and start the next block at 75–80% of it. That lands you 2.5–5 kg heavier than last block.",
      },
      { t: "h", text: "When to deload early" },
      {
        t: "p",
        text: "Three sessions in a row where everything feels heavy, joints ache, or you're sleeping badly. Take the deload week — you'll come back stronger than if you pushed through.",
      },
    ],
  },
};
