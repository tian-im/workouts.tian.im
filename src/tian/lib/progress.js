/* 纯计算：从记录里推出“下次该加多少”。没有 DOM，没有 React，可在 node 里测。 */

/** "6–8" → 8；"10/腿" → 10；"30 秒/侧" → 30。取区间上限。 */
export function topRepsOf(reps) {
  const numbers = String(reps).match(/\d+/g);
  return numbers ? Number(numbers[numbers.length - 1]) : null;
}

export const keyFor = (week, dayId, blockId) => `w${week}-${dayId}-${blockId}`;

export function setsFor(block, weekSets) {
  if (block.kind === "mobility") return 0;
  return Math.min(block.sets ?? weekSets, weekSets);
}

/** 技术周和减量周用该周更保守的 RIR，其余周用动作自己的处方。 */
export function rirFor(block, week) {
  if (!block.rir || block.rir === "—") return null;
  if (week.n <= 2 || week.n === 7) return week.rir;
  return block.rir;
}

/** 双进阶：所有记录组都达到次数上限且重量有效时，返回新重量。 */
export function suggestNextLoad(sets, { topReps, step = 1, minSets = 2 } = {}) {
  if (!Array.isArray(sets) || !topReps) return null;
  const logged = sets.filter((set) => set && Number(set.reps) > 0 && Number(set.load) > 0);
  if (logged.length < minSets) return null;
  if (!logged.every((set) => Number(set.reps) >= topReps)) return null;

  const heaviest = Math.max(...logged.map((set) => Number(set.load)));
  return Math.round((heaviest + step) * 100) / 100;
}

/** 总负荷：重量 × 次数；单侧动作按两侧计。 */
export function totalVolume(sets, perSide = false) {
  if (!Array.isArray(sets)) return 0;
  return sets.reduce((sum, set) => {
    if (!set) return sum;
    const load = Number(set.load) || 0;
    const reps = Number(set.reps) || 0;
    return sum + load * reps * (perSide ? 2 : 1);
  }, 0);
}

export function blockStats(done, week, dayId, blocks) {
  let finished = 0;
  let total = 0;
  for (const block of blocks) {
    if (block.optional) continue;
    total += 1;
    if (done[keyFor(week, dayId, block.id)]?.finishedAt) finished += 1;
  }
  return { finished, total, pct: total ? Math.round((finished / total) * 100) : 0 };
}

export function weekStats(done, week, days) {
  let finished = 0;
  let total = 0;
  for (const day of days) {
    const stats = blockStats(done, week, day.id, day.blocks);
    finished += stats.finished;
    total += stats.total;
  }
  return { finished, total, pct: total ? Math.round((finished / total) * 100) : 0 };
}

export function loggedSetCount(done) {
  return Object.values(done || {}).reduce(
    (sum, entry) => sum + (Array.isArray(entry?.sets) ? entry.sets.filter(Boolean).length : 0),
    0,
  );
}
