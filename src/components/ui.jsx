import { toneOf } from "../lib/tones.js";

export function Eyebrow({ children, className = "" }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function Section({ id, band = false, className = "", children }) {
  return (
    <section id={id} className={`${band ? "border-y border-line bg-panel-2/60" : ""} ${className}`}>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, lead, actions, className = "" }) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-2.5 text-[1.65rem] font-bold leading-tight sm:text-[2rem]">{title}</h2>
          {lead ? <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-soft">{lead}</p> : null}
        </div>
        {actions}
      </div>
    </div>
  );
}

export function Card({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag className={`card ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export function Chip({ children, className = "", as: Tag = "span", ...rest }) {
  return (
    <Tag className={`chip ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export function Dot({ tone = "lime", className = "" }) {
  return <span className={`h-2 w-2 shrink-0 rounded-full ${toneOf(tone).dot} ${className}`} />;
}

export function Stat({ label, value, suffix, accent = false }) {
  return (
    <div className="stat">
      <dt className="eyebrow text-[10px]">{label}</dt>
      <dd
        className={`mt-1 flex items-baseline gap-1.5 font-display text-[1.4rem] font-bold leading-none sm:mt-1.5 sm:text-[1.75rem] ${
          accent ? "text-lime" : ""
        }`}
      >
        {value}
        {suffix ? <span className="font-sans text-[11px] font-normal text-mute">{suffix}</span> : null}
      </dd>
    </div>
  );
}

export function RuleCard({ n, title, children }) {
  return (
    <Card className="p-4 sm:p-5">
      <span className="num">{n}</span>
      <h3 className="mt-1.5 text-[15px] font-semibold text-chalk">{title}</h3>
      <p className="mt-1 text-[13px] leading-relaxed text-dim">{children}</p>
    </Card>
  );
}

const CALLOUT_TONES = {
  lime: "border-lime/30 bg-[radial-gradient(120%_100%_at_0%_0%,rgba(216,255,71,0.28),transparent_65%)]",
  ember: "border-ember/25 bg-ember/[0.04]",
  plain: "bg-panel-2",
};

export function Callout({ tone = "lime", className = "", children }) {
  return (
    <div className={`card ${CALLOUT_TONES[tone] ?? CALLOUT_TONES.lime} ${className}`}>{children}</div>
  );
}

export function MonoMeta({ prescription, notes = [] }) {
  return (
    <div className="ex-meta">
      <span className="prescription">{prescription}</span>
      {notes.map((note) => (
        <span key={note} className="flex items-center gap-2.5">
          <span className="sep">·</span>
          <span>{note}</span>
        </span>
      ))}
    </div>
  );
}

export function BulletList({ items, marker = "→", className = "" }) {
  return (
    <ul className={`space-y-2 text-[13px] leading-relaxed text-soft ${className}`}>
      {items.map((item) => (
        <li key={typeof item === "string" ? item : item.key} className="flex gap-2.5">
          <span className="shrink-0 text-lime">{marker}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
