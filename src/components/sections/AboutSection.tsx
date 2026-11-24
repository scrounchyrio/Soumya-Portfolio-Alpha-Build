"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../../../site.config";
import { gsap, prefersReducedMotion } from "../../lib/motion";
import { MonogramLogo } from "../brand/MonogramLogo";
import { MagneticButton } from "../ui/MagneticButton";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

const parseStat = (value: string) => {
  const match = value.match(/^(\d+)(.*)$/);
  return match ? { n: parseInt(match[1], 10), pad: match[1].length, suffix: match[2] } : null;
};

export const AboutSection: React.FC = () => {
  const { about } = siteConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // Apple-style scroll-scrubbed text reveal
      gsap.fromTo(
        "[data-scrub] span",
        { opacity: 0.18, color: "rgba(15,15,22,0.3)" },
        {
          opacity: 1,
          color: "rgba(15,15,22,1)",
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: "[data-scrub]", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
      // GSAP Count-up for stats
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((node) => {
        const target = Number(node.dataset.count);
        const pad = Number(node.dataset.pad);
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 90%", once: true },
          onUpdate: () => {
            node.textContent = String(Math.round(state.v)).padStart(pad, "0");
          },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-theme="spring"
      className="relative px-5 py-24 md:px-10 md:py-36 border-b border-fg/10 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(139,60,192,0.12),transparent_70%)]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Voy & Apple Section Header (Spring Green Accent) */}
        <SectionHeader
          label="About the operator"
          title={about.heading}
          italic={["approach."]}
          subtitle="Operating at the intersection of aesthetic LookDev precision and empirical sustainability research."
        />

        {/* Apple-Style Giant Text Scrub Statement */}
        <p
          data-scrub
          className="display max-w-6xl text-[clamp(1.75rem,3.8vw,3.6rem)] leading-[1.12] tracking-[-0.035em] font-medium"
        >
          {about.intro.split(" ").map((word, i) => (
            <span key={i} className="inline-block pr-[0.24em] transition-colors" style={{ opacity: 0.2 }}>
              {word}
            </span>
          ))}
        </p>

        {/* Two Column Narrative (Voy Design Inspiration) */}
        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 items-start">
          <Reveal className="md:col-span-5">
            <div className="glass-card relative aspect-[4/5] overflow-hidden rounded-[28px] border border-accent/30 bg-canvas-card shadow-[0_16px_40px_rgba(139,60,192,0.12)]">
              {!imageError ? (
                <Image
                  src={about.photo.src}
                  alt={about.photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-6 p-8 text-center bg-gradient-to-br from-canvas via-canvas-card to-canvas">
                  <MonogramLogo size="lg" showHousing={false} />
                  <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                    {about.photo.placeholder}
                  </span>
                  <span className="font-mono text-[11px] text-fg/50">
                    KOLKATA // 22°34&apos;N 88°21&apos;E
                  </span>
                </div>
              )}
            </div>
            <p className="eyebrow mt-4 text-fg/60">{about.photo.caption}</p>
          </Reveal>

          <div className="md:col-span-7 md:pl-8">
            <Reveal stagger className="space-y-6 text-lg leading-relaxed text-fg/75 md:text-xl">
              {about.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>

            <Reveal className="mt-10 flex flex-wrap gap-3.5">
              <MagneticButton
                href={about.resumeUrl}
                download="Soumyajit_Mukherjee_Resume.pdf"
                className="bg-accent text-neutral-950 hover:bg-fg hover:text-canvas shadow-md shadow-accent/25 font-bold"
              >
                Download CV
              </MagneticButton>
              <MagneticButton
                href={`mailto:${siteConfig.meta.email}`}
                variant="outline"
                className="glass-card border-fg/20 hover:border-accent hover:text-accent"
              >
                Say hello
              </MagneticButton>
            </Reveal>

            <Reveal className="mt-12">
              <ul className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-widest text-fg/60">
                {siteConfig.socials
                  .filter((s) => s.platform !== "Email")
                  .map((s) => (
                    <li key={s.platform}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-accent transition-colors">
                        {s.label}
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* Apple-Style Stat Metric Cards */}
        <Reveal stagger className="mt-20 grid grid-cols-2 gap-6 border-t border-fg/10 pt-12 md:mt-28 md:grid-cols-4">
          {about.stats.map((stat) => {
            const parsed = parseStat(stat.value);
            return (
              <div
                key={stat.label}
                className="glass-card rounded-2xl border border-fg/10 bg-canvas-card p-6 shadow-sm hover:border-accent/40 transition-colors"
              >
                <p className="display text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold text-fg">
                  {parsed ? (
                    <>
                      <span data-count={parsed.n} data-pad={parsed.pad}>
                        {stat.value.replace(parsed.suffix, "")}
                      </span>
                      {parsed.suffix && <span className="text-accent">{parsed.suffix}</span>}
                    </>
                  ) : (
                    stat.value
                  )}
                </p>
                <p className="mt-2 text-sm font-semibold text-fg/90">{stat.label}</p>
                <p className="eyebrow mt-1 text-[10px] text-fg/50">{stat.detail}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
};
