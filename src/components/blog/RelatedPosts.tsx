import Link from "next/link";
import { format } from "date-fns";
import type { PostMeta } from "@/lib/types";

interface RelatedPostsProps {
  posts: PostMeta[];
}

const GRADIENTS = [
  "linear-gradient(135deg, #00f5ff18 0%, #00f5ff08 50%, #0a0a0f 100%)",
  "linear-gradient(135deg, #ff00ff18 0%, #ff00ff08 50%, #0a0a0f 100%)",
  "linear-gradient(135deg, #00f5ff10 0%, #ff00ff10 50%, #0a0a0f 100%)",
];

const ACCENTS = ["#00f5ff", "#ff00ff", "#00f5ff"];

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16">
      <p className="text-xs tracking-[0.3em] uppercase font-mono mb-1" style={{ color: "#7878a0" }}>
        // recommended
      </p>
      <h2 className="text-xl font-bold mb-8" style={{ color: "#e0e0f0" }}>
        You might also enjoy
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-sm overflow-hidden transition-all duration-200"
            style={{
              backgroundColor: "#0f0f1a",
              border: "1px solid #1a1a2e",
            }}
          >
            {/* Gradient hero */}
            <div
              className="h-36 w-full transition-opacity duration-200 group-hover:opacity-80"
              style={{ background: GRADIENTS[i % GRADIENTS.length] }}
            >
              <div className="h-full w-full flex items-end p-4">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 rounded-sm"
                      style={{
                        color: ACCENTS[i % ACCENTS.length],
                        backgroundColor: "#0a0a0f80",
                        border: `1px solid ${ACCENTS[i % ACCENTS.length]}40`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card body */}
            <div className="p-4">
              <p className="text-xs font-mono mb-2" style={{ color: "#7878a0" }}>
                {format(new Date(post.publishedAt), "MMM d, yyyy")} · {post.readingTime}
              </p>
              <h3
                className="text-sm font-bold leading-snug transition-colors duration-200"
                style={{ color: "#e0e0f0" }}
              >
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
