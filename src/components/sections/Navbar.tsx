"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MonogramLogo } from "../brand/MonogramLogo";
import { siteConfig } from "../../../site.config";
import { Menu, X, ArrowUpRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileMenuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === "Tab") {
        const focusableElements =
          mobileMenuRef.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          );
        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        } else if (
          !mobileMenuRef.current?.contains(document.activeElement)
        ) {
          event.preventDefault();
          (event.shiftKey ? lastElement : firstElement).focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const desktopBreakpoint = window.matchMedia("(min-width: 1280px)");
    const closeMobileMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (!event.matches || !mobileMenuOpen) return;
      setMobileMenuOpen(false);
      document.querySelector<HTMLElement>("header nav a")?.focus();
    };

    desktopBreakpoint.addEventListener("change", closeMobileMenuOnDesktop);
    return () =>
      desktopBreakpoint.removeEventListener("change", closeMobileMenuOnDesktop);
  }, [mobileMenuOpen]);

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
        className={`fixed top-0 left-0 right-0 z-[100] ${
          prefersReducedMotion ? "transition-none" : "transition-all duration-300"
        } ${
          scrolled ? "py-2 sm:py-2.5" : "py-2.5 sm:py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Distinct Floating High-Contrast Title Bar Dock */}
          <motion.div
            initial={prefersReducedMotion ? false : { y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 300, damping: 25 }
            }
            className={`flex items-center justify-between gap-2 px-3 sm:px-4 xl:px-5 py-2 sm:py-2.5 rounded-full border ${
              prefersReducedMotion ? "transition-none" : "transition-all duration-300"
            } ${
              scrolled
                ? "bg-white/95 border-neutral-300 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl ring-1 ring-black/5"
                : "bg-white/90 border-neutral-300/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl ring-1 ring-black/5"
            }`}
          >
            {/* Left: Monogram & Full Name (Soumyajit Mukherjee) */}
            <motion.a
              href="#home"
              className="flex min-h-11 min-w-0 items-center gap-2 sm:gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D71921] rounded-full pr-1"
              aria-label="Soumyajit Mukherjee Home"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              <MonogramLogo size="sm" showHousing={true} className="shrink-0" />
              <div className="flex min-w-0 flex-col">
                <span className="whitespace-nowrap font-mono text-[10px] max-[359px]:text-[9px] sm:text-xs xl:text-[13px] tracking-[0.08em] max-[359px]:tracking-[0.04em] text-neutral-900 font-bold group-hover:text-[#D71921] transition-colors leading-tight">
                  SOUMYAJIT MUKHERJEE
                </span>
                <span className="hidden sm:block font-mono text-[9px] tracking-widest text-neutral-500 uppercase leading-tight mt-0.5">
                  CREATIVE · RESEARCH
                </span>
              </div>
            </motion.a>

            {/* Center: Desktop Navigation */}
            <nav aria-label="Primary navigation" className="hidden xl:flex items-center gap-0.5 bg-neutral-100/90 border border-neutral-200/90 p-1 rounded-full shadow-inner">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.04, y: -1 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 450, damping: 18 }
                  }
                  className="relative min-h-11 px-2.5 py-1.5 font-mono text-[10px] tracking-wide text-neutral-700 hover:text-black rounded-full uppercase flex items-center gap-1 transition-colors z-10 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71921]"
                >
                  <span className="text-[9px] text-[#D71921] font-bold">{link.num}</span>
                  <span>{link.label}</span>
                  {hoveredLink === link.href && (
                    <motion.div
                      layoutId={prefersReducedMotion ? undefined : "navbar-pill-hover"}
                      className="absolute inset-0 bg-white rounded-full shadow-sm -z-10 border border-black/5"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 450, damping: 25 }
                      }
                    />
                  )}
                </motion.a>
              ))}
            </nav>

            {/* Right Action */}
            <div className="flex shrink-0 items-center gap-2 xl:ml-2">
              {/* Distinct High-Contrast CTA Button */}
              <motion.a
                href={`mailto:${siteConfig.meta.email}`}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        scale: 1.03,
                        y: -1,
                        boxShadow: "0 10px 25px -5px rgba(215, 25, 33, 0.35)",
                      }
                }
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 400, damping: 18 }
                }
                className="hidden md:inline-flex min-h-11 items-center justify-center gap-2 px-3 xl:px-4 rounded-full bg-[#111111] text-white border border-black font-mono text-[10px] xl:text-[11px] tracking-wider uppercase font-bold hover:bg-[#222222] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71921] focus-visible:ring-offset-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D71921] animate-pulse" />
                <span className="xl:hidden">Contact</span>
                <span className="hidden xl:inline">Get in touch</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
              </motion.a>

              {/* Mobile menu toggle */}
              <motion.button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white/80 text-neutral-800 shadow-sm transition-colors hover:bg-neutral-100 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71921] focus-visible:ring-offset-2"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls={mobileMenuOpen ? "mobile-navigation" : undefined}
              >
                {mobileMenuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.24 }}
            id="mobile-navigation"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="fixed inset-0 z-[99] flex flex-col overflow-y-auto bg-white/98 px-5 pb-6 pt-24 backdrop-blur-2xl sm:px-8 sm:pb-8 sm:pt-28 xl:hidden"
          >
            <nav aria-label="Mobile navigation" className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center font-mono text-sm tracking-widest">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    menuButtonRef.current?.focus();
                  }}
                  whileHover={
                    prefersReducedMotion ? undefined : { x: 4, color: "#D71921" }
                  }
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                  className="flex min-h-12 items-center justify-between border-b border-neutral-200 py-3 text-neutral-800 transition-colors first:border-t focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D71921] focus-visible:text-[#D71921]"
                >
                  <span className="text-xl font-light">{link.label}</span>
                  <span className="text-xs text-[#D71921] font-bold">{link.num}/</span>
                </motion.a>
              ))}
            </nav>

            <div className="mx-auto w-full max-w-lg space-y-4 border-t border-neutral-200 pt-5">
              <motion.a
                href={`mailto:${siteConfig.meta.email}`}
                onClick={() => {
                  setMobileMenuOpen(false);
                  menuButtonRef.current?.focus();
                }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#111111] py-3 font-mono text-xs tracking-widest uppercase font-bold text-white shadow-md transition-colors hover:bg-[#222222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71921] focus-visible:ring-offset-2"
              >
                <span>Start Conversation</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
              <div className="flex flex-wrap justify-between items-center gap-2 text-[10px] font-mono text-neutral-500 tracking-wider">
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
