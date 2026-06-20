<script setup lang="ts">
import { articles } from '@/content/articles'

function articleTo(slug: string): string {
  return `/blog/${slug}/`
}
</script>

<template>
  <section id="articles" class="section section--sand">
    <v-container>
      <div class="section__heading">
        <div class="section__overline">Статьи</div>
        <h2 class="section__title">Экспертные материалы для бизнеса</h2>
        <p class="section__description">
          Технические темы простым языком: аудит и ускорение Bitrix, интеграции с 1С и CRM,
          безопасный рефакторинг legacy и архитектура, которая упрощает доработки.
        </p>
      </div>

      <v-row>
        <v-col v-for="article in articles" :key="article.slug" cols="12" md="6" lg="4">
          <v-card
            class="surface-card d-flex flex-column"
            rounded="lg"
            elevation="0"
            :to="article.link ? undefined : articleTo(article.slug)"
            :href="article.link"
            :target="article.link ? '_blank' : undefined"
            rel="noopener"
          >
            <v-card-item>
              <v-avatar size="42" color="primary" variant="tonal" class="mb-3">
                <v-icon>mdi-file-document-outline</v-icon>
              </v-avatar>
              <v-card-title class="text-subtitle-1 font-weight-bold text-wrap">
                {{ article.title }}
              </v-card-title>
            </v-card-item>

            <v-card-text class="flex-grow-1 rb-muted">
              {{ article.excerpt }}
            </v-card-text>

            <v-card-text class="pt-0 d-flex align-center text-caption rb-muted">
              <v-icon icon="mdi-clock-outline" size="14" class="mr-1" />
              {{ article.readingTime }}
            </v-card-text>

            <v-card-text class="pt-0">
              <span class="text-primary font-weight-medium d-inline-flex align-center">
                Читать статью
                <v-icon icon="mdi-arrow-right" size="16" class="ml-1" />
              </span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <div class="text-center mt-8">
        <v-btn variant="outlined" color="secondary" to="/blog/">Все статьи блога</v-btn>
      </div>
    </v-container>
  </section>
</template>
