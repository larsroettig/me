import { format } from "date-fns";
import NeonBadge from "@/components/ui/NeonBadge";
import type { PostMeta } from "@/lib/types";

interface PostHeaderProps {
  meta: PostMeta;
}

export default function PostHeader({ meta }: PostHeaderProps) {
  return (
    <header className="mb-12 pb-8" style={{ borderBottom: "1px solid #1a1a2e" }}>
      <div className="flex items-center gap-3 font-mono text-xs mb-6" style={{ color: "#7878a0" }}>
        <time dateTime={meta.publishedAt}>
          {format(new Date(meta.publishedAt), "MMMM dd, yyyy")}
        </time>
        <span>·</span>
        <span>{meta.readingTime}</span>
      </div>

      <h1
        className="text-3xl md:text-5xl font-bold leading-tight mb-6"
        style={{
          color: "#00f5ff",
          textShadow: "var(--glow-cyan-sm)",
        }}
      >
        {meta.title}
      </h1>

      <p className="text-base mb-6 leading-relaxed" style={{ color: "#7878a0" }}>
        {meta.excerpt}
      </p>

      {meta.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {meta.tags.map((tag) => (
            <NeonBadge key={tag} label={tag} variant="magenta" />
          ))}
        </div>
      )}
    </header>
  );
}
