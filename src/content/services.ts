import type { FaqItem } from './faq'

export interface ServiceItem {
  readonly slug: string
  readonly title: string
  readonly h1: string
  readonly icon: string
  readonly description: string
  readonly tasks: readonly string[]
  readonly technologies: readonly string[]
  readonly faq: readonly FaqItem[]
  readonly relatedCases: readonly string[]
}

export const services: readonly ServiceItem[] = [
  {
    slug: 'website-development',
    title: 'Сайт под ключ',
    h1: 'Разработка сайта под ключ для бизнеса',
    icon: 'mdi-web',
    description:
      'Проектируем и запускаем сайт компании: структура, дизайн, frontend, формы заявок, базовая аналитика и SEO-основа для продвижения.',
    tasks: [
      'Разработка структуры страниц под услуги, кейсы и заявки',
      'Адаптивный интерфейс на Vue / Vuetify или другом подходящем стеке',
      'Формы обращения, цели аналитики и техническая SEO-база',
      'Подготовка сайта к дальнейшему развитию и контенту',
    ],
    technologies: ['Vue 3', 'Vuetify', 'Vite', 'TypeScript', 'SSR/SSG', 'PHP'],
    faq: [
      {
        question: 'Можно сразу заложить SEO-структуру?',
        answer:
          'Да. Начинаем с запросов бизнеса, структуры услуг, будущих статей, портфолио и технической базы: title, description, canonical, sitemap и schema.org.',
      },
    ],
    relatedCases: ['yurkas', 'shkola7gnomov'],
  },
  {
    slug: 'ecommerce-development',
    title: 'Интернет-магазин и каталог',
    h1: 'Разработка интернет-магазина и каталога товаров',
    icon: 'mdi-cart-outline',
    description:
      'Делаем каталоги и магазины с фильтрами, карточками товаров, корзиной, оформлением заказа и интеграциями с учётными системами.',
    tasks: [
      'Категории, фильтры, поиск и карточки товаров',
      'Корзина, оформление заказа и сценарии заявки',
      'Интеграции с 1С, CRM, оплатами, доставками и API',
      'Оптимизация каталога под скорость, индексацию и удобство выбора',
    ],
    technologies: ['1С-Битрикс', 'PHP', 'Vue', 'MySQL', 'REST API', '1С'],
    faq: [
      {
        question: 'Можно сделать каталог без онлайн-оплаты?',
        answer:
          'Да. Для B2B и сложных товаров часто достаточно каталога с заявкой, подбором, фильтрами и передачей лида в CRM.',
      },
    ],
    relatedCases: ['orteka', 'shkola7gnomov', 'yurkas'],
  },
  {
    slug: 'bitrix-development',
    title: 'Разработка на 1С-Битрикс',
    h1: 'Разработка и поддержка сайтов на 1С-Битрикс',
    icon: 'mdi-bitbucket',
    description:
      'Дорабатываем Bitrix-проекты: каталоги, оформление заказа, личные кабинеты, интеграции, компоненты Bitrix D7 и legacy-код.',
    tasks: [
      'Доработка каталога, корзины и оформления заказа',
      'Разработка компонентов и модулей Bitrix D7',
      'Интеграции с 1С, CRM, оплатами и доставками',
      'Аудит производительности, SEO-техники и технического долга',
    ],
    technologies: ['1С-Битрикс', 'Bitrix D7', 'PHP', 'MySQL', 'Highload-блоки'],
    faq: [
      {
        question: 'Работаете со старым Bitrix-кодом?',
        answer:
          'Да. Сначала отделяем быстрые исправления от системных рисков, затем предлагаем безопасный план изменений без полной переписи проекта.',
      },
    ],
    relatedCases: ['orteka', 'yurkas'],
  },
  {
    slug: 'integrations',
    title: 'Интеграции с 1С, CRM и API',
    h1: 'Интеграции сайта с 1С, CRM, оплатами и внешними API',
    icon: 'mdi-connection',
    description:
      'Проектируем устойчивый обмен данными: очереди, повторы, логирование, контроль ошибок и понятные точки поддержки.',
    tasks: [
      'Интеграции с 1С, CRM и внешними API',
      'Обработка ошибок и повторные попытки',
      'Логирование и мониторинг обмена',
      'Стабилизация уже работающих интеграций',
    ],
    technologies: ['REST API', 'webhooks', 'RabbitMQ', 'Redis', 'Bitrix D7', 'CRM'],
    faq: [
      {
        question: 'Что делать, если текущая интеграция часто ломается?',
        answer:
          'Начинаем с диагностики: где теряются ошибки, как устроены повторы, есть ли логирование и понятное состояние обмена.',
      },
    ],
    relatedCases: ['shkola7gnomov'],
  },
  {
    slug: 'frontend-vue',
    title: 'Frontend на Vue / Vuetify',
    h1: 'Frontend-разработка на Vue и Vuetify',
    icon: 'mdi-vuejs',
    description:
      'Собираем интерфейсы для лендингов, кабинетов, каталогов и внутренних инструментов: Vue 3, Vuetify, Vite, адаптивная вёрстка и интеграция с API.',
    tasks: [
      'Разработка интерфейсов на Vue 3',
      'Интеграция с backend API',
      'Дизайн-система на Vuetify',
      'Оптимизация UX, доступности и производительности',
    ],
    technologies: ['Vue 3', 'Vuetify', 'Vite', 'TypeScript', 'Sass'],
    faq: [
      {
        question: 'Можно развивать существующий Vue-проект?',
        answer:
          'Да. Разбираем текущие компоненты, состояние, зависимости и предлагаем план постепенного улучшения.',
      },
    ],
    relatedCases: [],
  },
  {
    slug: 'backend-development',
    title: 'Backend-разработка',
    h1: 'Backend-разработка для сложных цифровых продуктов',
    icon: 'mdi-server',
    description:
      'Проектируем и развиваем backend-логику на PHP: бизнес-правила, API, интеграции, фоновые процессы и поддерживаемую архитектуру.',
    tasks: [
      'Разработка бизнес-логики и API',
      'Модульная архитектура и границы ответственности',
      'Оптимизация SQL, кеширования и фоновых задач',
      'Подключение к существующему проекту',
    ],
    technologies: ['PHP 8', 'Laravel', 'Symfony', 'Slim', 'MySQL', 'Redis', 'RabbitMQ'],
    faq: [
      {
        question: 'Можно подключиться к существующему backend-проекту?',
        answer:
          'Да. Начинаем с короткого аудита контекста, фиксируем риски и только потом берём задачи в работу.',
      },
    ],
    relatedCases: ['shkola7gnomov', 'yurkas'],
  },
  {
    slug: 'audit-refactoring',
    title: 'Аудит и рефакторинг',
    h1: 'Технический аудит и безопасный рефакторинг сайта',
    icon: 'mdi-source-branch-sync',
    description:
      'Находим риски, узкие места и технический долг, затем улучшаем систему итерационно без опасной полной переписи.',
    tasks: [
      'Аудит архитектуры, кода, SEO-техники и производительности',
      'Карта рисков и план улучшений',
      'Выделение модулей и снижение связности',
      'Постепенный рефакторинг без остановки разработки',
    ],
    technologies: ['PHP', 'Bitrix D7', 'DDD', 'Clean Architecture', 'SQL', 'профилирование'],
    faq: [
      {
        question: 'Нужно ли переписывать legacy с нуля?',
        answer:
          'Обычно нет. Сначала ищем критичные границы, стабилизируем изменения и двигаемся небольшими проверяемыми шагами.',
      },
    ],
    relatedCases: ['orteka', 'yurkas'],
  },
  {
    slug: 'support-development',
    title: 'Поддержка и развитие сайта',
    h1: 'Поддержка и развитие сайта после запуска',
    icon: 'mdi-shield-check-outline',
    description:
      'Поддерживаем сайт после релиза: исправления, небольшие доработки, контроль интеграций, аналитика, документация и план развития.',
    tasks: [
      'Регулярные доработки и исправления',
      'Контроль интеграций, форм и критичных сценариев',
      'Планирование новых разделов и SEO-страниц',
      'Документация изменений и технических решений',
    ],
    technologies: ['PHP', 'Vue', 'Bitrix D7', 'Docker', 'Analytics', 'SEO'],
    faq: [
      {
        question: 'Можно начать с небольшого пакета поддержки?',
        answer:
          'Да. Обычно начинаем с диагностики и короткого списка приоритетов, чтобы поддержка быстро дала измеримый результат.',
      },
    ],
    relatedCases: ['orteka', 'shkola7gnomov'],
  },
]

export function findService(slug: string): ServiceItem | undefined {
  return services.find((item) => item.slug === slug)
}
