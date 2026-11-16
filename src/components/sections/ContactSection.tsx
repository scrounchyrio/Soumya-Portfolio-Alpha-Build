"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../../../site.config";
import { SectionHeader } from "../ui/SectionHeader";
import { Copy, Check, Mail, Clock, ArrowUpRight, Sparkles } from "lucide-react";

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
    <section id="contact" className="py-24 md:py-32 relative border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="08"
          tag="COMMUNICATIONS TERMINAL"
          title="Let’s make it matter."
          subtitle="Have a creative challenge, research initiative, or speaking engagement in mind? Reach out directly."
          note="TRANSMISSION // DIRECT CHANNELS"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Big Contact Action & Copy - Light Mode */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-7 rounded-3xl bg-white/85 border border-neutral-300 p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] group"
          >
            {/* Corner Crosshairs */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-black/30 group-hover:scale-125 transition-transform" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-black/30 group-hover:scale-125 transition-transform" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-black/30 group-hover:scale-125 transition-transform" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-black/30 group-hover:scale-125 transition-transform" />

            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.05, x: 2 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-300 bg-neutral-100 font-mono text-xs text-neutral-700 uppercase font-semibold shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D71921] animate-ping" />
                <span>INBOX OPEN // IMMEDIATE ROUTING</span>
              </motion.div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 tracking-tight leading-tight">
                Start a conversation.
              </h3>

              <p className="text-neutral-600 text-base md:text-lg font-light leading-relaxed max-w-xl">
                Whether you’re seeking a LookDev specialist for film production, a researcher for
                clean energy transition, or a visual policy consultant, I’d love to connect.
              </p>
            </div>

            {/* Direct Channel Buttons with Bouncy Spring Feedback */}
            <div className="pt-10 space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <motion.a
                  href={`mailto:${siteConfig.meta.email}?subject=Collaboration%20Inquiry%20via%20Portfolio`}
                  whileHover={{ scale: 1.03, y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="flex-1 px-6 py-4 rounded-full bg-[#111111] text-white font-mono text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2 hover:bg-[#222222] transition-colors shadow-md"
                >
                  <Mail className="w-4 h-4 text-white" />
                  <span>Compose Email</span>
                  <ArrowUpRight className="w-4 h-4 ml-auto" />
                </motion.a>

                <motion.button
                  type="button"
                  onClick={copyEmail}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="px-6 py-4 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 font-mono text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2 shadow-2xs font-semibold"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#D71921]" />
                      <span className="text-[#D71921] font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-neutral-500" />
                      <span>Copy Address</span>
                    </>
                  )}
                </motion.button>
              </div>

              <div className="font-mono text-xs text-neutral-500 pt-2 flex flex-col sm:flex-row gap-4 sm:items-center font-medium">
                <span className="text-neutral-700">{siteConfig.meta.email}</span>
                <span className="text-neutral-300 hidden sm:inline">•</span>
                <a href={`tel:${siteConfig.meta.phone.replace(/\s+/g, "")}`} className="hover:text-black">
                  {siteConfig.meta.phone}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Telemetry & Inquiries - Light Mode */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 240, damping: 20, delay: 0.15 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-5 rounded-3xl bg-white/85 border border-neutral-300 p-8 flex flex-col justify-between relative shadow-[0_12px_40px_rgba(0,0,0,0.06)] group"
          >
            {/* Top Coordinate HUD */}
            <div className="space-y-6">
              <div className="font-mono text-xs text-neutral-600 tracking-widest uppercase pb-3 border-b border-neutral-200 flex items-center justify-between font-semibold">
                <span>TERMINAL_TELEMETRY</span>
                <span className="text-[#D71921] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D71921] animate-ping" />
                  LIVE
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 uppercase font-medium">OPERATOR</span>
                  <span className="text-neutral-900 font-bold">{siteConfig.meta.name}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 uppercase font-medium">COORDINATES</span>
                  <span className="text-neutral-900 font-semibold">{siteConfig.meta.coordinates}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500 uppercase flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>KOLKATA TIME (IST)</span>
                  </span>
                  <span className="text-neutral-900 font-mono text-sm tracking-wider font-bold">
                    {localTime || "12:00:00"}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <span className="block font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-3 font-semibold">
                  INQUIRY PRESETS (CLICK TO PRE-FILL)
                </span>
                <div className="space-y-2">
                  {[
                    { label: "Film LookDev & VFX Production", subject: "Inquiry: Film LookDev & VFX Collaboration" },
                    { label: "Green Hydrogen & Policy Research", subject: "Inquiry: Green Hydrogen Research Collaboration" },
                    { label: "Guest Lectures & Academic Seminars", subject: "Invitation: Guest Lecture / Seminar Session" },
                  ].map((preset) => (
                    <motion.a
                      key={preset.label}
                      href={`mailto:${siteConfig.meta.email}?subject=${encodeURIComponent(preset.subject)}`}
                      whileHover={{ x: 6, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 450, damping: 15 }}
                      className="block p-3 rounded-xl border border-neutral-200 hover:border-black/30 bg-neutral-50/80 hover:bg-white transition-colors group shadow-2xs"
                    >
                      <div className="flex items-center justify-between font-mono text-xs text-neutral-800 group-hover:text-black font-medium">
                        <span>{preset.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#D71921] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-200 font-mono text-[10px] text-neutral-500 tracking-widest uppercase flex justify-between font-medium">
              <span>RESPONSE WINDOW: &lt; 24H</span>
              <span className="text-neutral-700">SECURE PROTOCOL</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
