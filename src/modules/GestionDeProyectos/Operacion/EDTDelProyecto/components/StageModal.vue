<script setup lang="ts">
import { watch, computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useEDTStore from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/store/edtStore'
import { useEDTActions } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/composables/useEDTActions'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { stageSchema } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/validations/edtValidation'
import AddEditStageForm from './AddEditStageForm.vue'
import DeleteStage from './DeleteStage.vue'

const modalStore = useModalStore()
const edtStore = useEDTStore()
const { createStage, updateStage, deleteStage } = useEDTActions()

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(stageSchema),
    validateOnMount: false,
    initialValues: {
        name: '',
        psn: 1,
        active: true
    }
})

watch(
    () => edtStore.selectedStage,
    (stage) => {
        if (stage) {
            setValues({
                name: stage.name,
                psn: stage.psn,
                active: stage.active
            })
        } else {
            resetForm({ values: { name: '', psn: 1, active: true } })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: AddEditStageForm,
        action: createStage
    },
    EDIT: {
        component: AddEditStageForm,
        action: updateStage
    },
    DELETE: {
        component: DeleteStage,
        action: deleteStage
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[edtStore.stageModalId]?.type
    return modalMap[modalType as keyof typeof modalMap]?.component
})

const onSubmit = async () => {
    const modalType = modalStore.modals[edtStore.stageModalId]?.type

    // For CREATE and EDIT, use handleSubmit with validation
    if (modalType === 'CREATE') {
        await handleSubmit(async (formValues) => {
            const success = await createStage(formValues)
            if (success) {
                edtStore.clearStage()
                modalStore.close(edtStore.stageModalId)
            }
        })()
        return
    }

    if (modalType === 'EDIT') {
        await handleSubmit(async (formValues) => {
            if (!edtStore.selectedStage) return
            const success = await updateStage(`etapa-${edtStore.selectedStage.dni}`, formValues)
            if (success) {
                edtStore.clearStage()
                modalStore.close(edtStore.stageModalId)
            }
        })()
        return
    }

    // For DELETE, no form validation needed
    if (modalType === 'DELETE') {
        if (!edtStore.selectedStage) return
        const success = await deleteStage(`etapa-${edtStore.selectedStage.dni}`)
        if (success) {
            edtStore.clearStage()
            modalStore.close(edtStore.stageModalId)
        }
    }
}

const onClose = () => {
    resetForm()
    edtStore.clearStage()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="edtStore.stageModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template #modalBody>
            <component :is="currentModalComponent" v-if="currentModalComponent" />
        </template>
    </BaseModal>
</template>
