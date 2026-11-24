"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/motion";
import { Play, Pause, Film, Sparkles, Layers, Volume2 } from "lucide-react";
import { siteConfig } from "../../../site.config";

export const HeroMotionStage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaFrameRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const isPlayingRef = useRef(true);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const container = containerRef.current;
    const mediaFrame = mediaFrameRef.current;
    const glow = glowRef.current;
    if (!container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // GSAP quickTo setters for 120 FPS cursor tracking
    const glowX = glow ? gsap.quickTo(glow, "x", { duration: 0.5, ease: "power2.out" }) : null;
    const glowY = glow ? gsap.quickTo(glow, "y", { duration: 0.5, ease: "power2.out" }) : null;

    const frameRotX = mediaFrame ? gsap.quickTo(mediaFrame, "rotationX", { duration: 0.7, ease: "power2.out" }) : null;
    const frameRotY = mediaFrame ? gsap.quickTo(mediaFrame, "rotationY", { duration: 0.7, ease: "power2.out" }) : null;

    const onPointerMove = (e: PointerEvent) => {
      if (!isPlayingRef.current) return;
      const rect = container.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      if (glowX && glowY) {
        glowX(relX);
        glowY(relY);
      }

      if (frameRotX && frameRotY && mediaFrame) {
        const normX = (relX / rect.width) * 2 - 1;
        const normY = (relY / rect.height) * 2 - 1;
        frameRotY(normX * 8);
        frameRotX(-normY * 8);
      }
    };

    const onPointerLeave = () => {
      if (frameRotX && frameRotY) {
        frameRotX(0);
        frameRotY(0);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden [perspective:1400px] py-4"
    >
      {/* Voy Design & Moiséz Reactive Architectural Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Palette-colored cursor aura */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-accent/35 via-[#FFB145]/20 to-transparent blur-3xl transition-opacity duration-700"
        style={{ opacity: isPlaying ? 0.85 : 0.2 }}
      />

      {/* Floating 3D Tilt Media Showcase Frame (Apple × Voy Design Glassmorphism) */}
      <div
        ref={mediaFrameRef}
        style={{ transformStyle: "preserve-3d" }}
        className="glass-dark group relative my-3 w-full max-w-5xl overflow-hidden rounded-[28px] border border-accent/25 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_30px_70px_rgba(241,73,158,0.18)] hover:border-accent/50 sm:p-2.5"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white sm:aspect-[21/9]">
          {/* Subtle LookDev Anamorphic Film Grain & Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(251,132,208,0.06) 2px, rgba(251,132,208,0.06) 4px)`,
            }}
          />

          {/* Ambient palette-colored atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F1499E]/25 via-transparent to-[#3643C1]/20 opacity-70" />

          {/* Top Frame Telemetry */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 font-mono text-[11px] uppercase tracking-wider text-white/80 backdrop-blur-sm bg-black/25">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 items-center justify-center">
                <span className="h-2.5 w-2.5 animate-ping rounded-full bg-accent opacity-75" />
                <span className="h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-white font-bold tracking-widest">SHOWCASE STAGE // CINEMATIC REEL</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-white/60">ACES 2065-1</span>
              <span className="hidden sm:inline text-white/40">|</span>
              <span className="rounded-full bg-accent/25 border border-accent/40 px-2.5 py-0.5 text-[10px] font-bold text-accent">4K UHD</span>
            </div>
          </div>

          {/* Centerpiece: Cinematic Placeholder / Reel Trigger (Ready for user video/images) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 font-mono text-[11px] uppercase tracking-widest text-white backdrop-blur-md">
              <Film className="h-3.5 w-3.5 text-accent" />
              <span>Hollywood LookDev &amp; Sustainability Visuals</span>
            </div>

            <h3 className="display max-w-xl text-[clamp(1.75rem,3.6vw,3.25rem)] leading-tight text-white font-medium">
              Cinematic Works &amp; Research Portfolio
            </h3>

            <p className="mt-2 max-w-lg font-mono text-xs text-white/70">
              Furiosa: Mad Max · Sonic 2 · Bullet Train · Ubon Green Hydrogen
            </p>

            <a
              href="https://scrounchyrio.artstation.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-neutral-950 transition-all hover:bg-white hover:text-neutral-950 shadow-lg hover:shadow-accent/40"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Explore Showreel</span>
            </a>
          </div>

          {/* Bottom Telemetry & Film Badges */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-black/50 p-3.5 font-mono text-[10px] text-white/75 backdrop-blur-md sm:px-5">
            <div className="flex items-center gap-3">
              <span className="text-accent font-bold">DNEG // MPC // TECHNICOLOR</span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span className="hidden sm:inline text-white/70">COLOUR PIPELINE 10-BIT</span>
            </div>
            <div className="flex items-center gap-2 text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFB145]" />
              <span>READY FOR MEDIA DROP-IN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Motion Controls Bar (Voy Design inspiration) */}
      <div className="mt-3 flex w-full max-w-5xl items-center justify-between px-3 font-mono text-[11px] text-fg/60">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="uppercase tracking-wider">KOLKATA {siteConfig.meta.coordinates}</span>
        </div>

        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          className="glass-card inline-flex items-center gap-1.5 rounded-full border border-fg/15 px-3.5 py-1 uppercase tracking-wider text-fg/80 backdrop-blur-sm transition-colors hover:border-accent hover:text-accent shadow-sm"
          title={isPlaying ? "Pause motion animations" : "Resume motion animations"}
          aria-label={isPlaying ? "Pause motion animations" : "Resume motion animations"}
        >
          {isPlaying ? (
            <>
              <Pause className="h-3 w-3 text-accent" />
              <span>Pause motion</span>
            </>
          ) : (
            <>
              <Play className="h-3 w-3 text-accent" />
              <span>Play motion</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
