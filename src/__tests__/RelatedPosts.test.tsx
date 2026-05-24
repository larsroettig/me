import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RelatedPosts from "@/components/blog/RelatedPosts";
import type { PostMeta } from "@/lib/types";

const posts: PostMeta[] = [
  {
    slug: "post-one",
    title: "Post One Title",
    publishedAt: "2026-01-01",
    excerpt: "excerpt one",
    tags: ["AI"],
    readingTime: "3 min read",
  },
  {
    slug: "post-two",
    title: "Post Two Title",
    publishedAt: "2026-02-01",
    excerpt: "excerpt two",
    tags: ["RAG"],
    readingTime: "5 min read",
  },
];

describe("RelatedPosts", () => {
  it("renders the section heading", () => {
    render(<RelatedPosts posts={posts} />);
    expect(screen.getByText(/you might also enjoy/i)).toBeInTheDocument();
  });

  it("renders a link for each post", () => {
    render(<RelatedPosts posts={posts} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/blog/post-one");
    expect(links[1]).toHaveAttribute("href", "/blog/post-two");
  });

  it("renders each post title", () => {
    render(<RelatedPosts posts={posts} />);
    expect(screen.getByText("Post One Title")).toBeInTheDocument();
    expect(screen.getByText("Post Two Title")).toBeInTheDocument();
  });

  it("renders reading time for each post", () => {
    render(<RelatedPosts posts={posts} />);
    expect(screen.getByText(/3 min read/)).toBeInTheDocument();
    expect(screen.getByText(/5 min read/)).toBeInTheDocument();
  });

  it("renders nothing when posts array is empty", () => {
    const { container } = render(<RelatedPosts posts={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
