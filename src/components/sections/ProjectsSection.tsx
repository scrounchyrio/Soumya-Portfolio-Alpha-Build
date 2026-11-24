"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowUpRight, ArrowRight, LayoutList, LayoutGrid, Sparkles, Layers } from "lucide-react";
import { siteConfig, Project } from "../../../site.config";
import { Lightbox, LightboxData } from "../ui/Lightbox";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { gsap } from "../../lib/motion";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "policy", label: "Policy" },
  { id: "sustainability", label: "Sustainability" },
  { id: "vfx", label: "Cinematic VFX" },
  { id: "design", label: "CGI & Design" },
] as const;

const WASH: Record<Project["visualType"], string> = {
  policy: "from-[#FE8780]/30 via-[#F1499E]/20 to-canvas",
  water: "from-[#FB84D0]/30 via-[#D6337E]/20 to-canvas",
  ethics: "from-[#FFB145]/30 via-[#FF934A]/20 to-canvas",
  cinematic: "from-[#3643C1]/30 via-[#8B3CC0]/20 to-canvas",
  agriculture: "from-[#FF8A3D]/30 via-[#FE8780]/20 to-canvas",
  render: "from-[#8B3CC0]/30 via-[#3643C1]/20 to-canvas",
};

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selected, setSelected] = useState<LightboxData | null>(null);
  const [open, setOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  const hoverPreviewRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const projects = filter === "all" ? siteConfig.projects : siteConfig.projects.filter((p) => p.category === filter);

  // Floating hover preview tracking cursor with GSAP
  useEffect(() => {
    const preview = hoverPreviewRef.current;
    if (!preview) return;

    const xTo = gsap.quickTo(preview, "x", { duration: 0.25, ease: "power3.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.25, ease: "power3.out" });

    const onPointerMove = (e: MouseEvent) => {
      xTo(e.clientX + 24);
      yTo(e.clientY - 40);
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onPointerMove);
    };
  }, []);

  const openProject = (p: Project) => {
    setSelected({
      title: p.title,
      medium: p.subtitle,
      year: p.year,
      category: p.categoryLabel,
      description: p.fullOverview ?? p.description,
      tags: p.tags,
      metrics: p.metrics,
      links: p.links.map((l) => ({ label: l.label, url: l.url })),
    });
    setOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-theme="mint"
      className="relative px-5 py-24 md:px-10 md:py-36 border-b border-fg/10 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(54,67,193,0.12),transparent_70%)]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Voy & Apple Section Header (Mint Green Accent) */}
        <SectionHeader
          label="Selected works"
          title="Work that moved something."
          italic={["moved"]}
          subtitle="Archive of feature film LookDev credits, empirical sustainability frameworks, and bilateral clean energy publications."
        />

        {/* Filter Bar & View Toggle */}
        <Reveal className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-fg/10 pb-6">
          <div role="group" aria-label="Filter projects" className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`min-h-11 rounded-full border px-5 font-mono text-xs uppercase tracking-widest transition-all ${
                  filter === f.id
                    ? "border-accent bg-accent text-neutral-950 font-bold shadow-md shadow-accent/25"
                    : "border-fg/15 text-fg/70 hover:border-accent hover:text-accent bg-canvas-card glass-card"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* List vs Grid View Toggle */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-fg/40 hidden sm:inline">View:</span>
            <div className="flex items-center rounded-full border border-fg/15 bg-canvas-card p-1 shadow-sm glass-pill">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                aria-label="List View"
                aria-pressed={viewMode === "list"}
                className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                  viewMode === "list"
                    ? "bg-accent text-neutral-950 font-bold shadow-sm"
                    : "text-fg/60 hover:text-fg"
                }`}
              >
                <LayoutList className="h-3.5 w-3.5" />
                <span>List Index</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Grid View"
                aria-pressed={viewMode === "grid"}
                className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                  viewMode === "grid"
                    ? "bg-accent text-neutral-950 font-bold shadow-sm"
                    : "text-fg/60 hover:text-fg"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Grid View</span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* View Mode 1: Editorial List View (Voy & Moiséz Reference) */}
        {viewMode === "list" ? (
          <Reveal stagger className="border-t border-fg/10">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => openProject(project)}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative flex flex-col justify-between border-b border-fg/10 py-7 text-left transition-colors hover:bg-accent/[0.04] cursor-pointer md:flex-row md:items-center md:gap-8 md:py-8 px-3 rounded-2xl"
              >
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent glass-pill">
                      {project.categoryLabel.split("·")[0]}
                    </span>
                    {project.featured && (
                      <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-950">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="display text-[clamp(1.5rem,3vw,2.5rem)] leading-tight transition-transform duration-300 ease-expo group-hover:translate-x-2 group-hover:text-accent font-medium">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-fg/65 max-w-xl">{project.subtitle}</p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-6 md:mt-0 md:justify-end">
                  <span className="font-mono text-xs uppercase tracking-widest text-fg/50">
                    {project.year}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-fg/20 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-neutral-950 shadow-sm">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        ) : (
          /* View Mode 2: Clean Vertical Grid (Apple-style Bento, zero horizontal scroll jitter) */
          <Reveal stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => openProject(project)}
                className="glass-card group flex flex-col justify-between overflow-hidden rounded-[24px] border border-fg/10 bg-canvas-card p-6 transition-all duration-500 hover:border-accent hover:shadow-[0_16px_40px_rgba(54,67,193,0.15)] cursor-pointer"
              >
                <div>
                  {/* Media Placeholder Frame (Ready for images and videos) */}
                  <div
                    className={`relative mb-6 aspect-[16/10] overflow-hidden rounded-2xl border border-fg/10 bg-gradient-to-br ${WASH[project.visualType]} p-4 flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.02] shadow-inner`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="eyebrow rounded-full bg-canvas/80 px-2.5 py-1 text-[10px] backdrop-blur-md shadow-sm">
                        {project.year}
                      </span>
                      {project.featured && (
                        <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-950 shadow-sm">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase text-fg/60">
                      <span>MEDIA READY</span>
                      <ArrowUpRight className="h-4 w-4 text-fg/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                    </div>
                  </div>

                  <p className="eyebrow mb-2 text-accent">{project.categoryLabel}</p>
                  <h3 className="display text-xl leading-snug transition-colors group-hover:text-accent font-medium">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg/65">{project.subtitle}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-fg/10 pt-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-fg/10 bg-canvas/60 px-2.5 py-0.5 font-mono text-[10px] text-fg/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        )}
      </div>

      {/* Floating Hover Preview Card (Fixed positioning following cursor for List View) */}
      <div
        ref={hoverPreviewRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[9990] hidden w-72 overflow-hidden rounded-2xl border border-accent/40 bg-canvas-raised p-4 shadow-2xl backdrop-blur-2xl transition-opacity duration-200 md:block ${
          hoveredProject && viewMode === "list" ? "opacity-100" : "opacity-0"
        }`}
      >
        {hoveredProject && (
          <div>
            <div
              className={`mb-3 aspect-[16/10] w-full rounded-xl border border-fg/10 bg-gradient-to-br ${WASH[hoveredProject.visualType]} flex items-center justify-center p-3`}
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-fg/70">
                [ MEDIA PREVIEW ]
              </span>
            </div>
            <p className="eyebrow text-accent">{hoveredProject.categoryLabel}</p>
            <p className="font-sans font-bold text-sm text-fg leading-tight mt-1">
              {hoveredProject.title}
            </p>
            <p className="font-mono text-[10px] text-fg/50 mt-2">
              CLICK TO VIEW CASE BRIEF
            </p>
          </div>
        )}
      </div>

      <Lightbox isOpen={open} onClose={() => setOpen(false)} data={selected} />
    </section>
  );
};
