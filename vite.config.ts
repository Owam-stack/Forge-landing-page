import { defineConfig } from 'vite'

export default defineConfig({
  base: '/forge/',
  server: {
    port: 5180,
  },
  build: {
    outDir: 'dist',
  },
})
