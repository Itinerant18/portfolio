━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 11 — BUG FIXES (non-negotiable)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FIX A — utils/commands.ts: change toggle-theme shortcut from "Ctrl+K" to "Ctrl+Shift+T"
FIX B — AppShell.tsx: replace ALL --bg-main → --bg-base, --border → --border-default, --text → --text-primary, --bg-panel → --bg-surface, --bg-hover → --bg-muted, --accent-soft → --accent-subtle
FIX C — data/content.ts vs outputs/content.ts: sync all Aniket Karmakar data into outputs/content.ts
FIX D — ProjectOverview.tsx gallery: add overflow-hidden and min-h-0 to grid container
FIX E — layout.tsx: update data-theme="aniket-dark" (was "aniket-dark" without full theme token support — now it's complete from Step 2)

