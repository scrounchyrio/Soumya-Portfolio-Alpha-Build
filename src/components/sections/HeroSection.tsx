"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { siteConfig } from "../../../site.config";
import { MonogramLogo } from "../brand/MonogramLogo";
import { MagneticButton } from "../ui/MagneticButton";
import { FluidText } from "../ui/FluidText";
import { ArrowDownRight, ArrowUpRight, FileText, Compass, Sparkles } from "lucide-react";

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

  // 3D Perspective Tilt on Hardware Module
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 20 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="home" className="relative pt-36 md:pt-48 pb-16 md:pb-24 overflow-hidden">
      {/* Decorative hairline grid lines */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/[0.04] pointer-events-none hidden lg:block" />
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Telemetry Bar with Bouncy Hover Pills */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-black/10 font-mono text-[11px] tracking-widest text-neutral-500 uppercase"
        >
          <motion.div
            whileHover={{ scale: 1.04, x: 2 }}
            className="flex items-center gap-2.5 px-3 py-1 rounded-full border border-black/10 bg-white/70 backdrop-blur-sm cursor-default shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#D71921] animate-ping" />
            <span className="text-neutral-900 font-bold">{siteConfig.meta.availability}</span>
          </motion.div>

          <div className="flex items-center gap-6">
            <motion.span whileHover={{ color: "#111111" }} className="hidden sm:inline-block text-neutral-500 cursor-default">
              FIRMWARE: {siteConfig.meta.firmwareVersion}
            </motion.span>
            <span className="text-neutral-300">|</span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 text-neutral-700 cursor-default font-medium"
            >
              <Compass className="w-3.5 h-3.5 text-[#D71921] animate-spin" style={{ animationDuration: "12s" }} />
              {siteConfig.meta.coordinates}
            </motion.span>
          </div>
        </motion.div>

        {/* Hero Grid: Asymmetric Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Copy */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {/* Operator Badge with Pulse Animation */}
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/15 bg-white/80 backdrop-blur-md text-[10px] sm:text-xs font-mono tracking-widest text-neutral-800 uppercase mb-6 shadow-xs cursor-default font-semibold"
              >
                <span>(00)</span>
                <span className="text-neutral-300">//</span>
                <span>SOUMYAJIT MUKHERJEE</span>
                <span className="text-[#D71921]">●</span>
                <span>PORTFOLIO SPECIFICATION</span>
              </motion.div>

              {/* Massive Fluid Headline with Interactive Character Wobble */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-neutral-900 leading-[0.98] select-none">
                <FluidText hoverScale={1.18}>IDEAS MADE</FluidText> <br />
                <span className="font-mono font-normal tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neutral-950 via-neutral-800 to-neutral-600">
                  <FluidText hoverScale={1.18}>TO MOVE</FluidText>
                </span>{" "}
                <br />
                <span className="relative inline-block text-neutral-900">
                  <FluidText hoverScale={1.18}>PEOPLE.</FluidText>
                  {/* Interactive red dot */}
                  <motion.span
                    whileHover={{ scale: 1.6, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="inline-block w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-[#D71921] ml-2 align-baseline animate-pulse cursor-pointer shadow-[0_0_12px_rgba(215,25,33,0.5)]"
                  />
                </span>
              </h1>
            </motion.div>

            {/* Subtitle with Fluid Hover Effect */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-neutral-600 font-light max-w-2xl leading-relaxed"
            >
              Bridging high-end cinematic 3D LookDev (credits on{" "}
              <motion.em
                whileHover={{ color: "#D71921", scale: 1.05 }}
                className="text-neutral-900 not-italic font-semibold inline-block cursor-pointer transition-colors"
              >
                Furiosa
              </motion.em>
              ,{" "}
              <motion.em
                whileHover={{ color: "#D71921", scale: 1.05 }}
                className="text-neutral-900 not-italic font-semibold inline-block cursor-pointer transition-colors"
              >
                Sonic 2
              </motion.em>
              ,{" "}
              <motion.em
                whileHover={{ color: "#D71921", scale: 1.05 }}
                className="text-neutral-900 not-italic font-semibold inline-block cursor-pointer transition-colors"
              >
                Bullet Train
              </motion.em>
              ) with international sustainability research and bilateral Green Hydrogen policy mapping.
            </motion.p>

            {/* Action Buttons with Bouncy Spring Response */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <MagneticButton href="#projects" variant="primary">
                <span>Explore Works</span>
                <ArrowDownRight className="w-4 h-4 text-white" />
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

          {/* Right Column: 3D Interactive Hardware Visual Module */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <motion.div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="relative w-full max-w-sm group cursor-pointer"
            >
              {/* Outer Enclosure with Shimmer Border on Hover */}
              <div className="relative rounded-3xl bg-white/85 border border-neutral-300 p-6 md:p-8 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] group-hover:border-black/30 transition-all duration-500 overflow-hidden">
                {/* Laser scan line effect on hover */}
                <motion.div
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D71921]/60 to-transparent pointer-events-none opacity-0 group-hover:opacity-100"
                  animate={{
                    top: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Corner crosshairs */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-black/30 group-hover:scale-125 transition-transform" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-black/30 group-hover:scale-125 transition-transform" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-black/30 group-hover:scale-125 transition-transform" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-black/30 group-hover:scale-125 transition-transform" />

                {/* Hardware Spec Top Bar */}
                <div className="flex items-center justify-between font-mono text-[9px] text-neutral-500 tracking-widest pb-4 mb-4 border-b border-neutral-200 uppercase">
                  <span>DISP: NDOT_LIGHT</span>
                  <span className="flex items-center gap-1 text-[#D71921] font-semibold">
                    <Sparkles className="w-2.5 h-2.5" />
                    480 x 240 DPI
                  </span>
                </div>

                {/* Centered Monogram Component with Bouncy Hover */}
                <div className="flex items-center justify-center py-4 group-hover:scale-105 transition-transform duration-300">
                  <MonogramLogo size="lg" showHousing={false} />
                </div>

                {/* Sub-panel Info */}
                <div className="mt-6 pt-4 border-t border-neutral-200 space-y-2.5 font-mono text-[10px] text-neutral-600 tracking-wider">
                  <div className="flex justify-between">
                    <span>OPERATOR</span>
                    <span className="text-neutral-900 font-bold">SOUMYAJIT MUKHERJEE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DISCIPLINE</span>
                    <span className="text-neutral-900 font-semibold">3D CGI · SUSTAINABILITY</span>
                  </div>
                  <div className="flex justify-between">
                    <span>STATUS</span>
                    <span className="text-[#D71921] font-bold animate-pulse">CALIBRATED // ACTIVE</span>
                  </div>
                </div>

                {/* Hardware Screws */}
                <div className="mt-6 pt-3 flex justify-between items-center text-[8px] font-mono text-neutral-400 border-t border-neutral-100">
                  <span className="industrial-rivet" />
                  <span className="tracking-widest font-medium">DESIGNED IN INDIA // 2026</span>
                  <span className="industrial-rivet" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Marquee Strip with Interactive Speed-up on Hover */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mt-20 border-y border-neutral-200 py-3.5 overflow-hidden bg-white/75 backdrop-blur-md shadow-xs cursor-default"
        >
          <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div key={idx} className="flex items-center mx-6 font-mono text-xs tracking-widest uppercase text-neutral-700 font-medium">
                <span className="text-[#D71921] mr-3">✳</span>
                <span className="hover:text-black transition-colors">{item}</span>
                <span className="text-neutral-300 ml-6">//</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
