import { SESSIONS } from "../data/plan.js";
import { useTracker } from "../state/TrackerContext.jsx";
import { jumpTo } from "../lib/nav.js";
import { toneOf } from "../lib/tones.js";
import { MenuIcon } from "./icons.jsx";

export default function StickyBar({ active, onOpenContents, onResetAll, progressLabel }) {
  const { stats } = useTracker();

  return (
    <div
      id="session-nav"
      className="sticky top-0 z-30 border-y border-line bg-void/92 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-1.5 px-2 py-1.5 sm:gap-2 sm:px-6">
        <button
          type="button"
          onClick={onOpenContents}
          data-toc-open
          aria-haspopup="dialog"
          className="no-print inline-flex h-10 items-center gap-1.5 rounded-lg px-2 text-[12px] font-semibold text-dim transition-colors hover:bg-panel-2 hover:text-chalk sm:px-3"
        >
          <MenuIcon />
          <span className="hidden sm:inline">Contents</span>
          <span className="sr-only sm:hidden">Contents</span>
        </button>

        <div className="h-5 w-px shrink-0 bg-line" aria-hidden="true" />

        <div className="flex flex-1 gap-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SESSIONS.map((session) => {
            const complete = stats.perSession[session.letter]?.pct === 100;
            return (
              <a
                key={session.id}
                href={`#${session.id}`}
                className="day-tab"
                data-tab={session.id}
                data-complete={complete ? "true" : "false"}
                aria-current={active === session.id ? "true" : "false"}
                onClick={(event) => {
                  event.preventDefault();
                  jumpTo(session.id);
                }}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${toneOf(session.accent).dot}`} aria-hidden="true" />
                <span className="tab-label">{session.letter}</span>
                <span className="hidden sm:inline">· {session.tocLabel}</span>
              </a>
            );
          })}
        </div>

        <div className="no-print flex shrink-0 items-center gap-2 border-l border-line pl-2">
          <span className="hidden font-mono text-[11px] text-mute sm:inline" data-week-label>
            {progressLabel}
          </span>
          <button
            type="button"
            onClick={onResetAll}
            className="inline-flex h-8 items-center rounded-md border border-line px-2 font-mono text-[10px] uppercase tracking-wider text-mute transition-colors hover:border-ember/50 hover:text-ember"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
