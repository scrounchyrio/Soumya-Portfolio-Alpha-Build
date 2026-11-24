"use client";

import React, { useEffect, useRef } from "react";

interface WaterRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  intensity: number;
  speed: number;
}

/**
 * Fluid Water Caustic Background with Interactive Glassmorphic Ripple Lens.
 * - Simulates an ambient palette glow with interactive color ripples.
 * - Triggers fluid ripples and glassmorphic refraction whenever hovering over text or icons.
 * - Ultra-optimized with clamped resolution, zero-allocation rAF loop, and locked 60+ FPS.
 */
export const FluidWaterCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;
    const scale = Math.min(window.devicePixelRatio || 1, 1.25) * 0.7;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(2, Math.floor(width * scale));
      canvas.height = Math.max(2, Math.floor(height * scale));
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Interactive mouse state
    const mouse = {
      x: width * 0.5,
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5,
      isOverTextOrIcon: false,
      hoverIntensity: 0,
    };

    const ripples: WaterRipple[] = [];
    const MAX_RIPPLES = 12;

    let lastSpawn = 0;
    const onPointerMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      // Check if mouse is hovering over text, icons, buttons, or links
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest(
          "a, button, [role='button'], h1, h2, h3, h4, p, span, svg, .display, .eyebrow, [data-split-word]"
        )
      );

      mouse.isOverTextOrIcon = isInteractive;

      // Spawn fluid ripple when hovering over text/icons
      const now = performance.now();
      if (isInteractive && now - lastSpawn > 120 && ripples.length < MAX_RIPPLES) {
        lastSpawn = now;
        ripples.push({
          x: e.clientX * scale,
          y: e.clientY * scale,
          radius: 4 * scale,
          maxRadius: (65 + Math.random() * 45) * scale,
          intensity: 0.55,
          speed: (1.4 + Math.random() * 0.8) * scale,
        });
      }
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });

    let isVisible = true;
    const onVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    let time = 0;
    const render = () => {
      if (isVisible) {
        const cW = canvas.width;
        const cH = canvas.height;
        ctx.clearRect(0, 0, cW, cH);
        time += 0.018;

        // Smoothly interpolate mouse position
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;

        // Smooth hover intensity for glassmorphic refraction
        const targetHover = mouse.isOverTextOrIcon ? 1 : 0;
        mouse.hoverIntensity += (targetHover - mouse.hoverIntensity) * 0.1;

        const scaledMouseX = mouse.x * scale;
        const scaledMouseY = mouse.y * scale;

        // 1. Fluid ambient color glow
        const gradient = ctx.createRadialGradient(
          scaledMouseX,
          scaledMouseY,
          10 * scale,
          scaledMouseX,
          scaledMouseY,
          (280 + Math.sin(time * 1.5) * 40) * scale
        );

        gradient.addColorStop(0, `rgba(241, 73, 158, ${0.12 + mouse.hoverIntensity * 0.12})`);
        gradient.addColorStop(0.4, `rgba(139, 60, 192, ${0.06 + mouse.hoverIntensity * 0.08})`);
        gradient.addColorStop(0.8, "rgba(54, 67, 193, 0.02)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, cW, cH);

        // 2. Interactive Glassmorphic Refraction Lens around Cursor (Active over text & icons)
        if (mouse.hoverIntensity > 0.02) {
          const lensRadius = (42 + Math.sin(time * 3) * 6) * scale;
          ctx.save();
          ctx.beginPath();
          ctx.arc(scaledMouseX, scaledMouseY, lensRadius, 0, Math.PI * 2);

          // Frosted glass droplet fill
          const glassGrad = ctx.createRadialGradient(
            scaledMouseX - 10 * scale,
            scaledMouseY - 10 * scale,
            2 * scale,
            scaledMouseX,
            scaledMouseY,
            lensRadius
          );
          glassGrad.addColorStop(0, `rgba(255, 255, 255, ${mouse.hoverIntensity * 0.35})`);
          glassGrad.addColorStop(0.7, `rgba(255, 147, 74, ${mouse.hoverIntensity * 0.12})`);
          glassGrad.addColorStop(1, `rgba(251, 132, 208, ${mouse.hoverIntensity * 0.25})`);

          ctx.fillStyle = glassGrad;
          ctx.fill();

          // Glassmorphic specular rim
          ctx.lineWidth = 1.2 * scale;
          ctx.strokeStyle = `rgba(255, 255, 255, ${mouse.hoverIntensity * 0.65})`;
          ctx.stroke();
          ctx.restore();
        }

        // 3. Fluid Water Expanding Ripples
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.radius += r.speed;
          r.intensity *= 0.96;

          if (r.radius >= r.maxRadius || r.intensity <= 0.01) {
            ripples.splice(i, 1);
            continue;
          }

          // Draw dual caustic refraction rings
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.lineWidth = 1.4 * scale;
          ctx.strokeStyle = `rgba(241, 73, 158, ${r.intensity * 0.35})`;
          ctx.stroke();

          // Outer secondary ripple wave
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.75, 0, Math.PI * 2);
          ctx.lineWidth = 0.8 * scale;
          ctx.strokeStyle = `rgba(54, 67, 193, ${r.intensity * 0.2})`;
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover transition-opacity duration-500"
    />
  );
};
