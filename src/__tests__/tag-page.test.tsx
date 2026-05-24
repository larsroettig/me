import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import type { PostMeta } from "@/lib/types";

const mockPosts: PostMeta[] = [
  {
    slug: "ai-post",
    title: "AI Post Title",
    publishedAt: "2026-01-01",
    excerpt: "About AI",
    tags: ["AI", "RAG"],
    readingTime: "5 min read",
  },
  {
    slug: "react-post",
    title: "React Post Title",
    publishedAt: "2026-01-02",
    excerpt: "About React",
    tags: ["React", "Performance"],
    readingTime: "3 min read",
  },
  {
    slug: "both-post",
    title: "AI and React Post",
    publishedAt: "2026-01-03",
    excerpt: "About both",
    tags: ["AI", "React"],
    readingTime: "4 min read",
  },
];

vi.mock("@/lib/mdx", () => ({
  getAllPosts: () => mockPosts,
}));

vi.mock("@/components/ui/SectionHeading", () => ({
  default: ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  ),
}));

vi.mock("@/components/blog/PostCard", () => ({
  default: ({ post }: { post: PostMeta }) => <div data-testid="post-card">{post.title}</div>,
}));

describe("TagPage", () => {
  it("shows only posts matching the requested tag", async () => {
    const TagPage = (await import("@/app/blog/tags/[tag]/page")).default;
    render(await TagPage({ params: Promise.resolve({ tag: "ai" }) }));
    expect(screen.getByText("AI Post Title")).toBeInTheDocument();
    expect(screen.getByText("AI and React Post")).toBeInTheDocument();
    expect(screen.queryByText("React Post Title")).not.toBeInTheDocument();
  });

  it("shows a no-posts message for an unknown tag", async () => {
    const TagPage = (await import("@/app/blog/tags/[tag]/page")).default;
    render(await TagPage({ params: Promise.resolve({ tag: "nonexistent" }) }));
    expect(screen.queryAllByTestId("post-card")).toHaveLength(0);
    expect(screen.getByText(/no posts/i)).toBeInTheDocument();
  });

  it("matches tags case-insensitively via slug", async () => {
    const TagPage = (await import("@/app/blog/tags/[tag]/page")).default;
    render(await TagPage({ params: Promise.resolve({ tag: "react" }) }));
    expect(screen.getByText("React Post Title")).toBeInTheDocument();
    expect(screen.getByText("AI and React Post")).toBeInTheDocument();
    expect(screen.queryByText("AI Post Title")).not.toBeInTheDocument();
  });
});
