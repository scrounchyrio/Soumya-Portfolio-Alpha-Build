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
    <section id="specs" className="py-24 md:py-32 relative border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="06"
          tag="HARDWARE & SKILL MATRIX"
          title={siteConfig.skills.heading}
          subtitle="A breakdown of production-tested 3D technical art proficiencies and empirical sustainability research tools."
          note="TECHNICAL SPECIFICATION // VERIFIED"
        />

        {/* Spec Sheet Grid with Interactive Row Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {siteConfig.skills.categories.map((cat, cIdx) => (
            <motion.div
              key={cat.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 240, damping: 20, delay: cIdx * 0.08 }}
              whileHover={{
                y: -6,
                boxShadow: "0 18px 45px rgba(0,0,0,0.06)",
              }}
              className="relative rounded-2xl bg-white/85 border border-neutral-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:bg-white hover:border-black/30 transition-all duration-300 group"
            >
              {/* Corner crosshairs */}
              <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-black/25 pointer-events-none group-hover:scale-125 transition-transform" />
              <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-black/25 pointer-events-none group-hover:scale-125 transition-transform" />

              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200 font-mono text-xs text-neutral-500">
                  <div className="flex items-center gap-2.5">
                    <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.4 }}>
                      {getCategoryIcon(cIdx)}
                    </motion.div>
                    <span className="text-neutral-900 font-bold uppercase tracking-wider">
                      {cat.code}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400 tracking-widest uppercase font-semibold">
                    SYS_MODULE
                  </span>
                </div>

                <h3 className="text-xl font-light text-neutral-900 mb-6 tracking-tight font-medium">
                  {cat.title}
                </h3>

                {/* Technical Skills Table with Interactive Bouncy Indentation */}
                <div className="space-y-3 font-mono text-xs">
                  {cat.skills.map((skill, sIdx) => (
                    <motion.div
                      key={sIdx}
                      whileHover={{ x: 6, backgroundColor: "rgba(0,0,0,0.02)" }}
                      transition={{ type: "spring", stiffness: 450, damping: 15 }}
                      className="flex items-center justify-between py-2 px-1 border-b border-neutral-100 group/row cursor-default rounded"
                    >
                      <span className="text-neutral-700 group-hover/row:text-black group-hover/row:font-medium transition-colors flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-neutral-300 group-hover/row:bg-[#D71921] transition-colors" />
                        {skill.name}
                      </span>
                      <span className="text-[10px] text-[#D71921] uppercase tracking-wider font-bold">
                        {skill.level}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Spec Footer */}
              <div className="mt-8 pt-4 border-t border-neutral-200 flex items-center justify-between font-mono text-[9px] text-neutral-500 uppercase font-semibold">
                <span>INDEX REF: 0{cIdx + 1}</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  STATUS: OPERATIONAL
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
