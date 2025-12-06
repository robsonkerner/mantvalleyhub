import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        actions: resolve(__dirname, 'actions.html'),
        partners: resolve(__dirname, 'partners.html'),
        blog: resolve(__dirname, 'blog.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
