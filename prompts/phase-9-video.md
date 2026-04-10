━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 9 — create-video INTEGRATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After running `npx create-video@latest --template blank --name portfolio-video-demo`,
a Remotion project will be created in portfolio-video-demo/.

Create portfolio-video-demo/src/compositions/ProjectDemo.tsx:

import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface Props { projectName: string; techStack: string[]; description: string; }

export const ProjectDemo: React.FC<Props> = ({ projectName, techStack, description }) => {
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
const titleY = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: "clamp" });
const descOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });

return (
<AbsoluteFill style={{ background: "#0b0b0b", fontFamily: "Space Grotesk, sans-serif" }}>
<Sequence from={0} durationInFrames={30}>
<AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>

<div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, fontSize: 64, fontWeight: 900, color: "#A05EF8", letterSpacing: "-0.03em" }}>
{projectName}
</div>
<div style={{ opacity: descOpacity, fontSize: 18, color: "#c0c0c0", maxWidth: 600, textAlign: "center" }}>
{description}
</div>
<div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", opacity: descOpacity }}>
{techStack.slice(0, 6).map((tech) => (
<div key={tech} style={{ padding: "6px 14px", background: "rgba(160,94,248,0.15)", border: "1px solid rgba(160,94,248,0.4)", borderRadius: 4, color: "#A05EF8", fontSize: 13, fontFamily: "DM Mono, monospace" }}>
{tech}
</div>
))}
</div>
</AbsoluteFill>
</Sequence>
</AbsoluteFill>
);
};

Register it in portfolio-video-demo/src/Root.tsx and add a render script.
Create scripts/generate-videos.ts that loops over projects from data/projects.json
and renders a video for each, saving to public/videos/{id}.mp4.

Verify: run `npx tsc --noEmit` and show me the output before moving on.
If there are errors, fix them before we proceed to the next phase.
