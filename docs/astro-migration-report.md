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
- Redirects required inside the site: **none**.
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
- Added WebP cover and hero variants. The 48 optimized source images total **7.4 MiB**, down from **175.4 MiB**, while original images remain available at their old paths.
- Added a responsive table of contents, accessible skip link, reduced-motion handling, and a custom 404 page.

## Verification

Local checks completed with Node.js 24.18.0:

- `npm ci`: dependency lock is reproducible.
- `npm run check`: **0 errors, 0 warnings, 0 hints**.
- Content validation: **48 published posts** and all referenced local assets found.
- `npm run build`: success.
- Output validation: **48 legacy routes**, **80 HTML pages**, SEO metadata, server-rendered KaTeX, and all generated local links passed.
- Browser review: desktop home, mobile home, desktop article, mobile article, and dark mode checked.
- Exact sitemap comparison: all 48 old article URLs exist in the Astro sitemap.

## EdgeOne Makers / Pages setup after approval

Do not perform these steps until the migration is approved and merged to `main`.

1. In EdgeOne Makers, create a project from GitHub repository `Miuyou/Blog`.
2. Set the production branch to `main`; other branches can be preview deployments.
3. Use repository root `./`.
4. Install command: `npm ci`.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Node.js: `24.18.0`.
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

## Production switch note

The hostname will change from `miuyou.github.io` to the selected blog subdomain, but every path after the old `/Blog` project prefix is preserved. Before production cutover, decide whether to keep the old GitHub Pages site frozen or replace it with a lightweight redirect site pointing to the new hostname. This is the only remaining URL-migration choice and should be made after the real domain is known.
