"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../../../site.config";
import { SectionHeader } from "../ui/SectionHeader";
import { MagneticButton } from "../ui/MagneticButton";
import { Copy, Check, Mail, Phone, Clock, ArrowUpRight, Send } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Kolkata is UTC+5:30
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setLocalTime(new Intl.DateTimeFormat([], options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.meta.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="08"
          tag="COMMUNICATIONS TERMINAL"
          title="Let’s make it matter."
          subtitle="Have a creative challenge, research initiative, or speaking engagement in mind? Reach out directly."
          note="TRANSMISSION // DIRECT CHANNELS"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Big Contact Action & Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl bg-[#0A0A0A] border border-white/15 p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Corner Crosshairs */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30" />

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-xs text-white/70 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D71921] animate-pulse" />
                <span>INBOX OPEN // IMMEDIATE ROUTING</span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">
                Start a conversation.
              </h3>

              <p className="text-white/60 text-base md:text-lg font-light leading-relaxed max-w-xl">
                Whether you’re seeking a LookDev specialist for film production, a researcher for
                clean energy transition, or a visual policy consultant, I’d love to connect.
              </p>
            </div>

            {/* Direct Channel Buttons */}
            <div className="pt-10 space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={`mailto:${siteConfig.meta.email}?subject=Collaboration%20Inquiry%20via%20Portfolio`}
                  className="flex-1 px-6 py-4 rounded-full bg-white text-black font-mono text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
                >
                  <Mail className="w-4 h-4 text-black" />
                  <span>Compose Email</span>
                  <ArrowUpRight className="w-4 h-4 ml-auto" />
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="px-6 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#D71921]" />
                      <span className="text-[#D71921]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-white/60" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              <div className="font-mono text-xs text-white/50 pt-2 flex flex-col sm:flex-row gap-4 sm:items-center">
                <span>{siteConfig.meta.email}</span>
                <span className="text-white/20 hidden sm:inline">•</span>
                <a href={`tel:${siteConfig.meta.phone.replace(/\s+/g, "")}`} className="hover:text-white">
                  {siteConfig.meta.phone}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Telemetry & Inquiries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 rounded-3xl bg-[#0A0A0A] border border-white/15 p-8 flex flex-col justify-between relative"
          >
            {/* Top Coordinate HUD */}
            <div className="space-y-6">
              <div className="font-mono text-xs text-white/40 tracking-widest uppercase pb-3 border-b border-white/10 flex items-center justify-between">
                <span>TERMINAL_TELEMETRY</span>
                <span className="text-[#D71921]">● LIVE</span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-white/40 uppercase">LOCAL BASE</span>
                  <span className="text-white">{siteConfig.meta.location}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-white/40 uppercase">COORDINATES</span>
                  <span className="text-white">{siteConfig.meta.coordinates}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-white/40 uppercase flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-white/40" />
                    <span>KOLKATA TIME (IST)</span>
                  </span>
                  <span className="text-white font-mono text-sm tracking-wider">
                    {localTime || "12:00:00"}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <span className="block font-mono text-[10px] text-white/40 uppercase tracking-widest mb-3">
                  INQUIRY PRESETS (CLICK TO PRE-FILL)
                </span>
                <div className="space-y-2">
                  {[
                    { label: "Film LookDev & VFX Production", subject: "Inquiry: Film LookDev & VFX Collaboration" },
                    { label: "Green Hydrogen & Policy Research", subject: "Inquiry: Green Hydrogen Research Collaboration" },
                    { label: "Guest Lectures & Academic Seminars", subject: "Invitation: Guest Lecture / Seminar Session" },
                  ].map((preset) => (
                    <a
                      key={preset.label}
                      href={`mailto:${siteConfig.meta.email}?subject=${encodeURIComponent(preset.subject)}`}
                      className="block p-3 rounded-xl border border-white/10 hover:border-white/25 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
                    >
                      <div className="flex items-center justify-between font-mono text-xs text-white/80 group-hover:text-white">
                        <span>{preset.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#D71921]" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 font-mono text-[10px] text-white/40 tracking-widest uppercase flex justify-between">
              <span>RESPONSE WINDOW: &lt; 24H</span>
              <span>SECURE PROTOCOL</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
