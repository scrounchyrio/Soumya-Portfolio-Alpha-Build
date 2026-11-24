"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/motion";
import type { ResumeMediaItem } from "../../lib/resume-media";

type Direction = "left" | "right";

interface PortfolioMediaMarqueeProps {
  items?: ResumeMediaItem[];
  speed?: number;
  direction?: Direction;
  syncToScrollDirection?: boolean;
  enableCenterScale?: boolean;
  className?: string;
  ariaLabel?: string;
  pauseOnReducedMotion?: boolean;
}

export const PortfolioMediaMarquee: React.FC<PortfolioMediaMarqueeProps> = ({
  items,
  speed = 1.5,
  direction = "left",
  syncToScrollDirection = true,
  enableCenterScale = true,
  className,
  ariaLabel = "Selected work",
  pauseOnReducedMotion = true,
}) => {
  const [discoveredItems, setDiscoveredItems] = useState<ResumeMediaItem[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [sequenceCount, setSequenceCount] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const velocityRef = useRef(0);
  const boostRef = useRef(0);
  const targetBoostRef = useRef(0);
  const scrollDirectionRef = useRef(1);
  const directionRef = useRef(direction);

  directionRef.current = direction;
  const mediaItems = items ?? discoveredItems;
  const shouldAnimate = !pauseOnReducedMotion || !reducedMotion;

  useEffect(() => {
    if (items !== undefined) return;

    let active = true;
    fetch("/api/resume-media", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Resume media request failed with status ${response.status}`);
        }
        return (await response.json()) as { items: ResumeMediaItem[] };
      })
      .then((data) => {
        if (active) setDiscoveredItems(data.items);
      })
      .catch((error: unknown) => {
        console.error("Failed to fetch resume media:", error);
        if (active) setLoadError(true);
      });

    return () => {
      active = false;
    };
  }, [items]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (!shouldAnimate) {
      track.querySelectorAll("video").forEach((video) => video.pause());
    }
    if (!shouldAnimate || !enableCenterScale) {
      track.querySelectorAll<HTMLElement>("[data-media-tile]").forEach((tile) => {
        tile.style.removeProperty("transform");
      });
    }
  }, [enableCenterScale, mediaItems.length, sequenceCount, shouldAnimate]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sequence = sequenceRef.current;
    if (!wrapper || !sequence || !mediaItems.length) {
      setSequenceCount(0);
      return;
    }

    const updateCopies = () => {
      const sequenceWidth = sequence.getBoundingClientRect().width;
      const viewportWidth = wrapper.getBoundingClientRect().width;
      if (!sequenceWidth || !viewportWidth) return;
      setSequenceCount(Math.max(2, Math.ceil((viewportWidth * 3.5) / sequenceWidth)));
    };

    updateCopies();
    const observer = new ResizeObserver(updateCopies);
    observer.observe(wrapper);
    observer.observe(sequence);
    return () => observer.disconnect();
  }, [mediaItems.length]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const sequence = sequenceRef.current;
    if (!shouldAnimate || !wrapper || !track || !sequence || sequenceCount < 2) return;

    const sequenceWidth = sequence.getBoundingClientRect().width;
    if (!sequenceWidth) return;

    const baseSign = directionRef.current === "left" ? -1 : 1;
    if (positionRef.current === 0 && baseSign > 0) {
      positionRef.current = -sequenceWidth;
    } else {
      positionRef.current = -(((-positionRef.current % sequenceWidth) + sequenceWidth) % sequenceWidth);
    }
    if (velocityRef.current === 0) velocityRef.current = baseSign * speed;

    const handleScroll = () => {
      if (!syncToScrollDirection) return;
      const now = performance.now();
      const delta = window.scrollY - previousScrollY;
      const elapsed = Math.max(1, now - previousScrollTime);
      previousScrollY = window.scrollY;
      previousScrollTime = now;
      if (Math.abs(delta) < 1) return;

      scrollDirectionRef.current = delta > 0 ? 1 : -1;
      targetBoostRef.current = Math.min(speed * 2.5, (Math.abs(delta) / elapsed) * 0.35);
    };

    let previousScrollY = window.scrollY;
    let previousScrollTime = performance.now();

    const tick = (_time: number, deltaMs: number) => {
      const frameScale = Math.min(deltaMs, 50) / (1000 / 60);
      const smoothing = 1 - Math.exp(-Math.min(deltaMs, 50) / 160);
      const boostDecay = 1 - Math.exp(-Math.min(deltaMs, 50) / 500);
      boostRef.current += (targetBoostRef.current - boostRef.current) * boostDecay;
      targetBoostRef.current *= 1 - boostDecay;

      const scrollSign = syncToScrollDirection ? scrollDirectionRef.current : 1;
      const targetVelocity =
        (directionRef.current === "left" ? -1 : 1) *
        scrollSign *
        (speed + boostRef.current);
      velocityRef.current += (targetVelocity - velocityRef.current) * smoothing;
      positionRef.current += velocityRef.current * frameScale;

      if (positionRef.current <= -sequenceWidth) {
        positionRef.current += sequenceWidth * Math.floor(-positionRef.current / sequenceWidth);
      }
      if (positionRef.current >= 0) {
        positionRef.current -= sequenceWidth * (Math.floor(positionRef.current / sequenceWidth) + 1);
      }
      gsap.set(track, { x: positionRef.current, force3D: true });

      if (!enableCenterScale) return;
      const center = wrapper.getBoundingClientRect().left + wrapper.clientWidth / 2;
      const radius = wrapper.clientWidth / 2;
      const tiles = track.querySelectorAll<HTMLElement>("[data-media-tile]");
      const scales = Array.from(tiles, (tile) => {
        const tileCenter = tile.getBoundingClientRect().left + tile.offsetWidth / 2;
        const proximity = Math.max(0, 1 - Math.abs(tileCenter - center) / radius);
        return { tile, scale: 1 - 0.05 * proximity };
      });
      scales.forEach(({ tile, scale }) => {
        tile.style.transform = `scale(${scale})`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      gsap.ticker.remove(tick);
    };
  }, [
    enableCenterScale,
    mediaItems.length,
    sequenceCount,
    shouldAnimate,
    speed,
    syncToScrollDirection,
  ]);

  if (!mediaItems.length) {
    if (!loadError) return null;
    return (
      <section className={className} aria-label={ariaLabel}>
        <p role="status">Portfolio media could not be loaded.</p>
      </section>
    );
  }

  const renderSequence = (decorative: boolean) => (
    <div
      className={`portfolio-media-marquee__sequence${decorative ? " portfolio-media-marquee__clone" : ""}`}
      aria-hidden={decorative || undefined}
      ref={decorative ? undefined : sequenceRef}
    >
      {mediaItems.map((item) => {
        const alt = item.alt ?? item.caption ?? "";
        const media = item.type === "video" ? (
          <video
            src={item.src}
            poster={item.poster}
            muted
            autoPlay={shouldAnimate}
            loop
            playsInline
            controls={false}
            preload={decorative ? "metadata" : "auto"}
            aria-hidden={decorative || !alt || undefined}
            aria-label={!decorative && alt ? alt : undefined}
            role={!decorative && alt ? "img" : undefined}
            className="portfolio-media-marquee__asset"
          />
        ) : (
          <Image
            src={item.src}
            alt={decorative ? "" : alt}
            fill
            sizes="(max-width: 700px) 256px, (max-width: 900px) 44vw, 444px"
            unoptimized
            className="portfolio-media-marquee__asset"
          />
        );

        return (
          <figure
            key={item.id}
            data-media-tile
            className="portfolio-media-marquee__tile"
            aria-hidden={decorative || undefined}
          >
            {item.href ? (
              <a
                href={item.href}
                tabIndex={decorative ? -1 : undefined}
                aria-label={!decorative ? alt || item.caption || undefined : undefined}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {media}
              </a>
            ) : (
              media
            )}
            {item.caption && <figcaption className="sr-only">{item.caption}</figcaption>}
          </figure>
        );
      })}
    </div>
  );

  return (
    <section className={className} aria-label={ariaLabel}>
      <div ref={wrapperRef} className="portfolio-media-marquee">
        <div ref={trackRef} className="portfolio-media-marquee__track">
          {renderSequence(false)}
          {Array.from({ length: Math.max(0, sequenceCount - 1) }, (_, index) => (
            <React.Fragment key={`clone-${index}`}>
              {renderSequence(true)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
