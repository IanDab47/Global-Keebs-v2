import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = resolve(__dirname, 'src');

console.log(root);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'main.jsx'),
        home: resolve(root, 'pages', 'home/index.jsx'),
      },
    },
  },
});
