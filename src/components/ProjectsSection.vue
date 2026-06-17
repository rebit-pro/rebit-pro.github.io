<script setup lang="ts">
import { projects } from '@/data/portfolio'
</script>

<template>
  <section id="projects" class="section section--dark">
    <v-container>
      <div class="section__heading">
        <div class="section__overline">Кейсы</div>
        <h2 class="section__title">Типовые ситуации, где важен сильный backend</h2>
        <p class="section__description">
          Обезличенные сценарии из коммерческих PHP / Bitrix-проектов: что болело,
          как подходил к решению и какой результат получает команда.
        </p>
      </div>

      <v-row>
        <v-col v-for="project in projects" :key="project.title" cols="12" md="4">
          <v-card class="surface-card project-card d-flex flex-column" rounded="lg" elevation="0">
            <v-card-item>
              <v-avatar size="42" color="primary" variant="tonal" class="mb-3">
                <v-icon>mdi-briefcase-check-outline</v-icon>
              </v-avatar>
              <v-card-title class="text-h6 font-weight-bold text-wrap">
                {{ project.title }}
              </v-card-title>
            </v-card-item>

            <v-card-text class="flex-grow-1 rb-muted">
              {{ project.description }}
            </v-card-text>

            <v-card-text class="project-card__case pt-0">
              <div class="project-card__case-item">
                <div class="project-card__case-title">Проблема</div>
                <p>{{ project.problem }}</p>
              </div>
              <div class="project-card__case-item">
                <div class="project-card__case-title">Решение</div>
                <p>{{ project.solution }}</p>
              </div>
              <div class="project-card__case-item">
                <div class="project-card__case-title">Результат</div>
                <p>{{ project.result }}</p>
              </div>
            </v-card-text>

            <v-card-text class="pt-0">
              <div class="d-flex flex-wrap ga-2">
                <v-chip
                  v-for="tag in project.tags"
                  :key="tag"
                  size="x-small"
                  variant="outlined"
                  color="secondary"
                >
                  {{ tag }}
                </v-chip>
              </div>
            </v-card-text>

            <v-card-actions v-if="project.link" class="px-4 pb-3">
              <v-btn
                :href="project.link"
                target="_blank"
                rel="noopener"
                variant="text"
                color="primary"
                append-icon="mdi-arrow-top-right"
              >
                Открыть
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.project-card {
  height: 100%;
}

.project-card__case {
  display: grid;
  gap: 14px;
}

.project-card__case-item {
  padding-left: 12px;
  border-left: 3px solid rgba(249, 115, 22, 0.28);
}

.project-card__case-title {
  margin-bottom: 4px;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--rb-color-accent);
}

.project-card__case-item p {
  margin: 0;
  color: var(--rb-color-muted);
  font-size: 0.92rem;
  line-height: 1.55;
}
</style>
