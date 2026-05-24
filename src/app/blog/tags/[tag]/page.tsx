import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import { slugifyTag } from "@/lib/slugify-tag";
import PostCard from "@/components/blog/PostCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";

const BASE_URL = "https://larsroettig.me";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  const posts = getAllPosts();
  const slugs = new Set(posts.flatMap((p) => p.tags).map(slugifyTag));
  return Array.from(slugs).map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const label = tag.replace(/-/g, " ");
  return {
    title: `Posts tagged "${label}"`,
    description: `Articles about ${label} on larsroettig.me — AI engineering, architecture, and software development.`,
    alternates: { canonical: `${BASE_URL}/blog/tags/${tag}` },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const allPosts = getAllPosts();
  const posts = allPosts.filter((p) => p.tags.some((t) => slugifyTag(t) === tag));
  const label = tag.replace(/-/g, " ");

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Posts tagged "${label}"`,
    url: `${BASE_URL}/blog/tags/${tag}`,
    description: `Articles about ${label} on larsroettig.me`,
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <SectionHeading
        title={`#${label}`}
        subtitle={`${posts.length} post${posts.length !== 1 ? "s" : ""}`}
      />

      {posts.length === 0 ? (
        <p className="font-mono text-sm" style={{ color: "#7878a0" }}>
          // No posts found for this tag.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <div className="mt-12">
        <Link
          href="/blog"
          className="font-mono text-sm transition-colors duration-200"
          style={{ color: "#00f5ff" }}
        >
          ← back to all posts
        </Link>
      </div>
    </div>
  );
}
