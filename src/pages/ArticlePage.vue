<script setup lang="ts">
import { computed } from 'vue'
import { findArticle } from '@/content/articles'
import { services } from '@/content/services'
import { cases } from '@/content/cases'
import NotFoundPage from './NotFoundPage.vue'

const props = defineProps<{
  readonly slug: string
}>()

const article = computed(() => findArticle(props.slug))

const relatedServices = computed(() =>
  services.filter((service) => article.value?.relatedServices.includes(service.slug)),
)

const relatedCases = computed(() =>
  cases.filter((item) => article.value?.relatedCases?.includes(item.slug)),
)
</script>

<template>
  <main v-if="article">
    <section class="page-hero">
      <v-container>
        <div class="page-hero__overline">Блог · экспертные материалы</div>
        <h1 class="page-hero__title">{{ article.title }}</h1>
        <p class="page-hero__description">{{ article.excerpt }}</p>
        <div class="d-flex flex-wrap align-center ga-4 mt-4 text-caption rb-muted">
          <span class="d-inline-flex align-center">
            <v-icon icon="mdi-clock-outline" size="14" class="mr-1" />
            {{ article.readingTime }}
          </span>
          <span class="d-inline-flex align-center">
            <v-icon icon="mdi-update" size="14" class="mr-1" />
            Обновлено: {{ article.updated }}
          </span>
          <span class="d-inline-flex align-center">
            <v-icon icon="mdi-account-outline" size="14" class="mr-1" />
            ReBit Studio
          </span>
        </div>
      </v-container>
    </section>

    <section class="section section--light">
      <v-container>
        <v-row>
          <v-col cols="12" md="8">
            <v-card class="surface-card page-panel mb-6" color="primary" variant="tonal" elevation="0">
              <div class="text-overline mb-2">Короткий ответ</div>
              <p class="mb-0">{{ article.shortAnswer }}</p>
            </v-card>

            <div class="article-body">
              <section v-for="section in article.sections" :key="section.heading" class="mb-8">
                <h2 class="page-section-title">{{ section.heading }}</h2>
                <p v-for="paragraph in section.paragraphs" :key="paragraph" class="rb-muted">
                  {{ paragraph }}
                </p>
                <v-list v-if="section.bullets" bg-color="transparent" class="pa-0">
                  <v-list-item v-for="bullet in section.bullets" :key="bullet" class="px-0">
                    <template #prepend>
                      <v-icon color="primary" icon="mdi-circle-small" />
                    </template>
                    <v-list-item-title class="text-wrap rb-muted">{{ bullet }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </section>
            </div>

            <v-card v-if="article.checklist" class="surface-card page-panel mb-6" elevation="0">
              <h2 class="page-section-title">Чек-лист</h2>
              <v-list bg-color="transparent" class="pa-0">
                <v-list-item v-for="item in article.checklist" :key="item" class="px-0">
                  <template #prepend>
                    <v-icon color="primary" icon="mdi-check-circle-outline" class="mr-2" />
                  </template>
                  <v-list-item-title class="text-wrap">{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>

            <v-card class="surface-card page-panel" elevation="0">
              <h2 class="page-section-title">Частые вопросы</h2>
              <v-expansion-panels variant="accordion" class="mt-2">
                <v-expansion-panel v-for="item in article.faq" :key="item.question">
                  <v-expansion-panel-title class="font-weight-medium">
                    {{ item.question }}
                  </v-expansion-panel-title>
                  <v-expansion-panel-text class="rb-muted">{{ item.answer }}</v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="surface-card page-panel mb-6" elevation="0">
              <h2 class="page-section-title">Обсудить задачу</h2>
              <p class="rb-muted">
                Нужен аудит, доработка или интеграция Bitrix-проекта? Расскажите задачу — предложим
                безопасный порядок работ.
              </p>
              <div class="d-flex flex-column ga-2">
                <v-btn color="primary" to="/contacts/" prepend-icon="mdi-send">Обсудить проект</v-btn>
                <v-btn variant="outlined" color="secondary" to="/prices/">Услуги и цены</v-btn>
              </div>
            </v-card>

            <v-card v-if="relatedServices.length" class="surface-card page-panel mb-6" elevation="0">
              <h2 class="page-section-title">Связанные услуги</h2>
              <div class="d-flex flex-column ga-2">
                <v-btn
                  v-for="service in relatedServices"
                  :key="service.slug"
                  :to="`/services/${service.slug}/`"
                  variant="outlined"
                  color="secondary"
                >
                  {{ service.title }}
                </v-btn>
              </div>
            </v-card>

            <v-card v-if="relatedCases.length" class="surface-card page-panel" elevation="0">
              <h2 class="page-section-title">Связанные кейсы</h2>
              <div class="d-flex flex-column ga-2">
                <v-btn
                  v-for="caseItem in relatedCases"
                  :key="caseItem.slug"
                  :to="`/cases/${caseItem.slug}/`"
                  variant="text"
                  color="primary"
                  class="justify-start text-wrap"
                >
                  {{ caseItem.title }}
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <div class="mt-8">
          <v-btn variant="text" color="secondary" to="/blog/" prepend-icon="mdi-arrow-left">
            Все статьи блога
          </v-btn>
        </div>
      </v-container>
    </section>
  </main>

  <NotFoundPage v-else />
</template>
