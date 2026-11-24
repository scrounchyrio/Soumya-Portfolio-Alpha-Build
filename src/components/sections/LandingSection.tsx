"use client";

import React from "react";
import { ArrowDown, ArrowUpRight, Sparkles, ChevronDown } from "lucide-react";
import { siteConfig } from "../../../site.config";
import { HeroMotionStage } from "../ui/HeroMotionStage";
import { MonogramLogo } from "../brand/MonogramLogo";
import { MagneticButton } from "../ui/MagneticButton";
import { SplitReveal } from "../ui/SplitReveal";
import { Reveal } from "../ui/Reveal";
import { scrollToTarget } from "../../lib/motion";
import { OrganizationIcon } from "../brand/OrganizationIcons";
import { SocialPills } from "../ui/SocialPills";

const QUICK_LINKS = [
  { label: "Works", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "Feed", href: "#linkedin" },
  { label: "Skills", href: "#specs" },
  { label: "Contact", href: "#contact" },
];

const MARQUEE_ITEMS = [
  "HOLLYWOOD FEATURE LOOKDEV",
  "GREEN HYDROGEN COOPERATION",
  "ACES COLOR PIPELINE",
  "UN SDG 16 INTEGRITY MATRIX",
  "KATANA & MARI SURFACING",
  "SUSTAINABILITY RESEARCH",
  "3D ANIMATION & CGI",
];

export const LandingSection: React.FC = () => {
  const handleScrollToDossier = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    scrollToTarget("#projects");
  };

  return (
    <section
      id="home"
      data-theme="emerald"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden border-b border-fg/10 pt-28 pb-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(0,210,133,0.12),transparent_70%)]"
    >
      {/* Top Telemetry & Status HUD (Apple & Voy Design) */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-fg/10 pb-4">
          <div className="flex items-center gap-3">
            <MonogramLogo size="sm" showHousing={true} />
            <div className="hidden flex-col font-mono text-[10px] uppercase tracking-wider text-fg/70 sm:flex">
              <span className="font-bold text-fg">{siteConfig.meta.name}</span>
              <span className="text-fg/50">{siteConfig.meta.coordinates}</span>
            </div>
          </div>

          <div className="glass-pill flex items-center gap-2 rounded-full border border-accent/25 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-fg/85 font-medium">{siteConfig.meta.availability}</span>
          </div>

          <div className="hidden font-mono text-[11px] uppercase tracking-widest text-fg/50 lg:block">
            {siteConfig.meta.firmwareVersion} // HOLLYWOOD LOOKDEV &bull; GREEN HYDROGEN RESEARCH
          </div>
        </div>
      </div>

      {/* Main Centerpiece Statement & GSAP Showcase Stage */}
      <div className="relative z-20 mx-auto my-auto flex w-full max-w-7xl flex-col justify-center px-5 py-8 sm:px-8">
        <div className="max-w-4xl">
          {/* Eye-Catching Hook Badge */}
          <Reveal className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-accent backdrop-blur-md shadow-sm">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span>&dollar;1.2B+ Global Box Office VFX &bull; Bilateral Energy Policy Fellow &bull; UN SDG 16 Architect</span>
          </Reveal>

          <h1 className="display text-[clamp(2.75rem,8.5vw,8.5rem)] leading-[0.96] tracking-[-0.04em]">
            <SplitReveal as="span" text="Ideas made" onScroll={false} className="block" />
            <SplitReveal
              as="span"
              text="to move people."
              onScroll={false}
              delay={0.12}
              italic={["people."]}
              className="block text-fg"
            />
          </h1>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg/85 md:text-xl font-normal">
              <strong className="font-semibold text-fg">{siteConfig.meta.name}</strong> bridges Hollywood
              feature film LookDev &amp; 3D Surfacing (<em>Furiosa: A Mad Max Saga</em>, <em>Sonic the Hedgehog 2</em>, <em>Bullet Train</em> at DNEG &amp; MPC) with empirical
              sustainability research and bilateral green hydrogen policy frameworks under the BCG economic model.
            </p>
          </Reveal>

          {/* Key Film & Research Credentials Badges with Official Vector Icons */}
          <Reveal delay={0.3} className="mt-6 flex flex-wrap items-center gap-2.5 font-mono text-xs text-fg/75">
            <span className="glass-card inline-flex items-center gap-2 rounded-full border border-accent/30 bg-canvas-card px-3.5 py-1.5 shadow-sm">
              <OrganizationIcon name="dneg" size={16} className="text-accent" />
              <OrganizationIcon name="mpc" size={16} className="text-accent" />
              <span className="font-semibold text-fg">DNEG &amp; MPC Film Credits</span>
            </span>
            <span className="glass-card inline-flex items-center gap-2 rounded-full border border-fg/15 bg-canvas-card px-3.5 py-1.5 shadow-sm">
              <OrganizationIcon name="nalanda" size={16} className="text-accent" />
              <OrganizationIcon name="ubu" size={16} className="text-accent" />
              <span className="font-semibold text-fg">Nalanda MBA &amp; Ubon Research Exchange</span>
            </span>
            <span className="glass-card inline-flex items-center gap-2 rounded-full border border-fg/15 bg-canvas-card px-3.5 py-1.5 shadow-sm">
              <OrganizationIcon name="ungc" size={16} className="text-accent" />
              <span className="font-semibold text-fg">UN Global Compact Network India</span>
            </span>
            <span className="glass-card inline-flex items-center gap-2 rounded-full border border-fg/15 bg-canvas-card px-3.5 py-1.5 shadow-sm">
              <OrganizationIcon name="waf" size={16} className="text-accent" />
              <span className="font-semibold text-fg">World Agriculture Forum</span>
            </span>
          </Reveal>

          {/* Primary Action Buttons (Apple Pill Style) */}
          <Reveal delay={0.4} className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton
              href="#projects"
              onClick={handleScrollToDossier}
              variant="accent"
              className="shadow-lg hover:shadow-accent/30 font-bold"
            >
              Explore Works <ArrowDown className="h-4 w-4" />
            </MagneticButton>

            <MagneticButton
              href={siteConfig.about.resumeUrl}
              download="Soumyajit_Mukherjee_Resume.html"
              variant="ghost"
            >
              Download CV
            </MagneticButton>
          </Reveal>

          {/* Single-line Social & Portfolio Hyperlink Buttons with Icons */}
          <Reveal delay={0.5} className="mt-6">
            <SocialPills />
          </Reveal>
        </div>

        {/* Hero Motion Stage (3D tilt media showcase window ready for images and videos) */}
        <div className="mt-10 w-full">
          <HeroMotionStage />
        </div>
      </div>

      {/* Voy Design Continuous Marquee Strip */}
      <div className="relative z-20 my-6 overflow-hidden border-y border-fg/10 py-3 bg-canvas-card/60 backdrop-blur-sm" aria-hidden="true">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center font-mono text-xs uppercase tracking-widest text-fg/60">
              <span className="px-6">{item}</span>
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Quick-Jump Dock & Scroll Indicator */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          {/* Quick-Jump Dock without numbers */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-2 font-mono text-[10px] font-bold uppercase tracking-widest text-fg/40">
              Jump to:
            </span>
            {QUICK_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group inline-flex items-center gap-1 rounded-full border border-fg/10 bg-canvas-card px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-fg/70 backdrop-blur-sm transition-all hover:border-accent hover:text-accent hover:bg-accent/5 shadow-sm"
              >
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          {/* Scroll Down Prompt */}
          <a
            href="#projects"
            onClick={handleScrollToDossier}
            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg/60 transition-colors hover:text-accent self-start md:self-auto"
          >
            <span>Scroll for works</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-fg/20 transition-transform group-hover:translate-y-1 group-hover:border-accent group-hover:text-accent">
              <ChevronDown className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
