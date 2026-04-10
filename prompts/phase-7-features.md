━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 7 — PROJECT CARD EXTRA FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7.1 — Project Health Score Badge
Add to the project list card (wherever project cards are rendered):

Create utils/projectHealth.ts:
export function calcHealth(project: { updatedAt?: string; techStack: string[]; topics?: string[] }): { score: number; label: string; color: string } {
const days = project.updatedAt ? (Date.now() - new Date(project.updatedAt).getTime()) / 86400000 : 365;
const recency = Math.max(0, 100 - days _ 0.3);
const richness = Math.min(100, (project.techStack.length _ 8 + (project.topics?.length ?? 0) _ 5));
const score = Math.round(recency _ 0.6 + richness \* 0.4);
const label = score > 75 ? "Active" : score > 45 ? "Stable" : "Legacy";
const color = score > 75 ? "var(--success)" : score > 45 ? "var(--warning)" : "var(--text-muted)";
return { score, label, color };
}

Add HealthBadge to each project card:
import { calcHealth } from "@/utils/projectHealth";
const health = calcHealth(project);

<div className="flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-widest" style={{ borderColor: health.color, color: health.color }}>
  <div className="h-1.5 w-1.5 rounded-full led-dot" style={{ background: health.color }} />
  {health.label}
</div>

7.2 — Copy Project Pitch Button
Add to each project card footer:
<button
onClick={() => { navigator.clipboard.writeText(`${project.name}: ${project.shortDescription}`); }}
className="text-[9px] font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
title="Copy one-liner pitch"

> [ copy pitch ]
> </button>

7.3 — Related Projects sidebar
In the project detail right sidebar, after "Topic Graph", add:
"Related Projects" — find projects with ≥2 matching techStack items.
Sort by matching count descending, show top 3 as small cards with name + primary tech.

7.4 — Dependency Graph
In the Architecture tab, below the schema, add a small animated dependency node tree.
Use a simple SVG-based approach: root node at center, child deps as orbiting nodes.
Animate entry with a spring scale from the root outward.
Data source: parse project.techStack into parent categories (Frontend/Backend/AI/IoT/Cloud) and show as a tree.

Verify: run `npx tsc --noEmit` and show me the output before moving on.
If there are errors, fix them before we proceed to the next phase.
