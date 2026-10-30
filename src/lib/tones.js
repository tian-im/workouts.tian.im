/** Session accent tokens. Static strings so Tailwind can see every class. */

export const TONES = {
  ember: { dot: "bg-ember", bar: "bg-ember", text: "text-ember" },
  sand: { dot: "bg-sand", bar: "bg-sand", text: "text-sand" },
  lime: { dot: "bg-lime", bar: "bg-lime", text: "text-lime" },
  ice: { dot: "bg-ice", bar: "bg-ice", text: "text-ice" },
  violet: { dot: "bg-violet", bar: "bg-violet", text: "text-violet" },
};

export const toneOf = (name) => TONES[name] ?? TONES.lime;
