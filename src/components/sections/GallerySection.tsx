"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { siteConfig, GalleryItem } from "../../../site.config";
import { Lightbox, LightboxData } from "../ui/Lightbox";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

const SPAN: Record<GalleryItem["aspectRatio"], string> = {
  wide: "md:col-span-2 aspect-[16/9]",
  tall: "aspect-[3/4]",
  square: "aspect-square",
};

export const GallerySection: React.FC = () => {
  const [selected, setSelected] = useState<LightboxData | null>(null);
  const [open, setOpen] = useState(false);
  const [folderImages, setFolderImages] = useState<GalleryItem[]>([]);
  const [folderImageError, setFolderImageError] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const response = await fetch("/api/gallery", { cache: "no-store" });
        if (!response.ok) throw new Error(`Gallery request failed with status ${response.status}`);
        const data: { images: GalleryItem[] } = await response.json();
        if (mounted) setFolderImages(data.images);
      } catch (error) {
        console.error("Failed to load portfolio images:", error);
        if (mounted) setFolderImageError(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const items = [...siteConfig.gallery, ...folderImages];

  const openItem = (item: GalleryItem) => {
    setSelected({
      title: item.title,
      medium: item.medium,
      year: item.year,
      category: item.category.toUpperCase(),
      description: item.description,
      image: item.image,
      externalUrl: item.externalUrl,
      tags: item.tags,
    });
    setOpen(true);
  };

  return (
    <section
      id="gallery"
      data-theme="emerald"
      className="relative px-5 py-24 md:px-10 md:py-36 border-b border-fg/10 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(214,51,126,0.12),transparent_70%)]"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Gallery"
          title="Studies, maps, and experiments."
          italic={["experiments."]}
          subtitle="3D LookDev studies, cartographic policy mappings, and tactile hardware experiments."
        />

        <Reveal stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openItem(item)}
              data-cursor="view"
              data-cursor-text="VIEW"
              className={`glass-card group relative overflow-hidden rounded-[26px] border border-fg/10 bg-canvas-card text-left transition-all duration-500 hover:border-accent hover:shadow-[0_20px_50px_rgba(214,51,126,0.15)] ${SPAN[item.aspectRatio]}`}
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-transparent" aria-hidden="true" />
              <div className="absolute inset-0 flex flex-col justify-between p-7">
                <div className="flex items-center justify-between">
                  <span className="eyebrow glass-pill rounded-full border border-accent/30 bg-canvas/80 px-3 py-1 backdrop-blur-md shadow-sm text-accent">
                    {item.category}
                  </span>
                  <span className="eyebrow font-mono text-[11px] text-fg/60">{item.year}</span>
                </div>
                <div>
                  <p className="eyebrow mb-2 text-accent">{item.medium}</p>
                  <h3 className="display text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.08] font-medium transition-colors group-hover:text-accent">
                    {item.title}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </Reveal>

        {folderImageError && (
          <p role="status" className="mt-6 font-mono text-xs text-accent">
            Additional images could not be loaded from the portfolio images folder.
          </p>
        )}
      </div>

      <Lightbox isOpen={open} onClose={() => setOpen(false)} data={selected} />
    </section>
  );
};
