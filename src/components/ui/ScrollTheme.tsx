"use client";

import React, { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "home", label: "Overview", theme: "emerald", color: "#F1499E" },
  { id: "projects", label: "Works", theme: "mint", color: "#3643C1" },
  { id: "about", label: "About", theme: "spring", color: "#8B3CC0" },
  { id: "experience", label: "Experience", theme: "forest", color: "#FF934A" },
  { id: "gallery", label: "Gallery", theme: "emerald", color: "#D6337E" },
  { id: "linkedin", label: "Updates", theme: "mint", color: "#FF8A3D" },
  { id: "specs", label: "Skills", theme: "spring", color: "#FB84D0" },
  { id: "education", label: "Education", theme: "forest", color: "#FFB145" },
  { id: "contact", label: "Contact", theme: "emerald", color: "#FE8780" },
] as const;

export const ScrollTheme: React.FC = () => {
  const [activeLabel, setActiveLabel] = useState("Overview");
  const [activeTheme, setActiveTheme] = useState("emerald");
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observed = SECTIONS.reduce<{ element: HTMLElement; section: (typeof SECTIONS)[number] }[]>((items, section) => {
      const element = document.getElementById(section.id);
      if (element) items.push({ element, section });
      return items;
    }, []);

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const progress = range > 0 ? Math.min(window.scrollY / range, 1) : 0;
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${progress})`;
      }
    };

    const requestProgress = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries.find((entry) => entry.isIntersecting);
        if (!active) return;
        const match = observed.find((item) => item.element === active.target);
        if (!match) return;

        const { id, label, theme } = match.section;
        document.documentElement.setAttribute("data-theme", theme);
        setActiveLabel(label);
        setActiveTheme(theme);

        window.dispatchEvent(
          new CustomEvent("theme:section", {
            detail: { id, label, theme },
          })
        );
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    observed.forEach(({ element }) => observer.observe(element));
    updateProgress();
    window.addEventListener("scroll", requestProgress, { passive: true });
    window.addEventListener("resize", requestProgress, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestProgress);
      window.removeEventListener("resize", requestProgress);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="site-scroll-theme pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 items-center gap-3.5 md:flex"
    >
      <span className="eyebrow writing-mode-vertical text-fg/50 transition-colors duration-300">
        {activeLabel}
      </span>
      <span className="relative h-28 w-1 overflow-hidden rounded-full bg-fg/10 shadow-inner">
        <span
          ref={fillRef}
          className="scroll-progress-fill absolute inset-x-0 top-0 h-full rounded-full bg-accent transition-colors duration-500 shadow-[0_0_12px_rgba(var(--accent-rgb),0.8)]"
        />
      </span>
    </div>
  );
};
