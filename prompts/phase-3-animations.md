━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3 — ADVANCED ANIMATIONS IN globals.css
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Add ALL of these @keyframes and utility classes:

/_ Text animations _/
@keyframes text-shimmer {
0% { background-position: -200% center; }
100% { background-position: 200% center; }
}
@keyframes char-reveal {
from { opacity: 0; transform: translateY(110%) rotateX(-30deg); filter: blur(4px); }
to { opacity: 1; transform: translateY(0) rotateX(0deg); filter: blur(0); }
}
@keyframes word-slide {
from { opacity: 0; transform: translateX(-20px) skewX(8deg); }
to { opacity: 1; transform: translateX(0) skewX(0deg); }
}
@keyframes glitch {
0%,100% { transform: translate(0); text-shadow: none; }
20% { transform: translate(-2px,1px); text-shadow: 2px 0 var(--info); }
40% { transform: translate(2px,-1px); text-shadow: -2px 0 var(--accent); }
60% { transform: translate(-1px,2px); text-shadow: 1px 0 var(--error); }
80% { transform: translate(1px,-2px); text-shadow: -1px 0 var(--success); }
}
@keyframes typewriter {
from { width: 0; opacity: 0; }
1% { opacity: 1; }
to { width: 100%; opacity: 1; }
}
@keyframes cursor-blink {
0%,100% { border-color: var(--accent); }
50% { border-color: transparent; }
}
@keyframes gradient-shift {
0% { background-position: 0% 50%; }
50% { background-position: 100% 50%; }
100% { background-position: 0% 50%; }
}

/_ UI animations _/
@keyframes float {
0%,100% { transform: translateY(0) rotate(0deg); }
33% { transform: translateY(-8px) rotate(0.4deg); }
66% { transform: translateY(-4px) rotate(-0.4deg); }
}
@keyframes neon-pulse {
0%,100% { box-shadow: var(--glow-accent); }
50% { box-shadow: 0 0 24px rgba(160,94,248,0.7), 0 0 60px rgba(160,94,248,0.25); }
}
@keyframes scan-line {
from { transform: translateY(-100%); }
to { transform: translateY(100vh); }
}
@keyframes shimmer-bg {
from { transform: translateX(-100%); }
to { transform: translateX(200%); }
}
@keyframes orbit {
from { transform: rotate(0deg) translateX(20px) rotate(0deg); }
to { transform: rotate(360deg) translateX(20px) rotate(-360deg); }
}
@keyframes led-blink {
0%,89%,100% { opacity: 1; }
90% { opacity: 0.2; }
}
@keyframes slide-in-left {
from { opacity: 0; transform: translateX(-24px) skewX(4deg); }
to { opacity: 1; transform: translateX(0) skewX(0deg); }
}
@keyframes slide-in-right {
from { opacity: 0; transform: translateX(24px) skewX(-4deg); }
to { opacity: 1; transform: translateX(0) skewX(0deg); }
}
@keyframes reveal-up {
from { opacity: 0; transform: translateY(32px) scaleY(0.95); }
to { opacity: 1; transform: translateY(0) scaleY(1); }
}
@keyframes spin-slow {
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }
}
@keyframes counter-up {
from { transform: translateY(100%); opacity: 0; }
to { transform: translateY(0); opacity: 1; }
}

/_ Utility classes using the keyframes _/
.glitch-text { position: relative; animation: glitch 4s infinite; }
.glitch-text::before,.glitch-text::after {
content: attr(data-text); position: absolute; inset: 0;
clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
}
.glitch-text::before { color: var(--info); transform: translate(-2px); animation: glitch 3.8s 0.3s infinite; }
.glitch-text::after { color: var(--accent); transform: translate(2px); animation: glitch 4.2s 0.6s infinite; clip-path: polygon(0 66%, 100% 66%, 100% 100%, 0 100%); }

.gradient-text {
background: var(--gradient-accent);
background-size: 200% auto;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
animation: gradient-shift 4s ease infinite;
}

.shimmer-text {
background: linear-gradient(90deg, var(--text-muted) 0%, var(--text-primary) 40%, var(--accent) 50%, var(--text-primary) 60%, var(--text-muted) 100%);
background-size: 200% auto;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
animation: text-shimmer 3s linear infinite;
}

.typewriter {
overflow: hidden;
white-space: nowrap;
border-right: 2px solid var(--accent);
animation: typewriter 2.5s steps(40, end) both, cursor-blink 0.8s step-end infinite;
}

.neon-glow { box-shadow: var(--glow-accent); }
.neon-border { border-color: var(--accent); box-shadow: var(--glow-accent); }
.float-anim { animation: float 6s ease-in-out infinite; }
.led-dot { animation: led-blink 3s ease-in-out infinite; }
.spin-orbit { animation: spin-slow 8s linear infinite; }

.stagger-reveal > _ {
animation: reveal-up 0.5s cubic-bezier(0.22,1,0.36,1) both;
}
.stagger-reveal > _:nth-child(1) { animation-delay: 0ms; }
.stagger-reveal > _:nth-child(2) { animation-delay: 80ms; }
.stagger-reveal > _:nth-child(3) { animation-delay: 160ms; }
.stagger-reveal > _:nth-child(4) { animation-delay: 240ms; }
.stagger-reveal > _:nth-child(5) { animation-delay: 320ms; }
.stagger-reveal > _:nth-child(6) { animation-delay: 400ms; }
.stagger-reveal > _:nth-child(7) { animation-delay: 480ms; }
.stagger-reveal > \*:nth-child(8) { animation-delay: 560ms; }

@media (prefers-reduced-motion: reduce) {
_, _::before, \*::after {
animation-duration: 0.01ms !important;
animation-iteration-count: 1 !important;
transition-duration: 0.01ms !important;
}
}




Verify: run `npx tsc --noEmit` and show me the output before moving on.
If there are errors, fix them before we proceed to the next phase.