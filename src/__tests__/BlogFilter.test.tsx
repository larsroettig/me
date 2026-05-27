import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import type { PostMeta } from "@/lib/types";

const make = (slug: string, tags: string[], publishedAt: string): PostMeta => ({
  slug,
  title: `Post ${slug}`,
  publishedAt,
  excerpt: "Excerpt",
  tags,
  readingTime: "3 min read",
});

// 4 AI posts, 4 Deep Dive posts, 4 Complex posts; 2 React posts (below threshold)
const mockPosts: PostMeta[] = [
  make("p1", ["AI", "Deep Dive", "Complex"], "2026-01-05"),
  make("p2", ["AI", "Deep Dive", "Complex"], "2026-01-04"),
  make("p3", ["AI", "Deep Dive", "Complex"], "2026-01-03"),
  make("p4", ["AI", "Deep Dive", "Complex"], "2026-01-02"),
  make("p5", ["React"], "2026-01-06"),
  make("p6", ["React"], "2026-01-01"),
];

vi.mock("@/components/blog/PostCard", () => ({
  default: ({ post }: { post: PostMeta }) => (
    <div data-testid="post-card">{post.title}</div>
  ),
}));

describe("BlogFilter", () => {
  it("renders all posts by default", async () => {
    const { default: BlogFilter } = await import("@/components/blog/BlogFilter");
    render(<BlogFilter posts={mockPosts} />);
    expect(screen.getAllByTestId("post-card")).toHaveLength(6);
  });

  it("always shows the Latest filter button", async () => {
    const { default: BlogFilter } = await import("@/components/blog/BlogFilter");
    render(<BlogFilter posts={mockPosts} />);
    expect(screen.getByRole("button", { name: /latest/i })).toBeInTheDocument();
  });

  it("shows a category button only when 4+ posts match", async () => {
    const { default: BlogFilter } = await import("@/components/blog/BlogFilter");
    render(<BlogFilter posts={mockPosts} />);
    expect(screen.getByRole("button", { name: /AI/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Deep Dives/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Complex/i })).toBeInTheDocument();
  });

  it("hides category buttons with fewer than 4 matching posts", async () => {
    const { default: BlogFilter } = await import("@/components/blog/BlogFilter");
    render(<BlogFilter posts={mockPosts} />);
    // React has only 2 posts — should not appear
    expect(screen.queryByRole("button", { name: /^React$/i })).not.toBeInTheDocument();
  });

  it("filters posts when a category button is clicked", async () => {
    const user = userEvent.setup();
    const { default: BlogFilter } = await import("@/components/blog/BlogFilter");
    render(<BlogFilter posts={mockPosts} />);
    await user.click(screen.getByRole("button", { name: /^AI$/i }));
    expect(screen.getAllByTestId("post-card")).toHaveLength(4);
    expect(screen.queryByText("Post p5")).not.toBeInTheDocument();
    expect(screen.queryByText("Post p6")).not.toBeInTheDocument();
  });

  it("clicking the active filter again shows all posts", async () => {
    const user = userEvent.setup();
    const { default: BlogFilter } = await import("@/components/blog/BlogFilter");
    render(<BlogFilter posts={mockPosts} />);
    await user.click(screen.getByRole("button", { name: /^AI$/i }));
    expect(screen.getAllByTestId("post-card")).toHaveLength(4);
    await user.click(screen.getByRole("button", { name: /^AI$/i }));
    expect(screen.getAllByTestId("post-card")).toHaveLength(6);
  });

  it("Latest shows the 5 most recent posts", async () => {
    const user = userEvent.setup();
    const { default: BlogFilter } = await import("@/components/blog/BlogFilter");
    render(<BlogFilter posts={mockPosts} />);
    await user.click(screen.getByRole("button", { name: /latest/i }));
    expect(screen.getAllByTestId("post-card")).toHaveLength(5);
  });

  it("shows no-posts message when the list is empty", async () => {
    const { default: BlogFilter } = await import("@/components/blog/BlogFilter");
    render(<BlogFilter posts={[]} />);
    expect(screen.queryAllByTestId("post-card")).toHaveLength(0);
    expect(screen.getByText(/no posts yet/i)).toBeInTheDocument();
  });
});
