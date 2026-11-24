"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/motion";

type Scene = {
  id: string;
  range: [number, number];
  background: string;
  foreground: string;
  uiForeground: string;
  title: string;
  description: string;
  desktopImage?: string;
  mobileImage?: string;
  cardImage?: string;
  catalogImages?: string[];
  kind: "opening" | "wipe" | "editorial" | "product" | "campaign";
};

const SCENES: Scene[] = [
  {
    id: "opening",
    range: [0, 0.23],
    background: "#08070d",
    foreground: "#fff8fc",
    uiForeground: "#fff8fc",
    title: "An independent visual practice",
    description: "Selected work in image, form and feeling.",
    kind: "opening",
  },
  {
    id: "wipe",
    range: [0.14, 0.42],
    background: "#3643C1",
    foreground: "#fff8fc",
    uiForeground: "#fff8fc",
    title: "Shape becomes signal",
    description: "A study in color, scale and movement.",
    kind: "wipe",
  },
  {
    id: "editorial",
    range: [0.34, 0.65],
    background: "#F1499E",
    foreground: "#251027",
    uiForeground: "#251027",
    title: "Color, held in a frame",
    description: "An editorial still life, opening into a whole world.",
    desktopImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2200&q=85",
    mobileImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",
    kind: "editorial",
  },
  {
    id: "product",
    range: [0.56, 0.83],
    background: "#8B3CC0",
    foreground: "#fff8fc",
    uiForeground: "#171316",
    title: "A closer look",
    description: "Objects and images, composed with intention.",
    desktopImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2200&q=85",
    mobileImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",
    cardImage:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1100&q=85",
    kind: "product",
  },
  {
    id: "campaign",
    range: [0.75, 1],
    background: "#FE8780",
    foreground: "#171316",
    uiForeground: "#171316",
    title: "The image, distilled",
    description: "A quiet end to the opening. The rest is yours to explore.",
    desktopImage:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=2200&q=85",
    mobileImage:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=85",
    catalogImages: [
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
    ],
    kind: "campaign",
  },
];

// TODO: Replace these Unsplash placeholders with original, responsive project assets.
const preloadedAssets = new Set<string>();
const preloadScene = (scene: Scene | undefined) => {
  if (!scene) return;
  const isMobile = window.matchMedia("(max-width: 700px)").matches;
  const sceneImages = [
    isMobile ? scene.mobileImage ?? scene.desktopImage : scene.desktopImage ?? scene.mobileImage,
    scene.cardImage,
    ...(scene.catalogImages ?? []),
  ];
  sceneImages.forEach((src) => {
    if (!src || preloadedAssets.has(src)) return;
    preloadedAssets.add(src);
    const image = new Image();
    image.src = src;
  });
};

export function SceneLayer({ scene }: { scene: Scene }) {
  return (
    <div
      className={`entrance-scene entrance-scene--${scene.kind}`}
      data-scene={scene.id}
      style={
        {
          "--scene-bg": scene.background,
          "--scene-fg": scene.foreground,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <div className="entrance-scene__wash" />
      {scene.kind === "opening" && (
        <div className="entrance-mark entrance-mark--opening">
          <span />
          <span />
          <span />
        </div>
      )}
      {scene.kind === "wipe" && (
        <div className="entrance-mark entrance-mark--wipe">
          <span />
          <span />
          <span />
        </div>
      )}
      {(scene.kind === "editorial" || scene.kind === "product" || scene.kind === "campaign") &&
        scene.desktopImage && (
          <picture className="entrance-scene__picture">
            {scene.mobileImage && (
              <source media="(max-width: 700px)" srcSet={scene.mobileImage} />
            )}
            <img
              className="entrance-scene__image"
              src={scene.desktopImage}
              alt=""
              fetchPriority={scene.kind === "editorial" ? "high" : "auto"}
              loading={scene.kind === "editorial" ? "eager" : "lazy"}
              decoding="async"
            />
          </picture>
        )}
      {scene.kind === "product" && scene.cardImage && (
        <div className="entrance-product-card">
          <img src={scene.cardImage} alt="" loading="lazy" decoding="async" />
          <div className="entrance-product-card__caption">
            <span>STUDY 04 — FORM & LIGHT</span>
            <span>2025</span>
          </div>
        </div>
      )}
      {scene.kind === "campaign" && (
        <div className="entrance-catalog" aria-hidden="true">
          {scene.catalogImages?.map((src, index) => (
            <div className={`entrance-catalog__card entrance-catalog__card--${index + 1}`} key={src}>
              <img src={src} alt="" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      )}
      <div className="entrance-scene__copy">
        <span className="entrance-eyebrow">{scene.id} / 05</span>
        <h2>{scene.title}</h2>
        <p>{scene.description}</p>
      </div>
    </div>
  );
}

export function PersistentChrome({ chromeRef }: { chromeRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={chromeRef} className="entrance-chrome">
      <nav className="entrance-nav" aria-label="Portfolio">
        <a href="#projects">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="entrance-skip" href="#work-grid">
        Skip intro <span aria-hidden="true">↗</span>
      </a>
      <div className="entrance-status" aria-label="Introduction, five scenes">
        <span>VISUAL INDEX</span>
        <span className="entrance-status__rule" />
        <span>SCROLL TO EXPLORE · 01—05</span>
      </div>
    </div>
  );
}

export function EntranceExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const chrome = chromeRef.current;
    if (!root || !stage || !chrome) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.body.classList.remove("intro-active");
      return;
    }

    const context = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const layers = gsap.utils.toArray<HTMLElement>(".entrance-scene");
      const toggleChrome = (active: boolean) => {
        document.body.classList.toggle("intro-active", active);
      };

      gsap.set(layers, { autoAlpha: 0 });
      gsap.set(layers[0], { autoAlpha: 1 });
      preloadScene(SCENES[0]);
      preloadScene(SCENES[1]);

      if (reducedMotion) {
        ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          onToggle: (self) => toggleChrome(self.isActive),
        });
        SCENES.forEach((scene, index) => {
          ScrollTrigger.create({
            trigger: root,
            start: () => root.offsetTop + root.offsetHeight * scene.range[0],
            end: () => root.offsetTop + root.offsetHeight * scene.range[1],
            onEnter: () => {
              preloadScene(SCENES[index + 1]);
              gsap.to(layers[index], { autoAlpha: 1, duration: 0.2, overwrite: true });
              gsap.to(chrome, { color: scene.uiForeground, duration: 0.2, overwrite: true });
            },
            onEnterBack: () => {
              preloadScene(scene);
              gsap.to(layers[index], { autoAlpha: 1, duration: 0.2, overwrite: true });
              gsap.to(chrome, { color: scene.uiForeground, duration: 0.2, overwrite: true });
            },
            onLeave: () => gsap.to(layers[index], { autoAlpha: 0, duration: 0.2, overwrite: true }),
            onLeaveBack: () => gsap.to(layers[index], { autoAlpha: 0, duration: 0.2, overwrite: true }),
          });
        });
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          pin: stage,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onToggle: (self) => toggleChrome(self.isActive),
          onUpdate: (self) => {
            const currentIndex = SCENES.findIndex((scene) => self.progress <= scene.range[1]);
            preloadScene(SCENES[currentIndex]);
            preloadScene(SCENES[currentIndex + 1]);
          },
        },
      });

      SCENES.forEach((scene, index) => {
        const layer = layers[index];
        const [start, end] = scene.range;
        const fadeLength = 0.075;
        if (index > 0) timeline.to(layer, { autoAlpha: 1, duration: fadeLength }, start);
        if (index < SCENES.length - 1) {
          timeline.to(layer, { autoAlpha: 0, duration: fadeLength }, end - fadeLength);
        }
        const copy = layer.querySelector(".entrance-scene__copy");
        if (copy && index > 0) {
          timeline.fromTo(
            copy,
            { y: 22, filter: "blur(6px)" },
            { y: 0, filter: "blur(0px)", duration: 0.08 },
            start + 0.025,
          );
        }
      });

      timeline.to(".entrance-mark--opening", { scale: 1.15, rotate: 18, duration: 0.08 }, 0.06);
      timeline.to(
        ".entrance-mark--wipe",
        { scale: 14, rotate: -22, borderRadius: "0%", duration: 0.25, ease: "power2.in" },
        0.17,
      );
      timeline.fromTo(
        ".entrance-scene--editorial .entrance-scene__picture",
        { scale: 0.13, borderRadius: "36px", clipPath: "inset(5% 8% round 36px)" },
        { scale: 1, borderRadius: "0px", clipPath: "inset(0% 0% round 0px)", duration: 0.3 },
        0.34,
      );
      timeline.fromTo(
        ".entrance-scene--product .entrance-scene__image",
        { scale: 1 },
        { scale: 1.2, duration: 0.27 },
        0.56,
      );
      timeline.fromTo(
        ".entrance-product-card",
        { autoAlpha: 0, y: 50, scale: 0.82, rotate: 4, filter: "blur(12px)" },
        { autoAlpha: 1, y: 0, scale: 1, rotate: -3, filter: "blur(0px)", duration: 0.1 },
        0.6,
      );
      timeline.to(".entrance-product-card", { y: -16, duration: 0.18 }, 0.72);
      timeline.fromTo(
        ".entrance-catalog__card",
        { autoAlpha: 0, y: 34, scale: 0.94 },
        { autoAlpha: 1, y: 0, scale: 1, stagger: 0.035, duration: 0.1 },
        0.79,
      );
      timeline.to(chrome, { color: SCENES[1].uiForeground, duration: 0.01 }, 0.14);
      timeline.to(chrome, { color: SCENES[2].uiForeground, duration: 0.01 }, 0.34);
      timeline.to(chrome, { color: SCENES[3].uiForeground, duration: 0.01 }, 0.56);
      timeline.to(chrome, { color: SCENES[4].uiForeground, duration: 0.01 }, 0.75);
    }, root);

    return () => {
      document.body.classList.remove("intro-active");
      context.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section ref={rootRef} className="entrance-experience" aria-label="Portfolio introduction">
      <div ref={stageRef} className="entrance-stage">
        <div className="entrance-layers">
          {SCENES.map((scene) => (
            <SceneLayer key={scene.id} scene={scene} />
          ))}
        </div>
        <PersistentChrome chromeRef={chromeRef} />
      </div>
    </section>
  );
}

export function WorkGrid({ children }: { children: React.ReactNode }) {
  return (
    <div id="work-grid" className="portfolio-content">
      {children}
    </div>
  );
}
