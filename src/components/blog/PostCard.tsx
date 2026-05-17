"use client";

import Link from "next/link";
import { format } from "date-fns";
import NeonBadge from "@/components/ui/NeonBadge";
import type { PostMeta } from "@/lib/types";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block group transition-all duration-300 rounded-sm p-6"
      style={{
        backgroundColor: "#0f0f1a",
        border: "1px solid #1a1a2e",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#00f5ff40";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--glow-cyan)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#1a1a2e";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <div className="flex items-center gap-3 mb-3 font-mono text-xs" style={{ color: "#7878a0" }}>
        <time dateTime={post.publishedAt}>
          {format(new Date(post.publishedAt), "MMM dd, yyyy")}
        </time>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>

      <h2
        className="text-lg font-bold mb-2 transition-all duration-200 group-hover:text-neon-cyan"
        style={{ color: "#e0e0f0" }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.color = "#00f5ff";
          (e.target as HTMLElement).style.textShadow = "var(--glow-cyan-sm)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.color = "#e0e0f0";
          (e.target as HTMLElement).style.textShadow = "none";
        }}
      >
        {post.title}
      </h2>

      <p className="text-sm mb-4 leading-relaxed" style={{ color: "#7878a0" }}>
        {post.excerpt}
      </p>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <NeonBadge key={tag} label={tag} variant="magenta" />
          ))}
        </div>
      )}
    </Link>
  );
}
