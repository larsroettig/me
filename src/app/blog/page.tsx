import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import BlogFilter from "@/components/blog/BlogFilter";
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
      <BlogFilter posts={posts} />
    </div>
  );
}
