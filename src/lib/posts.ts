import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export function postSlug(post: BlogPost) {
  return post.data.slug ?? post.id;
}

export function postPath(post: BlogPost) {
  return `/posts/${postSlug(post)}/`;
}

export function comparePosts(a: BlogPost, b: BlogPost) {
  return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
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
  return Map.groupBy(posts, (post) => String(post.data.pubDate.getFullYear()));
}
