import { useMemo, useState } from "react";
import {
  bmrMifflin,
  estimate1RM,
  leanGainCalories,
  percentageTable,
  proteinRange,
  tdee,
} from "../lib/calc.js";
import { Card, Section } from "../components/ui.jsx";

const numberFormat = (value, digits = 0) => {
  if (value == null || !Number.isFinite(value)) return "—";
  return value.toLocaleString("en-GB", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
};

function Field({ id, label, children }) {
  return (
    <label className="calc-field" htmlFor={id}>
      <span className="eyebrow">{label}</span>
      {children}
    </label>
  );
}

function Metric({ label, value, suffix, accent = false, name }) {
  return (
    <div className="rounded-lg bg-panel-2 p-3">
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-1 font-display text-xl font-bold leading-none">
        <span
          data-out={name}
          className={value === "—" ? "text-faint" : accent ? "text-lime" : ""}
        >
          {value}
        </span>
        {suffix ? (
          <span className="ml-1 font-sans text-[11px] font-normal text-mute">{suffix}</span>
        ) : null}
      </dd>
    </div>
  );
}

function OneRepMax() {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const oneRM = useMemo(() => estimate1RM(weight, reps), [weight, reps]);
  const table = useMemo(() => percentageTable(oneRM), [oneRM]);

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">One-rep max</p>
          <h3 className="mt-1 font-display text-lg font-bold">Estimate a 1RM</h3>
        </div>
        <span className="chip hidden sm:inline-flex">Epley</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Field id="orm-weight" label="Weight (kg)">
          <input
            id="orm-weight"
            className="calc-input"
            type="number"
            inputMode="decimal"
            min="0"
            max="500"
            step="2.5"
            placeholder="80"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
        </Field>
        <Field id="orm-reps" label="Reps">
          <input
            id="orm-reps"
            className="calc-input"
            type="number"
            inputMode="numeric"
            min="1"
            max="12"
            step="1"
            placeholder="5"
            value={reps}
            onChange={(event) => setReps(event.target.value)}
          />
        </Field>
      </div>

      <div className="mt-4 rounded-lg bg-panel-2 p-4">
        <p className="eyebrow">Estimated 1RM</p>
        <p className="mt-1 font-display text-3xl font-bold leading-none">
          <span className={oneRM ? "" : "text-faint"} data-out="orm">
            {oneRM ? numberFormat(oneRM, 1) : "—"}
          </span>
          <span className="ml-1.5 font-sans text-xs font-normal text-mute">kg</span>
        </p>
        <p className="mt-2 text-[11.5px] leading-relaxed text-mute">
          Reliable from 1–12 reps. Past that the formula drifts; use a heavier set instead.
        </p>
      </div>

      <div className="mt-4">
        <p className="eyebrow">Working weights</p>
        <ul className="mt-2 space-y-1.5 font-mono text-[12px]">
          {[
            [85, "5–6 reps"],
            [80, "6–8 reps"],
            [75, "8–10 reps"],
            [70, "10–12 reps"],
          ].map(([pct, repsLabel], index, list) => {
            const row = table.find((entry) => entry.pct === pct);
            return (
              <li
                key={pct}
                className={`flex justify-between ${
                  index < list.length - 1 ? "border-b border-line pb-1.5" : ""
                }`}
              >
                <span className="text-soft">
                  {pct}% · {repsLabel}
                </span>
                <span className={row ? "" : "text-faint"} data-out={`orm-${pct}`}>
                  {row ? `${numberFormat(row.weight, 1)} kg` : "—"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
}

function EnergyAndProtein() {
  const [form, setForm] = useState({
    sex: "male",
    age: "",
    height: "",
    weight: "",
    activity: "1.55",
  });

  const set = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const { bmr, tdeeValue, protein, surplus } = useMemo(() => {
    const bmrValue = bmrMifflin({
      sex: form.sex,
      weightKg: form.weight,
      heightCm: form.height,
      age: form.age,
    });
    const tdeeResult = bmrValue ? tdee(bmrValue, form.activity) : null;
    return {
      bmr: bmrValue,
      tdeeValue: tdeeResult,
      protein: proteinRange(form.weight),
      surplus: tdeeResult ? leanGainCalories(tdeeResult) : null,
    };
  }, [form]);

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Energy &amp; protein</p>
          <h3 className="mt-1 font-display text-lg font-bold">BMR, TDEE and daily protein</h3>
        </div>
        <span className="chip hidden sm:inline-flex">Mifflin–St Jeor</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Field id="calc-sex" label="Sex">
          <select id="calc-sex" className="calc-input" value={form.sex} onChange={set("sex")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Field>
        <Field id="calc-age" label="Age">
          <input
            id="calc-age"
            className="calc-input"
            type="number"
            inputMode="numeric"
            min="14"
            max="90"
            step="1"
            placeholder="19"
            value={form.age}
            onChange={set("age")}
          />
        </Field>
        <Field id="calc-height" label="Height (cm)">
          <input
            id="calc-height"
            className="calc-input"
            type="number"
            inputMode="numeric"
            min="120"
            max="230"
            step="1"
            placeholder="178"
            value={form.height}
            onChange={set("height")}
          />
        </Field>
        <Field id="calc-weight" label="Weight (kg)">
          <input
            id="calc-weight"
            className="calc-input"
            type="number"
            inputMode="decimal"
            min="30"
            max="200"
            step="0.5"
            placeholder="75"
            value={form.weight}
            onChange={set("weight")}
          />
        </Field>
        <div className="col-span-2">
          <Field id="calc-activity" label="Activity">
            <select
              id="calc-activity"
              className="calc-input"
              value={form.activity}
              onChange={set("activity")}
            >
              <option value="1.2">Sedentary — desk job, no training</option>
              <option value="1.375">Light — 1–3 sessions/week</option>
              <option value="1.55">Moderate — 3–5 sessions/week</option>
              <option value="1.725">High — 6–7 sessions/week</option>
              <option value="1.9">Very high — physical job + training</option>
            </select>
          </Field>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2">
        <Metric
          name="bmr"
          label="BMR"
          value={bmr ? numberFormat(Math.round(bmr / 5) * 5) : "—"}
          suffix="kcal"
        />
        <Metric
          name="tdee"
          label="TDEE"
          value={tdeeValue ? numberFormat(Math.round(tdeeValue / 10) * 10) : "—"}
          suffix="kcal"
        />
        <Metric
          name="surplus"
          label="Lean gain"
          value={surplus ? numberFormat(Math.round(surplus / 10) * 10) : "—"}
          suffix="kcal"
          accent
        />
        <Metric
          name="protein"
          label="Protein"
          value={protein ? `${protein.min}–${protein.max}` : "—"}
          suffix="g"
        />
      </dl>

      <p className="mt-3 text-[12px] leading-relaxed text-mute">
        Protein is 1.6–2.2 g per kg of bodyweight. Lean gain adds 250 kcal to TDEE — the plan
        recommends 200–300 above maintenance.
      </p>
    </Card>
  );
}

export default function Calculators() {
  return (
    <Section id="calculators" band>
      <p className="eyebrow">Appendix · Calculators</p>
      <h2 className="mt-2.5 text-[1.65rem] font-bold leading-tight sm:text-[2rem]">
        Numbers, if you want them
      </h2>
      <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-soft">
        Estimates, not tests. Use the 1RM to pick working weights, and the energy numbers to know
        roughly what to eat. Nothing is saved.
      </p>

      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        <OneRepMax />
        <EnergyAndProtein />
      </div>
    </Section>
  );
}
