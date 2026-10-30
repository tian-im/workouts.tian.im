import { Card, Section } from "../components/ui.jsx";

const GLANCE = [
  {
    eyebrow: "Effort",
    title: "RIR scale",
    rows: [
      ["RIR 4", "Weeks 1–2"],
      ["RIR 2", "Compounds"],
      ["RIR 1", "Isolation"],
      ["RIR 0", "Week 8 test"],
    ],
  },
  {
    eyebrow: "Tempo",
    title: "3-1-1-0",
    rows: [
      ["Lower", "3 s"],
      ["Stretch pause", "1 s"],
      ["Lift", "1 s"],
      ["Top rest", "0 s"],
    ],
  },
  {
    eyebrow: "Rest",
    title: "Between sets",
    rows: [
      ["Squat / deadlift", "3–4 m"],
      ["Bench / row", "3 m"],
      ["Accessories", "90 s"],
      ["Isolation", "60 s"],
    ],
  },
  {
    eyebrow: "Equipment",
    title: "Bring these",
    rows: [
      ["Straps", "rows, shrugs, RDL"],
      ["Belt", "optional, top sets"],
      ["Water", "non-negotiable"],
      ["This page", "saved offline"],
    ],
  },
];

const AUDIT = [
  ["A4 · Chest-supported row", 3],
  ["C1 · Barbell row", 4],
  ["C2 · Seal row", 4],
  ["C3 · Cable row", 3],
  ["C4 · Straight-arm pulldown", 3],
  ["E1 · Weighted pull-up", 4],
  ["E2 · One-arm DB row", 3],
  ["E3 · Wide-grip pulldown", 3],
];

export default function Appendix() {
  return (
    <Section id="appendix">
      <p className="eyebrow">Appendix</p>
      <h2 className="mt-2.5 text-[1.65rem] font-bold leading-tight sm:text-[2rem]">Reference card</h2>
      <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-soft">
        The numbers you'll want at a glance. Everything here is expanded in the session notes or the
        Contents panel.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {GLANCE.map((card) => (
          <Card key={card.title} className="p-4 sm:p-5">
            <p className="eyebrow">{card.eyebrow}</p>
            <h3 className="mt-1.5 font-display text-base font-bold">{card.title}</h3>
            <ul className="mt-2 space-y-1.5 text-[12.5px] leading-relaxed text-soft">
              {card.rows.map(([left, right]) => (
                <li key={left} className="flex justify-between gap-2">
                  <span>{left}</span>
                  <span className="text-mute">{right}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="p-4 sm:p-6">
          <p className="eyebrow">Every session</p>
          <h3 className="mt-1.5 font-display text-lg font-bold">Warm-up protocol</h3>
          <ol className="mt-2.5 space-y-2 text-[13px] text-soft">
            {[
              "5 min easy cardio — rower, bike, incline walk",
              "Band pull-aparts 2×15",
              "Movement-specific drill (listed on each session)",
              "Ramp sets on the first lift — never skip these",
            ].map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="font-mono text-[11px] text-mute">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[12px] leading-relaxed text-mute">
            Ramp sets exist to make your top sets feel light, not to tire you out: bar, 40%, 60%, 80%,
            then work.
          </p>
        </Card>

        <Card className="p-4 sm:p-6">
          <p className="eyebrow">Audit</p>
          <h3 className="mt-1.5 font-display text-lg font-bold">Where the 27 back sets come from</h3>
          <ul className="mt-2.5 space-y-1.5 font-mono text-[12px]">
            {AUDIT.map(([label, sets]) => (
              <li key={label} className="flex justify-between border-b border-line pb-1.5">
                <span className="text-soft">{label}</span>
                <span className="text-mute">{sets}</span>
              </li>
            ))}
            <li className="flex justify-between pt-1.5 font-semibold text-lime">
              <span>Total direct</span>
              <span>27</span>
            </li>
          </ul>
          <p className="mt-3 text-[12px] leading-relaxed text-mute">
            Traps, rear delts and erectors add another 9 sets on top of these.
          </p>
        </Card>
      </div>
    </Section>
  );
}
