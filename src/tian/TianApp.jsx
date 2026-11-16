import { useEffect, useState } from "react";
import { DAYS, SECTION_ORDER, weekOf } from "./data/program.js";
import { usePlan } from "./state/PlanContext.jsx";
import { todayFor, visibleBlocks } from "./lib/today.js";
import { useActiveSection } from "../hooks/useActiveSection.js";
import { idFromHash, jumpTo } from "../lib/nav.js";

import TianHeader from "./components/TianHeader.jsx";
import TianToc from "./components/TianToc.jsx";
import BlockRunner from "./components/BlockRunner.jsx";

import Hero from "./sections/Hero.jsx";
import Today from "./sections/Today.jsx";
import LongBlock from "./sections/LongBlock.jsx";
import EightWeeks from "./sections/EightWeeks.jsx";
import Method from "./sections/Method.jsx";
import Test from "./sections/Test.jsx";
import Library from "./sections/Library.jsx";
import Safety from "./sections/Safety.jsx";
import Setup from "./sections/Setup.jsx";

export default function TianApp() {
  const { state, stats, resetAll } = usePlan();
  const active = useActiveSection(SECTION_ORDER);
  const { day, target, started } = todayFor(state);

  const [running, setRunning] = useState(null);
  const [contentsOpen, setContentsOpen] = useState(false);

  useEffect(() => {
    const id = idFromHash();
    if (!id) return undefined;
    const frame = requestAnimationFrame(() => jumpTo(id));
    return () => cancelAnimationFrame(frame);
  }, []);

  const progressLabel = `本周 ${stats.week.finished}/${stats.week.total} 块 · 共 ${stats.sets} 组`;

  const startBlock = (dayEntry, block) => {
    if (!block) {
      jumpTo("tian-today");
      return;
    }
    setRunning({ dayId: dayEntry.id, blockId: block.id });
  };

  const handleHeaderStart = () => {
    if (state.day === "L") {
      jumpTo("tian-long");
      return;
    }
    startBlock(day, started ?? target);
  };

  const handleResetAll = () => {
    const ok = window.confirm("清空所有记录（组数、重量、测试值）？这一步不能撤销。");
    if (ok) resetAll();
  };

  if (running) {
    const dayEntry = DAYS.find((entry) => entry.id === running.dayId) ?? DAYS[0];
    const week = weekOf(state.week);
    const blocks = visibleBlocks(dayEntry, week);
    const block = blocks.find((entry) => entry.id === running.blockId);
    if (block) {
      return (
        <BlockRunner
          blockKey={`w${week.n}-${dayEntry.id}-${block.id}`}
          block={block}
          week={week}
          dayLabel={dayEntry.letter}
          position={blocks.indexOf(block) + 1}
          onExit={() => setRunning(null)}
        />
      );
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden antialiased">
      <TianHeader
        target={target}
        started={started}
        onStart={handleHeaderStart}
        onOpenContents={() => setContentsOpen(true)}
        onPrint={() => window.print()}
      />

      <main>
        <Hero />
        <Today onStart={startBlock} onGoLong={() => jumpTo("tian-long")} />
        <LongBlock />
        <EightWeeks />
        <Method />
        <Test />
        <Library />
        <Safety />
        <Setup />
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-7 text-xs text-mute sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>为 Tian 设计 · {new Date().getFullYear()} · 第 1–8 周基础期</p>
          <p className="font-mono text-[11px] tracking-wider">
            workouts.tian.im/tian · <a href="/james/" className="underline underline-offset-4">James 的计划</a>
          </p>
        </div>
      </footer>

      <TianToc
        open={contentsOpen}
        onClose={() => setContentsOpen(false)}
        active={active}
        progressLabel={progressLabel}
        onResetAll={handleResetAll}
        onPrint={() => window.print()}
      />
    </div>
  );
}
