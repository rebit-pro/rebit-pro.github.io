<script setup lang="ts">
import { typicalTasks } from '@/data/portfolio'
</script>

<template>
  <section id="tasks" class="section section--dark">
    <v-container>
      <div class="section__heading">
        <div class="section__overline">Типовые задачи</div>
        <h2 class="section__title">Если узнаёте свою ситуацию — можно начинать с диагностики</h2>
        <p class="section__description">
          Часто проекту не нужна полная перепись. Достаточно правильно найти узкое место,
          оценить риски и двигаться по этапам.
        </p>
      </div>

      <v-row>
        <v-col
          v-for="task in typicalTasks"
          :key="task.title"
          cols="12"
          md="6"
        >
          <v-card class="surface-card task-card" rounded="lg" elevation="0">
            <v-card-item>
              <template #prepend>
                <v-avatar size="38" color="primary" variant="tonal">
                  <v-icon icon="mdi-check-circle-outline" />
                </v-avatar>
              </template>
              <v-card-title class="text-subtitle-1 font-weight-bold text-wrap">
                {{ task.title }}
              </v-card-title>
            </v-card-item>

            <v-card-text class="rb-muted">
              {{ task.description }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.task-card {
  height: 100%;
}
</style>
