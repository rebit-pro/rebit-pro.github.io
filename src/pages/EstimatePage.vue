<script setup lang="ts">
import LeadForm from '@/components/LeadForm.vue'
import { estimateContent } from '@/content/estimate'

function scrollToForm(): void {
  if (typeof document === 'undefined') {
    return
  }

  document.getElementById('estimate-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <main>
    <!-- 1. Оффер + форма (первый экран) -->
    <section class="page-hero estimate-hero">
      <v-container>
        <v-row align="start">
          <v-col cols="12" md="6">
            <div class="page-hero__overline">{{ estimateContent.overline }}</div>
            <h1 class="page-hero__title">{{ estimateContent.h1 }}</h1>
            <p class="page-hero__description">{{ estimateContent.offerLead }}</p>

            <ul class="estimate-trust">
              <li v-for="item in estimateContent.trust" :key="item">
                <v-icon size="20" color="primary" icon="mdi-shield-check-outline" class="mr-2" />
                <span>{{ item }}</span>
              </li>
            </ul>

            <div class="page-hero__actions estimate-hero__actions">
              <v-btn color="primary" size="large" prepend-icon="mdi-send" @click="scrollToForm">
                Получить смету
              </v-btn>
              <v-btn variant="outlined" color="secondary" to="/prices/">Посмотреть цены</v-btn>
            </div>
          </v-col>

          <v-col id="estimate-form" cols="12" md="6">
            <v-card class="surface-card page-panel estimate-form-card" elevation="0">
              <h2 class="page-section-title">{{ estimateContent.formTitle }}</h2>
              <LeadForm source="estimate">
                <template #intro>
                  <p class="rb-muted estimate-form-card__lead">{{ estimateContent.formLead }}</p>
                </template>
              </LeadForm>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 2. Что входит в оценку -->
    <section class="section section--light">
      <v-container>
        <div class="section__heading">
          <div class="section__overline">Результат</div>
          <h2 class="section__title">Что входит в оценку</h2>
        </div>
        <v-row>
          <v-col v-for="item in estimateContent.included" :key="item.title" cols="12" md="6" lg="3">
            <v-card class="surface-card page-card estimate-card" elevation="0">
              <v-avatar size="44" color="primary" variant="tonal" class="mb-3">
                <v-icon>{{ item.icon }}</v-icon>
              </v-avatar>
              <h3 class="estimate-card__title">{{ item.title }}</h3>
              <p class="rb-muted">{{ item.text }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 3. Как считаем -->
    <section class="section section--sand">
      <v-container>
        <div class="section__heading">
          <div class="section__overline">Прозрачность</div>
          <h2 class="section__title">Как считаем стоимость</h2>
          <p class="section__description">
            Выбираем способ под вашу ситуацию — точнее всего получается по готовому ТЗ,
            но рассчитаем и без него.
          </p>
        </div>
        <v-row>
          <v-col v-for="item in estimateContent.howWeCalc" :key="item.title" cols="12" md="4">
            <v-card class="surface-card page-card estimate-card" elevation="0">
              <v-avatar size="44" color="secondary" variant="tonal" class="mb-3">
                <v-icon>{{ item.icon }}</v-icon>
              </v-avatar>
              <h3 class="estimate-card__title">{{ item.title }}</h3>
              <p class="rb-muted">{{ item.text }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 5. FAQ -->
    <section class="section section--light">
      <v-container>
        <div class="section__heading">
          <div class="section__overline">FAQ</div>
          <h2 class="section__title">Частые вопросы об оценке</h2>
        </div>
        <div class="faq-grid">
          <v-card
            v-for="item in estimateContent.faq"
            :key="item.question"
            class="surface-card page-card"
            elevation="0"
          >
            <v-card-title class="text-subtitle-1 font-weight-bold text-wrap">
              {{ item.question }}
            </v-card-title>
            <v-card-text class="rb-muted">{{ item.answer }}</v-card-text>
          </v-card>
        </div>
      </v-container>
    </section>

    <!-- 6. Повторный CTA -->
    <section class="section section--sand">
      <v-container>
        <div class="section__heading">
          <div class="section__overline">Оценка по ТЗ</div>
          <h2 class="section__title">{{ estimateContent.repeatCtaTitle }}</h2>
          <p class="section__description">{{ estimateContent.repeatCtaText }}</p>
          <div class="estimate-repeat-cta">
            <v-btn color="primary" size="large" prepend-icon="mdi-send" @click="scrollToForm">
              Получить смету
            </v-btn>
          </div>
        </div>
      </v-container>
    </section>
  </main>
</template>

<style scoped lang="scss">
.estimate-hero {
  padding-bottom: 12px;
}

.estimate-hero__actions {
  margin-top: 8px;
}

.estimate-trust {
  list-style: none;
  margin: 20px 0 24px;
  padding: 0;
  display: grid;
  gap: 10px;
}

.estimate-trust li {
  display: flex;
  align-items: flex-start;
  color: var(--rb-color-text);
  line-height: 1.5;
}

.estimate-form-card {
  position: sticky;
  top: 90px;
}

.estimate-form-card__lead {
  margin: 0 0 18px;
  line-height: 1.6;
}

.estimate-card {
  height: 100%;
  padding: 20px;
}

.estimate-card__title {
  margin: 0 0 8px;
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--rb-color-text);
}

.estimate-repeat-cta {
  margin-top: 24px;
}

@media (max-width: 960px) {
  .estimate-form-card {
    position: static;
    margin-top: 12px;
  }
}
</style>
