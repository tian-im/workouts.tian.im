import { useState } from "react";
import { exerciseOf } from "../data/exercises.js";
import { LONG_BLOCK, weekOf } from "../data/program.js";
import { keyFor } from "../lib/progress.js";
import { youtubeSearch } from "../../lib/links.js";
import { usePlan } from "../state/PlanContext.jsx";
import { useRestTimer } from "../../hooks/useRestTimer.js";
import RestTimer from "../../components/RestTimer.jsx";
import { BulletList, Callout, Card, Chip, Section, SectionHead } from "../../components/ui.jsx";
import { CheckIcon, ClockIcon, ExternalIcon } from "../../components/icons.jsx";

export default function LongBlock() {
  const { state, logSet, unlogSet } = usePlan();
  const week = weekOf(state.week);
  const rest = useRestTimer();

  const mainId = week.long;
  const main = mainId ? exerciseOf(mainId) : null;
  const accessories = mainId ? LONG_BLOCK.accessories[mainId] ?? [] : [];
  const mainSets = week.n === 7 ? 3 : LONG_BLOCK.main.sets;

  return (
    <Section id="tian-long" band>
      <SectionHead
        eyebrow="周末 · 20–30 分钟"
        title="长块"
        lead={LONG_BLOCK.summary}
        actions={<Chip>第 {week.n} 周 · {week.phase}</Chip>}
      />

      {mainId ? (
        <div className="mt-6 space-y-3">
          <Card className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow">① 热身 · 3 分钟</p>
                <p className="mt-1 font-display text-[15px] font-semibold">先把踝和髋打开</p>
              </div>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[11px] text-soft">
              {LONG_BLOCK.warmup.map((step) => (
                <span key={step.exercise}>
                  {exerciseOf(step.exercise).name} · {step.prescription}
                </span>
              ))}
            </div>
          </Card>

          <Card className="p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="eyebrow">② 主项 · {mainSets}×5 · 唯一允许接近极限的地方</p>
                <a
                  href={youtubeSearch(main.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 font-display text-[17px] font-bold leading-tight underline decoration-line underline-offset-4"
                >
                  {main.name}
                  <ExternalIcon />
                </a>
                <p className="mt-0.5 text-[12px] text-mute">
                  {main.zh} · {main.setup}
                </p>
              </div>
              <button
                type="button"
                onClick={() => rest.start(LONG_BLOCK.main.rest, `${main.name} 组间休息`)}
                className="rest-trigger no-print min-h-11"
              >
                <ClockIcon /> 休息 2 分钟
              </button>
            </div>

            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-mute">
              <span className="text-chalk">{mainSets} × 5/腿</span>
              <span>RIR {LONG_BLOCK.main.rir}</span>
              <span>{LONG_BLOCK.main.tempo}</span>
              <span>组间 120 秒</span>
            </p>

            <SetTracker
              storageKey={keyFor(week.n, "L", "main")}
              exerciseId={mainId}
              count={mainSets}
              unit={unitLabel(main)}
              perSide={main.perSide}
              onLog={logSet}
              onUnlog={unlogSet}
            />
          </Card>

          <Card className="p-4 sm:p-5">
            <p className="eyebrow">③ 辅项 · 各 2 组</p>
            <div className="mt-3 space-y-4">
              {accessories.map((accessory, index) => {
                const exercise = exerciseOf(accessory.exercise);
                return (
                  <div key={accessory.exercise}>
                    <a
                      href={youtubeSearch(exercise.name)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-chalk underline decoration-line underline-offset-4"
                    >
                      {exercise.name}
                      <ExternalIcon />
                    </a>
                    <p className="mt-0.5 text-[12px] text-mute">
                      {accessory.prescription} · 休息 60 秒 · {exercise.setup}
                    </p>
                    <SetTracker
                      storageKey={keyFor(week.n, "L", `acc${index + 1}`)}
                      exerciseId={accessory.exercise}
                      count={LONG_BLOCK.accessorySets}
                      unit={unitLabel(exercise)}
                      perSide={exercise.perSide}
                      onLog={logSet}
                      onUnlog={unlogSet}
                    />
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-4 sm:p-5">
            <p className="eyebrow">④ 收尾 · 2 分钟</p>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[11px] text-soft">
              {LONG_BLOCK.cooldown.map((step) => (
                <span key={step.exercise}>
                  {exerciseOf(step.exercise).name} · {step.prescription}
                </span>
              ))}
            </div>
          </Card>

          <Callout tone="plain" className="p-4">
            <BulletList
              items={[
                "主项按周轮换：第 1–2 周 Split Squat，第 3–4 周 Step-Up，第 5–6 周单腿硬拉，第 7 周回到 Split Squat。",
                "5 组全部 5 次都干净（RIR 2）→ 下次加 2 kg/手。只要有一组变形，重量保持不变。",
                "没有稳固台阶时，Step-Up 换成 Hip Thrust，组数次数不变。",
              ]}
            />
          </Callout>
        </div>
      ) : (
        <Callout className="mt-6 p-4 sm:p-5">
          <p className="font-display text-[15px] font-bold">第 8 周没有长块</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-soft">
            这一周的周末留给测试和恢复。测试安排在周二和周四，具体看
            <a href="#tian-test" className="font-semibold text-lime underline underline-offset-4"> 第 8 周测试</a>。
          </p>
        </Callout>
      )}

      <RestTimer
        timer={rest.timer}
        onPause={rest.pause}
        onResume={rest.resume}
        onAdd={rest.addTime}
        onStop={rest.stop}
      />
    </Section>
  );
}

function unitLabel(exercise) {
  if (!exercise.perSide) return exercise.unit;
  return `${exercise.unit}/${exercise.perSide}`;
}

function SetTracker({ storageKey, exerciseId, count, unit, perSide, onLog, onUnlog }) {
  const { state } = usePlan();
  const entry = state.done[storageKey];
  const sets = entry?.sets ?? [];

  return (
    <div className="mt-3 space-y-2">
      {Array.from({ length: count }, (_, index) => {
        const set = sets[index];
        const done = Boolean(set?.reps);
        const defaultLoad = set?.load ?? state.loads?.[exerciseId] ?? "";
        return (
          <div key={index} className="tian-set-row" data-done={done ? "true" : "false"}>
            <span className="font-mono text-[11px] text-faint">第 {index + 1} 组</span>
            <SetRowInputs
              storageKey={storageKey}
              index={index}
              unit={unit}
              load={defaultLoad}
              reps={set?.reps ?? ""}
              done={done}
              exerciseId={exerciseId}
              perSide={perSide}
              onLog={onLog}
              onUnlog={onUnlog}
            />
          </div>
        );
      })}
    </div>
  );
}

function SetRowInputs({ storageKey, index, unit, load, reps, done, exerciseId, onLog, onUnlog }) {
  const [draft, setDraft] = useState({ reps, load });

  return (
    <>
      <input
        className="weight-input"
        type="number"
        inputMode="numeric"
        min="0"
        aria-label={`第 ${index + 1} 组 ${unit}`}
        placeholder={unit === "秒" ? "秒" : "次"}
        value={draft.reps}
        onChange={(event) => setDraft((prev) => ({ ...prev, reps: event.target.value }))}
      />
      <input
        className="weight-input"
        type="number"
        inputMode="decimal"
        min="0"
        step="0.5"
        aria-label={`第 ${index + 1} 组重量`}
        placeholder="kg"
        value={draft.load}
        onChange={(event) => setDraft((prev) => ({ ...prev, load: event.target.value }))}
      />
      <button
        type="button"
        className="set-dot"
        data-done={done ? "true" : "false"}
        aria-pressed={done}
        aria-label={done ? `取消第 ${index + 1} 组` : `记录第 ${index + 1} 组`}
        onClick={() => {
          if (done) {
            onUnlog(storageKey, index);
            return;
          }
          onLog(
            storageKey,
            index,
            { reps: Number(draft.reps) || 0, load: Number(draft.load) || 0 },
            exerciseId,
          );
        }}
      >
        <CheckIcon size={14} />
      </button>
    </>
  );
}
