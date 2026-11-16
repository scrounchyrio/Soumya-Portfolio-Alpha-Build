"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  number: string;
  tag: string;
  title: string;
  subtitle?: string;
  note?: string;
  align?: "left" | "between";
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  tag,
  title,
  subtitle,
  note,
  align = "between",
}) => {
  return (
    <div className="relative mb-14 md:mb-20">
      {/* Top Hairline with crosshairs */}
      <div className="relative border-t border-black/10 pt-4 flex items-center justify-between font-mono text-[11px] tracking-widest text-neutral-500 uppercase">
        <div className="flex items-center gap-3">
          <span className="text-[#D71921] font-bold">{number}</span>
          <span className="text-neutral-300">/</span>
          <span className="font-medium text-neutral-600">{tag}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block text-neutral-400">22°34&apos;N · 88°21&apos;E</span>
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
        </div>
      </div>

      {/* Main Title Layout */}
      <div
        className={`mt-6 flex flex-col ${
          align === "between"
            ? "md:flex-row md:items-end md:justify-between gap-6"
            : "gap-4"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-900 leading-[1.08]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-lg md:text-xl text-neutral-600 font-light leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        {note && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xs md:text-sm font-mono text-neutral-400 max-w-xs tracking-wider leading-relaxed uppercase"
          >
            {note}
          </motion.p>
        )}
      </div>
    </div>
  );
};
