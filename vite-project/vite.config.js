import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const port = parseInt(process.env.VITE_PORT, 10) || 8080;
const host = process.env.VITE_HOST || 'localhost';

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
})
