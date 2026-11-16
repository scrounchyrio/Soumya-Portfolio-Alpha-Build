"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MonogramLogo } from "../brand/MonogramLogo";
import { siteConfig } from "../../../site.config";
import { Menu, X, ArrowUpRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
          scrolled ? "py-2.5 sm:py-3.5" : "py-4 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Distinct Floating High-Contrast Title Bar Dock */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-300 ${
              scrolled
                ? "bg-white/95 border-neutral-300 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl ring-1 ring-black/5"
                : "bg-white/90 border-neutral-300/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl ring-1 ring-black/5"
            }`}
          >
            {/* Left: Monogram & Full Name (Soumyajit Mukherjee) */}
            <motion.a
              href="#home"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D71921] rounded-full pr-2"
              aria-label="Soumyajit Mukherjee Home"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MonogramLogo size="sm" showHousing={true} />
              <div className="flex flex-col">
                <span className="font-mono text-xs sm:text-[13px] tracking-wider text-neutral-900 font-bold group-hover:text-[#D71921] transition-colors leading-tight">
                  SOUMYAJIT MUKHERJEE
                </span>
                <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase leading-tight mt-0.5">
                  CREATIVE · RESEARCH
                </span>
              </div>
            </motion.a>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5 bg-neutral-100/90 border border-neutral-200/90 p-1 rounded-full shadow-inner">
              {navLinks.slice(0, 3).map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  whileHover={{ scale: 1.06, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 450, damping: 15 }}
                  className="relative px-3.5 py-1 font-mono text-[11px] tracking-widest text-neutral-700 hover:text-black rounded-full uppercase flex items-center gap-1.5 transition-colors z-10 font-medium"
                >
                  <span className="text-[9px] text-[#D71921] font-bold">{link.num}</span>
                  <span>{link.label}</span>
                  {hoveredLink === link.href && (
                    <motion.div
                      layoutId="navbar-pill-hover"
                      className="absolute inset-0 bg-white rounded-full shadow-sm -z-10 border border-black/5"
                      transition={{ type: "spring", stiffness: 450, damping: 25 }}
                    />
                  )}
                </motion.a>
              ))}

              {navLinks.slice(3).map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  whileHover={{ scale: 1.06, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 450, damping: 15 }}
                  className="relative px-3.5 py-1 font-mono text-[11px] tracking-widest text-neutral-700 hover:text-black rounded-full uppercase flex items-center gap-1.5 transition-colors z-10 font-medium"
                >
                  <span className="text-[9px] text-[#D71921] font-bold">{link.num}</span>
                  <span>{link.label}</span>
                  {hoveredLink === link.href && (
                    <motion.div
                      layoutId="navbar-pill-hover"
                      className="absolute inset-0 bg-white rounded-full shadow-sm -z-10 border border-black/5"
                      transition={{ type: "spring", stiffness: 450, damping: 25 }}
                    />
                  )}
                </motion.a>
              ))}
            </nav>

            {/* Right Action: CTA Button Only */}
            <div className="flex items-center gap-3 lg:ml-4">
              {/* Distinct High-Contrast CTA Button */}
              <motion.a
                href={`mailto:${siteConfig.meta.email}`}
                whileHover={{
                  scale: 1.05,
                  y: -1,
                  boxShadow: "0 10px 25px -5px rgba(215, 25, 33, 0.35)",
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="relative inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full bg-[#111111] text-white border border-black font-mono text-[11px] tracking-widest uppercase font-bold hover:bg-[#222222] transition-colors shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D71921] animate-pulse" />
                <span>Get in touch</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
              </motion.a>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-800 hover:text-black rounded-full border border-neutral-300 bg-neutral-100 hover:bg-neutral-200 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-white/98 backdrop-blur-2xl flex flex-col pt-28 px-6 pb-10 lg:hidden"
          >
            <div className="flex-1 flex flex-col justify-center space-y-3 font-mono text-sm tracking-widest">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ x: 6, color: "#D71921" }}
                  className="flex items-center justify-between py-3 border-b border-neutral-200 text-neutral-800 transition-colors"
                >
                  <span className="text-xl font-light">{link.label}</span>
                  <span className="text-xs text-[#D71921] font-bold">{link.num}/</span>
                </motion.a>
              ))}
            </div>

            <div className="pt-6 border-t border-neutral-200 space-y-4">
              <a
                href={`mailto:${siteConfig.meta.email}`}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#111111] text-white font-mono text-xs tracking-widest uppercase font-bold hover:bg-[#222222] transition-colors shadow-md"
              >
                <span>Start Conversation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 tracking-wider">
                <span>{siteConfig.meta.location}</span>
                <span>{siteConfig.meta.coordinates}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
