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

if (articleFiles.length !== 48) {
  failures.push(`expected 48 generated article pages, found ${articleFiles.length}`);
}

let katexFound = false;
for (const file of articleFiles) {
  if ((await readFile(file, 'utf8')).includes('class="katex"')) katexFound = true;
}
if (!katexFound) failures.push('no server-rendered KaTeX output found');

if (failures.length) {
  throw new Error(`Build validation failed:\n${failures.join('\n')}`);
}

console.log(`Validated 48 legacy routes, ${htmlFiles.length} HTML pages, metadata, and local links.`);
