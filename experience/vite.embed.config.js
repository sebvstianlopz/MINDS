import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import prefixer from 'postcss-prefix-selector';

// Store-homepage build: one ES module (src/embed.jsx) with its CSS inlined and scoped under .mx,
// so the journey's styles never touch the store's own (.btn, main, body…).
export default defineConfig({
  plugins: [react()],
  define: { 'process.env.NODE_ENV': '"production"' },
  css: {
    postcss: {
      plugins: [prefixer({
        prefix: '.mx',
        transform(prefix, selector, prefixed) {
          if (selector === ':root' || selector === 'html' || selector === 'body') return prefix;
          return prefixed;
        },
      })],
    },
  },
  build: {
    outDir: 'dist-embed',
    emptyOutDir: true,
    target: 'es2020',
    minify: 'esbuild',
    chunkSizeWarningLimit: 2000,
    lib: { entry: 'src/embed.jsx', formats: ['es'], fileName: () => 'mind.js' },
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
