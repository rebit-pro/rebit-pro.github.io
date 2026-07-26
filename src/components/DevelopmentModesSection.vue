<script setup lang="ts">
import { pricingItems } from '@/content/pricing'

const landing = pricingItems.find((item) => item.slug === 'landing-quick-start')
const businessSite = pricingItems.find((item) => item.slug === 'business-card-site')
const microMvp = pricingItems.find((item) => item.slug === 'micro-mvp')
const deep = pricingItems.find((item) => item.slug === 'deep-development')
</script>

<template>
  <section id="development-modes" class="section section--sand">
    <v-container>
      <div class="section__heading">
        <div class="section__overline">Vibe Coding + Deep Coding</div>
        <h2 class="section__title">Быстро там, где задача типовая. Глубоко там, где ошибка стоит денег</h2>
        <p class="section__description">
          Способ разработки выбираем не по моде, а по риску. Клиент получает понятный
          состав и ответственность независимо от того, сколько рутины ускорено AI-инструментами.
        </p>
      </div>

      <div class="modes-grid">
        <article class="mode-card mode-card--vibe">
          <div class="mode-card__label">Vibe Coding</div>
          <h3>Быстрый запуск</h3>
          <p>
            Для лендингов и сайтов 5–7 страниц без кабинетов, платежей, чувствительных
            данных и нестандартных интеграций.
          </p>
          <ul>
            <li v-if="landing">{{ landing.title }} — {{ landing.price }}</li>
            <li v-if="businessSite">{{ businessSite.title }} — {{ businessSite.price }}</li>
            <li>готовая дизайн-система, ручной QA, SEO и публикация</li>
          </ul>
          <v-btn to="/services/vibe-coding/" color="primary" variant="flat" append-icon="mdi-arrow-right">
            О быстром запуске
          </v-btn>
        </article>

        <article class="mode-card mode-card--deep">
          <div class="mode-card__label">Deep Coding</div>
          <h3>Индивидуальная разработка</h3>
          <p>
            Для кабинетов, ролей, платежей, персональных данных, 1С/CRM, сложных
            бизнес-правил, legacy и длительного развития.
          </p>
          <ul>
            <li v-if="microMvp">{{ microMvp.title }} — {{ microMvp.price }}</li>
            <li v-if="deep">{{ deep.title }} — {{ deep.price }}</li>
            <li>Discovery, архитектура, тесты по риску и поэтапный релиз</li>
          </ul>
          <v-btn to="/services/deep-coding/" color="secondary" variant="outlined" append-icon="mdi-arrow-right">
            Об индивидуальной разработке
          </v-btn>
        </article>
      </div>

      <div class="hybrid-note">
        <strong>Гибридный формат:</strong>
        публичный сайт запускаем быстро, а кабинет, платежи или обмен с 1С делаем
        отдельным Deep-модулем за стабильным API.
      </div>
    </v-container>
  </section>
</template>

<style scoped>
.modes-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.mode-card {
  padding: clamp(24px, 4vw, 38px);
  border: 1px solid rgba(30, 41, 59, 0.12);
  border-radius: 16px;
  background: var(--rb-color-surface);
}

.mode-card--deep {
  background: var(--rb-color-text);
  color: #fff;
}

.mode-card__label {
  margin-bottom: 12px;
  color: var(--rb-color-accent);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.mode-card h3 {
  margin: 0 0 12px;
  font-size: clamp(1.4rem, 3vw, 2rem);
}

.mode-card p {
  margin: 0;
  color: var(--rb-color-muted);
  line-height: 1.65;
}

.mode-card--deep p,
.mode-card--deep li {
  color: rgba(255, 255, 255, 0.74);
}

.mode-card ul {
  display: grid;
  gap: 10px;
  padding-left: 20px;
  margin: 22px 0;
  line-height: 1.5;
}

.hybrid-note {
  max-width: 920px;
  padding: 18px 22px;
  margin: 24px auto 0;
  border-left: 4px solid var(--rb-color-accent);
  background: rgba(255, 255, 255, 0.68);
  color: var(--rb-color-muted);
  line-height: 1.6;
}

.hybrid-note strong {
  color: var(--rb-color-text);
}

@media (max-width: 800px) {
  .modes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
