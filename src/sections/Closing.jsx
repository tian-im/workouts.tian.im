import { Card } from "../components/ui.jsx";

export default function Closing({ progressLabel, onPrint, onResetAll }) {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 sm:pb-16">
      <Card className="overflow-hidden">
        <div className="border-b border-line bg-[radial-gradient(120%_120%_at_0%_0%,rgba(216,255,71,0.3),transparent_60%)] px-4 py-6 sm:px-8 sm:py-8">
          <p className="eyebrow">One last thing</p>
          <p className="mt-2.5 max-w-2xl font-display text-[1.35rem] font-bold leading-snug sm:text-[1.7rem]">
            The plan is boring on purpose. Same lifts, slightly heavier, three to five times a week.
          </p>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-soft">
            Don't add exercises. Don't change programs in three weeks. Log your sets, add weight when
            the rule says so, eat enough, sleep. That's it — and in six months your back will be the
            proof.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-mute">— Tian</p>
        </div>

        <div className="flex flex-col gap-3 bg-panel px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-[12px] text-mute">
            Sets are saved in this browser. <span className="text-fog">{progressLabel}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrint}
              className="no-print inline-flex h-9 items-center rounded-lg border border-line px-3 text-[11px] font-medium text-dim transition-colors hover:border-faint hover:text-chalk"
            >
              Print / PDF
            </button>
            <button
              type="button"
              onClick={onResetAll}
              className="no-print inline-flex h-9 items-center rounded-lg border border-line px-3 text-[11px] font-medium text-dim transition-colors hover:border-ember/50 hover:text-ember"
            >
              Reset everything
            </button>
          </div>
        </div>
      </Card>
    </section>
  );
}
