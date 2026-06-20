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
    'ReBit Studio разрабатывает сайты, интернет-магазины, приложения, чат-боты и мини-приложения (Telegram, МАКС), внедряет Битрикс24, делает интеграции и ИИ-решения для бизнеса — ИИ-чат-боты, ассистентов и автоматизацию на базе искусственного интеллекта — на PHP, 1С-Битрикс и Vue.',
  email: 'rebit-2017@yandex.ru',
  telegram: 'https://t.me/rebit_pro',
  github: 'https://github.com/rebit-pro',
  ogImage: 'https://rebit-pro.ru/og-image.png',
  sameAs: ['https://github.com/rebit-pro', 'https://t.me/rebit_pro'],
} as const

/**
 * Адрес релея, который принимает заявку с формы и пересылает её в Telegram.
 * Токен бота живёт ТОЛЬКО на сервере-релее, не в этом коде.
 * На сборке можно переопределить переменной окружения VITE_REQUEST_ENDPOINT,
 * либо замените значение по умолчанию на адрес вашего эндпоинта.
 */
export const requestEndpoint =
  import.meta.env.VITE_REQUEST_ENDPOINT || 'https://api.rebit-pro.ru/api/v1/lead'

/**
 * Параметры загрузки файла ТЗ к заявке.
 * Клиентская проверка — только для UX; настоящая валидация выполняется на сервере
 * (см. UploadedFileValidator в бэкенде rebit.notification).
 */
export const leadFile = {
  /** Максимальный размер файла, МБ. Согласован с серверным REBIT_NOTIFICATION_LEAD_MAX_FILE_MB. */
  maxSizeMb: 15,
  /** Значение атрибута accept для <input type="file">. */
  accept: '.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.png,.jpg,.jpeg',
  /** Разрешённые расширения (нижний регистр, без точки) — для клиентской проверки. */
  extensions: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'zip', 'png', 'jpg', 'jpeg'],
} as const

export const leadFileMaxBytes = leadFile.maxSizeMb * 1024 * 1024

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
    title: 'ReBit Studio — сайты, Bitrix, интеграции и ИИ для бизнеса',
    description: siteConfig.description,
  },
  services: {
    title: 'Услуги ReBit Studio — сайты, боты, Битрикс24, интеграции и ИИ',
    description:
      'Разработка сайтов и магазинов, приложений, чат-ботов и мини-приложений для Telegram и МАКС, ИИ-боты и автоматизация бизнес-процессов с искусственным интеллектом, внедрение Битрикс24, доработка 1С-Битрикс и интеграции.',
  },
  prices: {
    title: 'Услуги и цены — разработка сайта, интернет-магазина и Bitrix',
    description:
      'Стартовые цены на сайт под ключ, интернет-магазин, доработку 1С-Битрикс и технический аудит. Оценка после диагностики.',
  },
  estimate: {
    title: 'Оценка стоимости разработки по вашему ТЗ — ReBit Studio',
    description:
      'Пришлите ТЗ — вышлем примерный план работ и смету за 1 рабочий день. Бесплатно и конфиденциально: рассчитаем стоимость сайта, магазина или доработки Bitrix.',
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
