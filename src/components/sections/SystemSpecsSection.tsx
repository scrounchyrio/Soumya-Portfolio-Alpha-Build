import React from "react";
import { siteConfig } from "../../../site.config";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export const SystemSpecsSection: React.FC = () => (
  <section
    id="specs"
    data-theme="spring"
    className="relative px-5 py-24 md:px-10 md:py-36 border-b border-fg/10 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(251,132,208,0.12),transparent_70%)]"
  >
    <div className="mx-auto max-w-7xl">
      <SectionHeader
        label="System specifications"
        title={siteConfig.skills.heading}
        italic={["dimensions."]}
        subtitle="Production-tested 3D technical art, empirical sustainability research, and the coordination that ties them together."
      />

      <div className="grid gap-x-14 gap-y-14 md:grid-cols-2">
        {siteConfig.skills.categories.map((cat) => (
          <Reveal key={cat.code} className="glass-card rounded-[24px] border border-fg/10 bg-canvas-card p-7 shadow-sm hover:border-accent/40 transition-colors">
            <div className="mb-6 flex items-baseline justify-between border-b border-fg/10 pb-4">
              <h3 className="display text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.08] font-medium">{cat.title}</h3>
              <span className="h-2 w-2 rounded-full bg-accent shadow-sm" />
            </div>
            <ul className="divide-y divide-fg/10">
              {cat.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="group flex items-baseline justify-between gap-6 py-3.5 transition-colors hover:text-accent"
                >
                  <span className="transition-transform duration-500 ease-expo group-hover:translate-x-2 font-medium">{skill.name}</span>
                  <span className="eyebrow shrink-0 text-right text-[10px] text-accent/80 font-mono">{skill.level}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
