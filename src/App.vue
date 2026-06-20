<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import TopBar from './components/TopBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import RequestFormDialog from './components/RequestFormDialog.vue'
import { useRequestDialog } from './composables/useRequestDialog'

const { open } = useRequestDialog()

// Прячем плавающую кнопку, когда виден футер, — иначе она перекрывает
// иконки-ссылки в правом нижнем углу. При прокрутке вверх кнопка возвращается.
const fabHidden = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') {
    return
  }

  const footer = document.querySelector('.footer')
  if (!footer) {
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      fabHidden.value = entry.isIntersecting
    },
    { rootMargin: '0px 0px -16px 0px' },
  )
  observer.observe(footer)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <v-app>
    <div class="site">
      <TopBar />
      <RouterView />
      <SiteFooter />
    </div>

    <!-- Кнопка заявки доступна в любом разделе сайта -->
    <v-btn
      class="request-fab"
      :class="{ 'request-fab--hidden': fabHidden }"
      color="primary"
      size="large"
      rounded="pill"
      elevation="6"
      prepend-icon="mdi-message-text-outline"
      @click="open"
    >
      <span class="request-fab__label">Оставить заявку</span>
    </v-btn>

    <RequestFormDialog />
  </v-app>
</template>

<style scoped lang="scss">
.request-fab {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 90;
  transition:
    opacity 0.25s ease,
    transform 0.25s ease,
    visibility 0.25s ease;
}

// Когда виден футер — убираем кнопку, чтобы не перекрывать его ссылки.
.request-fab--hidden {
  opacity: 0;
  visibility: hidden;
  transform: translateY(16px);
  pointer-events: none;
}

// На узких экранах оставляем компактную кнопку с иконкой, без подписи.
@media (max-width: 600px) {
  .request-fab {
    right: 16px;
    bottom: 16px;
  }

  .request-fab :deep(.v-btn__prepend) {
    margin-inline-end: 0;
  }

  .request-fab__label {
    display: none;
  }
}
</style>
