<script setup lang="ts">
import { architecturePrinciples } from '@/data/portfolio'
</script>

<template>
  <section id="architecture" class="section section--sand">
    <v-container>
      <div class="section__heading">
        <div class="section__overline">Принципы архитектуры</div>
        <h2 class="section__title">Фундамент, на котором системы живут годами</h2>
        <p class="section__description">
          Подходы, которые помогают держать код поддерживаемым при росте продукта и команды.
        </p>
      </div>

      <v-row>
        <v-col
          v-for="principle in architecturePrinciples"
          :key="principle.title"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="surface-card pa-2" rounded="lg" elevation="0">
            <v-card-item>
              <template #prepend>
                <v-avatar size="42" color="secondary" variant="tonal">
                  <v-icon>{{ principle.icon }}</v-icon>
                </v-avatar>
              </template>
              <v-card-title class="text-subtitle-1 font-weight-bold">
                {{ principle.title }}
              </v-card-title>
            </v-card-item>
            <v-card-text class="rb-muted">
              {{ principle.description }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
