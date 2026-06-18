export interface NavLink {
  readonly title: string
  readonly target: string
}

export interface ArchitecturePrinciple {
  readonly title: string
  readonly icon: string
  readonly description: string
}

export interface AudienceSegment {
  readonly title: string
  readonly icon: string
  readonly description: string
  readonly points: readonly string[]
}

export interface ServiceItem {
  readonly title: string
  readonly icon: string
  readonly description: string
}

export interface TaskItem {
  readonly title: string
  readonly description: string
}

export interface WorkFormat {
  readonly title: string
  readonly icon: string
  readonly description: string
}

export interface ProcessStep {
  readonly title: string
  readonly description: string
}

export interface FaqItem {
  readonly question: string
  readonly answer: string
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
  readonly problem: string
  readonly solution: string
  readonly result: string
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
  name: 'ReBit Studio',
  role: 'Разрабатываем программные решения, которые работают на ваш бизнес',
  shortRole: 'Разработка, поддержка, развитие',
  experience: 'Надёжный код. Человеческий подход.',
  tagline: 'Чёткие решения для PHP, Bitrix, интеграций и цифровой сложности.',
  summary:
    'Создаём и развиваем цифровые продукты: разбираем сложный legacy-код, ' +
    'проектируем понятную архитектуру, стабилизируем интеграции и доводим ' +
    'задачи до результата.',
  contactHref: 'https://t.me/rebit_pro',
} as const

export const navLinks: readonly NavLink[] = [
  { title: 'Услуги', target: 'services' },
  { title: 'Задачи', target: 'tasks' },
  { title: 'Кейсы', target: 'projects' },
  { title: 'Формат', target: 'work-format' },
  { title: 'Стек', target: 'stack' },
  { title: 'Контакты', target: 'contact' },
]

export interface HeroBadge {
  readonly title: string
  readonly icon: string
}

// Четыре направления с баннера — короткие «опорные» чипы под заголовком hero.
export const heroBadges: readonly HeroBadge[] = [
  { title: '1С-Битрикс', icon: 'mdi-bitbucket' },
  { title: 'Интеграции', icon: 'mdi-transit-connection-variant' },
  { title: 'Оптимизация', icon: 'mdi-speedometer' },
  { title: 'Legacy', icon: 'mdi-source-branch' },
]

// «Решаю задачи, где нужны» — буллеты ценности (тоже с баннера).
export const heroSolves: readonly string[] = [
  'Разработка сайтов под ключ, каталогов и интернет-магазинов',
  'Интеграции с 1С, CRM, оплатами, доставками и внешними API',
  'Аудит, оптимизация производительности и снижение технического долга',
  'Развитие PHP / Bitrix / Vue-проектов для бизнеса и продуктовых команд',
]

export const audienceSegments: readonly AudienceSegment[] = [
  {
    title: 'Бизнесу на 1С-Битрикс',
    icon: 'mdi-storefront-outline',
    description:
      'Помогаю владельцам и руководителям проектов стабилизировать сайт, ' +
      'ускорить критичные страницы и безопасно выпускать новые доработки.',
    points: ['интернет-магазины', 'корпоративные сайты', 'сложные каталоги'],
  },
  {
    title: 'Компаниям с каталогами и продажами',
    icon: 'mdi-cart-outline',
    description:
      'Помогаю развивать каталог, корзину, оформление заказа, заявки, интеграции ' +
      'и SEO-техническую основу без остановки текущих продаж.',
    points: ['каталог', 'интернет-магазин', 'интеграции'],
  },
  {
    title: 'Продуктовым командам',
    icon: 'mdi-account-group-outline',
    description:
      'Помогаю развивать PHP / Bitrix legacy без полной переписки: выделять ' +
      'модули, снижать связность и делать изменения предсказуемыми.',
    points: ['legacy', 'модульность', 'техдолг'],
  },
  {
    title: 'Клиентам с площадок',
    icon: 'mdi-briefcase-search-outline',
    description:
      'Беру разовые и долгосрочные проектные задачи: от исправления ошибок ' +
      'до интеграций, аудита и регулярного сопровождения.',
    points: ['разовые задачи', 'почасовая работа', 'сопровождение'],
  },
]

export const services: readonly ServiceItem[] = [
  {
    title: 'Доработка Bitrix-проектов',
    icon: 'mdi-tools',
    description:
      'Новые разделы, бизнес-логика, каталог, оформление заказа, личный кабинет, ' +
      'исправление ошибок и аккуратная работа с существующим кодом.',
  },
  {
    title: 'Интеграции',
    icon: 'mdi-connection',
    description:
      '1С, CRM, платёжные системы, службы доставки, внешние API, webhooks, ' +
      'очереди и надёжный обмен данными.',
  },
  {
    title: 'Оптимизация производительности',
    icon: 'mdi-speedometer',
    description:
      'SQL-запросы, кеширование, тяжёлые компоненты, каталог, фильтры, фоновые ' +
      'задачи и снижение нагрузки на инфраструктуру.',
  },
  {
    title: 'Технический аудит',
    icon: 'mdi-clipboard-search-outline',
    description:
      'Проверяю код, архитектуру, интеграции и производительность, нахожу риски ' +
      'и готовлю понятный план дальнейших улучшений.',
  },
  {
    title: 'Рефакторинг legacy',
    icon: 'mdi-source-branch-sync',
    description:
      'Постепенно улучшаю старый PHP / Bitrix-код без остановки разработки и ' +
      'без опасной полной переписи проекта.',
  },
  {
    title: 'Архитектура и сопровождение',
    icon: 'mdi-sitemap-outline',
    description:
      'Помогаю выстраивать модульную структуру, DDD-границы, безопасный процесс ' +
      'изменений и долгосрочное развитие проекта.',
  },
]

export const typicalTasks: readonly TaskItem[] = [
  {
    title: 'Сайт на Bitrix стал медленно работать',
    description: 'Проверю узкие места, SQL, кеширование, компоненты и тяжёлые сценарии.',
  },
  {
    title: 'Нужна интеграция с 1С, CRM или внешним API',
    description: 'Спроектирую обмен данными, обработаю ошибки и сделаю интеграцию поддерживаемой.',
  },
  {
    title: 'Нужно разобраться в чужом legacy-коде',
    description: 'Войду в контекст, найду риски и предложу безопасный план изменений.',
  },
  {
    title: 'После доработок появляются новые ошибки',
    description: 'Помогу стабилизировать критичную логику и снизить связанность изменений.',
  },
  {
    title: 'Нужен сайт под ключ или новый раздел услуг',
    description: 'Соберу структуру, интерфейс, формы заявок, SEO-базу и понятный маршрут к обращению.',
  },
  {
    title: 'Нужен аудит перед крупной доработкой',
    description: 'Оценю текущее состояние проекта, риски, стоимость и порядок работ.',
  },
]

export const workFormats: readonly WorkFormat[] = [
  {
    title: 'Разовая консультация',
    icon: 'mdi-comment-question-outline',
    description: 'Быстро разбираю задачу, риски и возможные варианты решения.',
  },
  {
    title: 'Технический аудит',
    icon: 'mdi-file-search-outline',
    description: 'Проверяю код, производительность, архитектуру и интеграции, затем даю план действий.',
  },
  {
    title: 'Задача под ключ',
    icon: 'mdi-check-decagram-outline',
    description: 'Беру конкретную доработку, интеграцию или исправление с понятным результатом.',
  },
  {
    title: 'Сотрудничество как самозанятый / ИП',
    icon: 'mdi-account-plus-outline',
    description:
      'Работаю официально в проектном формате: как самозанятый или ИП, ' +
      'с понятными этапами, договорённостями и результатом.',
  },
]

export const processSteps: readonly ProcessStep[] = [
  {
    title: 'Вы описываете задачу',
    description: 'Ссылка на проект, проблема, желаемый результат, сроки и текущие ограничения.',
  },
  {
    title: 'Готовлю предпроектную документацию',
    description:
      'Фиксирую контекст, цели, риски, ограничения, варианты решения, этапы и ожидаемый результат.',
  },
  {
    title: 'Согласовываем с командой или бизнесом',
    description:
      'Обсуждаем документ, уточняем спорные места, приоритеты, сроки и порядок выполнения.',
  },
  {
    title: 'Перехожу к выполнению',
    description:
      'После согласования аккуратно работаю с кодом, учитываю риски и не ломаю существующую логику.',
  },
  {
    title: 'Передаю результат',
    description: 'Объясняю, что сделано, что проверить и какие улучшения возможны дальше.',
  },
]

export const faqItems: readonly FaqItem[] = [
  {
    question: 'Вы работаете с бизнесом на 1С-Битрикс?',
    answer:
      'Да. Помогаю владельцам и руководителям Bitrix-проектов с доработками, ' +
      'ускорением сайта, интеграциями с 1С, CRM, оплатами, доставками и аудитом ' +
      'существующего проекта перед крупными изменениями.',
  },
  {
    question: 'Можно доработать существующий сайт на Битрикс?',
    answer:
      'Да. Начинаем с оценки текущего кода, каталога, компонентов и интеграций, ' +
      'затем предлагаем этапы доработки без остановки продаж.',
  },
  {
    question: 'Помогаете продуктовым командам с legacy PHP / Bitrix?',
    answer:
      'Да. Помогаю разбирать старый код, выделять модули, снижать технический долг, ' +
      'готовить предпроектную документацию и безопасно развивать систему без полной ' +
      'переписи с нуля.',
  },
  {
    question: 'Берёте разовые задачи с fl.ru, Kwork и других площадок?',
    answer:
      'Да. Можно обратиться с разовой задачей, аудитом, интеграцией, исправлением ошибки ' +
      'или долгосрочным сопровождением. Для быстрой оценки достаточно прислать ссылку ' +
      'на проект, описание проблемы, желаемый результат и сроки.',
  },
  {
    question: 'Что входит в предпроектную документацию?',
    answer:
      'Фиксирую цель задачи, текущие ограничения, риски, варианты решения, этапы работ, ' +
      'ожидаемый результат и вопросы для согласования с командой или бизнесом. После ' +
      'согласования документации можно переходить к выполнению.',
  },
  {
    question: 'Как оформляется сотрудничество?',
    answer:
      'Работаю официально в проектном формате как самозанятый или ИП. Возможны разовая ' +
      'консультация, технический аудит, задача под ключ, подключение к команде или ' +
      'долгосрочное сопровождение.',
  },
]

export const about = {
  summary:
    'ReBit Studio выросла из коммерческой PHP-разработки и практики сложных ' +
    'Bitrix / PHP-проектов. Проектируем поддерживаемые решения, расцепляем ' +
    'legacy-код и помогаем командам безопасно развивать систему.',
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
    items: ['PHP 8.4', 'Python', 'TypeScript', 'SQL', 'Bash'],
  },
  {
    category: 'Фреймворки',
    icon: 'mdi-cube-outline',
    items: ['Bitrix D7', 'Laravel', 'Symfony', 'Slim', 'Vue 3', 'Vuetify', 'Vite'],
  },
  {
    category: 'Инфраструктура',
    icon: 'mdi-docker',
    items: ['Docker', 'Docker Compose', 'Docker Swarm', 'Ansible', 'Traefik', 'Makefile'],
  },
  {
    category: 'Данные и обмен',
    icon: 'mdi-database-outline',
    items: ['MySQL', 'Redis', 'Memcached', 'RabbitMQ', 'Elasticsearch'],
  },
]

export const experience: readonly ExperienceItem[] = [
  {
    period: '2025 — наст. время',
    role: 'ReBit Studio: архитектура и развитие проектов',
    description:
      'Проектируем модульные решения на PHP и Bitrix D7, выделяем границы модулей, ' +
      'готовим технические решения и помогаем командам безопасно развивать legacy.',
  },
  {
    period: '2019 — 2025',
    role: 'PHP Backend Development',
    description:
      'Разрабатывал и сопровождал коммерческие PHP / Bitrix-проекты, строил ' +
      'интеграции, оптимизировал производительность и постепенно снижал техдолг.',
  },
  {
    period: '2016 — 2019',
    role: 'Web Development',
    description:
      'Делал коммерческие сайты, доработки и интеграции, постепенно смещая фокус ' +
      'в сторону backend-разработки, Bitrix и сложной бизнес-логики.',
  },
]

export const projects: readonly Project[] = [
  {
    title: 'Аудит и ускорение Bitrix-каталога',
    description:
      'Обезличенный сценарий для интернет-магазина на 1С-Битрикс с высокой ' +
      'нагрузкой на каталог, фильтры и страницы разделов.',
    problem:
      'Каталог открывался медленно, фильтры создавали лишнюю нагрузку, а команда ' +
      'боялась вносить изменения без риска сломать продажи.',
    solution:
      'Проверил SQL-запросы, кеширование, компоненты, структуру данных и тяжёлые ' +
      'сценарии. Разделил быстрые правки и дальнейший план оптимизации.',
    result:
      'Проект получил понятную карту узких мест, безопасный порядок работ и основу ' +
      'для ускорения без полной переписи каталога.',
    tags: ['1С-Битрикс', 'производительность', 'SQL', 'кеширование'],
  },
  {
    title: 'Интеграция PHP / Bitrix с CRM и внешними API',
    description:
      'Сценарий для проекта, где обмен данными с внешними системами стал хрупким ' +
      'и требовал ручного контроля.',
    problem:
      'Заявки, статусы и данные клиентов передавались нестабильно: ошибки терялись, ' +
      'повторы не контролировались, бизнес не видел реальное состояние обмена.',
    solution:
      'Спроектировал явный слой интеграции, обработку ошибок, повторные попытки, ' +
      'логирование и понятные точки контроля для команды поддержки.',
    result:
      'Интеграция стала предсказуемее: проще искать ошибки, безопаснее менять API ' +
      'и понятнее сопровождать обмен после релиза.',
    tags: ['PHP', 'Bitrix D7', 'CRM', 'REST API', 'RabbitMQ'],
  },
  {
    title: 'Рефакторинг legacy-модуля на Bitrix D7',
    description:
      'Сценарий для старого проекта, где критичная бизнес-логика была смешана с ' +
      'компонентами, шаблонами и инфраструктурным кодом.',
    problem:
      'Любая доработка занимала много времени: логика была связана с Bitrix API, ' +
      'не было границ модулей, а изменения в одном месте влияли на соседние сценарии.',
    solution:
      'Выделил доменные правила, сервисы приложения и инфраструктурные адаптеры. ' +
      'Сохранил совместимость со старым кодом и двигался итерационно.',
    result:
      'Код стал понятнее для команды, новые изменения проще оценивать и тестировать, ' +
      'а legacy можно улучшать постепенно без остановки разработки.',
    tags: ['legacy', 'Bitrix D7', 'DDD', 'Clean Architecture'],
  },
]

export const articles: readonly Article[] = [
  {
    title: 'Как ускорить сайт на 1С-Битрикс',
    excerpt:
      'Чеклист для владельца проекта: где чаще всего возникают узкие места, ' +
      'что проверять в каталоге, фильтрах, SQL и кешировании.',
    readingTime: '7 мин чтения',
  },
  {
    title: 'Интеграция Bitrix с 1С и CRM',
    excerpt:
      'Типовые проблемы обмена данными: потерянные ошибки, повторы, статусы, ' +
      'логирование и контроль результата после релиза.',
    readingTime: '6 мин чтения',
  },
  {
    title: 'Как безопасно рефакторить legacy PHP',
    excerpt:
      'Как улучшать старый код без полной переписи проекта: диагностика, границы, ' +
      'итерации, совместимость и снижение рисков для бизнеса.',
    readingTime: '7 мин чтения',
  },
]

export const contacts: readonly ContactLink[] = [
  {
    label: 'Telegram',
    value: '@rebit_pro',
    icon: 'mdi-send',
    href: 'https://t.me/rebit_pro',
  },
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
]
