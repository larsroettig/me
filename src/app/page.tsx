import Link from "next/link";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import SkillsSection from "@/components/home/SkillsSection";
import PostCard from "@/components/blog/PostCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { getAllPosts } from "@/lib/mdx";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <HeroSection />
      <section className="max-w-5xl mx-auto px-6 py-16">
        <SectionHeading title="LATEST_POSTS" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-block px-6 py-2.5 font-mono text-sm tracking-widest uppercase transition-all duration-200"
            style={{
              border: "1px solid #00f5ff40",
              color: "#00f5ff",
            }}
          >
            View all posts →
          </Link>
        </div>
      </section>
      <AboutSection />
      <SkillsSection />
    </>
  );
}
