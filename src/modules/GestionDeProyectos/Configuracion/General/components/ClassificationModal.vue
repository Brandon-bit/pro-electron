<script setup lang="ts">
import { computed, watch } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useGeneralConfigStore from '@/modules/GestionDeProyectos/Configuracion/General/store/generalConfigStore'
import { useGeneralConfigActions } from '@/modules/GestionDeProyectos/Configuracion/General/composables/useGeneralConfigActions'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { classificationSchema } from '@/modules/GestionDeProyectos/Configuracion/General/validations/generalConfigValidations'
import ClassificationForm from '@/modules/GestionDeProyectos/Configuracion/General/components/ClassificationForm.vue'

const modalStore = useModalStore()
const configStore = useGeneralConfigStore()
const { createClassification, updateClassification, deleteClassification } =
  useGeneralConfigActions()

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(classificationSchema),
  validateOnMount: false,
  initialValues: {
    name: '',
    description: '',
    active: true,
  },
})

watch(
  () => configStore.selectedClassification,
  (classification) => {
    if (classification) {
      setValues(
        {
          name: classification.name,
          description: classification.description,
          active: classification.active,
        },
        false
      )
    } else {
      resetForm({ values: { name: '', description: '', active: true } })
    }
  },
  { immediate: true }
)

const isDeleteMode = computed(
  () => modalStore.modals[configStore.classificationModalId]?.type === 'DELETE'
)

const onSubmit = async () => {
  const modalType = modalStore.modals[configStore.classificationModalId]?.type

  // CREATE / EDIT usan validación del formulario
  if (modalType === 'CREATE' || modalType === 'EDIT') {
    await handleSubmit(async (formValues) => {
      if (modalType === 'CREATE') {
        await createClassification(formValues)
      }

      if (modalType === 'EDIT' && configStore.selectedClassification) {
        await updateClassification(configStore.selectedClassification.id, formValues)
      }

      configStore.clearClassification()
      modalStore.close(configStore.classificationModalId)
    })()

    return
  }

  // DELETE no requiere validación de formulario
  if (modalType === 'DELETE' && configStore.selectedClassification) {
    await deleteClassification(configStore.selectedClassification.id)
    configStore.clearClassification()
    modalStore.close(configStore.classificationModalId)
  }
}

const onClose = () => {
  resetForm()
  configStore.clearClassification()
}
</script>

<template>
  <BaseModal
    :onSubmit="onSubmit"
    :modalId="configStore.classificationModalId"
    :isSubmitting="isSubmitting"
    :onClose="onClose"
  >
    <template #modalBody>
      <div v-if="isDeleteMode" class="space-y-2">
        <p class="text-sm">
          ¿Estás seguro de que deseas eliminar la clasificación
          <span class="font-semibold">
            {{ configStore.selectedClassification?.name }}
          </span>
          ?
        </p>
        <p class="text-xs opacity-70">
          Esta acción no se puede deshacer.
        </p>
      </div>
      <ClassificationForm v-else />
    </template>
  </BaseModal>
</template>
