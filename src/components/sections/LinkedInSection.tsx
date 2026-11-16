"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig, LinkedInPost } from "../../../site.config";
import { SectionHeader } from "../ui/SectionHeader";
import { Linkedin, ArrowUpRight, Heart, MessageSquare, RefreshCw, CheckCircle2 } from "lucide-react";

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
    <section id="linkedin" className="py-24 md:py-32 relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="05"
          tag="TELEMETRY & FIELD DISPATCHES"
          title={siteConfig.linkedin.heading}
          subtitle={siteConfig.linkedin.description}
          note="AUTO-SYNC // LINKEDIN ACTIVITY STREAM"
        />

        {/* Sync Status HUD Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-neutral-950 border border-white/10 mb-8 font-mono text-xs text-white/50">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#D71921] animate-pulse" />
            <span className="text-white/80 font-bold uppercase tracking-wider">
              FEED STATUS: {syncStatus}
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[11px] text-white/40">TIMESTAMP: {lastSync}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleManualRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 hover:border-white/25 bg-white/5 text-white/70 hover:text-white transition-colors text-[11px] tracking-wider uppercase"
              aria-label="Refresh LinkedIn Feed"
            >
              <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin text-[#D71921]" : ""}`} />
              <span>Refresh Feed</span>
            </button>

            <a
              href={siteConfig.linkedin.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[#D71921] hover:underline"
            >
              <span>Follow Profile</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* LinkedIn Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post: LinkedInPost, idx: number) => (
            <motion.article
              key={post.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative rounded-2xl bg-[#0B0B0B] border border-white/10 hover:border-white/25 transition-all p-6 sm:p-7 flex flex-col justify-between group shadow-sm"
            >
              {/* Corner crosshairs */}
              <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-white/20" />
              <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-white/20" />

              <div>
                {/* Header: Date & LinkedIn Brand Mark */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 font-mono text-xs text-white/40">
                  <span className="tracking-widest uppercase">{post.date}</span>
                  <div className="flex items-center gap-2 text-white/60">
                    <Linkedin className="w-4 h-4 text-[#D71921]" />
                    <span className="text-[10px] tracking-widest hidden sm:inline">LINKEDIN POST</span>
                  </div>
                </div>

                {/* Post Title */}
                {post.title && (
                  <h3 className="text-lg font-light text-white group-hover:text-white/90 transition-colors mb-2">
                    {post.title}
                  </h3>
                )}

                {/* Excerpt Body */}
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-light mb-4">
                  {post.snippet}
                </p>
              </div>

              <div>
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded border border-white/10 bg-white/[0.02] font-mono text-[9px] text-white/50 uppercase"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bottom Meta & External Action */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-4 text-white/40 text-[11px]">
                    {post.likes !== undefined && (
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-[#D71921]" />
                        <span>{post.likes}</span>
                      </span>
                    )}
                    {post.comments !== undefined && (
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-white/40" />
                        <span>{post.comments}</span>
                      </span>
                    )}
                  </div>

                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-white hover:text-[#D71921] transition-colors"
                  >
                    <span>View on LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
