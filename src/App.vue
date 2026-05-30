<script setup lang="ts">
import TopBar from './components/TopBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ArchitectureSection from './components/ArchitectureSection.vue'
import StackSection from './components/StackSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ArticlesSection from './components/ArticlesSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <v-app>
    <div class="site">
      <TopBar />
      <HeroSection />
      <AboutSection />
      <ArchitectureSection />
      <StackSection />
      <ProjectsSection />
      <ArticlesSection />
      <ContactSection />
      <SiteFooter />
    </div>
  </v-app>
</template>
