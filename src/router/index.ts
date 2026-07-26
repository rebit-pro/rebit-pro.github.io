import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router'
import { routeMeta, siteConfig } from '@/config/site'
import { articles } from '@/content/articles'
import { cases } from '@/content/cases'
import { services } from '@/content/services'
import { portfolioItems } from '@/content/portfolio'

export const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: { ...routeMeta.home, hasHomeFaqJsonLd: true },
  },
  {
    path: '/services/',
    name: 'services',
    component: () => import('@/pages/ServicesIndexPage.vue'),
    meta: routeMeta.services,
  },
  {
    // Посадочная страница-оффер «оценка по ТЗ». Не входит в массив services,
    // поэтому объявляем маршрут явно (до динамических /services/:slug/).
    path: '/services/project-estimate/',
    name: 'estimate',
    component: () => import('@/pages/EstimatePage.vue'),
    meta: { ...routeMeta.estimate, hasEstimateJsonLd: true },
  },
  {
    path: '/prices/',
    name: 'prices',
    component: () => import('@/pages/PricesPage.vue'),
    meta: routeMeta.prices,
  },
  {
    path: '/portfolio/',
    name: 'portfolio',
    component: () => import('@/pages/PortfolioIndexPage.vue'),
    meta: routeMeta.portfolio,
  },
  ...portfolioItems.map((item) => ({
    path: `/portfolio/${item.slug}/`,
    name: `portfolio-${item.slug}`,
    component: () => import('@/pages/PortfolioItemPage.vue'),
    props: { slug: item.slug },
    meta: {
      title: `${item.title} — ReBit Studio`,
      description: item.summary,
    },
  })),
  ...services.map((service) => ({
    path: `/services/${service.slug}/`,
    name: `service-${service.slug}`,
    component: () => import('@/pages/ServicePage.vue'),
    props: { slug: service.slug },
    meta: {
      title: service.metaTitle ?? `${service.title} — ReBit Studio`,
      description: service.metaDescription ?? service.description,
      serviceSlug: service.slug,
    },
  })),
  {
    path: '/cases/',
    name: 'cases',
    component: () => import('@/pages/CasesIndexPage.vue'),
    meta: routeMeta.cases,
  },
  ...cases.map((caseItem) => ({
    path: `/cases/${caseItem.slug}/`,
    name: `case-${caseItem.slug}`,
    component: () => import('@/pages/CasePage.vue'),
    props: { slug: caseItem.slug },
    meta: {
      title: `${caseItem.title} — ReBit Studio`,
      description: caseItem.description,
    },
  })),
  {
    path: '/about/',
    name: 'about',
    component: () => import('@/pages/AboutPage.vue'),
    meta: routeMeta.about,
  },
  {
    path: '/blog/',
    name: 'blog',
    component: () => import('@/pages/BlogIndexPage.vue'),
    meta: routeMeta.blog,
  },
  ...articles
    .filter((article) => !article.link)
    .map((article) => ({
      path: `/blog/${article.slug}/`,
      name: `article-${article.slug}`,
      component: () => import('@/pages/ArticlePage.vue'),
      props: { slug: article.slug },
      meta: {
        title: article.metaTitle,
        description: article.metaDescription,
        articleSlug: article.slug,
      },
    })),
  {
    path: '/contacts/',
    name: 'contacts',
    component: () => import('@/pages/ContactsPage.vue'),
    meta: routeMeta.contacts,
  },
  {
    path: '/privacy/',
    name: 'privacy',
    component: () => import('@/pages/PrivacyPage.vue'),
    meta: routeMeta.privacy,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: {
      title: 'Страница не найдена — ReBit Studio',
      description: 'Такой страницы нет. Вернитесь на главную или выберите нужный раздел сайта ReBit Studio.',
    },
  },
]

export const prerenderPaths = routes
  .map((route) => route.path)
  .filter((path) => !path.includes(':')) as readonly string[]

export function createAppRouter(ssr = false) {
  const router = createRouter({
    history: ssr ? createMemoryHistory(import.meta.env.BASE_URL) : createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to) {
      if (to.hash) {
        return { el: to.hash, behavior: 'smooth' }
      }

      return { top: 0 }
    },
  })

  if (!ssr && typeof window !== 'undefined') {
    const githubPagesRedirect = sessionStorage.getItem('rebit.redirect')

    if (githubPagesRedirect) {
      sessionStorage.removeItem('rebit.redirect')
      router.replace(githubPagesRedirect)
    }
  }

  if (!ssr && typeof document !== 'undefined') {
    router.afterEach((to) => {
      const { title, description, canonical } = getRouteSeo(to.path, to.meta)

      document.title = title
      setMeta('description', description)
      setMeta('og:title', title, 'property')
      setMeta('og:description', description, 'property')
      setMeta('og:url', canonical, 'property')
      setMeta('twitter:title', title)
      setMeta('twitter:description', description)
      setCanonical(canonical)
    })
  }

  return router
}

export function getRouteSeo(path: string, meta: RouteRecordRaw['meta'] = {}) {
  const title = typeof meta.title === 'string' ? meta.title : routeMeta.home.title
  const description = typeof meta.description === 'string' ? meta.description : routeMeta.home.description
  const canonical = new URL(path, siteConfig.domain).toString()

  return { title, description, canonical }
}

function setMeta(name: string, content: string, key: 'name' | 'property' = 'name'): void {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${name}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(key, name)
    document.head.append(element)
  }

  element.content = content
}

function setCanonical(href: string): void {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.append(element)
  }

  element.href = href
}
