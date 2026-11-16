"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig, GalleryItem } from "../../../site.config";
import { SectionHeader } from "../ui/SectionHeader";
import { Lightbox, LightboxData } from "../ui/Lightbox";
import { Maximize2, ExternalLink, Sparkles } from "lucide-react";

export const GallerySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<LightboxData | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem({
      title: item.title,
      medium: item.medium,
      year: item.year,
      category: item.category.toUpperCase(),
      description: item.description,
      externalUrl: item.externalUrl,
      tags: item.tags,
    });
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="py-24 md:py-32 relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="04"
          tag="VISUAL EXPERIMENTS & ARTIFACTS"
          title="Creations / Gallery."
          subtitle="A tactile archive of 3D surfacing studies, policy diagrams, and industrial hardware explorations."
          note="INTERACTIVE ARCHIVE // LIGHTBOX INSPECTOR"
        />

        {/* Masonry / Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.gallery.map((item: GalleryItem, idx: number) => {
            const aspectClass =
              item.aspectRatio === "wide"
                ? "md:col-span-2 aspect-[16/9]"
                : item.aspectRatio === "tall"
                ? "aspect-[3/4]"
                : "aspect-square";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                onClick={() => openLightbox(item)}
                className={`group relative rounded-2xl bg-[#090909] border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between p-6 ${aspectClass}`}
                data-cursor="view"
                data-cursor-text="EXPAND"
              >
                {/* Background Dot Matrix Pattern */}
                <div className="absolute inset-0 bg-dot-matrix opacity-25 group-hover:opacity-40 transition-opacity" />

                {/* Corner Crosshairs */}
                <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-white/30" />
                <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-white/30" />
                <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-white/30" />
                <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-white/30" />

                {/* Top Card HUD */}
                <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-white/50 tracking-widest uppercase">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D71921]" />
                    <span>ITEM // {String(idx + 1).padStart(2, "0")}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-white/70">
                    {item.category}
                  </span>
                </div>

                {/* Center Visual Motif */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center p-4">
                  <div className="w-14 h-14 rounded-full border border-white/15 flex items-center justify-center text-white/60 group-hover:text-white group-hover:border-[#D71921] transition-colors mb-3">
                    <Maximize2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="font-mono text-xs text-white/80 tracking-widest uppercase font-medium">
                    {item.title}
                  </p>
                  <p className="font-mono text-[10px] text-[#D71921] tracking-wider mt-1">
                    {item.medium}
                  </p>
                </div>

                {/* Bottom Metadata & Expand Cue */}
                <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/40">
                  <span className="tracking-widest">{item.year}</span>
                  <div className="flex items-center gap-2 text-white/80 group-hover:text-white">
                    <span className="tracking-widest uppercase">INSPECT</span>
                    <ExternalLink className="w-3 h-3 text-[#D71921]" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
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
