import { EXERCISES, GROUPS } from "../data/exercises.js";
import { youtubeSearch } from "../../lib/links.js";
import { Card, Chip, Section, SectionHead } from "../../components/ui.jsx";
import { ExternalIcon } from "../../components/icons.jsx";

export default function Library() {
  return (
    <Section id="tian-library">
      <SectionHead
        eyebrow="参考"
        title="动作库"
        lead="每个动作一句执行提示。点名称看视频 —— 不要把动作细节记在脑子里，做过一次就够。"
      />

      <div className="mt-6 space-y-6">
        {GROUPS.map((group) => {
          const items = Object.entries(EXERCISES).filter(([, exercise]) => exercise.group === group.id);
          return (
            <div key={group.id}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[15px] font-bold text-chalk">{group.label}</h3>
                <span className="font-mono text-[10px] uppercase tracking-wider text-faint">{group.note}</span>
              </div>

              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {items.map(([id, exercise]) => (
                  <Card key={id} className="p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <a
                          href={youtubeSearch(exercise.name)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[13px] font-semibold leading-snug text-chalk underline decoration-line underline-offset-4"
                        >
                          {exercise.name}
                          <ExternalIcon size={10} />
                        </a>
                        <p className="mt-0.5 text-[11px] text-mute">{exercise.zh}</p>
                      </div>
                      <Chip className="shrink-0 text-[10px]">{exercise.load}</Chip>
                    </div>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-dim">{exercise.setup}</p>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
