import { test } from "node:test";
import assert from "node:assert/strict";

await import("../assets/calc.js");
const {
  estimate1RM,
  percentageTable,
  bmrMifflin,
  tdee,
  proteinRange,
  leanGainCalories,
  roundTo,
} = globalThis.Calc;

test("Epley 1RM", () => {
  assert.equal(estimate1RM(100, 1), 100);
  assert.ok(Math.abs(estimate1RM(100, 5) - 116.6667) < 0.001);
  assert.ok(Math.abs(estimate1RM(80, 5) - 93.3333) < 0.001);
  assert.equal(estimate1RM(0, 5), null);
  assert.equal(estimate1RM(100, 0), null);
  assert.equal(estimate1RM(100, 25), null);
  assert.equal(estimate1RM("", 5), null);
});

test("working weights round to plate-friendly steps", () => {
  assert.deepEqual(
    percentageTable(100).map((row) => row.weight),
    [85, 80, 75, 70],
  );
  assert.equal(roundTo(99.1, 2.5), 100);
  assert.equal(roundTo(93.33 * 0.85, 2.5), 80);
  assert.deepEqual(percentageTable(null), []);
});

test("Mifflin–St Jeor BMR", () => {
  assert.equal(
    bmrMifflin({ sex: "male", weightKg: 75, heightCm: 178, age: 19 }),
    1772.5,
  );
  assert.equal(
    bmrMifflin({ sex: "female", weightKg: 60, heightCm: 165, age: 25 }),
    600 + 1031.25 - 125 - 161,
  );
  assert.equal(bmrMifflin({}), null);
  assert.equal(bmrMifflin({ sex: "male", weightKg: 0, heightCm: 178, age: 19 }), null);
});

test("TDEE and lean-gain calories", () => {
  assert.equal(tdee(1772.5, 1.55), 2747.375);
  assert.equal(tdee(1772.5, "1.725"), 3057.5625);
  assert.equal(leanGainCalories(2747.375, 250), 2997.375);
  assert.equal(tdee(0, 1.55), null);
  assert.equal(leanGainCalories(null), null);
});

test("protein per kilo of bodyweight", () => {
  assert.deepEqual(proteinRange(75), { min: 120, max: 165 });
  assert.deepEqual(proteinRange(90), { min: 144, max: 198 });
  assert.deepEqual(proteinRange(60, { min: 2, max: 2.4 }), { min: 120, max: 144 });
  assert.equal(proteinRange(0), null);
  assert.equal(proteinRange("heavy"), null);
});
