<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useAccountPayableStore from '@/modules/Tesoreria/CuentasPorPagar/store/accountPayableStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import PaymentForm from '@/modules/Tesoreria/CuentasPorPagar/components/PaymentForm.vue'
import DeletePaymentForm from '@/modules/Tesoreria/CuentasPorPagar/components/DeletePaymentForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { createPaymentSchema, deletePaymentSchema } from '@/modules/Tesoreria/CuentasPorPagar/validations/accountPayableValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { showNotification } from '@/utils/toastNotifications'

const accountPayableStore = useAccountPayableStore()
const modalStore = useModalStore()

const initialValues = {
    id: accountPayableStore.currentPayment.id,
    accountPayableId: accountPayableStore.currentPayment.accountPayableId,
    paymentDate: accountPayableStore.currentPayment.paymentDate,
    amount: accountPayableStore.currentPayment.amount,
    paymentMethod: accountPayableStore.currentPayment.paymentMethod,
    reference: accountPayableStore.currentPayment.reference,
    notes: accountPayableStore.currentPayment.notes
}

const modalMap = {
    CREATE: {
        component: PaymentForm,
        action: accountPayableStore.addPayment,
        schemaValidation: createPaymentSchema
    },
    UPDATE: {
        component: PaymentForm,
        action: accountPayableStore.updatePayment,
        schemaValidation: createPaymentSchema
    },
    DELETE: {
        component: DeletePaymentForm,
        action: accountPayableStore.removeItemPayment,
        schemaValidation: deletePaymentSchema
    }
}

const mode = computed(() => modalStore.modals[accountPayableStore.paymentModalId]?.type)
const currentSchema = computed(() => {
    const modalType = mode.value as keyof typeof modalMap
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => accountPayableStore.currentPayment,
    (newValue) => {
        if (newValue) {
            resetForm({ values: { ...newValue } })
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[accountPayableStore.paymentModalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[accountPayableStore.paymentModalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action
    try {
        const responseMessage = action(formValues)
        modalStore.close(accountPayableStore.paymentModalId)
        resetForm()
        showNotification(responseMessage, 'success')
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="accountPayableStore.paymentModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
