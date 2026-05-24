import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AuthorBio from "@/components/blog/AuthorBio";

describe("AuthorBio", () => {
  it("renders the author name", () => {
    render(<AuthorBio />);
    expect(screen.getByText("Lars Roettig")).toBeInTheDocument();
  });

  it("renders a LinkedIn link with the correct href", () => {
    render(<AuthorBio />);
    const link = screen.getByRole("link", { name: /linkedin/i });
    expect(link).toHaveAttribute("href", "https://www.linkedin.com/in/larsroettig/");
  });

  it("renders an avatar image with alt text", () => {
    render(<AuthorBio />);
    const img = screen.getByRole("img", { name: /lars roettig/i });
    expect(img).toBeInTheDocument();
  });
});
