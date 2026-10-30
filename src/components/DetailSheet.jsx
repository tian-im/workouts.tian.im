import { PANELS } from "../data/panels.js";
import { EX } from "../data/details.js";
import { SESSIONS } from "../data/plan.js";
import { MonoMeta } from "./ui.jsx";
import { ExternalIcon } from "./icons.jsx";
import Sheet from "./Sheet.jsx";

function groupBlocks(blocks) {
  const groups = [];
  let current = { title: null, items: [] };

  for (const block of blocks) {
    if (block.t === "h") {
      if (current.title || current.items.length) groups.push(current);
      current = { title: block.text, items: [] };
    } else {
      current.items.push(block);
    }
  }
  if (current.title || current.items.length) groups.push(current);
  return groups;
}

function Blocks({ blocks }) {
  return groupBlocks(blocks).map((group, index) => (
    <div key={group.title ?? `intro-${index}`} className={index === 0 ? "" : "detail-section"}>
      {group.title ? <p className="eyebrow">{group.title}</p> : null}
      {group.items.map((item, i) => {
        if (item.t === "list") {
          return (
            <ul key={`list-${i}`} className="detail-list">
              {item.items.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={`p-${i}`} className="mt-1.5 text-[13px] leading-relaxed text-soft">
            {item.text}
          </p>
        );
      })}
    </div>
  ));
}

function findExercise(id) {
  for (const session of SESSIONS) {
    const index = session.exercises.findIndex((exercise) => exercise.id === id);
    if (index >= 0) {
      return { session, exercise: session.exercises[index], index };
    }
  }
  return null;
}

export default function DetailSheet({ selection, onClose }) {
  const isExercise = selection?.kind === "exercise";
  const found = isExercise ? findExercise(selection.id) : null;
  const ref = isExercise && found ? EX[selection.id] : null;
  const panel = selection?.kind === "panel" ? PANELS[selection.key] : null;

  const title = isExercise ? found?.exercise.name ?? "Exercise" : panel?.title ?? "";
  const eyebrow = isExercise
    ? `Exercise · Session ${found?.session.letter ?? ""}`
    : panel?.eyebrow ?? "";

  return (
    <Sheet open={Boolean(selection)} eyebrow={eyebrow} title={title} labelledBy="detail-title" onClose={onClose}>
      {isExercise && found && ref ? (
        <>
          <MonoMeta prescription={found.exercise.prescription} notes={found.exercise.notes} />

          <div className="detail-section">
            <p className="eyebrow">Why it's here</p>
            <p className="mt-1 text-[13px] leading-relaxed text-soft">{ref.why}</p>
          </div>

          <div className="detail-section">
            <p className="eyebrow">Common mistakes</p>
            <ul className="detail-list">
              {ref.mistakes.map((mistake) => (
                <li key={mistake}>{mistake}</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <p className="eyebrow">Adjustments</p>
            <div className="mt-1.5 grid gap-2">
              <div className="flex gap-2.5 text-[13px] leading-relaxed">
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-mute">Easier</span>
                <span className="text-soft">{ref.easier}</span>
              </div>
              <div className="flex gap-2.5 text-[13px] leading-relaxed">
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-mute">Harder</span>
                <span className="text-soft">{ref.harder}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <a
              className="detail-video"
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${found.exercise.name} form`)}`}
              target="_blank"
              rel="noopener"
            >
              Watch form videos
              <ExternalIcon />
            </a>
          </div>
        </>
      ) : panel ? (
        <Blocks blocks={panel.blocks} />
      ) : null}
    </Sheet>
  );
}
