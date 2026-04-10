━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 10 — PROJECTUI.TSX COMPLETE REWORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Replace SectionLabel:
export function SectionLabel({ label }: { label: string }) {
return (

<div className="flex items-center gap-3 mb-4">
<div className="h-px w-4 bg-[var(--accent)] flex-shrink-0" />
<span className="label-heading gradient-text">{label}</span>
<div className="h-px flex-1 bg-gradient-to-r from-[var(--accent-muted)] to-transparent" />
<span className="led-dot h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
</div>
);
}

Replace FlowDiagram to use animated SVG data stream arrows between hexagon nodes.
Each node pulses with neon-pulse animation.
The connecting paths use animated stroke-dashoffset to create a flowing data stream effect.

Replace TechBadge with the orbital version from Step 3 of the previous plan.

Add these new components:

export function StatBanner({ stats }: { stats: { label: string; value: string | number; color?: string }[] }) {
return (

<div className="grid grid-cols-3 divide-x divide-[var(--border-default)] border border-[var(--border-default)] rounded-sm overflow-hidden bg-[var(--bg-elevated)]">
{stats.map((s, i) => (
<motion.div key={i} className="px-4 py-4 text-center" whileHover={{ backgroundColor: "var(--bg-muted)" }}>
<div className="mono-text text-[22px] font-bold" style={{ color: s.color || "var(--accent)" }}>{s.value}</div>
<div className="label-heading text-[var(--text-muted)] mt-1">{s.label}</div>
</motion.div>
))}
</div>
);
}

export function LiveStatusBar({ message }: { message: string }) {
const phrases = ["SYSTEM ONLINE", "RUNTIME ACTIVE", "REPO SYNCED", "STACK RESOLVED", message.toUpperCase()];
return (

<div className="overflow-hidden border-y border-[var(--border-default)] py-1.5">
<motion.div
animate={{ x: ["0%", "-50%"] }}
transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
className="flex whitespace-nowrap gap-10" >
{[...phrases, ...phrases].map((p, i) => (
<span key={i} className="label-heading text-[var(--accent)] opacity-50 flex items-center gap-3">
<span className="led-dot h-1 w-1 rounded-full inline-block" style={{ background: "var(--accent)" }} />
{p}
</span>
))}
</motion.div>
</div>
);
}

Verify: run `npx tsc --noEmit` and show me the output before moving on.
If there are errors, fix them before we proceed to the next phase.
