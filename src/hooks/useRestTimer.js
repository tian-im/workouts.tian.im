import { useCallback, useEffect, useRef, useState } from "react";
import { playChime, primeAudio } from "../lib/rest.js";

const TICK_MS = 250;

/** Rest timer driven by an end timestamp so background throttling doesn't drift. */
export function useRestTimer() {
  const [timer, setTimer] = useState(null);
  const chimed = useRef(false);

  const start = useCallback((seconds, label = "") => {
    primeAudio();
    chimed.current = false;
    setTimer({
      total: seconds,
      remaining: seconds,
      endsAt: Date.now() + seconds * 1000,
      running: true,
      finished: false,
      label,
    });
  }, []);

  const stop = useCallback(() => setTimer(null), []);

  const pause = useCallback(() => {
    setTimer((prev) => {
      if (!prev || !prev.running) return prev;
      const remaining = Math.max(0, Math.ceil((prev.endsAt - Date.now()) / 1000));
      return { ...prev, running: false, remaining };
    });
  }, []);

  const resume = useCallback(() => {
    setTimer((prev) => {
      if (!prev || prev.running || prev.finished || prev.remaining <= 0) return prev;
      return { ...prev, running: true, endsAt: Date.now() + prev.remaining * 1000 };
    });
  }, []);

  const addTime = useCallback((seconds) => {
    setTimer((prev) => {
      if (!prev) return prev;
      if (prev.running) {
        return {
          ...prev,
          total: prev.total + seconds,
          endsAt: prev.endsAt + seconds * 1000,
        };
      }
      return {
        ...prev,
        total: prev.total + seconds,
        remaining: Math.max(0, prev.remaining + seconds),
      };
    });
  }, []);

  useEffect(() => {
    if (!timer?.running) return undefined;

    const id = window.setInterval(() => {
      setTimer((prev) => {
        if (!prev?.running) return prev;
        const remaining = Math.max(0, Math.ceil((prev.endsAt - Date.now()) / 1000));
        if (remaining <= 0) {
          return { ...prev, remaining: 0, running: false, finished: true };
        }
        return { ...prev, remaining };
      });
    }, TICK_MS);

    return () => window.clearInterval(id);
  }, [timer?.running]);

  useEffect(() => {
    if (!timer?.finished || chimed.current) return;
    chimed.current = true;
    playChime();
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([180, 90, 180]);
    }
  }, [timer?.finished]);

  return { timer, start, stop, pause, resume, addTime };
}
