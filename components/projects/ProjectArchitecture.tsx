"use client";

import React from "react";
import { ProjectShape } from "./ProjectData";
import { SectionLabel, FlowDiagram } from "./ProjectUI";

export function ProjectArchitecture({ project, detail }: { project: ProjectShape; detail: any }) {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <SectionLabel label="Operational Architecture" />
        <div className="mt-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] p-6 md:p-8 shadow-inner">
          <div className="flex items-center gap-4 text-[11px] text-[var(--info)] font-mono">
            <span className="font-bold opacity-80">$ arch --inspect --verbose</span>
            <div className="h-[1px] flex-1 bg-[var(--border-default)] opacity-50" />
          </div>
          <div className="mt-8 flex flex-col gap-8">
            <FlowDiagram project={project} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Logic Layer", value: detail.backend.split(".")[0] },
                { label: "Persistence", value: detail.storage.split(".")[0] },
                { label: "Discovery", value: "Optimized for steady iteration and explicit flow." }
              ].map((item, i) => (
                <div key={i} className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 transition-all hover:border-[var(--accent)]/30 shadow-sm">
                  <div className="text-[9px] font-black uppercase tracking-[0.15em] text-[var(--text-muted)] mb-3">{item.label}</div>
                  <div className="text-[12px] leading-relaxed text-[var(--text-secondary)]">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionLabel label="Data Schema Preview" />
        <div className="mt-3 space-y-4">
          {detail.dataModels.slice(0, 2).map((model: string, index: number) => (
            <div
              key={`${project.id}-model-${index}`}
              className="group relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--bg-muted)] px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[var(--accent)] opacity-60" />
                  <span className="text-[10px] font-black tracking-widest text-[var(--text-muted)] uppercase">Schema Definition {index + 1}</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--border-default)]" />
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--border-default)]" />
                </div>
              </div>
              <pre className="p-5 text-[12px] font-mono leading-relaxed text-[var(--info)] bg-[var(--bg-base)] selection:bg-[var(--accent)]/30 overflow-x-auto ide-scrollbar">
                {model}
              </pre>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
