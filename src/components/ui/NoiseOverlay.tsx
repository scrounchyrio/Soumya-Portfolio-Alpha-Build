"use client";

import React from "react";

export const NoiseOverlay: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9990] opacity-[0.035] bg-noise"
      aria-hidden="true"
    />
  );
};
