/**
 * Run once to extract LinkedIn profile data.
 * Usage: npx ts-node --esm scripts/scrape-linkedin.ts
 *    OR: npx tsx scripts/scrape-linkedin.ts
 *
 * The browser opens headed. Log in to LinkedIn if prompted, then wait.
 * Output is written to scripts/linkedin-data.json.
 */
import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

const PROFILE_URL = "https://www.linkedin.com/in/larsroettig/";
const OUTPUT = path.join(import.meta.dirname, "linkedin-data.json");

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext({ locale: "en-US" });
const page = await context.newPage();

console.log("Opening LinkedIn profile...");
await page.goto(PROFILE_URL);

// Wait until the URL contains the profile slug (handles login redirect)
try {
  await page.waitForURL(/larsroettig/, { timeout: 120_000 });
} catch {
  console.error("Timed out waiting for profile. Make sure you logged in.");
  await browser.close();
  process.exit(1);
}

await page.waitForLoadState("networkidle");
// Scroll to load lazy sections
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(2000);

const data = await page.evaluate(() => {
  const text = (sel: string) =>
    document.querySelector(sel)?.textContent?.trim() ?? null;

  const headline = text(".text-body-medium");

  // About section: LinkedIn renders content after an anchor with id="about"
  const aboutSection = document.querySelector("#about")?.closest("section");
  const about = aboutSection
    ? Array.from(aboutSection.querySelectorAll("span[aria-hidden='true']"))
        .map((el) => el.textContent?.trim())
        .filter(Boolean)
        .join(" ")
    : null;

  // Experience items
  const expSection = document.querySelector("#experience")?.closest("section");
  const experience = expSection
    ? Array.from(expSection.querySelectorAll("li.artdeco-list__item")).map(
        (li) => ({
          title: li.querySelector(".t-bold span[aria-hidden='true']")?.textContent?.trim() ?? null,
          company: li.querySelector(".t-normal:not(.t-black--light) span[aria-hidden='true']")?.textContent?.trim() ?? null,
          duration: li.querySelector(".pvs-entity__caption-wrapper")?.textContent?.trim() ?? null,
        })
      )
    : [];

  return { headline, about, experience };
});

fs.writeFileSync(OUTPUT, JSON.stringify(data, null, 2), "utf8");
console.log(`\nSaved to ${OUTPUT}`);
console.log(JSON.stringify(data, null, 2));

await browser.close();
