export default defineConfig({
  plugins: [vue()],
  build: {
    minify: false,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.js'),
        'badges-block': resolve(__dirname, 'src/blocks/badges-block/block.jsx'),
        'badges-block-style': resolve(__dirname, 'src/blocks/badges-block/style.css'),
        'badges-block-editor': resolve(__dirname, 'src/blocks/badges-block/editor.css'),
        'global-style': resolve(__dirname, 'src/style.css'),
      },
      output: {
        dir: resolve(__dirname, 'build/'),
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
    cssCodeSplit: true,
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
