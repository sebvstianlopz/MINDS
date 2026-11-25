import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Single-file build so the experience can be published as one page; public/ assets are copied beside it.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: { target: 'es2020', chunkSizeWarningLimit: 2000 },
});
