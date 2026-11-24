import React from "react";

/** CSS-only infinite strip. Duplicated once for a seamless loop. */
export const Marquee: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="overflow-hidden border-y border-fg/10 py-5" aria-hidden="true">
    <div className="flex w-max animate-marquee whitespace-nowrap">
      {[...items, ...items].map((item, i) => (
        <span key={i} className="flex items-center font-serif text-3xl italic text-fg/70 md:text-5xl">
          <span className="px-6 md:px-10">{item}</span>
          <span className="text-accent">✳</span>
        </span>
      ))}
    </div>
  </div>
);
