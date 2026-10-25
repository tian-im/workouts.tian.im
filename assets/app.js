/* James — Back-First Strength Plan
 * Small, dependency-free behaviours: print, year stamp, session tracker.
 */

(() => {
  "use strict";

  // ── Print ────────────────────────────────────────────────────
  document.querySelectorAll("[data-print]").forEach((btn) => {
    btn.addEventListener("click", () => window.print());
  });

  // ── Year stamp ───────────────────────────────────────────────
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
