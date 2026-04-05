export default function StatusBar() {
  return (
    <div className="hidden h-[22px] w-full items-center justify-between border-t border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 font-sans text-[11px] text-[var(--text-secondary)] select-none lg:flex">
      <div className="flex items-center gap-4">
        <span className="cursor-pointer hover:bg-[var(--bg-muted)] px-1.5 py-0.5 rounded transition-colors flex items-center gap-1.5">
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.07 8.038l2.258-2.258a1 1 0 0 0-1.414-1.414L8.656 6.624a1 1 0 0 0 .1 1.503l1.314.912zM12.924 3.328a2 2 0 0 0-2.828 0L7.838 5.586a2 2 0 0 0-.251 2.502l-1.89 1.312-3.1-3.1a2 2 0 0 0-2.828 2.828l3.1 3.1-1.31 1.888a2 2 0 0 0 .25 2.502 2 2 0 0 0 2.828 0l2.257-2.258a2 2 0 0 0 0-2.828l-5.713-5.714a1 1 0 0 1 1.414-1.414l5.714 5.714a1 1 0 0 0 1.415 0z" />
          </svg>
          main*
        </span>
        <span className="cursor-pointer hover:bg-[var(--bg-muted)] px-1.5 py-0.5 rounded transition-colors flex items-center gap-1">
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M8 3.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .207.4l3 2a.5.5 0 0 0 .586-.8L8.5 7.768V4a.5.5 0 0 0-.5-.5z" />
          </svg>
          0
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="cursor-pointer hover:bg-[var(--bg-muted)] px-1.5 py-0.5 rounded transition-colors">AI Assistant</span>
        <span className="cursor-pointer hover:bg-[var(--bg-muted)] px-1.5 py-0.5 rounded transition-colors">Next.js 15</span>
        <span className="cursor-pointer hover:bg-[var(--bg-muted)] px-1.5 py-0.5 rounded transition-colors">UTF-8</span>
        <span className="cursor-pointer hover:bg-[var(--bg-muted)] px-1.5 py-0.5 rounded transition-colors">Prettier</span>
        <span className="cursor-pointer hover:bg-[var(--bg-muted)] px-1.5 py-0.5 rounded transition-colors flex items-center gap-1 font-medium">
          Cursorfolio Dark
        </span>
      </div>
    </div>
  );
}
