import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import PostCard from "@/components/blog/PostCard";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on AI engineering, architecture, and building things that last.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <SectionHeading
        title="BLOG"
        subtitle="Writing about AI agents, architecture, and the craft of engineering"
      />

      {posts.length === 0 ? (
        <p className="font-mono text-sm" style={{ color: "#7878a0" }}>
          // No posts yet. Check back soon.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
