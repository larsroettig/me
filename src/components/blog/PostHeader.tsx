"use client";

import { format } from "date-fns";
import NeonBadge from "@/components/ui/NeonBadge";
import AudioPlayer from "@/components/blog/AudioPlayer";
import type { PostMeta } from "@/lib/types";

interface PostHeaderProps {
  meta: PostMeta;
}

export default function PostHeader({ meta }: PostHeaderProps) {
  const dateStr = format(new Date(meta.publishedAt), "MMM d, yyyy");

  return (
    <header className="mb-12">
      {/* Title */}
      <h1
        className="text-3xl md:text-5xl font-bold leading-tight mb-4"
        style={{
          color: "#00f5ff",
          textShadow: "var(--glow-cyan-sm), 0 0 60px #00f5ff20",
        }}
      >
        {meta.title}
      </h1>

      {/* Meta row */}
      <div
        className="flex items-center gap-2 font-mono text-sm mb-5"
        style={{ color: "#7878a0" }}
      >
        <time dateTime={meta.publishedAt}>{dateStr}</time>
        <span aria-hidden>·</span>
        <span>{meta.readingTime}</span>
      </div>

      {/* Tags */}
      {meta.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {meta.tags.map((tag, i) => (
            <NeonBadge key={tag} label={tag} variant={i % 2 === 0 ? "cyan" : "magenta"} />
          ))}
        </div>
      )}

      {/* Excerpt */}
      <p
        className="text-base mb-8 leading-relaxed max-w-2xl italic"
        style={{ color: "#a0a0c0" }}
      >
        {meta.excerpt}
      </p>

      {/* Audio player */}
      {meta.hasAudio && <AudioPlayer slug={meta.slug} />}

      {/* Divider */}
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
