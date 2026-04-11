import {
  VscExtensions,
  VscSourceControl,
  VscSparkle,
  VscWarning,
  VscHistory,
} from "react-icons/vsc";

export default function StatusBar() {
  return (
    <div className="type-caption hidden h-[22px] w-full items-center justify-between border-t border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 text-[var(--text-secondary)] select-none lg:flex">
      <div className="flex items-center gap-4">
        <span className="cursor-pointer hover:bg-[var(--bg-muted)] px-1.5 py-0.5 rounded transition-colors flex items-center gap-1.5">
          <VscSourceControl size={11} />
          main*
        </span>
        <span className="cursor-pointer hover:bg-[var(--bg-muted)] px-1.5 py-0.5 rounded transition-colors flex items-center gap-1">
          <VscHistory size={11} />
          0
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="cursor-pointer hover:bg-[var(--bg-muted)] px-1.5 py-0.5 rounded transition-colors flex items-center gap-1.5"><VscSparkle size={11} />AI Assistant</span>
        <span className="cursor-pointer hover:bg-[var(--bg-muted)] px-1.5 py-0.5 rounded transition-colors">Next.js 15</span>
        <span className="cursor-pointer hover:bg-[var(--bg-muted)] px-1.5 py-0.5 rounded transition-colors">UTF-8</span>
        <span className="cursor-pointer hover:bg-[var(--bg-muted)] px-1.5 py-0.5 rounded transition-colors flex items-center gap-1.5"><VscExtensions size={11} />Prettier</span>
        <span className="cursor-pointer hover:bg-[var(--bg-muted)] px-1.5 py-0.5 rounded transition-colors flex items-center gap-1 font-medium text-[var(--text-primary)]">
          <VscWarning size={11} className="text-[var(--warning)]" />
          Cursorfolio Dark
        </span>
      </div>
    </div>
  );
}
