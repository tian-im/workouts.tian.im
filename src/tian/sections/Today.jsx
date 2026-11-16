import { exerciseOf } from "../data/exercises.js";
import { BLOCK_SECONDS, DAYS, TEST_WEEK_PLAN, weekOf } from "../data/program.js";
import { blockStats, keyFor, rirFor, setsFor } from "../lib/progress.js";
import { visibleBlocks } from "../lib/today.js";
import { formatClock } from "../../lib/rest.js";
import { jumpTo } from "../../lib/nav.js";
import { usePlan } from "../state/PlanContext.jsx";
import { Callout, Card, Chip, Section, SectionHead } from "../../components/ui.jsx";
import { ArrowRightIcon } from "../../components/icons.jsx";

export default function Today({ onStart, onGoLong }) {
  const { state, setWeek, setDay } = usePlan();
  const week = weekOf(state.week);
  const day = DAYS.find((entry) => entry.id === state.day) ?? DAYS[0];
  const blocks = visibleBlocks(day, week);

  const keyOf = (block) => keyFor(week.n, day.id, block.id);
  const isDone = (block) => Boolean(state.done[keyOf(block)]?.finishedAt);
  const isStarted = (block) => {
    const saved = state.clocks[keyOf(block)];
    return typeof saved === "number" && saved > 0;
  };

  const required = blocks.filter((block) => !block.optional);
  const nextBlock = required.find((block) => !isDone(block));
  const startedBlock = required.find(isStarted);
  const target = startedBlock ?? nextBlock;
  const targetIndex = target ? blocks.indexOf(target) : -1;
  const dayStats = blockStats(state.done, week.n, day.id, blocks);

  return (
    <Section id="tian-today">
      <SectionHead
        eyebrow={`第 ${week.n} 周 · ${week.phase}`}
        title={state.day === "L" ? "周末长块" : `${day.weekday} · ${day.label}`}
        lead={
          state.day === "L"
            ? "今天不按 5 分钟块走。20–30 分钟一次做完，只有这里允许把重量推到接近极限。"
            : `${day.summary}。一键开始下一块，计时 5 分钟，完成自动记下。`
        }
        actions={<WeekSwitch week={week} onChange={setWeek} />}
      />

      <div className="mt-5 flex flex-wrap gap-1.5">
        {DAYS.map((entry) => {
          const dayDone = blockStats(state.done, week.n, entry.id, visibleBlocks(entry, week));
          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => setDay(entry.id)}
              aria-current={state.day === entry.id ? "true" : "false"}
              className="tian-tab"
              data-complete={dayDone.pct === 100 ? "true" : "false"}
            >
              <span className="font-mono text-[10px] text-faint">{entry.weekday.slice(1)}</span>
              <span className="font-semibold">{entry.letter}</span>
              <span className="hidden text-[11px] text-mute sm:inline">{entry.label}</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setDay("L")}
          aria-current={state.day === "L" ? "true" : "false"}
          className="tian-tab"
        >
          <span className="font-mono text-[10px] text-faint">周末</span>
          <span className="font-semibold">长块</span>
        </button>
      </div>

      {week.n === 8 ? (
        <Callout tone="ember" className="mt-4 p-4 sm:p-5">
          <p className="eyebrow">第 8 周 · 测试周</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-soft">
            {TEST_WEEK_PLAN.find((row) => row.day === day.weekday)?.work ??
              "周末只做恢复。测试安排在周二和周四。"}
            。测试当天不做其他训练。
          </p>
          <a
            href="#tian-test"
            onClick={(event) => {
              event.preventDefault();
              jumpTo("tian-test");
            }}
            className="mt-2 inline-flex min-h-11 items-center text-[13px] font-semibold text-lime"
          >
            看 5 项测试和达标线 →
          </a>
        </Callout>
      ) : null}

      {state.day === "L" ? (
        <Card className="mt-4 p-4 sm:p-5">
          <p className="text-[14px] leading-relaxed text-soft">
            长块有独立的记录表和流程，包含热身、5×5 主项、两个辅项和收尾。
          </p>
          <button
            type="button"
            onClick={onGoLong}
            className="mt-3 inline-flex h-11 items-center gap-2 rounded-lg bg-chalk px-4 text-[13px] font-semibold text-white"
          >
            打开长块 <ArrowRightIcon />
          </button>
        </Card>
      ) : (
        <>
          <StartCard
            target={target}
            targetIndex={targetIndex}
            remaining={target ? state.clocks[keyOf(target)] : 0}
            resumed={Boolean(startedBlock)}
            complete={!nextBlock}
            dayStats={dayStats}
            onStart={() => (target ? onStart(day, target) : onStart(day, null))}
            onGoLong={onGoLong}
            week={week}
          />

          <div className="mt-4 space-y-2">
            {blocks.map((block, index) => (
              <BlockRow
                key={block.id}
                block={block}
                index={index}
                week={week}
                done={isDone(block)}
                started={isStarted(block)}
                saved={state.clocks[keyOf(block)]}
                highlighted={target?.id === block.id}
                sets={state.done[keyOf(block)]?.sets ?? []}
                onStart={() => onStart(day, block)}
              />
            ))}
          </div>

          <p className="mt-3 text-[11px] leading-relaxed text-faint">
            块 7 和块 8 是可选的。只有 5 分钟又很累的日子，做块 1 + 块 2 就算完成今天。
          </p>
        </>
      )}
    </Section>
  );
}

function WeekSwitch({ week, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(week.n - 1)}
        disabled={week.n <= 1}
        className="tian-step"
        aria-label="上一周"
      >
        −
      </button>
      <div className="min-w-[5.5rem] text-center">
        <p className="font-display text-[15px] font-bold leading-none">第 {week.n} 周</p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-mute">{week.focus}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(week.n + 1)}
        disabled={week.n >= 8}
        className="tian-step"
        aria-label="下一周"
      >
        +
      </button>
    </div>
  );
}

function StartCard({ target, targetIndex, remaining, resumed, complete, dayStats, onStart, onGoLong, week }) {
  if (complete) {
    return (
      <Card className="mt-4 overflow-hidden">
        <div className="bg-[radial-gradient(120%_120%_at_0%_0%,rgba(216,255,71,0.35),transparent_60%)] p-4 sm:p-5">
          <p className="eyebrow">今天完成</p>
          <p className="mt-1.5 font-display text-[1.35rem] font-bold leading-tight">
            {dayStats.finished} 个块都记完了
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-soft">
            多出来的 5 分钟做块 7 或块 8，或者干脆去走一走。明天还有一块下肢。
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip>本周 {week.n}/8</Chip>
            <Chip>已记录 {dayStats.finished} 块</Chip>
          </div>
        </div>
      </Card>
    );
  }

  const resuming = resumed || (remaining > 0 && remaining < BLOCK_SECONDS);

  return (
    <Card className="mt-4 overflow-hidden">
      <div className="bg-[radial-gradient(120%_120%_at_0%_0%,rgba(216,255,71,0.32),transparent_62%)] p-4 sm:p-5">
        <p className="eyebrow">{resuming ? "上次停在这里" : "现在有 5 分钟？"}</p>
        <p className="mt-1.5 font-display text-[1.35rem] font-bold leading-tight">
          第 {targetIndex + 1} 块 · {target.label}
        </p>
        <p className="mt-1 font-mono text-[11px] text-soft">
          {target.kind === "mobility"
            ? target.steps.map((step) => exerciseOf(step.exercise).name).join(" + ")
            : `${exerciseOf(target.exercise).name} · ${setsFor(target, week.sets)} × ${target.reps}`}
        </p>

        <button
          type="button"
          onClick={onStart}
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-chalk text-[14px] font-semibold text-white"
        >
          {resuming ? `继续 · 剩 ${formatClock(remaining)}` : "开始这一块"}
          <ArrowRightIcon />
        </button>

        <div className="mt-3 flex items-center justify-between text-[11px] text-mute">
          <span>
            已完成 {dayStats.finished}/{dayStats.total} 块
          </span>
          <button type="button" onClick={onGoLong} className="font-semibold text-ice underline underline-offset-4">
            周末长块 →
          </button>
        </div>
      </div>
    </Card>
  );
}

function BlockRow({ block, index, week, done, started, saved, highlighted, sets, onStart }) {
  const exercise = block.kind === "strength" ? exerciseOf(block.exercise) : null;
  const logged = Array.isArray(sets) ? sets.filter((set) => set?.reps).length : 0;
  const target = setsFor(block, week.sets);

  return (
    <div
      className="tian-block"
      data-state={done ? "done" : started ? "started" : block.optional ? "optional" : "idle"}
      data-highlighted={highlighted ? "true" : "false"}
    >
      <span className="font-mono text-[11px] text-faint max-[400px]:hidden">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-semibold leading-snug text-chalk">
          <span className="mr-1.5 font-mono text-[11px] font-normal text-faint min-[400px]:hidden">
            {String(index + 1).padStart(2, "0")}
          </span>
          {block.label}
          {block.optional ? <span className="ml-1.5 font-mono text-[10px] text-faint">可选</span> : null}
        </p>
        <p className="mt-0.5 font-mono text-[11px] leading-relaxed text-mute">
          {exercise
            ? `${exercise.name} · ${target} × ${block.reps}${rirFor(block, week) ? ` · RIR ${rirFor(block, week)}` : ""}`
            : block.steps.map((step) => `${exerciseOf(step.exercise).name} ${step.prescription}`).join(" · ")}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {done ? (
          <span className="font-mono text-[10px] uppercase tracking-wider text-lime">完成</span>
        ) : started ? (
          <span className="font-mono text-[10px] uppercase tracking-wider text-ember">
            {formatClock(saved ?? 0)}
          </span>
        ) : logged > 0 ? (
          <span className="font-mono text-[10px] text-mute">
            {logged}/{target || "—"}
          </span>
        ) : null}
        <button
          type="button"
          onClick={onStart}
          className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-line px-2.5 text-[12px] font-semibold text-dim transition-colors hover:border-faint hover:text-chalk"
        >
          {done ? "重做" : started ? "继续" : "开始"}
        </button>
      </div>
    </div>
  );
}
