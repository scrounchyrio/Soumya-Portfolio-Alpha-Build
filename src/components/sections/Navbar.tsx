"use client";

import React, { useState, useEffect } from "react";
import { MonogramLogo } from "../brand/MonogramLogo";
import { MagneticButton } from "../ui/MagneticButton";
import { siteConfig } from "../../../site.config";
import { Menu, X, ArrowUpRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about", num: "01" },
    { label: "Work", href: "#experience", num: "02" },
    { label: "Projects", href: "#projects", num: "03" },
    { label: "Creations", href: "#gallery", num: "04" },
    { label: "Feed", href: "#linkedin", num: "05" },
    { label: "Specs", href: "#specs", num: "06" },
    { label: "Contact", href: "#contact", num: "07" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-black/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Identity */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D71921]"
            aria-label="Soumyajit Mukherjee Home"
          >
            <MonogramLogo size="sm" showHousing={true} />
            <div className="hidden sm:flex flex-col">
              <span className="font-mono text-xs tracking-wider text-white font-medium group-hover:text-white/80 transition-colors">
                SOUMYAJIT M.
              </span>
              <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">
                CREATIVE · RESEARCH
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1 font-mono text-[11px] tracking-widest text-white/60 hover:text-white hover:bg-white/5 rounded-full transition-all uppercase flex items-center gap-1.5"
              >
                <span className="text-[9px] text-[#D71921] font-bold">{link.num}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Action & Status */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] tracking-widest text-white/60 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D71921] animate-pulse" />
              <span>{siteConfig.meta.statusText}</span>
            </div>

            <MagneticButton
              href={`mailto:${siteConfig.meta.email}`}
              variant="secondary"
              className="hidden sm:inline-flex !py-2 !px-4 !text-[11px]"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D71921]" />
            </MagneticButton>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white rounded-lg border border-white/10 bg-white/5"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-black/95 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-10 md:hidden">
          <div className="flex-1 flex flex-col justify-center space-y-4 font-mono text-sm tracking-widest">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 border-b border-white/10 text-white/70 hover:text-white transition-colors"
              >
                <span className="text-lg font-light">{link.label}</span>
                <span className="text-xs text-[#D71921]">{link.num}/</span>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 space-y-4">
            <a
              href={`mailto:${siteConfig.meta.email}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white text-black font-mono text-xs tracking-widest uppercase font-bold"
            >
              <span>Start Conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <div className="flex justify-between items-center text-[10px] font-mono text-white/40 tracking-wider">
              <span>{siteConfig.meta.location}</span>
              <span>{siteConfig.meta.coordinates}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
