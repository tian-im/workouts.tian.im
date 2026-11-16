import { Card, Chip } from "../../components/ui.jsx";
import { ArrowDownIcon } from "../../components/icons.jsx";
import { jumpTo } from "../../lib/nav.js";
import { usePlan } from "../state/PlanContext.jsx";
import { DAYS, weekOf } from "../data/program.js";
import { weekStats } from "../lib/progress.js";

export default function Hero() {
  const { state, stats } = usePlan();
  const week = weekOf(state.week);
  const weekDone = weekStats(state.done, week.n, DAYS);

  return (
    <section id="tian-hero" className="relative overflow-hidden">
      <div className="page-grid pointer-events-none absolute inset-x-0 top-0 h-[420px]" />

      <div className="relative mx-auto max-w-5xl px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-14">
        <p className="eyebrow">Work in progress · 5 分钟一块</p>

        <h1 className="mt-3 max-w-3xl text-[2.1rem] font-extrabold leading-[1.06] tracking-tight sm:text-[3.1rem]">
          不用换衣服，不用一小时。
          <span className="marker mt-1 block w-fit">每工作 30 分钟，起来做 5 分钟。</span>
        </h1>

        <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-soft sm:text-[15px]">
          房车、两个 10 kg 哑铃、一件 10 kg 背心、一根弹力带。目标不是练成健身房的身材，
          是在路上不掉力量，并且把踝、膝、髋练到能接住第 9 周开始的弹跳训练。
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => jumpTo("tian-today")}
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-chalk px-4 text-[13px] font-semibold text-white"
          >
            今天的清单
            <ArrowDownIcon />
          </button>
          <button
            type="button"
            onClick={() => jumpTo("tian-method")}
            className="inline-flex h-11 items-center rounded-lg border border-line px-4 text-[13px] font-medium text-dim"
          >
            为什么 5 分钟有用
          </button>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Card className="p-3.5">
            <p className="eyebrow text-[10px]">当前</p>
            <p className="mt-1 font-display text-[1.3rem] font-bold leading-none">第 {week.n} 周</p>
            <p className="mt-1 text-[11px] text-mute">{week.phase} · {week.focus}</p>
          </Card>
          <Card className="p-3.5">
            <p className="eyebrow text-[10px]">本周块数</p>
            <p className="mt-1 font-display text-[1.3rem] font-bold leading-none">
              {weekDone.finished}
              <span className="text-[12px] font-normal text-mute"> / {weekDone.total}</span>
            </p>
            <p className="mt-1 text-[11px] text-mute">5 天 · 每天 6 块</p>
          </Card>
          <Card className="p-3.5">
            <p className="eyebrow text-[10px]">已记录</p>
            <p className="mt-1 font-display text-[1.3rem] font-bold leading-none">{stats.sets}</p>
            <p className="mt-1 text-[11px] text-mute">组</p>
          </Card>
          <Card className="p-3.5">
            <p className="eyebrow text-[10px]">最长一次</p>
            <p className="mt-1 font-display text-[1.3rem] font-bold leading-none">5:00</p>
            <p className="mt-1 text-[11px] text-mute">周末 20–30 分钟</p>
          </Card>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <Chip>无跳跃（第 1–8 周）</Chip>
          <Chip>主项 RIR 2</Chip>
          <Chip>孤立动作不到力竭</Chip>
          <Chip>每周 1 天完全休息</Chip>
        </div>
      </div>
    </section>
  );
}
