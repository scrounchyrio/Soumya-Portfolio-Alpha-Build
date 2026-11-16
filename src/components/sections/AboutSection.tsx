"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "../../../site.config";
import { SectionHeader } from "../ui/SectionHeader";
import { MagneticButton } from "../ui/MagneticButton";
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
    <section id="about" className="py-24 md:py-32 relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="01"
          tag="ABOUT THE OPERATOR"
          title="Different disciplines. One thoughtful approach."
          subtitle="Turning complex systems into clear visual experiences — from feature film CGI to bilateral green hydrogen policy."
          note="BIO & CAPABILITIES // CALIBRATION 2026"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Photo Slot: Nothing Hardware Industrial Frame */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl bg-neutral-950 border border-white/15 p-4 sm:p-5 backdrop-blur-md"
            >
              {/* Technical Viewfinder HUD Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 font-mono text-[10px] text-white/50 tracking-widest uppercase">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D71921] animate-pulse" />
                  <span>REC [4K/60P]</span>
                </div>
                <span>ISO 100 · 35MM · F/1.8</span>
              </div>

              {/* Photo Container */}
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#0A0A0A] border border-white/10 flex items-center justify-center group">
                {!imageError ? (
                  <Image
                    src={siteConfig.about.photo.src}
                    alt={siteConfig.about.photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                    onError={() => setImageError(true)}
                    priority
                  />
                ) : (
                  /* Editorial Placeholder if user hasn't added custom photo file yet */
                  <div className="flex flex-col items-center justify-center p-8 text-center bg-dot-matrix w-full h-full">
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-4 text-[#D71921]">
                      <Camera className="w-7 h-7" />
                    </div>
                    <span className="font-mono text-xs text-white/80 tracking-widest uppercase font-semibold">
                      PHOTO SLOT [EASY-SWAP]
                    </span>
                    <span className="font-mono text-[10px] text-white/40 tracking-wider mt-1 max-w-[220px]">
                      Place your image at <code className="text-[#D71921]">public/images/soumyajit-portrait.jpg</code>
                    </span>
                    <div className="mt-6 px-3 py-1 rounded-full border border-white/15 bg-white/5 font-mono text-[9px] text-white/60">
                      SPECS: 4:5 RATIO · MONOCHROME OR COLOR
                    </div>
                  </div>
                )}

                {/* Viewfinder Target / Crosshair Overlay */}
                <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <span className="w-3 h-3 border-t border-l border-white/60" />
                    <span className="w-3 h-3 border-t border-r border-white/60" />
                  </div>
                  <div className="self-center w-8 h-8 border border-white/30 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-[#D71921] rounded-full" />
                  </div>
                  <div className="flex justify-between">
                    <span className="w-3 h-3 border-b border-l border-white/60" />
                    <span className="w-3 h-3 border-b border-r border-white/60" />
                  </div>
                </div>
              </div>

              {/* Photo Caption Tag */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[9px] text-white/40 tracking-widest uppercase">
                <span>{siteConfig.about.photo.caption}</span>
                <span className="text-white/20">#SM-01</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bio Copy, Stats & Socials */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <p className="text-xl sm:text-2xl font-light text-white leading-relaxed">
                {siteConfig.about.intro}
              </p>
              {siteConfig.about.bio.map((paragraph, idx) => (
                <p key={idx} className="text-white/70 text-base md:text-lg leading-relaxed font-light">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Key Metrics / Telemetry Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-white/10"
            >
              {siteConfig.about.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-mono text-3xl sm:text-4xl text-white font-light tracking-tight flex items-baseline">
                    <span>{stat.value}</span>
                    <span className="text-xs text-[#D71921] ml-1">●</span>
                  </div>
                  <div className="font-mono text-xs text-white/80 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-white/40 font-mono tracking-tight leading-tight">
                    {stat.detail}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Résumé Action & Social Pill Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6 pt-2"
            >
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton
                  href={siteConfig.about.resumeUrl}
                  download="Soumyajit_Mukherjee_Resume.pdf"
                  variant="primary"
                >
                  <FileText className="w-4 h-4 text-black" />
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

              {/* Social Channels List */}
              <div className="pt-4">
                <span className="block font-mono text-[10px] tracking-widest text-white/40 uppercase mb-3">
                  PUBLIC NETWORK COORDINATES
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {siteConfig.socials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 hover:border-white/25 transition-all text-xs font-mono text-white/70 hover:text-white"
                    >
                      {getIcon(social.icon)}
                      <span>{social.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-white/40" />
                    </a>
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
