"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "../../lib/motion";

/**
 * Dot + lagging ring. Elements opt in to a labelled state with
 * data-cursor="view" and data-cursor-text="LABEL". Fine pointers only.
 */
export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!fine || !dot || !ring || !label) return;

    document.documentElement.classList.add("has-cursor");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.05 });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.05 });
    const ringX = gsap.quickTo(ring, "x", { duration: reduced ? 0.05 : 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: reduced ? 0.05 : 0.45, ease: "power3" });

    let visible = false;
    const onMove = (event: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.set([dot, ring], { x: event.clientX, y: event.clientY });
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);

      const target = event.target as HTMLElement | null;
      const view = target?.closest<HTMLElement>("[data-cursor='view']");
      const interactive = target?.closest("a, button, [role='button'], input, textarea, summary");

      if (view) {
        label.textContent = view.dataset.cursorText ?? "VIEW";
        gsap.to(ring, { width: 84, height: 84, backgroundColor: "#0a0a0b", borderColor: "#0a0a0b", duration: 0.35, ease: "expo.out" });
        gsap.to(label, { opacity: 1, duration: 0.2 });
        gsap.to(dot, { scale: 0, duration: 0.2 });
      } else if (interactive) {
        label.textContent = "";
        gsap.to(ring, { width: 52, height: 52, backgroundColor: "rgba(10,10,11,0)", borderColor: "#F1499E", duration: 0.35, ease: "expo.out" });
        gsap.to(label, { opacity: 0, duration: 0.15 });
        gsap.to(dot, { scale: 1, duration: 0.2 });
      } else {
        label.textContent = "";
        gsap.to(ring, { width: 32, height: 32, backgroundColor: "rgba(10,10,11,0)", borderColor: "rgba(10,10,11,0.5)", duration: 0.35, ease: "expo.out" });
        gsap.to(label, { opacity: 0, duration: 0.15 });
        gsap.to(dot, { scale: 1, duration: 0.2 });
      }
    };
    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
      gsap.killTweensOf([dot, ring, label]);
    };
  }, []);

  return (
    <div aria-hidden="true" className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999]">
      <div ref={ringRef} className="fixed left-0 top-0 flex h-8 w-8 items-center opacity-0 justify-center rounded-full border border-fg/50">
        <span ref={labelRef} className="font-mono text-[10px] font-bold uppercase tracking-widest text-canvas opacity-0" />
      </div>
      <div ref={dotRef} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent opacity-0" />
    </div>
  );
};
