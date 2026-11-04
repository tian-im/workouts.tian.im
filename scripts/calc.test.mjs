import { test } from "node:test";
import assert from "node:assert/strict";

import {
  estimate1RM,
  percentageTable,
  bmrMifflin,
  tdee,
  proteinRange,
  leanGainCalories,
  roundTo,
} from "../src/lib/calc.js";
import { parseRestSeconds, formatClock } from "../src/lib/rest.js";
import { youtubeSearch } from "../src/lib/links.js";

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

test("rest prescriptions parse to seconds", () => {
  assert.equal(parseRestSeconds("rest 3 min"), 180);
  assert.equal(parseRestSeconds("rest 90 s"), 90);
  assert.equal(parseRestSeconds("rest 45 s"), 45);
  assert.equal(parseRestSeconds("rest 3–4 min"), 210);
  assert.equal(parseRestSeconds("rest 2–3 min"), 150);
  assert.equal(parseRestSeconds("RIR 2"), null);
  assert.equal(parseRestSeconds("1 s squeeze"), null);
});

test("clock formatting", () => {
  assert.equal(formatClock(180), "3:00");
  assert.equal(formatClock(65), "1:05");
  assert.equal(formatClock(0), "0:00");
});

test("youtube search uses the plain lift name", () => {
  assert.ok(youtubeSearch("Barbell Row").includes("Barbell%20Row%20form"));
  assert.ok(youtubeSearch("Deadlift — Conventional or Trap Bar").includes("Deadlift%20form"));
  assert.ok(youtubeSearch("Seal Row / Chest-Supported T-Bar Row").includes("Seal%20Row%20form"));
  assert.ok(youtubeSearch("Weighted Pull-Up or Lat Pulldown").includes("Weighted%20Pull-Up%20form"));
});
