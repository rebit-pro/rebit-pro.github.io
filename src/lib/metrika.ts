// Идентификатор счётчика совпадает с инициализацией в index.html.
const METRIKA_ID = 109526106

/**
 * Безопасно отправляет достижение цели в Яндекс.Метрику.
 * Если счётчик ещё не загрузился (или отключён блокировщиком) — тихо выходим.
 */
export function reachGoal(goal: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') {
    return
  }

  window.ym(METRIKA_ID, 'reachGoal', goal, params)
}
