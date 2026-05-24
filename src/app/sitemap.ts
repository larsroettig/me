import { getAllPosts } from "@/lib/mdx";

const BASE_URL = "https://larsroettig.me";

export default function sitemap() {
  const posts = getAllPosts();

  const postEntries = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const mostRecentPost = posts[0];
  const blogLastModified = mostRecentPost
    ? new Date(mostRecentPost.updatedAt ?? mostRecentPost.publishedAt)
    : new Date();

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: blogLastModified, changeFrequency: "weekly" as const, priority: 0.9 },
    ...postEntries,
  ];
}
