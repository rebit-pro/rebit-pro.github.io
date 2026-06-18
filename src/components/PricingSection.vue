<script setup lang="ts">
import { pricingItems } from '@/content/pricing'
</script>

<template>
  <section id="prices" class="section section--sand">
    <v-container>
      <div class="section__heading">
        <div class="section__overline">Услуги и цены</div>
        <h2 class="section__title">Стоимость зависит от задачи, но стартовые ориентиры понятны</h2>
        <p class="section__description">
          Для бизнеса важна не абстрактная ставка, а прогнозируемый этап работ:
          что входит, какой результат будет на выходе и какие риски надо учесть.
        </p>
      </div>

      <v-row>
        <v-col v-for="item in pricingItems" :key="item.slug" cols="12" md="6" lg="3">
          <v-card class="surface-card pricing-card" elevation="0">
            <v-card-title class="pricing-card__title text-wrap">{{ item.title }}</v-card-title>
            <v-card-text>
              <div class="pricing-card__price">{{ item.price }}</div>
              <p class="pricing-card__target">{{ item.target }}</p>
              <p class="rb-muted">{{ item.description }}</p>
              <v-list bg-color="transparent" class="pa-0 mt-3">
                <v-list-item v-for="entry in item.includes" :key="entry" class="px-0">
                  <template #prepend>
                    <v-icon color="primary" icon="mdi-check" class="mr-2" />
                  </template>
                  <v-list-item-title class="text-wrap">{{ entry }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <div class="pricing-note">
        Итоговая смета фиксируется после короткой диагностики: объём каталога, интеграции,
        состояние текущего сайта, требования к SEO и сроки могут сильно менять трудоёмкость.
      </div>

      <div class="pricing-cta">
        <v-btn
          to="/services/project-estimate/"
          color="primary"
          size="large"
          prepend-icon="mdi-file-document-outline"
        >
          Рассчитать стоимость по ТЗ
        </v-btn>
        <p class="pricing-cta__hint rb-muted">
          Пришлите ТЗ — вышлем план работ и смету за 1 рабочий день. Бесплатно и конфиденциально.
        </p>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.pricing-card {
  height: 100%;
  padding: 10px;
}

.pricing-card__title {
  min-height: 72px;
  color: var(--rb-color-text);
  font-weight: 800;
}

.pricing-card__price {
  margin-bottom: 10px;
  color: var(--rb-color-accent);
  font-size: 1.35rem;
  font-weight: 900;
}

.pricing-card__target {
  min-height: 64px;
  margin: 0 0 14px;
  color: var(--rb-color-text);
  font-weight: 700;
  line-height: 1.45;
}

.pricing-note {
  max-width: 900px;
  margin: 28px auto 0;
  color: var(--rb-color-muted);
  font-size: 0.95rem;
  line-height: 1.65;
  text-align: center;
}

.pricing-cta {
  margin: 20px auto 0;
  text-align: center;
}

.pricing-cta__hint {
  max-width: 560px;
  margin: 12px auto 0;
  font-size: 0.88rem;
  line-height: 1.55;
}
</style>

