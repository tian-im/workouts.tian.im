import { useTracker } from "../state/TrackerContext.jsx";
import { youtubeSearch } from "../lib/links.js";
import { VARIATIONS } from "../data/variations.js";
import { MonoMeta } from "./ui.jsx";
import { ExternalIcon } from "./icons.jsx";

/** One exercise: prescription, cue, weight input and set toggles. */
export default function ExerciseCard({ exercise, index, onStartRest }) {
  const { state, toggleSet, setWeight, resetToken } = useTracker();
  const marks = state.done[exercise.id] || [];
  const storedWeight = state.weights[exercise.id];
  const variations = VARIATIONS[exercise.id];

  return (
    <article className="ex-card" data-ex={exercise.id}>
      <div className="flex gap-2.5">
        <span className="ex-num">{String(index + 1).padStart(2, "0")}</span>
        <div className="min-w-0 flex-1">
          <h3 className="ex-title">
            <a
              className="underline decoration-transparent decoration-1 underline-offset-[3px] transition-colors hover:decoration-line"
              href={youtubeSearch(exercise.name)}
              target="_blank"
              rel="noopener"
              aria-label={`${exercise.name} — watch form videos on YouTube`}
            >
              {exercise.name}
              <span className="ml-1.5 inline-block align-baseline text-faint">
                <ExternalIcon size={11} />
              </span>
            </a>
          </h3>

          <MonoMeta
            prescription={exercise.prescription}
            notes={exercise.notes}
            onStartRest={
              onStartRest ? (seconds) => onStartRest(seconds, exercise.name) : undefined
            }
          />

          {variations ? (
            <div className="ex-variations">
              <span className="ex-var">
                <span className="ex-var-label ex-var-prog">Prog</span>
                <span>{variations.prog}</span>
              </span>
              <span className="ex-var">
                <span className="ex-var-label">Reg</span>
                <span>{variations.reg}</span>
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="ex-track">
        <div className="flex items-center gap-1.5">
          <input
            key={`${exercise.id}-${resetToken}`}
            className="weight-input"
            type="number"
            inputMode="decimal"
            min="0"
            step={exercise.step}
            placeholder={exercise.placeholder}
            defaultValue={storedWeight ?? ""}
            aria-label={`Working weight in kilograms for ${exercise.name}`}
            data-weight
            onInput={(event) => setWeight(exercise.id, event.target.value)}
          />
          <span className="font-mono text-[11px] text-mute">kg</span>
        </div>

        <div className="flex gap-1.5" role="group" aria-label={`${exercise.name} sets`}>
          {Array.from({ length: exercise.sets }, (_, i) => (
            <button
              key={i}
              type="button"
              className="set-dot"
              data-set={i + 1}
              data-done={marks[i] ? "true" : "false"}
              aria-pressed={marks[i] ? "true" : "false"}
              aria-label={`Set ${i + 1}`}
              onClick={() => toggleSet(exercise.id, i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
