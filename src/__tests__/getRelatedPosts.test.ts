import { describe, it, expect } from "vitest";
import { getRelatedPosts } from "@/lib/mdx";
import type { PostMeta } from "@/lib/types";

const make = (slug: string, tags: string[], publishedAt: string): PostMeta => ({
  slug,
  title: slug,
  publishedAt,
  excerpt: "",
  tags,
  readingTime: "1 min read",
});

const posts: PostMeta[] = [
  make("a", ["AI", "RAG"], "2026-01-01"),
  make("b", ["AI", "Vector Search"], "2026-02-01"),
  make("c", ["Rust", "Performance"], "2026-03-01"),
  make("d", ["RAG", "Vector Search"], "2026-04-01"),
];

describe("getRelatedPosts", () => {
  it("excludes the current post", () => {
    const result = getRelatedPosts("a", posts);
    expect(result.every((p) => p.slug !== "a")).toBe(true);
  });

  it("ranks posts by shared tag count descending", () => {
    const result = getRelatedPosts("a", posts, 3);
    // "b" shares AI, "d" shares RAG — both score 1; "c" scores 0
    expect(result[0].slug === "b" || result[0].slug === "d").toBe(true);
    expect(result[result.length - 1].slug).toBe("c");
  });

  it("returns at most the requested limit", () => {
    expect(getRelatedPosts("a", posts, 2)).toHaveLength(2);
  });

  it("falls back to recency when current slug not found", () => {
    const result = getRelatedPosts("unknown", posts, 2);
    expect(result).toHaveLength(2);
    expect(result[0].publishedAt >= result[1].publishedAt).toBe(true);
  });
});
