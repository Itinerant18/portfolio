━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 4 — VANTA.JS BACKGROUND + LENIS SMOOTH SCROLL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create components/ui/VantaBackground.tsx:

"use client";
import { useEffect, useRef } from "react";
import { useIDEStore } from "@/store/useIDEStore";

const DARK_THEMES = ["aniket-dark", "synthwave", "dracula", "rose-pine", "tokyo-night", "catppuccin", "nord", "gruvbox"];

export default function VantaBackground() {
const ref = useRef<HTMLDivElement>(null);
const vantaRef = useRef<any>(null);
const theme = useIDEStore((s) => s.theme);

useEffect(() => {
if (typeof window === "undefined") return;
if (!DARK_THEMES.includes(theme)) { vantaRef.current?.destroy(); vantaRef.current = null; return; }

    let cancelled = false;
    Promise.all([
      import("three"),
      import("vanta/dist/vanta.net.min"),
    ]).then(([THREE, VANTA]) => {
      if (cancelled || !ref.current) return;
      vantaRef.current?.destroy();
      const colors: Record<string, { color: number; backgroundColor: number; }> = {
        "aniket-dark": { color: 0xA05EF8, backgroundColor: 0x0b0b0b },
        "synthwave":   { color: 0xff6ac1, backgroundColor: 0x0d0221 },
        "dracula":     { color: 0xbd93f9, backgroundColor: 0x181920 },
        "rose-pine":   { color: 0xebbcba, backgroundColor: 0x191724 },
        "tokyo-night": { color: 0x7aa2f7, backgroundColor: 0x1a1b26 },
        "catppuccin":  { color: 0xcba6f7, backgroundColor: 0x1e1e2e },
        "nord":        { color: 0x88c0d0, backgroundColor: 0x242933 },
        "gruvbox":     { color: 0xfabd2f, backgroundColor: 0x1d2021 },
      };
      const c = colors[theme] ?? colors["aniket-dark"];
      vantaRef.current = (VANTA as any).default({
        el: ref.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
        color: c.color,
        backgroundColor: c.backgroundColor,
        points: 8.0,
        maxDistance: 22.0,
        spacing: 18.0,
        showDots: false,
      });
    });
    return () => { cancelled = true; vantaRef.current?.destroy(); vantaRef.current = null; };

}, [theme]);

return (

<div
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none opacity-30 transition-opacity duration-1000"
      aria-hidden="true"
    />
);
}

Create components/ui/LenisProvider.tsx:

"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider() {
useEffect(() => {
const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
let raf: number;
function animate(time: number) { lenis.raf(time); raf = requestAnimationFrame(animate); }
raf = requestAnimationFrame(animate);
return () => { cancelAnimationFrame(raf); lenis.destroy(); };
}, []);
return null;
}

Add both to AppShell.tsx — VantaBackground as first child (z-0), LenisProvider anywhere.
