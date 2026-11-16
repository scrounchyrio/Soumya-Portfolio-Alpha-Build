"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MonogramLogo } from "./MonogramLogo";

export const SplashScreen: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [bootStep, setBootStep] = useState(0);

  const steps = [
    "NOTHING_OS // BOOT SEQUENCE",
    "CALIBRATING NDOT MATRIX...",
    "LOADING METRICS & CREDITS...",
    "SYSTEM ONLINE // SM-PORTFOLIO",
  ];

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    const stepInterval = setInterval(() => {
      setBootStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 320);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 1800);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(timer);
    };
  }, [steps.length]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-[#FAFAFA] flex flex-col items-center justify-center p-6 select-none"
          onClick={() => setVisible(false)}
        >
          {/* Subtle background matrix */}
          <div className="absolute inset-0 bg-dot-matrix opacity-40 pointer-events-none" />

          {/* Centerpiece: Assembling Dot Matrix Monogram */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <MonogramLogo size="hero" showHousing={true} interactive={false} />
            
            {/* Corner Crosshairs */}
            <div className="absolute -top-4 -left-4 w-3 h-3 border-t border-l border-black/25" />
            <div className="absolute -top-4 -right-4 w-3 h-3 border-t border-r border-black/25" />
            <div className="absolute -bottom-4 -left-4 w-3 h-3 border-b border-l border-black/25" />
            <div className="absolute -bottom-4 -right-4 w-3 h-3 border-b border-r border-black/25" />
          </motion.div>

          {/* Boot telemetry */}
          <div className="mt-10 font-mono text-[11px] tracking-[0.2em] uppercase text-center space-y-2 max-w-sm">
            <div className="flex items-center justify-center gap-2 text-neutral-800">
              <span className="w-2 h-2 rounded-full bg-[#D71921] animate-ping" />
              <span>{steps[bootStep]}</span>
            </div>

            <div className="w-48 h-[2px] bg-black/10 mx-auto rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-black"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              />
            </div>

            <p className="text-[9px] text-neutral-400 tracking-widest pt-2">
              CLICK ANYWHERE TO SKIP
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
