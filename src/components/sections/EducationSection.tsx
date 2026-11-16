"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig, Education } from "../../../site.config";
import { SectionHeader } from "../ui/SectionHeader";
import { GraduationCap, Award, Calendar } from "lucide-react";

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 md:py-32 relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="07"
          tag="ACADEMIC FOUNDATION & DEGREES"
          title="Grounded in ideas."
          subtitle="A multidisciplinary foundation spanning environmental management, political science, and digital media craft."
          note="ACCREDITATION // PEDAGOGY"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.education.map((edu: Education, idx: number) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative rounded-2xl bg-[#090909] border border-white/10 hover:border-white/25 transition-all p-6 sm:p-7 flex flex-col justify-between"
            >
              {/* Corner crosshairs */}
              <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-white/20" />
              <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-white/20" />

              <div>
                {/* Year & Icon */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 font-mono text-xs text-white/50">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-white/30" />
                    <span>{edu.period}</span>
                  </div>
                  <GraduationCap className="w-4 h-4 text-[#D71921]" />
                </div>

                {/* Degree & Institution */}
                <h3 className="text-xl font-light text-white mb-2 leading-snug">
                  {edu.degree}
                </h3>
                <p className="font-mono text-xs text-[#D71921] uppercase tracking-wider mb-1">
                  {edu.institution}
                </p>
                <p className="text-xs text-white/50 font-mono mb-4">
                  {edu.faculty}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  {edu.highlights.map((h, hIdx) => (
                    <p key={hIdx} className="text-xs text-white/70 font-light leading-relaxed">
                      • {h}
                    </p>
                  ))}
                </div>
              </div>

              {/* Score / Honors Pill */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px]">
                <span className="text-white font-medium">{edu.score}</span>
                {edu.honors && (
                  <span className="text-[#D71921] uppercase tracking-wider text-[10px]">
                    {edu.honors}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
