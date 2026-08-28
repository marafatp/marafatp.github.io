import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: '/', // Set to root when using a custom domain
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/**/*',
          dest: 'assets'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
