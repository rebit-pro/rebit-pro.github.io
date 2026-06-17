<script setup lang="ts">
import AboutSection from '@/components/AboutSection.vue'
import ArchitectureSection from '@/components/ArchitectureSection.vue'
import StackSection from '@/components/StackSection.vue'
</script>

<template>
  <main>
    <section class="page-hero">
      <v-container>
        <div class="page-hero__overline">О студии</div>
        <h1 class="page-hero__title">Инженерный подход к развитию цифровых продуктов</h1>
        <p class="page-hero__description">
          ReBit Studio помогает командам стабилизировать сложные системы, развивать legacy и выпускать изменения без хаоса.
        </p>
      </v-container>
    </section>
    <AboutSection />
    <ArchitectureSection />
    <StackSection />
  </main>
</template>

