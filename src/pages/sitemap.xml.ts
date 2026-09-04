import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { absoluteUrl } from '../lib/urls';
import { postPath } from '../lib/posts';

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (char) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[char] ?? char);
}

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://miuyou.github.io/Blog/');
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const pages = await getCollection('pages');
  const tags = [...new Set(posts.flatMap((post) => post.data.tags))];
  const categories = [...new Set(posts.map((post) => post.data.category))];

  const entries = [
    ...['/', '/posts/', '/archives/', '/tags/', '/categories/'],
    ...pages.map((page) => `/${page.id}/`),
    ...posts.map(postPath),
    ...tags.map((tag) => `/tags/${tag}/`),
    ...categories.map((category) => `/categories/${category}/`),
  ];

  const urls = entries
    .map((entry) => `  <url><loc>${escapeXml(absoluteUrl(entry, base).href)}</loc></url>`)
    .join('\n');

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
