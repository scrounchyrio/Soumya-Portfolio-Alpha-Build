"use client";

import React, { useEffect, useRef } from "react";

interface AmbientParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
}

export const AmbientFractalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Sparse, elegant ambient particles
    const COUNT = 28;
    const particles: AmbientParticle[] = [];
    const colors = ["235, 24, 129", "242, 88, 53", "27, 99, 255", "180, 180, 190"];

    for (let i = 0; i < COUNT; i++) {
      const baseAlpha = 0.08 + Math.random() * 0.16;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: 1.2 + Math.random() * 2.2,
        color: colors[i % colors.length],
        alpha: baseAlpha,
        baseAlpha,
      });
    }

    const mouse = { x: -1000, y: -1000, active: false };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    let isVisible = true;
    const onVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    let t = 0;
    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);
        t += 0.015;

        for (let i = 0; i < COUNT; i++) {
          const p = particles[i];
          
          // Gentle autonomous drift
          p.x += p.vx + Math.sin(t + i) * 0.15;
          p.y += p.vy + Math.cos(t * 0.8 + i) * 0.15;

          // Wrap edges
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;

          // Mouse proximity glow & gentle attraction
          let extraAlpha = 0;
          if (mouse.active) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              const factor = 1 - dist / 180;
              extraAlpha = factor * 0.35;
              // Gentle pull towards cursor
              p.x += dx * 0.012 * factor;
              p.y += dy * 0.012 * factor;
            }
          }

          // Draw particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${Math.min(p.alpha + extraAlpha, 0.7)})`;
          ctx.fill();

          // Connect nearby particles with subtle fractal branches
          for (let j = i + 1; j < COUNT; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${p.color}, ${(1 - dist / 110) * 0.06})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
    />
  );
};
