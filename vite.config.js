/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/ghtk': {
        target: 'https://services.giaohangtietkiem.vn',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/ghtk/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@lang': path.resolve(__dirname, 'src/lang'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@routers': path.resolve(__dirname, 'src/routers'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
    },
  },
});
