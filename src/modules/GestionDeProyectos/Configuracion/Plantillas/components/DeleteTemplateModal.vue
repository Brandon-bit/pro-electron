<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { useTemplateStore } from '../store/templateStore'
import { useTemplateActions } from '../composables/useTemplateActions'

const modalStore = useModalStore()
const templateStore = useTemplateStore()
const { deleteTemplate } = useTemplateActions()

const isSubmitting = ref(false)

const onSubmit = async () => {
  if (!templateStore.selectedTemplate) return
  
  isSubmitting.value = true
  try {
    await deleteTemplate(templateStore.selectedTemplate.id)
    templateStore.clearSelectedTemplate()
    modalStore.close(templateStore.deleteTemplateModalId)
  } finally {
    isSubmitting.value = false
  }
}

const onClose = () => {
  templateStore.clearSelectedTemplate()
}
</script>

<template>
  <BaseModal
    :onSubmit="onSubmit"
    :modalId="templateStore.deleteTemplateModalId"
    :isSubmitting="isSubmitting"
    :onClose="onClose"
  >
    <template #modalBody>
      <div class="space-y-2">
        <p class="text-sm">
          ¿Estás seguro de que deseas eliminar la plantilla
          <span class="font-semibold">{{ templateStore.selectedTemplate?.name }}</span>?
        </p>
        <p class="text-xs opacity-70">
          Esta acción eliminará todas las etapas y actividades asociadas. Esta acción no se puede deshacer.
        </p>
      </div>
    </template>
  </BaseModal>
</template>
