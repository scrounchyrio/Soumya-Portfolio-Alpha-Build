"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig, LinkedInPost } from "../../../site.config";
import { SectionHeader } from "../ui/SectionHeader";
import { Linkedin, ArrowUpRight, Heart, MessageSquare, RefreshCw } from "lucide-react";

interface LinkedInFeedResponse {
  updatedAt?: string;
  syncStatus?: string;
  posts: LinkedInPost[];
}

export const LinkedInSection: React.FC = () => {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState("SYNCED");
  const [lastSync, setLastSync] = useState("RECENT");
  const [refreshing, setRefreshing] = useState(false);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/linkedin");
      if (res.ok) {
        const data: LinkedInFeedResponse = await res.json();
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts);
          setSyncStatus(data.syncStatus || "SYNCHRONIZED");
          if (data.updatedAt) {
            const date = new Date(data.updatedAt);
            setLastSync(date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }));
          }
        }
      }
    } catch (err) {
      console.warn("Using fallback linkedin posts", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleManualRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchFeed();
    }, 600);
  };

  return (
    <section id="linkedin" className="py-24 md:py-32 relative border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="05"
          tag="TELEMETRY & FIELD DISPATCHES"
          title={siteConfig.linkedin.heading}
          subtitle={siteConfig.linkedin.description}
          note="AUTO-SYNC // LINKEDIN ACTIVITY STREAM"
        />

        {/* Sync Status HUD Bar - Light Mode */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white/85 border border-neutral-300 mb-8 font-mono text-xs text-neutral-600 backdrop-blur-md shadow-xs">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#D71921] animate-pulse" />
            <span className="text-neutral-900 font-bold uppercase tracking-wider">
              FEED STATUS: {syncStatus}
            </span>
            <span className="text-neutral-300">|</span>
            <span className="text-[11px] text-neutral-500 font-medium">TIMESTAMP: {lastSync}</span>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              type="button"
              onClick={handleManualRefresh}
              disabled={refreshing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-300 hover:border-black/30 bg-white text-neutral-800 hover:text-black transition-colors text-[11px] tracking-wider uppercase shadow-2xs font-medium"
              aria-label="Refresh LinkedIn Feed"
            >
              <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin text-[#D71921]" : ""}`} />
              <span>Refresh Feed</span>
            </motion.button>

            <a
              href={siteConfig.linkedin.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[#D71921] hover:underline font-bold"
            >
              <span>Follow Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* LinkedIn Cards Grid with Continuous Hover Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post: LinkedInPost, idx: number) => (
            <motion.article
              key={post.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 240, damping: 20, delay: idx * 0.08 }}
              whileHover={{
                y: -6,
                scale: 1.015,
                boxShadow: "0 18px 45px rgba(0,0,0,0.07)",
              }}
              className="relative rounded-2xl bg-white/90 border border-neutral-200/90 hover:border-black/30 transition-all p-6 sm:p-7 flex flex-col justify-between group shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:bg-white cursor-pointer"
            >
              {/* Corner crosshairs */}
              <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-black/25 group-hover:scale-125 transition-transform" />
              <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-black/25 group-hover:scale-125 transition-transform" />

              <div>
                {/* Header: Date & LinkedIn Brand Mark */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200 font-mono text-xs text-neutral-500">
                  <span className="tracking-widest uppercase font-semibold text-neutral-700">{post.date}</span>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 12 }}
                    className="flex items-center gap-2 text-neutral-700 group-hover:text-[#D71921] transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#D71921]" />
                    <span className="text-[10px] tracking-widest hidden sm:inline font-bold">LINKEDIN POST</span>
                  </motion.div>
                </div>

                {/* Post Title */}
                {post.title && (
                  <h3 className="text-lg font-light text-neutral-900 group-hover:text-black transition-colors mb-2 font-medium">
                    {post.title}
                  </h3>
                )}

                {/* Excerpt Body */}
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-light mb-4">
                  {post.snippet}
                </p>
              </div>

              <div>
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.08 }}
                        className="px-2.5 py-0.5 rounded-full border border-neutral-200 bg-neutral-100 font-mono text-[9px] text-neutral-700 uppercase font-medium"
                      >
                        #{tag}
                      </motion.span>
                    ))}
                  </div>
                )}

                {/* Bottom Meta & External Action */}
                <div className="pt-3 border-t border-neutral-200 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-4 text-neutral-500 text-[11px] font-medium">
                    {post.likes !== undefined && (
                      <motion.span whileHover={{ scale: 1.2, color: "#D71921" }} className="flex items-center gap-1 cursor-default">
                        <Heart className="w-3.5 h-3.5 text-[#D71921]" />
                        <span>{post.likes}</span>
                      </motion.span>
                    )}
                    {post.comments !== undefined && (
                      <motion.span whileHover={{ scale: 1.2, color: "#111111" }} className="flex items-center gap-1 cursor-default">
                        <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{post.comments}</span>
                      </motion.span>
                    )}
                  </div>

                  <motion.a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, x: 2 }}
                    className="inline-flex items-center gap-1.5 text-xs text-neutral-900 hover:text-[#D71921] transition-colors font-bold"
                  >
                    <span>View on LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D71921]" />
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
