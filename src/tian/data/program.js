/* 程序数据 —— 5 个工作日型 + 周末长块 + 8 周进阶。
   规则：每个块 5 分钟以内；块内休息写死在 rest（秒）；块 1 永远是活动度唤醒。 */

export const BLOCK_SECONDS = 300;

/** 训练时钟：休息秒数写在这里，倒计时读它。 */
export const REST = { main: 90, secondary: 75, small: 60, quick: 45 };

const mobility = (id, slot, label, steps) => ({
  id,
  kind: "mobility",
  slot,
  label,
  steps,
});

const strength = (id, slot, label, exercise) => ({
  id,
  kind: "strength",
  slot,
  label,
  exercise,
});

export const DAYS = [
  {
    id: "A",
    letter: "A",
    label: "蹲主导",
    weekday: "周一",
    accent: "lime",
    summary: "股四头 + 小腿，弹跳最直接的发力来源",
    blocks: [
      mobility("a1", "唤醒", "踝与髋打开", [
        { exercise: "ankle-rock", prescription: "2 × 10/侧" },
        { exercise: "hip-90-90", prescription: "2 × 8" },
      ]),
      {
        ...strength("a2", "主项", "深蹲 · 最重的一块", "goblet-squat"),
        sets: 3,
        reps: "10–12",
        rir: "2",
        rest: REST.main,
        tempo: "3 秒下放",
      },
      {
        ...strength("a3", "单侧", "分腿蹲 · 真正的腿部负荷", "split-squat"),
        sets: 3,
        reps: "8/腿",
        rir: "2",
        rest: REST.secondary,
        tempo: "3 秒下放 · 底部停 1 秒",
      },
      {
        ...strength("a4", "小腿", "单腿提踵 · 弹跳的弹簧", "calf-raise"),
        sets: 3,
        reps: "12/腿",
        rir: "1",
        rest: REST.small,
        tempo: "顶端停 1 秒",
      },
      {
        ...strength("a5", "拉", "弹力带划船 · 平衡推", "band-row"),
        sets: 3,
        reps: "12–15",
        rir: "1",
        rest: REST.small,
      },
      {
        ...strength("a6", "核心", "侧平板", "side-plank"),
        sets: 3,
        reps: "30 秒/侧",
        rest: REST.quick,
      },
      {
        ...strength("a7", "可选", "靠墙静蹲（多出来的 5 分钟）", "wall-sit"),
        sets: 2,
        reps: "45 秒",
        rir: "—",
        rest: REST.small,
        optional: true,
      },
      {
        ...mobility("a8", "可选", "收尾拉伸", [
          { exercise: "hip-flexor-stretch", prescription: "30 秒/侧" },
          { exercise: "calf-stretch", prescription: "30 秒/侧" },
        ]),
        optional: true,
      },
    ],
  },
  {
    id: "B",
    letter: "B",
    label: "上肢推",
    weekday: "周二",
    accent: "ice",
    summary: "推 + 核心抗伸展，顺便给下肢一天恢复",
    blocks: [
      mobility("b1", "唤醒", "脊柱与胸椎", [
        { exercise: "cat-cow", prescription: "× 8" },
        { exercise: "t-spine-rotation", prescription: "2 × 8/侧" },
      ]),
      {
        ...strength("b2", "主项", "负重俯卧撑", "push-up"),
        sets: 3,
        reps: "8–15",
        rir: "1–2",
        rest: REST.main,
        tempo: "3 秒下放",
        alt: { exercise: "incline-push-up", note: "做不满 8 个时手撑台面" },
      },
      {
        ...strength("b3", "辅项", "地板卧推", "floor-press"),
        sets: 3,
        reps: "10–12",
        rir: "2",
        rest: REST.secondary,
      },
      {
        ...strength("b4", "拉", "肩胛健康：拉开", "band-pull-apart"),
        sets: 3,
        reps: "15–20",
        rir: "1",
        rest: REST.quick,
      },
      {
        ...strength("b5", "负重行走", "单手提铃走直线", "suitcase-carry"),
        sets: 3,
        reps: "30 秒/侧",
        rest: REST.small,
      },
      {
        ...strength("b6", "核心", "死虫", "dead-bug"),
        sets: 3,
        reps: "8/侧",
        rest: REST.quick,
      },
      {
        ...strength("b7", "可选", "折体俯卧撑（多出来的 5 分钟）", "pike-push-up"),
        sets: 2,
        reps: "8–10",
        rir: "1",
        rest: REST.small,
        optional: true,
      },
      {
        ...mobility("b8", "可选", "收尾拉伸", [
          { exercise: "hip-flexor-stretch", prescription: "30 秒/侧" },
          { exercise: "t-spine-rotation", prescription: "8/侧" },
        ]),
        optional: true,
      },
    ],
  },
  {
    id: "C",
    letter: "C",
    label: "髋主导",
    weekday: "周三",
    accent: "sand",
    summary: "髋伸 + 落地控制，跳跃的刹车系统",
    blocks: [
      mobility("c1", "唤醒", "髋前侧与臀", [
        { exercise: "hip-flexor-stretch", prescription: "2 × 30 秒/侧" },
        { exercise: "glute-bridge", prescription: "× 12" },
      ]),
      {
        ...strength("c2", "主项", "单腿硬拉", "single-leg-rdl"),
        sets: 3,
        reps: "8–10/腿",
        rir: "2",
        rest: REST.main,
        tempo: "3 秒下放",
      },
      {
        ...strength("c3", "辅项", "臀桥推髋", "hip-thrust"),
        sets: 3,
        reps: "10–12",
        rir: "2",
        rest: REST.secondary,
        tempo: "顶端停 2 秒",
      },
      {
        ...strength("c4", "落地控制", "慢速下台阶 · 3 秒", "step-down"),
        sets: 3,
        reps: "6/腿",
        rir: "2",
        rest: REST.small,
        alt: { exercise: "wall-sit", note: "没有稳固台阶时靠墙静蹲 45 秒" },
      },
      {
        ...strength("c5", "踝", "胫骨前肌", "tibialis-raise"),
        sets: 3,
        reps: "15–20",
        rest: REST.quick,
      },
      {
        ...strength("c6", "拉", "面拉 · 肩胛后缩", "band-face-pull"),
        sets: 3,
        reps: "15–20",
        rir: "1",
        rest: REST.quick,
      },
      {
        ...strength("c7", "可选", "单腿提踵（多出来的 5 分钟）", "calf-raise"),
        sets: 2,
        reps: "15/腿",
        rir: "1",
        rest: REST.small,
        optional: true,
      },
      {
        ...mobility("c8", "可选", "收尾拉伸", [
          { exercise: "calf-stretch", prescription: "30 秒/侧" },
          { exercise: "hip-flexor-stretch", prescription: "30 秒/侧" },
        ]),
        optional: true,
      },
    ],
  },
  {
    id: "D",
    letter: "D",
    label: "上肢拉",
    weekday: "周四",
    accent: "violet",
    summary: "拉 + 空心支撑，撑住躯干才敢用力起跳",
    blocks: [
      mobility("d1", "唤醒", "肩胛与胸椎", [
        { exercise: "band-pull-apart", prescription: "× 15" },
        { exercise: "cat-cow", prescription: "× 8" },
      ]),
      {
        ...strength("d2", "主项", "弹力带划船", "band-row"),
        sets: 3,
        reps: "12–15",
        rir: "1",
        rest: REST.main,
        tempo: "挤压 1 秒",
        alt: { exercise: "pull-up", note: "营地有单杠时做 3 × 3–6 个引体" },
      },
      {
        ...strength("d3", "辅项", "面拉", "band-face-pull"),
        sets: 3,
        reps: "15–20",
        rir: "1",
        rest: REST.secondary,
      },
      {
        ...strength("d4", "推", "上斜俯卧撑", "incline-push-up"),
        sets: 3,
        reps: "10–15",
        rir: "1",
        rest: REST.small,
      },
      {
        ...strength("d5", "核心", "空心支撑", "hollow-hold"),
        sets: 3,
        reps: "20–30 秒",
        rest: REST.quick,
      },
      {
        ...strength("d6", "小腿", "单腿提踵 · 底部拉伸", "calf-raise"),
        sets: 3,
        reps: "15/腿",
        rir: "1",
        rest: REST.small,
        tempo: "底部停 2 秒",
      },
      {
        ...strength("d7", "可选", "悬垂（有单杠时）", "dead-hang"),
        sets: 3,
        reps: "20 秒",
        rest: REST.small,
        optional: true,
      },
      {
        ...mobility("d8", "可选", "收尾拉伸", [
          { exercise: "calf-stretch", prescription: "30 秒/侧" },
          { exercise: "t-spine-rotation", prescription: "8/侧" },
        ]),
        optional: true,
      },
    ],
  },
  {
    id: "E",
    letter: "E",
    label: "全身单侧",
    weekday: "周五",
    accent: "ember",
    summary: "轻负荷高次数，补单侧稳定性，不带疲劳进周末",
    blocks: [
      mobility("e1", "唤醒", "踝与髋", [
        { exercise: "ankle-rock", prescription: "2 × 10/侧" },
        { exercise: "cossack-squat", prescription: "2 × 6/侧" },
      ]),
      {
        ...strength("e2", "主项", "分腿蹲 · 轻一点，动作更慢", "split-squat"),
        sets: 3,
        reps: "10/腿",
        rir: "3",
        rest: REST.secondary,
        tempo: "3 秒下放",
      },
      {
        ...strength("e3", "辅项", "侧向弓步", "lateral-lunge"),
        sets: 3,
        reps: "8/侧",
        rir: "2",
        rest: REST.small,
      },
      {
        ...strength("e4", "辅项", "负重登阶", "step-up"),
        sets: 3,
        reps: "8/腿",
        rir: "2",
        rest: REST.small,
        alt: { exercise: "hip-thrust", note: "没有稳固台阶时做臀桥推髋 3 × 12" },
      },
      {
        ...strength("e5", "小腿", "单腿提踵 · 慢速", "calf-raise"),
        sets: 3,
        reps: "20/腿",
        rir: "1",
        rest: REST.quick,
      },
      {
        ...strength("e6", "核心", "平板支撑", "plank"),
        sets: 3,
        reps: "30–45 秒",
        rest: REST.quick,
      },
      {
        ...strength("e7", "可选", "胫骨前肌（多出来的 5 分钟）", "tibialis-raise"),
        sets: 2,
        reps: "20",
        rest: REST.quick,
        optional: true,
      },
      {
        ...mobility("e8", "可选", "收尾拉伸", [
          { exercise: "hip-flexor-stretch", prescription: "30 秒/侧" },
          { exercise: "calf-stretch", prescription: "30 秒/侧" },
          { exercise: "cat-cow", prescription: "× 8" },
        ]),
        optional: true,
      },
    ],
  },
];

export const dayOf = (id) => DAYS.find((day) => day.id === id) ?? DAYS[0];

/** 周一到周五对应 A–E，周末只做长块。 */
export const WEEKDAY_PLAN = ["A", "B", "C", "D", "E", null, null];

export const WEEKS = [
  {
    n: 1,
    phase: "技术",
    sets: 2,
    rir: "3–4",
    focus: "找重量",
    note: "只做 2 组。目标是找到“8 次还剩 3 次”的重量，不是练到累。",
    long: "split-squat",
  },
  {
    n: 2,
    phase: "技术",
    sets: 3,
    rir: "3",
    focus: "动作定型",
    note: "加到 3 组，重量不变。膝盖和脚跟的位置每次都要一样。",
    long: "split-squat",
  },
  {
    n: 3,
    phase: "建立",
    sets: 3,
    rir: "2",
    focus: "开始加重",
    note: "任何一块做到区间上限且还剩 2 次，下次加 1 kg/手。",
    long: "step-up",
  },
  {
    n: 4,
    phase: "建立",
    sets: 3,
    rir: "2",
    focus: "稳定加重",
    note: "本周只允许加重量，不允许加组数。动作变形就退回上一档。",
    long: "step-up",
  },
  {
    n: 5,
    phase: "建立+",
    sets: 3,
    rir: "2",
    focus: "频率最高",
    note: "小腿和跟腱开始累积疲劳。出现酸胀就跳过块 4 和块 7。",
    long: "single-leg-rdl",
  },
  {
    n: 6,
    phase: "建立+",
    sets: 3,
    rir: "2",
    focus: "最重的一周",
    note: "这一周允许用满 2 × 10 kg 哑铃和 10 kg 背心。仍然不到力竭。",
    long: "single-leg-rdl",
  },
  {
    n: 7,
    phase: "减量",
    sets: 2,
    rir: "3–4",
    focus: "只做块 1–3",
    note: "重量不变，块数减半。这一周的目的是让身体把前面的负荷变成力量。",
    long: "split-squat",
    maxBlocks: 3,
  },
  {
    n: 8,
    phase: "测试",
    sets: 2,
    rir: "—",
    focus: "3 天轻练 + 2 天测试",
    note: "测试不是比赛。任何一次动作变形就停，记录已完成的部分。",
    long: null,
  },
];

export const weekOf = (n) => WEEKS.find((week) => week.n === n) ?? WEEKS[0];

const accessorySets = (a, b) => [
  { exercise: a[0], prescription: a[1] },
  { exercise: b[0], prescription: b[1] },
];

export const LONG_BLOCK = {
  id: "L",
  label: "周末长块",
  duration: "20–30 分钟",
  summary: "一周里唯一能真正加重的时间窗：主项 5×5（第 7 周减到 3 组），再加 2 个辅项。",
  warmup: [
    { exercise: "ankle-rock", prescription: "10/侧" },
    { exercise: "glute-bridge", prescription: "× 12" },
    { exercise: "band-pull-apart", prescription: "× 15" },
  ],
  cooldown: [
    { exercise: "calf-stretch", prescription: "30 秒/侧" },
    { exercise: "hip-flexor-stretch", prescription: "30 秒/侧" },
  ],
  main: {
    sets: 5,
    reps: "5/腿",
    rir: "2",
    rest: 120,
    tempo: "3 秒下放",
  },
  accessories: {
    "split-squat": accessorySets(["calf-raise", "12/腿"], ["band-row", "15"]),
    "step-up": accessorySets(["hip-thrust", "10"], ["band-face-pull", "15"]),
    "single-leg-rdl": accessorySets(["goblet-squat", "10"], ["suitcase-carry", "40 秒/侧"]),
  },
  accessorySets: 2,
  accessoryRest: 60,
};

export const TESTS = [
  {
    id: "t1",
    name: "Split Squat 极限次数",
    setup: "每手 8 kg + 背心 10 kg，单腿连续做到动作变形为止",
    target: "≥ 12 次/腿",
    unit: "次/腿",
    key: "splitSquat",
  },
  {
    id: "t2",
    name: "单腿提踵最多次数",
    setup: "自重，顶端停 1 秒，脚跟下沉到底再起",
    target: "≥ 25 次/腿",
    unit: "次/腿",
    key: "calfRaise",
  },
  {
    id: "t3",
    name: "慢速下台阶质量",
    setup: "3 秒下放 × 5 次，膝盖不内扣、身体不晃",
    target: "5 次全部干净",
    unit: "干净次数",
    key: "stepDown",
  },
  {
    id: "t4",
    name: "平板支撑时间",
    setup: "肘撑，臀部不塌，呼吸不憋",
    target: "≥ 90 秒",
    unit: "秒",
    key: "plank",
  },
  {
    id: "t5",
    name: "单腿闭眼平衡",
    setup: "赤脚单腿站，闭眼计时，左右都要",
    target: "≥ 20 秒/腿",
    unit: "秒/腿",
    key: "balance",
  },
];

export const TEST_WEEK_PLAN = [
  { day: "周一", work: "轻练 A 的块 1–3，重量减 20%" },
  { day: "周二", work: "测试 ① ②" },
  { day: "周三", work: "轻练，只做块 1 和块 6" },
  { day: "周四", work: "测试 ③ ④ ⑤" },
  { day: "周五", work: "只做活动度和拉伸" },
];

export const TOC_GROUPS = [
  {
    id: "today",
    label: "开始",
    items: [
      { id: "tian-hero", label: "现在有 5 分钟" },
      { id: "tian-today", label: "今日清单" },
      { id: "tian-long", label: "周末长块" },
    ],
  },
  {
    id: "plan",
    label: "计划",
    items: [
      { id: "tian-weeks", label: "八周表" },
      { id: "tian-method", label: "进阶规则" },
      { id: "tian-test", label: "第 8 周测试" },
    ],
  },
  {
    id: "reference",
    label: "参考",
    items: [
      { id: "tian-library", label: "动作库" },
      { id: "tian-safety", label: "安全与恢复" },
      { id: "tian-setup", label: "装备与场地" },
    ],
  },
];

export const SECTION_ORDER = TOC_GROUPS.flatMap((group) => group.items.map((item) => item.id));
