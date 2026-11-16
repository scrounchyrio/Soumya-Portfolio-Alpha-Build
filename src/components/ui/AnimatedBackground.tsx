"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FluidFractalCanvas } from "./FluidFractalCanvas";

export const AnimatedBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#FAFAFA]"
      aria-hidden="true"
    >
      {/* Interactive Loop Fluid Fractal Shader Canvas */}
      <FluidFractalCanvas />

      {/* Subtle Technical Dot Grid Texture */}
      <div
        className="absolute inset-0 bg-dot-matrix-light opacity-50"
        style={{
          backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.065) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Floating Micro-Labels / Telemetry HUD Tags (Nothing.tech + Arshawn Arbabi Aesthetic) */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Micro-Label 1: Top Left Coordinate */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.35, 0.65, 0.35],
              x: [0, 18, 0],
              y: [0, -14, 0],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-28 left-8 sm:left-16 hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white/80 backdrop-blur-md font-mono text-[9px] text-neutral-600 tracking-widest uppercase shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71921] animate-pulse" />
            <span>22°34&apos;N · 88°21&apos;E</span>
          </motion.div>

          {/* Micro-Label 2: Top Right Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              x: [0, -15, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              delay: 3,
              ease: "easeInOut",
            }}
            className="absolute top-44 right-8 sm:right-20 hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white/80 backdrop-blur-md font-mono text-[9px] text-neutral-600 tracking-widest uppercase shadow-xs"
          >
            <span className="text-[#D71921]">●</span>
            <span>SYSTEM_LIGHT // CALIBRATED</span>
          </motion.div>

          {/* Micro-Label 3: Mid Screen Left Discipline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.25, 0.55, 0.25],
              x: [0, 12, 0],
              y: [0, 22, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              delay: 6,
              ease: "easeInOut",
            }}
            className="absolute top-[48%] left-6 sm:left-12 hidden xl:flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white/80 backdrop-blur-md font-mono text-[9px] text-neutral-600 tracking-widest uppercase shadow-xs"
          >
            <span>[DISCIPLINE: LOOKDEV + POLICY]</span>
          </motion.div>

          {/* Micro-Label 4: Lower Right Firmware */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              x: [0, -18, 0],
              y: [0, -16, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              delay: 9,
              ease: "easeInOut",
            }}
            className="absolute bottom-40 right-10 sm:right-24 hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white/80 backdrop-blur-md font-mono text-[9px] text-neutral-600 tracking-widest uppercase shadow-xs"
          >
            <span>REF: NDOT-LIGHT-V2</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          </motion.div>
        </div>
      )}
    </div>
  );
};
