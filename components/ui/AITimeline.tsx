"use client";

import { motion } from "framer-motion";

const STEPS = [
  { key: "thinking", label: "Thinking", color: "#dfa88f", desc: "Analyzing context and intent" },
  { key: "grep", label: "Searching", color: "#9fc9a2", desc: "Scanning repository structure" },
  { key: "read", label: "Reading", color: "#9fbbe0", desc: "Loading relevant files" },
  { key: "edit", label: "Editing", color: "#c0a8dd", desc: "Applying targeted changes" },
];

export function AITimeline({ activeStep = 0 }: { activeStep?: number }) {
  return (
    <div className="flex flex-col gap-0">
      {STEPS.map((step, i) => (
        <motion.div
          key={step.key}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12, duration: 0.4 }}
          className="flex gap-4 relative"
        >
          {/* Connector line */}
          {i < STEPS.length - 1 && (
            <div
              className="absolute left-[11px] top-8 w-[1px] h-8 bottom-0"
              style={{ background: "rgba(38,37,30,0.1)" }}
            />
          )}

          {/* Color dot */}
          <div className="flex-shrink-0 mt-1.5">
            <motion.div
              animate={i === activeStep ? { scale: [1, 1.2, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className="h-[22px] w-[22px] rounded-full flex items-center justify-center"
              style={{ background: `${step.color}33`, border: `1.5px solid ${step.color}` }}
            >
              <div className="h-2 w-2 rounded-full" style={{ background: step.color }} />
            </motion.div>
          </div>

          {/* Content */}
          <div className="pb-8">
            <div className="type-sys-caption" style={{ color: step.color }}>
              {step.label}
            </div>
            <div
              className="type-body mt-0.5"
              style={{ color: "rgba(38,37,30,0.55)", fontSize: "14px" }}
            >
              {step.desc}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
