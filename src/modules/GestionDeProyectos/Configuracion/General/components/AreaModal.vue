<script setup lang="ts">
import { computed, watch } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useGeneralConfigStore from '@/modules/GestionDeProyectos/Configuracion/General/store/generalConfigStore'
import { useGeneralConfigActions } from '@/modules/GestionDeProyectos/Configuracion/General/composables/useGeneralConfigActions'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { areaSchema } from '@/modules/GestionDeProyectos/Configuracion/General/validations/generalConfigValidations'
import AreaForm from '@/modules/GestionDeProyectos/Configuracion/General/components/AreaForm.vue'

const modalStore = useModalStore()
const configStore = useGeneralConfigStore()
const { createArea, updateArea, deleteArea } = useGeneralConfigActions()

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(areaSchema),
  validateOnMount: false,
  initialValues: {
    name: '',
    description: '',
    active: true,
  },
})

watch(
  () => configStore.selectedArea,
  (area) => {
    if (area) {
      // No validamos al asignar valores iniciales para evitar errores al abrir el modal
      setValues(
        {
          name: area.name,
          description: area.description,
          active: area.active,
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
  () => modalStore.modals[configStore.areaModalId]?.type === 'DELETE'
)

const onSubmit = async () => {
  const modalType = modalStore.modals[configStore.areaModalId]?.type

  // CREATE / EDIT usan el formulario con validación
  if (modalType === 'CREATE' || modalType === 'EDIT') {
    await handleSubmit(async (formValues) => {
      if (modalType === 'CREATE') {
        await createArea(formValues)
      }

      if (modalType === 'EDIT' && configStore.selectedArea) {
        await updateArea(configStore.selectedArea.id, formValues)
      }

      // Solo si la validación fue correcta y la acción se ejecutó, limpiamos y cerramos
      configStore.clearArea()
      modalStore.close(configStore.areaModalId)
    })()

    // handleSubmit ya gestionó clear/close en el caso válido; si hubo errores de validación
    // simplemente no ejecuta el callback y el modal permanece abierto
    return
  }

  // DELETE no requiere validación de formulario
  if (modalType === 'DELETE' && configStore.selectedArea) {
    await deleteArea(configStore.selectedArea.id)
    configStore.clearArea()
    modalStore.close(configStore.areaModalId)
  }

}

const onClose = () => {
  resetForm()
  configStore.clearArea()
}
</script>

<template>
  <BaseModal
    :onSubmit="onSubmit"
    :modalId="configStore.areaModalId"
    :isSubmitting="isSubmitting"
    :onClose="onClose"
  >
    <template #modalBody>
      <div v-if="isDeleteMode" class="space-y-2">
        <p class="text-sm">
          ¿Estás seguro de que deseas eliminar el área
          <span class="font-semibold">{{ configStore.selectedArea?.name }}</span>?
        </p>
        <p class="text-xs opacity-70">
          Esta acción no se puede deshacer.
        </p>
      </div>
      <AreaForm v-else />
    </template>
  </BaseModal>
</template>
