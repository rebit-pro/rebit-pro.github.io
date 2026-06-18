import type { FaqItem } from './faq'

export interface EstimateStep {
  readonly icon: string
  readonly title: string
  readonly text: string
}

/** URL страницы-оффера «оценка по ТЗ» (без домена, со слешами на концах). */
export const estimatePath = '/services/project-estimate/'

export const estimateContent = {
  overline: 'Оценка по ТЗ',
  h1: 'Оценка стоимости разработки по вашему ТЗ',
  offerLead:
    'Пришлите техническое задание — вышлем примерный план работ и смету за 1 рабочий день. ' +
    'Бесплатно и конфиденциально: подойдёт сайт под ключ, интернет-магазин, каталог или доработка 1С-Битрикс.',
  formTitle: 'Получить смету по ТЗ',
  formLead:
    'Заполните контакты, опишите задачу и приложите ТЗ — файл уходит напрямую владельцу и нигде не публикуется.',

  // 2. Что входит в оценку
  included: [
    {
      icon: 'mdi-format-list-checks',
      title: 'План работ по этапам',
      text: 'Разбиваем проект на понятные этапы: что входит в каждый, какой результат на выходе и в каком порядке делаем.',
    },
    {
      icon: 'mdi-cash-multiple',
      title: 'Ориентир по бюджету',
      text: 'Диапазон стоимости по этапам и вилка на проект целиком — чтобы понимать порядок бюджета до старта.',
    },
    {
      icon: 'mdi-calendar-clock',
      title: 'Ориентир по срокам',
      text: 'Реалистичная оценка сроков с учётом интеграций, объёма каталога и состояния текущего сайта.',
    },
    {
      icon: 'mdi-alert-decagram-outline',
      title: 'Риски и развилки',
      text: 'Отмечаем места, где трудоёмкость может вырасти, и предлагаем варианты — где можно упростить без потери результата.',
    },
  ] as readonly EstimateStep[],

  // 3. Как считаем
  howWeCalc: [
    {
      icon: 'mdi-file-document-outline',
      title: 'По ТЗ',
      text: 'Если есть готовое ТЗ или бриф — считаем по нему. Это самый точный вариант оценки.',
    },
    {
      icon: 'mdi-phone-in-talk-outline',
      title: 'По созвону',
      text: 'Нет формального ТЗ — обсудим задачу голосом или в переписке и зафиксируем требования сами.',
    },
    {
      icon: 'mdi-compare-horizontal',
      title: 'По аналогам',
      text: 'Опираемся на похожие проекты из практики, чтобы быстро дать ориентир по бюджету и срокам.',
    },
  ] as readonly EstimateStep[],

  // 4. Доверие
  trust: [
    'Файл ТЗ не публикуется и не хранится на сервере — пересылаем только владельцу.',
    'Работаем под NDA: оценку и материалы держим в тайне.',
    'Отвечаем в течение одного рабочего дня.',
    'Оценка бесплатна и ни к чему не обязывает.',
  ] as readonly string[],

  // 5. FAQ
  faq: [
    {
      question: 'Оценка по ТЗ действительно бесплатная?',
      answer:
        'Да. Предварительный план работ и смету по вашему ТЗ присылаем бесплатно и без обязательств. Платная только сама разработка, если решите её заказать.',
    },
    {
      question: 'Сколько ждать оценку?',
      answer:
        'Обычно отвечаем в течение одного рабочего дня. Если задача крупная и требует уточнений, сообщим об этом и согласуем срок.',
    },
    {
      question: 'А если у меня нет готового ТЗ?',
      answer:
        'Это нормально. Можно прислать любое описание задачи, бриф или примеры сайтов-аналогов. При необходимости созвонимся и поможем сформулировать требования.',
    },
    {
      question: 'ТЗ под NDA — это безопасно?',
      answer:
        'Да. Файл не сохраняется на сервере и не публикуется — он сразу пересылается владельцу в личный Telegram. Готовы подписать NDA до передачи материалов.',
    },
    {
      question: 'Какие файлы можно приложить?',
      answer:
        'pdf, doc/docx, xls/xlsx, txt, zip, а также png/jpg — например, скриншоты или схемы. Один файл размером до 15 МБ.',
    },
  ] as readonly FaqItem[],

  repeatCtaTitle: 'Готовы оценить ваш проект',
  repeatCtaText:
    'Пришлите ТЗ или короткое описание задачи — вернёмся с планом работ и сметой в течение рабочего дня.',
} as const

/**
 * JSON-LD для страницы-оффера: Service + FAQPage + BreadcrumbList.
 * Вставляется в <head> при пререндере (см. entry-server.ts).
 */
export function estimateJsonLd(domain: string, organization: string): string {
  const canonical = `${domain}${estimatePath}`

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Оценка стоимости разработки по ТЗ',
    serviceType: 'Оценка стоимости разработки сайта',
    description: estimateContent.offerLead,
    inLanguage: 'ru-RU',
    url: canonical,
    areaServed: 'RU',
    provider: { '@type': 'Organization', name: organization, url: `${domain}/` },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'RUB',
      description: 'Предварительный план работ и смета по вашему ТЗ — бесплатно.',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: estimateContent.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: `${domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Услуги', item: `${domain}/services/` },
      { '@type': 'ListItem', position: 3, name: 'Оценка по ТЗ', item: canonical },
    ],
  }

  return [serviceSchema, faqSchema, breadcrumbSchema]
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join('')
}
