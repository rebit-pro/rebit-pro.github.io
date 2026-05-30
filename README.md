# rebit.pro — портфолио

Одностраничный сайт-портфолио (Vue 3 + Vuetify 3 + Vite, TypeScript).
Визуальный язык перенесён из admin-шаблона **Barry** (Spike/Berry): тема
PurpleTheme, градиентный hero, BEM-карточки.

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

Домен `rebit.pro` привязан через файл `public/CNAME`. На стороне DNS:

- `A` / `AAAA` apex-записи на IP GitHub Pages, либо
- `CNAME` для `www` → `rebit-pro.github.io`.

В репозитории: **Settings → Pages → Source → GitHub Actions**.
