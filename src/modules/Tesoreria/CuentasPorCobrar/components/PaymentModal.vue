<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useAccountReceivableStore from '@/modules/Tesoreria/CuentasPorCobrar/store/accountReceivableStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import PaymentForm from '@/modules/Tesoreria/CuentasPorCobrar/components/PaymentForm.vue'
import DeletePaymentForm from '@/modules/Tesoreria/CuentasPorCobrar/components/DeletePaymentForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { createPaymentSchema, deletePaymentSchema } from '@/modules/Tesoreria/CuentasPorCobrar/validations/accountReceivableValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { showNotification } from '@/utils/toastNotifications'

const accountReceivableStore = useAccountReceivableStore()
const modalStore = useModalStore()

const initialValues = {
    id: accountReceivableStore.currentPayment.id,
    accountReceivableId: accountReceivableStore.currentPayment.accountReceivableId,
    paymentDate: accountReceivableStore.currentPayment.paymentDate,
    amount: accountReceivableStore.currentPayment.amount,
    paymentMethod: accountReceivableStore.currentPayment.paymentMethod,
    reference: accountReceivableStore.currentPayment.reference,
    notes: accountReceivableStore.currentPayment.notes
}

const modalMap = {
    CREATE: {
        component: PaymentForm,
        action: accountReceivableStore.addPayment,
        schemaValidation: createPaymentSchema
    },
    UPDATE: {
        component: PaymentForm,
        action: accountReceivableStore.updatePayment,
        schemaValidation: createPaymentSchema
    },
    DELETE: {
        component: DeletePaymentForm,
        action: accountReceivableStore.removeItemPayment,
        schemaValidation: deletePaymentSchema
    }
}

const mode = computed(() => modalStore.modals[accountReceivableStore.paymentModalId]?.type)
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
    () => accountReceivableStore.currentPayment,
    (newValue) => {
        if (newValue) {
            resetForm({ values: { ...newValue } })
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[accountReceivableStore.paymentModalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[accountReceivableStore.paymentModalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action
    try {
        const responseMessage = action(formValues)
        modalStore.close(accountReceivableStore.paymentModalId)
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
        :modalId="accountReceivableStore.paymentModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
