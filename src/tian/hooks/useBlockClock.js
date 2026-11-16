import { useCallback, useEffect, useRef, useState } from "react";
import { playChime, primeAudio } from "../../lib/rest.js";
import { BLOCK_SECONDS } from "../data/program.js";

const TICK_MS = 250;

const clockFrom = (remaining, autoStart) => ({
  remaining,
  endsAt: autoStart && remaining > 0 ? Date.now() + remaining * 1000 : 0,
  running: autoStart && remaining > 0,
  finished: remaining <= 0,
});

/**
 * 5 分钟块计时器。用结束时间戳推算剩余秒数，所以切到后台、
 * 锁屏回来都不会漂移。暂停时把剩余秒数交给 onPersist 存档。
 */
export function useBlockClock({ initial = BLOCK_SECONDS, autoStart = true, onPersist }) {
  const [clock, setClock] = useState(() => clockFrom(Math.max(0, Number(initial) || 0), autoStart));
  const [rest, setRest] = useState(null);
  const latest = useRef({ remaining: initial, running: autoStart });
  const persist = useRef(onPersist);
  const clockChimed = useRef(false);
  const restChimed = useRef(false);

  useEffect(() => {
    persist.current = onPersist;
  }, [onPersist]);

  useEffect(() => {
    latest.current = { remaining: clock.remaining, running: clock.running };
  }, [clock.remaining, clock.running]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setClock((prev) => {
        if (!prev.running) return prev;
        const remaining = Math.max(0, Math.ceil((prev.endsAt - Date.now()) / 1000));
        if (remaining === prev.remaining) return prev;
        if (remaining <= 0) return { ...prev, remaining: 0, running: false, finished: true };
        return { ...prev, remaining };
      });

      setRest((prev) => {
        if (!prev) return prev;
        const remaining = Math.max(0, Math.ceil((prev.endsAt - Date.now()) / 1000));
        return remaining === prev.remaining ? prev : { ...prev, remaining };
      });
    }, TICK_MS);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!clock.finished || clockChimed.current) return;
    clockChimed.current = true;
    playChime();
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([200, 100, 200]);
  }, [clock.finished]);

  useEffect(() => {
    if (!rest || rest.remaining > 0 || restChimed.current) return;
    restChimed.current = true;
    playChime();
  }, [rest]);

  const pause = useCallback(() => {
    const remaining = Math.max(
      0,
      clock.running ? Math.ceil((clock.endsAt - Date.now()) / 1000) : clock.remaining,
    );
    setClock((prev) => ({ ...prev, remaining, running: false }));
    persist.current?.(remaining);
  }, [clock.endsAt, clock.remaining, clock.running]);

  const resume = useCallback(() => {
    primeAudio();
    setClock((prev) => {
      if (prev.finished || prev.remaining <= 0) return prev;
      return { ...prev, running: true, endsAt: Date.now() + prev.remaining * 1000 };
    });
  }, []);

  const startRest = useCallback((seconds) => {
    primeAudio();
    restChimed.current = false;
    setRest({ total: seconds, remaining: seconds, endsAt: Date.now() + seconds * 1000 });
  }, []);

  const skipRest = useCallback(() => setRest(null), []);

  useEffect(() => {
    const save = () => persist.current?.(latest.current.remaining);
    window.addEventListener("pagehide", save);
    return () => {
      window.removeEventListener("pagehide", save);
      save();
    };
  }, []);

  return { clock, rest, pause, resume, startRest, skipRest };
}
