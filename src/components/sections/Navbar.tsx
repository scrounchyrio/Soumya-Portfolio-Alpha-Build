"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../../../site.config";
import { lockScroll, scrollToTarget } from "../../lib/motion";
import { MonogramLogo } from "../brand/MonogramLogo";

const NAV_LINKS = [
  { label: "Overview", href: "#home" },
  { label: "Works", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "Feed", href: "#linkedin" },
  { label: "Skills", href: "#specs" },
  { label: "Contact", href: "#contact" },
];

export const Navbar: React.FC = () => {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [time, setTime] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  // Listen to active section updates from ScrollTheme
  useEffect(() => {
    const handleSectionChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      if (customEvent.detail?.id) {
        setActiveSection(customEvent.detail.id);
      }
    };
    window.addEventListener("theme:section", handleSectionChange);
    window.addEventListener("gta:section", handleSectionChange);
    return () => {
      window.removeEventListener("theme:section", handleSectionChange);
      window.removeEventListener("gta:section", handleSectionChange);
    };
  }, []);

  // Scroll lock, focus trap and Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !menuRef.current?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !menuRef.current?.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open]);

  const goTo = (href: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    setOpen(false);
    buttonRef.current?.focus();
    window.setTimeout(() => scrollToTarget(href), 60);
    history.replaceState(null, "", href);
  };

  return (
    <>
      {/* Apple-Style Floating Frosted Glass Pill Navigation Bar */}
      <header className="site-navbar fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-5xl">
        <div className="glass-pill flex items-center justify-between rounded-full border border-fg/10 bg-canvas/80 px-4 py-2.5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all">
          {/* Left Brand Identity */}
          <a
            href="#home"
            onClick={goTo("#home")}
            aria-label={`${siteConfig.meta.name}, home`}
            className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-wider text-fg hover:text-accent transition-colors"
          >
            <MonogramLogo size="sm" showHousing={false} />
            <span className="hidden sm:inline">{siteConfig.meta.shortName}</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={goTo(link.href)}
                  className={`rounded-full px-3 py-1.5 transition-all ${
                    isActive
                      ? "bg-accent/15 text-accent font-bold border border-accent/30 shadow-sm"
                      : "text-fg/70 hover:text-fg hover:bg-fg/5"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Status Dot & Clock */}
          <div className="flex items-center gap-3">
            <span
              className="flex items-center gap-2 rounded-full border border-fg/10 bg-canvas/60 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-fg/75 backdrop-blur-sm"
              suppressHydrationWarning
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="hidden sm:inline">Kolkata</span> {time}
            </span>

            {/* Mobile Menu Button */}
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-fg/15 text-fg hover:bg-fg/5"
            >
              <span className="relative block h-3 w-4" aria-hidden="true">
                <span className={`absolute left-0 h-px w-full bg-fg transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-full bg-fg transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduced ? 0 : 0.6, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
            className="fixed inset-0 z-[99] overflow-y-auto bg-canvas"
          >
            <div className="mx-auto flex min-h-full max-w-4xl flex-col justify-between px-6 pb-10 pt-28">
              <nav aria-label="Mobile Primary">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link, i) => (
                    <li key={link.href} className="border-b border-fg/10">
                      <motion.div
                        initial={reduced ? false : { opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.04 }}
                      >
                        <a
                          href={link.href}
                          onClick={goTo(link.href)}
                          className="group flex items-center justify-between py-4 text-fg transition-colors hover:text-accent"
                        >
                          <span className="display text-3xl transition-transform duration-300 group-hover:translate-x-3">
                            {link.label}
                          </span>
                          <span className="h-2 w-2 rounded-full bg-accent/30 group-hover:bg-accent transition-colors" />
                        </a>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-12 flex flex-col gap-6 border-t border-fg/10 pt-6">
                <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest text-fg/60">
                  {siteConfig.socials
                    .filter((s) => s.platform !== "Email")
                    .map((s) => (
                      <li key={s.platform}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-fg">
                          {s.label}
                          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                </ul>
                <a
                  href={`mailto:${siteConfig.meta.email}`}
                  className="font-mono text-xs uppercase tracking-widest text-fg hover:text-accent"
                >
                  {siteConfig.meta.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
