import { SESSIONS } from "../data/plan.js";
import { useTracker } from "../state/TrackerContext.jsx";
import { jumpTo } from "../lib/nav.js";
import { toneOf } from "../lib/tones.js";
import { Chip } from "../components/ui.jsx";

export default function Progress({ progressLabel }) {
  const { stats } = useTracker();

  return (
    <section id="progress" className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 sm:pt-14">
      <div className="flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Progress</p>
          <h2 className="mt-2 text-[1.5rem] font-bold leading-tight sm:text-[1.85rem]">
            This rotation, at a glance
          </h2>
          <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-dim">
            Filled dots come from the session cards below. Nothing syncs anywhere — it lives in this
            browser.
          </p>
        </div>
        <Chip className="shrink-0 self-start font-mono sm:self-auto" data-week-label>
          {progressLabel}
        </Chip>
      </div>

      <div className="mt-4 card divide-y divide-line">
        {SESSIONS.map((session) => {
          const progress = stats.perSession[session.letter] || { done: 0, total: 0, pct: 0 };
          return (
            <a
              key={session.id}
              href={`#${session.id}`}
              onClick={(event) => {
                event.preventDefault();
                jumpTo(session.id);
              }}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-panel-2 sm:px-5"
            >
              <span className={`h-2 w-2 shrink-0 rounded-full ${toneOf(session.accent).dot}`} />
              <span className="w-6 shrink-0 font-mono text-[11px] text-mute">{session.letter}</span>
              <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                {session.tocLabel}
              </span>
              <span className="h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-panel-3 sm:w-28">
                <span
                  className={`block h-full rounded-full transition-all duration-300 ${toneOf(session.accent).bar}`}
                  style={{ width: `${progress.pct}%` }}
                />
              </span>
              <span
                className={`w-12 shrink-0 text-right font-mono text-[11px] tabular-nums ${
                  progress.pct === 100 ? "text-lime" : "text-mute"
                }`}
              >
                {progress.done} / {progress.total}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
