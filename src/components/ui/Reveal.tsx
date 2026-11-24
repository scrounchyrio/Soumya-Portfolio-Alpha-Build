"use client";

import React, { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../../lib/motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Animate each direct child with a stagger instead of the wrapper. */
  stagger?: boolean;
  y?: number;
}

/**
 * Section-wise text & content reveal that smoothly fades in and fades out on scroll.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = "",
  delay = 0,
  stagger = false,
  y = 35,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const targets = stagger ? Array.from(el.children) : [el];
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          delay,
          stagger: stagger ? 0.06 : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "bottom 10%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
