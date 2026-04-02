"use client";

import { portfolioFiles } from "@/data/files";
import { useIDEStore } from "@/store/useIDEStore";
import { useState } from "react";

function FolderIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M3 7h6l2 2h10v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
      {open ? <path d="M7 12h10" /> : <path d="M12 9v6M9 12h6" />}
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M8 3h6l5 5v13H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M14 3v5h5" />
    </svg>
  );
}

export default function FileExplorer() {
  const [expanded, setExpanded] = useState(true);
  const activeFile = useIDEStore((state) => state.activeFile);
  const openFile = useIDEStore((state) => state.openFile);
  const toggleSidebar = useIDEStore((state) => state.toggleSidebar);

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-[var(--bg-main)] text-[12px]">
      <div className="flex h-9 items-center border-b border-[var(--border)] px-2">
        <span className="leading-none text-[var(--text-muted)]">EXPLORER</span>
      </div>

      <div className="ide-scrollbar min-h-0 flex-1 overflow-y-auto p-2">
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="flex h-6 w-full items-center gap-1.5 px-2 text-left text-[var(--text-muted)] transition hover:bg-[var(--bg-panel)] hover:text-[var(--text)]"
        >
          <FolderIcon open={expanded} />
          <span className="leading-none">SRC</span>
        </button>

        {expanded ? (
          <div className="pl-4">
            {portfolioFiles.map((file) => {
              const isActive = file.path === activeFile;

              return (
                <button
                  key={file.path}
                  type="button"
                  onClick={() => {
                    openFile(file.path);

                    if (window.innerWidth < 1024) {
                      toggleSidebar();
                    }
                  }}
                  className={`flex h-6 w-full items-center gap-1.5 px-2 text-left transition ${
                    isActive
                      ? "bg-[#1F2937] text-[var(--text)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg-panel)] hover:text-[var(--text)]"
                  }`}
                >
                  <FileIcon />
                  <span className="truncate leading-none">{file.name}</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
