"use client";

import React from "react";
import { MonogramLogo } from "../brand/MonogramLogo";
import { siteConfig } from "../../../site.config";
import { ArrowUp, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-16 md:py-24 bg-black relative border-t border-white/10 overflow-hidden">
      {/* Background dot matrix */}
      <div className="absolute inset-0 bg-dot-matrix opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-16 border-b border-white/10">
          {/* Brand & Wordmark */}
          <div className="space-y-4 max-w-md">
            <MonogramLogo size="md" showHousing={true} />
            <p className="text-xl font-light text-white tracking-tight">
              Thoughtful work, made with intention.
            </p>
            <p className="font-mono text-xs text-white/50 tracking-wider">
              {siteConfig.meta.name} — Creative &amp; Communications Professional. <br />
              Kolkata (IN) // {siteConfig.meta.coordinates}
            </p>
          </div>

          {/* Social Links List */}
          <div className="space-y-3 font-mono text-xs">
            <span className="block text-[10px] text-white/40 tracking-widest uppercase">
              INDEXED CHANNELS
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-white/70">
              {siteConfig.socials.slice(0, 5).map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  <span>{social.label}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#D71921] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Back to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="self-start md:self-end flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 hover:border-white/30 bg-white/5 font-mono text-xs text-white/70 hover:text-white transition-all uppercase tracking-wider"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#D71921]" />
          </button>
        </div>

        {/* Bottom Micro-Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-white/40">
          <div>
            © {new Date().getFullYear()} {siteConfig.meta.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase">
            <span>NOTHING OS INSPIRATION</span>
            <span>•</span>
            <span>VERSION 2.6</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
