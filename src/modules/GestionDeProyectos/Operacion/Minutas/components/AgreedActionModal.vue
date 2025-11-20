<script setup lang="ts">
import { watch, computed, ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useMinuteStore from '@/modules/GestionDeProyectos/Operacion/Minutas/store/minuteStore'
import { useAgreedActionActions } from '@/modules/GestionDeProyectos/Operacion/Minutas/composables/useAgreedActionActions'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { agreedActionSchema } from '@/modules/GestionDeProyectos/Operacion/Minutas/validations/minuteValidations'
import AddEditAgreedActionForm from './AddEditAgreedActionForm.vue'
import DeleteAgreedAction from './DeleteAgreedAction.vue'
import type { AgreedActionRequestType, AgreedActionType } from '@/modules/GestionDeProyectos/Operacion/Minutas/types/minuteTypes'

const modalStore = useModalStore()
const minuteStore = useMinuteStore()
const { createAgreedAction, updateAgreedAction, deleteAgreedAction } = useAgreedActionActions()

const selectedAction = ref<AgreedActionType | null>(null)

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(agreedActionSchema),
    validateOnMount: false,
    initialValues: {
        descripcion: '',
        dniResponsable: '',
        fechaLimite: ''
    }
})

// Watch for modal data to get selected action
watch(
    () => modalStore.modals[minuteStore.agreedActionModalId],
    (modal) => {
        if (modal?.data?.action) {
            selectedAction.value = modal.data.action
            // Populate form for edit
            setValues({
                descripcion: modal.data.action.description,
                dniResponsable: modal.data.action.responsible.dni,
                fechaLimite: modal.data.action.dueDate
            })
        } else if (!modal?.isOpen) {
            selectedAction.value = null
        }
    },
    { deep: true, immediate: true }
)

const modalMap = {
    CREATE: {
        component: AddEditAgreedActionForm,
        action: createAgreedAction
    },
    UPDATE: {
        component: AddEditAgreedActionForm,
        action: updateAgreedAction
    },
    DELETE: {
        component: DeleteAgreedAction,
        action: deleteAgreedAction
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[minuteStore.agreedActionModalId]?.type
    return modalMap[modalType]?.component
})

const onSubmit = async () => {
    if (!minuteStore.selectedMinute) return

    const modalType = modalStore.modals[minuteStore.agreedActionModalId]?.type

    // For CREATE and UPDATE, use handleSubmit with validation
    if (modalType === 'CREATE' || modalType === 'UPDATE') {
        await handleSubmit(async (formValues) => {
            const data: AgreedActionRequestType = {
                dniMinuta: minuteStore.selectedMinute!.dni,
                dniResponsable: formValues.dniResponsable,
                descripcion: formValues.descripcion,
                fechaLimite: formValues.fechaLimite
            }

            // Add dni for UPDATE
            if (modalType === 'UPDATE' && selectedAction.value) {
                data.dni = selectedAction.value.dni
            }

            const success = await modalMap[modalType].action(data)
            if (success) {
                selectedAction.value = null
                modalStore.close(minuteStore.agreedActionModalId)
            }
        })()
        return
    }

    // For DELETE, no validation needed
    if (modalType === 'DELETE' && selectedAction.value) {
        const success = await deleteAgreedAction(
            minuteStore.selectedMinute.dni,
            selectedAction.value.dni
        )
        if (success) {
            selectedAction.value = null
            modalStore.close(minuteStore.agreedActionModalId)
        }
    }
}

const onClose = () => {
    resetForm()
    selectedAction.value = null
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="minuteStore.agreedActionModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component 
                :is="currentModalComponent" 
                :selectedAction="selectedAction"
            />
        </template>
    </BaseModal>
</template>
