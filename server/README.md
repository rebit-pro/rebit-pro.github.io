# Приёмник заявок в Telegram

Сайт статический (GitHub Pages), поэтому токен бота нельзя держать во фронтенде —
он стал бы публичным. Форма с сайта отправляет заявку на этот PHP-приёмник,
который уже сам пересылает её в Telegram. Токен живёт только на сервере.

```
[ Форма на сайте ] --POST--> [ telegram-form.php на вашем сервере ] --> [ Telegram ]
```

## Что нужно сделать (один раз)

### 1. Создать бота и получить токен

1. В Telegram напишите **@BotFather** → команда `/newbot`.
2. Задайте имя и username бота.
3. BotFather пришлёт **токен** вида `123456789:AAE...` — сохраните его.

### 2. Узнать chat_id (куда приходят заявки)

**Вариант А — заявки вам лично:**
1. Напишите своему новому боту любое сообщение (например, «привет»).
2. Откройте в браузере `https://api.telegram.org/bot<ТОКЕН>/getUpdates`.
3. Найдите `"chat":{"id":...}` — это ваш `chat_id` (число).

**Вариант Б — заявки в общую группу (удобно для команды):**
1. Создайте группу и добавьте в неё бота.
2. Напишите в группе любое сообщение.
3. Откройте `https://api.telegram.org/bot<ТОКЕН>/getUpdates` и возьмите `chat.id`
   группы (обычно отрицательное число, например `-1001234567890`).

### 3. Разместить приёмник на сервере

1. Загрузите `telegram-form.php` на ваш сервер/VPS, желательно по HTTPS,
   например: `https://api.rebit-pro.ru/telegram-form.php`.
2. Нужны PHP 7.4+ и расширения `curl`, `json` (есть почти везде).
3. Задайте переменные окружения с токеном и chat_id. Способы на выбор:

   **php-fpm / systemd** — в конфиге пула или сервиса:
   ```
   env[TELEGRAM_BOT_TOKEN] = 123456789:AAE...
   env[TELEGRAM_CHAT_ID]   = 123456789
   ```

   **Apache + .htaccess** (рядом с файлом):
   ```apache
   SetEnv TELEGRAM_BOT_TOKEN 123456789:AAE...
   SetEnv TELEGRAM_CHAT_ID 123456789
   ```

   **nginx** (в `location` для php):
   ```nginx
   fastcgi_param TELEGRAM_BOT_TOKEN 123456789:AAE...;
   fastcgi_param TELEGRAM_CHAT_ID 123456789;
   ```

4. Проверьте, что домен сайта есть в списке `ALLOWED_ORIGINS` внутри
   `telegram-form.php` (по умолчанию `https://rebit-pro.ru`).

### 4. Связать сайт с приёмником

Пропишите адрес приёмника во фронтенде — одно из двух:

- переменная окружения сборки: `VITE_REQUEST_ENDPOINT=https://api.rebit-pro.ru/telegram-form.php`
- либо значение по умолчанию в [`src/config/site.ts`](../src/config/site.ts) (`requestEndpoint`).

## Проверка

```bash
curl -X POST https://api.rebit-pro.ru/telegram-form.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Тест","phone":"+79991234567","description":"Проверка приёмника заявок"}'
```

Ожидаемый ответ: `{"ok":true}`, и в Telegram приходит сообщение с заявкой.

## Что от вас требуется (коротко)

1. **Токен бота** от @BotFather.
2. **chat_id** (лично или группа).
3. Разместить `telegram-form.php` на сервере и задать обе переменные окружения.
4. Дать мне итоговый URL приёмника, чтобы прописать его в сайте (или впишите сами
   в `VITE_REQUEST_ENDPOINT` / `requestEndpoint`).
