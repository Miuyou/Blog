import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const legacyPosts = path.join(root, 'content', 'posts');
const failures = [];

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesIn(absolute));
    if (entry.isFile()) files.push(absolute);
  }

  return files;
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

const blogRoot = path.join(root, 'src/content/blog');
const sourceFiles = (await filesIn(blogRoot)).filter((file) => /\.mdx?$/.test(file));
const posts = await Promise.all(sourceFiles.map(async (file) => {
  const source = await readFile(file, 'utf8');
  const metadata = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
  const id = path.relative(blogRoot, file).split(path.sep).join('/').replace(/\.mdx?$/, '');
  const slug = metadata.match(/^slug:\s*(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, '') ?? id;
  return { file, metadata, originalRoute: `/posts/${id}/`, route: `/posts/${slug}/`, draft: /^draft:\s*true\s*$/m.test(metadata) };
}));
const hiddenRoutes = new Set(posts.filter((post) => post.draft).flatMap((post) => [post.route, post.originalRoute]));
const publishedCount = posts.filter((post) => !post.draft).length;
const publishedTags = new Set();
for (const post of posts.filter((post) => !post.draft)) {
  const tags = post.metadata.match(/^tags:\s*\n((?:[ \t]+-.*\n)*)/m)?.[1] ?? '';
  for (const line of tags.split('\n')) {
    const tag = line.match(/^\s*-\s*(.+?)\s*$/)?.[1]?.replace(/^["']|["']$/g, '');
    if (tag) publishedTags.add(tag.toLowerCase());
  }
}
const outputFiles = await filesIn(dist);
const legacyUrls = JSON.parse(await readFile(path.join(root, 'docs/legacy-urls.json'), 'utf8'));
for (const url of legacyUrls) {
  const route = decodeURI(new URL(url).pathname).replace(/^\/Blog\//, '/');
  // Explicit drafts are intentionally unavailable; empty historical tags disappear too.
  if (hiddenRoutes.has(route)) continue;
  if (route.startsWith('/tags/') && route !== '/tags/' && !publishedTags.has(route.slice(6, -1))) continue;
  if (!await exists(path.join(dist, route, 'index.html'))) failures.push(`missing legacy URL: ${url}`);
}
const htmlFiles = outputFiles.filter((file) => file.endsWith('.html'));
const articleFiles = htmlFiles.filter((file) => {
  const relative = path.relative(dist, file).split(path.sep).join('/');
  return relative.startsWith('posts/') && relative !== 'posts/index.html';
});

for (const file of htmlFiles) {
  const relative = path.relative(dist, file).split(path.sep).join('/');
  const route = relative === 'index.html'
    ? '/'
    : `/${relative.replace(/index\.html$/, '')}`;
  const html = await readFile(file, 'utf8');

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    if (/^(?:[a-z]+:|#|\/\/)/i.test(reference)) continue;

    const target = new URL(reference, `https://local.invalid${route}`);
    const pathname = decodeURI(target.pathname);
    const candidates = pathname.endsWith('/')
      ? [path.join(dist, pathname, 'index.html')]
      : [path.join(dist, pathname), path.join(dist, pathname, 'index.html')];

    if (!await Promise.any(candidates.map(async (candidate) => {
      if (await exists(candidate)) return true;
      throw new Error();
    })).catch(() => false)) {
      failures.push(`${relative}: broken local reference ${reference}`);
    }
  }
}

for (const file of articleFiles) {
  const html = await readFile(file, 'utf8');
  const relative = path.relative(dist, file);

  for (const marker of [
    '<meta name="description"',
    '<link rel="canonical"',
    '<meta property="og:title"',
    '<meta property="og:image"',
    '<meta name="twitter:card"',
  ]) {
    if (!html.includes(marker)) failures.push(`${relative}: missing ${marker}`);
  }
}

const legacyFiles = (await filesIn(legacyPosts))
  .filter((file) => file.endsWith('.md') && path.basename(file) !== '_index.md');

for (const file of legacyFiles) {
  const relative = path.relative(legacyPosts, file);
  if (!await exists(path.join(blogRoot, relative))) failures.push(`missing preserved historical source: ${relative}`);
}
for (const post of posts) {
  const output = path.join(dist, post.route, 'index.html');
  const generated = await exists(output);
  if (post.draft && generated) failures.push(`draft leaked into output: ${post.route}`);
  if (!post.draft && !generated) failures.push(`missing published article: ${post.route}`);
}
for (const feed of ['rss.xml', 'index.xml', 'sitemap.xml']) {
  const xml = decodeURI(await readFile(path.join(dist, feed), 'utf8'));
  for (const route of hiddenRoutes) {
    if (xml.includes(route)) failures.push(`draft leaked into ${feed}: ${route}`);
  }
}

for (const required of [
  'index.html',
  '404.html',
  'index.xml',
  'rss.xml',
  'sitemap.xml',
  'robots.txt',
  'archives/index.html',
  'tags/index.html',
  'categories/index.html',
]) {
  if (!await exists(path.join(dist, required))) failures.push(`missing output ${required}`);
}

if (articleFiles.length !== publishedCount) failures.push(`expected ${publishedCount} published article pages, found ${articleFiles.length}`);

for (const file of articleFiles) {
  const html = await readFile(file, 'utf8');
  if (html.includes('class="katex-error"')) failures.push(`${path.relative(dist, file)}: invalid math`);
}

if (failures.length) {
  throw new Error(`Build validation failed:\n${failures.join('\n')}`);
}

console.log(`Validated ${legacyFiles.length} preserved historical sources, ${publishedCount} published posts, ${posts.length - publishedCount} excluded drafts, ${htmlFiles.length} HTML pages, metadata, and local links.`);
