import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    // three.js is its own lazily loaded chunk (~130 KB gzipped), fetched after first paint.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: { three: ['three'] },
      },
    },
  },
});
