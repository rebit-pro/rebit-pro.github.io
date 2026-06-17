<script setup lang="ts">
import TopBar from './components/TopBar.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <v-app>
    <div class="site">
      <TopBar />
      <RouterView />
      <SiteFooter />
    </div>
  </v-app>
</template>
