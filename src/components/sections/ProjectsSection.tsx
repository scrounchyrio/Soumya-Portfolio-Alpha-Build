"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig, Project } from "../../../site.config";
import { SectionHeader } from "../ui/SectionHeader";
import { ExternalLink, Film, BookOpen, Layers, Sparkles } from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "ALL WORKS" },
    { id: "policy", label: "POLICY & ENERGY" },
    { id: "sustainability", label: "SUSTAINABILITY" },
    { id: "vfx", label: "CINEMATIC VFX" },
    { id: "design", label: "CGI & DESIGN" },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? siteConfig.projects
      : siteConfig.projects.filter((p) => p.category === activeCategory);

  // Render stylized SVG visual cards according to project type - Light Theme with Continuous Hover Animation
  const renderVisualArt = (type: Project["visualType"]) => {
    switch (type) {
      case "policy":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 relative bg-dot-matrix group/art">
            <svg viewBox="0 0 240 120" className="w-full max-w-[240px] stroke-black/30 fill-none">
              <path d="M30 60 H 210" strokeDasharray="3 3" strokeWidth="0.8" />
              {/* India Node with Pulse */}
              <circle cx="50" cy="60" r="14" stroke="#111111" strokeWidth="1.2" className="group-hover/art:stroke-[#D71921] transition-colors" />
              <circle cx="50" cy="60" r="5" fill="#D71921" className="group-hover/art:scale-125 transition-transform" />
              <text x="50" y="88" textAnchor="middle" fill="#111111" fontSize="8" fontFamily="monospace" className="font-semibold">
                INDIA (NGHM)
              </text>
              {/* Thailand Node with Pulse */}
              <circle cx="190" cy="60" r="14" stroke="#111111" strokeWidth="1.2" className="group-hover/art:stroke-[#D71921] transition-colors" />
              <circle cx="190" cy="60" r="5" fill="#D71921" className="group-hover/art:scale-125 transition-transform" />
              <text x="190" y="88" textAnchor="middle" fill="#111111" fontSize="8" fontFamily="monospace" className="font-semibold">
                THAILAND (BCG)
              </text>
              {/* Bilateral Corridors */}
              <path d="M 64 50 Q 120 20 176 50" stroke="#D71921" strokeWidth="1.4" />
              <path d="M 64 70 Q 120 100 176 70" stroke="#111111" strokeWidth="1" strokeDasharray="2 2" />
              <text x="120" y="30" textAnchor="middle" fill="#D71921" fontSize="7" fontFamily="monospace" className="font-bold">
                H2 MARITIME CORRIDOR
              </text>
            </svg>
            <div className="absolute top-3 left-3 text-[9px] font-mono text-neutral-500 font-semibold">
              DISSERTATION // NALANDA-UBU
            </div>
          </div>
        );

      case "water":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 relative bg-dot-matrix group/art">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-black/15 animate-ping opacity-35" />
              <div className="w-24 h-24 rounded-full border border-black/20 flex items-center justify-center group-hover/art:scale-110 transition-transform duration-500">
                <div className="w-16 h-16 rounded-full border border-[#D71921]/70 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-xs font-mono text-[#D71921] font-bold shadow-xs">
                    H2O
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-3 left-3 text-[9px] font-mono text-neutral-500 font-semibold">
              UNDP × BAYER // REPORT ARCHITECTURE
            </div>
          </div>
        );

      case "ethics":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 relative bg-dot-matrix group/art">
            <div className="grid grid-cols-2 gap-3 text-center font-mono">
              <motion.div whileHover={{ scale: 1.08 }} className="p-3 border border-neutral-300 rounded-lg bg-white shadow-xs">
                <span className="block text-2xl font-light text-neutral-900 font-bold">10</span>
                <span className="text-[8px] text-neutral-500 tracking-widest uppercase font-semibold">PRINCIPLES</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.08 }} className="p-3 border border-[#D71921]/40 rounded-lg bg-white shadow-xs">
                <span className="block text-2xl font-light text-[#D71921] font-bold">16</span>
                <span className="text-[8px] text-[#D71921] tracking-widest uppercase font-bold">UN SDG</span>
              </motion.div>
            </div>
            <div className="absolute top-3 left-3 text-[9px] font-mono text-neutral-500 font-semibold">
              UNGC // COMPLIANCE MATRIX
            </div>
          </div>
        );

      case "cinematic":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 relative bg-neutral-100 group/art">
            <div className="text-center space-y-2 group-hover/art:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-300 bg-white font-mono text-[10px] text-neutral-800 shadow-xs font-semibold">
                <Film className="w-3.5 h-3.5 text-[#D71921]" />
                <span>HOLLYWOOD PIPELINE CREDITS</span>
              </div>
              <div className="font-mono text-xs text-neutral-700 tracking-widest font-medium">
                FURIOSA · SONIC 2 · BULLET TRAIN
              </div>
              <div className="text-[9px] font-mono text-[#D71921] tracking-widest font-bold">
                ACEScg · PBR TEXTURING · LOOKDEV
              </div>
            </div>
            <div className="absolute top-3 left-3 text-[9px] font-mono text-neutral-500 font-semibold">
              DNEG / MPC // 42+ ASSETS
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full flex items-center justify-center p-6 relative bg-dot-matrix">
            <div className="p-4 border border-neutral-300 rounded-xl bg-white shadow-xs text-center">
              <Layers className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
              <span className="font-mono text-[10px] text-neutral-700 tracking-widest uppercase font-semibold">
                HARDWARE RESEARCH SPEC
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="03"
          tag="SELECTED CASE STUDIES"
          title="Curiosity, put to work."
          subtitle="Explore deep-dive projects bridging empirical policy frameworks and photorealistic creative execution."
          note="ARCHIVE // CASE STUDIES & PAPERS"
        />

        {/* Filter Category Tabs with Bouncy Spring Feedback */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={`px-4 py-2 rounded-full font-mono text-xs tracking-widest uppercase flex items-center gap-2 transition-all ${
                  active
                    ? "bg-[#111111] text-white border border-black shadow-[0_4px_16px_rgba(0,0,0,0.15)] font-bold"
                    : "bg-white/90 text-neutral-700 border border-neutral-300 hover:text-black hover:border-black/30 hover:bg-white shadow-2xs font-medium"
                }`}
              >
                {active && <span className="w-1.5 h-1.5 rounded-full bg-[#D71921] animate-pulse" />}
                <span>{cat.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Case Studies Grid with Continuous Fluid Hover */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project: Project) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                whileHover={{
                  y: -6,
                  scale: 1.015,
                  boxShadow: "0 20px 48px rgba(0,0,0,0.08)",
                }}
                className="group relative rounded-2xl bg-white/90 border border-neutral-200/90 hover:border-black/30 transition-all duration-300 flex flex-col overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:bg-white cursor-pointer"
                data-cursor="view"
                data-cursor-text="CASE"
              >
                {/* Corner Crosshairs */}
                <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-black/25 pointer-events-none z-10 group-hover:scale-125 transition-transform" />
                <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-black/25 pointer-events-none z-10 group-hover:scale-125 transition-transform" />

                {/* Card Visual Header */}
                <div className="relative w-full h-52 bg-neutral-50/80 border-b border-neutral-200 overflow-hidden flex items-center justify-center">
                  {renderVisualArt(project.visualType)}

                  {/* Top Right Year Tag */}
                  <div className="absolute top-3 right-3 font-mono text-[10px] text-neutral-700 font-bold bg-white/95 px-2.5 py-0.5 rounded-full border border-neutral-300 backdrop-blur-sm shadow-xs">
                    {project.year}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="font-mono text-[10px] text-[#D71921] tracking-widest uppercase font-bold">
                      {project.categoryLabel}
                    </div>
                    <h3 className="text-xl font-light text-neutral-900 group-hover:text-black transition-colors font-medium">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-neutral-500 tracking-wider font-medium">
                      {project.subtitle}
                    </p>
                    <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-light pt-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics HUD if available */}
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-neutral-200 font-mono text-[10px]">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx}>
                          <span className="block text-neutral-900 font-bold">{m.value}</span>
                          <span className="text-neutral-500 uppercase">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Tags with Bouncy Hover */}
                  <div className="space-y-3 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-2.5 py-0.5 rounded-full border border-neutral-200 bg-neutral-100 font-mono text-[9px] text-neutral-700 uppercase font-medium cursor-default"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* External Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-neutral-100">
                      {project.links.map((link, lIdx) => (
                        <motion.a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, x: 2 }}
                          className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-800 hover:text-[#D71921] transition-colors font-semibold"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#D71921]" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
