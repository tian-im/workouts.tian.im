import { useEffect, useState } from "react";

/** Tracks which section is currently under the sticky bar. */
export function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const offset = 140;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      if (atBottom) current = sectionIds[sectionIds.length - 1];

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sectionIds]);

  return active;
}
