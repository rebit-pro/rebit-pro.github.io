/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL релея, который пересылает заявку с формы в Telegram. */
  readonly VITE_REQUEST_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  /** Счётчик Яндекс.Метрики, инициализируется в index.html. */
  ym?: (counterId: number, action: string, ...params: unknown[]) => void
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}
