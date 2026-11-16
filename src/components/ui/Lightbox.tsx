"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

export interface LightboxData {
  title: string;
  medium: string;
  year: string;
  category: string;
  description: string;
  externalUrl?: string;
  tags?: string[];
  visualContent?: React.ReactNode;
}

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  data: LightboxData | null;
}

export const Lightbox: React.FC<LightboxProps> = ({ isOpen, onClose, data }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-2xl"
          onClick={onClose}
        >
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-[#0C0C0C] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Technical HUD Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50 font-mono text-xs text-white/50">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#D71921] animate-pulse" />
                <span className="tracking-widest uppercase">INSPECTOR // {data.category}</span>
                <span className="text-white/20">|</span>
                <span>{data.year}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 p-1 text-white/60 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <span className="text-[10px] tracking-widest hidden sm:inline">CLOSE [ESC]</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Visual Display Center */}
            <div className="p-6 md:p-8 flex-1 overflow-y-auto">
              <div className="relative w-full min-h-[260px] md:min-h-[340px] rounded-xl bg-black border border-white/10 flex items-center justify-center overflow-hidden mb-6 bg-dot-matrix">
                {/* Visual placeholder or rendered node */}
                {data.visualContent ? (
                  data.visualContent
                ) : (
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-white/20 flex items-center justify-center text-[#D71921]">
                      <div className="w-3 h-3 rounded-full bg-[#D71921]" />
                    </div>
                    <p className="font-mono text-xs tracking-widest text-white/40 uppercase">
                      TACTILE ASSET ARCHIVE
                    </p>
                    <p className="text-xl font-light text-white mt-1">{data.title}</p>
                  </div>
                )}
                {/* Corner crosshairs */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30 pointer-events-none" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30 pointer-events-none" />
              </div>

              {/* Asset Metadata Details */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h3 className="text-2xl font-light text-white tracking-tight">{data.title}</h3>
                  <span className="font-mono text-xs text-[#D71921] tracking-wider uppercase">
                    {data.medium}
                  </span>
                </div>

                <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                  {data.description}
                </p>

                {data.tags && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {data.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] text-white/60 tracking-wider uppercase"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-6 py-4 border-t border-white/10 bg-black/60 flex items-center justify-between">
              <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
                RECORD ID: {data.title.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 20)}
              </span>
              {data.externalUrl && (
                <a
                  href={data.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-mono text-xs tracking-wider uppercase hover:bg-neutral-200 transition-colors"
                >
                  <span>Open Primary Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
