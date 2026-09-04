# Hugo site audit

Audit date: 2026-09-05  
Source branch: `main`  
Migration branch: `astro-migration`

## Site and build

- Hugo version in CI: `0.152.2` extended.
- Theme: `hugo-theme-reimu`, pinned as a Git submodule at `d600dea1ef867c635de16a4c960973f22a60d75b`.
- Current public base URL: `https://miuyou.github.io/Blog/`.
- Current deployment: GitHub Actions builds Hugo and deploys `public/` to GitHub Pages on pushes to `main`.
- Language: Simplified Chinese with CJK rendering enabled.
- Pagination: 10 posts per page.
- Markdown: Goldmark, syntax highlighting, and passthrough math delimiters.
- Generated outputs: HTML, RSS, Algolia JSON, robots.txt, and sitemap.

## Content inventory

- Published posts: **48**.
- Drafts: **1** (`content/posts/_index.md`, a section index rather than an article).
- Standalone content pages: `about`, `friend`, `friends`, and the archive section index.
- Static images: **59** (40 JPG and 19 PNG).
- Hugo shortcodes used by content: **0**.
- Fenced code blocks: **40**.
- Articles containing math delimiters: **29**.
- Local relative image references requiring normalization: **17**.
- External content images: 2 unique remote images across posts/pages.

## Taxonomy and metadata

No post declares an explicit Hugo category. The existing custom layouts infer category from the first directory below `content/posts/`:

- `做题记录`: 41 posts.
- `算法`: 6 posts.
- `随想`: 1 post.

There are 20 distinct tags. The most-used tags are `解题报告` (17), `动态规划` (12), and `算法学习` (9). Posts contain `title`, `date`, optional `tags`, and `banner`/`cover`. No article has an explicit `slug`, `url`, `aliases`, description, or updated date. Every referenced cover exists.

## URL structure

The live sitemap confirms that post URLs are generated from the content path:

```text
/posts/<category>/<filename>/
```

Examples:

```text
/posts/随想/记忆/
/posts/算法/李超树/
/posts/做题记录/cf786b-legacy/
```

Site pages use `/archives/`, `/tags/`, `/categories/`, `/about/`, `/friend/`, and `/friends/`. The current `/Blog/` prefix belongs to GitHub Project Pages. The EdgeOne custom subdomain will serve the same route tree from `/`, while every path after `/Blog` remains unchanged.

## Design identity

The Reimu site currently uses:

- A large photographic hero (`images/hero/home-bg.png`).
- Spring's avatar and a right-hand author sidebar.
- A warm red/pink accent system.
- `Noto Serif SC` for Chinese reading text and `Mulish` for Latin/UI text.
- A translucent white content surface over the hero background.
- Article cover imagery, tag links, archives, syntax highlighting, a table of contents, and automatic light/dark theme support.
- Custom category filters on the home and archive pages.

The Astro implementation will retain the hero, avatar, typography character, restrained red accent, categories, archive grouping, covers, code presentation, table of contents, and light/dark comfort. It will remove the loading animation, PJAX, tag cloud, third-party icon font, visual-effect libraries, page-view counter, and theme-wide client runtime because they add weight without improving long-form reading.

## Custom code and compatibility

- `layouts/index.html` adds home category filtering.
- `layouts/archives/section.html` groups posts by year and category.
- `layouts/partials/sidebar/commonBar.html` customizes author/menu information.
- `static/css/custom.css` adds the background treatment, filters, and category pills.
- `static/js/archive-filter.js` implements home/archive filtering and query-string state.
- No content uses Hugo shortcodes or embedded HTML blocks.
- The 17 `../images/...` references will be normalized to `/images/...` in the Astro copies. Original Hugo Markdown remains untouched.

## Migration constraints

- Preserve all 48 published articles byte-for-byte except frontmatter conversion and required image-path compatibility fixes.
- Preserve `/posts/<category>/<filename>/` routes.
- Keep Hugo source, theme, and Git history until production acceptance.
- Build as static HTML into `dist`, with no database, server adapter, or runtime Node process.
