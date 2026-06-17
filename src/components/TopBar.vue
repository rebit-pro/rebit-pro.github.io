<script setup lang="ts">
import { ref } from 'vue'
import { navLinks, profile } from '@/data/portfolio'

const drawer = ref(false)

function scrollTo(target: string): void {
  drawer.value = false
  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header class="topbar">
    <v-container class="topbar__inner py-0">
      <a class="topbar__brand" href="#hero" @click.prevent="scrollTo('hero')">
        <span class="topbar__logo" aria-hidden="true">
          <span class="topbar__logo-bracket">[</span>
          <span class="topbar__logo-r">R</span>
        </span>
        <span class="topbar__brand-text">
          <span class="topbar__name">{{ profile.name }}</span>
          <span class="topbar__role">{{ profile.shortRole }}</span>
        </span>
      </a>

      <nav class="topbar__nav d-none d-md-flex">
        <v-btn
          v-for="link in navLinks"
          :key="link.target"
          variant="text"
          color="secondary"
          @click="scrollTo(link.target)"
        >
          {{ link.title }}
        </v-btn>
      </nav>

      <v-btn
        class="d-none d-md-inline-flex"
        color="primary"
        prepend-icon="mdi-arrow-right"
        @click="scrollTo('contact')"
      >
        Связаться
      </v-btn>

      <v-app-bar-nav-icon
        class="d-md-none"
        color="secondary"
        @click="drawer = !drawer"
      />
    </v-container>
  </header>

  <v-navigation-drawer v-model="drawer" location="right" temporary>
    <v-list>
      <v-list-item
        v-for="link in navLinks"
        :key="link.target"
        :title="link.title"
        @click="scrollTo(link.target)"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(250, 248, 245, 0.88);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--rb-color-line);
  box-shadow: 0 6px 22px rgba(30, 41, 59, 0.06);
}

.topbar__inner {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 72px;
}

.topbar__brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  margin-right: auto;
}

.topbar__logo {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  color: var(--rb-color-text);
  font-family: Georgia, Cambria, 'Times New Roman', serif;
  font-weight: 900;
  font-size: 1.45rem;
}

.topbar__logo-bracket {
  position: absolute;
  left: 0;
  color: var(--rb-color-accent);
  font-family: Arial, sans-serif;
  font-size: 2.1rem;
  font-weight: 800;
  line-height: 1;
}

.topbar__logo-r {
  transform: translateX(5px);
}

.topbar__logo::before,
.topbar__logo::after {
  position: absolute;
  content: '';
  width: 6px;
  height: 6px;
  background: var(--rb-color-text);
}

.topbar__logo::before {
  top: 6px;
  left: 16px;
}

.topbar__logo::after {
  bottom: 7px;
  left: 16px;
}

.topbar__brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.topbar__name {
  font-weight: 800;
  font-size: 1.02rem;
  color: var(--rb-color-text);
}

.topbar__role {
  font-size: 0.78rem;
  color: var(--rb-color-muted);
}

.topbar__nav {
  gap: 4px;
}
</style>
