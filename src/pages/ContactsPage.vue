<script setup lang="ts">
import ContactSection from '@/components/ContactSection.vue'
</script>

<template>
  <main>
    <section class="page-hero">
      <v-container>
        <div class="page-hero__overline">Контакты</div>
        <h1 class="page-hero__title">Обсудим проект, аудит или интеграцию</h1>
        <p class="page-hero__description">
          Пришлите ссылку на проект, описание проблемы, желаемый результат и сроки. Этого достаточно для первого разговора.
        </p>
      </v-container>
    </section>
    <ContactSection />
  </main>
</template>

