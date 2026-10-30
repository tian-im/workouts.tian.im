import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SESSIONS } from "../data/plan.js";

const STORAGE_KEY = "james-plan-v1";
const TrackerContext = createContext(null);

const blank = () => ({ weights: {}, done: {} });

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return blank();
    const parsed = JSON.parse(raw);
    return {
      weights: parsed && typeof parsed.weights === "object" ? parsed.weights : {},
      done: parsed && typeof parsed.done === "object" ? parsed.done : {},
    };
  } catch {
    return blank();
  }
}

export function TrackerProvider({ children }) {
  const [state, setState] = useState(read);
  const [resetToken, setResetToken] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* private mode / full storage: tracker still works for this session */
    }
  }, [state]);

  const toggleSet = useCallback((exerciseId, index) => {
    setState((prev) => {
      const current = Array.isArray(prev.done[exerciseId]) ? [...prev.done[exerciseId]] : [];
      current[index] = !current[index];
      return { ...prev, done: { ...prev.done, [exerciseId]: current } };
    });
  }, []);

  const setWeight = useCallback((exerciseId, raw) => {
    setState((prev) => {
      const weights = { ...prev.weights };
      const value = String(raw).trim();
      if (value === "") delete weights[exerciseId];
      else weights[exerciseId] = Number(value);
      return { ...prev, weights };
    });
  }, []);

  const resetSession = useCallback((letter) => {
    setState((prev) => {
      const done = { ...prev.done };
      for (const session of SESSIONS) {
        if (session.letter !== letter) continue;
        for (const exercise of session.exercises) delete done[exercise.id];
      }
      return { ...prev, done };
    });
  }, []);

  const resetAll = useCallback(() => {
    setState(blank());
    setResetToken((n) => n + 1);
  }, []);

  const stats = useMemo(() => {
    const perSession = {};
    let totalDone = 0;
    let totalSets = 0;

    for (const session of SESSIONS) {
      let done = 0;
      let total = 0;

      for (const exercise of session.exercises) {
        total += exercise.sets;
        const marks = state.done[exercise.id] || [];
        for (let i = 0; i < exercise.sets; i += 1) if (marks[i]) done += 1;
      }

      totalDone += done;
      totalSets += total;
      perSession[session.letter] = {
        done,
        total,
        pct: total ? Math.round((done / total) * 100) : 0,
      };
    }

    return { perSession, totalDone, totalSets };
  }, [state.done]);

  const value = useMemo(
    () => ({ state, stats, resetToken, toggleSet, setWeight, resetSession, resetAll }),
    [state, stats, resetToken, toggleSet, setWeight, resetSession, resetAll],
  );

  return <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>;
}

export function useTracker() {
  const ctx = useContext(TrackerContext);
  if (!ctx) throw new Error("useTracker must be used inside <TrackerProvider>");
  return ctx;
}
