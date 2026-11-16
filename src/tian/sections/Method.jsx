import { Card, Callout, RuleCard, Section, SectionHead } from "../../components/ui.jsx";

export default function Method() {
  return (
    <Section id="tian-method">
      <SectionHead
        eyebrow="规则"
        title="怎么变强，怎么不受伤"
        lead="碎片时间里，进步来自四件事：单侧负荷、双进阶、留 2 次余力、每周一天完全休息。"
      />

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <RuleCard n="01" title="双进阶：先加次数，再加重量">
          每个动作都有次数区间（例如 8–10）。所有组都做到 10 次且还剩 2 次余力，下次加 1 kg/手；
          哑铃 +2 kg 一对，背心 +2 kg。单侧动作以弱侧为准，不用平均值糊弄。
        </RuleCard>
        <RuleCard n="02" title="RIR 2 就是“还能再做 2 个”">
          不是拼到抖。停下时问自己：还能不能再做 2 个干净的？能，就说明这一组合格。
          弹跳需要的是神经系统在清醒状态下发力，不是在疲劳里挣扎。
        </RuleCard>
        <RuleCard n="03" title="5 分钟只放 3 组，但一天放 6 次">
          一次 60 分钟和六次 5 分钟，总组数可以一样。区别是每次都在精力好的时候做，
          动作质量更高，也不占用整块时间。
        </RuleCard>
        <RuleCard n="04" title="重量不够，就改杠杆">
          10 kg 封顶时，靠四件事继续加难度：单腿（等于扛起体重）、3 秒下放、底部停 1 秒、
          缩短组间休息。顺序不要乱：先次数，再节奏，最后才是加片。
        </RuleCard>
        <RuleCard n="05" title="被打断是正常的">
          离开页面时计时自动暂停并存档，下次打开接着走。一个块分成两次做也计入，
          只要两组之间有记忆里的位置。
        </RuleCard>
        <RuleCard n="06" title="第 7 周减量，不是休息">
          重量不变，组数减到 2 组、块数减到 3 块。身体在这周把前六周的训练变成力量，
          跳过它，第 8 周测试会明显偏低。
        </RuleCard>
      </div>

      <Callout className="mt-4 p-4 sm:p-5">
        <p className="eyebrow">一周的骨架</p>
        <div className="mt-2 grid gap-x-6 gap-y-1.5 text-[13px] leading-relaxed text-soft sm:grid-cols-2">
          <p><strong className="font-semibold text-chalk">周一 A</strong> 蹲主导 · 股四头 + 小腿</p>
          <p><strong className="font-semibold text-chalk">周二 B</strong> 上肢推 + 核心</p>
          <p><strong className="font-semibold text-chalk">周三 C</strong> 髋主导 · 落地控制</p>
          <p><strong className="font-semibold text-chalk">周四 D</strong> 上肢拉 + 核心</p>
          <p><strong className="font-semibold text-chalk">周五 E</strong> 全身单侧 · 轻负荷</p>
          <p><strong className="font-semibold text-chalk">周末</strong> 长块 20–30 分钟，或完全休息</p>
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-mute">
          第 7 天不做任何训练。小腿、跟腱和足底需要一天完全不承重，否则第 9 周的跳跃会从小伤开始。
        </p>
      </Callout>

      <Card className="mt-3 p-4 sm:p-5">
        <p className="eyebrow">为什么现在不跳</p>
        <p className="mt-2 text-[13px] leading-relaxed text-soft">
          弹跳的瓶颈通常不是“不会跳”，而是踝背屈不够、单腿力量不足、落地时膝盖撑不住。
          这 8 周把这三件事补上：踝每天活动，单腿每周 4–5 次，慢速下台阶练刹车。
          第 8 周测试达标后再开始跳跃，受伤概率会低得多。
        </p>
      </Card>
    </Section>
  );
}
