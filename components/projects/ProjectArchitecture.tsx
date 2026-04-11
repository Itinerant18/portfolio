"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ProjectDetail, ProjectShape } from "./ProjectData";
import { CategoryBar, FlowDiagram, SectionLabel } from "./ProjectUI";

export function ProjectArchitecture({
  project,
  detail,
}: {
  project: ProjectShape;
  detail: ProjectDetail;
}) {
  const shouldReduceMotion = useReducedMotion();
  const categoryRows = detail.techGroups.map((group) => ({
    label: group.label,
    count: group.items.length,
    color: group.items[0]?.c || "var(--accent)",
  }));
  const maxCategoryCount = Math.max(...categoryRows.map((row) => row.count), 1);

  return (
    <div className="flex flex-col gap-6 sm:gap-8 min-w-0 overflow-hidden">
      <section className="min-w-0">
        <SectionLabel label="High Level Description" />
        <p className="type-body mt-2 text-[var(--text-secondary)]">
          {detail.architecture}
        </p>
      </section>

      <section className="min-w-0 overflow-hidden">
        <SectionLabel label="Flow Nodes" />
        <div className="mx-auto w-full">
          <FlowDiagram project={project} />
        </div>
      </section>

      <section className="min-w-0">
        <SectionLabel label="System Layers" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            { label: "Logic", value: detail.backend.split(".")[0] },
            { label: "Persistence", value: detail.storage.split(".")[0] },
            { label: "Discovery", value: detail.highLevel },
          ].map((item, index) => (
            <motion.div
              key={`${project.id}-layer-${item.label}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.25 }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -4, borderColor: "var(--accent)" }
              }
              className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 transition-colors"
            >
              <div className="type-sys-micro mb-2 text-[var(--text-muted)]">
                {item.label}
              </div>
              <div className="type-body text-[var(--text-secondary)]">
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="min-w-0">
        <SectionLabel label="Tech Category Breakdown" />
        <div className="rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)] p-4 overflow-hidden min-w-0">
          <div className="space-y-3">
            {categoryRows.map((row) => (
              <CategoryBar
                key={`${project.id}-category-row-${row.label}`}
                label={row.label}
                count={row.count}
                maxCount={maxCategoryCount}
                color={row.color}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="min-w-0">
        <SectionLabel label="Data Schema" />
        <div className="space-y-4">
          {detail.dataModels.slice(0, 2).map((model: string, modelIndex: number) => (
            <motion.div
              key={`${project.id}-model-${modelIndex}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: modelIndex * 0.08, duration: 0.25 }}
              className="overflow-hidden rounded-sm border border-[var(--border-default)] bg-[var(--bg-elevated)]"
            >
              <div className="type-sys-micro border-b border-[var(--border-default)] bg-[var(--bg-muted)] px-4 py-2 text-[var(--text-secondary)]">
                Schema Definition {modelIndex + 1}
              </div>
              <div className="type-mono-sm ide-scrollbar overflow-hidden bg-[var(--bg-base)] p-4 text-[var(--info)]">
                {model.split("\n").map((line, lineIndex) => (
                  <motion.div
                    key={`${project.id}-schema-${modelIndex}-${lineIndex}`}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: lineIndex * 0.1, duration: 0.18 }}
                    className="whitespace-pre-wrap break-words"
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
