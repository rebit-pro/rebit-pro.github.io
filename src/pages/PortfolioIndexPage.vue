<script setup lang="ts">
import { portfolioItems } from '@/content/portfolio'
</script>

<template>
  <main>
    <section class="page-hero">
      <v-container>
        <div class="page-hero__overline">Портфолио</div>
        <h1 class="page-hero__title">Проекты для бизнеса: каталоги, магазины и сайты под ключ</h1>
        <p class="page-hero__description">
          В портфолио собраны проекты, где важны понятный каталог, быстрая навигация,
          корзина, оформление заказа, заявки и готовность к SEO-продвижению.
        </p>
      </v-container>
    </section>

    <section class="section section--light">
      <v-container>
        <v-row>
          <v-col v-for="item in portfolioItems" :key="item.slug" cols="12" md="6">
            <v-card class="surface-card portfolio-page-card" elevation="0" :to="`/portfolio/${item.slug}/`">
              <v-img :src="item.image" :alt="item.title" class="portfolio-page-card__image" cover />
              <div class="portfolio-page-card__body">
                <div class="text-caption text-primary font-weight-bold mb-2">{{ item.client }}</div>
                <h2 class="portfolio-page-card__title">{{ item.title }}</h2>
                <p class="rb-muted">{{ item.summary }}</p>
                <v-list bg-color="transparent" class="pa-0 mt-3">
                  <v-list-item v-for="value in item.businessValue" :key="value" class="px-0">
                    <template #prepend>
                      <v-icon color="primary" icon="mdi-check-circle-outline" class="mr-2" />
                    </template>
                    <v-list-item-title class="text-wrap">{{ value }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </main>
</template>

<style scoped>
.portfolio-page-card {
  overflow: hidden;
}

.portfolio-page-card__image {
  height: 340px;
}

.portfolio-page-card__body {
  padding: 24px;
}

.portfolio-page-card__title {
  margin: 0 0 12px;
  color: var(--rb-color-text);
  font-size: 1.35rem;
  font-weight: 800;
}
</style>

