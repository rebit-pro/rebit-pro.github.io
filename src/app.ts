import { createApp, createSSRApp } from 'vue'
import type { App as VueApp } from 'vue'
import App from './App.vue'
import { vuetify } from './plugins/vuetify'
import { createAppRouter } from './router'

export function createReBitApp(ssr = false): {
  readonly app: VueApp
  readonly router: ReturnType<typeof createAppRouter>
} {
  const app = ssr ? createSSRApp(App) : createApp(App)
  const router = createAppRouter(ssr)

  app.use(router)
  app.use(vuetify)

  return { app, router }
}

