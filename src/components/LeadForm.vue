<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { leadFile, leadFileMaxBytes, requestEndpoint } from '@/config/site'
import { profile } from '@/data/portfolio'
import { reachGoal } from '@/lib/metrika'

const props = withDefaults(
  defineProps<{
    /** Откуда отправлена заявка — попадает в payload и в цель Метрики. */
    readonly source?: string
    /** Показать поле загрузки файла ТЗ. */
    readonly withFile?: boolean
  }>(),
  { source: 'request', withFile: true },
)

const emit = defineEmits<{
  (event: 'success'): void
}>()

type Status = 'idle' | 'submitting' | 'success' | 'error'
const status = ref<Status>('idle')
const valid = ref(false)

const form = reactive({
  name: '',
  phone: '',
  email: '',
  description: '',
  // honeypot — настоящие пользователи это поле не видят и не заполняют
  company: '',
})

// Один файл ТЗ. v-file-input в Vuetify 3 отдаёт File | File[] | undefined.
const file = ref<File | null>(null)
const fileError = ref('')

const nameRules = [(v: string) => (!!v && v.trim().length >= 2) || 'Укажите имя']

// Телефон в формате +7 999 123-45-67 (11 цифр). Извлекаем цифры и приводим
// к российскому коду: 8 → 7, локальный номер без кода → подставляем 7.
function phoneDigits(value: string): string {
  let digits = String(value ?? '').replace(/\D/g, '')

  if (digits.startsWith('8')) {
    digits = '7' + digits.slice(1)
  }
  if (digits && digits[0] !== '7') {
    digits = '7' + digits
  }

  return digits.slice(0, 11)
}

// Форматирует строку под маску +X XXX XXX-XX-XX по мере ввода.
function formatPhone(value: string): string {
  const d = phoneDigits(value)
  if ('' === d) {
    return ''
  }

  let out = '+' + d[0]
  if (d.length >= 2) out += ' ' + d.slice(1, 4)
  if (d.length >= 5) out += ' ' + d.slice(4, 7)
  if (d.length >= 8) out += '-' + d.slice(7, 9)
  if (d.length >= 10) out += '-' + d.slice(9, 11)

  return out
}

// Маска: переформатируем значение при любом изменении (ввод, вставка).
watch(
  () => form.phone,
  (value) => {
    const formatted = formatPhone(value)
    if (formatted !== value) {
      form.phone = formatted
    }
  },
)

const phoneRules = [
  (v: string) => !!v || 'Укажите телефон',
  (v: string) => phoneDigits(v).length === 11 || 'Введите номер полностью: +7 999 123-45-67',
]
const emailRules = [
  // Поле необязательное: пустое значение допустимо.
  (v: string) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Проверьте email',
]
const descriptionRules = [
  (v: string) => (!!v && v.trim().length >= 10) || 'Опишите задачу — хотя бы пару предложений',
]

const acceptAttr = leadFile.accept

function onFileChange(value: File | File[] | null): void {
  fileError.value = ''
  const picked = Array.isArray(value) ? value[0] ?? null : value ?? null

  if (!picked) {
    file.value = null
    return
  }

  // Клиентская проверка — только UX. Настоящая защита на сервере.
  const ext = picked.name.split('.').pop()?.toLowerCase() ?? ''

  if (!(leadFile.extensions as readonly string[]).includes(ext)) {
    fileError.value = `Поддерживаются: ${leadFile.extensions.join(', ')}`
    file.value = null
    return
  }

  if (picked.size > leadFileMaxBytes) {
    fileError.value = `Файл больше ${leadFile.maxSizeMb} МБ — приложите версию поменьше`
    file.value = null
    return
  }

  file.value = picked
}

function clearFields(): void {
  form.name = ''
  form.phone = ''
  form.email = ''
  form.description = ''
  form.company = ''
  file.value = null
  fileError.value = ''
}

function reset(): void {
  clearFields()
  status.value = 'idle'
}

defineExpose({ reset, status })

async function submit(): Promise<void> {
  if (status.value === 'submitting') {
    return
  }

  // Бот заполнил скрытое поле — тихо имитируем успех, ничего не отправляя.
  if (form.company) {
    status.value = 'success'
    return
  }

  if (!valid.value || fileError.value) {
    return
  }

  status.value = 'submitting'

  try {
    // Всегда отправляем multipart/form-data: один путь и для файла, и без него.
    // Content-Type не выставляем вручную — браузер сам добавит boundary.
    const payload = new FormData()
    payload.append('name', form.name.trim())
    payload.append('phone', form.phone.trim())
    payload.append('email', form.email.trim())
    payload.append('description', form.description.trim())
    payload.append('page', typeof location !== 'undefined' ? location.href : '')
    payload.append('source', props.source)

    if (props.withFile && file.value) {
      payload.append('file', file.value, file.value.name)
    }

    const response = await fetch(requestEndpoint, {
      method: 'POST',
      body: payload,
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    reachGoal(file.value ? 'lead_with_file' : 'lead', { source: props.source })

    clearFields()
    status.value = 'success'
    emit('success')
  } catch {
    status.value = 'error'
  }
}

const fileHint = computed(
  () => `До ${leadFile.maxSizeMb} МБ · pdf, doc, docx, xls, xlsx, txt, zip, png, jpg`,
)
</script>

<template>
  <!-- Успешная отправка -->
  <div v-if="status === 'success'" class="lead-form__success">
    <v-avatar size="64" color="primary" variant="tonal" class="mb-4">
      <v-icon size="34">mdi-check</v-icon>
    </v-avatar>
    <h3 class="text-h6 font-weight-bold mb-2">Заявка отправлена</h3>
    <p class="rb-muted mb-6">
      Спасибо! Получили вашу заявку{{ withFile ? ' и файл ТЗ' : '' }} — пришлём план работ и смету
      в течение рабочего дня.
    </p>
    <slot name="success-action" />
  </div>

  <!-- Форма -->
  <template v-else>
    <slot name="intro" />

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
      <v-text-field
        v-model="form.email"
        :rules="emailRules"
        label="Email (необязательно)"
        type="email"
        inputmode="email"
        variant="outlined"
        density="comfortable"
        prepend-inner-icon="mdi-email-outline"
        autocomplete="email"
        hint="Пришлём оценку на почту, если удобнее"
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

      <template v-if="withFile">
        <v-file-input
          :model-value="file"
          :accept="acceptAttr"
          :error-messages="fileError"
          :hint="fileHint"
          persistent-hint
          label="Прикрепить ТЗ (необязательно)"
          variant="outlined"
          density="comfortable"
          prepend-icon=""
          prepend-inner-icon="mdi-paperclip"
          show-size
          clearable
          class="mb-1"
          @update:model-value="onFileChange"
        />
        <p class="lead-form__file-note rb-muted">
          ТЗ конфиденциально, не публикуется и не хранится на сервере — уходит только владельцу.
          Можно отправить заявку и без файла.
        </p>
      </template>

      <!-- honeypot: скрыт от людей, ловит ботов -->
      <input
        v-model="form.company"
        class="lead-form__hp"
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
        {{ status === 'submitting' ? 'Отправляем…' : 'Отправить заявку' }}
      </v-btn>
    </v-form>

    <div class="lead-form__alt">
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

    <p class="lead-form__privacy rb-muted">
      Нажимая «Отправить заявку», вы соглашаетесь с
      <RouterLink to="/privacy/">политикой конфиденциальности</RouterLink> и обработкой
      указанных данных.
    </p>
  </template>
</template>

<style scoped lang="scss">
.lead-form__success {
  text-align: center;
  padding: 12px 0 4px;
}

.lead-form__file-note {
  margin: 4px 0 16px;
  font-size: 0.78rem;
  line-height: 1.5;
}

.lead-form__alt {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 16px;
  text-align: center;
}

.lead-form__privacy {
  margin: 16px 0 0;
  font-size: 0.78rem;
  text-align: center;
  line-height: 1.5;
}

.lead-form__hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}
</style>
