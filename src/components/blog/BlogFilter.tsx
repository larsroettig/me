"use client";

import { useState } from "react";
import PostCard from "@/components/blog/PostCard";
import type { PostMeta } from "@/lib/types";

interface BlogFilterProps {
  posts: PostMeta[];
}

const MIN_COUNT = 4;
const LATEST_COUNT = 5;

type Category =
  | { id: string; label: string; tag: string; note?: string }
  | { id: string; label: "Latest"; type: "latest" };

const FILTER_GROUPS: { key: string; label: string; categories: Category[] }[] = [
  {
    key: "topics",
    label: "// topics",
    categories: [
      { id: "ai", label: "AI", tag: "AI" },
      { id: "react", label: "React", tag: "React" },
    ],
  },
  {
    key: "type",
    label: "// type",
    categories: [
      { id: "latest", label: "Latest", type: "latest" as const },
      { id: "deep-dive", label: "Deep Dives", tag: "Deep Dive" },
      { id: "investigation", label: "Investigations", tag: "Investigation" },
      { id: "fun", label: "Fun", tag: "Fun" },
    ],
  },
  {
    key: "level",
    label: "// level",
    categories: [
      { id: "complex", label: "Complex", tag: "Complex" },
      { id: "easy-read", label: "Easy Read", tag: "Easy Read", note: "no PhD required" },
    ],
  },
];

function isLatest(cat: Category): cat is { id: string; label: "Latest"; type: "latest" } {
  return "type" in cat && cat.type === "latest";
}

function categoryCount(cat: Category, posts: PostMeta[]): number {
  if (isLatest(cat)) return posts.length;
  return posts.filter((p) => p.tags.includes(cat.tag)).length;
}

function filterPosts(activeId: string | null, posts: PostMeta[]): PostMeta[] {
  if (!activeId) return posts;

  for (const group of FILTER_GROUPS) {
    const cat = group.categories.find((c) => c.id === activeId);
    if (!cat) continue;
    if (isLatest(cat)) return posts.slice(0, LATEST_COUNT);
    return posts.filter((p) => p.tags.includes(cat.tag));
  }
  return posts;
}

export default function BlogFilter({ posts }: BlogFilterProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  if (posts.length === 0) {
    return (
      <p className="font-mono text-sm" style={{ color: "#7878a0" }}>
        // No posts yet. Check back soon.
      </p>
    );
  }

  const filtered = filterPosts(activeId, posts);

  function toggle(id: string) {
    setActiveId((prev) => (prev === id ? null : id));
  }

  const visibleGroups = FILTER_GROUPS.map((group) => ({
    ...group,
    categories: group.categories.filter((cat) => {
      if (isLatest(cat)) return true;
      return categoryCount(cat, posts) >= MIN_COUNT;
    }),
  })).filter((group) => group.categories.length > 0);

  return (
    <div>
      {visibleGroups.length > 0 && (
        <div className="mb-8 space-y-3">
          {visibleGroups.map((group) => (
            <div key={group.key} className="flex items-center gap-3 flex-wrap">
              <span
                className="font-mono text-xs shrink-0 w-20"
                style={{ color: "#2a2a4e" }}
              >
                {group.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.categories.map((cat) => {
                  const isActive = activeId === cat.id;
                  const note = "note" in cat ? cat.note : undefined;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggle(cat.id)}
                      className="px-3 py-1 text-xs font-mono rounded-sm transition-all duration-200"
                      style={{
                        backgroundColor: isActive ? "#00f5ff18" : "#12121e",
                        border: `1px solid ${isActive ? "#00f5ff" : "#2a2a4e"}`,
                        color: isActive ? "#00f5ff" : "#7878a0",
                        boxShadow: isActive ? "var(--glow-cyan-sm)" : "none",
                        cursor: "pointer",
                      }}
                    >
                      {cat.label}
                      {note && (
                        <span style={{ color: isActive ? "#00f5ff80" : "#2a2a4e", marginLeft: "6px" }}>
                          — {note}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="font-mono text-sm" style={{ color: "#7878a0" }}>
          // No posts in this category yet.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
