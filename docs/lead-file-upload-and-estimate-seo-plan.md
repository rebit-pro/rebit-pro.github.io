# План: загрузка ТЗ в Telegram + email + SEO-оффер «оценка по ТЗ»

Документ для реализации в новом контексте. Фича охватывает **два репозитория**:

- **Бэкенд** — `rebit-p2p`, модуль `api/public/local/modules/rebit.notification` (эндпоинт `POST /api/v1/lead`).
- **Фронтенд + SEO** — `rebit-pro.github.io` (форма заявки, страница-оффер).

Текущее состояние: заявка (имя, телефон, описание) уже уходит в Telegram через прокси (`REBIT_NOTIFICATION_TELEGRAM_PROXY`, `api.telegram.org` заблокирован с сервера). Добавляем **email** и **загрузку файла ТЗ**.

---

## 0. Принципы

1. **Файл не хранится на сервере.** Используем PHP-temp загрузки (`$_FILES[...]['tmp_name']`) и сразу стримим в Telegram (`sendDocument`). После запроса PHP сам удаляет temp. Нет записи в web-папку → нет вектора «вебшелл/исполнение/утечка».
2. **Жёсткая валидация на сервере** (клиентская — только UX, не защита).
3. **Email/телефон/ТЗ = персональные данные** → согласие + политика конфиденциальности.
4. Смету/план клиенту отправляет владелец **вручную** (после получения заявки в Telegram). Авто-оценка — вне этого плана.

---

## 1. Архитектура

```
[форма rebit-pro.ru]
   --multipart/form-data (поля + файл)-->
[nginx api.rebit-pro.ru]  (CORS/auth, client_max_body_size)
   --> [Bitrix LeadController]
        --> SubmitLeadUseCase
             --> LeadNotifierInterface (TelegramLeadNotifier)
                  --1) sendMessage (текст заявки)----> [SOCKS5 proxy] --> Telegram
                  --2) sendDocument (файл из tmp)----> [SOCKS5 proxy] --> Telegram
   (файл нигде не сохраняется на диск)
```

---

## 2. Бэкенд (`rebit-p2p` / `rebit.notification`)

### 2.1 DTO и доменные данные
- `Application/Lead/Dto/Request/SubmitLeadRequestDto`: добавить поле
  `#[Assert\Email] #[Assert\Length(max:180)] public string $email = ''` (необязательное).
- `Application/Lead/Dto/LeadMessageDto`: добавить `public string $email`.
- Файл **в DTO не кладём** (RequestDto мапится из скалярных полей). Файл контроллер берёт из запроса отдельно и передаёт в use case как value-object:
  - Новый `Application/Lead/Dto/LeadAttachmentDto` (`final readonly`): `string $path` (tmp), `string $name` (оригинальное имя, очищенное), `string $mimeType`, `int $size`.
- `Application/Lead/Port/LeadNotifierInterface::notify(LeadMessageDto $lead, ?LeadAttachmentDto $attachment = null)`.

### 2.2 Контроллер: приём multipart + файла
- `Presentation/Controller/LeadController::submitAction(SubmitLeadRequestDto $dto)`:
  - Скалярные поля по-прежнему мапятся автоматически (при multipart `RequestHelper::collectRequestValues` читает `getPostList()`).
  - Файл достаём из запроса: `Application::getInstance()->getContext()->getRequest()->getFile('file')` (или `$_FILES['file']`). Если файла нет — работаем как сейчас.
  - Передаём `$dto` + опциональный файл в use case.
- Изучить эталон: `rebit.share/lib/Presentation/Controller/FileController.php` и `RebitHttpClient::postMultipart()` (там уже есть паттерн `CURLFile` и обработки загрузок).

### 2.3 Валидация файла (безопасность) — обязательно на сервере
В отдельном сервисе `Infrastructure/Lead/UploadedFileValidator` (или в use case):
1. **Ошибка загрузки**: `UPLOAD_ERR_OK`, иначе reject.
2. **Размер**: ≤ `REBIT_NOTIFICATION_LEAD_MAX_FILE_MB` (дефолт 15 МБ). Telegram bot `sendDocument` upload-лимит 50 МБ — наш лимит ниже.
3. **MIME по содержимому**: `finfo_file($tmp, FILEINFO_MIME_TYPE)` (НЕ по присланному типу/расширению).
4. **Whitelist MIME → расширение** (defense in depth):
   - `application/pdf` → pdf
   - `application/msword` → doc; `application/vnd.openxmlformats-officedocument.wordprocessingml.document` → docx
   - `application/vnd.ms-excel` → xls; `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` → xlsx
   - `text/plain` → txt
   - `application/zip` → zip
   - `image/png` → png; `image/jpeg` → jpg
5. **Имя файла**: брать оригинальное, но для Telegram передавать **очищенное** (`basename`, убрать управляющие символы, ограничить длину). Никогда не использовать его как путь на диск.
6. Один файл (на старте). Если нужно несколько — массив с лимитом (например, до 3), но это усложняет UX/валидацию.
- При провале валидации → `ValidationHttpException` (422) с понятным сообщением (тип/размер).

### 2.4 Доставка через прокси (`TelegramLeadNotifier`)
- Оставить `sendMessage` (текст заявки) как сейчас. Добавить email в текст (если задан).
- Если есть вложение — после текста вызвать `sendDocument`:
  - URL: `{apiBaseUrl}/bot{token}/sendDocument`.
  - Multipart через cURL: `chat_id`, `document => new \CURLFile($tmp, $mime, $cleanName)`, `caption => "ТЗ к заявке от {name}"`, `parse_mode=HTML`.
  - Тот же прокси (`CURLOPT_PROXY`), таймаут побольше (файл): connect ~12с, total ~60с.
  - **Не** ставить `CURLOPT_RETURNTRANSFER`-парсинг как для JSON отдельно — проверять `ok` из ответа.
- Порядок: сначала текст (быстро, гарантированно), потом документ. Если документ не ушёл — заявка всё равно доставлена (логировать ошибку вложения, не валить весь запрос 502; можно вернуть 200 + пометку, либо отдельный код). **Решение:** если текст ушёл, а документ нет — вернуть 200 (заявка принята), ошибку вложения залогировать и дописать в текст «⚠️ файл не доставлен».

### 2.5 Лимиты PHP / nginx
- nginx `client_max_body_size` уже `1000M` (`docker/common/nginx/conf.d/default.conf`) — ок.
- PHP-FPM: проверить/задать в `api/docker/.../php` ini: `upload_max_filesize=20M`, `post_max_size=25M`, `memory_limit` достаточный. (CURLFile стримит, но запрос целиком читается PHP.)

### 2.6 Env
- `REBIT_NOTIFICATION_LEAD_MAX_FILE_MB=15` (в `backend.env`).
- `.env.example` дополнить.

### 2.7 Файлы к изменению (бэкенд)
```
lib/Application/Lead/Dto/Request/SubmitLeadRequestDto.php   (+ email)
lib/Application/Lead/Dto/LeadMessageDto.php                 (+ email)
lib/Application/Lead/Dto/LeadAttachmentDto.php              (новый)
lib/Application/Lead/Port/LeadNotifierInterface.php         (+ attachment)
lib/Application/Lead/UseCase/SubmitLeadUseCase.php          (проброс файла)
lib/Infrastructure/Lead/UploadedFileValidator.php          (новый)
lib/Infrastructure/Lead/TelegramLeadNotifier.php           (+ sendDocument)
lib/Presentation/Controller/LeadController.php             (+ чтение файла)
di/lead.php                                                 (+ валидатор, env)
.env.example
```
Проверки перед коммитом: `php -l`, `php-cs-fixer` (config `public/local/php-cs-fixer.php`), `phpstan` (`phpstan.neon`), при возможности — юнит-тест валидатора.

---

## 3. Фронтенд (`rebit-pro.github.io`)

Файл: `src/components/RequestFormDialog.vue`.

### 3.1 Email
- Добавить опциональное поле `email` (`v-text-field`, `type="email"`, валидация формата, необязательное).
- В payload добавить `email`.

### 3.2 Загрузка файла (UX + клиентская валидация)
- `v-file-input` (Vuetify) с `accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.png,.jpg,.jpeg"`, single.
- Клиентские проверки (только UX): размер ≤ 15 МБ, тип из whitelist; иначе показать ошибку, не блокируя возможность отправить без файла.
- Показать имя/размер выбранного файла, кнопку «убрать».
- Подпись-доверие: «ТЗ конфиденциально, не публикуется» + «можно без файла».

### 3.3 Отправка multipart
- Если выбран файл → отправлять `FormData` (поля + `file`), **без** ручного `Content-Type` (браузер сам поставит boundary).
  - Бонус: `multipart/form-data` — CORS-safelisted, preflight не триггерится (но nginx и так его обрабатывает).
- Если файла нет → можно оставить текущий JSON, либо для单ообразия тоже `FormData`. **Решение:** всегда `FormData` (один путь, бэкенд читает POST-поля).
- honeypot `company` сохранить.
- Состояния: submitting/success/error как сейчас; для файла — учесть, что запрос дольше (показывать прогресс/«отправляем…»).

### 3.4 Privacy
- В тексте согласия упомянуть, что отправляются email и файл; обновить `PrivacyPage.vue` (`/privacy/`): что собираем (имя, телефон, email, файл-ТЗ), цель (оценка проекта), что файл не публикуется и хранится только в Telegram владельца.

### 3.5 Файлы к изменению (фронт)
```
src/components/RequestFormDialog.vue   (email + file input + FormData)
src/pages/PrivacyPage.vue              (обновить состав ПД)
src/config/site.ts                     (если нужен лимит/типы как константа)
```

---

## 4. Чек-лист безопасности (обязательно)

- [ ] Файл **не сохраняется** на диск (только tmp → Telegram).
- [ ] MIME определяется по содержимому (`finfo`), не по расширению/заголовку.
- [ ] Whitelist типов; размер ≤ лимита; один файл.
- [ ] Имя файла очищается, не используется как путь.
- [ ] Эндпоинт публичный → honeypot (есть) + лимит размера + (при спаме) капча.
- [ ] Ошибки не раскрывают внутренности (общие сообщения наружу, детали — в лог канала `notification`).
- [ ] PHP `upload_max_filesize`/`post_max_size` согласованы с лимитом.
- [ ] Прокси PX6 действует до 16.07.26 — автопродление/напоминание (иначе 502).

---

## 5. Юридическое (152-ФЗ)

- Галочка согласия на обработку ПД (есть ссылка на политику) — обязательна перед отправкой.
- Политика `/privacy/` дополняется: состав данных (имя, телефон, email, файл-ТЗ), цель (оценка/смета), срок и место хранения (Telegram владельца), что файлы не публикуются.
- ТЗ может быть под NDA → дополнительный аргумент «не храним на сервере, только пересылаем».

---

## 6. SEO: контент-оффер и конверсия

Сам аплоадер не ранжируется — ценность через **посадку под коммерческий интент** и рост конверсии (поведенческие → Яндекс).

### 6.1 Новая страница-оффер
- URL: `/services/project-estimate/` (или `/estimate/`).
- H1: «Оценка стоимости разработки по вашему ТЗ».
- Оффер: «Пришлите ТЗ — вышлем примерный план работ и смету за 1 рабочий день. Бесплатно, конфиденциально».

### 6.2 Ключевые запросы (из вордстата — кластеры «цена/стоимость/разработка»)
- стоимость разработки сайта, сколько стоит сайт, рассчитать стоимость сайта
- смета на разработку сайта, оценка стоимости сайта, цена сайта под ключ
- заказать разработку сайта, стоимость интернет-магазина

### 6.3 Структура страницы (под конверсию)
1. Оффер + форма с загрузкой ТЗ (первый экран, CTA «Получить смету»).
2. Что входит в оценку (план работ, этапы, ориентир по срокам и бюджету).
3. Как считаем (по ТЗ / по созвону / по аналогам) — прозрачность.
4. Доверие: примеры/кейсы, «конфиденциально/NDA», срок ответа.
5. FAQ: «бесплатно ли», «сроки оценки», «что если нет ТЗ», «NDA».
6. Повторный CTA.

### 6.4 Разметка и аналитика
- JSON-LD: `Service` + `FAQPage` + `BreadcrumbList` (как на других страницах услуг, инжект в `<head>` при пререндере).
- `title`/`description` под интент (55–65 / 140–170).
- Внутренние ссылки: с `/`, `/prices/`, `/services/` → на страницу оценки.
- Яндекс.Метрика: цель «Заявка с ТЗ» (отдельно от обычной заявки), отслеживать конверсию и долю заявок с файлом.
- Добавить URL в `public/sitemap.xml`.

### 6.5 Файлы (SEO)
```
src/content/services.ts        (+ услуга project-estimate или контент-страница)
src/router/index.ts            (маршрут + meta)
src/pages/...                  (страница оффера, переиспользовать RequestFormDialog или встроить форму)
public/sitemap.xml
src/components/* (CTA-ссылки на оценку с главной/цен)
```

---

## 7. Порядок реализации

1. **Бэкенд (rebit-p2p):**
   1. DTO (email) + `LeadAttachmentDto` + порт.
   2. `UploadedFileValidator` (+ тест).
   3. `TelegramLeadNotifier::sendDocument` через прокси.
   4. `LeadController` — чтение файла из запроса.
   5. PHP-лимиты, env, `.env.example`.
   6. lint/cs-fixer/phpstan/тесты → PR → деплой; задать `REBIT_NOTIFICATION_LEAD_MAX_FILE_MB` в `backend.env`.
2. **Фронтенд (rebit-pro.github.io):**
   1. Email + file input + `FormData` в `RequestFormDialog.vue`.
   2. Privacy-обновление.
   3. Проверка через прод-эндпоинт (curl + браузер).
3. **SEO:**
   1. Страница-оффер «Оценка по ТЗ» + разметка + sitemap + внутренние ссылки.
   2. Цель в Метрике.

---

## 8. Открытые решения / дефолты (подтвердить в новом контексте)

- Лимит файла: **15 МБ** (можно поднять до 20–50 МБ; учесть PHP-лимиты).
- Типы: pdf, doc/docx, xls/xlsx, txt, zip, png, jpg.
- Количество файлов: **1** на старте.
- Если документ не ушёл, а текст ушёл → вернуть **200** (заявка принята), пометить в сообщении.
- Несколько файлов / drag-drop / прогресс-бар — опционально, во вторую очередь.
- Капча — добавлять только при реальном спаме.
