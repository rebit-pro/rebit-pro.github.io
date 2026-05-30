<script setup lang="ts">
import { services } from '@/data/portfolio'
</script>

<template>
  <section id="services" class="section section--light services-section">
    <v-container>
      <div class="section__heading">
        <div class="section__overline services-section__overline">Чем могу помочь</div>
        <h2 class="section__title services-section__title">
          Решаю задачи, которые требуют сильного PHP / Bitrix backend
        </h2>
        <p class="section__description services-section__description">
          От точечной доработки до аудита, интеграций и постепенного рефакторинга legacy —
          без лишней бюрократии и с фокусом на результат.
        </p>
      </div>

      <v-row>
        <v-col
          v-for="service in services"
          :key="service.title"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="surface-card service-card" rounded="lg" elevation="0">
            <v-card-item>
              <v-avatar size="44" color="primary" variant="tonal" class="mb-3">
                <v-icon>{{ service.icon }}</v-icon>
              </v-avatar>
              <v-card-title class="text-subtitle-1 font-weight-bold text-wrap">
                {{ service.title }}
              </v-card-title>
            </v-card-item>

            <v-card-text style="color: rgba(15, 23, 42, 0.72)">
              {{ service.description }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.services-section {
  background: #f8fafc;
}

.services-section__overline {
  color: #5e35b1;
}

.services-section__title {
  color: #0f172a;
}

.services-section__description {
  color: rgba(15, 23, 42, 0.72);
}

.service-card {
  height: 100%;
  background: #fff;
}
</style>
