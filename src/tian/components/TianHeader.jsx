import { DAYS } from "../data/program.js";
import { weekStats } from "../lib/progress.js";
import { usePlan } from "../state/PlanContext.jsx";
import { MenuIcon, PlayIcon, PrintIcon } from "../../components/icons.jsx";
import { jumpTo } from "../../lib/nav.js";

export default function TianHeader({ target, started, onStart, onOpenContents, onPrint }) {
  const { state } = usePlan();
  const day = DAYS.find((entry) => entry.id === state.day) ?? DAYS[0];
  const label = started ?? target;

  return (
    <header className="no-print sticky top-0 z-30 border-b border-line bg-void/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-3 py-2 sm:px-6">
        <a
          href="#tian-hero"
          onClick={(event) => {
            event.preventDefault();
            jumpTo("tian-hero");
          }}
          className="flex shrink-0 items-center gap-2"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-chalk text-[13px] font-bold text-white">
            T
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-mute min-[420px]:inline">
            tian · 5 分钟
          </span>
        </a>

        <div className="min-w-0 flex-1 text-center">
          <p className="truncate font-mono text-[10px] uppercase tracking-wider text-mute">
            第 {state.week} 周 · {state.day === "L" ? "周末长块" : day.weekday}
          </p>
        </div>

        {label ? (
          <button
            type="button"
            onClick={onStart}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-chalk px-3 text-[12px] font-semibold text-white"
          >
            <PlayIcon size={11} />
            {started ? "继续" : "开始"}这块
          </button>
        ) : (
          <span className="shrink-0 rounded-lg border border-line px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-lime">
            今日完成
          </span>
        )}

        <button
          type="button"
          onClick={onOpenContents}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-dim"
          aria-label="目录"
        >
          <MenuIcon size={14} />
        </button>
        <button
          type="button"
          onClick={onPrint}
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-dim sm:inline-flex"
          aria-label="打印"
        >
          <PrintIcon size={13} />
        </button>
      </div>

      <div className="h-0.5 w-full bg-panel-3">
        <div
          className="h-full bg-lime transition-[width] duration-300"
          style={{ width: `${weekStats(state.done, state.week, DAYS).pct}%` }}
        />
      </div>
    </header>
  );
}
