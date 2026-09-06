import type { CollectionEntry } from 'astro:content';
import { SITE } from '../config';

export type BlogPost = CollectionEntry<'blog'>;

export function tagPath(tag: string) {
  return `/tags/${tag.toLowerCase()}/`;
}

export function postSlug(post: BlogPost) {
  return post.data.slug ?? post.id;
}

export function postPath(post: BlogPost) {
  return `/posts/${postSlug(post)}/`;
}

export function postCover(post: BlogPost) {
  return post.data.cover ?? SITE.hero;
}

export function comparePosts(a: BlogPost, b: BlogPost) {
  return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Shanghai',
  }).format(date);
}

export function postDescription(post: BlogPost) {
  if (post.data.description) return post.data.description;

  return (post.body ?? '')
    .replace(/^```[\s\S]*?^```/gm, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~$\[\]{}|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 150);
}

export function groupByYear(posts: BlogPost[]) {
  return Map.groupBy(posts, (post) => new Intl.DateTimeFormat('en', { year: 'numeric', timeZone: 'Asia/Shanghai' }).format(post.data.pubDate));
}
