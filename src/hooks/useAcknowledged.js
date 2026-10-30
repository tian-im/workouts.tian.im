import { useCallback, useState } from "react";

const KEY = "james-plan-read-v1";

/** Records that the briefing has been read. Never used to hide content. */
export function useAcknowledged() {
  const [acked, setAcked] = useState(() => {
    try {
      return localStorage.getItem(KEY) === "1";
    } catch {
      return false;
    }
  });

  const acknowledge = useCallback(() => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* private mode: acknowledge for this visit only */
    }
    setAcked(true);
  }, []);

  return { acked, acknowledge };
}
