<script setup lang="ts">
import { computed } from 'vue'
import { cases } from '@/content/cases'
import { findService } from '@/content/services'
import NotFoundPage from './NotFoundPage.vue'

const props = defineProps<{
  readonly slug: string
}>()

const service = computed(() => findService(props.slug))
const relatedCases = computed(() =>
  cases.filter((item) => service.value?.relatedCases.includes(item.slug)),
)
</script>

<template>
  <main v-if="service">
    <section class="page-hero">
      <v-container>
        <div class="page-hero__overline">Услуга</div>
        <h1 class="page-hero__title">{{ service.h1 }}</h1>
        <p class="page-hero__description">{{ service.description }}</p>
        <div class="page-hero__actions">
          <v-btn color="primary" to="/contacts/" prepend-icon="mdi-send">Обсудить проект</v-btn>
          <v-btn variant="outlined" color="secondary" to="/services/">Все услуги</v-btn>
        </div>
      </v-container>
    </section>

    <section class="section section--light">
      <v-container>
        <v-row>
          <v-col cols="12" md="7">
            <v-card class="surface-card page-panel" elevation="0">
              <h2 class="page-section-title">Какие задачи решаем</h2>
              <v-list bg-color="transparent" class="pa-0">
                <v-list-item v-for="task in service.tasks" :key="task" class="px-0">
                  <template #prepend>
                    <v-icon color="primary" icon="mdi-check-circle-outline" class="mr-2" />
                  </template>
                  <v-list-item-title class="text-wrap">{{ task }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>

          <v-col cols="12" md="5">
            <v-card class="surface-card page-panel" elevation="0">
              <h2 class="page-section-title">Технологии</h2>
              <div class="d-flex flex-wrap ga-2">
                <v-chip v-for="tech in service.technologies" :key="tech" color="secondary" variant="tonal">
                  {{ tech }}
                </v-chip>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section v-if="relatedCases.length" class="section section--sand">
      <v-container>
        <div class="section__heading">
          <div class="section__overline">Связанные кейсы</div>
          <h2 class="section__title">Где эта экспертиза уже полезна</h2>
        </div>
        <v-row>
          <v-col v-for="caseItem in relatedCases" :key="caseItem.slug" cols="12" md="4">
            <v-card class="surface-card page-card" elevation="0" :to="`/cases/${caseItem.slug}/`">
              <v-card-title class="text-subtitle-1 font-weight-bold text-wrap">
                {{ caseItem.title }}
              </v-card-title>
              <v-card-text class="rb-muted">{{ caseItem.description }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="section section--light">
      <v-container>
        <div class="section__heading">
          <div class="section__overline">FAQ</div>
          <h2 class="section__title">Частые вопросы по услуге</h2>
        </div>
        <div class="faq-grid">
          <v-card v-for="item in service.faq" :key="item.question" class="surface-card page-card" elevation="0">
            <v-card-title class="text-subtitle-1 font-weight-bold text-wrap">{{ item.question }}</v-card-title>
            <v-card-text class="rb-muted">{{ item.answer }}</v-card-text>
          </v-card>
        </div>
      </v-container>
    </section>
  </main>

  <NotFoundPage v-else />
</template>
