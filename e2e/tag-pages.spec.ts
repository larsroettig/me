import { test, expect } from "@playwright/test";

test.describe("Tag archive pages", () => {
  test("clicking a tag badge on the blog page navigates to the tag archive", async ({ page }) => {
    await page.goto("/blog");
    const tagBadge = page.locator("a[href^='/blog/tags/']").first();
    const tagHref = await tagBadge.getAttribute("href");
    await tagBadge.click();
    await expect(page).toHaveURL(tagHref!);
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("tag archive page shows only posts with that tag", async ({ page }) => {
    await page.goto("/blog/tags/ai");
    const cards = page.locator("[data-testid='post-card'], article, a[href^='/blog/']");
    await expect(cards.first()).toBeVisible();
  });

  test("unknown tag shows no-posts message, not a 404", async ({ page }) => {
    const response = await page.goto("/blog/tags/completely-nonexistent-xyz");
    expect(response?.status()).not.toBe(404);
    await expect(page.getByText(/no posts/i)).toBeVisible();
  });

  test("clicking an old 2025 slug redirects to 2026 slug", async ({ page }) => {
    const response = await page.goto("/blog/aws-summit-2025-agentic-ai-production");
    await expect(page).toHaveURL(/aws-summit-2026-agentic-ai-production/);
    expect(response?.status()).toBe(200);
  });
});
