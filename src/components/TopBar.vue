<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { navLinks, profile } from '@/data/portfolio'

// Адаптация PublicTopBar из Barry: прозрачная шапка над тёмным hero,
// которая получает белый фон при скролле над светлыми секциями.
const drawer = ref(false)
const scrolled = ref(false)

function onScroll(): void {
  scrolled.value = window.scrollY > 24
}

function scrollTo(target: string): void {
  drawer.value = false
  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="topbar" :class="{ 'topbar--solid': scrolled }">
    <v-container class="topbar__inner py-0">
      <a class="topbar__brand" href="#hero" @click.prevent="scrollTo('hero')">
        <span class="topbar__logo">R</span>
        <span class="topbar__brand-text">
          <span class="topbar__name">{{ profile.name }}</span>
          <span class="topbar__role">{{ profile.role }}</span>
        </span>
      </a>

      <nav class="topbar__nav d-none d-md-flex">
        <v-btn
          v-for="link in navLinks"
          :key="link.target"
          variant="text"
          :color="scrolled ? 'primary' : 'white'"
          @click="scrollTo(link.target)"
        >
          {{ link.title }}
        </v-btn>
      </nav>

      <v-btn
        class="d-none d-md-inline-flex"
        color="secondary"
        @click="scrollTo('contact')"
      >
        Связаться
      </v-btn>

      <v-app-bar-nav-icon
        class="d-md-none"
        :color="scrolled ? 'primary' : 'white'"
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
  transition: background 0.25s ease, box-shadow 0.25s ease;

  &--solid {
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(8px);
    box-shadow: 0 6px 20px rgba(15, 23, 42, 0.08);
  }
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: linear-gradient(135deg, #1e88e5 0%, #5e35b1 100%);
  color: #fff;
  font-weight: 800;
  font-size: 1.2rem;
  box-shadow: 0 10px 24px rgba(94, 53, 177, 0.32);
}

.topbar__brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.topbar__name {
  font-weight: 800;
  font-size: 1.02rem;
  color: #fff;
  transition: color 0.25s ease;
}

.topbar__role {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.25s ease;
}

.topbar--solid .topbar__name {
  color: #0f172a;
}

.topbar--solid .topbar__role {
  color: rgba(15, 23, 42, 0.6);
}

.topbar__nav {
  gap: 4px;
}
</style>
