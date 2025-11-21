<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useClientStore from '@/modules/Tesoreria/Clientes/store/clientStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import ClientForm from '@/modules/Tesoreria/Clientes/components/ClientForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { createUpdateClientSchema } from '@/modules/Tesoreria/Clientes/validations/clientValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useClientActions } from '@/modules/Tesoreria/Clientes/composables/useClientActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const clientStore = useClientStore()
const modalStore = useModalStore()
const { createClient, updateClient } = useClientActions()
const mode = computed(() => modalStore.modals[clientStore.modalId]?.type)

const modalMap = {
    CREATE: {
        component: ClientForm,
        action: createClient,
        schemaValidation: createUpdateClientSchema
    },
    UPDATE: {
        component: ClientForm,
        action: updateClient,
        schemaValidation: createUpdateClientSchema
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as keyof typeof modalMap
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const initialValues = {
    name: clientStore.selectedClient?.name,
    rfc: clientStore.selectedClient?.rfc,
    email: clientStore.selectedClient?.email,
    phone: clientStore.selectedClient?.phone,
    street: clientStore.selectedClient?.street,
    city: clientStore.selectedClient?.city,
    state: clientStore.selectedClient?.state,
    postalCode: clientStore.selectedClient?.postalCode,
    creditLimit: clientStore.selectedClient?.creditLimit,
    creditDays: clientStore.selectedClient?.creditDays,
    active: clientStore.selectedClient?.active,
    notes: clientStore.selectedClient?.notes
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => clientStore.selectedClient,
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
    const modalType = modalStore.modals[clientStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[clientStore.modalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action

    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(clientStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    clientStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="clientStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
