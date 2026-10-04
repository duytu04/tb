import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { cpSync } from 'node:fs';

// Config and media paths remain editable and compatible with the static admin.
export default defineConfig({
  base: './',
  plugins: [{
    name: 'wedding-static-files',
    closeBundle() {
      cpSync('assets', 'dist/assets', { recursive: true });
      cpSync('js/config.js', 'dist/js/config.js');
      cpSync('js/music.js', 'dist/js/music.js');
      cpSync('js/app.js', 'dist/js/app.js');
    }
  }],
  build: {
    rollupOptions: {
      input: { invitation: resolve('index.html'), admin: resolve('admin.html') }
    }
  }
});
