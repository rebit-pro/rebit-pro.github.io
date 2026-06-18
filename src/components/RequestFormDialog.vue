<script setup lang="ts">
import { ref, watch } from 'vue'
import LeadForm from '@/components/LeadForm.vue'
import { useRequestDialog } from '@/composables/useRequestDialog'

const { isOpen, close } = useRequestDialog()

const leadForm = ref<InstanceType<typeof LeadForm> | null>(null)

// При каждом открытии формы возвращаем её в исходное состояние.
watch(isOpen, (open) => {
  if (open) {
    leadForm.value?.reset()
  }
})
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

      <LeadForm ref="leadForm" source="dialog">
        <template #intro>
          <p class="rb-muted request-dialog__lead">
            Опишите задачу, оставьте контакты и при желании приложите ТЗ — ответим и поможем
            оценить работу. Обычно отвечаем в течение рабочего дня.
          </p>
        </template>

        <template #success-action>
          <v-btn color="primary" block @click="close">Закрыть</v-btn>
        </template>
      </LeadForm>
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
</style>
