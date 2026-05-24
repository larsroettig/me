import { describe, it, expect } from "vitest";
import { slugifyTag } from "@/lib/slugify-tag";

describe("slugifyTag", () => {
  it("lowercases the tag", () => {
    expect(slugifyTag("React")).toBe("react");
  });

  it("replaces spaces with hyphens", () => {
    expect(slugifyTag("Claude Code")).toBe("claude-code");
  });

  it("replaces multiple spaces with a single hyphen", () => {
    expect(slugifyTag("Web  Vitals")).toBe("web-vitals");
  });

  it("preserves existing hyphens", () => {
    expect(slugifyTag("Local-First")).toBe("local-first");
  });

  it("handles tags with numbers", () => {
    expect(slugifyTag("React 19")).toBe("react-19");
  });

  it("removes characters that are not alphanumeric or hyphens", () => {
    expect(slugifyTag("C++")).toBe("c");
    expect(slugifyTag("Node.js")).toBe("nodejs");
  });

  it("handles already slugified input", () => {
    expect(slugifyTag("ai")).toBe("ai");
    expect(slugifyTag("vector-search")).toBe("vector-search");
  });
});
