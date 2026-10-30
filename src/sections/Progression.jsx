import { Card, Section } from "../components/ui.jsx";

const BLOCKS = [
  {
    range: "01–02",
    weeks: "Weeks 1–2",
    weeksClass: "text-mute",
    title: "Technique",
    body: "Same exercises, lighter loads (RIR 3–4). Log everything. The goal is repeatable reps, not numbers.",
  },
  {
    range: "03–06",
    weeks: "Weeks 3–6",
    weeksClass: "text-lime",
    title: "Build",
    body: "RIR 2. Double progression: add reps inside the range, then add weight and reset to the bottom of the range.",
  },
  {
    range: "07",
    weeks: "Week 7",
    weeksClass: "text-ice",
    title: "Deload",
    body: "Same weights, half the sets, nothing near failure. You'll feel ridiculous. Do it anyway — that's when the growth catches up.",
  },
  {
    range: "08",
    weeks: "Week 8",
    weeksClass: "text-violet",
    title: "Test",
    body: "On the five main lifts, take your Week 3 weight and do one set to technical failure. Recalculate and start the next block +2.5–5 kg.",
  },
];

const PROGRESSION_ROWS = [
  { week: "Week 3", value: "60 kg × 5, 5, 5" },
  { week: "Week 4", value: "60 kg × 6, 6, 5" },
  { week: "Week 5", value: "60 kg × 6, 6, 6" },
  { week: "Week 6", value: "62.5 kg × 5, 5, 5", highlight: true },
];

export default function Progression({ onOpenPanel }) {
  return (
    <Section id="progression">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">The 8-week block</p>
          <h2 className="mt-2.5 max-w-2xl text-[1.65rem] font-bold leading-tight sm:text-[2.15rem]">
            More weight, or more reps. Never neither.
          </h2>
        </div>
        <button
          type="button"
          onClick={() => onOpenPanel("block")}
          className="no-print mt-1 hidden h-9 shrink-0 items-center rounded-lg border border-line px-3 text-xs font-medium text-dim transition-colors hover:border-faint hover:text-chalk sm:inline-flex"
        >
          How the block works
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {BLOCKS.map((block) => (
          <Card key={block.range} className="relative overflow-hidden p-4 sm:p-5">
            <span className="absolute right-3.5 top-3 font-mono text-[11px] text-faint">
              {block.range}
            </span>
            <p className={`font-mono text-[10px] uppercase tracking-wider ${block.weeksClass}`}>
              {block.weeks}
            </p>
            <h3 className="mt-1 font-display text-lg font-bold sm:text-xl">{block.title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-dim">{block.body}</p>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <Card className="p-4 sm:p-6">
          <h3 className="font-display text-lg font-bold">Double progression, in practice</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-dim">
            Bench is written as 3 × 5–6. You start at 60 kg:
          </p>
          <div className="mt-3.5 space-y-2 font-mono text-[12px]">
            {PROGRESSION_ROWS.map((row) => (
              <div
                key={row.week}
                className={`flex items-center justify-between rounded-md px-3 py-2 ${
                  row.highlight
                    ? "bg-highlight/30 text-lime ring-1 ring-inset ring-lime/30"
                    : "bg-panel-2"
                }`}
              >
                <span className={row.highlight ? "opacity-70" : "text-mute"}>{row.week}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
          <p className="mt-2.5 text-[12px] leading-relaxed text-mute">
            Three sets at the top of the range = permission to add weight. Not before, not by feel.
          </p>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-bold">What "RIR 2" actually means</h3>
            <button
              type="button"
              onClick={() => onOpenPanel("rir")}
              className="ex-more no-print"
              aria-label="Reps in reserve — details"
              aria-haspopup="dialog"
            >
              i
            </button>
          </div>
          <p className="mt-1.5 text-[13px] leading-relaxed text-dim">
            Reps In Reserve: how many clean reps you could still do when you rack the bar. RIR 2 means
            the set felt hard but you had two left.
          </p>
          <div className="mt-3.5 space-y-2.5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 rounded bg-panel-3 px-1.5 py-0.5 font-mono text-[10px] text-mute">
                RIR 3–4
              </span>
              <p className="text-[12.5px] leading-relaxed text-soft">
                Weeks 1–2. Deliberately easy. You're learning the movement.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 rounded bg-highlight/40 px-1.5 py-0.5 font-mono text-[10px] text-lime">
                RIR 2
              </span>
              <p className="text-[12.5px] leading-relaxed text-soft">
                Compounds, weeks 3–6. Hard but never a grind.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 rounded bg-panel-3 px-1.5 py-0.5 font-mono text-[10px] text-mute">
                RIR 0–1
              </span>
              <p className="text-[12.5px] leading-relaxed text-soft">
                Isolation and machines only. Curls, raises, pushdowns.
              </p>
            </div>
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-mute">
            If your form changes on the last rep, the set is over — that's failure regardless of the
            number.
          </p>
        </Card>
      </div>
    </Section>
  );
}
