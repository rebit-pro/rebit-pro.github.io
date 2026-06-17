<script setup lang="ts">
import { articles } from '@/content/articles'
</script>

<template>
  <main>
    <section class="page-hero">
      <v-container>
        <div class="page-hero__overline">Блог</div>
        <h1 class="page-hero__title">Экспертные материалы в подготовке</h1>
        <p class="page-hero__description">
          Блог станет вторым SEO-слоем после услуг и кейсов: Bitrix performance, интеграции, legacy PHP и архитектура.
        </p>
      </v-container>
    </section>

    <section class="section section--light">
      <v-container>
        <v-row>
          <v-col v-for="article in articles" :key="article.slug" cols="12" md="4">
            <v-card class="surface-card page-card" elevation="0">
              <v-card-title class="text-subtitle-1 font-weight-bold text-wrap">
                {{ article.title }}
              </v-card-title>
              <v-card-text class="rb-muted">{{ article.excerpt }}</v-card-text>
              <v-card-text class="pt-0 text-caption rb-muted">
                <v-icon icon="mdi-clock-outline" size="14" class="mr-1" />
                {{ article.readingTime }}
              </v-card-text>
              <v-card-text class="pt-0">
                <v-chip color="secondary" variant="tonal" size="small">В плане публикаций</v-chip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </main>
</template>

