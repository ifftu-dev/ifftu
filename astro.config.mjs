// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ifftu.dev',
  // Pages build to /path/index.html and are served at /path/. Enforce trailing
  // slashes so internal links hit the final URL directly instead of taking a
  // blocking 301 (/path -> /path/) on every client-side navigation.
  trailingSlash: 'always',
  integrations: [sitemap()],
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true,
  },
});
