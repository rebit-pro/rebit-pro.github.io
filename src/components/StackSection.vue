<script setup lang="ts">
import { stackGroups } from '@/data/portfolio'
</script>

<template>
  <section id="stack" class="section section--light">
    <v-container>
      <div class="section__heading">
        <div class="section__overline">Технологии</div>
        <h2 class="section__title">Стек, на котором собираю надёжные backend'ы</h2>
        <p class="section__description">
          Инструменты, которые использую ежедневно — от языка до инфраструктуры и обмена данными.
        </p>
      </div>

      <v-row>
        <v-col
          v-for="group in stackGroups"
          :key="group.category"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card class="surface-card" rounded="lg" elevation="0">
            <v-card-item>
              <template #prepend>
                <v-avatar size="42" color="primary" variant="tonal">
                  <v-icon>{{ group.icon }}</v-icon>
                </v-avatar>
              </template>
              <v-card-title class="text-subtitle-1 font-weight-bold">
                {{ group.category }}
              </v-card-title>
            </v-card-item>
            <v-card-text>
              <div class="d-flex flex-wrap ga-2">
                <v-chip
                  v-for="item in group.items"
                  :key="item"
                  size="small"
                  variant="tonal"
                  color="secondary"
                >
                  {{ item }}
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
