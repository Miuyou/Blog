import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content', 'blog');
const publicRoot = path.join(root, 'public');
const expectedPublishedPosts = 48;

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(absolute));
    if (entry.isFile() && /\.mdx?$/.test(entry.name)) files.push(absolute);
  }

  return files;
}

function frontmatter(source) {
  return source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
}

function localReferences(source) {
  return [...source.matchAll(/!?\[[^\]]*\]\((\/[^)\s]+)[^)]*\)/g)]
    .map((match) => decodeURI(match[1]));
}

const files = await markdownFiles(contentRoot);
const published = [];
const failures = [];

for (const file of files) {
  const source = await readFile(file, 'utf8');
  const data = frontmatter(source);
  const relative = path.relative(root, file);

  for (const required of ['title', 'pubDate', 'category']) {
    if (!new RegExp(`^${required}:`, 'm').test(data)) {
      failures.push(`${relative}: missing ${required}`);
    }
  }

  if (!/^draft:\s*true/m.test(data)) published.push(file);

  for (const reference of localReferences(source)) {
    const asset = path.join(publicRoot, reference.replace(/^\//, ''));
    try {
      await access(asset);
    } catch {
      failures.push(`${relative}: missing asset ${reference}`);
    }
  }
}

if (published.length !== expectedPublishedPosts) {
  failures.push(`expected ${expectedPublishedPosts} published posts, found ${published.length}`);
}

if (failures.length) {
  throw new Error(`Content validation failed:\n${failures.join('\n')}`);
}

console.log(`Validated ${published.length} published posts and their local assets.`);
