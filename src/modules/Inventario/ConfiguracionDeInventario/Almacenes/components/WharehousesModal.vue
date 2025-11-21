<script setup lang="ts">
import { computed, watch } from 'vue'
import { useWarehouseActions } from '../composables/useWharehousesActions'
import { useModalStore } from '@/shared/stores/modal.store'
import useAlmacenStore from '../store/Wharehouses.store'
import AddEditAlmacenForm from '../components/AddEditWharehousesForm.vue'
import { useForm } from 'vee-validate'
import BaseModal from '@/shared/components/BaseModal.vue'
import { showNotification } from '@/utils/toastNotifications'
import { WarehouseFormType } from '@inventario/ConfiguracionDeInventario/Almacenes/types/WharehousesTypes'

const props = defineProps<{ onRefresh?: () => void }>()

const { addAlmacen, editAlmacen } = useWarehouseActions()
const modalStore = useModalStore()
const almacenStore = useAlmacenStore()

const initialValues: WarehouseFormType = {
  nombre: almacenStore.selectedAlmacen?.name ?? '',
  correo: almacenStore.selectedAlmacen?.email ?? '',
  responsable: almacenStore.selectedAlmacen?.responsible ?? '',
  capacidadTotal: almacenStore.selectedAlmacen?.totalCapacity ?? 0,
  esAlmacenCentral: almacenStore.selectedAlmacen?.isCentralWarehouse ?? false,
  zona: almacenStore.selectedAlmacen?.zone ?? '',
  telefono: almacenStore.selectedAlmacen?.phone ?? '',
  celular: almacenStore.selectedAlmacen?.phone ?? '',
  Active: almacenStore.selectedAlmacen?.active ?? false,
  idTipoalmacen: almacenStore.selectedAlmacen?.IdTipoAlmacen ?? 0,
  idUsuario: almacenStore.selectedAlmacen?.idUser ?? ''
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
  initialValues,
  validateOnMount: false
})

const currentModalComponent = computed(() => AddEditAlmacenForm)

watch(
  () => almacenStore.selectedAlmacen,
  (almacen) => {
    if (almacen) {
      setValues({
        nombre: almacen.name,
        correo: almacen.email,
        responsable: almacen.responsible,
        capacidadTotal: almacen.totalCapacity,
        esAlmacenCentral: almacen.isCentralWarehouse,
        zona: almacen.zone,
        telefono: almacen.phone,
        celular: almacen.phone,
        Active: almacen.active
      })
    }
  },
  { immediate: true }
)

const onSubmit = handleSubmit(async (formValues) => {
  const modalType = almacenStore.modalId ? modalStore.modals[almacenStore.modalId]?.type : undefined
if (!modalType) return
  try {
    if (modalType === 'CREATE') await addAlmacen(formValues)
    if (modalType === 'EDIT') await editAlmacen(almacenStore.selectedAlmacen?.id!, formValues)
    showNotification('Operación exitosa', 'success')
    props.onRefresh?.()
    onClose()
    if (almacenStore.modalId) {
      modalStore.close(almacenStore.modalId)
    }
  } catch (error) {
    console.error(error)
  }
})

const onClose = () => resetForm()
</script>

<template>
  <BaseModal
    :onSubmit="onSubmit"
    :modalId="almacenStore.modalId ?? 'default-modal'"
    :isSubmitting="isSubmitting"
    :onClose="onClose"
  >
    <template #modalBody>
      <component :is="currentModalComponent" />
    </template>
  </BaseModal>
</template>
