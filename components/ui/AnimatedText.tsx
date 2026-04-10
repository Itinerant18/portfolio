"use client";
import { useEffect, useRef } from "react";
// Note: @chenglou/pretext is used for layout analysis if needed, 
// but we'll use a local splitText implementation to ensure compatibility and type safety.
import { useIntersection } from "react-use";

interface AnimatedTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  mode?: "chars" | "words" | "lines";
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  from?: "bottom" | "top" | "left" | "right" | "fade";
  once?: boolean;
  "data-text"?: string;
}

/**
 * A local implementation of splitText that handles chars, words, and lines.
 * For lines, it uses a simple heuristic or can be expanded.
 */
function splitText(el: HTMLElement, mode: "chars" | "words" | "lines"): HTMLElement[] {
  const text = el.textContent || "";
  el.innerHTML = ""; // Clear existing
  
  let fragments: string[] = [];
  if (mode === "chars") {
    fragments = text.split("");
  } else if (mode === "words" || mode === "lines") {
    // For simplicity in this implementation, lines are treated as words 
    // unless a more complex layout engine is used.
    fragments = text.split(/(\s+)/);
  }

  return fragments.map((frag) => {
    const span = document.createElement("span");
    span.textContent = frag;
    if (frag.trim().length > 0) {
      span.style.display = "inline-block";
    } else {
      // Preserve spaces
      span.style.display = "inline";
      span.innerHTML = "&nbsp;"; 
    }
    el.appendChild(span);
    return span;
  }).filter(span => span.textContent?.trim().length! > 0);
}

export function AnimatedText({
  children,
  as: Tag = "div",
  mode = "words",
  className = "",
  delay = 0,
  stagger = 40,
  duration = 600,
  from = "bottom",
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<any>(null);
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });
  
  const isIntersecting = intersection?.isIntersecting;
  const animated = useRef(false);

  useEffect(() => {
    if (!isIntersecting) return;
    if (once && animated.current) return;
    animated.current = true;
    if (!ref.current) return;

    const elements = splitText(ref.current, mode);
    const transforms: Record<string, string> = {
      bottom: "translateY(100%) rotateX(-20deg)",
      top: "translateY(-100%) rotateX(20deg)",
      left: "translateX(-40px) skewX(8deg)",
      right: "translateX(40px) skewX(-8deg)",
      fade: "scale(0.9)",
    };

    elements.forEach((el: HTMLElement, i: number) => {
      el.style.opacity = "0";
      el.style.transform = transforms[from];
      el.style.filter = "blur(4px)";
      el.style.display = "inline-block";
      el.style.overflow = "hidden";
      el.style.transition = `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${
        delay + i * stagger
      }ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${
        delay + i * stagger
      }ms, filter ${duration}ms ease ${delay + i * stagger}ms`;
      
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0) rotateX(0) translateX(0) skewX(0) scale(1)";
        el.style.filter = "blur(0)";
      });
    });
  }, [isIntersecting, mode, delay, stagger, duration, from, once]);

  return (
    <Tag
      ref={ref}
      className={`${className} [perspective:800px]`}
      style={{ overflow: "hidden" }}
    >
      {children}
    </Tag>
  );
}

export function GlitchHeading({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={`glitch-text ${className}`} data-text={children}>
      {children}
    </div>
  );
}

export function CounterText({
  target,
  suffix = "",
  className = "",
}: {
  target: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const intersection = useIntersection(ref as any, {
    threshold: 0.5,
  });
  const counted = useRef(false);

  useEffect(() => {
    if (!intersection?.isIntersecting || counted.current || !ref.current) return;
    counted.current = true;
    let start = 0;
    const end = target;
    const duration = 1200;
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      if (ref.current)
        ref.current.textContent = `${Math.floor(ease * end)}${suffix}`;
      if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
    };
    requestAnimationFrame((t) => step(t, t));
  }, [intersection?.isIntersecting, target, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
