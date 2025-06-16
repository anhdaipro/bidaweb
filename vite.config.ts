import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
     tsconfigPaths(), // Đọc alias từ tsconfig.json
    
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // cổng backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
