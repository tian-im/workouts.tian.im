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
];

export default function Appendix() {
  return (
    <Section id="appendix">
      <p className="eyebrow">Appendix</p>
      <h2 className="mt-2.5 text-[1.65rem] font-bold leading-tight sm:text-[2rem]">Reference card</h2>
      <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-soft">
        The numbers you'll want at a glance.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

      <Card className="mt-3 p-4 sm:p-6">
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
    </Section>
  );
}
