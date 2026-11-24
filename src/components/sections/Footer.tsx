"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "../../../site.config";
import { scrollToTarget } from "../../lib/motion";
import { SocialPills } from "../ui/SocialPills";

export const Footer: React.FC = () => (
  <footer className="border-t border-fg/10 px-5 py-12 md:px-10 bg-canvas/40 backdrop-blur-sm">
    <div className="mx-auto flex max-w-7xl flex-col gap-10">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <p className="font-mono text-sm text-fg/70">
            <span className="text-accent font-bold">$</span> npx start @soumyajit
          </p>
          <p className="font-mono text-xs text-fg/40 mt-1 uppercase tracking-wider">
            HOLLYWOOD LOOKDEV &times; GREEN HYDROGEN RESEARCH &times; UN SDG 16
          </p>
        </div>

        {/* User Request: All website hyperlinks in ONE line with website icon followed by website name */}
        <div className="min-w-0 max-w-2xl flex-1">
          <SocialPills />
        </div>

        <button
          type="button"
          onClick={() => scrollToTarget(0)}
          className="glass-card inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-fg/20 px-5 font-mono text-xs uppercase tracking-widest transition-colors hover:border-accent hover:text-accent hover:bg-accent/5 lg:self-auto font-bold shadow-sm"
        >
          Top <ArrowUp className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-fg/10 pt-6">
        <p className="eyebrow text-fg/50 font-mono text-xs">
          &copy; {new Date().getFullYear()} {siteConfig.meta.name} &middot; {siteConfig.meta.location} &middot; {siteConfig.meta.coordinates}
        </p>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-fg/40">
          <span>THEME:</span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-emerald" title="Emerald (Overview & Works)" />
            <span className="h-2 w-2 rounded-full bg-green-mint" title="Mint (Aquamarine)" />
            <span className="h-2 w-2 rounded-full bg-green-spring" title="Spring (Sustainability)" />
            <span className="h-2 w-2 rounded-full bg-green-forest" title="Forest (Environmental)" />
          </span>
        </div>
      </div>
    </div>
  </footer>
);
