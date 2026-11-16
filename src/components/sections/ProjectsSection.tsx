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

  // Render stylized SVG visual cards according to project type
  const renderVisualArt = (type: Project["visualType"]) => {
    switch (type) {
      case "policy":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 relative bg-dot-matrix">
            <svg viewBox="0 0 240 120" className="w-full max-w-[240px] stroke-white/40 fill-none">
              <path d="M30 60 H 210" strokeDasharray="3 3" strokeWidth="0.8" />
              {/* India Node */}
              <circle cx="50" cy="60" r="14" stroke="#FFFFFF" strokeWidth="1.2" />
              <circle cx="50" cy="60" r="5" fill="#D71921" />
              <text x="50" y="88" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">
                INDIA (NGHM)
              </text>
              {/* Thailand Node */}
              <circle cx="190" cy="60" r="14" stroke="#FFFFFF" strokeWidth="1.2" />
              <circle cx="190" cy="60" r="5" fill="#D71921" />
              <text x="190" y="88" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace">
                THAILAND (BCG)
              </text>
              {/* Bilateral Corridors */}
              <path d="M 64 50 Q 120 20 176 50" stroke="#D71921" strokeWidth="1.2" />
              <path d="M 64 70 Q 120 100 176 70" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 2" />
              <text x="120" y="30" textAnchor="middle" fill="#D71921" fontSize="7" fontFamily="monospace">
                H2 MARITIME CORRIDOR
              </text>
            </svg>
            <div className="absolute top-3 left-3 text-[9px] font-mono text-white/40">
              DISSERTATION // NALANDA-UBU
            </div>
          </div>
        );

      case "water":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 relative bg-dot-matrix">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-25" />
              <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-[#D71921]/60 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-mono text-[#D71921] font-bold">
                    H2O
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-3 left-3 text-[9px] font-mono text-white/40">
              UNDP × BAYER // REPORT ARCHITECTURE
            </div>
          </div>
        );

      case "ethics":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 relative bg-dot-matrix">
            <div className="grid grid-cols-2 gap-3 text-center font-mono">
              <div className="p-3 border border-white/15 rounded-lg bg-black/40">
                <span className="block text-2xl font-light text-white">10</span>
                <span className="text-[8px] text-white/50 tracking-widest uppercase">PRINCIPLES</span>
              </div>
              <div className="p-3 border border-[#D71921]/50 rounded-lg bg-black/40">
                <span className="block text-2xl font-light text-[#D71921]">16</span>
                <span className="text-[8px] text-[#D71921] tracking-widest uppercase">UN SDG</span>
              </div>
            </div>
            <div className="absolute top-3 left-3 text-[9px] font-mono text-white/40">
              UNGC // COMPLIANCE MATRIX
            </div>
          </div>
        );

      case "cinematic":
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 relative bg-neutral-950">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 font-mono text-[10px] text-white/70">
                <Film className="w-3.5 h-3.5 text-[#D71921]" />
                <span>HOLLYWOOD PIPELINE CREDITS</span>
              </div>
              <div className="font-mono text-xs text-white/40 tracking-widest">
                FURIOSA · SONIC 2 · BULLET TRAIN
              </div>
              <div className="text-[9px] font-mono text-[#D71921] tracking-widest">
                ACEScg · PBR TEXTURING · LOOKDEV
              </div>
            </div>
            <div className="absolute top-3 left-3 text-[9px] font-mono text-white/40">
              DNEG / MPC // 42+ ASSETS
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full flex items-center justify-center p-6 relative bg-dot-matrix">
            <div className="p-4 border border-white/20 rounded-xl bg-black/50 text-center">
              <Layers className="w-8 h-8 text-white/60 mx-auto mb-2" />
              <span className="font-mono text-[10px] text-white/60 tracking-widest uppercase">
                HARDWARE RESEARCH SPEC
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="03"
          tag="SELECTED CASE STUDIES"
          title="Curiosity, put to work."
          subtitle="Explore deep-dive projects bridging empirical policy frameworks and photorealistic creative execution."
          note="ARCHIVE // CASE STUDIES & PAPERS"
        />

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-mono text-xs tracking-widest transition-all uppercase flex items-center gap-2 ${
                  active
                    ? "bg-white text-black border border-white shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                    : "bg-white/[0.03] text-white/60 border border-white/10 hover:text-white hover:bg-white/10"
                }`}
              >
                {active && <span className="w-1.5 h-1.5 rounded-full bg-[#D71921]" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Case Studies Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project: Project, idx: number) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl bg-[#0C0C0C] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col overflow-hidden shadow-lg"
                data-cursor="view"
                data-cursor-text="CASE"
              >
                {/* Corner Crosshairs */}
                <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-white/30 pointer-events-none z-10" />
                <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-white/30 pointer-events-none z-10" />

                {/* Card Visual Header */}
                <div className="relative w-full h-52 bg-black border-b border-white/10 overflow-hidden flex items-center justify-center">
                  {renderVisualArt(project.visualType)}
                  {/* Subtle Scanline Overlay */}
                  <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />

                  {/* Top Right Year Tag */}
                  <div className="absolute top-3 right-3 font-mono text-[10px] text-white/60 bg-black/70 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
                    {project.year}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="font-mono text-[10px] text-[#D71921] tracking-widest uppercase">
                      {project.categoryLabel}
                    </div>
                    <h3 className="text-xl font-light text-white group-hover:text-white/90 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-white/50 tracking-wider">
                      {project.subtitle}
                    </p>
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-light pt-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics HUD if available */}
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 font-mono text-[10px]">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx}>
                          <span className="block text-white font-medium">{m.value}</span>
                          <span className="text-white/40 uppercase">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="space-y-3 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded border border-white/10 bg-white/[0.03] font-mono text-[9px] text-white/60 uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* External Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/5">
                      {project.links.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs text-white/80 hover:text-white hover:underline transition-colors"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#D71921]" />
                        </a>
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
