import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 
import tailwindcss from '@tailwindcss/vite' // conecta el generador de tailwind al proceso de build de vite, sin el el @import "tailwindcss" del CSS no se expandiría a nada

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),          // permite que Vite entienda archivos .vue
    vueDevTools(),  // panel de depuración de Vue en el navegador
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
