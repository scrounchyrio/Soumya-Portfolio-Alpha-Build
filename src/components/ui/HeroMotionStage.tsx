import React from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { siteConfig } from "../../../site.config";

const companies = siteConfig.experiences;

function CompanyGroup({ decorative = false }: { decorative?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-3 px-3 sm:gap-5 sm:px-5"
      aria-hidden={decorative || undefined}
    >
      {companies.map((company) => (
        <a
          key={company.id}
          href={company.orgUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={decorative ? -1 : undefined}
          aria-label={`Visit ${company.organization}`}
          className="group/company inline-flex min-h-14 shrink-0 items-center gap-3 rounded-xl border border-fg/10 bg-canvas-raised/80 px-4 py-2.5 text-fg shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:bg-canvas-raised hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-5"
        >
          <span className="font-mono text-sm font-bold tracking-tight text-accent transition-colors group-hover/company:text-fg sm:text-base">
            {company.logoText}
          </span>
          <span className="max-w-36 text-left text-xs font-semibold leading-tight text-fg/75 sm:max-w-none sm:text-sm">
            {company.organization}
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-fg/45 transition-colors group-hover/company:text-accent" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

export const HeroMotionStage: React.FC = () => (
  <div className="w-full py-3 sm:py-5">
    <div className="flex justify-center">
      <a
        href="https://scrounchyrio.artstation.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex min-h-14 w-full max-w-[22rem] items-center justify-center gap-3 rounded-full bg-fg px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.16em] text-canvas shadow-lg shadow-fg/15 transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#D6337E] hover:text-white hover:shadow-accent/30 active:translate-y-0 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transform-none"
      >
        <Play className="h-4 w-4 fill-current transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        <span>Explore Showreel</span>
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </a>
    </div>

    <section
      aria-label="Organizations and companies"
      className="company-marquee relative mt-7 overflow-hidden border-y border-fg/10 bg-canvas-card/60 py-3 sm:mt-9 sm:py-4"
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
