<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { useTemplateStore } from '../store/templateStore'
import { useTemplateActions } from '../composables/useTemplateActions'

const modalStore = useModalStore()
const templateStore = useTemplateStore()
const { deleteActivity } = useTemplateActions()

const isSubmitting = ref(false)

const onSubmit = async () => {
  if (!templateStore.selectedActivity) return
  
  isSubmitting.value = true
  try {
    await deleteActivity(templateStore.selectedActivity.id)
    templateStore.clearSelectedActivity()
    modalStore.close(templateStore.deleteActivityModalId)
  } finally {
    isSubmitting.value = false
  }
}

const onClose = () => {
  templateStore.clearSelectedActivity()
}
</script>

<template>
  <BaseModal
    :onSubmit="onSubmit"
    :modalId="templateStore.deleteActivityModalId"
    :isSubmitting="isSubmitting"
    :onClose="onClose"
  >
    <template #modalBody>
      <div class="space-y-2">
        <p class="text-sm">
          ¿Estás seguro de que deseas eliminar la actividad
          <span class="font-semibold">{{ templateStore.selectedActivity?.name }}</span>?
        </p>
        <p class="text-xs opacity-70">
          Esta acción no se puede deshacer.
        </p>
      </div>
    </template>
  </BaseModal>
</template>
