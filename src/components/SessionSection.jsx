import { useTracker } from "../state/TrackerContext.jsx";
import { toneOf } from "../lib/tones.js";
import { Chip } from "./ui.jsx";
import ExerciseCard from "./ExerciseCard.jsx";

export default function SessionSection({ session, onOpenDetails }) {
  const { stats, resetSession } = useTracker();
  const progress = stats.perSession[session.letter] || { done: 0, total: 0, pct: 0 };
  const tone = toneOf(session.accent);
  const isPriority = session.letter === "C";

  return (
    <section id={session.id} className="pt-8 sm:pt-12" data-session={session.letter}>
      <div className="border-b border-line pb-4">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${tone.dot}`} aria-hidden="true" />
          <p className="eyebrow">
            Session {session.letter} · {session.label}
          </p>
        </div>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h2 className="text-[1.6rem] font-bold leading-tight sm:text-[2rem]">{session.title}</h2>
            <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-dim">{session.description}</p>
          </div>

          <div className="flex shrink-0 flex-row items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
            <Chip
              className={isPriority ? "border-lime/30 bg-lime/5 text-lime" : ""}
            >
              {session.duration}
            </Chip>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-panel-3 sm:w-24">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${tone.bar}`}
                  style={{ width: `${progress.pct}%` }}
                  data-progress-bar
                />
              </div>
              <span
                className={`font-mono text-[11px] tabular-nums ${
                  progress.pct === 100 ? "text-lime" : "text-mute"
                }`}
                data-progress-text
                aria-live="polite"
              >
                {progress.done} / {progress.total}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-lg bg-panel-2 px-3.5 py-2.5">
        <p className="text-[12.5px] leading-relaxed text-soft">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute">Warm-up</span>
          {"  "}
          {session.warmup}
        </p>
      </div>

      <div className="mt-3 space-y-2.5">
        {session.exercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            index={index}
            onOpenDetails={onOpenDetails}
          />
        ))}
      </div>

      {session.note ? (
        <div className="mt-3 rounded-lg border border-line px-3.5 py-2.5">
          <p className="text-[12.5px] leading-relaxed text-soft">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mute">Running long?</span>
            {"  "}
            {session.note}
          </p>
        </div>
      ) : null}

      <div className="mt-3 flex flex-col gap-2 rounded-lg bg-panel-2 px-3.5 py-2.5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12.5px] leading-relaxed text-soft">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute">Cool-down</span>
          {"  "}
          {session.cooldown}
        </p>
        <button
          type="button"
          onClick={() => resetSession(session.letter)}
          className="no-print self-start rounded-md border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-mute transition-colors hover:border-ember/50 hover:text-ember sm:self-auto"
        >
          Reset {session.letter}
        </button>
      </div>
    </section>
  );
}
