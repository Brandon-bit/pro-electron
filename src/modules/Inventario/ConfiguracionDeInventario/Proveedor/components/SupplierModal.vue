<script setup lang="ts">
// #region Imports
import { computed, watch } from 'vue'
import { useSupplierActions } from '../composables/useSupplierActions'
import { useModalStore } from '@/shared/stores/modal.store'
import useSupplierStore from '../store/supplier.store'
import { SupplierFormType } from '../types/supplierTypes'
import AddEditSupplierForm from '../components/AddEditSupplierForm.vue'
import DeleteSupplier from '../components/DeleteSupplier.vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { supplierSchema } from '../validations/supplierValidation'
import BaseModal from '@/shared/components/BaseModal.vue'
import { showNotification } from '@/utils/toastNotifications'
// #endregion

const props = defineProps<{
  onRefresh?: () => void
}>()

// #region Data
const { addSupplier, editSupplier, deleteSupplier } = useSupplierActions()
const modalStore = useModalStore()
const supplierStore = useSupplierStore()

// Inicializamos el formulario con valores del supplier seleccionado o vacíos
const initialValues: SupplierFormType = {
  id: supplierStore.selectedSupplier?.id,
  IdDireccion: supplierStore.selectedSupplier?.IdDireccion ?? 0,
  razonSocial: supplierStore.selectedSupplier?.socialReason ?? '',
  nombreComercial: supplierStore.selectedSupplier?.comercialName ?? '',
  rfc: supplierStore.selectedSupplier?.rfc ?? '',
  correo: supplierStore.selectedSupplier?.email ?? '',
  contacto: supplierStore.selectedSupplier?.contact ?? '',
  telefono: supplierStore.selectedSupplier?.phone ?? '',
  sitioWeb: supplierStore.selectedSupplier?.webSite ?? '',
  condicionesPago: supplierStore.selectedSupplier?.payConditions ?? '',
  idUsuario: supplierStore.selectedSupplier?.idUser ?? '',
  Activo: supplierStore.selectedSupplier?.active ?? true
}

const modalMap = {
  CREATE: { component: AddEditSupplierForm },
  EDIT: { component: AddEditSupplierForm },
  DELETE: { component: DeleteSupplier }
} as const

type ValidSupplierModalType = keyof typeof modalMap

const { handleSubmit, setValues, resetForm, isSubmitting } = useForm<SupplierFormType>({
  validationSchema: toTypedSchema(supplierSchema),
  initialValues
})
// #endregion

// #region Computed
const currentModalComponent = computed(() => {
  const modalType = modalStore.modals[supplierStore.modalId]?.type
  if (!modalType) return null
  return modalMap[modalType as ValidSupplierModalType].component
})
// #endregion

// #region Watch
watch(
  () => supplierStore.selectedSupplier,
  (supplier) => {
    if (supplier) {
      setValues({
        id: supplier.id,
        IdDireccion: supplier.IdDireccion ?? 0,
        razonSocial: supplier.socialReason ?? '',
        nombreComercial: supplier.comercialName ?? '',
        rfc: supplier.rfc ?? '',
        correo: supplier.email ?? '',
        contacto: supplier.contact ?? '',
        telefono: supplier.phone ?? '',
        sitioWeb: supplier.webSite ?? '',
        condicionesPago: supplier.payConditions ?? '',
        idUsuario: supplier.idUser ?? '',
        Activo: supplier.active ?? true
      })
    }
  },
  { immediate: true }
)
// #endregion

// #region Methods
const onSubmit = () => {
    handleSubmit(async (formValues) => {
        const modalType = modalStore.modals[supplierStore.modalId]?.type
        if (!modalType) return

        try {
            let response

            if (modalType === 'CREATE') {
                response = await addSupplier(formValues)
            } else if (modalType === 'EDIT') {
                if (!formValues.id) throw new Error('No existe ID para editar')
                response = await editSupplier(formValues.id, formValues)
            } else if (modalType === 'DELETE') {
                if (!formValues.id) throw new Error('No existe ID para eliminar')
                response = await deleteSupplier(formValues.id, true)
            }

            if (!response) return

            showNotification(response.message, response.status)

            if (response.status === 'success') {
                props.onRefresh?.()
                onClose()
                modalStore.close(supplierStore.modalId)
            }
        } catch (error) {
            console.error(error)
        }
    })() // ¡ojo! los paréntesis ejecutan handleSubmit inmediatamente
}


const onClose = () => {
  resetForm()
  supplierStore.setSupplier()
}
// #endregion
</script>

<template>
  <BaseModal
    :onSubmit="onSubmit"
    :modalId="supplierStore.modalId"
    :isSubmitting="isSubmitting"
    :onClose="onClose"
  >
    <template v-slot:modalBody>
      <component :is="currentModalComponent" />
    </template>
  </BaseModal>
</template>
