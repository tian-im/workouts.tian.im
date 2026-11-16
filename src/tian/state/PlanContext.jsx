import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DAYS, WEEKDAY_PLAN } from "../data/program.js";
import { loggedSetCount, weekStats } from "../lib/progress.js";

const STORAGE_KEY = "tian-plan-v1";

const todayKey = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

const defaultDay = () => WEEKDAY_PLAN[(new Date().getDay() + 6) % 7] ?? "A";

const blank = () => ({
  v: 1,
  start: todayKey(),
  week: 1,
  day: defaultDay(),
  done: {},
  clocks: {},
  loads: {},
  tests: {},
});

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return blank();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return blank();
    return {
      ...blank(),
      week: Number(parsed.week) >= 1 && Number(parsed.week) <= 8 ? Number(parsed.week) : 1,
      day: parsed.day && (parsed.day === "L" || DAYS.some((d) => d.id === parsed.day)) ? parsed.day : defaultDay(),
      done: parsed.done && typeof parsed.done === "object" ? parsed.done : {},
      clocks: parsed.clocks && typeof parsed.clocks === "object" ? parsed.clocks : {},
      loads: parsed.loads && typeof parsed.loads === "object" ? parsed.loads : {},
      tests: parsed.tests && typeof parsed.tests === "object" ? parsed.tests : {},
      start: typeof parsed.start === "string" ? parsed.start : todayKey(),
    };
  } catch {
    return blank();
  }
}

const PlanContext = createContext(null);

export function PlanProvider({ children }) {
  const [state, setState] = useState(read);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* 隐私模式或存储已满：本次会话内仍可继续用 */
    }
  }, [state]);

  const setWeek = useCallback((week) => {
    const next = Math.max(1, Math.min(8, week));
    setState((prev) => ({ ...prev, week: next }));
  }, []);

  const setDay = useCallback((day) => setState((prev) => ({ ...prev, day })), []);

  const logSet = useCallback((key, index, patch, exerciseId) => {
    setState((prev) => {
      const entry = prev.done[key] ?? { sets: [] };
      const sets = Array.isArray(entry.sets) ? [...entry.sets] : [];
      sets[index] = { ...(sets[index] ?? {}), ...patch, at: Date.now() };
      const loads =
        exerciseId && Number(patch.load) > 0
          ? { ...prev.loads, [exerciseId]: Number(patch.load) }
          : prev.loads;
      return { ...prev, done: { ...prev.done, [key]: { ...entry, sets } }, loads };
    });
  }, []);

  const unlogSet = useCallback((key, index) => {
    setState((prev) => {
      const entry = prev.done[key];
      if (!entry || !Array.isArray(entry.sets)) return prev;
      const sets = [...entry.sets];
      sets[index] = null;
      return { ...prev, done: { ...prev.done, [key]: { ...entry, sets } } };
    });
  }, []);

  const finishBlock = useCallback((key) => {
    setState((prev) => ({
      ...prev,
      done: { ...prev.done, [key]: { ...(prev.done[key] ?? { sets: [] }), finishedAt: Date.now() } },
      clocks: { ...prev.clocks, [key]: 0 },
    }));
  }, []);

  const clearBlock = useCallback((key) => {
    setState((prev) => {
      const done = { ...prev.done };
      const clocks = { ...prev.clocks };
      delete done[key];
      delete clocks[key];
      return { ...prev, done, clocks };
    });
  }, []);

  const saveClock = useCallback((key, remaining) => {
    setState((prev) => ({ ...prev, clocks: { ...prev.clocks, [key]: Math.max(0, remaining) } }));
  }, []);

  const saveTest = useCallback((key, value) => {
    setState((prev) => ({ ...prev, tests: { ...prev.tests, [key]: value } }));
  }, []);

  const resetAll = useCallback(() => {
    setState({ ...blank(), day: defaultDay() });
  }, []);

  const stats = useMemo(
    () => ({
      week: weekStats(state.done, state.week, DAYS),
      sets: loggedSetCount(state.done),
    }),
    [state.done, state.week],
  );

  const value = useMemo(
    () => ({
      state,
      stats,
      setWeek,
      setDay,
      logSet,
      unlogSet,
      finishBlock,
      clearBlock,
      saveClock,
      saveTest,
      resetAll,
    }),
    [
      state,
      stats,
      setWeek,
      setDay,
      logSet,
      unlogSet,
      finishBlock,
      clearBlock,
      saveClock,
      saveTest,
      resetAll,
    ],
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}
