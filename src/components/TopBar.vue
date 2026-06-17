<script setup lang="ts">
import { ref } from 'vue'
import { mainNavLinks, siteConfig } from '@/config/site'

const drawer = ref(false)

function closeDrawer(): void {
  drawer.value = false
}
</script>

<template>
  <header class="topbar">
    <v-container class="topbar__inner py-0">
      <RouterLink class="topbar__brand" to="/">
        <img class="topbar__logo" src="/logo-rebit-mark.svg" alt="" aria-hidden="true" />
        <span class="topbar__brand-text">
          <span class="topbar__name">{{ siteConfig.name }}</span>
          <span class="topbar__role">{{ siteConfig.tagline }}</span>
        </span>
      </RouterLink>

      <nav class="topbar__nav d-none d-md-flex">
        <v-btn
          v-for="link in mainNavLinks"
          :key="link.href"
          :to="link.href"
          variant="text"
          color="secondary"
        >
          {{ link.title }}
        </v-btn>
      </nav>

      <v-btn
        class="d-none d-md-inline-flex"
        to="/contacts/"
        color="primary"
        prepend-icon="mdi-arrow-right"
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
          v-for="link in mainNavLinks"
          :key="link.href"
          :to="link.href"
          :title="link.title"
          @click="closeDrawer"
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
  width: 44px;
  height: 44px;
  flex: 0 0 auto;
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
