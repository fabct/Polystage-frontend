import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const port = parseInt(process.env.VITE_PORT, 10) || 8080;
const host = process.env.VITE_HOST || 'localhost';
const proxy = process.env.VITE_PROXY_URL || 'http://localhost';

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: port,
    strictPort: true,
    host: host
   },
   server: {
    port: port,
    strictPort: true,
    host: host,
   },
   proxy: {
        '/api': {
        target: proxy,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
  },
})
