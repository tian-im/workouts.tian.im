import { Card, Section } from "../components/ui.jsx";

const FUEL = [
  ["Protein:", "1.6–2.2 g per kg of bodyweight per day. If you're 75 kg, that's 120–165 g, spread over 3–4 meals."],
  ["Calories:", "200–300 above maintenance. Enough to build, slow enough to stay lean."],
  ["Timing:", "protein within a couple of hours of training, carbs around it. Total daily intake matters more than the exact window."],
];

const RECOVERY = [
  ["Sleep:", "7–9 h. Below 6 h and strength gains roughly halve. Not a soft recommendation."],
  ["Cardio:", "2–3 × 20–30 min zone 2 on rest days. Doesn't interfere; helps recovery."],
  ["Stress:", "if a week is chaos, keep the compounds and cut the isolation. Half a session beats none."],
];

const STRETCH = [
  ["Cat–cow", "10 slow reps"],
  ["World's greatest stretch", "5 / side"],
  ["Couch stretch (hip flexor)", "45 s / side"],
  ["Pigeon pose", "45 s / side"],
  ["Thoracic opener on a bench", "10 reps"],
  ["Lat stretch on the rack", "30 s / side"],
  ["Dead hang", "2 × 20 s"],
];

export default function Recovery() {
  return (
    <Section id="recovery" band>
      <p className="eyebrow">Support</p>
      <h2 className="mt-2.5 max-w-2xl text-[1.65rem] font-bold leading-tight sm:text-[2.15rem]">
        Eat enough, sleep enough, or nothing above works.
      </h2>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <Card className="p-4 sm:p-6">
          <p className="eyebrow">Fuel</p>
          <h3 className="mt-1.5 font-display text-lg font-bold">What to eat</h3>
          <ul className="mt-2.5 space-y-2 text-[13px] leading-relaxed text-soft">
            {FUEL.map(([lead, body]) => (
              <li key={lead} className="flex gap-2.5">
                <span className="text-lime">→</span>
                <span>
                  <strong className="text-chalk">{lead}</strong> {body}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4 sm:p-6">
          <p className="eyebrow">Recovery</p>
          <h3 className="mt-1.5 font-display text-lg font-bold">The other half of the work</h3>
          <ul className="mt-2.5 space-y-2 text-[13px] leading-relaxed text-soft">
            {RECOVERY.map(([lead, body]) => (
              <li key={lead} className="flex gap-2.5">
                <span className="text-lime">→</span>
                <span>
                  <strong className="text-chalk">{lead}</strong> {body}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-3 p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="eyebrow">Once a week · 20 minutes</p>
            <h3 className="mt-1.5 font-display text-lg font-bold">Stretch &amp; mobility session</h3>
          </div>
          <span className="chip hidden shrink-0 sm:inline-flex">Rest day</span>
        </div>
        <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-dim">
          Not optional. One session a week keeps hips, shoulders and lower back from becoming the
          reason you miss a block. Do it on a rest day, or straight after Day C.
        </p>
        <div className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {STRETCH.map(([name, dose], index) => (
            <div
              key={name}
              className={`flex items-baseline justify-between gap-3 ${
                index < STRETCH.length - 1 ? "border-b border-line pb-1.5" : ""
              } ${index === STRETCH.length - 1 ? "sm:col-span-2 sm:border-b-0" : ""}`}
            >
              <span className="text-[13px] text-soft">{name}</span>
              <span className="font-mono text-[11px] text-mute">{dose}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-3 card border-lime/30 bg-[radial-gradient(120%_100%_at_100%_0%,rgba(216,255,71,0.24),transparent_65%)] p-4 sm:p-6">
        <p className="eyebrow text-lime">Non-negotiable</p>
        <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-fog">
          Training hard is the easy part. Showing up 3× a week for 24 weeks is the whole game.
          Everything on this page is designed so a bad, busy, tired week still counts as a win.
        </p>
      </div>
    </Section>
  );
}
