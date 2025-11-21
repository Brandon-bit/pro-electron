<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useBankAccountStore from '@/modules/Tesoreria/CuentasBancarias/store/bankAccountStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import BankAccountForm from '@/modules/Tesoreria/CuentasBancarias/components/BankAccountForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { createUpdateBankAccountSchema } from '@/modules/Tesoreria/CuentasBancarias/validations/bankAccountValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useBankAccountActions } from '@/modules/Tesoreria/CuentasBancarias/composables/useBankAccountActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const bankAccountStore = useBankAccountStore()
const modalStore = useModalStore()
const { createBankAccount, updateBankAccount } = useBankAccountActions()
const mode = computed(() => modalStore.modals[bankAccountStore.modalId]?.type)

const modalMap = {
    CREATE: {
        component: BankAccountForm,
        action: createBankAccount,
        schemaValidation: createUpdateBankAccountSchema
    },
    UPDATE: {
        component: BankAccountForm,
        action: updateBankAccount,
        schemaValidation: createUpdateBankAccountSchema
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as keyof typeof modalMap
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const initialValues = {
    name: bankAccountStore.selectedBankAccount?.name,
    bankId: bankAccountStore.selectedBankAccount?.bankId,
    accountTypeId: bankAccountStore.selectedBankAccount?.accountTypeId,
    accountNumber: bankAccountStore.selectedBankAccount?.accountNumber,
    initialBalance: bankAccountStore.selectedBankAccount?.initialBalance,
    currentBalance: bankAccountStore.selectedBankAccount?.currentBalance,
    currency: bankAccountStore.selectedBankAccount?.currency,
    active: bankAccountStore.selectedBankAccount?.active,
    notes: bankAccountStore.selectedBankAccount?.notes
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => bankAccountStore.selectedBankAccount,
    (current) => {
        if (mode.value === 'UPDATE' && current) {
            setValues({ ...current })
        } else if (mode.value === 'CREATE') {
            resetForm()
            setValues({
                name: '',
                bankId: 0,
                accountTypeId: 0,
                accountNumber: '',
                initialBalance: 0,
                currentBalance: 0,
                currency: 'MXN',
                active: true,
                notes: ''
            })
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[bankAccountStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[bankAccountStore.modalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action

    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(bankAccountStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    bankAccountStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="bankAccountStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
