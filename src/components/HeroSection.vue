<script setup lang="ts">
import { heroBadges, heroSolves, profile } from '@/data/portfolio'

const visualChips = ['PHP 8.4', 'Symfony', 'RabbitMQ', 'DDD', 'ИИ'] as const
</script>

<template>
  <section id="hero" class="hero">
    <v-container class="hero__container">
      <v-row align="center" class="hero__row">
        <v-col cols="12" md="6" lg="6" class="hero__copy">
          <div class="hero__eyebrow">
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
              color="secondary"
              variant="outlined"
              size="small"
              class="hero__badge"
            >
              {{ badge.title }}
            </v-chip>
          </div>

          <div class="hero__actions">
            <v-btn
              :href="profile.contactHref"
              target="_blank"
              rel="noopener"
              color="primary"
              size="large"
              prepend-icon="mdi-send"
            >
              Обсудить задачу
            </v-btn>
            <v-btn
              variant="outlined"
              color="secondary"
              size="large"
              prepend-icon="mdi-format-list-checks"
              to="/services/"
            >
              Посмотреть услуги
            </v-btn>
          </div>

          <ul class="hero__solves">
            <li v-for="item in heroSolves" :key="item">
              <v-icon icon="mdi-check-circle" size="16" color="primary" class="mr-2" />
              {{ item }}
            </li>
          </ul>
        </v-col>

        <v-col cols="12" md="6" lg="6" class="hero__aside">
          <div class="hero-visual" aria-hidden="true">
            <span class="hero-visual__glow" />
            <span class="hero-visual__grid" />

            <div class="iso">
              <span class="iso__b iso__b--slate b1" />
              <span class="iso__b iso__b--orange b2" />
              <span class="iso__b iso__b--sand b3" />
              <span class="iso__b iso__b--muted b4" />
              <span class="iso__b iso__b--slate b5" />
              <span class="iso__b iso__b--orange b6" />
              <span class="iso__b iso__b--sand b7" />
            </div>

            <div class="code-window">
              <div class="cw__bar">
                <span class="cw__dot cw__dot--red" />
                <span class="cw__dot cw__dot--amber" />
                <span class="cw__dot cw__dot--green" />
                <span class="cw__tab">NotificationMessengerFactory.php</span>
                <span class="cw__branch">main</span>
              </div>

              <div class="cw__code">
                <div class="cl"><span class="t-kw">&lt;?php</span></div>
                <div class="cl" />
                <div class="cl"><span class="t-kw">declare</span><span class="t-pun">(</span><span class="t-fn">strict_types</span><span class="t-pun">=</span><span class="t-num">1</span><span class="t-pun">);</span></div>
                <div class="cl" />
                <div class="cl"><span class="t-kw">namespace</span> <span class="t-ns">Rebit\Notification\Infrastructure\Notification\Messenger</span><span class="t-pun">;</span></div>
                <div class="cl" />
                <div class="cl"><span class="t-kw">use</span> <span class="t-ns">Rebit\…\Message\Handler\</span><span class="t-cls">SendNotificationMessageHandler</span><span class="t-pun">;</span></div>
                <div class="cl"><span class="t-kw">use</span> <span class="t-ns">Rebit\…\Message\</span><span class="t-cls">SendNotificationMessage</span><span class="t-pun">;</span></div>
                <div class="cl"><span class="t-kw">use</span> <span class="t-ns">Rebit\Share\…\Messenger\</span><span class="t-cls">AbstractMessengerFactory</span><span class="t-pun">;</span></div>
                <div class="cl"><span class="t-kw">use</span> <span class="t-ns">Rebit\Share\…\Messenger\</span><span class="t-cls">MessengerRouteDto</span><span class="t-pun">;</span></div>
                <div class="cl"><span class="t-kw">use</span> <span class="t-ns">Rebit\Share\…\Enum\</span><span class="t-cls">MessengerQueueEnum</span><span class="t-pun">;</span></div>
                <div class="cl" />
                <div class="cl"><span class="t-kw">final class</span> <span class="t-cls">NotificationMessengerFactory</span> <span class="t-kw">extends</span> <span class="t-cls">AbstractMessengerFactory</span></div>
                <div class="cl"><span class="t-pun">{</span></div>
                <div class="cl i1"><span class="t-cmt">/**</span></div>
                <div class="cl i1"><span class="t-cmt"> * @return list&lt;MessengerRouteDto&gt;</span></div>
                <div class="cl i1"><span class="t-cmt"> */</span></div>
                <div class="cl i1"><span class="t-kw">protected static function</span> <span class="t-fn">routes</span><span class="t-pun">():</span> <span class="t-cls">array</span></div>
                <div class="cl i1"><span class="t-pun">{</span></div>
                <div class="cl i2"><span class="t-kw">return</span> <span class="t-pun">[</span></div>
                <div class="cl i3"><span class="t-kw">new</span> <span class="t-cls">MessengerRouteDto</span><span class="t-pun">(</span></div>
                <div class="cl i4"><span class="t-attr">messageClass:</span> <span class="t-cls">SendNotificationMessage</span><span class="t-pun">::</span><span class="t-const">class</span><span class="t-pun">,</span></div>
                <div class="cl i4"><span class="t-attr">handlerClass:</span> <span class="t-cls">SendNotificationMessageHandler</span><span class="t-pun">::</span><span class="t-const">class</span><span class="t-pun">,</span></div>
                <div class="cl i4"><span class="t-attr">queue:</span> <span class="t-cls">MessengerQueueEnum</span><span class="t-pun">::</span><span class="t-const">NOTIFICATION</span><span class="t-pun">,</span></div>
                <div class="cl i3"><span class="t-pun">),</span></div>
                <div class="cl i2"><span class="t-pun">];</span></div>
                <div class="cl i1"><span class="t-pun">}</span><span class="cw__cursor" /></div>
                <div class="cl"><span class="t-pun">}</span></div>
                <div class="cl" />
              </div>

              <div class="cw__status">
                <span class="cw__status-ok">● tests passed</span>
                <span>PHP 8.4</span>
                <span>RabbitMQ</span>
                <span class="cw__status-right">0 errors</span>
              </div>
            </div>

            <div class="hero-chips">
              <span v-for="chip in visualChips" :key="chip" class="hero-chip">{{ chip }}</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  color: var(--rb-color-text);
  overflow: hidden;
  background:
    linear-gradient(rgba(30, 41, 59, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(30, 41, 59, 0.04) 1px, transparent 1px),
    radial-gradient(circle at 86% 18%, rgba(233, 220, 198, 0.66), transparent 26%),
    var(--rb-color-page);
  background-size: 36px 36px, 36px 36px, auto, auto;
}

.hero__container {
  position: relative;
  z-index: 1;
  padding-top: 44px;
  padding-bottom: 44px;
}

.hero__row {
  min-height: min(540px, calc(100vh - 176px));
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  margin-bottom: 14px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--rb-color-accent);

  &::before,
  &::after {
    color: var(--rb-color-muted);
    opacity: 0.44;
  }

  &::before {
    content: '[';
    margin-right: 8px;
  }

  &::after {
    content: ']';
    margin-left: 8px;
  }
}

.hero__title {
  margin: 0 0 12px;
  font-size: clamp(2.15rem, 4.6vw, 3.55rem);
  line-height: 1.08;
  font-family: Georgia, Cambria, 'Times New Roman', serif;
  font-weight: 800;
  color: var(--rb-color-text);
}

.hero__tagline {
  margin: 0 0 10px;
  font-size: clamp(1.05rem, 2vw, 1.35rem);
  font-weight: 600;
  color: var(--rb-color-text);
}

.hero__summary {
  max-width: 540px;
  margin: 0 0 18px;
  font-size: 1rem;
  line-height: 1.62;
  color: var(--rb-color-muted);
}

.hero__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.hero__badge {
  border-color: rgba(30, 41, 59, 0.18) !important;
  background: rgba(255, 255, 255, 0.58);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 20px;
}

.hero__solves {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
}

.hero__solves li {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: var(--rb-color-muted);
}

/* ---- Правый визуал: окно кода + чипы ---- */
.hero__aside {
  align-self: stretch;
  display: flex;
}

.hero-visual {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  min-height: 380px;
}

.hero-visual__glow {
  position: absolute;
  z-index: 0;
  right: -8%;
  top: 6%;
  width: 62%;
  height: 62%;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.4), transparent 68%);
  filter: blur(14px);
  pointer-events: none;
}

.hero-visual__grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image:
    linear-gradient(rgba(30, 41, 59, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(30, 41, 59, 0.05) 1px, transparent 1px);
  background-size: 26px 26px;
  -webkit-mask-image: radial-gradient(circle at 30% 30%, #000, transparent 72%);
  mask-image: radial-gradient(circle at 30% 30%, #000, transparent 72%);
  pointer-events: none;
}

/* Изометрическая стопка модулей (бывшая .module-scene) — выглядывает позади окна сверху. */
.iso {
  position: absolute;
  z-index: 1;
  top: -34px;
  right: 4px;
  width: 180px;
  height: 150px;
  transform: rotateX(56deg) rotateZ(-42deg);
  transform-style: preserve-3d;
  pointer-events: none;
}

.iso__b {
  position: absolute;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(30, 41, 59, 0.12);
  box-shadow: 8px 8px 0 rgba(30, 41, 59, 0.1);
}

.iso__b--slate {
  background: #1e293b;
}

.iso__b--muted {
  background: #475569;
}

.iso__b--sand {
  background: var(--rb-color-sand);
}

.iso__b--orange {
  background: #f97316;
}

.b1 {
  left: 50px;
  top: 40px;
}

.b2 {
  left: 84px;
  top: 40px;
}

.b3 {
  left: 33px;
  top: 68px;
}

.b4 {
  left: 67px;
  top: 68px;
}

.b5 {
  left: 101px;
  top: 68px;
}

.b6 {
  left: 50px;
  top: 96px;
}

.b7 {
  left: 84px;
  top: 96px;
}

.code-window {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(160deg, #1f2a3d, #16202f 70%);
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 34px 80px rgba(15, 23, 42, 0.4);
}

.cw__bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(15, 23, 42, 0.55);
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
}

.cw__dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}

.cw__dot--red {
  background: #ff5f57;
}

.cw__dot--amber {
  background: #febc2e;
}

.cw__dot--green {
  background: #28c840;
}

.cw__tab {
  margin-left: 8px;
  font-family: 'SFMono-Regular', ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace;
  font-size: 0.78rem;
  color: #cbd5e1;
}

.cw__branch {
  margin-left: auto;
  font-family: ui-monospace, Menlo, Consolas, monospace;
  font-size: 0.72rem;
  color: #64748b;

  &::before {
    content: '⎇ ';
    color: var(--rb-color-accent);
  }
}

.cw__code {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
  counter-reset: ln;
  padding: 14px 18px 18px;
  font-family: ui-monospace, 'JetBrains Mono', 'SFMono-Regular', Menlo, Consolas, monospace;
  font-size: 0.72rem;
  line-height: 1.62;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 64px;
    background: linear-gradient(transparent, #16202f);
    pointer-events: none;
  }
}

.cl {
  counter-increment: ln;
  position: relative;
  min-height: 1.62em; /* пустые строки сохраняют высоту строки кода */
  padding-left: 3em;
  white-space: nowrap;
  color: #aebdd1;

  &::before {
    content: counter(ln);
    position: absolute;
    left: 0;
    width: 2em;
    text-align: right;
    color: #46566e;
  }
}

/* PSR-12: 4 пробела на уровень вложенности (в ch — точная ширина символа моноширинного шрифта). */
.i1 {
  text-indent: 4ch;
}

.i2 {
  text-indent: 8ch;
}

.i3 {
  text-indent: 12ch;
}

.i4 {
  text-indent: 16ch;
}

.t-kw {
  color: #ff9f4d;
  font-weight: 600;
}

.t-cls {
  color: #e9dcc6;
}

.t-ns {
  color: #8aa9cf;
}

.t-cmt {
  color: #5d6e86;
  font-style: italic;
}

.t-attr {
  color: #f0b37e;
}

.t-const {
  color: #e9c46a;
}

.t-fn {
  color: #cbd5e1;
}

.t-num {
  color: #e9c46a;
}

.t-pun {
  color: #8392a8;
}

.cw__cursor {
  display: inline-block;
  width: 7px;
  height: 1.05em;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: var(--rb-color-accent);
  animation: cursor-blink 1.1s steps(1) infinite;
}

.cw__status {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 9px 16px;
  background: rgba(15, 23, 42, 0.6);
  border-top: 1px solid rgba(148, 163, 184, 0.14);
  font-family: ui-monospace, Menlo, Consolas, monospace;
  font-size: 0.7rem;
  color: #8392a8;
}

.cw__status-ok {
  color: #28c840;
}

.cw__status-right {
  margin-left: auto;
}

.hero-chips {
  position: absolute;
  z-index: 3;
  right: -6px;
  bottom: 26px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.hero-chip {
  padding: 5px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(30, 41, 59, 0.12);
  box-shadow: 0 10px 24px rgba(30, 41, 59, 0.16);
  font-size: 0.74rem;
  font-weight: 700;
  color: var(--rb-color-text);
  animation: tile-float 6s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: 0.8s;
  }

  &:nth-child(3) {
    animation-delay: 1.6s;
  }

  &:nth-child(4) {
    animation-delay: 2.4s;
  }

  &:nth-child(5) {
    background: var(--rb-color-accent);
    color: #fff;
    border-color: transparent;
    animation-delay: 3.2s;
  }
}

@keyframes tile-float {
  0%,
  100% {
    transform: translateY(0) rotate(var(--rot, 0deg));
  }

  50% {
    transform: translateY(-9px) rotate(var(--rot, 0deg));
  }
}

@keyframes cursor-blink {
  0%,
  50% {
    opacity: 1;
  }

  51%,
  100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-chip,
  .cw__cursor {
    animation: none;
  }
}

@media (max-width: 959px) {
  .hero__container {
    padding-top: 36px;
    padding-bottom: 40px;
  }

  .hero__row {
    min-height: auto;
  }

  .hero__aside {
    display: none;
  }
}

@media (max-width: 599px) {
  .hero__container {
    padding-top: 32px;
    padding-bottom: 36px;
  }

  .hero__title {
    font-size: 2rem;
  }
}
</style>
