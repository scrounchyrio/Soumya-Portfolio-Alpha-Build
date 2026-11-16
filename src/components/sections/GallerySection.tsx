"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig, GalleryItem } from "../../../site.config";
import { SectionHeader } from "../ui/SectionHeader";
import { Lightbox, LightboxData } from "../ui/Lightbox";
import { Maximize2, ExternalLink } from "lucide-react";

export const GallerySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<LightboxData | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [folderImages, setFolderImages] = useState<GalleryItem[]>([]);
  const [folderImageError, setFolderImageError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadFolderImages = async () => {
      try {
        const response = await fetch("/api/gallery", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Gallery image request failed with status ${response.status}`);
        }

        const data: { images: GalleryItem[] } = await response.json();
        if (isMounted) setFolderImages(data.images);
      } catch (error) {
        console.error("Failed to load portfolio images:", error);
        if (isMounted) setFolderImageError(true);
      }
    };

    void loadFolderImages();
    return () => {
      isMounted = false;
    };
  }, []);

  const galleryItems = [...siteConfig.gallery, ...folderImages];

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem({
      title: item.title,
      medium: item.medium,
      year: item.year,
      category: item.category.toUpperCase(),
      description: item.description,
      image: item.image,
      externalUrl: item.externalUrl,
      tags: item.tags,
    });
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="py-24 md:py-32 relative border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="04"
          tag="VISUAL EXPERIMENTS & ARTIFACTS"
          title="Creations / Gallery."
          subtitle="A tactile archive of 3D surfacing studies, policy diagrams, and industrial hardware explorations."
          note="INTERACTIVE ARCHIVE // LIGHTBOX INSPECTOR"
        />

        {/* Masonry / Asymmetric Grid with Continuous Hover Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item: GalleryItem, idx: number) => {
            const aspectClass =
              item.aspectRatio === "wide"
                ? "md:col-span-2 aspect-[16/9]"
                : item.aspectRatio === "tall"
                ? "aspect-[3/4]"
                : "aspect-square";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 240, damping: 20, delay: idx * 0.06 }}
                whileHover={{
                  y: -6,
                  scale: 1.015,
                  boxShadow: "0 20px 48px rgba(0,0,0,0.08)",
                }}
                onClick={() => openLightbox(item)}
                className={`group relative rounded-2xl bg-white/85 border border-neutral-200/90 hover:border-black/30 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:bg-white ${aspectClass}`}
                data-cursor="view"
                data-cursor-text="EXPAND"
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-108"
                  />
                )}

                {/* Background Dot Matrix Pattern */}
                <div className="absolute inset-0 bg-dot-matrix opacity-25 group-hover:opacity-40 transition-opacity" />

                {/* Shimmer line on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Corner Crosshairs */}
                <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-black/25 group-hover:scale-125 transition-transform" />
                <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-black/25 group-hover:scale-125 transition-transform" />
                <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-black/25 group-hover:scale-125 transition-transform" />
                <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-black/25 group-hover:scale-125 transition-transform" />

                {/* Top Card HUD */}
                <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-neutral-600 tracking-widest uppercase font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D71921] animate-pulse" />
                    <span>ITEM // {String(idx + 1).padStart(2, "0")}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full border border-neutral-300 bg-white/90 text-neutral-800 shadow-2xs">
                    {item.category}
                  </span>
                </div>

                {/* Center Visual Motif (shown if no full image) */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center p-4">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 450, damping: 10 }}
                    className="w-14 h-14 rounded-full border border-neutral-300 bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-700 group-hover:text-black group-hover:border-[#D71921] transition-colors mb-3 shadow-xs"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </motion.div>
                  <p className="font-mono text-xs text-neutral-900 tracking-widest uppercase font-bold">
                    {item.title}
                  </p>
                  <p className="font-mono text-[10px] text-[#D71921] tracking-wider mt-1 font-semibold">
                    {item.medium}
                  </p>
                </div>

                {/* Bottom Metadata & Expand Cue */}
                <div className="relative z-10 pt-3 border-t border-neutral-200/80 flex items-center justify-between font-mono text-[10px] text-neutral-600 font-medium">
                  <span className="tracking-widest">{item.year}</span>
                  <div className="flex items-center gap-2 text-neutral-800 group-hover:text-black group-hover:text-[#D71921]">
                    <span className="tracking-widest uppercase font-bold">INSPECT</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#D71921] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        {folderImageError && (
          <p role="status" className="mt-4 font-mono text-xs text-[#D71921]">
            Additional images could not be loaded from the portfolio images folder.
          </p>
        )}
      </div>

      {/* Lightbox Viewer */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        data={selectedItem}
      />
    </section>
  );
};
