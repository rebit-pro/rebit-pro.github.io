<script setup lang="ts">
import { siteConfig } from '@/config/site'
</script>

<template>
  <main>
    <section class="page-hero">
      <v-container>
        <div class="page-hero__overline">Документы</div>
        <h1 class="page-hero__title">Политика конфиденциальности</h1>
        <p class="page-hero__description">
          Кратко о том, какие данные нужны для обработки обращения и как с ними работаем.
        </p>
      </v-container>
    </section>

    <section class="section section--light">
      <v-container>
        <v-card class="surface-card page-panel privacy-panel" elevation="0">
          <h2 class="page-section-title">Какие данные передаются</h2>
          <p class="rb-muted">
            При обращении вы можете передать имя, контакт, ссылку на проект и описание задачи. Эти данные используются только для ответа и подготовки оценки работ.
          </p>

          <h2 class="page-section-title">Как связаться</h2>
          <p class="rb-muted">
            По вопросам обработки обращений можно написать на
            <a :href="`mailto:${siteConfig.email}`">{{ siteConfig.email }}</a>.
          </p>
        </v-card>
      </v-container>
    </section>
  </main>
</template>

