"use client";

import React from "react";
import { Terminal } from "lucide-react";
import { siteConfig } from "../../../site.config";
import { Reveal } from "../ui/Reveal";

export const DossierHeader: React.FC = () => {
  return (
    <div id="details" className="relative scroll-mt-24 border-b border-fg/10 bg-canvas/40 px-5 py-14 md:px-10 md:py-16 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1800px] flex-col justify-between gap-6 md:flex-row md:items-end">
        <Reveal>
          <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            <Terminal className="h-3.5 w-3.5" />
            <span>FULL DOSSIER &amp; ARCHIVE</span>
          </div>

          <h2 className="display mt-3 text-[clamp(2rem,5vw,4.5rem)] leading-none tracking-tight">
            Complete Dossier &amp; Details
          </h2>

          <p className="mt-3 max-w-2xl text-base text-fg/70 md:text-lg">
            Detailed record of feature film assignments, academic field research in green hydrogen, ESG frameworks, and peer-reviewed outputs.
          </p>
        </Reveal>

        <Reveal className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-fg/50">
          <span>{siteConfig.meta.name}</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">{siteConfig.meta.firmwareVersion}</span>
        </Reveal>
      </div>
    </div>
  );
};
