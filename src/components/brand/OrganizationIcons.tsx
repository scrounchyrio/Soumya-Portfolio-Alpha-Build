"use client";

import React from "react";

export type OrgKey =
  | "dneg"
  | "mpc"
  | "ubu"
  | "waf"
  | "ungc"
  | "hmx"
  | "nalanda"
  | "kolhan"
  | "arena";

interface OrgIconProps extends React.SVGProps<SVGSVGElement> {
  name: OrgKey | string;
  size?: number;
}

/**
 * High-fidelity vector logos for all organizations and universities worked and studied at.
 * Includes DNEG, MPC, Ubon Ratchathani University, World Agriculture Forum,
 * UN Global Compact Network, HMX Media, Nalanda University, Kolhan University, and Arena Animation.
 */
export const OrganizationIcon: React.FC<OrgIconProps> = ({
  name,
  size = 20,
  className = "",
  ...props
}) => {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Double Negative (DNEG) - Iconic faceted diamond D logo
  if (normalized.includes("dneg") || normalized.includes("doublenegative")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="DNEG logo"
        {...props}
      >
        <path
          d="M3 4H13C17.4183 4 21 7.58172 21 12C21 16.4183 17.4183 20 13 20H3V4Z"
          fill="currentColor"
          fillOpacity="0.15"
        />
        <path
          d="M3 4L12 12L3 20V4Z"
          fill="currentColor"
          fillOpacity="0.35"
        />
        <path
          d="M12 12L21 12C21 16.4183 17.4183 20 13 20H3L12 12Z"
          fill="currentColor"
        />
        <path
          d="M3 4H13C17.4183 4 21 7.58172 21 12H12L3 4Z"
          fill="currentColor"
          fillOpacity="0.8"
        />
      </svg>
    );
  }

  // MPC (Moving Picture Company) / Technicolor - Isometric 3D Film Cube
  if (normalized.includes("mpc") || normalized.includes("technicolor")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="MPC Technicolor logo"
        {...props}
      >
        <path
          d="M12 2L21 7.2V16.8L12 22L3 16.8V7.2L12 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <path d="M12 2V12L21 7.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 12L3 7.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 12V22" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
    );
  }

  // Ubon Ratchathani University (UBU) - Lotus & Academic Spire emblem
  if (normalized.includes("ubu") || normalized.includes("ubon")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="Ubon Ratchathani University emblem"
        {...props}
      >
        {/* Outer protective circle */}
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1 1.5" />
        {/* Sacred spire & stupa */}
        <path
          d="M12 3L14 8H10L12 3Z"
          fill="currentColor"
        />
        <path
          d="M9 8H15L16 13H8L9 8Z"
          fill="currentColor"
          fillOpacity="0.4"
        />
        {/* Lotus bloom petals */}
        <path
          d="M12 13C10 15 6 15.5 4 14C5 17 8 19 12 19C16 19 19 17 20 14C18 15.5 14 15 12 13Z"
          fill="currentColor"
        />
        <circle cx="12" cy="11" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  // World Agriculture Forum (WAF) - Global Sustainability & Agri-Leaf
  if (normalized.includes("waf") || normalized.includes("agriculture")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="World Agriculture Forum emblem"
        {...props}
      >
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" />
        {/* Intersecting globe latitudes */}
        <ellipse cx="12" cy="12" rx="4.5" ry="9.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="2.5" y1="12" x2="21.5" y2="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
        {/* Sprouting agricultural grain / leaf */}
        <path
          d="M12 18C12 14 16 11 17 7C14 7 11 10 12 18Z"
          fill="currentColor"
        />
        <path
          d="M12 18C12 15 8 13 7 9C10 9 12 11 12 18Z"
          fill="currentColor"
          fillOpacity="0.75"
        />
      </svg>
    );
  }

  // UN Global Compact Network (UNGC) - United Nations Olive Branches & Globe
  if (normalized.includes("ungc") || normalized.includes("globalcompact") || normalized.includes("un")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="UN Global Compact emblem"
        {...props}
      >
        {/* Central polar projection globe */}
        <circle cx="12" cy="11" r="5.5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
        <ellipse cx="12" cy="11" rx="2.5" ry="5.5" stroke="currentColor" strokeWidth="0.9" />
        <line x1="6.5" y1="11" x2="17.5" y2="11" stroke="currentColor" strokeWidth="0.9" />
        {/* Left olive branch */}
        <path
          d="M4.5 17C4.5 17 3.5 12 6.5 8C6.5 8 5 10 5.5 13C6 16 8 18 10 19"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Right olive branch */}
        <path
          d="M19.5 17C19.5 17 20.5 12 17.5 8C17.5 8 19 10 18.5 13C18 16 16 18 14 19"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path d="M10 19C11.3 19.5 12.7 19.5 14 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  // HMX Media - Camera lens / Tech brand CGI mark
  if (normalized.includes("hmx")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="HMX Media logo"
        {...props}
      >
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        {/* Stylized 'H' aperture */}
        <path d="M7 7V17M17 7V17M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  // Nalanda University - Historical Dharmachakra, Lotus & Stupa Seal
  if (normalized.includes("nalanda")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="Nalanda University seal"
        {...props}
      >
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" />
        {/* Ancient monastic arch */}
        <path d="M7 19V11C7 8.23858 9.23858 6 12 6C14.7614 6 17 8.23858 17 11V19" stroke="currentColor" strokeWidth="1.2" />
        {/* Central Wheel of Wisdom (Dharmachakra) */}
        <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="1" />
        <circle cx="12" cy="11" r="0.8" fill="currentColor" />
        <line x1="12" y1="8" x2="12" y2="14" stroke="currentColor" strokeWidth="0.8" />
        <line x1="9" y1="11" x2="15" y2="11" stroke="currentColor" strokeWidth="0.8" />
        {/* Lotus foundation base */}
        <path d="M5 19H19M7 21H17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }

  // Kolhan University - Academic Torch & Open Book Crest
  if (normalized.includes("kolhan")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="Kolhan University crest"
        {...props}
      >
        {/* Academic shield shield */}
        <path
          d="M12 2L4 5V12C4 16.5 7.5 20.5 12 22C16.5 20.5 20 16.5 20 12V5L12 2Z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="currentColor"
          fillOpacity="0.1"
        />
        {/* Flaming torch */}
        <path d="M12 6L11 9H13L12 6Z" fill="currentColor" />
        <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        {/* Open book */}
        <path
          d="M8 17C9.5 16 11 16 12 16.5C13 16 14.5 16 16 17V14C14.5 13 13 13 12 13.5C11 13 9.5 13 8 14V17Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  // Arena Animation / Aptech - Dynamic 3D Chevron & Media Reel
  if (normalized.includes("arena") || normalized.includes("aptech")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
        aria-label="Arena Animation logo"
        {...props}
      >
        <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" />
        {/* Dynamic Stylized 'A' Chevron */}
        <path
          d="M12 5L5 18H8.5L12 11L15.5 18H19L12 5Z"
          fill="currentColor"
        />
        <path
          d="M9.5 15H14.5L13.5 13H10.5L9.5 15Z"
          fill="currentColor"
          fillOpacity="0.5"
        />
      </svg>
    );
  }

  // Generic fallback institutional badge
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label={`${name} icon`}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
      <path d="M7 17V7L17 17V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
