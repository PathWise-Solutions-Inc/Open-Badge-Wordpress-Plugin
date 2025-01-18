import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.js'),
        'badges-block': resolve(__dirname, 'src/blocks/badges-block/block.jsx'),
        'badges-block-style': resolve(__dirname, 'src/blocks/badges-block/style.css'),
        'badges-block-editor': resolve(__dirname, 'src/blocks/badges-block/editor.css'),
        'global-style': resolve(__dirname, 'src/style.css'), // Include the global style file
      },
      output: {
        dir: resolve(__dirname, 'build/'),
        entryFileNames: 'assets/[name].js', // Predictable filenames
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]', // Predictable asset names
      },
    },
    cssCodeSplit: true, // Separate CSS from JS
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
