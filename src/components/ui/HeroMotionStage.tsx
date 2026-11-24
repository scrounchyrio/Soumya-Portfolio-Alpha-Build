"use client";

import React from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { siteConfig } from "../../../site.config";
import { OrganizationIcon } from "../brand/OrganizationIcons";

// Combined portfolio of organizations worked at and universities studied at
const ALL_AFFILIATIONS = [
  ...siteConfig.experiences.map((exp) => ({
    id: exp.id,
    name: exp.organization,
    shortName: exp.logoText || exp.organization,
    url: exp.orgUrl,
    type: "Work Experience",
  })),
  {
    id: "edu-nalanda",
    name: "Nalanda University",
    shortName: "Nalanda",
    url: "https://nalandauniv.edu.in/",
    type: "MBA Studies",
  },
  {
    id: "edu-kolhan",
    name: "Kolhan University",
    shortName: "Kolhan",
    url: "https://www.kolhanuniversity.ac.in/",
    type: "Degree Studies",
  },
  {
    id: "edu-arena",
    name: "Arena Animation / Aptech",
    shortName: "Arena",
    url: "https://www.arena-multimedia.com/",
    type: "VFX & 3D Diploma",
  },
];

function CompanyGroup({ decorative = false }: { decorative?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-3 px-3 sm:gap-4 sm:px-4"
      aria-hidden={decorative || undefined}
    >
      {ALL_AFFILIATIONS.map((org) => (
        <a
          key={`${org.id}-${decorative ? "clone" : "orig"}`}
          href={org.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={decorative ? -1 : undefined}
          aria-label={`Visit ${org.name}`}
          className="group/company inline-flex min-h-12 shrink-0 items-center gap-3 rounded-full border border-fg/10 bg-canvas-raised/90 px-4 py-2 text-fg shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-canvas-raised hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {/* Institutional / Organization Brand Icon */}
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover/company:bg-accent group-hover/company:text-neutral-950">
            <OrganizationIcon name={org.name} size={16} />
          </span>

          {/* Name of Organization / University */}
          <span className="text-left font-mono text-xs font-semibold uppercase tracking-wider text-fg/80 transition-colors group-hover/company:text-fg">
            {org.name}
          </span>

          <ArrowUpRight
            className="h-3 w-3 shrink-0 text-fg/40 transition-transform duration-300 group-hover/company:-translate-y-0.5 group-hover/company:translate-x-0.5 group-hover/company:text-accent"
            aria-hidden="true"
          />
        </a>
      ))}
    </div>
  );
}

export const HeroMotionStage: React.FC = () => (
  <div className="w-full py-2 sm:py-4">
    {/* Cinematic Showreel CTA Button */}
    <div className="flex justify-center">
      <a
        href="https://scrounchyrio.artstation.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex min-h-14 w-full max-w-[22rem] items-center justify-center gap-3 rounded-full bg-fg px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.16em] text-canvas shadow-lg shadow-fg/15 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-accent hover:text-neutral-950 hover:shadow-accent/30 active:translate-y-0 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transform-none"
      >
        <Play className="h-4 w-4 fill-current transition-transform group-hover:scale-110" aria-hidden="true" />
        <span>Explore Showreel</span>
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </a>
    </div>

    {/* Continuous Institutional & Company Marquee with Official Icons */}
    <section
      aria-label="Organizations and universities worked and studied at"
      className="company-marquee relative mt-8 overflow-hidden border-y border-fg/10 bg-canvas-card/60 py-3.5 backdrop-blur-sm sm:mt-10 sm:py-4"
    >
      <div className="company-marquee__track flex w-max items-center animate-marquee-reverse motion-reduce:animate-none">
        <CompanyGroup />
        <div className="company-marquee__clone">
          <CompanyGroup decorative />
        </div>
      </div>
    </section>
  </div>
);
