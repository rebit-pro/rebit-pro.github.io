<script setup lang="ts">
import { aiSolutions } from '@/data/portfolio'
</script>

<template>
  <section id="ai" class="section section--sand ai-section">
    <v-container>
      <div class="section__heading">
        <div class="section__overline">ИИ для бизнеса</div>
        <h2 class="section__title">ИИ-инструменты, которые приносят пользу, а не хайп</h2>
        <p class="section__description">
          Внедряем искусственный интеллект там, где он экономит время и деньги: ИИ-чат-боты
          и ассистенты на базе LLM, автоматизация процессов в CRM, генерация контента для
          каталога и обработка документов. Подбираем модель под ваши данные — от облачных API
          до self-hosted.
        </p>
      </div>

      <v-row>
        <v-col
          v-for="item in aiSolutions"
          :key="item.title"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="surface-card ai-card" rounded="lg" elevation="0">
            <v-card-item>
              <v-avatar size="44" color="primary" variant="tonal" class="mb-3">
                <v-icon>{{ item.icon }}</v-icon>
              </v-avatar>
              <v-card-title class="text-subtitle-1 font-weight-bold text-wrap">
                {{ item.title }}
              </v-card-title>
            </v-card-item>

            <v-card-text class="rb-muted">
              {{ item.description }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <div class="ai-section__actions">
        <v-btn color="primary" size="large" rounded="lg" to="/services/ai-chatbots/" append-icon="mdi-arrow-right">
          Подробнее об ИИ-услугах
        </v-btn>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.ai-card {
  height: 100%;
}

.ai-section__actions {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}
</style>
