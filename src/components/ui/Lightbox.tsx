"use client";

import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";
import { lockScroll } from "../../lib/motion";

export interface LightboxData {
  title: string;
  medium: string;
  year: string;
  category: string;
  description: string;
  image?: string;
  externalUrl?: string;
  tags?: string[];
  links?: { label: string; url: string }[];
  metrics?: { label: string; value: string }[];
  visualContent?: React.ReactNode;
}

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  data: LightboxData | null;
}

export const Lightbox: React.FC<LightboxProps> = ({ isOpen, onClose, data }) => {
  const reducedMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    lockScroll(true);
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
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
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  const links = data?.links ?? (data?.externalUrl ? [{ label: "Open primary source", url: data.externalUrl }] : []);

  return (
    <AnimatePresence>
      {isOpen && data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.3 }}
          className="fixed inset-0 z-[9995] flex items-end justify-center bg-black/70 p-0 backdrop-blur-md sm:items-center sm:p-8"
          onClick={onClose}
          data-lenis-prevent
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={data.title}
            initial={reducedMotion ? { opacity: 0 } : { y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { y: 60, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-fg/15 bg-canvas-raised sm:rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-fg/10 px-6 py-4">
              <span className="eyebrow">
                {data.category} · {data.year}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-fg/20 text-fg transition-colors hover:bg-fg hover:text-canvas"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain p-6 md:p-10">
              {(data.image || data.visualContent) && (
                <div className="relative mb-8 flex min-h-[240px] items-center justify-center overflow-hidden rounded-2xl border border-fg/10 bg-canvas md:min-h-[340px]">
                  {data.image ? (
                    <Image src={data.image} alt={data.title} fill sizes="(max-width: 768px) 100vw, 800px" className="object-contain" />
                  ) : (
                    data.visualContent
                  )}
                </div>
              )}

              <p className="eyebrow mb-3 text-accent">{data.medium}</p>
              <h3 className="display text-[clamp(1.75rem,4vw,3.25rem)]">{data.title}</h3>
              <p className="mt-5 max-w-2xl leading-relaxed text-fg/65">{data.description}</p>

              {data.metrics && data.metrics.length > 0 && (
                <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-fg/10 py-6">
                  {data.metrics.map((m) => (
                    <div key={m.label}>
                      <dd className="display text-2xl md:text-4xl">{m.value}</dd>
                      <dt className="eyebrow mt-2">{m.label}</dt>
                    </div>
                  ))}
                </dl>
              )}

              {data.tags && data.tags.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {data.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-fg/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-fg/60">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              {links.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-fg px-5 font-mono text-xs font-bold uppercase tracking-widest text-canvas transition-colors hover:bg-[#D6337E] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
