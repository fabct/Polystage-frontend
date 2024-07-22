import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const port = process.env.VITE_PORT || 8080;
const host = process.env.VITE_HOST || 'localhost';
const url = process.env.VITE_URL || `http://${host}:${port}`;

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: parseInt(port, 10),
    strictPort: true,
  },
  server: {
    port: parseInt(port, 10),
    strictPort: true,
    host: true,
  },
});