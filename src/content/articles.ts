export interface Article {
  readonly slug: string
  readonly title: string
  readonly excerpt: string
  readonly readingTime: string
  readonly link?: string
}

export const articles: readonly Article[] = [
  {
    slug: 'bitrix-performance',
    title: 'Как ускорить сайт на 1С-Битрикс',
    excerpt:
      'Чеклист для владельца проекта: где чаще всего возникают узкие места, что проверять в каталоге, фильтрах, SQL и кешировании.',
    readingTime: '7 мин чтения',
  },
  {
    slug: 'bitrix-crm-integrations',
    title: 'Интеграция Bitrix с 1С и CRM',
    excerpt:
      'Типовые проблемы обмена данными: потерянные ошибки, повторы, статусы, логирование и контроль результата после релиза.',
    readingTime: '6 мин чтения',
  },
  {
    slug: 'legacy-php-refactoring',
    title: 'Как безопасно рефакторить legacy PHP',
    excerpt:
      'Как улучшать старый код без полной переписи проекта: диагностика, границы, итерации, совместимость и снижение рисков.',
    readingTime: '7 мин чтения',
  },
  {
    slug: 'ddd-in-bitrix-without-rewrite',
    title: 'DDD в 1С-Битрикс без полной переписи',
    excerpt:
      'Как вводить ограниченные контексты, use case, порты и адаптеры в существующий Bitrix-проект небольшими безопасными шагами.',
    readingTime: '9 мин чтения',
  },
  {
    slug: 'thin-bitrix-components',
    title: 'Тонкие компоненты Bitrix: от ParamsDto до ViewModel',
    excerpt:
      'Как убрать бизнес-логику из компонентов, сделать входные параметры явными и передавать в шаблон готовую модель отображения.',
    readingTime: '8 мин чтения',
  },
  {
    slug: 'bitrix-integrations-ports-adapters',
    title: 'Интеграции Bitrix через порты и адаптеры',
    excerpt:
      'Как проектировать обмен с 1С, CRM и внешними API так, чтобы доменная логика не зависела от конкретного транспорта.',
    readingTime: '8 мин чтения',
  },
]
