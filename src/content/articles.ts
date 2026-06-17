export interface Article {
  readonly slug: string
  readonly title: string
  readonly excerpt: string
  readonly readingTime: string
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
]

