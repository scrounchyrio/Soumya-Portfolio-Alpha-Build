"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "ghost";
  target?: string;
  rel?: string;
  download?: boolean | string;
}

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
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Subdued magnetic attraction
    const distanceX = (clientX - centerX) * 0.22;
    const distanceY = (clientY - centerY) * 0.22;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary:
      "bg-white text-black hover:bg-neutral-200 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.15)]",
    secondary:
      "bg-neutral-900/90 text-white hover:bg-neutral-800 border border-white/15 backdrop-blur-md",
    accent:
      "bg-[#D71921] text-white hover:bg-[#b5141b] border border-[#D71921]/50 shadow-[0_0_15px_rgba(215,25,33,0.35)]",
    ghost:
      "bg-transparent text-white/80 hover:text-white border border-transparent hover:border-white/20",
  }[variant];

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20, mass: 0.5 }}
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-mono text-xs tracking-widest uppercase transition-colors select-none ${variantStyles} ${className}`}
    >
      {/* Subtle indicator dot */}
      {variant === "secondary" && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#D71921] animate-pulse" />
      )}
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        download={download}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block">
      {content}
    </button>
  );
};
