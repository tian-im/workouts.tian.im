import { useTracker } from "../state/TrackerContext.jsx";
import { MonoMeta } from "./ui.jsx";

/** One exercise: prescription, cue, weight input and set toggles. */
export default function ExerciseCard({ exercise, index, onOpenDetails }) {
  const { state, toggleSet, setWeight, resetToken } = useTracker();
  const marks = state.done[exercise.id] || [];
  const storedWeight = state.weights[exercise.id];

  return (
    <article className="ex-card" data-ex={exercise.id}>
      <div className="flex gap-2.5">
        <span className="ex-num">{String(index + 1).padStart(2, "0")}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="ex-title">{exercise.name}</h3>
            <button
              type="button"
              className="ex-more no-print"
              data-detail={`ex:${exercise.id}`}
              aria-label={`${exercise.name} — details`}
              aria-haspopup="dialog"
              onClick={() => onOpenDetails(exercise.id)}
            >
              i
            </button>
          </div>

          <p className="ex-cue">{exercise.cue}</p>
          <MonoMeta prescription={exercise.prescription} notes={exercise.notes} />
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
