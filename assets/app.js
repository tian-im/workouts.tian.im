/* James — Back-First Strength Plan
 * Dependency-free: set tracker (localStorage), detail sheet, scroll-spy, print.
 */

(() => {
  "use strict";

  const KEY = "james-plan-v1";

  /* ── Exercise reference ─────────────────────────────────────
   * `why`      — why this lift is in the program
   * `mistakes` — the two errors that actually cost progress
   * `easier`   — swap if the movement isn't working
   * `harder`   — where to go once it is
   */
  const EX = {
    A1: {
      why: "The primary driver of pressing strength. Everything else on push day exists to support this number.",
      mistakes: [
        "Flaring the elbows to 90° — the shoulders take the load instead of the chest.",
        "Bouncing the bar off the chest, which turns tension into momentum.",
      ],
      easier: "Dumbbell bench press or a machine chest press.",
      harder: "Pause bench: 2 s on the chest, same weight.",
    },
    A2: {
      why: "Builds overhead strength without the shoulder risk of a barbell lockout behind the head.",
      mistakes: [
        "Arching the lower back off the pad to fake extra range.",
        "Pressing in front of the body instead of straight over the shoulders.",
      ],
      easier: "Seated machine shoulder press.",
      harder: "Standing barbell press, same rep range.",
    },
    A3: {
      why: "Puts the upper chest in a stretched position — the part that fills out the top of a t-shirt.",
      mistakes: [
        "Setting the bench at 45°+, which turns it into a shoulder press.",
        "Clanging the dumbbells together at the top and losing tension.",
      ],
      easier: "Incline machine press.",
      harder: "Incline barbell press.",
    },
    A4: {
      why: "Adds back volume without fatiguing the lower back before Day C, and keeps the shoulders from rounding forward.",
      mistakes: [
        "Pulling with the elbows flared wide — that turns it into a rear-delt fly.",
        "Lifting the chest off the pad to cheat the weight up.",
      ],
      easier: "Seated cable row, lighter.",
      harder: "Chest-supported T-bar row.",
    },
    A5: {
      why: "Side delts create the width that makes a thick back look bigger from the front.",
      mistakes: [
        "Shrugging the traps instead of leading with the elbow.",
        "Swinging the cable with momentum.",
      ],
      easier: "Light dumbbell lateral raise.",
      harder: "Lean-away cable raise.",
    },
    A6: {
      why: "Direct triceps volume — the lockout muscle on every press you do.",
      mistakes: [
        "Elbows drifting forward so it becomes a lat pushdown.",
        "Leaning over the stack to add bodyweight.",
      ],
      easier: "Bench dip.",
      harder: "Weighted dip.",
    },

    B1: {
      why: "The strength lift of the program. It drives whole-body power and leg size at once.",
      mistakes: [
        "Knees caving inward on the way up.",
        "Cutting depth as the weight climbs.",
      ],
      easier: "Goblet squat or leg press.",
      harder: "Pause squat: 2 s in the hole.",
    },
    B2: {
      why: "Loads the quads hard with minimal technique risk and almost no lower-back fatigue.",
      mistakes: [
        "Letting the lower back round at the bottom as the hips tuck under.",
        "Bouncing out of the bottom.",
      ],
      easier: "Single-leg leg press.",
      harder: "Hack squat.",
    },
    B3: {
      why: "Isolates the quad at the knee — the safest way to add quad volume after squats.",
      mistakes: [
        "Swinging the pad up with momentum.",
        "Stopping halfway at the top.",
      ],
      easier: "Lighter weight, 2 s up, 2 s down.",
      harder: "Single-leg extension.",
    },
    B4: {
      why: "Trains the hamstrings at a long muscle length, which is where growth is highest.",
      mistakes: [
        "Hips lifting off the seat to help the curl.",
        "Letting the stack snap back on the negative.",
      ],
      easier: "Lighter weight, 3 s negative.",
      harder: "Single-leg curl.",
    },
    B5: {
      why: "Calves respond to loaded stretch and time under tension, not just more weight.",
      mistakes: [
        "Bouncing through the bottom stretch.",
        "Never reaching full plantar flexion at the top.",
      ],
      easier: "Seated calf raise.",
      harder: "Single-leg calf raise.",
    },
    B6: {
      why: "Trains the abs and hip flexors while decompressing the spine at the same time.",
      mistakes: [
        "Swinging the legs like a pendulum.",
        "Lifting the knees without curling the pelvis.",
      ],
      easier: "Lying leg raise.",
      harder: "Toes-to-bar.",
    },

    C1: {
      why: "The heaviest horizontal pull you can load. This is the main driver of mid-back thickness.",
      mistakes: [
        "Standing too upright and shrugging the bar up.",
        "Jerking with the lower back instead of pulling with the elbows.",
      ],
      easier: "Chest-supported row.",
      harder: "Pendlay row from the floor.",
    },
    C2: {
      why: "Removes the lower back entirely so the rhomboids and mid-traps take 100% of the load.",
      mistakes: [
        "Shortening the range to move more weight.",
        "Pulling straight up instead of back toward the hips.",
      ],
      easier: "Machine row.",
      harder: "Add a 2 s pause at the top.",
    },
    C3: {
      why: "Constant tension through the whole range, and easy to progress in small jumps.",
      mistakes: [
        "Rocking the torso for momentum.",
        "Shrugging the shoulders up at the finish.",
      ],
      easier: "Chest-supported machine row.",
      harder: "Single-arm cable row.",
    },
    C4: {
      why: "Loads the lats in a stretched position. Length under load is the strongest size signal for the back.",
      mistakes: [
        "Bending the elbows, which turns it into a pushdown.",
        "Going too heavy and losing the stretch at the top.",
      ],
      easier: "Light cable pullover.",
      harder: "Dumbbell pullover with a 3 s negative.",
    },
    C5: {
      why: "Upper traps add the yoke across the top of your back — the first thing visible from behind.",
      mistakes: [
        "Rolling the shoulders instead of shrugging straight up.",
        "Bouncing at the top instead of holding.",
      ],
      easier: "Dumbbell shrug.",
      harder: "Trap-bar shrug or rack pull.",
    },
    C6: {
      why: "Trains rear delts and external rotators so all the pressing doesn't round you forward.",
      mistakes: [
        "Using weight that turns it into a row.",
        "Letting the elbows drop below shoulder height.",
      ],
      easier: "Band pull-apart.",
      harder: "Seated rear-delt cable fly.",
    },
    C7: {
      why: "Brachialis growth pushes the biceps up, adding arm thickness from the side.",
      mistakes: [
        "Wrists collapsing forward under the load.",
        "Swinging the elbows forward to finish the rep.",
      ],
      easier: "Hammer curl.",
      harder: "Reverse curl with a 2 s negative.",
    },

    D1: {
      why: "The hinge standard. Builds the entire posterior chain, including the erectors that thicken your back.",
      mistakes: [
        "Bar drifting away from the shins at the start.",
        "Rounding the lower back to grind out a rep.",
      ],
      easier: "Trap-bar deadlift or RDL from blocks.",
      harder: "Deficit deadlift, 2–4 cm.",
    },
    D2: {
      why: "Hamstring and glute hypertrophy at long muscle length, plus a serious isometric hold for the back.",
      mistakes: [
        "Squatting the weight down instead of hinging.",
        "Going past your hamstring range and rounding.",
      ],
      easier: "Dumbbell RDL.",
      harder: "Snatch-grip RDL.",
    },
    D3: {
      why: "Single-leg strength that exposes and fixes side-to-side differences before they become injuries.",
      mistakes: [
        "Front foot too close, knee shooting far past the toes.",
        "Leaning forward and turning it into a lunge.",
      ],
      easier: "Bodyweight reverse lunge.",
      harder: "Front-foot-elevated split squat.",
    },
    D4: {
      why: "Hits the hamstrings at a shorter length than the seated curl — a genuinely different stimulus.",
      mistakes: [
        "Hips lifting off the pad to help the curl.",
        "Dropping the weight instead of controlling the negative.",
      ],
      easier: "Lighter weight, 3 s negative.",
      harder: "Single-leg curl.",
    },
    D5: {
      why: "Direct erector work — the muscle that gives the lower back visible thickness from the side.",
      mistakes: [
        "Hyperextending past neutral at the top.",
        "Swinging up with momentum instead of bracing.",
      ],
      easier: "Bodyweight only, slower tempo.",
      harder: "Hold a plate at the chest.",
    },
    D6: {
      why: "The knee-bent position biases the soleus, the deeper calf muscle.",
      mistakes: [
        "Bouncing out of the stretch.",
        "Using a tiny range of motion.",
      ],
      easier: "Bodyweight with a 2 s pause.",
      harder: "Single-leg seated raise.",
    },

    E1: {
      why: "The vertical pull that builds lat width and grip strength at the same time.",
      mistakes: [
        "Kipping to get the chin over the bar.",
        "Half reps — not returning to a full hang.",
      ],
      easier: "Lat pulldown, or band-assisted pull-up.",
      harder: "Add 2.5 kg once you own 4×8.",
    },
    E2: {
      why: "Unilateral pull that lets each side of the back work through a long range without the lower back.",
      mistakes: [
        "Rotating the torso to heave the weight up.",
        "Shrugging instead of driving the elbow back.",
      ],
      easier: "Chest-supported row.",
      harder: "Kroc row: heavier, 15–20 reps.",
    },
    E3: {
      why: "A stretch-focused vertical pull that shapes the lats without heavy loading.",
      mistakes: [
        "Pulling behind the neck.",
        "Leaning way back and turning it into a row.",
      ],
      easier: "Neutral-grip pulldown.",
      harder: "Wide-grip pull-up.",
    },
    E4: {
      why: "Arms behind the body stretch the long head of the biceps — more range, more growth.",
      mistakes: [
        "Elbows drifting forward at the top.",
        "Swinging the dumbbells up.",
      ],
      easier: "Preacher curl machine.",
      harder: "Incline curl with a 3 s negative.",
    },
    E5: {
      why: "The overhead position loads the triceps long head, the biggest of the three.",
      mistakes: [
        "Elbows flaring wide.",
        "Half reps that never reach the stretch.",
      ],
      easier: "Single-arm dumbbell overhead extension.",
      harder: "EZ-bar overhead extension.",
    },
    E6: {
      why: "Fills the gap between shoulders and traps — a big part of how thick a back reads from the front.",
      mistakes: [
        "Using momentum from the torso.",
        "Bending the elbows into a row.",
      ],
      easier: "Band pull-apart.",
      harder: "Reverse pec deck, heavier, 1 s hold.",
    },
    E7: {
      why: "Decompresses the spine, builds grip endurance and keeps the shoulders mobile.",
      mistakes: [
        "Shrugging up toward the ears.",
        "Holding your breath.",
      ],
      easier: "Feet-supported hang.",
      harder: "Weighted hang.",
    },
  };

  /* ── Static reference panels ───────────────────────────────── */
  const CONTENT = {
    howto: {
      eyebrow: "Start here",
      title: "How to use this page",
      html: `
        <p>The plan is five sessions in a fixed order. You don't need to know what day of the week it is — just which letter is next.</p>
        <div class="detail-section">
          <p class="eyebrow">The loop</p>
          <ul class="detail-list">
            <li>Walk in, open <strong>Contents</strong>, tap the next session.</li>
            <li>Do the warm-up, then the exercises top to bottom. Compounds first, always.</li>
            <li>Log the weight and tap the set number as you finish each set.</li>
            <li>Next time, the numbers are still there. Add weight when the rule says so.</li>
          </ul>
        </div>
        <div class="detail-section">
          <p class="eyebrow">The buttons</p>
          <ul class="detail-list">
            <li><strong>Contents</strong> jumps to any session, the rotation, progression, the back playbook or the appendix.</li>
            <li><strong>i</strong> on any exercise opens form notes, common mistakes, and easier/harder swaps.</li>
            <li><strong>Reset</strong> in the top bar clears every logged set. Individual sessions have their own reset at the bottom.</li>
            <li><strong>Print</strong> gives you a clean paper version if you'd rather not use your phone.</li>
          </ul>
        </div>
        <div class="detail-section">
          <p class="eyebrow">The briefing</p>
          <p class="text-[13px] text-soft">The sessions stay locked until you acknowledge the six rules on the first screen. You can reopen that briefing any time from Contents — it stays on the page.</p>
        </div>
        <div class="detail-section">
          <p class="eyebrow">Where the data lives</p>
          <p class="text-[13px] text-soft">Everything is stored in this browser only — no account, no server. Clearing site data or using private mode will wipe it.</p>
        </div>`,
    },

    rir: {
      eyebrow: "Autoregulation",
      title: "Reps in Reserve (RIR)",
      html: `
        <p>RIR is how many clean reps you had left when you stopped the set. It's the difference between training hard and training yourself into the ground.</p>
        <div class="detail-section">
          <p class="eyebrow">How to judge it</p>
          <ul class="detail-list">
            <li><strong>RIR 4</strong> — could have done four more. Feels easy. Weeks 1–2 only.</li>
            <li><strong>RIR 2</strong> — bar speed slowing, form still perfect. This is where most work happens.</li>
            <li><strong>RIR 1</strong> — one rep left, and you know it. Isolation work.</li>
            <li><strong>RIR 0</strong> — nothing left. Week 8 test only.</li>
          </ul>
        </div>
        <div class="detail-section">
          <p class="eyebrow">The honest test</p>
          <p class="text-[13px] text-soft">If your form changes — back rounds, knees cave, bar path drifts — the set is over, whatever number you had in mind. Technique failure is real failure.</p>
        </div>
        <div class="detail-section">
          <p class="eyebrow">Why not just go to failure?</p>
          <p class="text-[13px] text-soft">Failure costs far more recovery than it returns in stimulus. On a 5-day rotation you can't afford to be wrecked for two days after every session.</p>
        </div>`,
    },

    tempo: {
      eyebrow: "Notation",
      title: "Tempo: 3-1-1-0",
      html: `
        <p>Four numbers, in seconds, in this order:</p>
        <div class="detail-section">
          <ul class="detail-list">
            <li><strong>3</strong> — lowering the weight (eccentric).</li>
            <li><strong>1</strong> — pause in the stretched position.</li>
            <li><strong>1</strong> — driving the weight up (concentric).</li>
            <li><strong>0</strong> — rest at the top before the next rep.</li>
          </ul>
        </div>
        <div class="detail-section">
          <p class="eyebrow">Why bother</p>
          <p class="text-[13px] text-soft">Tempo keeps the set honest when the weight is light. It also stops you from bouncing, which is how most people get hurt and how most reps get wasted.</p>
        </div>
        <div class="detail-section">
          <p class="eyebrow">If no tempo is written</p>
          <p class="text-[13px] text-soft">Control the negative for about 2 s and don't let the stack drop. That's it.</p>
        </div>`,
    },

    block: {
      eyebrow: "Programme",
      title: "How the 8-week block works",
      html: `
        <p>One block is eight weeks of the same five sessions, with the loading rules changing.</p>
        <div class="detail-section">
          <ul class="detail-list">
            <li><strong>Weeks 1–2 — Technique.</strong> RIR 3–4, technique first, log everything.</li>
            <li><strong>Weeks 3–6 — Build.</strong> RIR 2, double progression: reps first, then weight.</li>
            <li><strong>Week 7 — Deload.</strong> Same weights, half the sets. No sets near failure.</li>
            <li><strong>Week 8 — Test.</strong> One top set to technical failure on the five main lifts.</li>
          </ul>
        </div>
        <div class="detail-section">
          <p class="eyebrow">What the test actually does</p>
          <p class="text-[13px] text-soft">It gives you a real number to recalculate working weights from, instead of guessing. Take the reps you hit, estimate your 5-rep max, and start the next block at 75–80% of it. That lands you 2.5–5 kg heavier than last block.</p>
        </div>
        <div class="detail-section">
          <p class="eyebrow">When to deload early</p>
          <p class="text-[13px] text-soft">Three sessions in a row where everything feels heavy, joints ache, or you're sleeping badly. Take the deload week — you'll come back stronger than if you pushed through.</p>
        </div>`,
    },
  };

  /* ── Print ──────────────────────────────────────────────────── */
  document.querySelectorAll("[data-print]").forEach((btn) => {
    btn.addEventListener("click", () => window.print());
  });

  /* ── Year stamp ─────────────────────────────────────────────── */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ── Storage ────────────────────────────────────────────────── */
  const ACK_KEY = "james-plan-read-v1";
  const blank = () => ({ weights: {}, done: {} });

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
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

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* Private mode or full storage: tracker still works for this session */
    }
  }

  function readAck() {
    try {
      return localStorage.getItem(ACK_KEY) === "1";
    } catch {
      return false;
    }
  }

  function writeAck() {
    try {
      localStorage.setItem(ACK_KEY, "1");
    } catch {
      /* the unlock still applies for this visit */
    }
  }

  const state = load();
  const exercises = Array.from(document.querySelectorAll("[data-ex]"));
  const sessions = Array.from(document.querySelectorAll("[data-session]"));

  /* ── Tracker ────────────────────────────────────────────────── */
  exercises.forEach((card) => {
    const id = card.dataset.ex;
    const input = card.querySelector("[data-weight]");
    const dots = Array.from(card.querySelectorAll("[data-set]"));

    if (!Array.isArray(state.done[id])) state.done[id] = [];

    if (input && state.weights[id] != null) input.value = String(state.weights[id]);
    dots.forEach((dot, i) => {
      dot.dataset.done = state.done[id][i] ? "true" : "false";
      dot.setAttribute("aria-pressed", state.done[id][i] ? "true" : "false");
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        const next = !state.done[id][i];
        state.done[id][i] = next;
        dot.dataset.done = next ? "true" : "false";
        dot.setAttribute("aria-pressed", next ? "true" : "false");
        save(state);
        render();
      });
    });

    if (input) {
      const persist = () => {
        const v = input.value.trim();
        if (v === "") delete state.weights[id];
        else state.weights[id] = Number(v);
        save(state);
      };
      input.addEventListener("input", persist);
      input.addEventListener("change", persist);
    }
  });

  function render() {
    let totalDone = 0;
    let totalSets = 0;

    sessions.forEach((section) => {
      const letter = section.dataset.session;
      let done = 0;
      let total = 0;

      section.querySelectorAll("[data-ex]").forEach((card) => {
        const id = card.dataset.ex;
        const dots = card.querySelectorAll("[data-set]");
        total += dots.length;
        dots.forEach((dot, i) => {
          if (state.done[id] && state.done[id][i]) done += 1;
        });
      });

      totalDone += done;
      totalSets += total;

      const pct = total ? Math.round((done / total) * 100) : 0;
      const bar = section.querySelector("[data-progress-bar]");
      const text = section.querySelector("[data-progress-text]");

      if (bar) bar.style.width = pct + "%";
      if (text) {
        text.textContent = done + " / " + total;
        text.classList.toggle("text-lime", pct === 100);
      }

      const tab = document.querySelector('[data-tab="' + section.id + '"]');
      if (tab) tab.dataset.complete = pct === 100 ? "true" : "false";

      const sumBar = document.querySelector('[data-summary-bar="' + letter + '"]');
      const sumText = document.querySelector('[data-summary-text="' + letter + '"]');
      if (sumBar) sumBar.style.width = pct + "%";
      if (sumText) {
        sumText.textContent = done + " / " + total;
        sumText.classList.toggle("text-lime", pct === 100);
      }
    });

    document.querySelectorAll("[data-week-label]").forEach((el) => {
      if (totalDone === 0) {
        el.textContent = "0 sets logged";
      } else if (totalDone === totalSets) {
        el.textContent = "block complete · " + totalDone + " sets";
      } else {
        el.textContent = totalDone + " of " + totalSets + " sets logged";
      }
    });
  }

  /* ── Reset ──────────────────────────────────────────────────── */
  document.querySelectorAll("[data-reset-session]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.resetSession;
      exercises.forEach((card) => {
        if (!card.dataset.ex.startsWith(key)) return;
        card.querySelectorAll("[data-set]").forEach((dot) => {
          dot.dataset.done = "false";
          dot.setAttribute("aria-pressed", "false");
        });
        delete state.done[card.dataset.ex];
      });
      save(state);
      render();
    });
  });

  document.querySelectorAll("[data-reset-all]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const ok = window.confirm(
        "Clear every logged set and every saved weight? This can't be undone.",
      );
      if (!ok) return;
      state.done = {};
      state.weights = {};
      exercises.forEach((card) => {
        card.querySelectorAll("[data-set]").forEach((dot) => {
          dot.dataset.done = "false";
          dot.setAttribute("aria-pressed", "false");
        });
        const input = card.querySelector("[data-weight]");
        if (input) input.value = "";
      });
      save(state);
      render();
    });
  });

  /* ── Sheets (detail + contents) ─────────────────────────────── */
  function makeSheet(dialog) {
    let timer = null;

    function open() {
      if (!dialog) return;
      clearTimeout(timer);
      if (!dialog.open) dialog.showModal();
      requestAnimationFrame(() => dialog.classList.add("is-open"));
      document.documentElement.style.overflow = "hidden";
    }

    function close(immediate = false) {
      return new Promise((resolve) => {
        if (!dialog || !dialog.open) return resolve();
        dialog.classList.remove("is-open");
        document.documentElement.style.overflow = "";
        clearTimeout(timer);
        if (immediate) {
          dialog.close();
          return resolve();
        }
        timer = setTimeout(() => {
          dialog.close();
          resolve();
        }, 260);
      });
    }

    if (dialog) {
      dialog.addEventListener("cancel", (e) => {
        e.preventDefault();
        close();
      });
      dialog.addEventListener("mousedown", (e) => {
        if (e.target === dialog) close();
      });
      dialog.addEventListener("keydown", (e) => {
        if (e.key !== "Tab") return;
        const focusables = dialog.querySelectorAll(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      });
    }

    return { open, close };
  }

  /* ── Detail sheet ───────────────────────────────────────────── */
  const detailDialog = document.getElementById("detail");
  const detailBody = detailDialog ? detailDialog.querySelector(".detail-scroll") : null;
  const detailTitle = document.getElementById("detail-title");
  const detailEyebrow = document.getElementById("detail-eyebrow");
  const detailSheet = makeSheet(detailDialog);
  let lastFocus = null;

  document.querySelectorAll("[data-detail]").forEach((trigger) => {
    trigger.setAttribute("aria-haspopup", "dialog");
  });
  document.querySelectorAll("[data-progress-text]").forEach((el) => {
    el.setAttribute("aria-live", "polite");
  });

  const esc = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[c]);

  function exerciseHtml(card, ref) {
    const meta = card.querySelector(".ex-meta");
    const metaHtml = meta ? meta.outerHTML : "";
    const name = card.querySelector(".ex-title").textContent.trim();
    const query = encodeURIComponent(name + " form");

    return (
      '<div class="font-mono text-[11px] text-mute">' + metaHtml + "</div>" +
      '<div class="detail-section"><p class="eyebrow">Why it\'s here</p>' +
      '<p class="mt-1 text-[13px] leading-relaxed text-soft">' + esc(ref.why) + "</p></div>" +
      '<div class="detail-section"><p class="eyebrow">Common mistakes</p>' +
      '<ul class="detail-list">' + ref.mistakes.map((m) => "<li>" + esc(m) + "</li>").join("") + "</ul></div>" +
      '<div class="detail-section"><p class="eyebrow">Adjustments</p><div class="mt-1.5 grid gap-2">' +
      '<div class="flex gap-2.5 text-[13px] leading-relaxed"><span class="shrink-0 font-mono text-[10px] uppercase tracking-wider text-mute">Easier</span><span class="text-soft">' + esc(ref.easier) + "</span></div>" +
      '<div class="flex gap-2.5 text-[13px] leading-relaxed"><span class="shrink-0 font-mono text-[10px] uppercase tracking-wider text-mute">Harder</span><span class="text-soft">' + esc(ref.harder) + "</span></div>" +
      "</div></div>" +
      '<div class="detail-section"><a class="detail-video" href="https://www.youtube.com/results?search_query=' + query + '" target="_blank" rel="noopener">Watch form videos' +
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg></a></div>'
    );
  }

  function openDetail(eyebrow, title, html) {
    if (!detailDialog) return;
    lastFocus = document.activeElement;
    detailEyebrow.textContent = eyebrow;
    detailTitle.textContent = title;
    detailBody.innerHTML = html;
    detailBody.scrollTop = 0;
    detailSheet.open();
  }

  document.querySelectorAll("[data-detail]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const key = trigger.dataset.detail;

      if (key.startsWith("ex:")) {
        const id = key.slice(3);
        const card = document.querySelector('[data-ex="' + id + '"]');
        const ref = EX[id];
        if (!card || !ref) return;
        const section = card.closest("[data-session]");
        openDetail(
          "Exercise · Session " + (section ? section.dataset.session : ""),
          card.querySelector(".ex-title").textContent.trim(),
          exerciseHtml(card, ref),
        );
        return;
      }

      const content = CONTENT[key];
      if (!content) return;
      openDetail(content.eyebrow, content.title, content.html);
    });
  });

  if (detailDialog) {
    detailDialog.querySelector("[data-detail-close]").addEventListener("click", () => {
      detailSheet.close();
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    });
  }

  /* ── Contents sheet ─────────────────────────────────────────── */
  const tocDialog = document.getElementById("toc");
  const tocSheet = makeSheet(tocDialog);
  const tocLinks = Array.from(document.querySelectorAll("[data-toc-link]"));

  document.querySelectorAll("[data-toc-open]").forEach((btn) => {
    btn.addEventListener("click", () => tocSheet.open());
  });

  if (tocDialog) {
    tocDialog.querySelector("[data-toc-close]").addEventListener("click", () => tocSheet.close());
  }

  /* ── Read-first gate ────────────────────────────────────────── */
  const ackBtn = document.querySelector("[data-ack]");
  const ackState = document.querySelector("[data-ack-state]");
  const startLink = document.querySelector("[data-start]");
  const startLabel = document.querySelector("[data-start-label]");

  function applyGate(acked) {
    const tocNote = document.querySelector("[data-toc-note]");
    if (tocNote) tocNote.hidden = acked;

    if (startLink) {
      startLink.setAttribute("href", acked ? "#session-a" : "#read-first");
    }
    if (startLabel) {
      startLabel.textContent = acked ? "Start with Session A" : "Read the briefing";
    }
    if (ackBtn) ackBtn.style.display = acked ? "none" : "";
    if (ackState) ackState.style.display = acked ? "flex" : "none";
  }

  function acknowledge({ scroll = true } = {}) {
    writeAck();
    applyGate(true);
    if (scroll) {
      window.setTimeout(() => {
        const target = document.getElementById("session-a");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }

  if (ackBtn) ackBtn.addEventListener("click", () => acknowledge());


  /* ── Contents navigation ────────────────────────────────────── */
  tocLinks.forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      const target = document.querySelector(href);
      if (!target) return;

      await tocSheet.close(true);

      // Contents jumps instantly: smooth scrolling across 13,000 px feels broken.
      jumpTo(target);
      history.replaceState(null, "", href);
    });
  });

  function jumpTo(el) {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo(0, Math.max(0, top));
    root.style.scrollBehavior = prev;
    updateActive();
  }

  /* ── Calculators ────────────────────────────────────────────── */
  const calcRoot = document.getElementById("calculators");

  if (calcRoot && window.Calc) {
    const field = (name) => calcRoot.querySelector('[data-calc="' + name + '"]');
    const out = (name) => calcRoot.querySelector('[data-out="' + name + '"]');
    const num = (name) => {
      const el = field(name);
      return el ? Number(el.value) : NaN;
    };
    const fmt = (n, digits = 0) =>
      n == null || !Number.isFinite(n)
        ? "—"
        : n.toLocaleString("en-GB", {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits,
          });
    const set = (name, text) => {
      const el = out(name);
      if (!el) return;
      el.textContent = text;
      el.classList.toggle("text-faint", text === "—");
    };

    function updateCalcs() {
      const oneRM = Calc.estimate1RM(num("orm-weight"), num("orm-reps"));
      set("orm", oneRM ? fmt(oneRM, 1) : "—");

      [85, 80, 75, 70].forEach((pct) => {
        const weight = oneRM ? Calc.roundTo((oneRM * pct) / 100, 2.5) : null;
        set("orm-" + pct, weight ? fmt(weight, 1) + " kg" : "—");
      });

      const bmr = Calc.bmrMifflin({
        sex: field("sex") ? field("sex").value : "male",
        weightKg: num("weight"),
        heightCm: num("height"),
        age: num("age"),
      });
      const tdeeValue = bmr ? Calc.tdee(bmr, field("activity") ? field("activity").value : 1.55) : null;
      const protein = Calc.proteinRange(num("weight"));
      const surplus = tdeeValue ? Calc.leanGainCalories(tdeeValue) : null;

      set("bmr", bmr ? fmt(Math.round(bmr / 5) * 5) : "—");
      set("tdee", tdeeValue ? fmt(Math.round(tdeeValue / 10) * 10) : "—");
      set("surplus", surplus ? fmt(Math.round(surplus / 10) * 10) : "—");
      set("protein", protein ? fmt(protein.min) + "–" + fmt(protein.max) : "—");
    }

    calcRoot.querySelectorAll("[data-calc]").forEach((el) => {
      el.addEventListener("input", updateCalcs);
      el.addEventListener("change", updateCalcs);
    });

    updateCalcs();
  }

  /* ── Scroll spy ─────────────────────────────────────────────── */
  const spyTargets = Array.from(
    new Set(tocLinks.map((l) => l.getAttribute("href").slice(1))),
  )
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  let spyQueued = false;

  function updateActive() {
    if (!spyTargets.length) return;

    const offset = 140;
    let current = spyTargets[0].id;

    spyTargets.forEach((section) => {
      if (section.getBoundingClientRect().top <= offset) current = section.id;
    });

    const atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 8;
    if (atBottom) current = spyTargets[spyTargets.length - 1].id;

    tocLinks.forEach((link) => {
      link.setAttribute(
        "aria-current",
        link.getAttribute("href") === "#" + current ? "true" : "false",
      );
    });

    document.querySelectorAll("[data-tab]").forEach((tab) => {
      tab.setAttribute("aria-current", tab.dataset.tab === current ? "true" : "false");
    });
  }

  function queueSpy() {
    if (spyQueued) return;
    spyQueued = true;
    requestAnimationFrame(() => {
      spyQueued = false;
      updateActive();
    });
  }

  window.addEventListener("scroll", queueSpy, { passive: true });
  window.addEventListener("resize", queueSpy);

  /* ── Init ───────────────────────────────────────────────────── */
  let deepLink = null;

  if (location.hash && location.hash.length > 1) {
    try {
      deepLink = document.querySelector(location.hash);
    } catch {
      /* malformed hash */
    }
  }

  applyGate(readAck());
  render();
  updateActive();

  if (deepLink) {
    requestAnimationFrame(() => jumpTo(deepLink));
  }
})();
