"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, Heart, MessageSquare, RefreshCw } from "lucide-react";
import { siteConfig, LinkedInPost } from "../../../site.config";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

interface LinkedInFeedResponse {
  updatedAt?: string;
  syncStatus?: string;
  posts: LinkedInPost[];
}

export const LinkedInSection: React.FC = () => {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [syncStatus, setSyncStatus] = useState("SYNCED");
  const [lastSync, setLastSync] = useState("RECENT");

  const fetchFeed = useCallback(async () => {
    setLoading(true);
    setFailed(false);
    try {
      const res = await fetch("/api/linkedin");
      if (!res.ok) throw new Error(`LinkedIn feed status ${res.status}`);
      const data: LinkedInFeedResponse = await res.json();
      if (data.posts?.length) {
        setPosts(data.posts);
        setSyncStatus(data.syncStatus || "SYNCHRONIZED");
        if (data.updatedAt) {
          setLastSync(
            new Date(data.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
          );
        }
      }
    } catch (error) {
      console.warn("LinkedIn feed unavailable", error);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchFeed();
  }, [fetchFeed]);

  const { linkedin } = siteConfig;

  return (
    <section
      id="linkedin"
      data-theme="mint"
      className="relative px-5 py-24 md:px-10 md:py-36 border-b border-fg/10 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(255,138,61,0.12),transparent_70%)]"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Telemetry & feed"
          title={linkedin.heading}
          subtitle={linkedin.description}
          italic={["LinkedIn"]}
        />

        <Reveal className="mb-10 flex flex-wrap items-center justify-between gap-4 border-y border-fg/10 py-4 font-mono text-[11px] uppercase tracking-widest text-fg/60">
          <span className="flex items-center gap-3" role="status">
            <span className={`h-2 w-2 rounded-full ${failed ? "bg-accent" : "bg-[#FFB145]"}`} aria-hidden="true" />
            {failed ? "Feed unavailable" : `${syncStatus} · ${lastSync}`}
          </span>
          <span className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => void fetchFeed()}
              disabled={loading}
              aria-label="Refresh LinkedIn feed"
              className="inline-flex min-h-11 items-center gap-2 hover:text-accent disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
              Refresh
            </button>
            <a href={linkedin.profileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-fg hover:text-accent font-semibold transition-colors">
              Follow <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </span>
        </Reveal>

        <Reveal stagger className="grid gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <article
              key={post.id || i}
              className="glass-card group flex flex-col justify-between rounded-[24px] border border-fg/10 bg-canvas-card p-7 transition-all duration-500 hover:border-accent hover:shadow-[0_16px_40px_rgba(255,138,61,0.15)] md:p-9"
            >
              <div>
                <p className="eyebrow mb-4 text-accent">{post.date}</p>
                {post.title && <h3 className="display mb-3 text-[clamp(1.4rem,2vw,1.9rem)] leading-[1.14] font-medium">{post.title}</h3>}
                <p className="leading-relaxed text-fg/70">{post.snippet}</p>
                {post.tags?.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li key={tag} className="font-mono text-[10px] uppercase tracking-wider text-accent bg-accent/5 border border-accent/20 rounded-full px-2.5 py-0.5">
                        #{tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-fg/10 pt-5 font-mono text-xs text-fg/60">
                <span className="flex items-center gap-4">
                  {post.likes !== undefined && (
                    <span className="flex items-center gap-1.5">
                      <Heart className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                      <span className="sr-only">Likes:</span>
                      {post.likes}
                    </span>
                  )}
                  {post.comments !== undefined && (
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only">Comments:</span>
                      {post.comments}
                    </span>
                  )}
                </span>
                <a href={post.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 uppercase tracking-widest text-fg hover:text-accent font-semibold transition-colors">
                  View post <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </Reveal>

        {!loading && posts.length === 0 && (
          <p className="text-fg/50">No posts to show right now. Follow on LinkedIn for the latest updates.</p>
        )}
      </div>
    </section>
  );
};
