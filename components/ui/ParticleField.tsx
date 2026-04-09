"use client";

import { useEffect, useRef } from "react";

type Particle = {
  radius: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function parseColor(color: string): [number, number, number] {
  const normalized = color.trim();

  if (normalized.startsWith("#")) {
    const hex = normalized.slice(1);
    if (hex.length === 3) {
      return [
        Number.parseInt(hex[0] + hex[0], 16),
        Number.parseInt(hex[1] + hex[1], 16),
        Number.parseInt(hex[2] + hex[2], 16),
      ];
    }

    if (hex.length >= 6) {
      return [
        Number.parseInt(hex.slice(0, 2), 16),
        Number.parseInt(hex.slice(2, 4), 16),
        Number.parseInt(hex.slice(4, 6), 16),
      ];
    }
  }

  const rgbMatch = normalized.match(/\d+(\.\d+)?/g);
  if (rgbMatch && rgbMatch.length >= 3) {
    return [
      Number.parseFloat(rgbMatch[0]),
      Number.parseFloat(rgbMatch[1]),
      Number.parseFloat(rgbMatch[2]),
    ];
  }

  return [160, 94, 248];
}

function rgba(color: string, alpha: number) {
  const [r, g, b] = parseColor(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function ParticleField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const particles: Particle[] = [];
    const mouse = { active: false, x: -9999, y: -9999 };
    const particleCount = 72;
    let frameId = 0;

    const randomVelocity = () =>
      (Math.random() > 0.5 ? 1 : -1) * (0.05 + Math.random() * 0.15);

    const syncCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        for (let index = 0; index < particleCount; index += 1) {
          particles.push({
            radius: 1 + Math.random(),
            vx: randomVelocity(),
            vy: randomVelocity(),
            x: Math.random() * rect.width,
            y: Math.random() * rect.height,
          });
        }
      } else {
        for (const particle of particles) {
          particle.x = clamp(particle.x, 0, rect.width);
          particle.y = clamp(particle.y, 0, rect.height);
        }
      }
    };

    const render = () => {
      frameId = window.requestAnimationFrame(render);

      if (document.hidden) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width <= 0 || height <= 0) {
        return;
      }

      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#A05EF8";

      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        if (mouse.active) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance > 0 && distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx += (dx / distance) * force * 0.03;
            particle.vy += (dy / distance) * force * 0.03;
          }
        }

        particle.vx = clamp(particle.vx * 0.995, -0.24, 0.24);
        particle.vy = clamp(particle.vy * 0.995, -0.24, 0.24);
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= width) {
          particle.vx *= -1;
          particle.x = clamp(particle.x, 0, width);
        }

        if (particle.y <= 0 || particle.y >= height) {
          particle.vy *= -1;
          particle.y = clamp(particle.y, 0, height);
        }
      }

      for (let leftIndex = 0; leftIndex < particles.length; leftIndex += 1) {
        const left = particles[leftIndex];

        for (let rightIndex = leftIndex + 1; rightIndex < particles.length; rightIndex += 1) {
          const right = particles[rightIndex];
          const distance = Math.hypot(left.x - right.x, left.y - right.y);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.12;
            context.strokeStyle = rgba(accent, opacity);
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(left.x, left.y);
            context.lineTo(right.x, right.y);
            context.stroke();
          }
        }
      }

      for (const particle of particles) {
        context.fillStyle = rgba(accent, 0.06 + Math.random() * 0.09);
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.active = true;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    syncCanvasSize();
    render();
    window.addEventListener("resize", syncCanvasSize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", syncCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
