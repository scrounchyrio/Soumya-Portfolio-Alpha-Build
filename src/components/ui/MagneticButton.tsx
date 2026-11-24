"use client";

import React, { useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (event?: React.MouseEvent) => void;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
  target?: string;
  rel?: string;
  download?: boolean | string;
}

const VARIANTS = {
  primary: "bg-fg text-canvas hover:bg-accent hover:text-white",
  outline: "border border-fg/25 text-fg hover:border-fg hover:bg-fg hover:text-canvas",
  ghost: "text-fg/60 hover:text-fg",
};

/** Pill button that leans toward the pointer without creating a tween per mouse move. */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
  target,
  rel,
  download,
}) => {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const frameRef = useRef<number>(0);
  const pointRef = useRef({ x: 0, y: 0 });

  const move = (event: React.PointerEvent<HTMLSpanElement>) => {
    const el = wrapRef.current;
    const rect = boundsRef.current;
    if (!el || !rect || event.pointerType === "touch") return;
    pointRef.current = { x: event.clientX, y: event.clientY };
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0;
      const point = pointRef.current;
      el.style.transform = `translate3d(${(point.x - (rect.left + rect.width / 2)) * 0.18}px, ${(point.y - (rect.top + rect.height / 2)) * 0.18}px, 0)`;
    });
  };

  const leave = () => {
    boundsRef.current = null;
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    if (wrapRef.current) wrapRef.current.style.transform = "translate3d(0, 0, 0)";
  };

  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-mono text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${VARIANTS[variant]} ${className}`;

  return (
    <span
      ref={wrapRef}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") boundsRef.current = event.currentTarget.getBoundingClientRect();
      }}
      onPointerMove={move}
      onPointerLeave={leave}
      className="motion-surface inline-block transition-transform duration-300 ease-expo"
    >
      {href ? (
        <a href={href} onClick={onClick} target={target} rel={rel} download={download} className={classes}>
          {children}
        </a>
      ) : (
        <button type="button" onClick={onClick} className={classes}>
          {children}
        </button>
      )}
    </span>
  );
};
