import { Section } from "../components/ui.jsx";

const FAQ = [
  {
    q: "Can I move exercises around?",
    a: "Yes, as long as you keep the movement pattern and keep the first lift first. No barbell row? Use a chest-supported row. No pull-up? Lat pulldown. Don't replace a compound with a curl.",
  },
  {
    q: "How do I know my starting weight?",
    a: "Ramp to a set of 5–6 with ~3 reps left. If in doubt, go lighter. You'll pass that weight in two weeks anyway, and bad form now costs you a month.",
  },
  {
    q: "What if I miss a week?",
    a: "Pick up where you left off in the rotation, drop each main lift's weight by ~10% for one session, then continue. Don't restart the block.",
  },
  {
    q: "Will this make me bulky?",
    a: "Not accidentally. You'd need years of eating in a surplus. At 200–300 kcal over maintenance you'll add size slowly and stay lean — exactly what you want for a thicker back.",
  },
  {
    q: "Why no direct ab work every day?",
    a: "You get hanging knee raises on B and heavy bracing on every compound. If you want more, add 2 sets of cable crunches at the end of A and E.",
  },
  {
    q: "Do I need to go to failure?",
    a: "No. RIR 1–2 builds the same muscle with far less fatigue. Failure is for the Week 8 test and the occasional isolation set — not every session.",
  },
  {
    q: "What about cardio?",
    a: "2–3 sessions of 20–30 min zone 2 on rest days. Keep it separate from lifting where possible, and don't replace a lifting day with it.",
  },
  {
    q: "The tracker isn't saving my sets.",
    a: "It stores data in your browser only (no accounts, no server). Private/incognito mode clears it when you close the tab. Use the same browser in normal mode.",
  },
];

export default function Faq() {
  return (
    <Section id="faq">
      <p className="eyebrow">Questions</p>
      <h2 className="mt-2.5 text-[1.65rem] font-bold leading-tight sm:text-[2rem]">The usual ones</h2>

      <div className="mt-5 grid gap-x-8 md:grid-cols-2">
        {FAQ.map((item) => (
          <div key={item.q} className="rule">
            <div>
              <h3 className="text-[14px] font-semibold">{item.q}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-dim">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
