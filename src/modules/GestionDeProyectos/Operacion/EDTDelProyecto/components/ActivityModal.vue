<script setup lang="ts">
import { watch, computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useEDTStore from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/store/edtStore'
import { useEDTActions } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/composables/useEDTActions'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { activitySchema } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/validations/edtValidation'
import AddEditActivity from './AddEditActivityForm.vue'
import DeleteActivity from './DeleteActivity.vue'

const modalStore = useModalStore()
const edtStore = useEDTStore()
const { createActivity, updateActivity, deleteActivity } = useEDTActions()

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(activitySchema),
    validateOnMount: false,
    initialValues: {
        name: '',
        psn: 1,
        days: 1,
        active: true
    }
})

watch(
    () => edtStore.selectedActivity,
    (activity) => {
        if (activity) {
            setValues({
                name: activity.name,
                psn: activity.psn,
                days: activity.days,
                active: activity.active
            })
        } else {
            resetForm({ values: { name: '', psn: 1, days: 1, active: true } })
        }
    },
    { immediate: true }
)

// Watch modal status to reset form when opening in CREATE mode
watch(
    () => modalStore.modals[edtStore.activityModalId]?.status,
    (isOpen) => {
        if (isOpen && !edtStore.selectedActivity) {
            // Modal opened in CREATE mode - reset form
            resetForm({ values: { name: '', psn: 1, days: 1, active: true } })
        }
    }
)

const modalMap = {
    CREATE: {
        component: AddEditActivity,
        action: createActivity
    },
    EDIT: {
        component: AddEditActivity,
        action: updateActivity
    },
    DELETE: {
        component: DeleteActivity,
        action: deleteActivity
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[edtStore.activityModalId]?.type
    return modalMap[modalType as keyof typeof modalMap]?.component
})

const onSubmit = async () => {
    const modalType = modalStore.modals[edtStore.activityModalId]?.type

    if (modalType === 'CREATE') {
        await handleSubmit(async (formValues) => {
            if (!edtStore.parentContext) return
            const success = await createActivity(edtStore.parentContext.dni, formValues)
            if (success) {
                edtStore.clearActivity()
                modalStore.close(edtStore.activityModalId)
            }
        })()
        return
    }

    if (modalType === 'EDIT') {
        await handleSubmit(async (formValues) => {
            if (!edtStore.selectedActivity) return
            const success = await updateActivity(
                `actividad-${edtStore.selectedActivity.dni}`,
                edtStore.selectedActivity.dniStage,
                formValues
            )
            if (success) {
                edtStore.clearActivity()
                modalStore.close(edtStore.activityModalId)
            }
        })()
        return
    }

    if (modalType === 'DELETE') {
        if (!edtStore.selectedActivity) return
        const success = await deleteActivity(`actividad-${edtStore.selectedActivity.dni}`)
        if (success) {
            edtStore.clearActivity()
            modalStore.close(edtStore.activityModalId)
        }
    }
}

const onClose = () => {
    resetForm()
    edtStore.clearActivity()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="edtStore.activityModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template #modalBody>
            <component :is="currentModalComponent" v-if="currentModalComponent" />
        </template>
    </BaseModal>
</template>
