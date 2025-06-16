import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    
     tsconfigPaths(), // Đọc alias từ tsconfig.json
    
  ],
  base: '/', // hoặc bỏ dòng này cũng được
  server: {
    proxy: {
      '/api': {
        target: 'https://bidanode.onrender.com', // cổng backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
