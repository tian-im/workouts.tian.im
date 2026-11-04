import { CloseIcon, PauseIcon, PlayIcon } from "./icons.jsx";
import { formatClock } from "../lib/rest.js";

export default function RestTimer({ timer, onPause, onResume, onAdd, onStop }) {
  if (!timer) return null;

  const { remaining, total, running, finished, label } = timer;
  const pct = total ? Math.max(0, Math.min(100, (remaining / total) * 100)) : 0;

  return (
    <div
      className="rest-timer no-print"
      data-finished={finished ? "true" : "false"}
      role="timer"
      aria-live={finished ? "assertive" : "off"}
    >
      <div className="h-1 w-full overflow-hidden rounded-full bg-panel-3">
        <div
          className="h-full rounded-full bg-lime transition-[width] duration-200"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow">{finished ? "Rest over" : "Rest"}</p>
          <p className="truncate text-[12px] text-mute">{label}</p>
        </div>

        <p className="font-display text-2xl font-bold tabular-nums leading-none">
          {formatClock(remaining)}
        </p>

        <div className="flex shrink-0 items-center gap-1.5">
          {finished ? (
            <button type="button" onClick={onStop} className="rest-button rest-button-solid">
              Done
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={running ? onPause : onResume}
                className="rest-button"
                aria-label={running ? "Pause rest timer" : "Resume rest timer"}
              >
                {running ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                type="button"
                onClick={() => onAdd(30)}
                className="rest-button font-mono text-[11px]"
                aria-label="Add 30 seconds"
              >
                +30s
              </button>
              <button
                type="button"
                onClick={onStop}
                className="rest-button"
                aria-label="Stop rest timer"
              >
                <CloseIcon size={13} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
