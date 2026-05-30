export interface NavLink {
  readonly title: string
  readonly target: string
}

export interface Metric {
  readonly value: string
  readonly title: string
  readonly label: string
  readonly icon: string
  readonly color: string
}

export interface ArchitecturePrinciple {
  readonly title: string
  readonly icon: string
  readonly description: string
}

export interface StackGroup {
  readonly category: string
  readonly icon: string
  readonly items: readonly string[]
}

export interface ExperienceItem {
  readonly period: string
  readonly role: string
  readonly description: string
}

export interface Project {
  readonly title: string
  readonly description: string
  readonly tags: readonly string[]
  readonly link?: string
}

export interface Article {
  readonly title: string
  readonly excerpt: string
  readonly readingTime: string
  readonly link?: string
}

export interface ContactLink {
  readonly label: string
  readonly value: string
  readonly icon: string
  readonly href: string
}

export const profile = {
  name: 'Александр Тарасов',
  role: 'PHP / Bitrix Архитектор',
  experience: '10+ лет опыта',
  tagline: 'Надёжная архитектура. Производительность. Масштабируемость.',
  summary:
    'Проектирую модульные системы на Bitrix и PHP с DDD-границами, строю ' +
    'сложные интеграции и DevOps-процессы — от чистого кода до деплоя.',
} as const

export const navLinks: readonly NavLink[] = [
  { title: 'О себе', target: 'about' },
  { title: 'Архитектура', target: 'architecture' },
  { title: 'Стек', target: 'stack' },
  { title: 'Проекты', target: 'projects' },
  { title: 'Статьи', target: 'articles' },
  { title: 'Контакты', target: 'contact' },
]

export interface HeroBadge {
  readonly title: string
  readonly icon: string
}

// Четыре направления с баннера — короткие «опорные» чипы под заголовком hero.
export const heroBadges: readonly HeroBadge[] = [
  { title: 'Архитектура', icon: 'mdi-cube-outline' },
  { title: 'Интеграции', icon: 'mdi-transit-connection-variant' },
  { title: 'DevOps', icon: 'mdi-infinity' },
  { title: 'Результат', icon: 'mdi-target' },
]

// «Решаю задачи, где нужны» — буллеты ценности (тоже с баннера).
export const heroSolves: readonly string[] = [
  'Высокая производительность и отказоустойчивость',
  'Гибкая расширяемость и лёгкая поддержка',
  'Безопасность и контроль изменений',
  'Интеграции любой сложности',
]

export const about = {
  summary:
    'Senior PHP-инженер, сфокусированный на поддерживаемых enterprise-системах. ' +
    'Проектирую доменно-ориентированные архитектуры, расцепляю legacy-код и ' +
    'превращаю монолиты в чистые модульные платформы, которые команда может ' +
    'безопасно развивать.',
  highlights: [
    'Domain-Driven Design в реальных крупных кодовых базах',
    'Событийные интеграции на RabbitMQ с надёжной доставкой сообщений',
    'Контейнеризованная поставка: Docker, Docker Compose, Docker Swarm',
    'Прагматичный рефакторинг legacy-Bitrix в чистую архитектуру',
  ],
} as const

export const architecturePrinciples: readonly ArchitecturePrinciple[] = [
  {
    title: 'Domain Driven Design',
    icon: 'mdi-shape-outline',
    description: 'Единый язык, агрегаты и ограниченные контексты в основе системы.',
  },
  {
    title: 'Hexagonal Architecture',
    icon: 'mdi-hexagon-outline',
    description: 'Порты и адаптеры держат домен независимым от инфраструктуры.',
  },
  {
    title: 'CQRS',
    icon: 'mdi-call-split',
    description: 'Разделение моделей чтения и записи ради ясности и масштабирования.',
  },
  {
    title: 'Event Driven Architecture',
    icon: 'mdi-lightning-bolt-outline',
    description: 'Асинхронное расцепленное взаимодействие через доменные события.',
  },
  {
    title: 'Modular Monolith',
    icon: 'mdi-view-module-outline',
    description: 'Сильные границы модулей без преждевременной распределённости.',
  },
  {
    title: 'Clean Architecture',
    icon: 'mdi-layers-outline',
    description: 'Зависимости всегда направлены внутрь, к предметной области.',
  },
]

export const stackGroups: readonly StackGroup[] = [
  {
    category: 'Языки',
    icon: 'mdi-language-php',
    items: ['PHP 8.4', 'TypeScript', 'SQL', 'Bash'],
  },
  {
    category: 'Фреймворки',
    icon: 'mdi-cube-outline',
    items: ['Bitrix D7', 'Vue 3', 'Vuetify', 'Vite'],
  },
  {
    category: 'Инфраструктура',
    icon: 'mdi-docker',
    items: ['Docker', 'Docker Compose', 'Docker Swarm', 'Makefile'],
  },
  {
    category: 'Данные и обмен',
    icon: 'mdi-database-outline',
    items: ['MySQL', 'Redis', 'RabbitMQ', 'Elasticsearch'],
  },
]

export const experience: readonly ExperienceItem[] = [
  {
    period: '2018 — наст. время',
    role: 'Senior PHP Backend Developer',
    description:
      'Проектирую модульные доменно-ориентированные платформы на PHP 8.x и ' +
      'Bitrix D7 с событийными интеграциями и контейнеризованной поставкой.',
  },
  {
    period: '2014 — 2018',
    role: 'PHP Developer',
    description:
      'Разрабатывал и сопровождал высоконагруженные веб-сервисы, внедрял ' +
      'тестирование и CI, вёл миграцию legacy-кода к чистым слоям.',
  },
  {
    period: '2011 — 2014',
    role: 'Web Developer',
    description:
      'Делал коммерческие сайты и интеграции, постепенно вырастая из ' +
      'full-stack-работы в backend-инженера.',
  },
]

export const projects: readonly Project[] = [
  {
    title: 'Rebit P2P Exchange',
    description:
      'P2P-платформа обмена на чистой слоистой архитектуре: доменные модули, ' +
      'обмен сообщениями через RabbitMQ и деплой на Docker.',
    tags: ['PHP 8.4', 'DDD', 'RabbitMQ', 'Docker', 'Vue 3'],
  },
  {
    title: 'Bitrix DDD Starter',
    description:
      'Модульный стартер на Bitrix D7: код разложен по слоям Domain, ' +
      'Application, Infrastructure и Presentation с DI на каждый слой.',
    tags: ['Bitrix D7', 'Clean Architecture', 'DI'],
  },
  {
    title: 'Enterprise Integration Platform',
    description:
      'Событийный интеграционный хаб, связывающий внутренние сервисы через ' +
      'надёжный обмен сообщениями, с read-моделями CQRS и наблюдаемостью.',
    tags: ['Event-Driven', 'CQRS', 'Redis', 'MySQL'],
  },
]

export const articles: readonly Article[] = [
  {
    title: 'Как я организую DDD в Bitrix',
    excerpt:
      'Практичный послойный подход к внедрению Domain-Driven Design в кодовую ' +
      'базу Bitrix D7 без борьбы с фреймворком.',
    readingTime: '8 мин чтения',
  },
  {
    title: 'Паттерны RabbitMQ в PHP',
    excerpt:
      'Надёжные паттерны обмена сообщениями — очереди задач, publish/subscribe ' +
      'и повторы — и как чисто применять их из PHP-сервисов.',
    readingTime: '6 мин чтения',
  },
  {
    title: 'Стратегия рефакторинга legacy',
    excerpt:
      'Превращение запутанного монолита в модульную тестируемую платформу с ' +
      'подходом strangler-fig и строгими границами модулей.',
    readingTime: '7 мин чтения',
  },
]

export const contacts: readonly ContactLink[] = [
  {
    label: 'GitHub',
    value: 'github.com/rebit-pro',
    icon: 'mdi-github',
    href: 'https://github.com/rebit-pro',
  },
  {
    label: 'Email',
    value: 'rebit-2017@yandex.ru',
    icon: 'mdi-email-outline',
    href: 'mailto:rebit-2017@yandex.ru',
  },
  {
    label: 'Telegram',
    value: '@rebit_pro',
    icon: 'mdi-send',
    href: 'https://t.me/rebit_pro',
  },
]
