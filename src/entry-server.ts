import { renderToString } from '@vue/server-renderer'
import { siteConfig } from './config/site'
import { articleJsonLd, findArticle } from './content/articles'
import { estimateJsonLd } from './content/estimate'
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
  const head = buildHead(route.meta)

  return { html, head, ...seo }
}

function buildHead(meta: Record<string, unknown>): string {
  if (meta.hasEstimateJsonLd === true) {
    return estimateJsonLd(siteConfig.domain, siteConfig.name)
  }

  const articleSlug = typeof meta.articleSlug === 'string' ? meta.articleSlug : undefined

  if (!articleSlug) {
    return ''
  }

  const article = findArticle(articleSlug)

  if (!article) {
    return ''
  }

  return articleJsonLd(article, siteConfig.domain, siteConfig.name)
}
