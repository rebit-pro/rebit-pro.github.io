export interface SiteNavLink {
  readonly title: string
  readonly href: string
}

export interface SiteMeta {
  readonly title: string
  readonly description: string
}

export const siteConfig = {
  name: 'ReBit Studio',
  legalName: 'ReBit Studio',
  founder: 'Александр Тарасов',
  domain: 'https://rebit-pro.ru',
  tagline: 'Разработка, поддержка, развитие',
  description:
    'ReBit Studio разрабатывает сайты под ключ, интернет-магазины, каталоги и Bitrix-проекты: PHP, Vue, интеграции, аудит, оптимизация и безопасный рефакторинг legacy.',
  email: 'rebit-2017@yandex.ru',
  telegram: 'https://t.me/rebit_pro',
  github: 'https://github.com/rebit-pro',
  ogImage: 'https://rebit-pro.ru/og-image.png',
  sameAs: ['https://github.com/rebit-pro', 'https://t.me/rebit_pro'],
} as const

export const mainNavLinks: readonly SiteNavLink[] = [
  { title: 'Услуги', href: '/services/' },
  { title: 'Цены', href: '/prices/' },
  { title: 'Портфолио', href: '/portfolio/' },
  { title: 'Кейсы', href: '/cases/' },
  { title: 'Блог', href: '/blog/' },
  { title: 'Контакты', href: '/contacts/' },
]

export const routeMeta = {
  home: {
    title: 'ReBit Studio — сайты под ключ, Bitrix, магазины и интеграции',
    description: siteConfig.description,
  },
  services: {
    title: 'Услуги ReBit Studio — сайт под ключ, магазин, Bitrix и интеграции',
    description:
      'Разработка сайта под ключ, интернет-магазина, каталога, доработка 1С-Битрикс, интеграции, аудит и поддержка для бизнеса.',
  },
  prices: {
    title: 'Услуги и цены — разработка сайта, интернет-магазина и Bitrix',
    description:
      'Стартовые цены на сайт под ключ, интернет-магазин, доработку 1С-Битрикс и технический аудит. Оценка после диагностики.',
  },
  portfolio: {
    title: 'Портфолио ReBit Studio — сайты, каталоги и интернет-магазины',
    description:
      'Примеры проектов ReBit Studio: интернет-магазины, каталоги товаров, сайты под ключ и интерфейсы для бизнеса.',
  },
  cases: {
    title: 'Кейсы ReBit Studio — PHP, Bitrix, интеграции и legacy',
    description:
      'Проектные сценарии и кейсы ReBit Studio: ускорение Bitrix, интеграции с CRM/API, рефакторинг legacy и архитектурное сопровождение.',
  },
  about: {
    title: 'О ReBit Studio — инженерный подход к цифровым продуктам',
    description:
      'ReBit Studio помогает бизнесу и командам развивать сложные PHP, Bitrix и Vue-проекты через архитектуру, аудит и аккуратную разработку.',
  },
  blog: {
    title: 'Блог ReBit Studio — Bitrix, PHP, интеграции и legacy',
    description:
      'Экспертные материалы ReBit Studio о производительности Bitrix, интеграциях, архитектуре и безопасном рефакторинге legacy PHP.',
  },
  contacts: {
    title: 'Контакты ReBit Studio — обсудить проект',
    description:
      'Свяжитесь с ReBit Studio, чтобы обсудить разработку, аудит, интеграцию, оптимизацию или сопровождение PHP / Bitrix / Vue-проекта.',
  },
  privacy: {
    title: 'Политика конфиденциальности — ReBit Studio',
    description: 'Краткая политика обработки обращений и контактных данных на сайте ReBit Studio.',
  },
} satisfies Record<string, SiteMeta>
