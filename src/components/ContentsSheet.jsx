import { useRef } from "react";
import { TOC_GROUPS } from "../data/plan.js";
import { jumpTo } from "../lib/nav.js";
import { toneOf } from "../lib/tones.js";
import Sheet from "./Sheet.jsx";

export default function ContentsSheet({ open, onClose, active, acked, progressLabel, onPrint }) {
  const sheetRef = useRef(null);

  const go = (id) => {
    // Close instantly so the jump is not blocked by the modal.
    sheetRef.current?.closeNow();
    onClose();
    jumpTo(id);
  };

  return (
    <Sheet
      ref={sheetRef}
      open={open}
      side="left"
      eyebrow="Jump to"
      title="Contents"
      labelledBy="toc-title"
      onClose={onClose}
      footer={
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] text-mute">{progressLabel}</span>
          <button
            type="button"
            onClick={onPrint}
            className="no-print font-mono text-[10px] uppercase tracking-wider text-mute transition-colors hover:text-chalk"
          >
            Print
          </button>
        </div>
      }
    >
      {!acked ? (
        <p className="mx-3 mb-2 rounded-lg bg-panel-2 px-3 py-2 text-[11.5px] leading-relaxed text-soft">
          New here? The two-minute briefing at the top is worth reading first. Nothing is locked.
        </p>
      ) : null}

      {TOC_GROUPS.map((group) => (
        <div key={group.label} className="mb-1">
          <p className="eyebrow px-3 pb-1 pt-3">{group.label}</p>
          {group.items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="toc-link"
              data-toc-link
              aria-current={active === item.id ? "true" : "false"}
              onClick={(event) => {
                event.preventDefault();
                go(item.id);
              }}
            >
              {item.accent ? (
                <span className={`h-1.5 w-1.5 rounded-full ${toneOf(item.accent).dot}`} aria-hidden="true" />
              ) : null}
              {item.label}
            </a>
          ))}
        </div>
      ))}
    </Sheet>
  );
}
