# Astro migration report

Status: ready for review, not merged into `main`  
Branch: `astro-migration`  
Date: 2026-09-05

## Result

- Hugo published posts found: **48**.
- Astro published posts generated: **48**.
- Missing or failed posts: **0**.
- Hugo drafts found: **1** section index (`content/posts/_index.md`); it is not an article and remains preserved in the legacy source.
- Standalone pages migrated: **3** (`about`, `friend`, and `friends`).
- Static source images retained: **59**.
- Hugo shortcodes used: **0**.
- Historical post URLs preserved: **48/48**.
- All **75** URLs in the old sitemap are covered after removing the old `/Blog` project prefix; ASCII tag slugs retain Hugo's lowercase form.
- `edgeone.json` redirects old pagination paths to complete lists and accepts `/Blog/*` paths on the new host. Cross-host redirects from GitHub Pages still require the production-switch decision.
- Generated static HTML pages: **80**.
- Production output: `dist/`.

## What was retained

- The Spring Blog name, author identity, avatar, photographic hero, and post covers.
- The restrained warm red/pink accent.
- Chinese serif reading character with a clean sans-serif UI stack.
- The three directory-derived categories: `做题记录`, `算法`, and `随想`.
- All 20 tags, archives, RSS, sitemap, syntax-highlighted code, and article math.
- The exact route pattern `/posts/<category>/<filename>/`.
- The original Hugo configuration, content, templates, theme submodule, scripts, and static files for rollback.

## What changed

- Rebuilt the theme as small Astro components and one global stylesheet instead of copying Reimu internals.
- Removed the loader animation, PJAX, AOS, tag cloud, icon-font runtime, view counter, and other theme-wide JavaScript. They increased page weight without helping reading.
- Replaced the dense right-sidebar theme with an editorial two-column home layout and a focused article reading width.
- Kept only one small theme-toggle script; the rest of the site is pre-rendered HTML.
- Normalized 17 legacy Markdown image paths from `../images/...` to `/images/...` in Astro copies only.
- Fixed Markdown compatibility in two articles without rewriting prose: marked six C++ snippets as code in `miu_you-no-zhuang-ya-dp`, and escaped the visible `%` operator in `miu_you-nobei-bao-dp` so KaTeX does not swallow the remainder as a comment. Chinese labels inside formulas remain supported.
- Added WebP cover and hero variants. The 48 optimized source images total **7.4 MiB**, down from **175.4 MiB**, while original images remain available at their old paths.
- Added a responsive table of contents, accessible skip link, reduced-motion handling, and a custom 404 page.

## Verification

Local checks completed with Node.js 24.18.0 and EdgeOne-supported 24.5.0 (pinned in `.nvmrc` and `edgeone.json`):

- `npm ci`: dependency lock is reproducible.
- `npm run check`: **0 errors, 0 warnings, 0 hints**.
- Content validation: **48 published posts** and all referenced local assets found.
- `npm run build`: success.
- Output validation: **48 legacy routes**, **80 HTML pages**, SEO metadata, server-rendered KaTeX, and all generated local links passed.
- Browser review: desktop home, mobile home, desktop article, mobile article, and dark mode checked.
- Exact sitemap comparison: all 48 old article URLs exist in the Astro sitemap.
- Regression test: a temporary 49th published article builds and appears in RSS; a temporary draft does not appear in HTML or feeds. Both fixtures were removed afterward. Routine checks do not impose a fixed article-count ceiling.
- The one-time migration script refuses to overwrite existing Astro content, protecting future posts.
- GitHub Actions: pending remote validation; local results are not a substitute for CI.

## EdgeOne Makers / Pages setup after approval

Do not perform these steps until the migration is approved and merged to `main`.

1. In EdgeOne Makers, create a project from GitHub repository `Miuyou/Blog`.
2. Set the production branch to `main`; other branches can be preview deployments.
3. Use repository root `./`.
4. Install command: `npm ci`.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Node.js: `24.5.0`, a version explicitly listed in EdgeOne's release notes. Local and CI use the same pinned version.
8. Add `SITE_URL=https://blog.<your-domain>` after the real blog hostname is chosen. This produces correct canonical, Open Graph, RSS, robots, and sitemap URLs.
9. Deploy once and inspect the EdgeOne preview URL.
10. Add the chosen blog subdomain to the production environment in Domain Management.
11. EdgeOne will provide ownership-verification data and the final CNAME target. At the current DNS provider create:
    - Record type: `CNAME`.
    - Host: `blog` (or the exact chosen subdomain label).
    - Target: the exact `*.dns.edgeone.site` value shown by EdgeOne.
    - Proxy: DNS-only / disabled so EdgeOne can see and serve the CNAME directly.
12. Wait for EdgeOne to verify the record and issue HTTPS automatically.

No DNS API token, VPS access, Tencent Cloud SecretId/SecretKey, or EdgeOne API token is needed for the GitHub-connected deployment flow.

Official configuration references: [edgeone.json](https://pages.edgeone.ai/document/edgeone-json), [supported Node version additions](https://pages.edgeone.ai/document/release-notes). Platform deployment, redirects, custom-domain verification and HTTPS must still be smoke-tested during the approved first deployment; they have not been changed or exercised against production.

## Production switch note

The hostname will change from `miuyou.github.io` to the selected blog subdomain, but every path after the old `/Blog` project prefix is preserved. Before production cutover, decide whether to keep the old GitHub Pages site frozen or replace it with a lightweight redirect site pointing to the new hostname. This is the only remaining URL-migration choice and should be made after the real domain is known.
