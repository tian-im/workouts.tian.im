import { Card, Chip, Section } from "../components/ui.jsx";
import { AlertIcon } from "../components/icons.jsx";

const DAYS = [
  { day: "Day 1", tone: "text-ember", title: "A · Push", sub: "Bench", dot: "bg-ember" },
  { day: "Day 2", tone: "text-sand", title: "B · Squat", sub: "Back squat", dot: "bg-sand" },
  { day: "Rest", tone: "text-mute", title: "Off", sub: "Stretch 20 min", muted: true },
  { day: "Day 3", tone: "text-lime", title: "C · Back", sub: "Barbell row", dot: "bg-lime", ring: true },
  { day: "Day 4", tone: "text-ice", title: "D · Hinge", sub: "Deadlift", dot: "bg-ice" },
  { day: "Day 5", tone: "text-violet", title: "E · Width", sub: "Pull-up", dot: "bg-violet" },
  { day: "Rest", tone: "text-mute", title: "Off", sub: "Then repeat", muted: true },
];

export default function Rotation() {
  return (
    <Section id="rotation" band>
      <p className="eyebrow">How the week fits together</p>
      <h2 className="mt-2.5 max-w-2xl text-[1.65rem] font-bold leading-tight sm:text-[2.15rem]">
        A rotation, because your week won't look the same twice.
      </h2>
      <p className="mt-3.5 max-w-2xl text-[14px] leading-relaxed text-soft">
        You said 5–6 sessions ideally, closer to inconsistent in reality. So the plan doesn't use
        weekdays — it uses an order. Pick up the next letter whenever you walk in.
      </p>

      <div className="mt-7 overflow-hidden rounded-xl border border-line bg-panel">
        <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4 lg:grid-cols-7">
          {DAYS.map((entry) => (
            <div
              key={entry.title + entry.day}
              className={`bg-panel px-3.5 py-4 ${entry.ring ? "ring-1 ring-inset ring-lime/30" : ""}`}
            >
              <p className={`font-mono text-[10px] uppercase tracking-wider ${entry.tone}`}>
                {entry.day}
              </p>
              <p
                className={`mt-1 font-display text-base font-bold sm:text-lg ${
                  entry.muted ? "text-mute" : ""
                }`}
              >
                {entry.title}
              </p>
              <p className="text-[11px] text-mute">{entry.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <Card className="p-4 sm:p-5">
          <p className="eyebrow">If you get 6 days</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-soft">
            Add a <strong className="text-chalk">Day F: pump + conditioning</strong> — 30–40 min of
            lat pulldown 3×12, cable fly 3×12, lateral raise 3×15, curls 3×12, calves 3×15, then 15
            min easy cardio. High reps, no grinding.
          </p>
        </Card>
        <Card className="p-4 sm:p-5">
          <p className="eyebrow">If you get 4 days</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-soft">
            <strong className="text-chalk">A, B, C, D</strong>. You drop the dedicated width day, so
            add one extra set of lat pulldown to the end of Day C. The back still gets three touches.
          </p>
        </Card>
        <Card className="p-4 sm:p-5">
          <p className="eyebrow">If you get 2–3 days</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-soft">
            <strong className="text-chalk">A, C, D</strong> — push, back, hinge. Do them in that
            order, never two in one day. Two sessions a week still maintains; three builds.
          </p>
        </Card>
      </div>

      <div className="mt-4 rounded-xl border border-ember/25 bg-ember/[0.04] p-4 sm:p-5">
        <h3 className="text-[15px] font-semibold">The rules for skipping</h3>
        <ul className="mt-2.5 space-y-2 text-[13px] leading-relaxed text-soft">
          {[
            "Missed a day? Do the next letter. Don't restart, don't double up.",
            "More than 10 days off? One ramp-back session at 60% weight and half the sets.",
            "Never put Day C and Day E back-to-back if you can help it — both are heavy pulling.",
            "Never train the same heavy lift on consecutive days. That's the whole reason for the rotation.",
          ].map((line) => (
            <li key={line} className="flex gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
