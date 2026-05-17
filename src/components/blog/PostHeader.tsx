"use client";

import { format } from "date-fns";
import NeonBadge from "@/components/ui/NeonBadge";
import type { PostMeta } from "@/lib/types";

interface PostHeaderProps {
  meta: PostMeta;
}

export default function PostHeader({ meta }: PostHeaderProps) {
  const dateStr = format(new Date(meta.publishedAt), "yyyy-MM-dd");

  return (
    <header className="mb-12">
      {/* Top accent bar */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="h-px flex-1"
          style={{
            background:
              "linear-gradient(90deg, #00f5ff 0%, #ff00ff 50%, transparent 100%)",
          }}
        />
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: "#7878a0" }}
        >
          ARTICLE
        </span>
        <div
          className="h-px flex-1"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #ff00ff 50%, #00f5ff 100%)",
          }}
        />
      </div>

      {/* Terminal meta row */}
      <div
        className="flex items-center gap-4 font-mono text-xs mb-8"
        style={{
          color: "#7878a0",
          borderLeft: "2px solid #00f5ff",
          paddingLeft: "12px",
          boxShadow: "-2px 0 8px #00f5ff40",
        }}
      >
        <span style={{ color: "#00f5ff" }}>$</span>
        <span>cat</span>
        <time
          dateTime={meta.publishedAt}
          style={{ color: "#e0e0f0" }}
        >
          {dateStr}
        </time>
        <span>·</span>
        <span>{meta.readingTime}</span>
      </div>

      {/* Title */}
      <h1
        className="text-3xl md:text-5xl font-bold leading-tight mb-6 relative"
        style={{ color: "#00f5ff" }}
      >
        <span
          className="relative"
          style={{
            textShadow: "var(--glow-cyan-sm), 0 0 60px #00f5ff20",
          }}
        >
          {meta.title}
        </span>
        {/* Decorative bracket */}
        <span
          aria-hidden
          className="absolute -left-4 top-0 font-mono text-2xl md:text-4xl select-none"
          style={{ color: "#ff00ff", opacity: 0.4, textShadow: "var(--glow-magenta-sm)" }}
        >
          {"{"}
        </span>
      </h1>

      {/* Excerpt */}
      <p
        className="text-base mb-8 leading-relaxed max-w-2xl"
        style={{
          color: "#a0a0c0",
          borderLeft: "1px solid #1a1a2e",
          paddingLeft: "16px",
          fontStyle: "italic",
        }}
      >
        {meta.excerpt}
      </p>

      {/* Tags */}
      {meta.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {meta.tags.map((tag, i) => (
            <NeonBadge key={tag} label={tag} variant={i % 2 === 0 ? "cyan" : "magenta"} />
          ))}
        </div>
      )}

      {/* Bottom divider */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #1a1a2e 30%, #00f5ff40 60%, transparent 100%)",
        }}
      />
    </header>
  );
}
