import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: '/', // Root path for username.github.io sites
  // Public folder files are automatically copied to dist root
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
