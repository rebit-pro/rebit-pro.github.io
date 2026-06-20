<script setup lang="ts">
import { advantages } from '@/data/portfolio'
</script>

<template>
  <section id="advantages" class="section section--sand">
    <v-container>
      <div class="section__heading">
        <div class="section__overline">Почему ReBit</div>
        <h2 class="section__title">Беремся за то, что другие боятся трогать</h2>
        <p class="section__description">
          Мы не шаблон-фабрика. Подключаемся к сложным и «унаследованным» проектам,
          разбираемся в чужом коде и доводим задачи до результата — прозрачно и без переписывания с нуля.
        </p>
      </div>

      <v-row>
        <v-col v-for="item in advantages" :key="item.title" cols="12" sm="6" lg="4">
          <v-card class="surface-card advantage-card" rounded="lg" elevation="0">
            <v-card-item>
              <v-avatar size="44" color="primary" variant="tonal" class="mb-3">
                <v-icon>{{ item.icon }}</v-icon>
              </v-avatar>
              <v-card-title class="text-subtitle-1 font-weight-bold text-wrap">
                {{ item.title }}
              </v-card-title>
            </v-card-item>
            <v-card-text class="rb-muted">{{ item.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.advantage-card {
  height: 100%;
}
</style>
