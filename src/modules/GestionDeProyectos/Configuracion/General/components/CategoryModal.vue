<script setup lang="ts">
import { computed, watch } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useGeneralConfigStore from '@/modules/GestionDeProyectos/Configuracion/General/store/generalConfigStore'
import { useGeneralConfigActions } from '@/modules/GestionDeProyectos/Configuracion/General/composables/useGeneralConfigActions'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { categorySchema } from '@/modules/GestionDeProyectos/Configuracion/General/validations/generalConfigValidations'
import CategoryForm from '@/modules/GestionDeProyectos/Configuracion/General/components/CategoryForm.vue'

const modalStore = useModalStore()
const configStore = useGeneralConfigStore()
const { createCategory, updateCategory, deleteCategory } = useGeneralConfigActions()

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(categorySchema),
  validateOnMount: false,
  initialValues: {
    areaId: 0,
    name: '',
    active: true,
  },
})

watch(
  () => configStore.selectedCategory,
  (category) => {
    if (category) {
      setValues(
        {
          areaId: category.areaId,
          name: category.name,
          active: category.active,
        },
        false
      )
    } else {
      resetForm({ values: { areaId: 0, name: '', active: true } })
    }
  },
  { immediate: true }
)

const isDeleteMode = computed(
  () => modalStore.modals[configStore.categoryModalId]?.type === 'DELETE'
)

const onSubmit = async () => {
  const modalType = modalStore.modals[configStore.categoryModalId]?.type

  // CREATE / EDIT usan validación del formulario
  if (modalType === 'CREATE' || modalType === 'EDIT') {
    await handleSubmit(async (formValues) => {
      if (modalType === 'CREATE') {
        await createCategory(formValues)
      }

      if (modalType === 'EDIT' && configStore.selectedCategory) {
        await updateCategory(configStore.selectedCategory.id, formValues)
      }

      configStore.clearCategory()
      modalStore.close(configStore.categoryModalId)
    })()

    return
  }

  // DELETE no requiere validación de formulario
  if (modalType === 'DELETE' && configStore.selectedCategory) {
    await deleteCategory(
      configStore.selectedCategory.areaId,
      configStore.selectedCategory.id
    )
    configStore.clearCategory()
    modalStore.close(configStore.categoryModalId)
  }
}

const onClose = () => {
  resetForm()
  configStore.clearCategory()
}
</script>

<template>
  <BaseModal
    :onSubmit="onSubmit"
    :modalId="configStore.categoryModalId"
    :isSubmitting="isSubmitting"
    :onClose="onClose"
  >
    <template #modalBody>
      <div v-if="isDeleteMode" class="space-y-2">
        <p class="text-sm">
          ¿Estás seguro de que deseas eliminar la categoría
          <span class="font-semibold">{{ configStore.selectedCategory?.name }}</span>?
        </p>
        <p class="text-xs opacity-70">
          Esta acción no se puede deshacer.
        </p>
      </div>
      <CategoryForm v-else />
    </template>
  </BaseModal>
</template>
