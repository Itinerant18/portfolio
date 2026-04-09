"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { ReleaseEntry } from "./ProjectData";
import { SectionLabel } from "./ProjectUI";
import { VscHistory, VscCheckAll } from "react-icons/vsc";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function normalizeVersion(value: string) {
  return value.replace(/^v/i, "");
}

function VersionBadge({ version }: { version: string }) {
  const shouldReduceMotion = useReducedMotion();
  const normalized = normalizeVersion(version);
  const decimals = normalized.includes(".") ? normalized.split(".")[1]?.length ?? 0 : 0;
  const target = Number.parseFloat(normalized) || 0;
  const initialValue = (0).toFixed(decimals);
  const [displayed, setDisplayed] = useState(shouldReduceMotion ? normalized : initialValue);
  const [glitchActive, setGlitchActive] = useState(!shouldReduceMotion);
  const [started, setStarted] = useState(shouldReduceMotion);

  useEffect(() => {
    if (shouldReduceMotion || !started) {
      setDisplayed(normalized);
      return;
    }

    let current = 0;
    const increment = Math.max(target / 24, 0.05);
    const intervalId = window.setInterval(() => {
      current = Math.min(target, current + increment);
      setDisplayed(current.toFixed(decimals));

      if (current >= target) {
        window.clearInterval(intervalId);
      }
    }, 30);

    return () => window.clearInterval(intervalId);
  }, [decimals, normalized, shouldReduceMotion, started, target]);

  useEffect(() => {
    if (shouldReduceMotion || !started) {
      setGlitchActive(false);
      return;
    }

    setGlitchActive(true);
    const timeoutId = window.setTimeout(() => setGlitchActive(false), 600);
    return () => window.clearTimeout(timeoutId);
  }, [shouldReduceMotion, started, version]);

  return (
    <motion.div
      viewport={{ once: true }}
      onViewportEnter={() => setStarted(true)}
      className="pt-1.5 text-[12px] font-bold font-mono tracking-tight text-[var(--accent)] sm:text-[14px]"
    >
      <span
        data-text={`v${displayed}`}
        className={glitchActive ? "glitch-text" : undefined}
      >
        v{displayed}
      </span>
    </motion.div>
  );
}

export function ProjectChangelog({ releases }: { releases: ReleaseEntry[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="mb-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
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
            className="grid grid-cols-[68px_minmax(0,1fr)] gap-4 sm:grid-cols-[100px_minmax(0,1fr)] sm:gap-8"
          >
            <div className="relative pr-4 text-right sm:pr-6">
              <VersionBadge version={release.v} />
              {index < releases.length - 1 ? (
                <>
                  <div className="absolute right-0 top-8 bottom-[-32px] w-[2px] bg-gradient-to-b from-[var(--border-default)] to-transparent" />
                  <motion.div
                    className="absolute right-[-5px] w-[2px] bg-[var(--accent)]"
                    initial={{ height: 0, top: 8 }}
                    whileInView={{ height: "calc(100% + 32px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                  {!shouldReduceMotion ? (
                    <motion.span
                      className="absolute right-[-9px] top-8 h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[var(--glow-accent)]"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: [1, 1, 0], y: ["0px", "calc(100% + 24px)"] }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                  ) : null}
                </>
              ) : null}
              <div className="absolute right-[-5px] top-[18px] h-2.5 w-2.5 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-base)] z-10 shadow-[0_0_8px_var(--accent)]" />
            </div>
            
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -24, borderLeftColor: "transparent" }}
              animate={{ opacity: 1, x: 0, borderLeftColor: "var(--accent)" }}
              transition={{
                opacity: { duration: 0.35, delay: 0.08 * index },
                x: { duration: 0.35, delay: 0.08 * index },
                borderLeftColor: { duration: 0.4, delay: 0.4 + index * 0.08 },
              }}
              whileHover={shouldReduceMotion ? undefined : { x: 4, backgroundColor: "var(--bg-muted)" }}
              className="group mb-8 rounded-sm border border-[var(--border-default)] border-l-4 bg-[var(--bg-elevated)] px-4 py-4 shadow-sm transition-all sm:mb-10 sm:px-6 sm:py-5"
            >
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + index * 0.08, duration: 0.3 }}
                className="mb-3 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] transition-colors group-hover:text-[var(--text-secondary)]">
                  <VscCheckAll className="text-[var(--success)]" size={12} />
                  {release.meta}
                </div>
                <div className={`h-1.5 w-1.5 rounded-full ${index === 0 ? "bg-[var(--success)] animate-pulse" : "bg-[var(--border-default)]"} opacity-60 group-hover:opacity-100`} />
              </motion.div>
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.24 + index * 0.08, duration: 0.35 }}
                className="text-[14px] font-medium leading-relaxed text-[var(--text-primary)]"
              >
                {release.t}
              </motion.div>
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
