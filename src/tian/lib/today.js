import { DAYS, weekOf } from "../data/program.js";
import { keyFor } from "./progress.js";

export function visibleBlocks(day, week) {
  return week.maxBlocks ? day.blocks.slice(0, week.maxBlocks) : day.blocks;
}

/** 今日清单当前要做的块：优先未完成的第一个必修块。 */
export function todayFor(state) {
  const week = weekOf(state.week);
  const day = DAYS.find((entry) => entry.id === state.day) ?? DAYS[0];
  const blocks = visibleBlocks(day, week);
  const required = blocks.filter((block) => !block.optional);
  const target =
    required.find((block) => !state.done[keyFor(week.n, day.id, block.id)]?.finishedAt) ?? null;
  const started = required.find((block) => {
    const saved = state.clocks[keyFor(week.n, day.id, block.id)];
    return typeof saved === "number" && saved > 0;
  });
  return { week, day, blocks, target, started };
}
