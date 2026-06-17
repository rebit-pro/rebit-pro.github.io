<script setup lang="ts">
import { heroBadges, heroSolves, profile } from '@/data/portfolio'

function scrollTo(target: string): void {
  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="hero" class="hero">
    <v-container class="hero__container py-12">
      <v-row align="center" class="hero__row">
        <v-col cols="12" md="6" lg="6" class="hero__copy">
          <div class="hero__eyebrow">
            {{ profile.experience }}
          </div>

          <h1 class="hero__title">{{ profile.role }}</h1>

          <p class="hero__tagline">{{ profile.tagline }}</p>
          <p class="hero__summary">{{ profile.summary }}</p>

          <div class="hero__badges">
            <v-chip
              v-for="badge in heroBadges"
              :key="badge.title"
              :prepend-icon="badge.icon"
              color="secondary"
              variant="outlined"
              size="small"
              class="hero__badge"
            >
              {{ badge.title }}
            </v-chip>
          </div>

          <div class="hero__actions">
            <v-btn
              :href="profile.contactHref"
              target="_blank"
              rel="noopener"
              color="primary"
              size="large"
              prepend-icon="mdi-send"
            >
              Обсудить задачу
            </v-btn>
            <v-btn
              variant="outlined"
              color="secondary"
              size="large"
              prepend-icon="mdi-format-list-checks"
              @click="scrollTo('services')"
            >
              Посмотреть услуги
            </v-btn>
          </div>

          <ul class="hero__solves">
            <li v-for="item in heroSolves" :key="item">
              <v-icon icon="mdi-check-circle" size="16" color="primary" class="mr-2" />
              {{ item }}
            </li>
          </ul>
        </v-col>

        <v-col cols="12" md="6" lg="6" class="hero__aside">
          <div class="module-scene" aria-hidden="true">
            <div class="module-scene__grid">
              <span v-for="index in 36" :key="index" class="module-scene__dot" />
            </div>
            <div class="module-stack">
              <span class="module-block module-block--slate module-block--a" />
              <span class="module-block module-block--muted module-block--b" />
              <span class="module-block module-block--sand module-block--c" />
              <span class="module-block module-block--orange module-block--d" />
              <span class="module-block module-block--muted module-block--e" />
              <span class="module-block module-block--slate module-block--f" />
              <span class="module-block module-block--sand module-block--g" />
              <span class="module-block module-block--orange module-block--h" />
            </div>
            <div class="module-scene__caption">
              <span class="module-scene__bracket">[</span>
              <div>
                <strong>код + модули + структура</strong>
                <span>надёжная система без лишнего шума</span>
              </div>
              <span class="module-scene__bracket">]</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  color: var(--rb-color-text);
  overflow: hidden;
  background:
    linear-gradient(rgba(30, 41, 59, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(30, 41, 59, 0.04) 1px, transparent 1px),
    radial-gradient(circle at 86% 18%, rgba(233, 220, 198, 0.66), transparent 26%),
    var(--rb-color-page);
  background-size: 36px 36px, 36px 36px, auto, auto;
}

.hero__container {
  position: relative;
  z-index: 1;
}

.hero__row {
  min-height: min(640px, calc(100vh - 96px));
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  margin-bottom: 18px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--rb-color-accent);

  &::before,
  &::after {
    color: var(--rb-color-muted);
    opacity: 0.44;
  }

  &::before {
    content: '[';
    margin-right: 8px;
  }

  &::after {
    content: ']';
    margin-left: 8px;
  }
}

.hero__title {
  margin: 0 0 16px;
  font-size: clamp(2.3rem, 5vw, 3.8rem);
  line-height: 1.08;
  font-family: Georgia, Cambria, 'Times New Roman', serif;
  font-weight: 800;
  color: var(--rb-color-text);
}

.hero__tagline {
  margin: 0 0 14px;
  font-size: clamp(1.05rem, 2vw, 1.35rem);
  font-weight: 600;
  color: var(--rb-color-text);
}

.hero__summary {
  max-width: 540px;
  margin: 0 0 22px;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--rb-color-muted);
}

.hero__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 26px;
}

.hero__badge {
  border-color: rgba(30, 41, 59, 0.18) !important;
  background: rgba(255, 255, 255, 0.58);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 26px;
}

.hero__solves {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.hero__solves li {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: var(--rb-color-muted);
}

.module-scene {
  position: relative;
  min-height: 440px;
  border: 1px solid rgba(30, 41, 59, 0.08);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.64);
  box-shadow: 0 28px 80px rgba(30, 41, 59, 0.12);
  overflow: hidden;
}

.module-scene__grid {
  position: absolute;
  inset: 34px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 26px;
  opacity: 0.42;
}

.module-scene__dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--rb-color-muted);
}

.module-stack {
  position: absolute;
  inset: 0;
  transform: rotateX(58deg) rotateZ(-38deg) translate(40px, 34px);
  transform-style: preserve-3d;
}

.module-block {
  position: absolute;
  width: 92px;
  height: 92px;
  border: 1px solid rgba(30, 41, 59, 0.1);
  box-shadow: 16px 16px 0 rgba(30, 41, 59, 0.08);
}

.module-block--slate {
  background: #1e293b;
}

.module-block--muted {
  background: #475569;
}

.module-block--sand {
  background: #e9dcc6;
}

.module-block--orange {
  background: #f97316;
}

.module-block--a {
  left: 180px;
  top: 110px;
}

.module-block--b {
  left: 250px;
  top: 160px;
}

.module-block--c {
  left: 110px;
  top: 160px;
}

.module-block--d {
  left: 180px;
  top: 214px;
}

.module-block--e {
  left: 320px;
  top: 214px;
}

.module-block--f {
  left: 250px;
  top: 268px;
}

.module-block--g {
  left: 110px;
  top: 268px;
}

.module-block--h {
  left: 40px;
  top: 322px;
}

.module-scene__caption {
  position: absolute;
  right: 24px;
  bottom: 22px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--rb-color-text);
}

.module-scene__caption strong,
.module-scene__caption span {
  display: block;
}

.module-scene__caption strong {
  font-size: 0.9rem;
}

.module-scene__caption span {
  font-size: 0.78rem;
  color: var(--rb-color-muted);
}

.module-scene__bracket {
  font-size: 2rem;
  line-height: 1;
  color: var(--rb-color-accent) !important;
}

@media (max-width: 959px) {
  .hero__row {
    min-height: auto;
  }

  .hero__aside {
    display: none;
  }
}

@media (max-width: 599px) {
  .hero__title {
    font-size: 2.15rem;
  }
}
</style>
