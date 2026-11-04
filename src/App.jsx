import { useEffect, useState } from "react";
import { SECTION_ORDER, SESSIONS } from "./data/plan.js";
import { useTracker } from "./state/TrackerContext.jsx";
import { useAcknowledged } from "./hooks/useAcknowledged.js";
import { useActiveSection } from "./hooks/useActiveSection.js";
import { useRestTimer } from "./hooks/useRestTimer.js";
import { idFromHash, jumpTo } from "./lib/nav.js";

import Header from "./components/Header.jsx";
import StickyBar from "./components/StickyBar.jsx";
import SessionSection from "./components/SessionSection.jsx";
import RestTimer from "./components/RestTimer.jsx";
import ContentsSheet from "./components/ContentsSheet.jsx";

import Hero from "./sections/Hero.jsx";
import ReadFirst from "./sections/ReadFirst.jsx";
import Progress from "./sections/Progress.jsx";
import Rotation from "./sections/Rotation.jsx";
import Progression from "./sections/Progression.jsx";
import BackPlaybook from "./sections/BackPlaybook.jsx";
import Recovery from "./sections/Recovery.jsx";
import Rules from "./sections/Rules.jsx";
import Faq from "./sections/Faq.jsx";
import Appendix from "./sections/Appendix.jsx";
import Calculators from "./sections/Calculators.jsx";
import Closing from "./sections/Closing.jsx";

export default function App() {
  const { stats, resetAll } = useTracker();
  const { acked, acknowledge } = useAcknowledged();
  const active = useActiveSection(SECTION_ORDER);
  const rest = useRestTimer();

  const [contentsOpen, setContentsOpen] = useState(false);

  useEffect(() => {
    const id = idFromHash();
    if (!id) return undefined;
    const frame = requestAnimationFrame(() => jumpTo(id));
    return () => cancelAnimationFrame(frame);
  }, []);

  const progressLabel =
    stats.totalDone === 0
      ? "0 sets logged"
      : stats.totalDone === stats.totalSets
        ? `block complete · ${stats.totalDone} sets`
        : `${stats.totalDone} of ${stats.totalSets} sets logged`;

  const handleStart = () => jumpTo(acked ? "session-a" : "read-first");

  const handleAcknowledge = () => {
    acknowledge();
    window.setTimeout(() => jumpTo("session-a"), 100);
  };

  const handleResetAll = () => {
    const ok = window.confirm(
      "Clear every logged set and every saved weight? This can't be undone.",
    );
    if (ok) resetAll();
  };

  const print = () => window.print();

  return (
    <div className="relative min-h-screen overflow-x-hidden antialiased">
      <div className="page-grid pointer-events-none absolute inset-x-0 top-0 h-[560px]" />

      <Header onOpenContents={() => setContentsOpen(true)} onPrint={print} />

      <main className="relative z-10">
        <Hero acked={acked} onStart={handleStart} />

        <ReadFirst acked={acked} onAcknowledge={handleAcknowledge} />

        <StickyBar
          active={active}
          onOpenContents={() => setContentsOpen(true)}
          onResetAll={handleResetAll}
          progressLabel={progressLabel}
        />

        <div className="mx-auto max-w-5xl px-4 pb-6 sm:px-6">
          {SESSIONS.map((session) => (
            <SessionSection key={session.id} session={session} onStartRest={rest.start} />
          ))}
        </div>

        <Progress progressLabel={progressLabel} />
        <Rotation />
        <Progression />
        <BackPlaybook />
        <Recovery />
        <Rules />
        <Faq />
        <Appendix />
        <Calculators />
        <Closing progressLabel={progressLabel} onPrint={print} onResetAll={handleResetAll} />
      </main>

      <footer className="relative z-10 border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-7 text-xs text-mute sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>Built for James · {new Date().getFullYear()}</p>
          <p className="font-mono text-[11px] tracking-wider">workouts.tian.im/james</p>
        </div>
      </footer>

      <RestTimer
        timer={rest.timer}
        onPause={rest.pause}
        onResume={rest.resume}
        onAdd={rest.addTime}
        onStop={rest.stop}
      />

      <ContentsSheet
        open={contentsOpen}
        onClose={() => setContentsOpen(false)}
        active={active}
        acked={acked}
        progressLabel={progressLabel}
        onPrint={print}
      />
    </div>
  );
}
