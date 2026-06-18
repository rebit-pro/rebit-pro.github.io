<script setup lang="ts">
import { portfolioItems } from '@/content/portfolio'
</script>

<template>
  <section id="portfolio" class="section section--light">
    <v-container>
      <div class="section__heading">
        <div class="section__overline">Портфолио</div>
        <h2 class="section__title">Проекты, где сайт решает бизнес-задачу</h2>
        <p class="section__description">
          Каталоги, интернет-магазины и промо-страницы: показываем не только картинку,
          а то, как интерфейс помогает выбирать, покупать и оставлять заявки.
        </p>
      </div>

      <v-row>
        <v-col v-for="item in portfolioItems" :key="item.slug" cols="12" md="6">
          <v-card class="surface-card portfolio-card" elevation="0" :to="`/portfolio/${item.slug}/`">
            <v-img :src="item.image" :alt="item.title" class="portfolio-card__image" cover />
            <div class="portfolio-card__body">
              <div class="text-caption text-primary font-weight-bold mb-2">{{ item.client }}</div>
              <h3 class="portfolio-card__title">{{ item.title }}</h3>
              <p class="portfolio-card__summary">{{ item.summary }}</p>
              <div class="d-flex flex-wrap ga-2">
                <v-chip v-for="service in item.services.slice(0, 4)" :key="service" size="small" color="secondary" variant="tonal">
                  {{ service }}
                </v-chip>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.portfolio-card {
  overflow: hidden;
}

.portfolio-card__image {
  height: 280px;
}

.portfolio-card__body {
  padding: 22px;
}

.portfolio-card__title {
  margin: 0 0 10px;
  color: var(--rb-color-text);
  font-size: 1.25rem;
  font-weight: 800;
}

.portfolio-card__summary {
  margin: 0 0 18px;
  color: var(--rb-color-muted);
  line-height: 1.65;
}
</style>

