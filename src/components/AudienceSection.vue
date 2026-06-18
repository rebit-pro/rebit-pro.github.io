<script setup lang="ts">
import { audienceSegments } from '@/data/portfolio'
</script>

<template>
  <section id="audience" class="section section--light">
    <v-container>
      <div class="section__heading">
        <div class="section__overline">Для каких задач</div>
        <h2 class="section__title">Проектная PHP / Bitrix-экспертиза для бизнеса</h2>
        <p class="section__description">
          Подключаемся там, где нужно развить сайт, каталог, интернет-магазин,
          интеграцию или сложный backend без хаоса в коде и процессах.
        </p>
      </div>

      <v-row>
        <v-col
          v-for="segment in audienceSegments"
          :key="segment.title"
          cols="12"
          md="6"
        >
          <v-card class="surface-card pa-2" rounded="lg" elevation="0">
            <v-card-item>
              <template #prepend>
                <v-avatar size="46" color="secondary" variant="tonal">
                  <v-icon>{{ segment.icon }}</v-icon>
                </v-avatar>
              </template>
              <v-card-title class="text-subtitle-1 font-weight-bold text-wrap">
                {{ segment.title }}
              </v-card-title>
            </v-card-item>

            <v-card-text class="rb-muted">
              {{ segment.description }}
            </v-card-text>

            <v-card-text class="pt-0">
              <div class="d-flex flex-wrap ga-2">
                <v-chip
                  v-for="point in segment.points"
                  :key="point"
                  size="small"
                  variant="tonal"
                  color="primary"
                >
                  {{ point }}
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
