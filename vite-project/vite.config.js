import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const port = process.env.VITE_PORT || 8080; // Utilisez une valeur par défaut si non défini
const host = process.env.VITE_HOST || 'localhost';

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: port,
    strictPort: true,
   },
   server: {
    port: port,
    strictPort: true,
    host: true,
   },
})
