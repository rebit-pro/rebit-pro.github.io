<script setup lang="ts">
import PricingSection from '@/components/PricingSection.vue'
</script>

<template>
  <main>
    <section class="page-hero">
      <v-container>
        <div class="page-hero__overline">Цены</div>
        <h1 class="page-hero__title">Услуги и цены на разработку сайта, каталога и интернет-магазина</h1>
        <p class="page-hero__description">
          Публикуем стартовые ориентиры, чтобы бизнес мог быстро понять порядок бюджета:
          сайт под ключ, интернет-магазин, доработка Bitrix и технический аудит.
        </p>
      </v-container>
    </section>
    <PricingSection />
  </main>
</template>
