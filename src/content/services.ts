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
      'Подключение к существующей команде или проекту',
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
    slug: 'bitrix-development',
    title: 'Разработка на 1С-Битрикс',
    h1: 'Разработка и поддержка проектов на 1С-Битрикс',
    icon: 'mdi-bitbucket',
    description:
      'Дорабатываем Bitrix-проекты: каталоги, оформление заказа, личные кабинеты, интеграции, компоненты и legacy-код.',
    tasks: [
      'Доработка каталога, корзины и оформления заказа',
      'Разработка компонентов и модулей Bitrix D7',
      'Интеграции с 1С, CRM, оплатами и доставками',
      'Аудит производительности и технического долга',
    ],
    technologies: ['1С-Битрикс', 'Bitrix D7', 'PHP', 'MySQL', 'Highload-блоки'],
    faq: [
      {
        question: 'Работаете со старым Bitrix-кодом?',
        answer:
          'Да. Сначала отделяем быстрые исправления от системных рисков, затем предлагаем безопасный план изменений.',
      },
    ],
    relatedCases: ['orteka', 'yurkas'],
  },
  {
    slug: 'frontend-vue',
    title: 'Frontend на Vue / Vuetify',
    h1: 'Frontend-разработка на Vue и Vuetify',
    icon: 'mdi-vuejs',
    description:
      'Собираем интерфейсы для лендингов, кабинетов и внутренних инструментов: Vue 3, Vuetify, Vite, адаптивная вёрстка и интеграция с API.',
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
    slug: 'integrations',
    title: 'Интеграции',
    h1: 'Интеграции с 1С, CRM, оплатами и внешними API',
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
    slug: 'devops',
    title: 'DevOps и инфраструктура',
    h1: 'DevOps-поддержка для PHP / Bitrix / Vue-проектов',
    icon: 'mdi-docker',
    description:
      'Помогаем привести окружения, сборку и деплой к предсказуемому состоянию: Docker, CI, серверы, очереди, кеши и документация.',
    tasks: [
      'Docker-окружения для разработки и staging',
      'CI/CD и сборка frontend/backend',
      'Настройка кешей, очередей и фоновых процессов',
      'Документация запуска и сопровождения',
    ],
    technologies: ['Docker', 'Docker Compose', 'GitHub Actions', 'Nginx', 'Redis', 'RabbitMQ'],
    faq: [
      {
        question: 'Можно начать с документации запуска?',
        answer:
          'Да. Часто первый полезный шаг — зафиксировать, как проект запускается, собирается и выкатывается.',
      },
    ],
    relatedCases: ['shkola7gnomov'],
  },
  {
    slug: 'audit-refactoring',
    title: 'Аудит и рефакторинг',
    h1: 'Аудит и безопасный рефакторинг legacy-проектов',
    icon: 'mdi-source-branch-sync',
    description:
      'Находим риски, узкие места и технический долг, затем улучшаем систему итерационно без опасной полной переписи.',
    tasks: [
      'Аудит архитектуры, кода и производительности',
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
]

export function findService(slug: string): ServiceItem | undefined {
  return services.find((item) => item.slug === slug)
}

