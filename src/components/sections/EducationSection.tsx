import React from "react";
import { siteConfig, Education } from "../../../site.config";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export const EducationSection: React.FC = () => (
  <section
    id="education"
    data-theme="forest"
    className="relative px-5 py-24 md:px-10 md:py-36 border-b border-fg/10 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(255,177,69,0.12),transparent_70%)]"
  >
    <div className="mx-auto max-w-7xl">
      <SectionHeader
        label="Academic background"
        title="Trained in two worlds."
        italic={["worlds."]}
        subtitle="Formal academic grounding in environmental management, public policy, and visual arts."
      />

      <Reveal stagger className="border-t border-fg/10">
        {siteConfig.education.map((edu: Education) => (
          <article key={edu.degree} className="grid gap-6 border-b border-fg/10 py-10 md:grid-cols-12 md:gap-10 md:py-12 transition-colors hover:bg-accent/[0.03] px-3 rounded-2xl">
            <div className="md:col-span-3">
              <p className="eyebrow text-accent font-bold">{edu.period}</p>
              <p className="eyebrow mt-2 text-fg/60">
                {edu.score}
                {edu.honors ? ` · ${edu.honors}` : ""}
              </p>
            </div>
            <div className="md:col-span-5">
              <h3 className="display text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.1] font-medium">{edu.degree}</h3>
              <p className="mt-2 text-fg/75 font-medium">{edu.institution}</p>
              <p className="eyebrow mt-1 text-fg/50">{edu.faculty}</p>
            </div>
            <ul className="space-y-3 text-fg/70 md:col-span-4 text-sm leading-relaxed">
              {edu.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Reveal>
    </div>
  </section>
);
