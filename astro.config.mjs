import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import { remarkBaseUrl } from './src/lib/remark-base-url.ts';

// IMPORTANT: Update BASE_URL_PROD for your deployment
// For GitHub Pages: '/repository-name/'
// For custom domain: '/'
const BASE_URL_PROD = '/behivest/';

// Determine base URL based on command
// - 'npm run dev' uses '/' for local development
// - 'npm run build' uses BASE_URL_PROD for production
const isDev = process.argv.includes('dev');
const BASE_URL = isDev ? '/' : BASE_URL_PROD;

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
