import React from "react";
import { siteConfig, Education } from "../../../site.config";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { OrganizationIcon } from "../brand/OrganizationIcons";
import { Award, GraduationCap } from "lucide-react";

export const EducationSection: React.FC = () => (
  <section
    id="education"
    data-theme="forest"
    className="relative px-5 py-24 md:px-10 md:py-36 border-b border-fg/10 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(5,150,105,0.12),transparent_70%)]"
  >
    <div className="mx-auto max-w-7xl">
      <SectionHeader
        label="Academic background"
        title="Trained in two worlds."
        italic={["worlds."]}
        subtitle="Formal academic grounding in environmental management, energy policy, and Hollywood visual arts."
      />

      <Reveal stagger className="border-t border-fg/10">
        {siteConfig.education.map((edu: Education) => (
          <article
            key={edu.degree}
            className="grid gap-6 border-b border-fg/10 py-10 md:grid-cols-12 md:gap-10 md:py-12 transition-colors hover:bg-accent/[0.03] px-3 rounded-2xl"
          >
            {/* Period & Score with Honors Hook */}
            <div className="md:col-span-3">
              <p className="eyebrow text-accent font-bold font-mono text-xs">{edu.period}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-[11px] font-semibold text-accent">
                <Award className="h-3.5 w-3.5 shrink-0" />
                <span>{edu.score}{edu.honors ? ` · ${edu.honors}` : ""}</span>
              </div>
            </div>

            {/* Degree & College with Official College/University Icon */}
            <div className="md:col-span-5">
              <h3 className="display text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.1] font-medium text-fg">
                {edu.degree}
              </h3>

              {/* User Request: Icon of College followed by College Name */}
              <div className="mt-3.5 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-fg/15 bg-canvas-raised p-2 text-accent shadow-sm">
                  <OrganizationIcon name={edu.institution} size={20} />
                </div>
                <div>
                  <p className="font-semibold text-base text-fg/90">{edu.institution}</p>
                  <p className="eyebrow text-xs text-fg/50 font-mono">{edu.faculty}</p>
                </div>
              </div>
            </div>

            {/* Academic Highlights & Research Keywords */}
            <ul className="space-y-3 text-fg/75 md:col-span-4 text-sm leading-relaxed">
              {edu.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Reveal>
    </div>
  </section>
);
