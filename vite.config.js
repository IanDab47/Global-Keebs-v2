import { resolve, join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const proxyOptions = {
  target: `http://127.0.0.1:${process.env.PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false,
  configure: (proxy) => {
    proxy.on('error', (err) => {
      console.log('proxy error', err);
    });
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  root: join(__dirname, 'src'),
  plugins: [react()],
  build: {
    sourcemap: process.env.NODE_ENV !== 'production',
  },
  server: {
    host: 'localhost',
    port: 3000,
    proxy: {
      '^/(\\?.*)?$': proxyOptions,
      '^/api(/|(\\?.*)?$)': proxyOptions,
    },
  },
});
