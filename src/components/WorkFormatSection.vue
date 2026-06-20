<script setup lang="ts">
import { workFormats } from '@/data/portfolio'
</script>

<template>
  <section id="work-format" class="section section--sand">
    <v-container>
      <div class="section__heading">
        <div class="section__overline">Формат работы</div>
        <h2 class="section__title">Проектное сотрудничество с понятным форматом</h2>
        <p class="section__description">
          Подключаемся к задачам гибко: от разовой консультации до долгосрочного сопровождения
          как внешняя инженерная команда с официальным проектным форматом работы.
        </p>
      </div>

      <v-row>
        <v-col
          v-for="format in workFormats"
          :key="format.title"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card class="surface-card format-card" rounded="lg" elevation="0">
            <v-card-item>
              <v-avatar size="44" color="secondary" variant="tonal" class="mb-3">
                <v-icon>{{ format.icon }}</v-icon>
              </v-avatar>
              <v-card-title class="text-subtitle-1 font-weight-bold text-wrap">
                {{ format.title }}
              </v-card-title>
            </v-card-item>

            <v-card-text class="rb-muted">
              {{ format.description }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.format-card {
  height: 100%;
}
</style>
