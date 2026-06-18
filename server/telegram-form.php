<?php

declare(strict_types=1);

/**
 * Приёмник заявок с сайта ReBit Studio → пересылка в Telegram.
 *
 * Разместите этот файл на своём сервере/VPS (например, по адресу
 * https://api.rebit-pro.ru/telegram-form.php) и пропишите тот же адрес во
 * фронтенде (переменная VITE_REQUEST_ENDPOINT или requestEndpoint в src/config/site.ts).
 *
 * Токен бота и chat_id берутся из переменных окружения и НИКОГДА не попадают
 * в публичный код сайта:
 *   TELEGRAM_BOT_TOKEN  — токен от @BotFather
 *   TELEGRAM_CHAT_ID    — id чата/группы, куда слать заявки
 *
 * Локально (Apache/nginx + php-fpm) переменные можно задать через окружение
 * сервиса, SetEnv в .htaccess, либо временно — в блоке «запасные значения» ниже.
 */

// --- Настройки -------------------------------------------------------------

// Домены, которым разрешено обращаться к приёмнику (CORS).
const ALLOWED_ORIGINS = [
    'https://rebit-pro.ru',
    'https://www.rebit-pro.ru',
];

$botToken = getenv('TELEGRAM_BOT_TOKEN') ?: '';
$chatId   = getenv('TELEGRAM_CHAT_ID') ?: '';

// --- CORS ------------------------------------------------------------------

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, ALLOWED_ORIGINS, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Префлайт-запрос браузера.
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

// --- Вспомогательные функции ----------------------------------------------

/**
 * @param array<string, mixed> $payload
 */
function respond(int $code, array $payload): void
{
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

// --- Проверки --------------------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

if ($botToken === '' || $chatId === '') {
    // Не раскрываем детали наружу, но фиксируем в логах сервера.
    error_log('telegram-form: TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы');
    respond(500, ['ok' => false, 'error' => 'server_misconfigured']);
}

$raw  = file_get_contents('php://input') ?: '';
$data = json_decode($raw, true);

if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'bad_request']);
}

// Honeypot: настоящие пользователи это поле не заполняют.
if (!empty($data['company'])) {
    respond(200, ['ok' => true]);
}

$name        = trim((string)($data['name'] ?? ''));
$phone       = trim((string)($data['phone'] ?? ''));
$description = trim((string)($data['description'] ?? ''));
$page        = trim((string)($data['page'] ?? ''));

if (mb_strlen($name) < 2 || $phone === '' || mb_strlen($description) < 10) {
    respond(422, ['ok' => false, 'error' => 'validation_failed']);
}

// Ограничиваем длину, чтобы уложиться в лимит сообщения Telegram (4096 символов).
$name        = mb_substr($name, 0, 120);
$phone       = mb_substr($phone, 0, 40);
$description = mb_substr($description, 0, 3000);
$page        = mb_substr($page, 0, 300);

// --- Сборка и отправка сообщения ------------------------------------------

$esc = static fn (string $value): string => htmlspecialchars($value, ENT_QUOTES, 'UTF-8');

$lines = [
    '🆕 <b>Новая заявка с сайта</b>',
    '',
    '👤 <b>Имя:</b> ' . $esc($name),
    '📞 <b>Телефон:</b> ' . $esc($phone),
    '',
    '📝 <b>Описание:</b>',
    $esc($description),
];

if ($page !== '') {
    $lines[] = '';
    $lines[] = '🔗 ' . $esc($page);
}

$text = implode("\n", $lines);

$ch = curl_init('https://api.telegram.org/bot' . $botToken . '/sendMessage');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_TIMEOUT        => 10,
    CURLOPT_POSTFIELDS     => http_build_query([
        'chat_id'                  => $chatId,
        'text'                     => $text,
        'parse_mode'               => 'HTML',
        'disable_web_page_preview' => true,
    ]),
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

if ($response === false || $httpCode !== 200) {
    error_log('telegram-form: ошибка отправки в Telegram: ' . $curlErr . ' | ' . (string)$response);
    respond(502, ['ok' => false, 'error' => 'telegram_unreachable']);
}

respond(200, ['ok' => true]);
