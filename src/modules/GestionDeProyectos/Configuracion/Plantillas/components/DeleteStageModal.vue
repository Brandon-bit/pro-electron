<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { useTemplateStore } from '../store/templateStore'
import { useTemplateActions } from '../composables/useTemplateActions'

const modalStore = useModalStore()
const templateStore = useTemplateStore()
const { deleteStage } = useTemplateActions()

const isSubmitting = ref(false)

const onSubmit = async () => {
  if (!templateStore.selectedStage) return
  
  isSubmitting.value = true
  try {
    await deleteStage(templateStore.selectedStage.id)
    templateStore.clearSelectedStage()
    modalStore.close(templateStore.deleteStageModalId)
  } finally {
    isSubmitting.value = false
  }
}

const onClose = () => {
  templateStore.clearSelectedStage()
}
</script>

<template>
  <BaseModal
    :onSubmit="onSubmit"
    :modalId="templateStore.deleteStageModalId"
    :isSubmitting="isSubmitting"
    :onClose="onClose"
  >
    <template #modalBody>
      <div class="space-y-2">
        <p class="text-sm">
          ¿Estás seguro de que deseas eliminar la etapa
          <span class="font-semibold">{{ templateStore.selectedStage?.name }}</span>?
        </p>
        <p class="text-xs opacity-70">
          Esta acción eliminará todas las actividades asociadas a esta etapa. Esta acción no se puede deshacer.
        </p>
      </div>
    </template>
  </BaseModal>
</template>
