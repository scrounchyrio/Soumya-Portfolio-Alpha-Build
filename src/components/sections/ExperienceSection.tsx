"use client";

import React, { useState } from "react";
import { ArrowUpRight, Plus, Sparkles, MapPin, Calendar } from "lucide-react";
import { siteConfig } from "../../../site.config";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { OrganizationIcon } from "../brand/OrganizationIcons";

const IMPACT_HOOKS: Record<string, string> = {
  "exp-ubon": "Delivered 8+ university lecture sessions; authored 7 original policy maps comparing India's NGHM and Thailand's BCG model for bilateral green hydrogen trade corridors.",
  "exp-waf": "Synthesised 10+ multilateral agriculture & food security reports into executive decision decks for European C-suite and policy stakeholders.",
  "exp-ungc": "Co-designed national water-quality assessment report with UNDP & Bayer; engineered diagnostic matrices operationalising UN SDG 16 anti-corruption safeguards.",
  "exp-hmx": "Constructed photorealistic lighting and shading pipelines for Lenovo, Dell, and Panasonic flagship campaigns, reducing render overhead by 25%.",
  "exp-dneg": "Crafted physically based shader networks and texturing across 42+ hero assets for Hollywood tentpoles including Furiosa: A Mad Max Saga and Bullet Train.",
  "exp-mpc": "Engineered multi-tile UDIM displacement maps and ACES color consistency across sequence-critical film assets for Sonic the Hedgehog 2.",
};

export const ExperienceSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(siteConfig.experiences[0]?.id ?? null);

  return (
    <section
      id="experience"
      data-theme="forest"
      className="relative px-5 py-24 md:px-10 md:py-36 border-b border-fg/10 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(5,150,105,0.12),transparent_70%)]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Voy & Apple Section Header */}
        <SectionHeader
          label="Work history"
          title="Film sets, field research, and everything between."
          italic={["between."]}
          subtitle="Hollywood production pipelines at DNEG &amp; MPC, bilateral green hydrogen research in Thailand, and multilateral ESG publications."
        />

        <Reveal stagger className="border-t border-fg/10">
          {siteConfig.experiences.map((exp) => {
            const isOpen = openId === exp.id;
            const impactHook = IMPACT_HOOKS[exp.id] || exp.description;

            return (
              <article key={exp.id} className="border-b border-fg/10">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : exp.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${exp.id}-panel`}
                    id={`${exp.id}-trigger`}
                    className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 py-7 text-left transition-colors hover:bg-accent/[0.04] px-3 rounded-2xl md:grid-cols-[auto_1fr_16rem_auto] md:gap-6 md:py-8"
                  >
                    {/* Organization Official Vector Brand Icon */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-fg/15 bg-canvas-raised p-2 text-accent shadow-sm group-hover:border-accent group-hover:scale-105 transition-all">
                      <OrganizationIcon name={exp.id} size={22} />
                    </div>

                    {/* Organization Name followed by Role */}
                    <div className="min-w-0 pr-2">
                      <span className="display flex flex-wrap items-center gap-2 text-[clamp(1.35rem,2.8vw,2.4rem)] font-medium leading-tight transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:text-accent">
                        {exp.organization}
                      </span>
                      <span className="mt-1 block text-sm font-normal text-fg/65 truncate">{exp.role}</span>
                    </div>

                    <span className="eyebrow hidden md:block text-fg/50 font-mono text-xs">{exp.period}</span>

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
                  aria-labelledby={`${exp.id}-trigger`}
                  className={`grid transition-[grid-template-rows] duration-700 ease-expo ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="glass-card mb-6 rounded-2xl border border-accent/25 bg-canvas-card/85 p-6 md:p-8">
                      {/* Organization Header Bar with Icon & Metadata */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-fg/10">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 p-2 text-accent">
                            <OrganizationIcon name={exp.id} size={22} />
                          </div>
                          <div>
                            <h4 className="font-bold text-base text-fg">{exp.organization}</h4>
                            <div className="flex items-center gap-3 font-mono text-xs text-fg/60">
                              <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3 text-accent" /> {exp.location}</span>
                              <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3 text-accent" /> {exp.period}</span>
                            </div>
                          </div>
                        </div>

                        <a
                          href={exp.orgUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-fg/15 bg-canvas-raised px-4 font-mono text-xs font-semibold uppercase tracking-wider text-fg shadow-sm transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent"
                        >
                          Visit Organization
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      </div>

                      {/* Eye-Catching Strategic Impact Hook */}
                      <div className="my-5 rounded-xl border border-accent/30 bg-accent/5 p-4">
                        <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-accent mb-1">
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>Strategic Key Impact Hook</span>
                        </div>
                        <p className="text-sm font-medium leading-relaxed text-fg/90">{impactHook}</p>
                      </div>

                      <p className="text-base text-fg/80 leading-relaxed md:text-lg">{exp.description}</p>

                      {exp.highlights && exp.highlights.length > 0 && (
                        <div className="mt-5 border-t border-fg/10 pt-4">
                          <p className="font-mono text-xs uppercase tracking-wider text-fg/50 mb-3">Key Responsibilities &amp; Deliverables:</p>
                          <ul className="space-y-2 text-sm text-fg/75">
                            {exp.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Technical Skills & Keywords */}
                      {exp.skills && exp.skills.length > 0 && (
                        <div className="mt-5 flex flex-wrap items-center gap-1.5 pt-3">
                          <span className="font-mono text-[10px] uppercase text-fg/40 mr-1">Skills:</span>
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-fg/10 bg-canvas/60 px-2.5 py-0.5 font-mono text-[10px] text-fg/70"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
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
