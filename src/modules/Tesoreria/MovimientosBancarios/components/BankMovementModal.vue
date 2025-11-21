<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useBankMovementStore from '@/modules/Tesoreria/MovimientosBancarios/store/bankMovementStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import BankMovementForm from '@/modules/Tesoreria/MovimientosBancarios/components/BankMovementForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { createUpdateBankMovementSchema } from '@/modules/Tesoreria/MovimientosBancarios/validations/bankMovementValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useBankMovementActions } from '@/modules/Tesoreria/MovimientosBancarios/composables/useBankMovementActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const bankMovementStore = useBankMovementStore()
const modalStore = useModalStore()
const { createBankMovement, updateBankMovement } = useBankMovementActions()
const mode = computed(() => modalStore.modals[bankMovementStore.modalId]?.type)

const modalMap = {
    CREATE: {
        component: BankMovementForm,
        action: createBankMovement,
        schemaValidation: createUpdateBankMovementSchema
    },
    UPDATE: {
        component: BankMovementForm,
        action: updateBankMovement,
        schemaValidation: createUpdateBankMovementSchema
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as keyof typeof modalMap
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const initialValues = {
    date: bankMovementStore.selectedBankMovement?.date,
    bankAccountId: bankMovementStore.selectedBankMovement?.bankAccountId,
    movementTypeId: bankMovementStore.selectedBankMovement?.movementTypeId,
    amount: bankMovementStore.selectedBankMovement?.amount,
    concept: bankMovementStore.selectedBankMovement?.concept,
    reference: bankMovementStore.selectedBankMovement?.reference,
    active: bankMovementStore.selectedBankMovement?.active
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => bankMovementStore.selectedBankMovement,
    (current) => {
        if (mode.value === 'UPDATE' && current) {
            setValues({ ...current })
        } else if (mode.value === 'CREATE') {
            resetForm()
            setValues({
                date: new Date().toISOString().split('T')[0],
                bankAccountId: 0,
                movementTypeId: 0,
                amount: 0,
                concept: '',
                reference: '',
                active: true
            })
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[bankMovementStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[bankMovementStore.modalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action

    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(bankMovementStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    bankMovementStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="bankMovementStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
