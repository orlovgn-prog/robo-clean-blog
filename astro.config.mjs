// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  // Укажите здесь реальный домен перед публикацией — нужно для sitemap/RSS/canonical
  site: 'https://roboclean.example',
  build: {
    format: 'directory',
  },
  integrations: [sitemap(), pagefind()],
});
