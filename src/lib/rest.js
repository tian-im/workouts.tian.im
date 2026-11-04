/** Rest prescription helpers and the completion chime. */

/** "rest 3 min" → 180, "rest 90 s" → 90, "rest 3–4 min" → 210 (midpoint). */
export function parseRestSeconds(note) {
  const match = String(note).match(/^rest\s+(\d+)\s*(?:[–-]\s*(\d+))?\s*(min|s)\b/i);
  if (!match) return null;

  const low = Number(match[1]);
  const high = match[2] ? Number(match[2]) : low;
  const unit = match[3].toLowerCase();
  return Math.round(((low + high) / 2) * (unit === "min" ? 60 : 1));
}

export function formatClock(totalSeconds) {
  const seconds = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

let audioContext = null;

/** Must be called from a user gesture so the browser lets us ring later. */
export function primeAudio() {
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return null;
  if (!audioContext) audioContext = new Ctor();
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

export function playChime() {
  const ctx = primeAudio();
  if (!ctx) return;

  const now = ctx.currentTime;

  [0, 0.34, 0.68].forEach((offset, index) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = now + offset;

    oscillator.type = "sine";
    oscillator.frequency.value = [880, 988, 1174.7][index];

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.28, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.3);

    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.32);
  });
}
