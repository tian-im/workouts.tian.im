import { MenuIcon, PrintIcon } from "./icons.jsx";

export default function Header({ onOpenContents, onPrint }) {
  return (
    <header className="relative z-20 border-b border-line/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="/" className="group flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-chalk text-[13px] font-bold text-white">
            J
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-mute transition-colors group-hover:text-chalk min-[400px]:inline sm:text-[11px]">
            workouts.tian.im
          </span>
        </a>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onOpenContents}
            data-toc-open
            aria-haspopup="dialog"
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-line px-3 text-xs font-medium text-dim transition-colors hover:border-faint hover:text-chalk"
          >
            <MenuIcon />
            Contents
          </button>
          <button
            type="button"
            onClick={onPrint}
            data-print
            className="no-print inline-flex h-9 items-center gap-2 rounded-lg border border-line px-3 text-xs font-medium text-dim transition-colors hover:border-faint hover:text-chalk"
          >
            <PrintIcon />
            Print
          </button>
        </div>
      </div>
    </header>
  );
}
