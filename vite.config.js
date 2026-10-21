import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // En desarrollo, Vite reenvía /api al backend Express. En producción el
    // backend sirve este build (dist/) y la API desde el mismo dominio.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
