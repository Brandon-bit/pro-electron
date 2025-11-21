<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useAccountReceivableStore from '@/modules/Tesoreria/CuentasPorCobrar/store/accountReceivableStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import AccountReceivableForm from '@/modules/Tesoreria/CuentasPorCobrar/components/AccountReceivableForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { createUpdateAccountReceivableSchema } from '@/modules/Tesoreria/CuentasPorCobrar/validations/accountReceivableValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useAccountReceivableActions } from '@/modules/Tesoreria/CuentasPorCobrar/composables/useAccountReceivableActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const accountReceivableStore = useAccountReceivableStore()
const modalStore = useModalStore()
const { createAccountReceivable, updateAccountReceivable } = useAccountReceivableActions()
const mode = computed(() => modalStore.modals[accountReceivableStore.modalId]?.type)

const modalMap = {
    CREATE: {
        component: AccountReceivableForm,
        action: createAccountReceivable,
        schemaValidation: createUpdateAccountReceivableSchema
    },
    UPDATE: {
        component: AccountReceivableForm,
        action: updateAccountReceivable,
        schemaValidation: createUpdateAccountReceivableSchema
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as keyof typeof modalMap
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const initialValues = {
    clientId: accountReceivableStore.selectedAccountReceivable?.clientId,
    documentNumber: accountReceivableStore.selectedAccountReceivable?.documentNumber,
    documentType: accountReceivableStore.selectedAccountReceivable?.documentType,
    issueDate: accountReceivableStore.selectedAccountReceivable?.issueDate,
    dueDate: accountReceivableStore.selectedAccountReceivable?.dueDate,
    amount: accountReceivableStore.selectedAccountReceivable?.amount,
    pendingBalance: accountReceivableStore.selectedAccountReceivable?.pendingBalance,
    status: accountReceivableStore.selectedAccountReceivable?.status,
    notes: accountReceivableStore.selectedAccountReceivable?.notes
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => accountReceivableStore.selectedAccountReceivable,
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
    const modalType = modalStore.modals[accountReceivableStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[accountReceivableStore.modalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action

    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(accountReceivableStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    accountReceivableStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="accountReceivableStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
