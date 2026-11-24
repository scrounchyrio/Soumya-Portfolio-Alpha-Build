"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

let lenisInstance: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenisInstance = instance;
};

export const getLenis = () => lenisInstance;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Lock / unlock page scroll (loader, menu, modals). Works with or without Lenis. */
export const lockScroll = (locked: boolean) => {
  if (locked) {
    lenisInstance?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = "";
    lenisInstance?.start();
  }
};

export const scrollToTarget = (target: string | number) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { duration: 1.4, offset: 0 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target });
  } else {
    document.querySelector(target)?.scrollIntoView();
  }
};

/** Run cb once the intro loader has finished (or immediately if it already has). */
export const onIntroDone = (cb: () => void) => {
  if (document.documentElement.dataset.intro === "done") {
    cb();
    return () => {};
  }
  window.addEventListener("intro:done", cb, { once: true });
  return () => window.removeEventListener("intro:done", cb);
};

export const markIntroDone = () => {
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event("intro:done"));
};
