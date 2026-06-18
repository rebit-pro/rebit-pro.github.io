<script setup lang="ts">
import { computed } from 'vue'
import { portfolioItems } from '@/content/portfolio'
import NotFoundPage from './NotFoundPage.vue'

const props = defineProps<{
  readonly slug: string
}>()

const item = computed(() => portfolioItems.find((portfolioItem) => portfolioItem.slug === props.slug))
</script>

<template>
  <main v-if="item">
    <section class="page-hero">
      <v-container>
        <div class="page-hero__overline">{{ item.client }}</div>
        <h1 class="page-hero__title">{{ item.title }}</h1>
        <p class="page-hero__description">{{ item.summary }}</p>
      </v-container>
    </section>

    <section class="section section--light">
      <v-container>
        <v-row>
          <v-col cols="12" md="7">
            <v-img :src="item.image" :alt="item.title" class="portfolio-detail__image" cover />
          </v-col>
          <v-col cols="12" md="5">
            <v-card class="surface-card page-panel" elevation="0">
              <h2 class="page-section-title">Польза для бизнеса</h2>
              <v-list bg-color="transparent" class="pa-0">
                <v-list-item v-for="value in item.businessValue" :key="value" class="px-0">
                  <template #prepend>
                    <v-icon color="primary" icon="mdi-check-circle-outline" class="mr-2" />
                  </template>
                  <v-list-item-title class="text-wrap">{{ value }}</v-list-item-title>
                </v-list-item>
              </v-list>

              <h2 class="page-section-title mt-8">Что делали</h2>
              <div class="d-flex flex-wrap ga-2">
                <v-chip v-for="service in item.services" :key="service" color="secondary" variant="tonal">
                  {{ service }}
                </v-chip>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </main>

  <NotFoundPage v-else />
</template>

<style scoped>
.portfolio-detail__image {
  min-height: 520px;
  border: 1px solid var(--rb-color-line);
  border-radius: var(--rb-radius-card);
  box-shadow: var(--rb-shadow-soft);
}
</style>
