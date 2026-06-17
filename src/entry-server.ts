import { renderToString } from '@vue/server-renderer'
import { createReBitApp } from './app'
import { getRouteSeo, prerenderPaths } from './router'

export { prerenderPaths }

export async function render(url: string) {
  const { app, router } = createReBitApp(true)

  await router.push(url)
  await router.isReady()

  const route = router.currentRoute.value
  const html = await renderToString(app)
  const seo = getRouteSeo(route.path, route.meta)

  return { html, ...seo }
}

