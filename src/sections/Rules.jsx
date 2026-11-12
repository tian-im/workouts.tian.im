import { Callout, RuleCard, Section } from "../components/ui.jsx";

const RULES = [
  {
    n: "01",
    title: "Compound first — no exceptions",
    body: "The first lift of every session is a barbell compound: bench, squat, row, deadlift, pull-up. It gets your freshest effort, the longest rest (3–4 min) and never goes to failure. Everything after it is support work.",
  },
  {
    n: "02",
    title: "It's a rotation, not a calendar",
    body: "Train A → B → C → D → E → rest → repeat. If life eats Tuesday, you don't restart the week — you do the next letter on the next day you show up. The rotation is the schedule.",
  },
  {
    n: "03",
    title: "Stop two reps short of failure",
    body: "On compounds, finish each set with ~2 reps left in the tank (RIR 2). On isolation work, 1 rep left is fine — no need to grind to failure, the muscle still grows. Grinding every set wrecks your next session and your form.",
  },
  {
    n: "04",
    title: "Add weight by the rule, not by feel",
    body: (
      <>
        When all sets hit the top of the rep range with 2 reps in reserve, add{" "}
        <strong className="text-chalk">2.5 kg</strong> upper body or{" "}
        <strong className="text-chalk">5 kg</strong> lower body next time. Not before.
      </>
    ),
  },
  {
    n: "05",
    title: "Back gets touched three times a week",
    body: "Once heavy and horizontal (Day C), once vertical for width (Day E), once as support on push day (Day A). That frequency is why the back grows faster than anything else on this plan.",
  },
  {
    n: "06",
    title: "Log every set",
    body: "Weight and reps. Progressive overload is the only mechanism that actually builds muscle — and you can't beat last month if you don't know what last month was.",
  },
];

export default function Rules() {
  return (
    <Section id="rules">
      <p className="eyebrow">The rulebook</p>
      <h2 className="mt-2.5 text-[1.65rem] font-bold leading-tight sm:text-[2rem]">The six rules</h2>
      <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-soft">
        Read once, then come back when something feels off. These are the only rules that matter.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {RULES.map((rule) => (
          <RuleCard key={rule.n} n={rule.n} title={rule.title}>
            {rule.body}
          </RuleCard>
        ))}
      </div>

      <Callout tone="lime" className="mt-3 p-4 sm:p-5">
        <p className="eyebrow text-lime">Non-negotiable</p>
        <p className="mt-1.5 max-w-3xl text-[13px] leading-relaxed text-soft">
          Warm up before the first work set and cool down after the last one. Train hard, but never at
          the cost of a joint — an injury costs more weeks than any missed PR.
        </p>
      </Callout>
    </Section>
  );
}
