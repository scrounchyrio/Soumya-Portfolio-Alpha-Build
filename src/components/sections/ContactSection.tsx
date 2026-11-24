"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { siteConfig } from "../../../site.config";
import { MagneticButton } from "../ui/MagneticButton";
import { Reveal } from "../ui/Reveal";
import { SplitReveal } from "../ui/SplitReveal";

const PRESETS = [
  { label: "Film LookDev & VFX production", subject: "Inquiry: Film LookDev & VFX Collaboration" },
  { label: "Green hydrogen & policy research", subject: "Inquiry: Green Hydrogen Research Collaboration" },
  { label: "Guest lectures & seminars", subject: "Invitation: Guest Lecture / Seminar Session" },
];

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [time, setTime] = useState("");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => {
      clearInterval(id);
      window.clearTimeout(timer.current);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.meta.email);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopyFailed(true);
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setCopied(false);
      setCopyFailed(false);
    }, 2000);
  };

  return (
    <section
      id="contact"
      data-theme="emerald"
      className="relative px-5 pb-24 pt-24 md:px-10 md:pb-36 md:pt-36 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(254,135,128,0.12),transparent_70%)]"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-6 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent shadow-sm" />
          <span className="eyebrow text-accent font-bold">Contact</span>
        </Reveal>

        <SplitReveal text="Let's make it matter." italic={["matter."]} className="display text-[clamp(3rem,10vw,9.5rem)] font-medium" />

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <p className="max-w-lg text-lg leading-relaxed text-fg/75 md:text-xl">
              Looking for a LookDev specialist for film production, a researcher for clean energy transition, or a visual policy consultant? Reach out directly.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3.5">
              <MagneticButton
                href={`mailto:${siteConfig.meta.email}?subject=Collaboration%20Inquiry%20via%20Portfolio`}
                className="bg-accent text-neutral-950 hover:bg-fg hover:text-canvas shadow-lg hover:shadow-accent/30 font-bold"
              >
                Compose email <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
              <MagneticButton onClick={() => void copyEmail()} variant="outline" className="glass-card border-fg/20 hover:border-accent hover:text-accent">
                {copied ? <Check className="h-4 w-4 text-accent" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                <span role="status">{copied ? "Copied" : copyFailed ? "Copy failed" : "Copy address"}</span>
              </MagneticButton>
            </div>
            <p className="mt-6 font-mono text-xs text-fg/50">
              {siteConfig.meta.email} ·{" "}
              <a href={`tel:${siteConfig.meta.phone.replace(/\s+/g, "")}`} className="hover:text-accent transition-colors">
                {siteConfig.meta.phone}
              </a>
            </p>
          </Reveal>

          <Reveal className="md:col-span-5 md:col-start-8">
            <p className="eyebrow mb-4 text-fg/60">Start with a topic</p>
            <ul className="border-t border-fg/10">
              {PRESETS.map((preset) => (
                <li key={preset.label} className="border-b border-fg/10">
                  <a
                    href={`mailto:${siteConfig.meta.email}?subject=${encodeURIComponent(preset.subject)}`}
                    className="group flex items-center justify-between py-5 transition-colors hover:text-accent font-medium"
                  >
                    <span className="transition-transform duration-500 ease-expo group-hover:translate-x-2">{preset.label}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-6 flex justify-between text-fg/50">
              <span>Kolkata, IST</span>
              <span suppressHydrationWarning>{time}</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
