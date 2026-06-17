export interface CaseItem {
  readonly slug: string
  readonly title: string
  readonly client: string
  readonly industry: string
  readonly description: string
  readonly problem: string
  readonly role: string
  readonly stack: readonly string[]
  readonly solution: string
  readonly result: string
  readonly relatedServices: readonly string[]
}

export const cases: readonly CaseItem[] = [
  {
    slug: 'orteka',
    title: 'Аудит и ускорение Bitrix-каталога',
    client: 'ОРТЕКА',
    industry: 'E-commerce / медицинские товары',
    description:
      'Сценарий для крупного интернет-магазина на 1С-Битрикс с высокой нагрузкой на каталог, фильтры и страницы разделов.',
    problem:
      'Каталог открывался медленно, фильтры создавали лишнюю нагрузку, а команда не хотела вносить изменения без понятной карты рисков.',
    role:
      'Технический аудит, анализ узких мест, подготовка порядка работ и безопасных точек оптимизации.',
    stack: ['1С-Битрикс', 'PHP', 'SQL', 'кеширование', 'каталог'],
    solution:
      'Проверили SQL-запросы, кеширование, компоненты, структуру данных и тяжёлые пользовательские сценарии. Разделили быстрые правки и дальнейший план оптимизации.',
    result:
      'Команда получила понятную карту узких мест, безопасный порядок работ и основу для ускорения без полной переписи каталога.',
    relatedServices: ['bitrix-development', 'audit-refactoring', 'backend-development'],
  },
  {
    slug: 'shkola7gnomov',
    title: 'Интеграции PHP / Bitrix с CRM и внешними API',
    client: 'Магазин семи гномов',
    industry: 'E-commerce / retail',
    description:
      'Проектный сценарий, где обмен данными с внешними системами стал хрупким и требовал ручного контроля.',
    problem:
      'Заявки, статусы и данные клиентов передавались нестабильно: ошибки терялись, повторы не контролировались, бизнес не видел реальное состояние обмена.',
    role:
      'Проектирование интеграционного слоя, обработка ошибок, повторные попытки и точки контроля для поддержки.',
    stack: ['PHP', 'Bitrix D7', 'CRM', 'REST API', 'RabbitMQ'],
    solution:
      'Спроектировали явный слой интеграции, обработку ошибок, повторные попытки, логирование и понятные точки контроля для команды поддержки.',
    result:
      'Интеграция стала предсказуемее: проще искать ошибки, безопаснее менять API и понятнее сопровождать обмен после релиза.',
    relatedServices: ['integrations', 'backend-development', 'devops'],
  },
  {
    slug: 'yurkas',
    title: 'Рефакторинг legacy-модуля на Bitrix D7',
    client: 'ЮРКАС',
    industry: 'B2B / корпоративные сервисы',
    description:
      'Сценарий для старого проекта, где критичная бизнес-логика была смешана с компонентами, шаблонами и инфраструктурным кодом.',
    problem:
      'Любая доработка занимала много времени: логика была связана с Bitrix API, не было границ модулей, а изменения в одном месте влияли на соседние сценарии.',
    role:
      'Выделение доменных правил, сервисов приложения и инфраструктурных адаптеров при сохранении совместимости.',
    stack: ['legacy', 'Bitrix D7', 'DDD', 'Clean Architecture', 'PHP'],
    solution:
      'Выделили доменные правила, сервисы приложения и инфраструктурные адаптеры. Сохранили совместимость со старым кодом и двигались итерационно.',
    result:
      'Код стал понятнее для команды, новые изменения проще оценивать и тестировать, а legacy можно улучшать постепенно без остановки разработки.',
    relatedServices: ['audit-refactoring', 'bitrix-development', 'backend-development'],
  },
]

export function findCase(slug: string): CaseItem | undefined {
  return cases.find((item) => item.slug === slug)
}

