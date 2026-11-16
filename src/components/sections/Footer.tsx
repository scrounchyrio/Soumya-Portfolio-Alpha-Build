"use client";

import React from "react";
import { motion } from "framer-motion";
import { MonogramLogo } from "../brand/MonogramLogo";
import { siteConfig } from "../../../site.config";
import { ArrowUp, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-16 md:py-24 bg-white/75 backdrop-blur-md relative border-t border-black/10 overflow-hidden">
      {/* Background dot matrix */}
      <div className="absolute inset-0 bg-dot-matrix opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-16 border-b border-black/10">
          {/* Brand & Wordmark */}
          <div className="space-y-4 max-w-md">
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <MonogramLogo size="md" showHousing={true} />
            </motion.div>
            <p className="text-xl font-light text-neutral-900 tracking-tight">
              Thoughtful work, made with intention.
            </p>
            <p className="font-mono text-xs text-neutral-600 tracking-wider">
              {siteConfig.meta.name} — Creative &amp; Communications Professional. <br />
              Kolkata (IN) // {siteConfig.meta.coordinates}
            </p>
          </div>

          {/* Social Links List */}
          <div className="space-y-3 font-mono text-xs">
            <span className="block text-[10px] text-neutral-500 tracking-widest uppercase font-semibold">
              INDEXED CHANNELS
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-neutral-700">
              {siteConfig.socials.slice(0, 5).map((social) => (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, x: 2, color: "#000000" }}
                  className="transition-colors inline-flex items-center gap-1 group font-medium"
                >
                  <span>{social.label}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D71921] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Back to Top with Bouncy Motion */}
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="self-start md:self-end flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300 hover:border-black/30 bg-white font-mono text-xs text-neutral-800 hover:text-black transition-all uppercase tracking-wider shadow-xs font-semibold"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#D71921]" />
          </motion.button>
        </div>

        {/* Bottom Micro-Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} {siteConfig.meta.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase text-neutral-500 font-medium">
            <span>NOTHING OS INSPIRATION</span>
            <span>•</span>
            <span>LIGHT THEME V2.6</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
