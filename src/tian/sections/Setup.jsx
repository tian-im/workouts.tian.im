import { Callout, Card, Section, SectionHead } from "../../components/ui.jsx";

export default function Setup() {
  return (
    <Section id="tian-setup">
      <SectionHead
        eyebrow="装备"
        title="两样东西，一个原则"
        lead="负荷有上限，所以动作选择必须绕开杠铃逻辑：能单腿的单腿，能慢的慢。"
      />

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <Card className="p-4 sm:p-5">
          <p className="eyebrow">清单</p>
          <ul className="mt-2 space-y-2 text-[13px] leading-relaxed text-soft">
            <li><strong className="font-semibold text-chalk">可调哑铃 ×2</strong> · 单只最多 10 kg，有 1 kg 和 2 kg 片</li>
            <li><strong className="font-semibold text-chalk">负重背心</strong> · 最多 10 kg，用于俯卧撑和行走</li>
            <li><strong className="font-semibold text-chalk">弹力带</strong> · 划船、拉开、面拉，补上肢的拉力</li>
            <li><strong className="font-semibold text-chalk">稳固台阶</strong> · 用 RV 踏板或营地桌子边，膝盖以下高度</li>
            <li><strong className="font-semibold text-chalk">单杠（可选）</strong> · 营地游乐场，做引体和悬垂</li>
          </ul>
        </Card>

        <Card className="p-4 sm:p-5">
          <p className="eyebrow">第一周怎么找重量</p>
          <p className="mt-2 text-[13px] leading-relaxed text-soft">
            第 1 周每个动作只做 2 组，任务是找“做 8 次还剩 3 次”的重量。从下表的起点开始，
            太轻就加 2 kg，太重就减 1 kg。第一周不要记录 PR，只需要记录一个下次能重复的重量。
          </p>
          <div className="mt-3 space-y-1.5 font-mono text-[11px] text-dim">
            <p className="flex justify-between gap-3"><span>Goblet Squat</span><span>10 kg 单只</span></p>
            <p className="flex justify-between gap-3"><span>Split Squat</span><span>4 kg/手起</span></p>
            <p className="flex justify-between gap-3"><span>Single-Leg RDL</span><span>6 kg 单手</span></p>
            <p className="flex justify-between gap-3"><span>Dumbbell Floor Press</span><span>8 kg/手</span></p>
            <p className="flex justify-between gap-3"><span>Vest Push-Up</span><span>先不穿背心</span></p>
          </div>
        </Card>
      </div>

      <Callout tone="plain" className="mt-3 p-4 sm:p-5">
        <p className="eyebrow">为什么没有杠铃动作</p>
        <p className="mt-2 text-[13px] leading-relaxed text-soft">
          标准计划用杠铃深蹲和硬拉承载负荷，这里没有。替代方案是把同样的负荷放到一条腿上：
          分腿蹲、单腿硬拉、登阶。体重加上 10 kg 哑铃，单腿的负荷已经超过很多人的杠铃训练量，
          而且更接近落地时单腿承重的方式。
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-mute">
          唯一的前提是动作要慢：下放 3 秒、底部停 1 秒。快速弹起会让 10 kg 变成“没有负荷”。
        </p>
      </Callout>
    </Section>
  );
}
