<template>
  <main>
    <section class="page-hero">
      <v-container>
        <div class="page-hero__overline">404</div>
        <h1 class="page-hero__title">Страница не найдена</h1>
        <p class="page-hero__description">
          Возможно, адрес изменился. Выберите нужный раздел или вернитесь на главную.
        </p>
        <div class="page-hero__actions">
          <v-btn color="primary" to="/">На главную</v-btn>
          <v-btn variant="outlined" color="secondary" to="/services/">Услуги</v-btn>
        </div>
      </v-container>
    </section>
  </main>
</template>

