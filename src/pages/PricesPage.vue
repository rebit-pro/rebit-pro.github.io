<script setup lang="ts">
import PricingSection from '@/components/PricingSection.vue'
</script>

<template>
  <main>
    <section class="page-hero">
      <v-container>
        <div class="page-hero__overline">Цены</div>
        <h1 class="page-hero__title">Цены на лендинг, сайт-визитку и разработку MVP</h1>
        <p class="page-hero__description">
          Простые сайты запускаем пакетно: от 20 000 ₽ за лендинг и 50 000 ₽ за
          сайт-визитку. Микро-MVP с админкой — от 100 000 ₽. Сложные проекты,
          Битрикс и интеграции оцениваем отдельно.
        </p>
      </v-container>
    </section>
    <PricingSection />
  </main>
</template>
