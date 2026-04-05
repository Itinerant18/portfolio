"use client";

import React from "react";
import { ProjectShape } from "./ProjectData";
import { SectionLabel, VisualBadge, FlowDiagram, TechBadge, SidebarKeyValue } from "./ProjectUI";

export function ProjectOverview({ project, detail }: { project: ProjectShape; detail: any }) {
  return (
    <div className="flex flex-col gap-8">
      {detail.previewImage && (
        <section>
          <SectionLabel label="Primary Artboard" />
          <div className="group relative mt-3 aspect-video w-full overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] transition-all hover:border-[var(--accent)]/30 shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={detail.previewImage}
                alt={`${project.name} preview`}
                className="h-full w-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-transparent opacity-60" />
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
        <div className="space-y-8">
          <section>
            <SectionLabel label="Core Capabilities" />
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {detail.features.slice(0, 4).map((feature: string, index: number) => (
                <VisualBadge
                  key={`${project.id}-feature-${index}`}
                  label={feature.split(".")[0]}
                  icon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  }
                />
              ))}
            </div>
          </section>

          <section>
            <SectionLabel label="System Flow" />
            <FlowDiagram project={project} />
          </section>

          <section>
            <SectionLabel label="Engine & Stack" />
            <div className="mt-3 flex flex-wrap gap-3">
              {detail.techGroups.flatMap((g: any) => g.items).map((item: any, iIndex: number) => (
                <TechBadge key={`${project.id}-tech-${iIndex}`} name={item.n} />
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <aside className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 shadow-sm">
            <SectionLabel label="Specifications" />
            <div className="mt-4 space-y-3">
              <SidebarKeyValue label="Category" value={detail.category} />
              <SidebarKeyValue label="Engine" value={detail.language} />
              <SidebarKeyValue label="Release" value={detail.year} />
              <SidebarKeyValue label="Backend" value={detail.backend.split(".")[0]} />
              <SidebarKeyValue label="Storage" value={detail.storage.split(".")[0]} />
            </div>
          </aside>

          <aside className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-5 shadow-sm">
            <SectionLabel label="Topic Graph" />
            <div className="mt-3 flex flex-wrap gap-2">
              {detail.topics.slice(0, 10).map((topic: string, index: number) => (
                <span
                  key={`${project.id}-topic-${index}`}
                  className="px-2 py-1 rounded-md bg-[var(--bg-muted)] text-[10px] font-bold text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-all cursor-default"
                >
                  #{topic}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
