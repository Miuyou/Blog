# AGENTS.md

This repository is the source of truth for Spring Blog. The production site is a static Astro site deployed from GitHub to Tencent EdgeOne Pages.

## Responsibilities

The author is responsible only for:

- Writing or approving article content.
- Providing original images.
- Making editorial, product, and design decisions.

Codex is responsible for:

- Astro, TypeScript, HTML, CSS, UI, and UX maintenance.
- Markdown cleanup that does not rewrite the author's voice.
- Frontmatter, slugs, dates, excerpts, tags, categories, covers, and image paths.
- Image sizing and format optimization when it does not visibly damage quality.
- SEO metadata, canonical URLs, Open Graph, RSS, sitemap, and robots.txt.
- Accessibility, responsive behavior, dark mode, builds, tests, CI, Git branches, commits, pushes, dependency maintenance, bug fixes, and EdgeOne Pages build configuration.

Publishing an ordinary article must not require the author to edit Astro, CSS, configuration, indexes, RSS, sitemap, or the build system.

## Publishing workflow

When the author says “发布这篇”:

1. Preserve the article's wording and voice unless editing is explicitly requested.
2. Fix only clear Markdown and layout problems.
3. Add the smallest useful frontmatter set: `title`, `pubDate`, `category`, and optional `tags`, `description`, `cover`, `updatedDate`, or `draft`.
4. Generate a stable URL-safe slug. Never change a published slug without adding a redirect.
5. Put article files in `src/content/blog/<category>/` and images in `public/images/`.
6. Use root-relative image paths such as `/images/example.webp`.
7. Run `npm run optimize:images` when adding a new cover that is not already WebP.
8. Check internal links, external assets, metadata, mobile layout, and image dimensions.
9. Run `npm run check` and `npm run build`; fix every blocking error.
10. Commit and push the finished change. Production deployment occurs when `main` is pushed after the migration has been approved.

## Engineering rules

- Prefer Astro static generation, platform APIs, and small local utilities.
- Keep dependencies and browser JavaScript minimal. Do not add a backend, database, CMS, or persistent Node server without an explicit requirement.
- Keep code educational, direct, and easy to read. Avoid compatibility layers, dead paths, unnecessary abstractions, and speculative error handling.
- Keep old URLs working. Current historical article URLs use `/posts/<category>/<slug>/`.
- Do not modify DNS, VPS configuration, or production deployment settings without explicit approval.
- Do not merge the `astro-migration` branch into `main` until the author approves the production switch.

## Required checks

Before publishing or merging:

```bash
npm ci
npm run check
npm run build
```

The repository check validates Astro and TypeScript, content counts and frontmatter, internal links, and referenced static assets. The static output directory is `dist`.

## Legacy Hugo source

The original Hugo configuration, content, layouts, theme submodule, and static assets remain in the repository during the migration. Do not delete them until the Astro production deployment has been accepted and a separate cleanup is approved.
