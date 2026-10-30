import { Card, Section } from "../components/ui.jsx";

const LEVERS = [
  {
    n: "01",
    title: "Heavy rowing",
    body: "Barbell row, seal row. Heavy tension through the mid-back and rhomboids. This is the thickness driver — it gets the first half of Day C.",
  },
  {
    n: "02",
    title: "Loaded stretch",
    body: "Straight-arm pulldown, wide-grip pulldown, pull-ups. Lats respond to being stretched under load — not just squeezed.",
  },
  {
    n: "03",
    title: "Traps & erectors",
    body: "Shrugs and back extensions. These are what people see behind you and from the side. Most programs leave them out. This one doesn't.",
  },
  {
    n: "04",
    title: "Frequency",
    body: "Three back touches a week, ~27 direct sets. The back recovers faster than legs, so it can take the frequency — and frequency beats one big session.",
  },
];

const TIMELINE = [
  ["Month 1", "Better posture, stronger pulls, numbers climbing fast. Mirror probably looks the same — that's normal."],
  ["2–3 mo", "Shoulders sit back, upper back looks fuller in a fitted shirt. Photos start showing real difference."],
  ["4–6 mo", "Visible thickness from the side and back. This is where people start asking what you've been doing."],
];

const LIFTS = [
  ["Barbell Row", "Day C"],
  ["Weighted Pull-Up", "Day E"],
  ["Bench Press", "Day A"],
  ["Back Squat", "Day B"],
];

export default function BackPlaybook() {
  return (
    <Section id="back" band>
      <p className="eyebrow">Goal two, in detail</p>
      <h2 className="mt-2.5 max-w-3xl text-[1.65rem] font-bold leading-tight sm:text-[2.15rem]">
        A thicker back is four things, not one exercise.
      </h2>
      <p className="mt-3.5 max-w-2xl text-[14px] leading-relaxed text-soft">
        "Thick" means the back has depth from the side — lats, mid-back, traps and erectors all
        contributing. That's why Day C has seven exercises and why pulling appears on three days.
      </p>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {LEVERS.map((lever) => (
          <Card key={lever.n} className="p-4 sm:p-5">
            <p className="font-mono text-[11px] text-lime">{lever.n}</p>
            <h3 className="mt-1.5 font-display text-lg font-bold leading-snug">{lever.title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-dim">{lever.body}</p>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_0.9fr]">
        <Card className="p-4 sm:p-6">
          <h3 className="font-display text-lg font-bold">What to expect, honestly</h3>
          <div className="mt-3.5 space-y-3">
            {TIMELINE.map(([when, body]) => (
              <div key={when} className="flex gap-3.5">
                <span className="w-12 shrink-0 font-mono text-[11px] text-mute">{when}</span>
                <p className="text-[13px] leading-relaxed text-soft">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-line pt-3.5 text-[12px] leading-relaxed text-mute">
            None of that happens at maintenance calories. Muscle needs material — see the fuel notes
            in Recovery.
          </p>
        </Card>

        <Card className="p-4 sm:p-6">
          <h3 className="font-display text-lg font-bold">The four lifts that matter most</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-dim">
            If you only track four numbers for the next six months, track these:
          </p>
          <ul className="mt-3.5 space-y-2.5 text-[13px]">
            {LIFTS.map(([lift, day], index) => (
              <li
                key={lift}
                className={`flex items-center justify-between ${
                  index < LIFTS.length - 1 ? "border-b border-line pb-2" : ""
                }`}
              >
                <span className="text-fog">{lift}</span>
                <span className="font-mono text-[11px] text-mute">{day}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3.5 text-[12px] leading-relaxed text-mute">
            Add 5 kg to the row and 2.5 kg to the pull-up over the block and the back will look
            different. Not because of a secret exercise — because of arithmetic.
          </p>
        </Card>
      </div>
    </Section>
  );
}
