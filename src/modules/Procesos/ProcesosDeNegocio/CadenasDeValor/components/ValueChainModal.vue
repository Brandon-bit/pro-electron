<script setup lang="ts">
// #region Imports
import { computed, watch } from 'vue'
import { useValueChainActions } from '@procesos/ProcesosDeNegocio/CadenasDeValor/composables/useValueChainActions'
import { useModalStore } from '@/shared/stores/modal.store'
import useValueChainStore from '@/modules/Procesos/ProcesosDeNegocio/CadenasDeValor/store/valueChainStore'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useForm } from 'vee-validate'
import AddEditValueChainForm from '@procesos/ProcesosDeNegocio/CadenasDeValor/components/AddEditValueChainForm.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { createValueChainSchema } from '@procesos/ProcesosDeNegocio/CadenasDeValor/validations/valueChainValidation'
import { showNotification } from '@/utils/toastNotifications'
// #endregion

const props = defineProps<{
    onRefresh?: () => void
}>()

// #region Data
const { createValueChain, editValueChain } = useValueChainActions()
const modalStore = useModalStore()
const valueChainStore = useValueChainStore()

const initialValues = {
    title: valueChainStore.selectedValueChain?.title
}

const modalMap = {
    CREATE: {
        component: AddEditValueChainForm,
        action: createValueChain
    },
    EDIT: {
        component: AddEditValueChainForm,
        action: editValueChain
    }
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(createValueChainSchema),
    validateOnMount: false,
    initialValues: initialValues
})
// #endregion

// #region Computed
const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[valueChainStore.modalId]?.type
    return modalMap[modalType]?.component
})
// #endregion

// #region Watch
watch(
    () => valueChainStore.selectedValueChain,
    (valueChain) => {
        if (valueChain) {
            setValues({
                title: valueChain.title
            })
        }
    },
    { immediate: true }
)
// #endregion

// #region Methods
const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[valueChainStore.modalId].type
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status == 'success') props.onRefresh?.()
        modalStore.close(valueChainStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    valueChainStore.setData()
}
// #endregion
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="valueChainStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
