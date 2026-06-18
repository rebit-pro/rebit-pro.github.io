<script setup lang="ts">
import { services } from '@/content/services'
</script>

<template>
  <main>
    <section class="page-hero">
      <v-container>
        <div class="page-hero__overline">Услуги</div>
        <h1 class="page-hero__title">Услуги ReBit Studio: сайты, магазины, Bitrix и интеграции</h1>
        <p class="page-hero__description">
          Разработка сайта под ключ, интернет-магазина или каталога, доработка 1С-Битрикс,
          интеграции, Vue-интерфейсы, аудит и безопасный рефакторинг.
        </p>
        <div class="page-hero__actions">
          <v-btn
            color="primary"
            to="/services/project-estimate/"
            prepend-icon="mdi-file-document-outline"
          >
            Оценить проект по ТЗ
          </v-btn>
          <v-btn variant="outlined" color="secondary" to="/prices/">Цены</v-btn>
        </div>
      </v-container>
    </section>

    <section class="section section--light">
      <v-container>
        <v-row>
          <v-col v-for="service in services" :key="service.slug" cols="12" md="6" lg="4">
            <v-card class="surface-card page-card d-flex flex-column" elevation="0" :to="`/services/${service.slug}/`">
              <v-card-item>
                <v-avatar size="44" color="primary" variant="tonal" class="mb-3">
                  <v-icon>{{ service.icon }}</v-icon>
                </v-avatar>
                <v-card-title class="text-subtitle-1 font-weight-bold text-wrap">
                  {{ service.title }}
                </v-card-title>
              </v-card-item>
              <v-card-text class="rb-muted flex-grow-1">{{ service.description }}</v-card-text>
              <v-card-actions class="px-4 pb-4">
                <v-btn variant="text" color="primary" append-icon="mdi-arrow-right">
                  Подробнее
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </main>
</template>
