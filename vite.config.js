import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3336,
    open: false
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
