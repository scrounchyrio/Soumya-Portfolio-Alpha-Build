"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../../../site.config";
import { SectionHeader } from "../ui/SectionHeader";
import { Cpu, Terminal, Compass, Globe } from "lucide-react";

export const SystemSpecsSection: React.FC = () => {
  const getCategoryIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Cpu className="w-4 h-4 text-[#D71921]" />;
      case 1:
        return <Terminal className="w-4 h-4 text-[#D71921]" />;
      case 2:
        return <Compass className="w-4 h-4 text-[#D71921]" />;
      default:
        return <Globe className="w-4 h-4 text-[#D71921]" />;
    }
  };

  return (
    <section id="specs" className="py-24 md:py-32 relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="06"
          tag="HARDWARE & SKILL MATRIX"
          title={siteConfig.skills.heading}
          subtitle="A breakdown of production-tested 3D technical art proficiencies and empirical sustainability research tools."
          note="TECHNICAL SPECIFICATION // VERIFIED"
        />

        {/* Spec Sheet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {siteConfig.skills.categories.map((cat, cIdx) => (
            <motion.div
              key={cat.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: cIdx * 0.1 }}
              className="relative rounded-2xl bg-[#0A0A0A] border border-white/10 p-6 sm:p-8 flex flex-col justify-between"
            >
              {/* Corner crosshairs */}
              <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-white/25 pointer-events-none" />
              <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-white/25 pointer-events-none" />

              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 font-mono text-xs text-white/50">
                  <div className="flex items-center gap-2.5">
                    {getCategoryIcon(cIdx)}
                    <span className="text-white/80 font-bold uppercase tracking-wider">
                      {cat.code}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/30 tracking-widest uppercase">
                    SYS_MODULE
                  </span>
                </div>

                <h3 className="text-xl font-light text-white mb-6 tracking-tight">
                  {cat.title}
                </h3>

                {/* Technical Skills Table */}
                <div className="space-y-3 font-mono text-xs">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center justify-between py-2 border-b border-white/5 group hover:border-white/20 transition-colors"
                    >
                      <span className="text-white/80 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-[10px] text-[#D71921] uppercase tracking-wider">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Spec Footer */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-white/30 uppercase">
                <span>INDEX REF: 0{cIdx + 1}</span>
                <span>STATUS: OPERATIONAL</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
