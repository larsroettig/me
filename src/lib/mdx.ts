import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostMeta } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

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
        excerpt: data.excerpt as string,
        tags: (data.tags as string[]) ?? [],
        readingTime: readingTime(content).text,
        draft: (data.draft as boolean) ?? false,
      } satisfies PostMeta;
    })
    .filter((p) => process.env.NODE_ENV === "development" || !p.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
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
    excerpt: data.excerpt as string,
    tags: (data.tags as string[]) ?? [],
    readingTime: readingTime(content).text,
    draft: (data.draft as boolean) ?? false,
    content,
  };
}
