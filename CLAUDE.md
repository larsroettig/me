@AGENTS.md

## Creating new blog articles

Every new MDX file in `content/blog/` must start with this frontmatter template. Fill in all fields — none are optional.

```yaml
---
title: "..."           # sentence case, max ~70 chars, no trailing period
publishedAt: "YYYY-MM-DD"
excerpt: "..."         # 1-2 sentences; this surfaces in cards, SEO, and the PostHeader — make it compelling
tags:
  - Tag1              # 2-4 tags; capitalise each word; match existing tags where possible
  - Tag2
draft: true           # set to false only when ready to publish
---
```

Rules:
- `title` — specific and concrete, not clickbait. "What I Learned Building AI Agents" beats "AI Agents Are Hard".
- `publishedAt` — use today's date in ISO format (`YYYY-MM-DD`), even if the post stays a draft.
- `excerpt` — write this **last**, after the body is done. One or two tight sentences that say *what the reader learns*, not what the post is about.
- `tags` — pick from existing tags first (`AI Agents`, `LLM`, `Architecture`, `RAG`, `Meta`, `Writing`). Only add a new tag if none fit.
- `draft: true` — always start drafts here; flip to `false` in a separate commit when publishing.
- `readingTime` is computed automatically from the content by `reading-time`; do not add it to frontmatter.
- OG/social images are generated automatically from `src/app/blog/[slug]/opengraph-image.tsx` — do not add `images` to `openGraph` or `twitter` metadata for blog posts.
- File name: `kebab-case` slug matching the title, e.g. `building-ai-agents-at-adobe.mdx`.
