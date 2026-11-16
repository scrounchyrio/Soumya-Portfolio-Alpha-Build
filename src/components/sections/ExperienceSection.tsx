"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig, Experience } from "../../../site.config";
import { SectionHeader } from "../ui/SectionHeader";
import { ArrowUpRight, MapPin, Calendar, CheckCircle2, ChevronRight } from "lucide-react";

export const ExperienceSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section id="experience" className="py-24 md:py-32 relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="02"
          tag="CAREER TRAJECTORY & ROLES"
          title="Experience that connects."
          subtitle="From deadline-driven Hollywood VFX pipelines to bilateral sustainability research across Southeast Asia."
          note="CHRONOLOGY // 2021 — 2026"
        />

        {/* Experience Cards Stack / Timeline */}
        <div className="space-y-6">
          {siteConfig.experiences.map((exp: Experience, index: number) => {
            const isExpanded = selectedId === exp.id;

            return (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`relative rounded-2xl border transition-all duration-300 overflow-hidden bg-[#0B0B0B] ${
                  isExpanded
                    ? "border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                    : "border-white/10 hover:border-white/20 hover:bg-[#0E0E0E]"
                }`}
              >
                {/* Corner Crosshairs */}
                <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-white/20 pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-white/20 pointer-events-none" />

                <div className="p-6 sm:p-8">
                  {/* Top Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10 font-mono text-xs text-white/40">
                    <div className="flex items-center gap-3">
                      <span className="text-[#D71921] font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-white/20">/</span>
                      <span className="text-white/60 uppercase">{exp.type}</span>
                    </div>

                    <div className="flex items-center gap-4 text-[11px]">
                      <span className="flex items-center gap-1.5 text-white/50">
                        <Calendar className="w-3.5 h-3.5 text-white/30" />
                        {exp.period}
                      </span>
                      <span className="text-white/20 hidden sm:inline">|</span>
                      <span className="flex items-center gap-1.5 text-white/50">
                        <MapPin className="w-3.5 h-3.5 text-white/30" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Main Header: Logo Badge + Hyperlinked Org + Role */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      {/* Industrial Monogram Logo Badge */}
                      <div className="w-12 h-12 rounded-xl bg-black border border-white/15 flex items-center justify-center font-mono text-xs font-bold text-white tracking-widest shrink-0 shadow-inner group-hover:border-[#D71921]/50 transition-colors">
                        <span className="text-white/90">{exp.logoText}</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <a
                            href={exp.orgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl sm:text-2xl font-light text-white hover:text-white/80 transition-colors group/link inline-flex items-center gap-2"
                          >
                            <span>{exp.organization}</span>
                            <ArrowUpRight className="w-4 h-4 text-[#D71921] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </a>
                        </div>
                        <p className="font-mono text-xs sm:text-sm text-[#D71921] tracking-wider uppercase">
                          {exp.role}
                        </p>
                      </div>
                    </div>

                    {/* Expand Details Trigger */}
                    <button
                      type="button"
                      onClick={() => setSelectedId(isExpanded ? null : exp.id)}
                      className="self-start sm:self-center px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 bg-white/5 font-mono text-[11px] text-white/60 hover:text-white transition-all inline-flex items-center gap-1.5"
                    >
                      <span>{isExpanded ? "Collapse" : "Highlights"}</span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isExpanded ? "rotate-90 text-[#D71921]" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* 2-3 Line Description */}
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed font-light mb-6 max-w-4xl">
                    {exp.description}
                  </p>

                  {/* Expanded Highlights */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pt-2 pb-6 border-t border-white/10 space-y-2.5"
                    >
                      <span className="block font-mono text-[10px] text-white/40 tracking-widest uppercase">
                        KEY DELIVERABLES & IMPACT:
                      </span>
                      {exp.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                          <CheckCircle2 className="w-4 h-4 text-[#D71921] shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-light">{item}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Tech / Skill Tags Row */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                    {exp.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] font-mono text-[10px] text-white/60 uppercase tracking-wider hover:border-white/20 hover:text-white transition-colors"
                      >
                        {skill}
                      </span>
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
