"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig, SocialLink } from "../../../site.config";
import { SocialIcon } from "../brand/SocialIcons";

interface SocialPillsProps {
  className?: string;
  includeEmail?: boolean;
}

/**
 * Single-line horizontal pill strip for portfolio & social links.
 * Each link features the authentic brand vector icon followed by the website name and an external arrow.
 * Enforces strict single-line continuity with responsive horizontal smooth scroll on mobile to prevent wrapping.
 */
export const SocialPills: React.FC<SocialPillsProps> = ({
  className = "",
  includeEmail = false,
}) => {
  const links = siteConfig.socials.filter(
    (s: SocialLink) => includeEmail || s.platform !== "Email"
  );

  return (
    <div
      role="navigation"
      aria-label="Portfolios and social links"
      className={`relative w-full max-w-full overflow-hidden ${className}`}
    >
      <div
        className="flex w-full items-center gap-2 overflow-x-auto no-scrollbar py-1 flex-nowrap [scrollbar-width:none] [-ms-overflow-style:none]"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {links.map((s) => (
          <a
            key={s.platform}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/pill inline-flex shrink-0 items-center gap-2 rounded-full border border-fg/15 bg-canvas-raised/80 px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-fg shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-0"
            aria-label={`${s.label} (opens in new tab)`}
          >
            <span className="text-fg/80 transition-colors group-hover/pill:text-accent">
              <SocialIcon name={s.platform} size={14} />
            </span>
            <span>{s.label}</span>
            <ArrowUpRight
              className="h-3 w-3 shrink-0 text-fg/40 transition-transform duration-300 group-hover/pill:-translate-y-0.5 group-hover/pill:translate-x-0.5 group-hover/pill:text-accent"
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </div>
  );
};
