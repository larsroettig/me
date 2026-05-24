import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostMeta } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");
const AUDIO_DIR = path.join(process.cwd(), "public", "audio");

function audioExists(slug: string): boolean {
  return fs.existsSync(path.join(AUDIO_DIR, `${slug}.mp3`));
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const source = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data, content } = matter(source);
      return {
        slug,
        title: data.title as string,
        publishedAt: data.publishedAt as string,
        updatedAt: data.updatedAt as string | undefined,
        excerpt: data.excerpt as string,
        tags: (data.tags as string[]) ?? [],
        readingTime: readingTime(content).text,
        draft: (data.draft as boolean) ?? false,
        hasAudio: audioExists(slug),
      } satisfies PostMeta;
    })
    .filter((p) => process.env.NODE_ENV === "development" || !p.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getRelatedPosts(
  currentSlug: string,
  allPosts: PostMeta[],
  limit = 3
): PostMeta[] {
  const current = allPosts.find((p) => p.slug === currentSlug);
  const others = allPosts.filter((p) => p.slug !== currentSlug);
  if (!current) {
    return others
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .slice(0, limit);
  }
  return others
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.post.publishedAt.localeCompare(a.post.publishedAt)
    )
    .slice(0, limit)
    .map(({ post }) => post);
}

export function getPostBySlug(slug: string): Post {
  const source = fs.readFileSync(
    path.join(CONTENT_DIR, `${slug}.mdx`),
    "utf8"
  );
  const { data, content } = matter(source);
  return {
    slug,
    title: data.title as string,
    publishedAt: data.publishedAt as string,
    updatedAt: data.updatedAt as string | undefined,
    excerpt: data.excerpt as string,
    tags: (data.tags as string[]) ?? [],
    readingTime: readingTime(content).text,
    draft: (data.draft as boolean) ?? false,
    hasAudio: audioExists(slug),
    content,
  };
}
