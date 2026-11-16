"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "view" | "hidden">("default");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for lagging outer ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest("a, button, [role='button'], input, textarea, select");
      const viewEl = target.closest("[data-cursor='view']");
      const exploreEl = target.closest("[data-cursor='explore']");
      const hiddenEl = target.closest("[data-cursor='hidden']");

      if (hiddenEl) {
        setCursorVariant("hidden");
        setCursorText("");
      } else if (viewEl) {
        setCursorVariant("view");
        setCursorText(viewEl.getAttribute("data-cursor-text") || "VIEW");
      } else if (exploreEl) {
        setCursorVariant("view");
        setCursorText("OPEN");
      } else if (interactiveEl) {
        setCursorVariant("hover");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      setCursorVariant("hidden");
    };

    const handleMouseEnter = () => {
      setCursorVariant("default");
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!mounted || isTouchDevice) return null;

  return (
    <>
      {/* Precision Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] bg-white transition-opacity duration-200"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: cursorVariant === "hidden" ? 0 : 1,
        }}
      />

      {/* Trailing Nothing Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center border transition-colors duration-200"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorVariant === "view" ? 64 : cursorVariant === "hover" ? 44 : 28,
          height: cursorVariant === "view" ? 64 : cursorVariant === "hover" ? 44 : 28,
          borderColor:
            cursorVariant === "view"
              ? "#D71921"
              : cursorVariant === "hover"
              ? "rgba(255, 255, 255, 0.7)"
              : "rgba(255, 255, 255, 0.25)",
          backgroundColor:
            cursorVariant === "view"
              ? "rgba(215, 25, 33, 0.15)"
              : cursorVariant === "hover"
              ? "rgba(255, 255, 255, 0.08)"
              : "transparent",
          opacity: cursorVariant === "hidden" ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {cursorText && (
          <span className="font-mono text-[9px] tracking-widest text-[#D71921] font-bold uppercase select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
};
