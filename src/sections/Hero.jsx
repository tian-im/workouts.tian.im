import { Chip, Stat } from "../components/ui.jsx";
import { ArrowDownIcon } from "../components/icons.jsx";

export default function Hero({ acked, onStart, onOpenPanel }) {
  return (
    <section id="summary" className="mx-auto max-w-5xl px-4 pb-8 pt-8 sm:px-6 sm:pt-14">
      <p className="eyebrow">For James · Full gym</p>

      <h1 className="mt-3 max-w-3xl text-[1.85rem] font-extrabold leading-[1.02] sm:mt-4 sm:text-5xl lg:text-[3.5rem]">
        Build a back that shows up <span className="marker">in a t-shirt.</span>
      </h1>

      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-body sm:mt-5 sm:text-base">
        Compound first, five rolling days, three of them built for a thicker back.
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
        <Chip>
          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          5-day rotation
        </Chip>
        <Chip>60–90 min</Chip>
        <Chip>kg</Chip>
        <Chip className="hidden sm:inline-flex">8-week block</Chip>
      </div>

      <div className="no-print mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 sm:mt-7 sm:gap-2.5">
        <a
          href={acked ? "#session-a" : "#read-first"}
          data-start
          onClick={(event) => {
            event.preventDefault();
            onStart();
          }}
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-chalk px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#2b3138]"
        >
          <span data-start-label>{acked ? "Start with Session A" : "Read the briefing"}</span>
          <ArrowDownIcon />
        </a>
        <button
          type="button"
          onClick={() => onOpenPanel("howto")}
          className="inline-flex h-11 items-center gap-1 text-[13px] font-medium text-dim underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-chalk sm:rounded-lg sm:border sm:border-line sm:px-4 sm:no-underline sm:hover:border-faint"
        >
          How to use this page
        </button>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:mt-9 sm:grid-cols-4">
        <Stat label="Sessions / wk" value="05" suffix="ideal" />
        <Stat label="Minimum / wk" value="03" suffix="floor" />
        <Stat label="Back sets / wk" value="27" suffix="direct" accent />
        <Stat label="Block" value="08" suffix="weeks" />
      </dl>
    </section>
  );
}
