<script setup lang="ts">
import { articles } from '@/data/portfolio'
</script>

<template>
  <section id="articles" class="section">
    <v-container>
      <div class="section__heading">
        <div class="section__overline">Статьи</div>
        <h2 class="section__title">Экспертные материалы в подготовке</h2>
        <p class="section__description">
          Темы, которые помогут заказчику лучше понимать аудит, оптимизацию,
          интеграции и безопасное развитие PHP / Bitrix-проектов.
        </p>
      </div>

      <v-row>
        <v-col v-for="article in articles" :key="article.title" cols="12" md="4">
          <v-card
            class="surface-card d-flex flex-column"
            rounded="lg"
            elevation="0"
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

            <v-card-text class="flex-grow-1" style="color: rgba(15, 23, 42, 0.7)">
              {{ article.excerpt }}
            </v-card-text>

            <v-card-text class="pt-0 d-flex align-center text-caption" style="color: rgba(15, 23, 42, 0.6)">
              <v-icon icon="mdi-clock-outline" size="14" class="mr-1" />
              {{ article.readingTime }}
            </v-card-text>

            <v-card-text v-if="!article.link" class="pt-0">
              <v-chip size="small" color="secondary" variant="tonal">
                В плане публикаций
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
