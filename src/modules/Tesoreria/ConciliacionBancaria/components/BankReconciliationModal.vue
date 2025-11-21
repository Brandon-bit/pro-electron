<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useBankReconciliationStore from '@/modules/Tesoreria/ConciliacionBancaria/store/bankReconciliationStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import BankReconciliationForm from '@/modules/Tesoreria/ConciliacionBancaria/components/BankReconciliationForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { createUpdateBankReconciliationSchema } from '@/modules/Tesoreria/ConciliacionBancaria/validations/bankReconciliationValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useBankReconciliationActions } from '@/modules/Tesoreria/ConciliacionBancaria/composables/useBankReconciliationActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const bankReconciliationStore = useBankReconciliationStore()
const modalStore = useModalStore()
const { createBankReconciliation, updateBankReconciliation } = useBankReconciliationActions()
const mode = computed(() => modalStore.modals[bankReconciliationStore.modalId]?.type)

const modalMap = {
    CREATE: {
        component: BankReconciliationForm,
        action: createBankReconciliation,
        schemaValidation: createUpdateBankReconciliationSchema
    },
    UPDATE: {
        component: BankReconciliationForm,
        action: updateBankReconciliation,
        schemaValidation: createUpdateBankReconciliationSchema
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as keyof typeof modalMap
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const initialValues = {
    bankAccountId: bankReconciliationStore.selectedBankReconciliation?.bankAccountId,
    startDate: bankReconciliationStore.selectedBankReconciliation?.startDate,
    endDate: bankReconciliationStore.selectedBankReconciliation?.endDate,
    initialBankBalance: bankReconciliationStore.selectedBankReconciliation?.initialBankBalance,
    finalBankBalance: bankReconciliationStore.selectedBankReconciliation?.finalBankBalance,
    notes: bankReconciliationStore.selectedBankReconciliation?.notes,
    active: bankReconciliationStore.selectedBankReconciliation?.active
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => bankReconciliationStore.selectedBankReconciliation,
    (current) => {
        if (mode.value === 'UPDATE' && current) {
            setValues({ ...current })
        } else if (mode.value === 'CREATE') {
            resetForm()
            setValues({
                bankAccountId: 0,
                startDate: new Date().toISOString().split('T')[0],
                endDate: new Date().toISOString().split('T')[0],
                initialBankBalance: 0,
                finalBankBalance: 0,
                notes: '',
                active: true
            })
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[bankReconciliationStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[bankReconciliationStore.modalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action

    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(bankReconciliationStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    bankReconciliationStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="bankReconciliationStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
