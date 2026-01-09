import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/scss/_variables.scss" as *;
          @use "@/assets/scss/_mixins.scss" as *;
          @use "@/assets/scss/_fonts.scss" as *;
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  envDir: '../',
})
