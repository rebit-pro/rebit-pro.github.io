<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRequestDialog } from '@/composables/useRequestDialog'
import { requestEndpoint } from '@/config/site'
import { profile } from '@/data/portfolio'

const { isOpen, close } = useRequestDialog()

type Status = 'idle' | 'submitting' | 'success' | 'error'
const status = ref<Status>('idle')
const valid = ref(false)

const form = reactive({
  name: '',
  phone: '',
  description: '',
  // honeypot — настоящие пользователи это поле не видят и не заполняют
  company: '',
})

const nameRules = [(v: string) => (!!v && v.trim().length >= 2) || 'Укажите имя']
const phoneRules = [
  (v: string) => !!v || 'Укажите телефон',
  (v: string) => /^[+\d][\d\s()\-]{6,}$/.test((v || '').trim()) || 'Проверьте номер телефона',
]
const descriptionRules = [
  (v: string) => (!!v && v.trim().length >= 10) || 'Опишите задачу — хотя бы пару предложений',
]

// При каждом открытии формы возвращаем её в исходное состояние.
watch(isOpen, (open) => {
  if (open) {
    status.value = 'idle'
  }
})

async function submit(): Promise<void> {
  if (status.value === 'submitting') {
    return
  }

  // Бот заполнил скрытое поле — тихо имитируем успех, ничего не отправляя.
  if (form.company) {
    status.value = 'success'
    return
  }

  if (!valid.value) {
    return
  }

  status.value = 'submitting'

  try {
    const response = await fetch(requestEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name.trim(),
        phone: form.phone.trim(),
        description: form.description.trim(),
        page: typeof location !== 'undefined' ? location.href : '',
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    status.value = 'success'
    form.name = ''
    form.phone = ''
    form.description = ''
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <v-dialog v-model="isOpen" max-width="540" scrollable>
    <v-card class="request-dialog" rounded="lg">
      <div class="request-dialog__head">
        <div>
          <div class="request-dialog__overline">Заявка</div>
          <h2 class="request-dialog__title">Оставить заявку</h2>
        </div>
        <v-btn icon="mdi-close" variant="text" size="small" aria-label="Закрыть" @click="close" />
      </div>

      <!-- Успешная отправка -->
      <div v-if="status === 'success'" class="request-dialog__success">
        <v-avatar size="64" color="primary" variant="tonal" class="mb-4">
          <v-icon size="34">mdi-check</v-icon>
        </v-avatar>
        <h3 class="text-h6 font-weight-bold mb-2">Заявка отправлена</h3>
        <p class="rb-muted mb-6">
          Спасибо! Получили вашу заявку и свяжемся с вами в ближайшее время.
        </p>
        <v-btn color="primary" block @click="close">Закрыть</v-btn>
      </div>

      <!-- Форма -->
      <template v-else>
        <p class="rb-muted request-dialog__lead">
          Опишите задачу и оставьте контакты — ответим и поможем оценить работу.
          Обычно отвечаем в течение рабочего дня.
        </p>

        <v-form v-model="valid" @submit.prevent="submit">
          <v-text-field
            v-model="form.name"
            :rules="nameRules"
            label="Имя"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-account-outline"
            autocomplete="name"
            class="mb-1"
          />
          <v-text-field
            v-model="form.phone"
            :rules="phoneRules"
            label="Телефон"
            type="tel"
            inputmode="tel"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-phone-outline"
            autocomplete="tel"
            placeholder="+7 999 123-45-67"
            class="mb-1"
          />
          <v-textarea
            v-model="form.description"
            :rules="descriptionRules"
            label="Описание задачи"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-text-box-outline"
            rows="4"
            auto-grow
            counter
          />

          <!-- honeypot: скрыт от людей, ловит ботов -->
          <input
            v-model="form.company"
            class="request-dialog__hp"
            type="text"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
          />

          <v-alert
            v-if="status === 'error'"
            type="error"
            variant="tonal"
            density="comfortable"
            class="mb-4"
          >
            Не удалось отправить заявку. Попробуйте ещё раз или напишите в Telegram.
          </v-alert>

          <v-btn
            type="submit"
            color="primary"
            size="large"
            block
            :loading="status === 'submitting'"
            prepend-icon="mdi-send"
          >
            Отправить заявку
          </v-btn>
        </v-form>

        <div class="request-dialog__alt">
          <span class="rb-muted">Удобнее в мессенджере?</span>
          <v-btn
            :href="profile.contactHref"
            target="_blank"
            rel="noopener"
            variant="text"
            color="secondary"
            prepend-icon="mdi-send-circle-outline"
          >
            Написать в Telegram
          </v-btn>
        </div>

        <p class="request-dialog__privacy rb-muted">
          Нажимая «Отправить заявку», вы соглашаетесь с
          <RouterLink to="/privacy/" @click="close">политикой конфиденциальности</RouterLink>.
        </p>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
.request-dialog {
  padding: 24px;
}

.request-dialog__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.request-dialog__overline {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--rb-color-accent);
}

.request-dialog__title {
  margin: 4px 0 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--rb-color-text);
}

.request-dialog__lead {
  margin: 0 0 20px;
  line-height: 1.6;
}

.request-dialog__success {
  text-align: center;
  padding: 12px 0 4px;
}

.request-dialog__alt {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 16px;
  text-align: center;
}

.request-dialog__privacy {
  margin: 16px 0 0;
  font-size: 0.78rem;
  text-align: center;
  line-height: 1.5;
}

.request-dialog__hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}
</style>
