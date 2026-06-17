<script setup lang="ts">
import { contacts, profile } from '@/data/portfolio'

const year = 2026
</script>

<template>
  <footer class="footer">
    <v-container class="footer__inner">
      <span class="footer__text">
        © {{ year }} {{ profile.name }}. Разработка, поддержка, развитие.
      </span>

      <div class="footer__links">
        <v-btn
          v-for="contact in contacts"
          :key="contact.label"
          :href="contact.href"
          target="_blank"
          rel="noopener"
          :icon="contact.icon"
          variant="text"
          color="primary"
          size="small"
          :aria-label="contact.label"
        />
      </div>
    </v-container>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: #1e293b;
  border-top: 4px solid var(--rb-color-accent);
  padding: 24px 0;
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.footer__text {
  font-size: 0.875rem;
  color: rgba(250, 248, 245, 0.72);
}
</style>
