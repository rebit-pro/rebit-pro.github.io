<script setup lang="ts">
import { processSteps } from '@/data/portfolio'
</script>

<template>
  <section id="process" class="section section--sand">
    <v-container>
      <div class="section__heading">
        <div class="section__overline">Как работаю</div>
        <h2 class="section__title">Прозрачный процесс от описания задачи до результата</h2>
        <p class="section__description">
          Сначала фиксируем задачу и ожидания в предпроектной документации,
          согласовываем её с командой или бизнесом и только после этого переходим к выполнению.
        </p>
      </div>

      <div class="process-grid">
        <v-card
          v-for="(step, index) in processSteps"
          :key="step.title"
          class="surface-card process-card pa-2"
          rounded="lg"
          elevation="0"
        >
          <v-card-item class="text-center">
            <v-avatar size="46" color="secondary" variant="flat" class="mb-3 process-card__number">
              {{ index + 1 }}
            </v-avatar>
            <v-card-title class="text-subtitle-1 font-weight-bold text-wrap pa-0">
              {{ step.title }}
            </v-card-title>
          </v-card-item>

          <v-card-text class="text-center rb-muted">
            {{ step.description }}
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.process-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  max-width: 1180px;
  margin: 0 auto;
}

.process-card {
  position: relative;
  height: 100%;
}

.process-card__number {
  color: #fff;
  font-weight: 800;
}
</style>
