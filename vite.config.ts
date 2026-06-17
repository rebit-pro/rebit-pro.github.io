import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// rebit.pro обслуживается из корня домена (user/org Pages + кастомный домен),
// поэтому base = '/'. Для project-pages понадобился бы '/<repo>/'.
export default defineConfig({
  base: '/',
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssr: {
    noExternal: ['vuetify', '@mdi/font'],
  },
})
