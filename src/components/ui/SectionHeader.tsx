import React from "react";
import { SplitReveal } from "./SplitReveal";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  number?: string;
  label: string;
  title: string;
  subtitle?: string;
  italic?: string[];
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ number, label, title, subtitle, italic }) => (
  <div className="mb-14 md:mb-20">
    <Reveal className="mb-6 flex items-center gap-3">
      {number && (
        <>
          <span className="eyebrow text-accent">{number}</span>
          <span className="h-px w-6 bg-fg/20" />
        </>
      )}
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      <span className="eyebrow">{label}</span>
    </Reveal>
    <SplitReveal
      text={title}
      italic={italic}
      className="display max-w-5xl text-[clamp(2.5rem,7vw,6.5rem)]"
    />
    {subtitle && (
      <Reveal delay={0.2} className="mt-6 max-w-2xl text-lg leading-relaxed text-fg/60">
        <p>{subtitle}</p>
      </Reveal>
    )}
  </div>
);
