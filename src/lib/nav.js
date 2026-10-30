/** Scroll helpers. Contents jumps are instant: smooth-scrolling 13,000 px feels broken. */

export const STICKY_OFFSET = 72;

export function jumpTo(id, offset = STICKY_OFFSET) {
  const el = document.getElementById(id);
  if (!el) return;

  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo(0, Math.max(0, top));

  root.style.scrollBehavior = previous;
  history.replaceState(null, "", `#${id}`);
}

export function idFromHash() {
  if (!window.location.hash) return null;
  try {
    const target = document.querySelector(window.location.hash);
    return target ? target.id : null;
  } catch {
    return null;
  }
}
