/* Pure calculation helpers — no DOM, no React. Unit tested in scripts/calc.test.mjs. */

export const ACTIVITY = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  high: 1.725,
  veryHigh: 1.9,
};

const isNum = (n) => typeof n === "number" && Number.isFinite(n);

export function clamp(n, min, max) {
  if (!isNum(n)) return null;
  return Math.min(max, Math.max(min, n));
}

/** Round to the nearest plate-friendly step (default 2.5 kg). */
export function roundTo(value, step = 2.5) {
  if (!isNum(value)) return null;
  return Math.round(value / step) * step;
}

/** Estimated one-rep max (Epley). Returns null for unusable input. */
export function estimate1RM(weightKg, reps) {
  const w = Number(weightKg);
  const r = Number(reps);
  if (!isNum(w) || !isNum(r) || w <= 0 || r < 1 || r > 20) return null;
  if (r === 1) return w;
  return w * (1 + r / 30);
}

/** Working weights at common percentages of a 1RM. */
export function percentageTable(oneRM, percentages = [85, 80, 75, 70]) {
  if (!isNum(oneRM) || oneRM <= 0) return [];
  return percentages.map((pct) => ({
    pct,
    weight: roundTo((oneRM * pct) / 100, 2.5),
  }));
}

/** Basal metabolic rate (Mifflin–St Jeor), kcal/day. */
export function bmrMifflin({ sex, weightKg, heightCm, age } = {}) {
  const w = Number(weightKg);
  const h = Number(heightCm);
  const a = Number(age);
  if (!isNum(w) || !isNum(h) || !isNum(a)) return null;
  if (w <= 0 || h <= 0 || a <= 0) return null;

  const base = 10 * w + 6.25 * h - 5 * a;
  const offset = sex === "female" ? -161 : 5;
  return base + offset;
}

/** Total daily energy expenditure, kcal/day. */
export function tdee(bmrKcal, activityFactor) {
  const factor = Number(activityFactor);
  if (!isNum(bmrKcal) || !isNum(factor) || bmrKcal <= 0 || factor <= 0) return null;
  return bmrKcal * factor;
}

/** Daily protein target in grams at 1.6–2.2 g/kg by default. */
export function proteinRange(weightKg, { min = 1.6, max = 2.2 } = {}) {
  const w = Number(weightKg);
  if (!isNum(w) || w <= 0) return null;
  return { min: Math.round(w * min), max: Math.round(w * max) };
}

/** Target intake for a slow lean gain (+200–300 kcal). */
export function leanGainCalories(tdeeKcal, surplus = 250) {
  if (!isNum(tdeeKcal) || tdeeKcal <= 0) return null;
  return tdeeKcal + surplus;
}
