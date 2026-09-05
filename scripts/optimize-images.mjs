import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content', 'blog');
const publicRoot = path.join(root, 'public');

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

function optimizedPath(sourcePath) {
  const relative = sourcePath.replace(/^\/images\//, '').replace(/\.[^.]+$/, '.webp');
  return `/images/optimized/${relative}`;
}

async function optimize(sourcePath, targetPath) {
  const source = path.join(publicRoot, sourcePath.replace(/^\//, ''));
  const target = path.join(publicRoot, targetPath.replace(/^\//, ''));

  await mkdir(path.dirname(target), { recursive: true });
  await sharp(source)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 84, smartSubsample: true })
    .toFile(target);

  return {
    before: (await stat(source)).size,
    after: (await stat(target)).size,
  };
}

const files = await markdownFiles(contentRoot);
const conversions = new Map();

for (const file of files) {
  const source = await readFile(file, 'utf8');
  const cover = source.match(/^cover:\s*["']?([^"'\n]+)["']?/m)?.[1];
  if (!cover || cover.startsWith('/images/optimized/')) continue;

  const target = optimizedPath(cover);
  if (!conversions.has(cover)) conversions.set(cover, await optimize(cover, target));

  await writeFile(file, source.replace(
    /^cover:.*$/m,
    `cover: ${JSON.stringify(target)}`,
  ));
}

const heroSource = '/images/hero/home-bg.png';
const heroTarget = optimizedPath(heroSource);
if (!conversions.has(heroSource)) {
  conversions.set(heroSource, await optimize(heroSource, heroTarget));
}

const totals = [...conversions.values()].reduce(
  (sum, item) => ({ before: sum.before + item.before, after: sum.after + item.after }),
  { before: 0, after: 0 },
);

console.log(
  `Optimized ${conversions.size} images: ${(totals.before / 1024 / 1024).toFixed(1)} MiB -> ${(totals.after / 1024 / 1024).toFixed(1)} MiB.`,
);
