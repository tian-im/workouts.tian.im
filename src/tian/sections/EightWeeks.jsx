import { exerciseOf } from "../data/exercises.js";
import { WEEKS, weekOf } from "../data/program.js";
import { usePlan } from "../state/PlanContext.jsx";
import { Card, Chip, Section, SectionHead } from "../../components/ui.jsx";

export default function EightWeeks() {
  const { state, setWeek } = usePlan();
  const current = weekOf(state.week);

  return (
    <Section id="tian-weeks">
      <SectionHead
        eyebrow="8 周"
        title="每一周只改一个变量"
        lead="周 1–2 学动作，周 3–6 加重量，周 7 减量，周 8 测试。中途旅行、换营地都不影响 —— 周次手动切换，落后一周就往后顺延。"
        actions={<Chip>当前第 {current.n} 周</Chip>}
      />

      <div className="mt-6 overflow-hidden rounded-xl border border-line bg-panel">
        <table className="tian-table w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-panel-2/70">
              <th className="px-3 py-2.5 font-mono text-[10px] uppercase tracking-wider text-mute">周</th>
              <th className="px-3 py-2.5 font-mono text-[10px] uppercase tracking-wider text-mute">阶段</th>
              <th className="px-3 py-2.5 font-mono text-[10px] uppercase tracking-wider text-mute">每组</th>
              <th className="px-2 py-2.5 font-mono text-[10px] uppercase tracking-wider text-mute">RIR</th>
              <th className="hidden px-3 py-2.5 font-mono text-[10px] uppercase tracking-wider text-mute sm:table-cell">
                长块主项
              </th>
            </tr>
          </thead>
          <tbody>
            {WEEKS.map((week) => (
              <tr
                key={week.n}
                className="border-b border-line/70 last:border-0"
                data-current={week.n === state.week ? "true" : "false"}
              >
                <td className="px-3 py-2.5">
                  <button
                    type="button"
                    onClick={() => setWeek(week.n)}
                    className="font-mono text-[12px] font-semibold text-chalk underline decoration-line underline-offset-4"
                  >
                    {week.n}
                  </button>
                </td>
                <td className="px-3 py-2.5 text-[12px] font-semibold text-soft">{week.phase}</td>
                <td className="px-3 py-2.5 font-mono text-[11px] text-dim">{week.sets}</td>
                <td className="px-2 py-2.5 font-mono text-[11px] text-dim">{week.rir}</td>
                <td className="hidden px-3 py-2.5 text-[11px] text-mute sm:table-cell">
                  {week.long ? exerciseOf(week.long).name : "测试周"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {WEEKS.map((week) => (
          <Card
            key={week.n}
            className={`p-3.5 ${week.n === state.week ? "ring-2 ring-lime/40" : ""}`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[13px] font-bold text-chalk">
                第 {week.n} 周 · {week.phase}
              </p>
              <span className="font-mono text-[10px] uppercase tracking-wider text-mute">{week.focus}</span>
            </div>
            <p className="mt-1 text-[12px] leading-relaxed text-soft">{week.note}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
