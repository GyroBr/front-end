import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // allowedHosts: ['gyrobr.com', 'www.gyrobr.com'],
    allowedHosts: ['http://34.238.47.86'],
  }
})
