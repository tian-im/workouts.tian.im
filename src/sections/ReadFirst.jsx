import { Card, Eyebrow } from "../components/ui.jsx";
import { ArrowRightIcon } from "../components/icons.jsx";

const BRIEFING = [
  {
    n: "01",
    title: "Compounds first, every session",
    body: "Bench, squat, row, deadlift, pull-up — first, fresh, and never to failure. The rest of the session supports them.",
  },
  {
    n: "02",
    title: "A rotation, not a calendar",
    body: "A → B → C → D → E → rest → repeat. Miss a day and you simply pick up the next letter; you never restart the week.",
  },
  {
    n: "03",
    title: "Never skip Day C",
    body: "If the week collapses to three sessions, they are A, C and D. Push, back, hinge — that trio still moves everything forward.",
  },
];

export default function ReadFirst({ acked, onAcknowledge }) {
  return (
    <section id="read-first" className="mx-auto max-w-5xl px-4 pb-10 pt-10 sm:px-6 sm:pt-14">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-lime" aria-hidden="true" />
        <Eyebrow>Read this first · two minutes</Eyebrow>
      </div>

      <h2 className="mt-2.5 max-w-2xl text-[1.65rem] font-bold leading-tight sm:text-[2.15rem]">
        The short version, before you start.
      </h2>
      <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-soft">
        Nothing below is locked — the sessions start right after this. Read this page, then use{" "}
        <span className="font-semibold text-chalk">Contents</span> to jump anywhere. The full rulebook
        sits at the end if you want detail.
      </p>

      <div className="mt-6 grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="p-4 sm:p-6">
          <Eyebrow>The three things that matter</Eyebrow>

          <div className="mt-3 space-y-3.5">
            {BRIEFING.map((item) => (
              <div key={item.n} className="flex gap-3">
                <span className="num pt-0.5">{item.n}</span>
                <div>
                  <h3 className="text-[15px] font-semibold text-chalk">{item.title}</h3>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-dim">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 border-t border-line pt-3 text-[12px] leading-relaxed text-mute">
            Add weight by the rule, not by feel: 2.5 kg upper body and 5 kg lower body once every set
            hits the top of its rep range with two reps in reserve.
          </p>
        </Card>

        <div className="flex flex-col gap-3">
          <Card className="p-4 sm:p-5">
            <Eyebrow>First session only</Eyebrow>
            <h3 className="mt-1.5 text-base font-bold">Find your starting weights</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-dim">
              Ramp up in small jumps until a set of 5–6 feels like you have 3 reps left. That's your
              Week 1 weight. It will feel too easy — good.
            </p>
            <p className="mt-2.5 font-mono text-[11px] text-mute">
              Bar × 10 · 40% × 5 · 60% × 3 · 80% × 1 · work sets
            </p>
          </Card>

          <Card className="p-4 sm:p-5">
            <Eyebrow>Coming back from being sick</Eyebrow>
            <h3 className="mt-1.5 text-base font-bold">Week 0: ramp back</h3>
            <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-soft">
              {[
                "Train only after 24 h symptom-free.",
                "Two sessions: A and C. Two sets each, 50–60% load, stop at RIR 4.",
                "No deadlifts, no AMRAP. Then start Week 1 from the top.",
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-lime">→</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <div
        id="ack"
        className="mt-4 card border-lime/40 bg-[radial-gradient(120%_100%_at_0%_0%,rgba(216,255,71,0.38),transparent_72%)] p-5 sm:p-7"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Eyebrow className="text-lime">Mark as read</Eyebrow>
            <h3 className="mt-1.5 font-display text-xl font-bold">That's the briefing.</h3>
            <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-soft">
              Nothing is locked either way — this just keeps the page honest about whether you've read
              it, and jumps you to Session A.
            </p>
          </div>

          {acked ? (
            <p
              data-ack-state
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-lime"
            >
              <span aria-hidden="true">✓</span> Read
            </p>
          ) : (
            <button
              type="button"
              onClick={onAcknowledge}
              data-ack
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-chalk px-5 text-sm font-semibold text-white transition-colors hover:bg-[#2b3138]"
            >
              I've read this — take me to Session A
              <ArrowRightIcon />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
