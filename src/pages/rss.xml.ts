import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../config';
import { comparePosts, postDescription, postPath } from '../lib/posts';

export async function GET(context: { site?: URL }) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(comparePosts);

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? 'https://miuyou.github.io/Blog/',
    items: posts.map((post) => ({
      title: post.data.title,
      description: postDescription(post),
      pubDate: post.data.pubDate,
      link: postPath(post),
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: '<language>zh-CN</language>',
  });
}
