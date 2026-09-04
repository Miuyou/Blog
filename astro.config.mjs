import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

const site = process.env.SITE_URL ?? 'https://miuyou.github.io/Blog/';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
