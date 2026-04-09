import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Forge-landing-page/',
  server: {
    port: 5180,
  },
  build: {
    outDir: 'dist',
  },
})
