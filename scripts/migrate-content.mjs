import { mkdir, readdir, readFile, access, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sourcePosts = path.join(root, 'content', 'posts');
const targetPosts = path.join(root, 'src', 'content', 'blog');
const targetPages = path.join(root, 'src', 'content', 'pages');

function splitMarkdown(source) {
  const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
  if (!match) throw new Error('Markdown file has no YAML frontmatter');

  return {
    frontmatter: match[1],
    body: source.slice(match[0].length),
  };
}

function field(frontmatter, name) {
  return frontmatter.match(new RegExp(`^${name}:.*$`, 'm'))?.[0];
}

function listField(frontmatter, name) {
  const lines = frontmatter.split(/\r?\n/);
  const start = lines.findIndex((line) => line === `${name}:`);
  if (start === -1) return [];

  const result = [lines[start]];
  for (let index = start + 1; index < lines.length; index += 1) {
    if (!/^\s+-\s+/.test(lines[index])) break;
    result.push(lines[index]);
  }
  return result;
}

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(absolute));
    if (entry.isFile() && entry.name.endsWith('.md')) files.push(absolute);
  }

  return files.sort();
}

function migratedPost(source, category) {
  const { frontmatter, body } = splitMarkdown(source);
  const title = field(frontmatter, 'title');
  const date = field(frontmatter, 'date');
  const cover = field(frontmatter, 'cover');
  const tags = listField(frontmatter, 'tags');

  const nextFrontmatter = [
    '---',
    title,
    date?.replace(/^date:/, 'pubDate:'),
    `category: ${JSON.stringify(category)}`,
    ...tags,
    cover?.replace(/^(cover:\s*["']?)(?!\/)/, '$1/'),
    'draft: false',
    '---',
  ].filter(Boolean).join('\n');

  const nextBody = body.replaceAll('(../images/', '(/images/');
  return `${nextFrontmatter}\n\n${nextBody.replace(/^\s+/, '')}`;
}

function migratedPage(source) {
  const { frontmatter, body } = splitMarkdown(source);
  const title = field(frontmatter, 'title');
  const date = field(frontmatter, 'date');

  const nextFrontmatter = [
    '---',
    title,
    date?.replace(/^date:/, 'pubDate:'),
    '---',
  ].filter(Boolean).join('\n');

  return `${nextFrontmatter}\n\n${body.replace(/^\s+/, '')}`;
}

for (const directory of [targetPosts, targetPages]) {
  if (await access(directory).then(() => true, () => false)) {
    throw new Error(`One-time migration refuses to overwrite existing content: ${directory}`);
  }
}
await mkdir(targetPosts, { recursive: true });
await mkdir(targetPages, { recursive: true });

const postFiles = (await markdownFiles(sourcePosts))
  .filter((file) => path.basename(file) !== '_index.md');

for (const sourceFile of postFiles) {
  const relative = path.relative(sourcePosts, sourceFile);
  const category = relative.split(path.sep)[0];
  const targetFile = path.join(targetPosts, relative);

  await mkdir(path.dirname(targetFile), { recursive: true });
  await writeFile(targetFile, migratedPost(await readFile(sourceFile, 'utf8'), category));
}

for (const pageName of ['about.md', 'friend.md', 'friends.md']) {
  const sourceFile = path.join(root, 'content', pageName);
  const targetFile = path.join(targetPages, pageName);
  await writeFile(targetFile, migratedPage(await readFile(sourceFile, 'utf8')));
}

console.log(`Migrated ${postFiles.length} posts and 3 standalone pages.`);
