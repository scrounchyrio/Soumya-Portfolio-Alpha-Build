"use client";

import React from "react";
import { motion } from "framer-motion";

interface FluidTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delayOffset?: number;
  hoverScale?: number;
}

export const FluidText: React.FC<FluidTextProps> = ({
  children,
  className = "",
  as: Component = "span",
  hoverScale = 1.15,
}) => {
  // Split text into words, preserving spaces
  const words = children.split(" ");

  return (
    <Component className={`inline-block select-none ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block cursor-default transition-colors duration-200"
              whileHover={{
                y: -6,
                scale: hoverScale,
                rotate: (Math.random() - 0.5) * 8,
                color: "#D71921",
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 10,
                },
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 18,
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </Component>
  );
};
