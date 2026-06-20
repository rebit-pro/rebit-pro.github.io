<script setup lang="ts">
import { entryOffer, pricingItems } from '@/content/pricing'
import { guarantees } from '@/data/portfolio'
import { useRequestDialog } from '@/composables/useRequestDialog'

const { open } = useRequestDialog()
</script>

<template>
  <section id="prices" class="section section--sand">
    <v-container>
      <div class="section__heading">
        <div class="section__overline">Услуги и цены</div>
        <h2 class="section__title">Понятные ориентиры и фиксированная смета после диагностики</h2>
        <p class="section__description">
          Для бизнеса важна не абстрактная ставка, а предсказуемость: что входит, какой результат
          на выходе, какие риски и сколько это стоит. Поэтому сначала диагностика, потом —
          фиксированная смета и работа по этапам.
        </p>
      </div>

      <!-- Входной оффер (трипвайр): дешёвый безрисковый первый шаг -->
      <v-card class="surface-card entry-offer" rounded="lg" elevation="0">
        <div class="entry-offer__main">
          <div class="entry-offer__badge">С этого удобно начать</div>
          <h3 class="entry-offer__title">{{ entryOffer.title }}</h3>
          <div class="entry-offer__price">{{ entryOffer.price }}</div>
          <p class="entry-offer__target">{{ entryOffer.target }}</p>
          <p class="rb-muted entry-offer__desc">{{ entryOffer.description }}</p>
          <v-btn color="primary" size="large" prepend-icon="mdi-magnify-scan" @click="open">
            Заказать диагностику
          </v-btn>
        </div>
        <ul class="entry-offer__list">
          <li v-for="entry in entryOffer.includes" :key="entry">
            <v-icon color="primary" icon="mdi-check" size="20" class="mr-2" />
            <span>{{ entry }}</span>
          </li>
        </ul>
      </v-card>

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
        Цены — ориентир. Итоговая смета фиксируется после короткой диагностики: объём каталога,
        интеграции, состояние текущего сайта, требования к SEO и сроки могут сильно менять трудоёмкость.
      </div>

      <!-- Снятие риска -->
      <div class="guarantees">
        <h3 class="guarantees__title">Как мы снижаем риск</h3>
        <div class="guarantees__grid">
          <div v-for="g in guarantees" :key="g.title" class="guarantee">
            <v-avatar size="40" color="primary" variant="tonal" class="guarantee__icon">
              <v-icon size="22">{{ g.icon }}</v-icon>
            </v-avatar>
            <div>
              <div class="guarantee__name">{{ g.title }}</div>
              <div class="rb-muted guarantee__desc">{{ g.description }}</div>
            </div>
          </div>
        </div>
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

<style scoped lang="scss">
.entry-offer {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  align-items: center;
  justify-content: space-between;
  padding: 28px;
  margin-bottom: 28px;
  border: 2px solid color-mix(in srgb, var(--rb-color-accent) 45%, transparent);
}

.entry-offer__main {
  flex: 1 1 320px;
}

.entry-offer__badge {
  display: inline-block;
  margin-bottom: 10px;
  padding: 4px 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--rb-color-accent) 16%, transparent);
  color: var(--rb-color-accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.entry-offer__title {
  margin: 0 0 6px;
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--rb-color-text);
}

.entry-offer__price {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--rb-color-accent);
}

.entry-offer__target {
  margin: 6px 0 10px;
  font-weight: 700;
  color: var(--rb-color-text);
  line-height: 1.45;
}

.entry-offer__desc {
  margin: 0 0 18px;
  line-height: 1.6;
}

.entry-offer__list {
  flex: 1 1 280px;
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
}

.entry-offer__list li {
  display: flex;
  align-items: flex-start;
  color: var(--rb-color-text);
  line-height: 1.45;
}

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

.guarantees {
  margin-top: 40px;
}

.guarantees__title {
  margin: 0 0 20px;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--rb-color-text);
}

.guarantees__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.guarantee {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.guarantee__icon {
  flex: 0 0 auto;
}

.guarantee__name {
  font-weight: 800;
  color: var(--rb-color-text);
  margin-bottom: 2px;
}

.guarantee__desc {
  font-size: 0.9rem;
  line-height: 1.5;
}

.pricing-cta {
  margin: 36px auto 0;
  text-align: center;
}

.pricing-cta__hint {
  max-width: 560px;
  margin: 12px auto 0;
  font-size: 0.88rem;
  line-height: 1.55;
}
</style>
