<script setup lang="ts">
import { services } from '@/content/services'
</script>

<template>
  <section id="services" class="section section--light services-section">
    <v-container>
      <div class="section__heading">
        <div class="section__overline services-section__overline">Услуги</div>
        <h2 class="section__title services-section__title">
          Разработка сайта, интернет-магазина и Bitrix-проекта под задачи бизнеса
        </h2>
        <p class="section__description services-section__description">
          Делаем сайты под ключ, каталоги, интернет-магазины, доработки 1С-Битрикс,
          интеграции и технический аудит. Bitrix выделяем отдельно, но не ограничиваемся им.
        </p>
      </div>

      <v-row>
        <v-col
          v-for="service in services"
          :key="service.slug"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="surface-card service-card" rounded="lg" elevation="0" :to="`/services/${service.slug}/`">
            <v-card-item>
              <v-avatar size="44" color="primary" variant="tonal" class="mb-3">
                <v-icon>{{ service.icon }}</v-icon>
              </v-avatar>
              <v-card-title class="text-subtitle-1 font-weight-bold text-wrap">
                {{ service.title }}
              </v-card-title>
            </v-card-item>

            <v-card-text class="rb-muted">
              {{ service.description }}
            </v-card-text>

            <v-card-actions class="px-4 pb-4 pt-0">
              <v-btn variant="text" color="primary" append-icon="mdi-arrow-right">
                Подробнее
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.service-card {
  height: 100%;
}
</style>
