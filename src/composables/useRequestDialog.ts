import { ref } from 'vue'

// Глобальное состояние модального окна заявки — одно на всё приложение,
// чтобы кнопку «Оставить заявку» можно было разместить в любом разделе.
const isOpen = ref(false)

export function useRequestDialog() {
  function open(): void {
    isOpen.value = true
  }

  function close(): void {
    isOpen.value = false
  }

  return { isOpen, open, close }
}
