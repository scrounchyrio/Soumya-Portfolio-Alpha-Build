"use client";

import React, { useState } from "react";

interface MonogramLogoProps {
  size?: "sm" | "md" | "lg" | "hero";
  className?: string;
  showHousing?: boolean;
  interactive?: boolean;
}

export const MonogramLogo: React.FC<MonogramLogoProps> = ({
  size = "md",
  className = "",
  showHousing = true,
  interactive = true,
}) => {
  const [hovered, setHovered] = useState(false);

  // Scaled dimensions
  const dimensions = {
    sm: { width: 90, height: 36, scale: 0.6 },
    md: { width: 120, height: 48, scale: 0.8 },
    lg: { width: 160, height: 64, scale: 1 },
    hero: { width: 240, height: 96, scale: 1.5 },
  }[size];

  return (
    <div
      className={`inline-flex items-center select-none ${className}`}
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
      role="img"
      aria-label="SM Monogram Logo — Nothing Design Language"
    >
      <svg
        viewBox="0 0 160 64"
        width={dimensions.width}
        height={dimensions.height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300"
      >
        {/* Transparent Nothing Hardware Housing */}
        {showHousing && (
          <>
            <rect
              x="1"
              y="1"
              width="158"
              height="62"
              rx="12"
              fill={hovered ? "#111111" : "#0A0A0A"}
              stroke={hovered ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.12)"}
              strokeWidth="1"
              className="transition-colors duration-300"
            />
            {/* Corner Alignment Crosshairs */}
            <path d="M6 3v6M3 6h6" stroke="rgba(255,255,255,0.25)" strokeWidth="0.75" />
            <path d="M154 3v6M151 6h6" stroke="rgba(255,255,255,0.25)" strokeWidth="0.75" />
            <path d="M6 55v6M3 58h6" stroke="rgba(255,255,255,0.25)" strokeWidth="0.75" />
            <path d="M154 55v6M151 58h6" stroke="rgba(255,255,255,0.25)" strokeWidth="0.75" />

            {/* Hardware Micro-Label */}
            <text
              x="16"
              y="11"
              fontFamily="monospace"
              fontSize="4.5"
              fill={hovered ? "#999999" : "#555555"}
              letterSpacing="0.8"
            >
              SM-01//IND
            </text>
            <text
              x="110"
              y="11"
              fontFamily="monospace"
              fontSize="4.5"
              fill={hovered ? "#999999" : "#555555"}
              letterSpacing="0.8"
            >
              22°34&apos;N
            </text>
          </>
        )}

        {/* Dormant / Inactive Ghost LED Matrix */}
        <g fill="rgba(255, 255, 255, 0.04)" className="transition-opacity duration-300">
          {[18, 24, 30, 36, 42, 48, 54].map((y, rowIdx) =>
            [20, 28, 36, 44, 52, 60, 68, 76, 84, 92, 100, 108, 116, 124, 132].map((x, colIdx) => (
              <circle key={`ghost-${rowIdx}-${colIdx}`} cx={x} cy={y} r="1.6" />
            ))
          )}
        </g>

        {/* Active Glyph 'S' (White LED Matrix) */}
        <g
          fill="#FFFFFF"
          className="transition-all duration-300"
          style={{ filter: hovered ? "drop-shadow(0 0 3px rgba(255,255,255,0.6))" : "none" }}
        >
          {/* Row 0: cols 1,2,3,4 */}
          <circle cx="28" cy="18" r="2.3" />
          <circle cx="36" cy="18" r="2.3" />
          <circle cx="44" cy="18" r="2.3" />
          <circle cx="52" cy="18" r="2.3" />
          {/* Row 1: cols 0, 4 */}
          <circle cx="20" cy="24" r="2.3" />
          <circle cx="52" cy="24" r="2.3" />
          {/* Row 2: col 0 */}
          <circle cx="20" cy="30" r="2.3" />
          {/* Row 3: cols 1, 2, 3 */}
          <circle cx="28" cy="36" r="2.3" />
          <circle cx="36" cy="36" r="2.3" />
          <circle cx="44" cy="36" r="2.3" />
          {/* Row 4: col 4 */}
          <circle cx="52" cy="42" r="2.3" />
          {/* Row 5: cols 0, 4 */}
          <circle cx="20" cy="48" r="2.3" />
          <circle cx="52" cy="48" r="2.3" />
          {/* Row 6: cols 0, 1, 2, 3 */}
          <circle cx="20" cy="54" r="2.3" />
          <circle cx="28" cy="54" r="2.3" />
          <circle cx="36" cy="54" r="2.3" />
          <circle cx="44" cy="54" r="2.3" />

          {/* Active Glyph 'M' (White LED Matrix) */}
          {/* Row 0 */}
          <circle cx="68" cy="18" r="2.3" />
          <circle cx="108" cy="18" r="2.3" />
          {/* Row 1 */}
          <circle cx="68" cy="24" r="2.3" />
          <circle cx="76" cy="24" r="2.3" />
          <circle cx="100" cy="24" r="2.3" />
          <circle cx="108" cy="24" r="2.3" />
          {/* Row 2 */}
          <circle cx="68" cy="30" r="2.3" />
          <circle cx="84" cy="30" r="2.3" />
          <circle cx="92" cy="30" r="2.3" />
          <circle cx="108" cy="30" r="2.3" />
          {/* Row 3 */}
          <circle cx="68" cy="36" r="2.3" />
          <circle cx="88" cy="36" r="2.3" />
          <circle cx="108" cy="36" r="2.3" />
          {/* Row 4 */}
          <circle cx="68" cy="42" r="2.3" />
          <circle cx="108" cy="42" r="2.3" />
          {/* Row 5 */}
          <circle cx="68" cy="48" r="2.3" />
          <circle cx="108" cy="48" r="2.3" />
          {/* Row 6 */}
          <circle cx="68" cy="54" r="2.3" />
          <circle cx="108" cy="54" r="2.3" />
        </g>

        {/* Signature Nothing Crimson Red Status Dot */}
        <circle
          cx="124"
          cy="54"
          r="3.2"
          fill="#D71921"
          className="transition-transform duration-300 origin-center"
        />
        <circle
          cx="124"
          cy="54"
          r={hovered ? "5.4" : "4.4"}
          stroke="#D71921"
          strokeWidth="0.8"
          opacity={hovered ? 0.7 : 0.35}
          className="transition-all duration-300 animate-pulse"
        />
      </svg>
    </div>
  );
};
