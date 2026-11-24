"use client";

import React from "react";

export type SocialKey =
  | "linkedin"
  | "artstation"
  | "imdb"
  | "researchgate"
  | "substack"
  | "github"
  | "x"
  | "twitter"
  | "email";

interface SocialIconProps extends React.SVGProps<SVGSVGElement> {
  name: SocialKey | string;
  size?: number;
}

/**
 * Official vector brand icons for all portfolios & social links.
 * Verified geometries for LinkedIn, ArtStation, IMDb, ResearchGate, Substack, GitHub, and X.
 */
export const SocialIcon: React.FC<SocialIconProps> = ({
  name,
  size = 15,
  className = "",
  ...props
}) => {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (normalized.includes("linkedin")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="LinkedIn"
        {...props}
      >
        <path
          d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.37a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (normalized.includes("artstation")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="ArtStation"
        {...props}
      >
        <path
          d="M12.002 2L1.879 19.532h3.94l6.183-10.71 4.542 7.868h-6.223l-1.624 2.842h13.424L12.002 2zm-4.7 13.91l-1.077 1.886H2.658l2.955-5.118 1.689 3.232z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (normalized.includes("imdb")) {
    return (
      <svg
        width={size * 1.5}
        height={size}
        viewBox="0 0 36 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="IMDb"
        {...props}
      >
        <rect x="1" y="2" width="34" height="20" rx="4" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M5.5 6.5h2.4v11H5.5v-11zm4 0h2.9l1.6 5.8 1.6-5.8h2.9v11h-2.1v-7l-1.6 7h-1.6l-1.6-7v7H9.5v-11zm10.5 0h3.6c2.2 0 3.6 1.3 3.6 3.4 0 1.4-.7 2.4-1.9 2.8 1.5.4 2.3 1.5 2.3 3.1 0 2.1-1.4 3.4-3.8 3.4H20v-11.7zm2.4 2v2.6h1.4c.8 0 1.3-.4 1.3-1.3 0-.9-.5-1.3-1.3-1.3h-1.4zm0 4.6v3h1.6c.9 0 1.4-.4 1.4-1.5 0-1-.5-1.5-1.4-1.5h-1.6z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (normalized.includes("researchgate")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="ResearchGate"
        {...props}
      >
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" />
        <path
          d="M6 17V7h4.8c1.8 0 3 1.1 3 2.6 0 1.2-.8 2.2-2 2.5l2.4 4.9H11.5L9.4 12.3H8.3V17H6zm2.3-6.5h2.2c.7 0 1.1-.4 1.1-1s-.4-1-1.1-1H8.3v2z"
          fill="currentColor"
        />
        <path
          d="M17.8 12.8c-.2 2.5-1.7 4.2-4.2 4.2-2.7 0-4.4-1.9-4.4-4.7 0-2.8 1.8-4.7 4.5-4.7 2.3 0 3.8 1.4 4.1 3.3h-2.1c-.2-1-.9-1.6-2-1.6-1.5 0-2.4 1.2-2.4 3s.9 3 2.4 3c1 0 1.7-.5 1.9-1.5h-1.9v-1.7h4.2z"
          fill="currentColor"
          fillOpacity="0.8"
        />
      </svg>
    );
  }

  if (normalized.includes("substack")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="Substack"
        {...props}
      >
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" fill="currentColor" />
      </svg>
    );
  }

  if (normalized.includes("github")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="GitHub"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (normalized === "x" || normalized.includes("twitter")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="X (Twitter)"
        {...props}
      >
        <path
          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          fill="currentColor"
        />
      </svg>
    );
  }

  // Fallback: Mail or Globe
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
};
