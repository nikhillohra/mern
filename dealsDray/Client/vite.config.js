import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000, // Change the port to 3000
    proxy: {
      // Proxy API requests to a different server
      '/api': {
        target: 'http://localhost:8080', // Change the target server address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  optimizeDeps: {
    include: ['jsonwebtoken'],
  },
});
