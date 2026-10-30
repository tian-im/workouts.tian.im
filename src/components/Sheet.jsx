import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { CloseIcon } from "./icons.jsx";

/**
 * Base modal sheet. Renders a bottom sheet on phones and a side drawer on
 * desktop (side="left" for Contents, side="right" for exercise details).
 */
const Sheet = forwardRef(function Sheet(
  { open, side = "right", eyebrow, title, labelledBy = "sheet-title", onClose, footer, children },
  ref,
) {
  const dialogRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      closeNow() {
        const dialog = dialogRef.current;
        if (!dialog) return;
        dialog.classList.remove("is-open");
        if (dialog.open) dialog.close();
        document.documentElement.style.overflow = "";
      },
    }),
    [],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    if (open) {
      if (!dialog.open) dialog.showModal();
      const frame = requestAnimationFrame(() => dialog.classList.add("is-open"));
      document.documentElement.style.overflow = "hidden";
      return () => cancelAnimationFrame(frame);
    }

    if (dialog.open) {
      dialog.classList.remove("is-open");
      const timer = setTimeout(() => {
        dialog.close();
        document.documentElement.style.overflow = "";
      }, 260);
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [open]);

  useEffect(
    () => () => {
      document.documentElement.style.overflow = "";
    },
    [],
  );

  return (
    <dialog
      ref={dialogRef}
      className={`detail-dialog ${side === "left" ? "toc-dialog" : ""}`}
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={`detail-sheet ${side === "left" ? "toc-sheet" : ""}`}>
        <div className="detail-grip" aria-hidden="true">
          <span />
        </div>

        <div className="flex items-start justify-between gap-3 px-4 pb-3 pt-3 sm:px-6 sm:pt-5">
          <div className="min-w-0">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h2 id={labelledBy} className="mt-1 font-display text-[1.25rem] font-bold leading-tight">
              {title}
            </h2>
          </div>
          <button type="button" className="detail-close no-print" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <div className="detail-scroll" tabIndex={-1}>
          {children}
        </div>

        {footer ? (
          <div className="sheet-footer border-t border-line px-4 pt-3 sm:px-6">{footer}</div>
        ) : null}
      </div>
    </dialog>
  );
});

export default Sheet;
