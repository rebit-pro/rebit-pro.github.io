import { createReBitApp } from './app'

import '@mdi/font/css/materialdesignicons.css'
import './styles/landing.scss'

const { app, router } = createReBitApp()

router.isReady().then(() => {
  app.mount('#app')
})
