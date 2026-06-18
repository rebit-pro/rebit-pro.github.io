<script setup lang="ts">
import { articles } from '@/content/articles'

function articleTo(slug: string): string {
  return `/blog/${slug}/`
}
</script>

<template>
  <main>
    <section class="page-hero">
      <v-container>
        <div class="page-hero__overline">Блог</div>
        <h1 class="page-hero__title">Экспертные материалы о Bitrix, PHP и интеграциях</h1>
        <p class="page-hero__description">
          Разбираем технические темы на языке пользы для бизнеса: производительность 1С-Битрикс,
          интеграции с 1С и CRM, безопасный рефакторинг legacy и архитектура без хаоса.
        </p>
      </v-container>
    </section>

    <section class="section section--light">
      <v-container>
        <v-row>
          <v-col v-for="article in articles" :key="article.slug" cols="12" md="6" lg="4">
            <v-card
              class="surface-card page-card d-flex flex-column"
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
              <v-card-text class="flex-grow-1 rb-muted">{{ article.excerpt }}</v-card-text>
              <v-card-text class="pt-0 d-flex align-center text-caption rb-muted">
                <v-icon icon="mdi-clock-outline" size="14" class="mr-1" />
                {{ article.readingTime }}
                <span class="mx-2">·</span>
                <v-icon icon="mdi-update" size="14" class="mr-1" />
                {{ article.updated }}
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
      </v-container>
    </section>
  </main>
</template>
