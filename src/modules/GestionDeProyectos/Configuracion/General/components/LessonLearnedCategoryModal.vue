<script setup lang="ts">
import { computed, watch } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useGeneralConfigStore from '@/modules/GestionDeProyectos/Configuracion/General/store/generalConfigStore'
import { useGeneralConfigActions } from '@/modules/GestionDeProyectos/Configuracion/General/composables/useGeneralConfigActions'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { lessonLearnedCategorySchema } from '@/modules/GestionDeProyectos/Configuracion/General/validations/generalConfigValidations'
import LessonLearnedCategoryForm from '@/modules/GestionDeProyectos/Configuracion/General/components/LessonLearnedCategoryForm.vue'

const modalStore = useModalStore()
const configStore = useGeneralConfigStore()
const { createLessonLearnedCategory, updateLessonLearnedCategory, deleteLessonLearnedCategory } =
  useGeneralConfigActions()

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(lessonLearnedCategorySchema),
  validateOnMount: false,
  initialValues: {
    name: '',
    description: '',
    active: true,
  },
})

watch(
  () => configStore.selectedLessonLearnedCategory,
  (category) => {
    if (category) {
      setValues(
        {
          name: category.name,
          description: category.description,
          active: category.active,
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
  () => modalStore.modals[configStore.lessonLearnedCategoryModalId]?.type === 'DELETE'
)

const onSubmit = async () => {
  const modalType = modalStore.modals[configStore.lessonLearnedCategoryModalId]?.type

  // CREATE / EDIT usan validación del formulario
  if (modalType === 'CREATE' || modalType === 'EDIT') {
    await handleSubmit(async (formValues) => {
      if (modalType === 'CREATE') {
        await createLessonLearnedCategory(formValues)
      }

      if (modalType === 'EDIT' && configStore.selectedLessonLearnedCategory) {
        await updateLessonLearnedCategory(configStore.selectedLessonLearnedCategory.id, formValues)
      }

      configStore.clearLessonLearnedCategory()
      modalStore.close(configStore.lessonLearnedCategoryModalId)
    })()

    return
  }

  // DELETE no requiere validación de formulario
  if (modalType === 'DELETE' && configStore.selectedLessonLearnedCategory) {
    await deleteLessonLearnedCategory(configStore.selectedLessonLearnedCategory.id)
    configStore.clearLessonLearnedCategory()
    modalStore.close(configStore.lessonLearnedCategoryModalId)
  }
}

const onClose = () => {
  resetForm()
  configStore.clearLessonLearnedCategory()
}
</script>

<template>
  <BaseModal
    :onSubmit="onSubmit"
    :modalId="configStore.lessonLearnedCategoryModalId"
    :isSubmitting="isSubmitting"
    :onClose="onClose"
  >
    <template #modalBody>
      <div v-if="isDeleteMode" class="space-y-2">
        <p class="text-sm">
          ¿Estás seguro de que deseas eliminar la categoría
          <span class="font-semibold">
            {{ configStore.selectedLessonLearnedCategory?.name }}
          </span>
          ?
        </p>
        <p class="text-xs opacity-70">
          Esta acción no se puede deshacer.
        </p>
      </div>
      <LessonLearnedCategoryForm v-else />
    </template>
  </BaseModal>
</template>
