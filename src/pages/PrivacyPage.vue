<script setup lang="ts">
import { siteConfig } from '@/config/site'
</script>

<template>
  <main>
    <section class="page-hero">
      <v-container>
        <div class="page-hero__overline">Документы</div>
        <h1 class="page-hero__title">Политика конфиденциальности</h1>
        <p class="page-hero__description">
          Кратко о том, какие данные нужны для обработки обращения и как с ними работаем.
        </p>
      </v-container>
    </section>

    <section class="section section--light">
      <v-container>
        <v-card class="surface-card page-panel privacy-panel" elevation="0">
          <h2 class="page-section-title">Какие данные передаются</h2>
          <p class="rb-muted">
            При обращении через форму вы можете передать имя, телефон, email, описание задачи и,
            при желании, файл с техническим заданием (ТЗ). Email и файл — необязательные.
          </p>

          <h2 class="page-section-title">Зачем мы их собираем</h2>
          <p class="rb-muted">
            Данные используются только для ответа на обращение и подготовки предварительной оценки
            проекта — плана работ и сметы. Мы не передаём их третьим лицам и не используем для
            рассылок.
          </p>

          <h2 class="page-section-title">Где хранится файл ТЗ</h2>
          <p class="rb-muted">
            Файл ТЗ не сохраняется на сервере сайта и не публикуется. Он сразу пересылается
            владельцу студии в личный Telegram и остаётся только там. По запросу готовы подписать
            NDA до передачи материалов.
          </p>

          <h2 class="page-section-title">Согласие</h2>
          <p class="rb-muted">
            Отправляя форму, вы соглашаетесь на обработку указанных данных для целей, описанных
            выше. Отозвать согласие или запросить удаление данных можно по контакту ниже.
          </p>

          <h2 class="page-section-title">Как связаться</h2>
          <p class="rb-muted">
            По вопросам обработки обращений можно написать на
            <a :href="`mailto:${siteConfig.email}`">{{ siteConfig.email }}</a>.
          </p>
        </v-card>
      </v-container>
    </section>
  </main>
</template>

