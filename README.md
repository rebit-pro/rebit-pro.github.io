# rebit-pro.ru — сайт ReBit Studio

Корпоративный сайт ReBit Studio на Vue 3, Vuetify 3, Vue Router, Vite и TypeScript.

Проект развивается из лендинга в статический сайт с отдельными страницами услуг,
кейсов, блога, контактов и privacy. Контентные сущности вынесены в `src/content`,
брендовые данные и meta — в `src/config/site.ts`.

## Структура

- `src/pages` — route-level страницы.
- `src/router` — маршруты и route-level meta.
- `src/content` — услуги, кейсы, FAQ и статьи.
- `src/config` — бренд, навигация и базовые SEO-данные.
- `src/components` — переиспользуемые секции и UI-блоки.
- `public/404.html` — fallback для прямых URL на GitHub Pages.

## Локальный запуск

```bash
npm install
npm run dev      # http://localhost:5173
```

## Сборка

```bash
npm run build    # vue-tsc + vite build → dist/
npm run preview  # предпросмотр собранного билда
```

## Деплой

GitHub Pages через GitHub Actions (`.github/workflows/deploy.yml`).
Любой push в `main` собирает проект и публикует `dist/`.

### Кастомный домен

Домен `rebit-pro.ru` привязан через файл `public/CNAME`. На стороне DNS:

- `A` / `AAAA` apex-записи на IP GitHub Pages, либо
- `CNAME` для `www` → `rebit-pro.github.io`.

В репозитории: **Settings → Pages → Source → GitHub Actions**.
