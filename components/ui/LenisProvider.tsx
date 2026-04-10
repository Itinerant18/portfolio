"use client";

/**
 * LenisProvider — disabled.
 *
 * Lenis smooth-scroll hijacks wheel events at the document level,
 * but the IDE layout uses `overflow: hidden` on body/root and
 * per-panel `overflow-y-auto`. Enabling Lenis globally prevents
 * mouse-wheel scrolling inside those panels.
 *
 * If smooth scrolling is needed later, scope it to a specific
 * scrollable container instead of the whole document.
 */
export default function LenisProvider() {
  return null;
}
