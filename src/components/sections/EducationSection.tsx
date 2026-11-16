"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig, Education } from "../../../site.config";
import { SectionHeader } from "../ui/SectionHeader";
import { GraduationCap, Calendar } from "lucide-react";

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 md:py-32 relative border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="07"
          tag="ACADEMIC FOUNDATION & DEGREES"
          title="Grounded in ideas."
          subtitle="A multidisciplinary foundation spanning environmental management, political science, and digital media craft."
          note="ACCREDITATION // PEDAGOGY"
        />

        {/* Education Grid with Bouncy Hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.education.map((edu: Education, idx: number) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 240, damping: 20, delay: idx * 0.08 }}
              whileHover={{
                y: -6,
                scale: 1.015,
                boxShadow: "0 18px 45px rgba(0,0,0,0.06)",
              }}
              className="relative rounded-2xl bg-white/85 border border-neutral-200/90 hover:border-black/30 transition-all p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:bg-white group cursor-default"
            >
              {/* Corner crosshairs */}
              <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-black/25 group-hover:scale-125 transition-transform" />
              <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-black/25 group-hover:scale-125 transition-transform" />

              <div>
                {/* Year & Icon */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200 font-mono text-xs text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="font-medium text-neutral-600">{edu.period}</span>
                  </div>
                  <motion.div whileHover={{ rotate: 18, scale: 1.2 }}>
                    <GraduationCap className="w-4 h-4 text-[#D71921]" />
                  </motion.div>
                </div>

                {/* Degree & Institution */}
                <h3 className="text-xl font-light text-neutral-900 mb-2 leading-snug font-medium">
                  {edu.degree}
                </h3>
                <p className="font-mono text-xs text-[#D71921] uppercase tracking-wider mb-1 font-bold">
                  {edu.institution}
                </p>
                <p className="text-xs text-neutral-500 font-mono mb-4 font-medium">
                  {edu.faculty}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  {edu.highlights.map((h, hIdx) => (
                    <p key={hIdx} className="text-xs text-neutral-600 font-light leading-relaxed">
                      • {h}
                    </p>
                  ))}
                </div>
              </div>

              {/* Score / Honors Pill */}
              <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between font-mono text-[11px]">
                <span className="text-neutral-900 font-bold">{edu.score}</span>
                {edu.honors && (
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="text-[#D71921] uppercase tracking-wider text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D71921]/10 border border-[#D71921]/30"
                  >
                    {edu.honors}
                  </motion.span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
