import { test } from "node:test";
import assert from "node:assert/strict";

import {
  blockStats,
  keyFor,
  loggedSetCount,
  rirFor,
  setsFor,
  suggestNextLoad,
  topRepsOf,
  totalVolume,
  weekStats,
} from "../src/tian/lib/progress.js";

test("topRepsOf reads the top of a rep range", () => {
  assert.equal(topRepsOf("6–8"), 8);
  assert.equal(topRepsOf("10/腿"), 10);
  assert.equal(topRepsOf("30 秒/侧"), 30);
  assert.equal(topRepsOf("12–15"), 15);
  assert.equal(topRepsOf("5"), 5);
  assert.equal(topRepsOf("—"), null);
});

test("setsFor caps a block at the week's set count", () => {
  const week1 = { sets: 2 };
  const week2 = { sets: 3 };
  assert.equal(setsFor({ sets: 3 }, week1.sets), 2);
  assert.equal(setsFor({ sets: 3 }, week2.sets), 3);
  assert.equal(setsFor({ sets: 2 }, week2.sets), 2);
  assert.equal(setsFor({ kind: "mobility", steps: [] }, week2.sets), 0);
});

test("rirFor uses the week's RIR in technique and deload weeks", () => {
  const block = { rir: "2" };
  assert.equal(rirFor(block, { n: 1, rir: "3–4" }), "3–4");
  assert.equal(rirFor(block, { n: 2, rir: "3" }), "3");
  assert.equal(rirFor(block, { n: 4, rir: "2" }), "2");
  assert.equal(rirFor(block, { n: 7, rir: "3–4" }), "3–4");
  assert.equal(rirFor({ rir: "—" }, { n: 4, rir: "2" }), null);
  assert.equal(rirFor({}, { n: 4, rir: "2" }), null);
});

test("suggestNextLoad only bumps when every set hits the top of the range", () => {
  const top = { topReps: 12, step: 1, minSets: 2 };
  assert.equal(suggestNextLoad([{ reps: 12, load: 8 }, { reps: 12, load: 8 }], top), 9);
  assert.equal(suggestNextLoad([{ reps: 12, load: 8 }, { reps: 11, load: 8 }], top), null);
  assert.equal(suggestNextLoad([{ reps: 12, load: 8 }], top), null);
  assert.equal(suggestNextLoad([], top), null);
  assert.equal(suggestNextLoad(null, top), null);
  assert.equal(suggestNextLoad([{ reps: 12, load: 8 }, { reps: 12, load: 10 }], top), 11);
});

test("suggestNextLoad ignores sets without a load", () => {
  const sets = [{ reps: 15, load: 0 }, { reps: 15, load: 0 }];
  assert.equal(suggestNextLoad(sets, { topReps: 15 }), null);
});

test("totalVolume adds weight × reps and doubles per-side sets", () => {
  assert.equal(totalVolume([{ reps: 10, load: 8 }, { reps: 10, load: 8 }]), 160);
  assert.equal(totalVolume([{ reps: 10, load: 8 }], true), 160);
  assert.equal(totalVolume([]), 0);
  assert.equal(totalVolume(null), 0);
});

test("blockStats counts finished required blocks only", () => {
  const blocks = [
    { id: "b1", kind: "mobility" },
    { id: "b2", sets: 3 },
    { id: "b3", sets: 2, optional: true },
  ];
  const done = { [keyFor(3, "A", "b2")]: { finishedAt: 1 } };
  assert.deepEqual(blockStats(done, 3, "A", blocks), { finished: 1, total: 2, pct: 50 });
  assert.deepEqual(blockStats({}, 3, "A", blocks), { finished: 0, total: 2, pct: 0 });
});

test("weekStats sums across days", () => {
  const days = [
    { id: "A", blocks: [{ id: "b1" }, { id: "b2" }] },
    { id: "B", blocks: [{ id: "b1" }, { id: "b2" }] },
  ];
  const done = {
    [keyFor(1, "A", "b1")]: { finishedAt: 1 },
    [keyFor(1, "B", "b2")]: { finishedAt: 1 },
  };
  assert.deepEqual(weekStats(done, 1, days), { finished: 2, total: 4, pct: 50 });
});

test("loggedSetCount counts logged sets across weeks", () => {
  const done = {
    "w1-A-b2": { sets: [{ reps: 8, load: 10 }, { reps: 8, load: 10 }] },
    "w2-A-b2": { sets: [{ reps: 9, load: 10 }] },
  };
  assert.equal(loggedSetCount(done), 3);
  assert.equal(loggedSetCount({}), 0);
});
