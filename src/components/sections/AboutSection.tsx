"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "../../../site.config";
import { SectionHeader } from "../ui/SectionHeader";
import { MagneticButton } from "../ui/MagneticButton";
import { FluidText } from "../ui/FluidText";
import {
  FileText,
  Linkedin,
  Palette,
  Film,
  BookOpen,
  Newspaper,
  Github,
  Twitter,
  Mail,
  Camera,
  ArrowUpRight,
} from "lucide-react";

export const AboutSection: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "Palette":
        return <Palette className="w-4 h-4" />;
      case "Film":
        return <Film className="w-4 h-4" />;
      case "BookOpen":
        return <BookOpen className="w-4 h-4" />;
      case "Newspaper":
        return <Newspaper className="w-4 h-4" />;
      case "Github":
        return <Github className="w-4 h-4" />;
      case "Twitter":
        return <Twitter className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 relative border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="01"
          tag="ABOUT THE OPERATOR"
          title="Different disciplines. One thoughtful approach."
          subtitle="Turning complex systems into clear visual experiences — from feature film CGI to bilateral green hydrogen policy."
          note="BIO & CAPABILITIES // CALIBRATION 2026"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Photo Slot: Nothing Hardware Industrial Frame with Interactive Hover Scan */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl bg-white/85 border border-neutral-300 p-4 sm:p-5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.06)] group"
            >
              {/* Technical Viewfinder HUD Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200 font-mono text-[10px] text-neutral-600 tracking-widest uppercase">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D71921] animate-pulse" />
                  <span className="font-semibold text-neutral-800">REC [4K/60P]</span>
                </div>
                <span>ISO 100 · 35MM · F/1.8</span>
              </div>

              {/* Photo Container with Fluid Hover Zoom */}
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                {!imageError ? (
                  <Image
                    src={siteConfig.about.photo.src}
                    alt={siteConfig.about.photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    onError={() => setImageError(true)}
                    priority
                  />
                ) : (
                  /* Editorial Placeholder */
                  <div className="flex flex-col items-center justify-center p-8 text-center bg-dot-matrix w-full h-full">
                    <motion.div
                      whileHover={{ rotate: 180, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 350, damping: 12 }}
                      className="w-16 h-16 rounded-full border border-black/15 flex items-center justify-center mb-4 text-[#D71921] bg-white shadow-xs cursor-pointer"
                    >
                      <Camera className="w-7 h-7" />
                    </motion.div>
                    <span className="font-mono text-xs text-neutral-800 tracking-widest uppercase font-semibold">
                      PHOTO SLOT [EASY-SWAP]
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500 tracking-wider mt-1 max-w-[220px]">
                      Place your image at <code className="text-[#D71921]">public/images/soumyajit-portrait.jpg</code>
                    </span>
                    <div className="mt-6 px-3 py-1 rounded-full border border-black/10 bg-white font-mono text-[9px] text-neutral-600 shadow-xs">
                      SPECS: 4:5 RATIO · MONOCHROME OR COLOR
                    </div>
                  </div>
                )}

                {/* Viewfinder Target / Crosshair Overlay */}
                <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <span className="w-3 h-3 border-t border-l border-black/50 group-hover:scale-125 transition-transform" />
                    <span className="w-3 h-3 border-t border-r border-black/50 group-hover:scale-125 transition-transform" />
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="self-center w-9 h-9 border border-black/30 rounded-full flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 bg-[#D71921] rounded-full" />
                  </motion.div>
                  <div className="flex justify-between">
                    <span className="w-3 h-3 border-b border-l border-black/50 group-hover:scale-125 transition-transform" />
                    <span className="w-3 h-3 border-b border-r border-black/50 group-hover:scale-125 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Photo Caption Tag */}
              <div className="mt-3 pt-3 border-t border-neutral-200 flex items-center justify-between font-mono text-[9px] text-neutral-500 tracking-widest uppercase">
                <span>{siteConfig.about.photo.caption}</span>
                <span className="text-neutral-400 font-semibold">#SM-01</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bio Copy, Stats & Socials */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="space-y-4"
            >
              <p className="text-xl sm:text-2xl font-light text-neutral-900 leading-relaxed">
                {siteConfig.about.intro}
              </p>
              {siteConfig.about.bio.map((paragraph, idx) => (
                <p key={idx} className="text-neutral-600 text-base md:text-lg leading-relaxed font-light">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Key Metrics / Telemetry Grid with Continuous Bouncy Spring Hover */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-neutral-200"
            >
              {siteConfig.about.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{
                    scale: 1.08,
                    y: -4,
                    transition: { type: "spring", stiffness: 450, damping: 12 },
                  }}
                  className="space-y-1 p-3 rounded-xl bg-white/60 hover:bg-white border border-transparent hover:border-neutral-200 transition-colors shadow-2xs cursor-default"
                >
                  <div className="font-mono text-3xl sm:text-4xl text-neutral-900 font-light tracking-tight flex items-baseline">
                    <span>{stat.value}</span>
                    <span className="text-xs text-[#D71921] ml-1">●</span>
                  </div>
                  <div className="font-mono text-xs text-neutral-800 font-bold uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono tracking-tight leading-tight">
                    {stat.detail}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Résumé Action & Social Pill Grid */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6 pt-2"
            >
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton
                  href={siteConfig.about.resumeUrl}
                  download="Soumyajit_Mukherjee_Resume.pdf"
                  variant="primary"
                >
                  <FileText className="w-4 h-4 text-white" />
                  <span>Download Résumé (PDF)</span>
                </MagneticButton>

                <MagneticButton
                  href={`mailto:${siteConfig.meta.email}?subject=Collaboration%20Inquiry%20via%20Portfolio`}
                  variant="secondary"
                >
                  <Mail className="w-4 h-4 text-[#D71921]" />
                  <span>Send Direct Email</span>
                </MagneticButton>
              </div>

              {/* Social Channels List with Bouncy Spring Feedback */}
              <div className="pt-4">
                <span className="block font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-3 font-semibold">
                  PUBLIC NETWORK COORDINATES
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {siteConfig.socials.map((social) => (
                    <motion.a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.08,
                        y: -3,
                        boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 450, damping: 15 }}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-300 bg-white/90 hover:bg-white transition-colors text-xs font-mono text-neutral-800 hover:text-[#D71921] shadow-2xs font-medium"
                    >
                      {getIcon(social.icon)}
                      <span>{social.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-[#D71921]" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
