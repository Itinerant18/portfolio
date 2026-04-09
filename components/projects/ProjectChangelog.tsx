"use client";

import { motion } from "framer-motion";
import { ReleaseEntry } from "./ProjectData";
import { SectionLabel } from "./ProjectUI";
import { VscHistory, VscCheckAll } from "react-icons/vsc";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function ProjectChangelog({ releases }: { releases: ReleaseEntry[] }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between mb-2">
        <SectionLabel label="Release History" />
        <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest">
          <VscHistory size={14} />
          Changelog
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mt-4 space-y-0"
      >
        {releases.map((release, index) => (
          <motion.div
            key={`${release.v}-${index}`}
            variants={itemVariants}
            className="grid grid-cols-[100px_minmax(0,1fr)] gap-8"
          >
            <div className="relative pr-6 text-right">
              <div className="pt-1.5 text-[14px] font-bold text-[var(--accent)] font-mono tracking-tight">
                v{release.v}
              </div>
              {index < releases.length - 1 ? (
                <div className="absolute right-0 top-8 bottom-[-32px] w-[2px] bg-gradient-to-b from-[var(--border-default)] to-transparent" />
              ) : null}
              <div className="absolute right-[-5px] top-[18px] h-2.5 w-2.5 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-base)] z-10 shadow-[0_0_8px_var(--accent)]" />
            </div>
            
            <motion.div 
              whileHover={{ x: 4, backgroundColor: "var(--bg-muted)" }}
              className="group mb-10 rounded-sm border border-[var(--border-default)] border-l-4 border-l-[var(--accent)] bg-[var(--bg-elevated)] px-6 py-5 shadow-sm transition-all"
            >
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] transition-colors group-hover:text-[var(--text-secondary)]">
                  <VscCheckAll className="text-[var(--success)]" size={12} />
                  {release.meta}
                </div>
                <div className={`h-1.5 w-1.5 rounded-full ${index === 0 ? "bg-[var(--success)] animate-pulse" : "bg-[var(--border-default)]"} opacity-60 group-hover:opacity-100`} />
              </div>
              <div className="text-[14px] leading-relaxed text-[var(--text-primary)] font-medium">
                {release.t}
              </div>
            </motion.div>
          </motion.div>
        ))}

        {releases.length === 0 && (
          <div className="py-20 text-center text-[13px] text-[var(--text-disabled)] font-medium italic">
            Initial commit recorded. No additional releases found.
          </div>
        )}
      </motion.div>
    </div>
  );
}
