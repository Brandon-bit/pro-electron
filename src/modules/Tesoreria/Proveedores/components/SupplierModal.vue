<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useSupplierStore from '@/modules/Tesoreria/Proveedores/store/supplierStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import SupplierForm from '@/modules/Tesoreria/Proveedores/components/SupplierForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { createUpdateSupplierSchema } from '@/modules/Tesoreria/Proveedores/validations/supplierValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useSupplierActions } from '@/modules/Tesoreria/Proveedores/composables/useSupplierActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const supplierStore = useSupplierStore()
const modalStore = useModalStore()
const { createSupplier, updateSupplier } = useSupplierActions()
const mode = computed(() => modalStore.modals[supplierStore.modalId]?.type)

const modalMap = {
    CREATE: {
        component: SupplierForm,
        action: createSupplier,
        schemaValidation: createUpdateSupplierSchema
    },
    UPDATE: {
        component: SupplierForm,
        action: updateSupplier,
        schemaValidation: createUpdateSupplierSchema
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as keyof typeof modalMap
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const initialValues = {
    name: supplierStore.selectedSupplier?.name,
    rfc: supplierStore.selectedSupplier?.rfc,
    email: supplierStore.selectedSupplier?.email,
    phone: supplierStore.selectedSupplier?.phone,
    street: supplierStore.selectedSupplier?.street,
    city: supplierStore.selectedSupplier?.city,
    state: supplierStore.selectedSupplier?.state,
    postalCode: supplierStore.selectedSupplier?.postalCode,
    creditDays: supplierStore.selectedSupplier?.creditDays,
    active: supplierStore.selectedSupplier?.active,
    notes: supplierStore.selectedSupplier?.notes
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => supplierStore.selectedSupplier,
    (current) => {
        if (mode.value === 'UPDATE' && current) {
            setValues({ ...current })
        } else if (mode.value === 'CREATE') {
            resetForm()
            setValues({ ...current })
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[supplierStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[supplierStore.modalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action

    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(supplierStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    supplierStore.setData()
}
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
