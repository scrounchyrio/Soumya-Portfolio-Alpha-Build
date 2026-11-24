"use client";

import React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "../../../site.config";
import { MagneticButton } from "../ui/MagneticButton";
import { SplitReveal } from "../ui/SplitReveal";

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-clip">
      <div className="hero-wash absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-canvas" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1800px] flex-1 flex-col justify-end px-5 pb-10 pt-32 md:px-10 md:pb-16">
        <p className="eyebrow mb-8 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          {siteConfig.meta.availability}
        </p>

        <h1 className="display max-w-[16ch] text-[clamp(3rem,11.5vw,11rem)]">
          <SplitReveal as="span" text="Ideas made" onScroll={false} className="block" />
          <SplitReveal as="span" text="to move people." onScroll={false} delay={0.15} italic={["people."]} className="block" />
        </h1>

        <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-12 md:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-fg/70 md:col-span-6 md:text-xl">
            {siteConfig.meta.name} bridges cinematic 3D look development (Furiosa, Sonic 2, Bullet Train) with
            sustainability research and bilateral green hydrogen policy.
          </p>
          <div className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end">
            <MagneticButton href="#projects">
              Explore works <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href="https://scrounchyrio.artstation.com/" target="_blank" rel="noopener noreferrer" variant="outline">
              Showreel <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href={siteConfig.about.resumeUrl} download="Soumyajit_Mukherjee_Resume.pdf" variant="ghost">
              Download CV
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};
