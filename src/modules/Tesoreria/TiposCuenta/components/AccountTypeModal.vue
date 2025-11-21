<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useAccountTypeStore from '@/modules/Tesoreria/TiposCuenta/store/accountTypeStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import AccountTypeForm from '@/modules/Tesoreria/TiposCuenta/components/AccountTypeForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { createUpdateAccountTypeSchema } from '@/modules/Tesoreria/TiposCuenta/validations/accountTypeValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useAccountTypeActions } from '@/modules/Tesoreria/TiposCuenta/composables/useAccountTypeActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const accountTypeStore = useAccountTypeStore()
const modalStore = useModalStore()
const { createAccountType, updateAccountType } = useAccountTypeActions()
const mode = computed(() => modalStore.modals[accountTypeStore.modalId]?.type)

const modalMap = {
    CREATE: {
        component: AccountTypeForm,
        action: createAccountType,
        schemaValidation: createUpdateAccountTypeSchema
    },
    UPDATE: {
        component: AccountTypeForm,
        action: updateAccountType,
        schemaValidation: createUpdateAccountTypeSchema
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as keyof typeof modalMap
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const initialValues = {
    name: accountTypeStore.selectedAccountType?.name || '',
    description: accountTypeStore.selectedAccountType?.description || '',
    active: accountTypeStore.selectedAccountType?.active ?? true
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => accountTypeStore.selectedAccountType,
    (current) => {
        if (mode.value === 'UPDATE' && current) {
            setValues({ ...current })
        } else if (mode.value === 'CREATE') {
            resetForm()
            setValues({ name: '', description: '', active: true })
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[accountTypeStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[accountTypeStore.modalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action

    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(accountTypeStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    accountTypeStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="accountTypeStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
