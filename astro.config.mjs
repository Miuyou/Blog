import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

const site = process.env.SITE_URL ?? 'https://miuyou.github.io/Blog/';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, {
        // Historical notes intentionally contain Chinese labels inside formulas.
        strict: (code) => code === 'unicodeTextInMathMode' ? 'ignore' : 'warn',
      }]],
      shikiConfig: {
        theme: 'github-dark',
        wrap: true,
      },
    }),
  },
});
