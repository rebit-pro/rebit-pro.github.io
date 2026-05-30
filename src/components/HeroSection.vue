<script setup lang="ts">
import { heroBadges, heroSolves, profile } from '@/data/portfolio'

function scrollTo(target: string): void {
  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
}

// Реальный DDD-сниппет (как на баннере). Подсветка статична и безопасна —
// контент наш, поэтому рендерим размеченный HTML через v-html.
const codeFile = 'GetConnectionStatusUseCase.php'
const codeHtml = `<span class="t-tag">&lt;?php</span>
<span class="t-key">declare</span>(<span class="t-fn">strict_types</span>=<span class="t-num">1</span>);

<span class="t-key">namespace</span> <span class="t-ns">Rebit\\Identity\\Application</span>;

<span class="t-key">final readonly class</span> <span class="t-cls">GetConnectionStatusUseCase</span>
{
    <span class="t-key">public function</span> <span class="t-fn">__construct</span>(
        <span class="t-key">private</span> <span class="t-cls">ApiConnectionRepository</span> <span class="t-var">$repository</span>,
        <span class="t-key">private</span> <span class="t-cls">ApiKeyEncryptor</span> <span class="t-var">$encryptor</span>,
    ) {}

    <span class="t-key">public function</span> <span class="t-fn">execute</span>(<span class="t-cls">int</span> <span class="t-var">$userId</span>): <span class="t-cls">ApiConnectionResultDto</span>
    {
        <span class="t-var">$connection</span> = <span class="t-var">$this</span>-&gt;<span class="t-fn">repository</span>-&gt;<span class="t-fn">findByUserId</span>(<span class="t-var">$userId</span>);

        <span class="t-key">if</span> (<span class="t-cst">null</span> === <span class="t-var">$connection</span>) {
            <span class="t-key">return</span> <span class="t-cls">ApiConnectionResultDto</span>::<span class="t-fn">disconnected</span>();
        }

        <span class="t-key">return</span> <span class="t-cls">ApiConnectionResultDto</span>::<span class="t-fn">connected</span>(<span class="t-var">$connection</span>);
    }
}`
</script>

<template>
  <section id="hero" class="hero">
    <v-container class="hero__container py-12">
      <v-row align="center" class="hero__row">
        <v-col cols="12" md="6" lg="6" class="hero__copy">
          <div class="hero__eyebrow">
            <v-icon icon="mdi-shield-check" size="18" class="mr-1" />
            {{ profile.experience }}
          </div>

          <h1 class="hero__title">{{ profile.role }}</h1>

          <p class="hero__tagline">{{ profile.tagline }}</p>
          <p class="hero__summary">{{ profile.summary }}</p>

          <div class="hero__badges">
            <v-chip
              v-for="badge in heroBadges"
              :key="badge.title"
              :prepend-icon="badge.icon"
              color="white"
              variant="outlined"
              size="small"
              class="hero__badge"
            >
              {{ badge.title }}
            </v-chip>
          </div>

          <div class="hero__actions">
            <v-btn
              color="secondary"
              size="large"
              rounded="lg"
              prepend-icon="mdi-folder-multiple-outline"
              @click="scrollTo('projects')"
            >
              Смотреть проекты
            </v-btn>
            <v-btn
              variant="outlined"
              color="white"
              size="large"
              rounded="lg"
              prepend-icon="mdi-email-outline"
              @click="scrollTo('contact')"
            >
              Связаться
            </v-btn>
          </div>

          <ul class="hero__solves">
            <li v-for="item in heroSolves" :key="item">
              <v-icon icon="mdi-check-circle" size="16" color="info" class="mr-2" />
              {{ item }}
            </li>
          </ul>
        </v-col>

        <v-col cols="12" md="6" lg="6" class="hero__aside">
          <div class="code-card">
            <div class="code-card__bar">
              <span class="code-card__dot code-card__dot--red" />
              <span class="code-card__dot code-card__dot--amber" />
              <span class="code-card__dot code-card__dot--green" />
              <span class="code-card__file">{{ codeFile }}</span>
            </div>
            <pre class="code-card__body"><code v-html="codeHtml" /></pre>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  color: #fff;
  overflow: hidden;
}

.hero__container {
  position: relative;
  z-index: 1;
}

.hero__row {
  min-height: min(640px, calc(100vh - 120px));
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  margin-bottom: 18px;
  border: 1px solid rgba(88, 166, 255, 0.5);
  border-radius: 999px;
  background: rgba(30, 136, 229, 0.12);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #cfe4ff;
}

.hero__title {
  margin: 0 0 16px;
  font-size: clamp(2.3rem, 5vw, 3.8rem);
  line-height: 1.08;
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.hero__tagline {
  margin: 0 0 14px;
  font-size: clamp(1.05rem, 2vw, 1.35rem);
  font-weight: 600;
  color: #eaf2ff;
}

.hero__summary {
  max-width: 540px;
  margin: 0 0 22px;
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.78);
}

.hero__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 26px;
}

.hero__badge {
  border-color: rgba(255, 255, 255, 0.32) !important;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 26px;
}

.hero__solves {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.hero__solves li {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.86);
}

// ── IDE-карточка ──────────────────────────────────────────────
.code-card {
  border-radius: 16px;
  overflow: hidden;
  background: #0b1220;
  border: 1px solid rgba(88, 166, 255, 0.22);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.45);
}

.code-card__bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #0f1830;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.code-card__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.code-card__dot--red {
  background: #ff5f56;
}
.code-card__dot--amber {
  background: #ffbd2e;
}
.code-card__dot--green {
  background: #27c93f;
}

.code-card__file {
  margin-left: 10px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.55);
}

.code-card__body {
  margin: 0;
  padding: 20px 22px;
  overflow-x: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.82rem;
  line-height: 1.62;
  color: #abb2bf;
  tab-size: 4;
}

// Токены подсветки (one-dark-подобная палитра).
.code-card__body :deep(.t-tag) { color: #7f848e; }
.code-card__body :deep(.t-key) { color: #c678dd; }
.code-card__body :deep(.t-ns) { color: #56b6c2; }
.code-card__body :deep(.t-cls) { color: #61afef; }
.code-card__body :deep(.t-fn) { color: #61afef; }
.code-card__body :deep(.t-var) { color: #e06c75; }
.code-card__body :deep(.t-num) { color: #d19a66; }
.code-card__body :deep(.t-cst) { color: #d19a66; }

@media (max-width: 959px) {
  .hero__row {
    min-height: auto;
  }

  .hero__aside {
    margin-top: 8px;
  }
}
</style>
