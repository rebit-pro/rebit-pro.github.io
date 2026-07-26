<script setup lang="ts">
import { serviceGroups, services } from '@/content/services'
</script>

<template>
  <main>
    <section class="page-hero">
      <v-container>
        <div class="page-hero__overline">Услуги</div>
        <h1 class="page-hero__title">Сайты, веб-сервисы, чат-боты и интеграции для бизнеса</h1>
        <p class="page-hero__description">
          Быстро запускаем типовые сайты через Vibe Coding, сложные продукты ведём в
          Deep Coding. Отдельно разрабатываем ботов и мини-приложения для MAX и Telegram,
          работаем с 1С-Битрикс, Битрикс24, CRM и внешними API.
        </p>
        <div class="page-hero__actions">
          <v-btn
            color="primary"
            to="/services/project-estimate/"
            prepend-icon="mdi-file-document-outline"
          >
            Оценить проект по ТЗ
          </v-btn>
          <v-btn variant="outlined" color="secondary" to="/prices/">Цены</v-btn>
        </div>
      </v-container>
    </section>

    <section
      v-for="(group, index) in serviceGroups"
      :key="group.id"
      class="section"
      :class="index % 2 === 0 ? 'section--light' : 'section--sand'"
    >
      <v-container>
        <div class="section__heading">
          <div class="section__overline">Направление</div>
          <h2 class="section__title">{{ group.title }}</h2>
          <p class="section__description">{{ group.description }}</p>
        </div>

        <v-row>
          <v-col
            v-for="service in services.filter((item) => item.group === group.id)"
            :key="service.slug"
            cols="12"
            md="6"
            lg="4"
          >
            <v-card class="surface-card page-card d-flex flex-column" elevation="0" :to="`/services/${service.slug}/`">
              <v-card-item>
                <v-avatar size="44" color="primary" variant="tonal" class="mb-3">
                  <v-icon>{{ service.icon }}</v-icon>
                </v-avatar>
                <v-card-title class="text-subtitle-1 font-weight-bold text-wrap">
                  {{ service.title }}
                </v-card-title>
              </v-card-item>
              <v-card-text class="rb-muted flex-grow-1">
                {{ service.description }}
                <div v-if="service.price" class="service-price">{{ service.price }}</div>
              </v-card-text>
              <v-card-actions class="px-4 pb-4 service-link">
                <span>Подробнее</span>
                <v-icon icon="mdi-arrow-right" size="20" />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </main>
</template>

<style scoped>
.service-price {
  margin-top: 14px;
  color: var(--rb-color-accent);
  font-weight: 800;
  line-height: 1.45;
}

.service-link {
  gap: 6px;
  color: var(--rb-color-accent);
  font-weight: 800;
}
</style>
