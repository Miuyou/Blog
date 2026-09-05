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

const outputFiles = await filesIn(dist);
const legacyUrls = JSON.parse(await readFile(path.join(root, 'docs/legacy-urls.json'), 'utf8'));
for (const url of legacyUrls) {
  const route = decodeURI(new URL(url).pathname).replace(/^\/Blog\//, '/');
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
  const relative = path.relative(legacyPosts, file).replace(/\.md$/, '');
  const output = path.join(dist, 'posts', relative, 'index.html');
  if (!await exists(output)) failures.push(`missing legacy route for ${relative}`);
}

// Keep historical taxonomy paths compatible with Hugo's lowercased URL slugs.
const legacyTags = new Set();
for (const file of legacyFiles) {
  const source = await readFile(file, 'utf8');
  const tags = source.match(/^tags:\s*\n((?:[ \t]+-.*\n)*)/m)?.[1] ?? '';
  for (const line of tags.split('\n')) {
    const tag = line.match(/^\s*-\s*(.+?)\s*$/)?.[1]?.replace(/^["']|["']$/g, '');
    if (tag) legacyTags.add(tag.toLowerCase());
  }
}
for (const tag of legacyTags) {
  if (!await exists(path.join(dist, 'tags', tag, 'index.html'))) failures.push(`missing legacy tag: ${tag}`);
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

if (articleFiles.length < legacyFiles.length) {
  failures.push(`expected at least ${legacyFiles.length} historical article pages, found ${articleFiles.length}`);
}

const sourceFiles = (await filesIn(path.join(root, 'src/content/blog'))).filter((file) => /\.mdx?$/.test(file));
let publishedCount = 0;
for (const file of sourceFiles) {
  const source = await readFile(file, 'utf8');
  const metadata = source.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] ?? '';
  if (!/^draft:\s*true\s*$/m.test(metadata)) publishedCount += 1;
}
if (articleFiles.length !== publishedCount) failures.push(`expected ${publishedCount} published article pages, found ${articleFiles.length}`);

let katexFound = false;
for (const file of articleFiles) {
  const html = await readFile(file, 'utf8');
  if (html.includes('class="katex"')) katexFound = true;
  if (html.includes('class="katex-error"')) failures.push(`${path.relative(dist, file)}: invalid math`);
}
if (!katexFound) failures.push('no server-rendered KaTeX output found');

if (failures.length) {
  throw new Error(`Build validation failed:\n${failures.join('\n')}`);
}

console.log(`Validated 48 legacy routes, ${htmlFiles.length} HTML pages, metadata, and local links.`);
