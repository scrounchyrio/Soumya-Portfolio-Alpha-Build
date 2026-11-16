"use client";

import React, { useEffect, useRef, useState } from "react";

interface FluidParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseRadius: number;
  phase: number;
  phaseSpeed: number;
}

export const FluidFractalCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Palette: Nothing crimson red + iridescent cyan, violet, amber, and rose
    const colors = [
      "rgba(215, 25, 33, 0.22)",   // Nothing Red
      "rgba(139, 92, 246, 0.20)",  // Soft Violet
      "rgba(56, 189, 248, 0.18)",  // Sky Cyan
      "rgba(245, 158, 11, 0.16)",  // Warm Amber
      "rgba(236, 72, 153, 0.18)",  // Soft Magenta
      "rgba(16, 185, 129, 0.14)",  // Mint Emerald
    ];

    let particles: FluidParticle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Re-initialize particles across the screen
      const count = Math.max(6, Math.min(10, Math.floor(width / 160)));
      particles = [];
      for (let i = 0; i < count; i++) {
        const radius = Math.min(width, height) * (0.28 + Math.random() * 0.18);
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius,
          baseRadius: radius,
          color: colors[i % colors.length],
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.008 + Math.random() * 0.012,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Interactive Mouse Tracking: Inject fluid ripples & acceleration
    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, speed: 0 };
    let lastMouse = { x: -1000, y: -1000, time: performance.now() };

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(now - lastMouse.time, 1);
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      mouse.speed = Math.min(Math.sqrt(dx * dx + dy * dy) / dt, 5);

      mouse.x = e.clientX;
      mouse.y = e.clientY;
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
      lastMouse.time = now;

      // Add gentle push force to nearby fluid particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const distDx = p.x - mouse.x;
        const distDy = p.y - mouse.y;
        const dist = Math.sqrt(distDx * distDx + distDy * distDy);
        if (dist < p.radius * 0.9 && dist > 1) {
          const force = ((p.radius * 0.9 - dist) / p.radius) * 0.3 * (1 + mouse.speed);
          p.vx += (distDx / dist) * force;
          p.vy += (distDy / dist) * force;
          p.phase += 0.05;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Render organic fractal fluid vortices
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Complex harmonic drift (Lissajous + noise)
        p.phase += p.phaseSpeed;
        p.x += p.vx + Math.cos(p.phase * 0.7 + i) * 0.6;
        p.y += p.vy + Math.sin(p.phase * 0.9 + i) * 0.6;

        // Damping velocity
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Fluid breathing radius
        p.radius = p.baseRadius * (0.85 + Math.sin(p.phase * 1.2) * 0.15);

        // Soft screen wrapping with bounce
        if (p.x < -p.radius * 0.5) p.x = width + p.radius * 0.5;
        if (p.x > width + p.radius * 0.5) p.x = -p.radius * 0.5;
        if (p.y < -p.radius * 0.5) p.y = height + p.radius * 0.5;
        if (p.y > height + p.radius * 0.5) p.y = -p.radius * 0.5;

        // Draw radial chromatic glow
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          p.radius * 0.05,
          p.x,
          p.y,
          p.radius
        );
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(0.5, p.color.replace(/[\d\.]+\)$/, "0.08)"));
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw cursor interactive fluid ripple when moving
      if (mouse.x > 0 && mouse.y > 0 && mouse.speed > 0.05) {
        const cursorRadius = 120 + mouse.speed * 30;
        const cursorGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          cursorRadius
        );
        cursorGrad.addColorStop(0, "rgba(215, 25, 33, 0.16)");
        cursorGrad.addColorStop(0.5, "rgba(139, 92, 246, 0.08)");
        cursorGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = cursorGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, cursorRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none filter blur-[50px] sm:blur-[70px] opacity-80"
      aria-hidden="true"
    />
  );
};
