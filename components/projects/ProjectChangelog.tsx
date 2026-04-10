"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { VscCheckAll, VscHistory } from "react-icons/vsc";
import { ReleaseEntry } from "./ProjectData";
import { SectionLabel } from "./ProjectUI";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

function normalizeVersion(value: string) {
  return value.replace(/^v/i, "");
}

function VersionBadge({ version }: { version: string }) {
  const normalized = normalizeVersion(version);

  return (
    <div className="pt-1.5 font-mono text-[12px] font-bold tracking-tight text-[var(--accent)] sm:text-[14px]">
      v{normalized}
    </div>
  );
}

export function ProjectChangelog({ releases }: { releases: ReleaseEntry[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="mb-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SectionLabel label="Release History" />
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
          <VscHistory size={14} />
          Changelog
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mt-2 space-y-0"
      >
        {releases.map((release, index) => (
          <motion.div
            key={`${release.v}-${index}`}
            variants={itemVariants}
            className="grid grid-cols-[68px_minmax(0,1fr)] gap-4 sm:grid-cols-[100px_minmax(0,1fr)] sm:gap-8"
          >
            <div className="relative pr-4 text-right sm:pr-6">
              <VersionBadge version={release.v} />
              {index < releases.length - 1 ? (
                <div className="absolute bottom-[-32px] right-0 top-8 w-[2px] bg-gradient-to-b from-[var(--border-default)] to-transparent" />
              ) : null}
              <div className="absolute right-[-5px] top-[18px] z-10 h-2.5 w-2.5 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-base)]" />
            </div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04, duration: 0.28 }}
              whileHover={shouldReduceMotion ? undefined : { x: 4 }}
              className="group mb-8 rounded-sm border border-[var(--border-default)] border-l-4 border-l-[var(--accent)] bg-[var(--bg-elevated)] px-4 py-4 shadow-sm transition-colors hover:bg-[var(--bg-muted)] sm:mb-10 sm:px-6 sm:py-5"
            >
              <div className="mb-3 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] transition-colors group-hover:text-[var(--text-secondary)]">
                  <VscCheckAll className="text-[var(--success)]" size={12} />
                  {release.meta}
                </div>
                <div
                  className={`h-1.5 w-1.5 rounded-full ${
                    index === 0 ? "bg-[var(--success)]" : "bg-[var(--border-default)]"
                  } opacity-70`}
                />
              </div>
              <div className="text-[14px] leading-relaxed text-[var(--text-primary)]">
                {release.t}
              </div>
            </motion.div>
          </motion.div>
        ))}

        {releases.length === 0 ? (
          <div className="py-20 text-center text-[13px] font-medium italic text-[var(--text-disabled)]">
            Initial commit recorded. No additional releases found.
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}
