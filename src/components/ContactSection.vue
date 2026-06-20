<script setup lang="ts">
import { contacts, profile } from '@/data/portfolio'
import { useRequestDialog } from '@/composables/useRequestDialog'

const { open } = useRequestDialog()
</script>

<template>
  <section id="contact" class="section section--sand">
    <v-container>
      <div class="section__heading">
        <div class="section__overline">Контакты</div>
        <h2 class="section__title">Давайте обсудим задачу</h2>
        <p class="section__description">
          Открыты к проектной работе: аудитам, сложным доработкам, интеграциям,
          оптимизации и долгосрочному сопровождению PHP / Bitrix-проектов.
          Чтобы быстрее оценить задачу, пришлите ссылку на проект, описание проблемы,
          желаемый результат и сроки.
        </p>

        <div class="contact__actions">
          <v-btn
            color="primary"
            size="large"
            prepend-icon="mdi-message-text-outline"
            @click="open"
          >
            Оставить заявку
          </v-btn>
          <v-btn
            :href="profile.contactHref"
            target="_blank"
            rel="noopener"
            variant="outlined"
            color="secondary"
            size="large"
            prepend-icon="mdi-send"
          >
            Написать в Telegram
          </v-btn>
        </div>
      </div>

      <div class="contact__grid">
        <v-card
          v-for="contact in contacts"
          :key="contact.label"
          :href="contact.href"
          target="_blank"
          rel="noopener"
          class="surface-card contact__card pa-6 text-center"
          rounded="lg"
          elevation="0"
        >
          <v-avatar size="52" color="primary" variant="tonal" class="mb-3">
            <v-icon size="26">{{ contact.icon }}</v-icon>
          </v-avatar>
          <div class="text-subtitle-1 font-weight-bold">{{ contact.label }}</div>
          <div class="text-body-2 rb-muted">
            {{ contact.value }}
          </div>
        </v-card>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.contact__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

.contact__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  max-width: 820px;
  margin: 0 auto;
}

.contact__card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
