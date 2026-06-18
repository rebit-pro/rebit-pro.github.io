<script setup lang="ts">
import TopBar from './components/TopBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import RequestFormDialog from './components/RequestFormDialog.vue'
import { useRequestDialog } from './composables/useRequestDialog'

const { open } = useRequestDialog()
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
