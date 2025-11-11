import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { devtools } from 'globals'
// tailwind css
import tailwindcss from '@tailwindcss/vite'
// motion js
export default defineConfig({
  base: '/TaskFlow/',
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
