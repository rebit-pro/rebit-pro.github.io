<script setup lang="ts">
import { about, experience } from '@/data/portfolio'
</script>

<template>
  <section id="about" class="section section--light">
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <div class="section__overline">О студии</div>
          <h2 class="section__title text-left">Инженерный подход без лишней сложности</h2>
          <p class="text-body-1 mb-6 rb-muted">
            {{ about.summary }}
          </p>

          <v-list bg-color="transparent" class="pa-0">
            <v-list-item
              v-for="item in about.highlights"
              :key="item"
              class="px-0"
            >
              <template #prepend>
                <v-icon color="success" icon="mdi-check-circle-outline" class="mr-2" />
              </template>
              <v-list-item-title class="text-wrap">{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="7">
          <h3 class="text-h6 font-weight-bold mb-6">Опыт</h3>
          <v-timeline side="end" align="start" density="comfortable" truncate-line="both">
            <v-timeline-item
              v-for="item in experience"
              :key="item.period"
              dot-color="primary"
              size="small"
            >
              <div class="text-caption text-secondary font-weight-bold mb-1">
                {{ item.period }}
              </div>
              <div class="text-subtitle-1 font-weight-bold">{{ item.role }}</div>
              <div class="text-body-2 mt-1 rb-muted">
                {{ item.description }}
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.section__title.text-left {
  text-align: left;
}
</style>
