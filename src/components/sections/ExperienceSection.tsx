"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig, Experience } from "../../../site.config";
import { SectionHeader } from "../ui/SectionHeader";
import { ArrowUpRight, MapPin, Calendar, CheckCircle2, ChevronRight, Activity } from "lucide-react";

export const ExperienceSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section id="experience" className="py-24 md:py-32 relative border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="02"
          tag="CAREER TRAJECTORY & ROLES"
          title="Experience that connects."
          subtitle="From deadline-driven Hollywood VFX pipelines to bilateral sustainability research across Southeast Asia."
          note="CHRONOLOGY // 2021 — 2026"
        />

        {/* Experience Cards Stack / Timeline with Continuous Fluid Hover */}
        <div className="space-y-6">
          {siteConfig.experiences.map((exp: Experience, index: number) => {
            const isExpanded = selectedId === exp.id;

            return (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 240, damping: 20, delay: index * 0.06 }}
                whileHover={{
                  y: -4,
                  scale: 1.008,
                  boxShadow: "0 16px 40px rgba(0,0,0,0.06)",
                }}
                className={`relative rounded-2xl border transition-all duration-300 overflow-hidden bg-white/85 backdrop-blur-md group ${
                  isExpanded
                    ? "border-neutral-400 shadow-[0_12px_36px_rgba(0,0,0,0.07)] bg-white"
                    : "border-neutral-200/90 hover:border-black/30 hover:bg-white"
                }`}
              >
                {/* Continuous Shimmer Scanning Light as long as mouse hovers */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D71921] to-transparent opacity-0 group-hover:opacity-100"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Corner Crosshairs */}
                <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-black/25 group-hover:scale-125 transition-transform" />
                <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-black/25 group-hover:scale-125 transition-transform" />

                <div className="p-6 sm:p-8">
                  {/* Top Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-neutral-200 font-mono text-xs text-neutral-500">
                    <div className="flex items-center gap-3">
                      <span className="text-[#D71921] font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-neutral-300">/</span>
                      <span className="text-neutral-700 uppercase font-semibold">{exp.type}</span>
                    </div>

                    <div className="flex items-center gap-4 text-[11px]">
                      <span className="flex items-center gap-1.5 text-neutral-500">
                        <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                        {exp.period}
                      </span>
                      <span className="text-neutral-300 hidden sm:inline">|</span>
                      <span className="flex items-center gap-1.5 text-neutral-500">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Main Header: Logo Badge + Hyperlinked Org + Role */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      {/* Industrial Monogram Logo Badge with Wobble Hover */}
                      <motion.div
                        whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 450, damping: 10 }}
                        className="w-12 h-12 rounded-xl bg-neutral-100 border border-neutral-300 flex items-center justify-center font-mono text-xs font-bold text-neutral-900 tracking-widest shrink-0 shadow-inner group-hover:border-[#D71921] group-hover:text-[#D71921] transition-colors"
                      >
                        <span>{exp.logoText}</span>
                      </motion.div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <a
                            href={exp.orgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl sm:text-2xl font-light text-neutral-900 hover:text-black transition-colors group/link inline-flex items-center gap-2"
                          >
                            <span className="font-normal">{exp.organization}</span>
                            <ArrowUpRight className="w-4 h-4 text-[#D71921] group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                          </a>
                        </div>
                        <p className="font-mono text-xs sm:text-sm text-[#D71921] tracking-wider uppercase font-semibold flex items-center gap-2">
                          <span>{exp.role}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D71921] opacity-0 group-hover:opacity-100 animate-ping" />
                        </p>
                      </div>
                    </div>

                    {/* Expand Details Trigger */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedId(isExpanded ? null : exp.id)}
                      className="self-start sm:self-center px-3.5 py-1.5 rounded-full border border-neutral-300 hover:border-black/30 bg-neutral-50 hover:bg-white font-mono text-[11px] text-neutral-700 hover:text-black transition-all inline-flex items-center gap-1.5 shadow-2xs font-medium"
                    >
                      <span>{isExpanded ? "Collapse" : "Highlights"}</span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isExpanded ? "rotate-90 text-[#D71921]" : ""
                        }`}
                      />
                    </motion.button>
                  </div>

                  {/* 2-3 Line Description */}
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light mb-6 max-w-4xl">
                    {exp.description}
                  </p>

                  {/* Expanded Highlights */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="pt-2 pb-6 border-t border-neutral-200 space-y-2.5"
                    >
                      <span className="block font-mono text-[10px] text-neutral-500 tracking-widest uppercase font-semibold">
                        KEY DELIVERABLES & IMPACT:
                      </span>
                      {exp.highlights.map((item, hIdx) => (
                        <motion.div
                          key={hIdx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: hIdx * 0.08 }}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#D71921] shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-light">{item}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Tech / Skill Tags Row with Bouncy Hover */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-100">
                    {exp.skills.map((skill: string) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.1, y: -2, backgroundColor: "#FFFFFF", borderColor: "rgba(0,0,0,0.3)" }}
                        transition={{ type: "spring", stiffness: 450, damping: 12 }}
                        className="px-3 py-1 rounded-full border border-neutral-200 bg-neutral-100/80 font-mono text-[10px] text-neutral-700 uppercase tracking-wider cursor-default shadow-2xs font-medium"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
