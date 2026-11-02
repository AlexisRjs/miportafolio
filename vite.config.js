import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function dualModeEntryPlugin() {
  return {
    name: 'dual-mode-entry',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html
          .replace(/<script[^>]*src="\.\/*assets\/bundle\.js"[^>]*><\/script>/g, '<script type="module" src="/src/main.jsx"></script>')
          .replace(/<link[^>]*href="\.\/*assets\/index\.css"[^>]*>/g, '');
      }
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [dualModeEntryPlugin(), react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/bundle.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
