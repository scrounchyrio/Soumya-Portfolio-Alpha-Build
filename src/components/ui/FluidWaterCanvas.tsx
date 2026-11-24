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
 * Highly-Optimized Fluid Water Caustic Canvas with Zero-Layout-Thrashing Hover Lens.
 * - Completely removes document.elementFromPoint calls on mousemove (prevents forced synchronous reflows).
 * - Uses delegated pointerover/pointerout events on document for 120 FPS buttery smooth tracking.
 * - Generates clean energy emerald & aquamarine water luminescence with concentric glassmorphic ripples.
 * - Automatically pauses rendering when tab is hidden or when reduced motion is preferred.
 */
export const FluidWaterCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

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

    // Interactive mouse tracking state
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

    // Zero-overhead cursor coordinate tracking
    const onPointerMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      const now = performance.now();
      if (mouse.isOverTextOrIcon && now - lastSpawn > 140 && ripples.length < MAX_RIPPLES) {
        lastSpawn = now;
        ripples.push({
          x: e.clientX * scale,
          y: e.clientY * scale,
          radius: 4 * scale,
          maxRadius: (60 + Math.random() * 40) * scale,
          intensity: 0.5,
          speed: (1.2 + Math.random() * 0.6) * scale,
        });
      }
    };

    // Fast delegated hover detection without document.elementFromPoint
    const onPointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = Boolean(
        target.closest("a, button, [role='button'], h1, h2, h3, h4, p, span, svg, .display, .eyebrow, [data-split-word]")
      );
      mouse.isOverTextOrIcon = isInteractive;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });

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
        time += 0.016;

        // Smooth cursor interpolation
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;

        const targetHover = mouse.isOverTextOrIcon ? 1 : 0;
        mouse.hoverIntensity += (targetHover - mouse.hoverIntensity) * 0.1;

        const scaledMouseX = mouse.x * scale;
        const scaledMouseY = mouse.y * scale;

        // 1. Fluid Ambient Clean Energy Glow (Emerald & Mint Green)
        const gradient = ctx.createRadialGradient(
          scaledMouseX,
          scaledMouseY,
          10 * scale,
          scaledMouseX,
          scaledMouseY,
          (280 + Math.sin(time * 1.5) * 40) * scale
        );

        gradient.addColorStop(0, `rgba(0, 210, 133, ${0.1 + mouse.hoverIntensity * 0.1})`);
        gradient.addColorStop(0.4, `rgba(0, 245, 212, ${0.05 + mouse.hoverIntensity * 0.06})`);
        gradient.addColorStop(0.8, "rgba(16, 185, 129, 0.02)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, cW, cH);

        // 2. Interactive Glassmorphic Refraction Lens around Cursor
        if (mouse.hoverIntensity > 0.02) {
          const lensRadius = (42 + Math.sin(time * 3) * 6) * scale;
          ctx.save();
          ctx.beginPath();
          ctx.arc(scaledMouseX, scaledMouseY, lensRadius, 0, Math.PI * 2);

          const glassGrad = ctx.createRadialGradient(
            scaledMouseX - 10 * scale,
            scaledMouseY - 10 * scale,
            2 * scale,
            scaledMouseX,
            scaledMouseY,
            lensRadius
          );
          glassGrad.addColorStop(0, `rgba(255, 255, 255, ${mouse.hoverIntensity * 0.35})`);
          glassGrad.addColorStop(0.7, `rgba(0, 245, 212, ${mouse.hoverIntensity * 0.12})`);
          glassGrad.addColorStop(1, `rgba(0, 210, 133, ${mouse.hoverIntensity * 0.22})`);

          ctx.fillStyle = glassGrad;
          ctx.fill();

          ctx.lineWidth = 1.2 * scale;
          ctx.strokeStyle = `rgba(0, 245, 212, ${mouse.hoverIntensity * 0.45})`;
          ctx.stroke();
          ctx.restore();
        }

        // 3. Fluid Water Caustics concentric ripple rings
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.radius += r.speed;
          const progress = r.radius / r.maxRadius;
          const currentAlpha = (1 - progress) * r.intensity;

          if (progress >= 1 || currentAlpha <= 0.01) {
            ripples.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.lineWidth = Math.max(1, (2.2 - progress * 1.5) * scale);
          ctx.strokeStyle = `rgba(0, 245, 212, ${currentAlpha * 0.45})`;
          ctx.stroke();

          // Internal secondary caustic refraction ring
          if (r.radius > 10 * scale) {
            ctx.beginPath();
            ctx.arc(r.x, r.y, r.radius * 0.65, 0, Math.PI * 2);
            ctx.lineWidth = 1 * scale;
            ctx.strokeStyle = `rgba(0, 210, 133, ${currentAlpha * 0.25})`;
            ctx.stroke();
          }
          ctx.restore();
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};
