import { useRef } from "react";
import { TOC_GROUPS } from "../data/program.js";
import Sheet from "../../components/Sheet.jsx";
import { jumpTo } from "../../lib/nav.js";

export default function TianToc({ open, onClose, active, progressLabel, onResetAll, onPrint }) {
  const sheet = useRef(null);

  const go = (id) => {
    sheet.current?.closeNow();
    onClose();
    jumpTo(id);
  };

  return (
    <Sheet
      ref={sheet}
      open={open}
      side="left"
      eyebrow="目录"
      title="跳到哪一段"
      onClose={onClose}
      footer={
        <div className="flex items-center justify-between gap-2 pb-1">
          <button type="button" onClick={onPrint} className="text-[12px] font-medium text-soft">
            打印这一页
          </button>
          <button
            type="button"
            onClick={onResetAll}
            className="text-[12px] font-medium text-mute transition-colors hover:text-ember"
          >
            清空所有记录
          </button>
        </div>
      }
    >
      <p className="mb-3 text-[12px] leading-relaxed text-mute">{progressLabel}</p>

      <nav className="space-y-4">
        {TOC_GROUPS.map((group) => (
          <div key={group.id}>
            <p className="eyebrow px-3">{group.label}</p>
            <div className="mt-1">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="toc-link w-full text-left"
                  aria-current={active === item.id ? "true" : "false"}
                  onClick={() => go(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </Sheet>
  );
}
