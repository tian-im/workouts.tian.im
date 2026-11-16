import { TESTS, TEST_WEEK_PLAN } from "../data/program.js";
import { usePlan } from "../state/PlanContext.jsx";
import { Callout, Card, Section, SectionHead, Stat } from "../../components/ui.jsx";

const PASS = { splitSquat: 12, calfRaise: 25, stepDown: 5, plank: 90, balance: 20 };

export default function Test() {
  const { state, saveTest } = usePlan();
  const passed = TESTS.filter((test) => {
    const value = Number(state.tests[test.key]);
    return value > 0 && value >= PASS[test.key];
  }).length;

  return (
    <Section id="tian-test" band>
      <SectionHead
        eyebrow="第 8 周"
        title="测试：跳跃阶段的入场券"
        lead="5 项里过 3 项，就可以在第 9 周开始低强度跳跃。没过不是失败，说明还需要再补 2–4 周基础。"
      />

      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="已通过" value={passed} suffix="/ 5" accent={passed >= 3} />
        <Stat label="门槛" value="3" suffix="项" />
        <Stat label="测试日" value="周二" suffix="周四" />
        <Stat label="当天" value="不练" suffix="其他" />
      </div>

      <div className="mt-4 space-y-2">
        {TESTS.map((test) => {
          const raw = state.tests[test.key] ?? "";
          const value = Number(raw) || 0;
          const ok = value > 0 && value >= PASS[test.key];
          return (
            <Card key={test.id} className="p-4" data-pass={ok ? "true" : "false"}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-chalk">{test.name}</p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-soft">{test.setup}</p>
                  <p className="mt-1 font-mono text-[11px] text-mute">目标 {test.target}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <input
                    className="weight-input"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    aria-label={`${test.name} 记录值`}
                    placeholder={test.unit}
                    value={raw}
                    onChange={(event) => saveTest(test.key, event.target.value)}
                  />
                  <span
                    className={`w-11 text-center font-mono text-[10px] uppercase tracking-wider ${
                      ok ? "text-lime" : "text-faint"
                    }`}
                  >
                    {ok ? "达标" : value > 0 ? "待补" : "—"}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Callout className="mt-4 p-4 sm:p-5">
        <p className="eyebrow">测试周怎么排</p>
        <div className="mt-2 space-y-1.5">
          {TEST_WEEK_PLAN.map((row) => (
            <p key={row.day} className="text-[13px] leading-relaxed text-soft">
              <strong className="font-semibold text-chalk">{row.day}</strong> · {row.work}
            </p>
          ))}
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-mute">
          测试当天不做其他训练。任何一次动作变形就停，记录已经完成的次数 —— 变形之后的次数不算。
        </p>
      </Callout>
    </Section>
  );
}
