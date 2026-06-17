<script setup lang="ts">
import { cases } from '@/content/cases'
</script>

<template>
  <main>
    <section class="page-hero">
      <v-container>
        <div class="page-hero__overline">Кейсы</div>
        <h1 class="page-hero__title">Проектные сценарии и результаты</h1>
        <p class="page-hero__description">
          Кейсы показывают, как ReBit Studio подходит к производительности, интеграциям и legacy-архитектуре.
        </p>
      </v-container>
    </section>

    <section class="section section--light">
      <v-container>
        <v-row>
          <v-col v-for="caseItem in cases" :key="caseItem.slug" cols="12" md="4">
            <v-card class="surface-card page-card d-flex flex-column" elevation="0" :to="`/cases/${caseItem.slug}/`">
              <v-card-item>
                <div class="text-caption text-primary font-weight-bold mb-2">{{ caseItem.client }}</div>
                <v-card-title class="text-subtitle-1 font-weight-bold text-wrap">
                  {{ caseItem.title }}
                </v-card-title>
              </v-card-item>
              <v-card-text class="rb-muted flex-grow-1">{{ caseItem.description }}</v-card-text>
              <v-card-actions class="px-4 pb-4">
                <v-btn variant="text" color="primary" append-icon="mdi-arrow-right">
                  Открыть кейс
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </main>
</template>

