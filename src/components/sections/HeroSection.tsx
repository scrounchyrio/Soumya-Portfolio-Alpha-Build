"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../../../site.config";
import { MonogramLogo } from "../brand/MonogramLogo";
import { MagneticButton } from "../ui/MagneticButton";
import { ArrowDownRight, ArrowUpRight, FileText, Compass } from "lucide-react";

export const HeroSection: React.FC = () => {
  const marqueeItems = [
    "LOOK DEVELOPMENT",
    "SUSTAINABILITY RESEARCH",
    "GREEN HYDROGEN POLICY",
    "3D ANIMATION & CGI",
    "ESG BENCHMARKING",
    "VISUAL STORYTELLING",
    "FEATURE FILM VFX",
    "KNOWLEDGE SYNTHESIS",
  ];

  return (
    <section id="home" className="relative pt-32 md:pt-44 pb-16 md:pb-24 overflow-hidden">
      {/* Background Dot Matrix Grid */}
      <div className="absolute inset-0 bg-dot-matrix opacity-25 pointer-events-none" />

      {/* Decorative hairline grid lines */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/[0.04] pointer-events-none hidden lg:block" />
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Telemetry Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10 font-mono text-[11px] tracking-widest text-white/40 uppercase"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#D71921] animate-pulse" />
            <span className="text-white/80 font-bold">{siteConfig.meta.availability}</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline-block">FIRMWARE: {siteConfig.meta.firmwareVersion}</span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#D71921]" />
              {siteConfig.meta.coordinates}
            </span>
          </div>
        </motion.div>

        {/* Hero Grid: Asymmetric Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Copy */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-[10px] sm:text-xs font-mono tracking-widest text-white/70 uppercase mb-6">
                <span>(00)</span>
                <span className="text-white/20">//</span>
                <span>SOUMYAJIT MUKHERJEE</span>
                <span className="text-[#D71921]">●</span>
                <span>PORTFOLIO SPECIFICATION</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white leading-[0.98]">
                IDEAS MADE <br />
                <span className="font-mono font-normal tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
                  TO MOVE
                </span>{" "}
                <br />
                <span className="relative inline-block text-white">
                  PEOPLE.
                  {/* Subtle red underline dot */}
                  <span className="inline-block w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#D71921] ml-2 align-baseline animate-pulse" />
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-white/60 font-light max-w-2xl leading-relaxed"
            >
              Bridging high-end cinematic 3D LookDev (credits on{" "}
              <em className="text-white not-italic font-normal">Furiosa</em>,{" "}
              <em className="text-white not-italic font-normal">Sonic 2</em>,{" "}
              <em className="text-white not-italic font-normal">Bullet Train</em>) with
              international sustainability research and bilateral Green Hydrogen policy
              mapping.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <MagneticButton href="#projects" variant="primary">
                <span>Explore Works</span>
                <ArrowDownRight className="w-4 h-4 text-black" />
              </MagneticButton>

              <MagneticButton
                href="https://scrounchyrio.artstation.com/"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                <span>View Showreel</span>
                <ArrowUpRight className="w-4 h-4 text-[#D71921]" />
              </MagneticButton>

              <MagneticButton
                href={siteConfig.about.resumeUrl}
                download="Soumyajit_Mukherjee_Resume.pdf"
                variant="ghost"
                className="hidden sm:inline-flex"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: Nothing Hardware Visual Module */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm"
            >
              {/* Outer Transparent Enclosure */}
              <div className="relative rounded-3xl bg-neutral-950/80 border border-white/15 p-6 md:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                {/* Corner crosshairs */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30" />

                {/* Hardware Spec Top Bar */}
                <div className="flex items-center justify-between font-mono text-[9px] text-white/40 tracking-widest pb-4 mb-4 border-b border-white/10 uppercase">
                  <span>DISP: NDOT_OLED</span>
                  <span>480 x 240 DPI</span>
                </div>

                {/* Centered Monogram Component */}
                <div className="flex items-center justify-center py-4">
                  <MonogramLogo size="lg" showHousing={false} />
                </div>

                {/* Sub-panel Info */}
                <div className="mt-6 pt-4 border-t border-white/10 space-y-2 font-mono text-[10px] text-white/50 tracking-wider">
                  <div className="flex justify-between">
                    <span>OPERATOR</span>
                    <span className="text-white">SOUMYAJIT MUKHERJEE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DISCIPLINE</span>
                    <span className="text-white">3D CGI · SUSTAINABILITY</span>
                  </div>
                  <div className="flex justify-between">
                    <span>STATUS</span>
                    <span className="text-[#D71921] font-bold">CALIBRATED // ACTIVE</span>
                  </div>
                </div>

                {/* Hardware Screws */}
                <div className="mt-6 pt-3 flex justify-between items-center text-[8px] font-mono text-white/30">
                  <span className="industrial-rivet" />
                  <span className="tracking-widest">DESIGNED IN INDIA // 2026</span>
                  <span className="industrial-rivet" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Marquee Strip */}
        <div className="mt-20 border-y border-white/10 py-3.5 overflow-hidden bg-neutral-950/60 backdrop-blur-md">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div key={idx} className="flex items-center mx-6 font-mono text-xs tracking-widest uppercase text-white/60">
                <span className="text-[#D71921] mr-3">✳</span>
                <span>{item}</span>
                <span className="text-white/20 ml-6">//</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
