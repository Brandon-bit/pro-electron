<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useBankStore from '@/modules/Tesoreria/Bancos/store/bankStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import BankForm from '@/modules/Tesoreria/Bancos/components/BankForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { createUpdateBankSchema } from '@/modules/Tesoreria/Bancos/validations/bankValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useBankActions } from '@/modules/Tesoreria/Bancos/composables/useBankActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const bankStore = useBankStore()
const modalStore = useModalStore()
const { createBank, updateBank } = useBankActions()
const mode = computed(() => modalStore.modals[bankStore.modalId]?.type)

const modalMap = {
    CREATE: {
        component: BankForm,
        action: createBank,
        schemaValidation: createUpdateBankSchema
    },
    UPDATE: {
        component: BankForm,
        action: updateBank,
        schemaValidation: createUpdateBankSchema
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as keyof typeof modalMap
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const initialValues = {
    name: bankStore.selectedBank?.name || '',
    code: bankStore.selectedBank?.code || '',
    active: bankStore.selectedBank?.active ?? true
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => bankStore.selectedBank,
    (current) => {
        if (mode.value === 'UPDATE' && current) {
            setValues({ ...current })
        } else if (mode.value === 'CREATE') {
            resetForm()
            setValues({ name: '', code: '', active: true })
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[bankStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[bankStore.modalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action

    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(bankStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    bankStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="bankStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
