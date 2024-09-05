import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue()
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.js'),
      },
      output: {
        dir: resolve(__dirname, 'build/'),
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/wp-content/plugins/open-badge-factory-pws/': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
