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
        <p v-if="service.lead" class="page-hero__lead">{{ service.lead }}</p>
        <div v-if="service.price" class="page-hero__price">{{ service.price }}</div>
        <div class="page-hero__actions">
          <v-btn color="primary" to="/contacts/" prepend-icon="mdi-send">Обсудить проект</v-btn>
          <v-btn variant="outlined" color="secondary" to="/prices/">Посмотреть цены</v-btn>
        </div>
      </v-container>
    </section>

    <section v-if="service.benefits?.length" class="section section--sand">
      <v-container>
        <div class="section__heading">
          <div class="section__overline">Результат</div>
          <h2 class="section__title">Что получает бизнес</h2>
        </div>
        <v-row>
          <v-col v-for="item in service.benefits" :key="item.title" cols="12" md="4">
            <v-card class="surface-card page-card" elevation="0">
              <v-card-title class="text-subtitle-1 font-weight-bold text-wrap">
                {{ item.title }}
              </v-card-title>
              <v-card-text class="rb-muted">{{ item.description }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
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

    <section v-if="service.process?.length || service.boundaries?.length" class="section section--sand">
      <v-container>
        <v-row>
          <v-col v-if="service.process?.length" cols="12" :md="service.boundaries?.length ? 7 : 12">
            <v-card class="surface-card page-panel" elevation="0">
              <h2 class="page-section-title">Как проходит работа</h2>
              <ol class="service-steps">
                <li v-for="(item, index) in service.process" :key="item.title">
                  <span class="service-steps__number">{{ index + 1 }}</span>
                  <div>
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.description }}</p>
                  </div>
                </li>
              </ol>
            </v-card>
          </v-col>

          <v-col v-if="service.boundaries?.length" cols="12" :md="service.process?.length ? 5 : 12">
            <v-card class="surface-card page-panel" elevation="0">
              <h2 class="page-section-title">Границы формата</h2>
              <v-list bg-color="transparent" class="pa-0">
                <v-list-item v-for="item in service.boundaries" :key="item" class="px-0">
                  <template #prepend>
                    <v-icon color="secondary" icon="mdi-information-outline" class="mr-2" />
                  </template>
                  <v-list-item-title class="text-wrap">{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list>
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

    <section class="section section--dark service-cta">
      <v-container>
        <div class="section__heading">
          <div class="section__overline">Следующий шаг</div>
          <h2 class="section__title">Проверим задачу и предложим подходящий формат</h2>
          <p class="section__description">
            Пришлите цель, желаемый результат, примерный состав и срок. Если задача
            помещается в пакет — зафиксируем цену. Если есть риски — обозначим их до старта.
          </p>
          <v-btn color="primary" size="large" to="/contacts/" prepend-icon="mdi-send">
            Обсудить проект
          </v-btn>
        </div>
      </v-container>
    </section>
  </main>

  <NotFoundPage v-else />
</template>

<style scoped>
.page-hero__lead {
  max-width: 760px;
  margin: 18px 0 0;
  color: var(--rb-color-muted);
  font-size: 1rem;
  line-height: 1.65;
}

.page-hero__price {
  margin-top: 18px;
  color: var(--rb-color-accent);
  font-size: clamp(1.15rem, 2vw, 1.45rem);
  font-weight: 900;
}

.service-steps {
  display: grid;
  gap: 20px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.service-steps li {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.service-steps__number {
  display: inline-flex;
  flex: 0 0 34px;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--rb-color-accent);
  color: #fff;
  font-weight: 900;
}

.service-steps h3 {
  margin: 0 0 4px;
  color: var(--rb-color-text);
  font-size: 1rem;
}

.service-steps p {
  margin: 0;
  color: var(--rb-color-muted);
  line-height: 1.55;
}

.service-cta .section__heading {
  margin-bottom: 0;
}
</style>
