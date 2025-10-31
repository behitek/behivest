import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import { remarkBaseUrl } from './src/lib/remark-base-url.ts';

// Use '/' for local development, '/behivest/' for production
const BASE_URL = process.env.NODE_ENV === 'production' ? '/behivest/' : '/';

// https://astro.build/config
export default defineConfig({
  site: 'https://behitek.github.io',
  // IMPORTANT: Update 'base' to match your GitHub repository name
  // Example: If repo is github.com/username/behivest, use '/behivest/' (with trailing slash)
  // For custom domain or root deployment, set to '/'
  base: BASE_URL,
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
    remarkPlugins: [[remarkBaseUrl, { baseUrl: BASE_URL }]],
  },
});
