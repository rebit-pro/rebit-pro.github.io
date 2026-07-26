<script setup lang="ts">
import { services } from '@/content/services'

const featuredServices = services.filter((service) => service.featured)
</script>

<template>
  <section id="services" class="section section--light services-section">
    <v-container>
      <div class="section__heading">
        <div class="section__overline services-section__overline">Услуги</div>
        <h2 class="section__title services-section__title">
          Восемь основных направлений — от лендинга до сложной интеграции
        </h2>
        <p class="section__description services-section__description">
          Типовые сайты запускаем быстро и по фиксированному составу. Для личных кабинетов,
          платежей, 1С, CRM и сложной логики включаем инженерный Deep-режим. MAX, Telegram
          и 1С-Битрикс развиваем как самостоятельные направления.
        </p>
      </div>

      <v-row>
        <v-col
          v-for="service in featuredServices"
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
              <div v-if="service.price" class="service-card__price">{{ service.price }}</div>
            </v-card-text>

            <v-card-actions class="px-4 pb-4 pt-0 service-card__link">
              <span>Подробнее</span>
              <v-icon icon="mdi-arrow-right" size="20" />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <div class="services-section__more">
        <v-btn variant="outlined" color="secondary" to="/services/" append-icon="mdi-arrow-right">
          Все услуги
        </v-btn>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.service-card {
  height: 100%;
}

.service-card__price {
  margin-top: 14px;
  color: var(--rb-color-accent);
  font-weight: 800;
  line-height: 1.45;
}

.service-card__link {
  gap: 6px;
  color: var(--rb-color-accent);
  font-weight: 800;
}

.services-section__more {
  margin-top: 28px;
  text-align: center;
}
</style>
