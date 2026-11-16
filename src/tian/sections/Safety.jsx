import { BulletList, Callout, Card, RuleCard, Section, SectionHead } from "../../components/ui.jsx";

export default function Safety() {
  return (
    <Section id="tian-safety" band>
      <SectionHead
        eyebrow="红线"
        title="疼就停，这不是一句口号"
        lead="在房车里受伤意味着没有物理治疗师、没有熟悉的床、开车也受影响。下面几条没有例外。"
      />

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <RuleCard n="01" title="膝盖内扣就结束这一组">
          下蹲和上台阶时膝盖跟着脚尖走。膝盖往里塌的那一次不算次数 —— 那是在练错误的动作模式。
        </RuleCard>
        <RuleCard n="02" title="关节痛立刻停，肌肉酸可以继续">
          刺痛、卡住、某个角度突然疼：停下，换替代动作，观察两天。
          延迟性肌肉酸痛（训练后 1–2 天）是正常的，可以继续。
        </RuleCard>
        <RuleCard n="03" title="小腿或跟腱早上僵硬超过 30 分钟">
          说明前一天的提踵或落地练习过量。下一天跳块 4 和块 7，只做块 1 和上肢。
        </RuleCard>
        <RuleCard n="04" title="每天都做踝，哪怕只做一块">
          踝背屈是弹跳的第一道门。露营地的斜地面、车内低矮空间都会让踝变紧，
          块 1 不要跳过。
        </RuleCard>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Card className="p-4 sm:p-5">
          <p className="eyebrow">只有 2 分钟的日子</p>
          <BulletList
            className="mt-2"
            items={[
              "Ankle Dorsiflexion Rock 10/侧",
              "Split Squat 自重 1 × 10/腿",
              "Band Pull-Apart 1 × 15",
            ]}
          />
          <p className="mt-2 text-[12px] leading-relaxed text-mute">
            不记为完成块，但能让第二天不难受。连续两天以上只做这个，就把这一周往后顺延。
          </p>
        </Card>

        <Card className="p-4 sm:p-5">
          <p className="eyebrow">恢复，按优先级</p>
          <BulletList
            className="mt-2"
            items={[
              "睡够 7 小时 —— 力量是在睡眠里长出来的，不是在做的时候",
              "每天蛋白质约 1.6–2.0 g/kg 体重，房车里最省事的是鸡蛋、希腊酸奶、豆类罐头",
              "开车 2 小时以上，下车先做块 1，再坐下工作",
              "连续 3 天睡眠不足 6 小时，把本周降为第 7 周的减量版本",
            ]}
          />
        </Card>
      </div>

      <Callout tone="ember" className="mt-4 p-4 sm:p-5">
        <p className="eyebrow">房车场地</p>
        <BulletList
          className="mt-2"
          items={[
            "地面不平就只做不需要稳定站立的动作：地板卧推、臀桥、死虫、活动度。",
            "RV 台阶只用来做上台阶和提踵，不做跳跃和快速落地。",
            "营地游乐场的单杠先晃两下确认固定，引体时脚下不要放硬物。",
            "车内高度不足时，站姿动作放到车外，用毛巾垫在哑铃下面保护地板。",
          ]}
        />
      </Callout>
    </Section>
  );
}
