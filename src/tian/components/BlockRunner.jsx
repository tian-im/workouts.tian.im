import { useEffect, useMemo, useRef, useState } from "react";
import { exerciseOf } from "../data/exercises.js";
import { BLOCK_SECONDS } from "../data/program.js";
import { rirFor, setsFor } from "../lib/progress.js";
import { formatClock } from "../../lib/rest.js";
import { youtubeSearch } from "../../lib/links.js";
import { usePlan } from "../state/PlanContext.jsx";
import { useBlockClock } from "../hooks/useBlockClock.js";
import { CheckIcon, CloseIcon, ExternalIcon, PauseIcon, PlayIcon } from "../../components/icons.jsx";

/**
 * 一个块的执行界面。整页覆盖，不是弹窗：5 分钟里只需要看清
 * 做什么、第几组、还剩多少时间。
 */
export default function BlockRunner({ blockKey, block, week, dayLabel, position, onExit }) {
  const { state, logSet, unlogSet, finishBlock, saveClock } = usePlan();
  const setCount = setsFor(block, week.sets);
  const entry = state.done[blockKey];
  const saved = state.clocks[blockKey];
  const resumed = typeof saved === "number" && saved > 0 && saved < BLOCK_SECONDS;
  const finishedRef = useRef(false);

  const clock = useBlockClock({
    initial: typeof saved === "number" && saved > 0 ? saved : BLOCK_SECONDS,
    autoStart: !resumed,
    onPersist: (remaining) => {
      if (!finishedRef.current) saveClock(blockKey, remaining);
    },
  });

  const exercise = block.kind === "strength" ? exerciseOf(block.exercise) : null;
  const [drafts, setDrafts] = useState(() =>
    Array.from({ length: Math.max(setCount, 1) }, (_, index) => ({
      reps: entry?.sets?.[index]?.reps ?? "",
      load: entry?.sets?.[index]?.load ?? (exercise ? state.loads?.[block.exercise] ?? "" : ""),
    })),
  );

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") pauseAndExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const logged = useMemo(
    () => Array.from({ length: setCount }, (_, index) => Boolean(entry?.sets?.[index]?.reps)),
    [entry, setCount],
  );
  const doneCount = logged.filter(Boolean).length;
  const finished = Boolean(entry?.finishedAt);

  const updateDraft = (index, field, value) => {
    setDrafts((prev) => prev.map((draft, i) => (i === index ? { ...draft, [field]: value } : draft)));
  };

  const toggleSet = (index) => {
    if (logged[index]) {
      unlogSet(blockKey, index);
      return;
    }
    const draft = drafts[index];
    logSet(
      blockKey,
      index,
      { reps: Number(draft.reps) || 0, load: Number(draft.load) || 0 },
      block.exercise,
    );
    if (block.rest) clock.startRest(block.rest);

    const next = drafts[index + 1];
    if (next && !next.load && draft.load) updateDraft(index + 1, "load", draft.load);
  };

  const pauseAndExit = () => {
    clock.pause();
    onExit();
  };

  const complete = () => {
    finishedRef.current = true;
    finishBlock(blockKey);
    onExit();
  };

  const pct = Math.max(0, Math.min(100, (clock.clock.remaining / BLOCK_SECONDS) * 100));

  return (
    <div className="tian-runner no-print" role="dialog" aria-modal="true" aria-label={block.label}>
      <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 pb-6 pt-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={pauseAndExit}
            className="detail-close"
            aria-label="暂停并返回"
          >
            <CloseIcon />
          </button>
          <div className="min-w-0 flex-1 text-center">
            <p className="eyebrow truncate">
              {dayLabel} · 第 {position} 块 · {block.slot}
            </p>
            <p className="font-display text-[15px] font-bold leading-tight">{block.label}</p>
          </div>
          <div className="w-9" aria-hidden="true" />
        </div>

        <div className="mt-4">
          <div className="flex items-end justify-between">
            <p className="tian-clock" data-finished={clock.clock.finished ? "true" : "false"}>
              {formatClock(clock.clock.remaining)}
            </p>
            <p className="pb-1.5 font-mono text-[11px] text-mute">
              {doneCount}/{setCount || "—"} 组
            </p>
          </div>
          <div className="tian-bar mt-1.5">
            <span style={{ width: `${pct}%` }} data-finished={clock.clock.finished ? "true" : "false"} />
          </div>
        </div>

        {clock.rest ? (
          <div className="tian-rest mt-3" data-done={clock.rest.remaining <= 0 ? "true" : "false"}>
            <span className="font-mono text-[11px] uppercase tracking-wider text-mute">休息</span>
            <span className="font-display text-lg font-bold tabular-nums">
              {formatClock(clock.rest.remaining)}
            </span>
            <button type="button" className="ml-auto text-[12px] font-semibold text-lime" onClick={clock.skipRest}>
              {clock.rest.remaining > 0 ? "下一组" : "好"}
            </button>
          </div>
        ) : null}

        <div className="mt-4 flex-1">
          {block.kind === "mobility" ? (
            <MobilitySteps block={block} blockKey={blockKey} logged={entry?.sets} onToggle={logSet} />
          ) : (
            <>
              <a
                href={youtubeSearch(exercise.name)}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="ex-title">{exercise.name}</p>
                  <p className="mt-0.5 text-[13px] text-soft">{exercise.zh}</p>
                </div>
                <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-ice">
                  看动作 <ExternalIcon />
                </span>
              </a>

              <p className="mt-2 text-[13px] leading-relaxed text-dim">{exercise.setup}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="chip chip-solid">
                  {setCount} × {block.reps}
                </span>
                {rirFor(block, week) ? <span className="chip">RIR {rirFor(block, week)}</span> : null}
                {block.tempo ? <span className="chip">{block.tempo}</span> : null}
                <span className="chip">{exercise.load}</span>
              </div>

              {block.alt ? (
                <p className="mt-3 rounded-lg bg-panel-2 px-3 py-2 text-[12px] leading-relaxed text-dim">
                  <strong className="font-semibold text-soft">替代：</strong>
                  {exerciseOf(block.alt.exercise)?.name} —— {block.alt.note}
                </p>
              ) : null}

              <div className="mt-4 space-y-2">
                {Array.from({ length: setCount }, (_, index) => (
                  <div key={index} className="tian-set-row" data-done={logged[index] ? "true" : "false"}>
                    <span className="font-mono text-[11px] text-faint">第 {index + 1} 组</span>
                    <label className="sr-only" htmlFor={`${blockKey}-reps-${index}`}>
                      次数
                    </label>
                    <input
                      id={`${blockKey}-reps-${index}`}
                      className="weight-input"
                      type="number"
                      inputMode="numeric"
                      min="0"
                      placeholder={exercise.unit === "秒" ? "秒" : "次"}
                      value={drafts[index]?.reps ?? ""}
                      onChange={(event) => updateDraft(index, "reps", event.target.value)}
                    />
                    <label className="sr-only" htmlFor={`${blockKey}-load-${index}`}>
                      重量 kg
                    </label>
                    <input
                      id={`${blockKey}-load-${index}`}
                      className="weight-input"
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.5"
                      placeholder="kg"
                      value={drafts[index]?.load ?? ""}
                      onChange={(event) => updateDraft(index, "load", event.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => toggleSet(index)}
                      aria-pressed={logged[index]}
                      aria-label={logged[index] ? `取消第 ${index + 1} 组` : `记录第 ${index + 1} 组`}
                      className="set-dot"
                      data-done={logged[index] ? "true" : "false"}
                    >
                      {logged[index] ? <CheckIcon size={14} /> : index + 1}
                    </button>
                  </div>
                ))}
              </div>

              <p className="mt-2 text-[11px] leading-relaxed text-faint">
                休息 {block.rest} 秒已经算在 5 分钟里。做不完就把这一块留到下一个 5 分钟 —— 计时会保留。
              </p>
            </>
          )}
        </div>

        <div className="mt-5 flex items-center gap-2">
          {clock.clock.running ? (
            <button
              type="button"
              onClick={clock.pause}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-line px-3.5 text-[13px] font-medium text-dim"
            >
              <PauseIcon size={13} /> 暂停
            </button>
          ) : (
            <button
              type="button"
              onClick={clock.resume}
              disabled={clock.clock.finished}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-line px-3.5 text-[13px] font-medium text-dim disabled:opacity-40"
            >
              <PlayIcon size={13} /> 继续
            </button>
          )}
          <button
            type="button"
            onClick={complete}
            className="h-11 flex-1 rounded-lg bg-chalk text-[13px] font-semibold text-white"
          >
            {finished ? "已完成 · 返回" : "完成这一块"}
          </button>
        </div>
      </div>
    </div>
  );
}

function MobilitySteps({ block, blockKey, logged, onToggle }) {
  return (
    <div className="space-y-2">
      {block.steps.map((step, index) => {
        const exercise = exerciseOf(step.exercise);
        const done = Boolean(logged?.[index]?.reps);
        return (
          <div key={step.exercise} className="tian-set-row" data-done={done ? "true" : "false"}>
            <div className="min-w-0 flex-1">
              <a
                href={youtubeSearch(exercise.name)}
                target="_blank"
                rel="noreferrer"
                className="text-[14px] font-semibold text-chalk underline decoration-line underline-offset-4"
              >
                {exercise.name}
              </a>
              <p className="mt-0.5 text-[12px] leading-snug text-dim">{exercise.setup}</p>
            </div>
            <span className="shrink-0 font-mono text-[11px] text-soft">{step.prescription}</span>
            <button
              type="button"
              onClick={() => onToggle(blockKey, index, { reps: done ? 0 : 1, load: 0 })}
              aria-pressed={done}
              aria-label={`完成 ${exercise.name}`}
              className="set-dot"
              data-done={done ? "true" : "false"}
            >
              <CheckIcon size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
