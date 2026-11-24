"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap, lockScroll, markIntroDone, prefersReducedMotion } from "../../lib/motion";
import { siteConfig } from "../../../site.config";

const STORAGE_KEY = "sm-intro-seen";

const LINES = [
  { k: "lookdev", v: "42+ film assets shipped", ok: true },
  { k: "research", v: "green hydrogen & ESG", ok: true },
  { k: "location", v: siteConfig.meta.location, ok: true },
  { k: "status", v: "open to select collaborations", ok: false },
];

/**
 * Terminal-style loader. Shown once per session, skippable by button, Enter, Escape or tap.
 * Marks the intro done so hero animations can start after it exits.
 */
export const TerminalIntro: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage can be blocked */
    }
    const done = () => {
      setVisible(false);
      lockScroll(false);
      markIntroDone();
    };
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return done();
    gsap.to(root, { yPercent: -100, duration: 0.9, ease: "expo.inOut", onComplete: done });
  }, []);

  useEffect(() => {
    if (!visible) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    return () => {
      window.requestAnimationFrame(() => previousFocusRef.current?.focus());
    };
  }, [visible]);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (seen || prefersReducedMotion()) {
      finishedRef.current = true;
      markIntroDone();
      return;
    }
    setVisible(true);
    lockScroll(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    skipRef.current?.focus();
    const timers = LINES.map((_, i) => window.setTimeout(() => setStep(i + 1), 500 + i * 450));
    const auto = window.setTimeout(finish, 500 + LINES.length * 450 + 1400);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === "Escape") finish();
      if (event.key !== "Tab") return;
      const focusable = rootRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(auto);
      window.removeEventListener("keydown", onKey);
    };
  }, [visible, finish]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Intro"
      onClick={finish}
      className="fixed inset-0 z-[10001] flex items-center justify-center bg-canvas px-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl border border-fg/15 bg-canvas-raised p-6 font-mono text-[13px] shadow-2xl sm:p-8"
      >
        <div className="mb-6 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
          <span className="ml-3 text-fg/40"># best viewed with the lights on</span>
        </div>
        <p className="text-fg">
          <span className="text-accent">$</span> npx start @soumyajit
        </p>
        <ul className="mt-4 space-y-1.5" aria-live="polite">
          {LINES.slice(0, step).map((line) => (
            <li key={line.k} className="text-fg/70">
              <span className={line.ok ? "text-emerald-600" : "text-accent"}>{line.ok ? "✓" : "●"}</span>{" "}
              {line.k}: <span className="text-fg">{line.v}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-fg/40">
          {step >= LINES.length ? "ready. press return to run" : "booting"}
          <span className="ml-1 inline-block animate-blink">▍</span>
        </p>
        <div className="mt-8 flex items-center justify-between">
          <button
            ref={skipRef}
            type="button"
            onClick={finish}
            className="rounded-full bg-fg px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-canvas transition-colors hover:bg-accent hover:text-white"
          >
            Run ⏎
          </button>
          <button type="button" onClick={finish} className="text-xs uppercase tracking-widest text-fg/50 hover:text-fg">
            Skip intro
          </button>
        </div>
      </div>
    </div>
  );
};
