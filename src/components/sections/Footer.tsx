"use client";

import React from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { siteConfig } from "../../../site.config";
import { scrollToTarget } from "../../lib/motion";

export const Footer: React.FC = () => (
  <footer className="border-t border-fg/10 px-5 py-12 md:px-10 bg-canvas/40 backdrop-blur-sm">
    <div className="mx-auto flex max-w-7xl flex-col gap-10">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-sm text-fg/70">
            <span className="text-accent font-bold">$</span> npx start @soumyajit
          </p>
          <p className="font-mono text-xs text-fg/40 mt-1 uppercase tracking-wider">
            EDITORIAL FORM &times; MOTION STUDIES &times; COLOR ARCHIVE
          </p>
        </div>
        <ul className="flex flex-wrap gap-2.5 font-mono text-xs uppercase tracking-widest">
          {siteConfig.socials
            .filter((s) => s.platform !== "Email")
            .slice(0, 6)
            .map((s) => (
              <li key={s.platform}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-fg/15 bg-canvas-raised px-4 font-semibold text-fg shadow-sm transition-colors hover:border-[#D6337E] hover:bg-[#D6337E] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {s.label}
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </li>
            ))}
        </ul>
        <button
          type="button"
          onClick={() => scrollToTarget(0)}
          className="glass-card inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-fg/20 px-5 font-mono text-xs uppercase tracking-widest transition-colors hover:border-accent hover:text-accent hover:bg-accent/5 md:self-auto font-bold shadow-sm"
        >
          Top <ArrowUp className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
        </button>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-fg/10 pt-6">
        <p className="eyebrow text-fg/50">
          &copy; {new Date().getFullYear()} {siteConfig.meta.name} &middot; {siteConfig.meta.location} &middot; {siteConfig.meta.coordinates}
        </p>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-fg/40">
          <span>PALETTE:</span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#3643C1]" title="Electric blue" />
            <span className="h-2 w-2 rounded-full bg-[#8B3CC0]" title="Violet" />
            <span className="h-2 w-2 rounded-full bg-[#F1499E]" title="Hot pink" />
            <span className="h-2 w-2 rounded-full bg-[#FE8780]" title="Pastel pink" />
            <span className="h-2 w-2 rounded-full bg-[#FF934A]" title="Sunset orange" />
          </span>
        </div>
      </div>
    </div>
  </footer>
);
