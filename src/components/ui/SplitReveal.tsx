"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../../lib/motion";

interface SplitRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** Delay in seconds. */
  delay?: number;
  /** Start on scroll (default) or, when false, as soon as mounted with intro animation. */
  onScroll?: boolean;
  /** Words matching this list are rendered in the serif italic accent. */
  italic?: string[];
}

const strip = (w: string) => w.replace(/[.,!?'’]/g, "").toLowerCase();

/**
 * Word-by-word reveal with cinematic blur-to-focus entrance and section-wise fade-in/fade-out.
 */
export const SplitReveal: React.FC<SplitRevealProps> = ({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  onScroll = true,
  italic = [],
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const words = text.split(" ");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inner = el.querySelectorAll<HTMLElement>("[data-split-word]");
    if (prefersReducedMotion()) {
      gsap.set(inner, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      if (!onScroll) {
        // High-impact intro entrance animation (for "Ideas made to move people")
        gsap.fromTo(
          inner,
          { opacity: 0, y: 55, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.08,
            delay: delay + 0.15,
          }
        );
      } else {
        // Section-wise scroll animation with smooth fade-in and fade-out
        gsap.fromTo(
          inner,
          { opacity: 0, y: 35, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.04,
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "bottom 10%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [delay, onScroll, text]);

  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => {
        const isItalic = italic.some((w) => strip(w) === strip(word));
        return (
          <React.Fragment key={`${word}-${i}`}>
            <span
              data-split-word
              aria-hidden="true"
              className={`split-word${isItalic ? " display-serif text-accent" : ""}`}
              style={{ opacity: 0 }}
            >
              {word}
            </span>
            {i < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </Component>
  );
};
