<script setup lang="ts">
import { faqItems } from '@/data/portfolio'
</script>

<template>
  <section id="faq" class="section section--light">
    <v-container>
      <div class="section__heading">
        <div class="section__overline">FAQ</div>
        <h2 class="section__title">Вопросы бизнеса, студий и проектных команд</h2>
        <p class="section__description">
          Короткие ответы по форматам сотрудничества, Bitrix-задачам, legacy,
          предпроектной документации и работе с проектными площадками.
        </p>
      </div>

      <div class="faq-grid">
        <v-card
          v-for="item in faqItems"
          :key="item.question"
          class="surface-card faq-card"
          rounded="lg"
          elevation="0"
        >
          <v-card-item>
            <template #prepend>
              <v-avatar size="38" color="secondary" variant="tonal">
                <v-icon icon="mdi-help-circle-outline" />
              </v-avatar>
            </template>
            <v-card-title class="text-subtitle-1 font-weight-bold text-wrap">
              {{ item.question }}
            </v-card-title>
          </v-card-item>

          <v-card-text style="color: rgba(15, 23, 42, 0.72)">
            {{ item.answer }}
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.faq-card {
  height: 100%;
}
</style>
