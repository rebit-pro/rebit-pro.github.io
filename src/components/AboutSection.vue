<script setup lang="ts">
import { about } from '@/data/portfolio'
</script>

<template>
  <section id="about" class="section section--light">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <div class="section__overline">О студии</div>
          <h2 class="section__title text-left">Инженерный подход без лишней сложности</h2>
          <p class="text-body-1 rb-muted mb-0">
            {{ about.summary }}
          </p>
        </v-col>

        <v-col cols="12" md="6">
          <h3 class="text-subtitle-1 font-weight-bold mb-4">Что в основе работы</h3>
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
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.section__title.text-left {
  text-align: left;
}
</style>
