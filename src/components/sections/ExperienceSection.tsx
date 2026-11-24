"use client";

import React, { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { siteConfig } from "../../../site.config";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export const ExperienceSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(siteConfig.experiences[0]?.id ?? null);

  return (
    <section
      id="experience"
      data-theme="forest"
      className="relative px-5 py-24 md:px-10 md:py-36 border-b border-fg/10 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(255,147,74,0.12),transparent_70%)]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Voy & Apple Section Header (Forest Green Accent) */}
        <SectionHeader
          label="Work history"
          title="Film sets, field research, and everything between."
          italic={["between."]}
          subtitle="Hollywood production pipelines at DNEG & MPC, bilateral green hydrogen research in Thailand, and multilateral ESG publications."
        />

        <Reveal stagger className="border-t border-fg/10">
          {siteConfig.experiences.map((exp) => {
            const isOpen = openId === exp.id;
            return (
              <article key={exp.id} className="border-b border-fg/10">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : exp.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${exp.id}-panel`}
                    className="group grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-4 py-7 text-left transition-colors hover:bg-accent/[0.04] px-3 rounded-2xl md:grid-cols-[2rem_1fr_16rem_auto] md:gap-8 md:py-9"
                  >
                    <span className="h-2 w-2 rounded-full bg-accent/40 group-hover:bg-accent transition-colors self-center shadow-sm" />
                    <span>
                      <span className="display block text-[clamp(1.5rem,3.4vw,2.75rem)] font-medium transition-transform duration-500 ease-expo group-hover:translate-x-2 group-hover:text-accent">
                        {exp.organization}
                      </span>
                      <span className="mt-2 block text-sm text-fg/60">{exp.role}</span>
                    </span>
                    <span className="eyebrow hidden md:block text-fg/50">{exp.period}</span>
                    <Plus
                      aria-hidden="true"
                      className={`h-6 w-6 shrink-0 transition-transform duration-500 ease-expo ${
                        isOpen ? "rotate-45 text-accent" : "text-fg/40 group-hover:text-fg"
                      }`}
                    />
                  </button>
                </h3>

                <div
                  id={`${exp.id}-panel`}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-700 ease-expo ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="glass-card mb-6 rounded-2xl border border-accent/20 bg-canvas-card/80 p-6 md:p-8">
                      <p className="text-base text-fg/80 leading-relaxed md:text-lg">{exp.description}</p>
                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="mt-4 space-y-2 text-sm text-fg/70">
                          {exp.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
};
