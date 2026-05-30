<script setup lang="ts">
import { heroMetrics, profile } from '@/data/portfolio'

function scrollTo(target: string): void {
  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="hero" class="hero">
    <v-container class="py-12">
      <v-row align="center">
        <v-col cols="12" md="7" lg="6">
          <v-chip color="white" variant="outlined" size="small" class="hero__chip mb-5">
            Открыт к senior backend-ролям
          </v-chip>

          <h1 class="hero__title">{{ profile.role }}</h1>

          <p class="hero__text">{{ profile.tagline }}</p>

          <div class="hero__actions">
            <v-btn
              color="secondary"
              size="x-large"
              rounded="xl"
              prepend-icon="mdi-folder-multiple-outline"
              @click="scrollTo('projects')"
            >
              Смотреть проекты
            </v-btn>
            <v-btn
              variant="outlined"
              color="white"
              size="x-large"
              rounded="xl"
              prepend-icon="mdi-email-outline"
              @click="scrollTo('contact')"
            >
              Связаться
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" md="5" lg="6" class="hero__aside">
          <div class="hero__metrics">
            <v-card
              v-for="metric in heroMetrics"
              :key="metric.title"
              class="hero__metric"
              rounded="lg"
              elevation="0"
            >
              <v-card-text class="pa-5">
                <div class="hero__metric-header">
                  <v-avatar size="44" :color="metric.color" variant="tonal">
                    <v-icon>{{ metric.icon }}</v-icon>
                  </v-avatar>
                  <div class="hero__metric-value">{{ metric.value }}</div>
                </div>
                <div class="hero__metric-title">{{ metric.title }}</div>
                <div class="hero__metric-label">{{ metric.label }}</div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.hero {
  color: #fff;
}

.hero__chip {
  border-color: rgba(255, 255, 255, 0.32);
  color: #fff;
}

.hero__title {
  margin: 0 0 18px;
  font-size: clamp(2.15rem, 4vw, 3.4rem);
  line-height: 1.12;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.hero__text {
  max-width: 560px;
  margin: 0 0 28px;
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.82);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.hero__metrics {
  display: grid;
  gap: 16px;
}

.hero__metric {
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: linear-gradient(180deg, #ffffff 0%, rgba(30, 136, 229, 0.03) 100%);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
}

.hero__metric-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.hero__metric-value {
  font-size: 1.6rem;
  font-weight: 800;
  line-height: 1;
  color: #0f172a;
}

.hero__metric-title {
  margin-bottom: 6px;
  font-size: 0.98rem;
  font-weight: 700;
  color: #0f172a;
}

.hero__metric-label {
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(15, 23, 42, 0.68);
}

@media (max-width: 959px) {
  .hero__aside {
    margin-top: 32px;
  }
}
</style>
