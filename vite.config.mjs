import { defineConfig } from 'vite';

// Keep the existing static hosting and admin/config workflow working unchanged.
export default defineConfig({
  base: './',
  build: {
    outDir: 'js/generated',
    emptyOutDir: true,
    lib: { entry: 'js/silk.js', formats: ['es'], fileName: () => 'silk.js' },
    rollupOptions: { output: { chunkFileNames: '[name]-[hash].js' } },
    minify: 'esbuild'
  }
});
