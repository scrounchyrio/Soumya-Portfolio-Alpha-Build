import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Lets a verification build run beside a live server without clobbering .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    domains: ["images.unsplash.com", "media.licdn.com", "scrounchyrio.artstation.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
