<script setup lang="ts">
import { computed } from 'vue'
import { findCase } from '@/content/cases'
import { services } from '@/content/services'
import NotFoundPage from './NotFoundPage.vue'

const props = defineProps<{
  readonly slug: string
}>()

const caseItem = computed(() => findCase(props.slug))
const relatedServices = computed(() =>
  services.filter((service) => caseItem.value?.relatedServices.includes(service.slug)),
)
</script>

<template>
  <main v-if="caseItem">
    <section class="page-hero">
      <v-container>
        <div class="page-hero__overline">{{ caseItem.client }}</div>
        <h1 class="page-hero__title">{{ caseItem.title }}</h1>
        <p class="page-hero__description">{{ caseItem.description }}</p>
      </v-container>
    </section>

    <section class="section section--light">
      <v-container>
        <v-row>
          <v-col cols="12" md="8">
            <div class="case-story">
              <v-card class="surface-card page-panel" elevation="0">
                <h2 class="page-section-title">Задача</h2>
                <p class="rb-muted">{{ caseItem.problem }}</p>
              </v-card>
              <v-card class="surface-card page-panel" elevation="0">
                <h2 class="page-section-title">Роль ReBit</h2>
                <p class="rb-muted">{{ caseItem.role }}</p>
              </v-card>
              <v-card class="surface-card page-panel" elevation="0">
                <h2 class="page-section-title">Решение</h2>
                <p class="rb-muted">{{ caseItem.solution }}</p>
              </v-card>
              <v-card class="surface-card page-panel" elevation="0">
                <h2 class="page-section-title">Результат</h2>
                <p class="rb-muted">{{ caseItem.result }}</p>
              </v-card>
            </div>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="surface-card page-panel" elevation="0">
              <h2 class="page-section-title">Стек</h2>
              <div class="d-flex flex-wrap ga-2 mb-6">
                <v-chip v-for="tech in caseItem.stack" :key="tech" color="secondary" variant="tonal">
                  {{ tech }}
                </v-chip>
              </div>

              <h2 class="page-section-title">Связанные услуги</h2>
              <div class="d-flex flex-column ga-2">
                <v-btn
                  v-for="service in relatedServices"
                  :key="service.slug"
                  :to="`/services/${service.slug}/`"
                  variant="outlined"
                  color="secondary"
                >
                  {{ service.title }}
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </main>

  <NotFoundPage v-else />
</template>
