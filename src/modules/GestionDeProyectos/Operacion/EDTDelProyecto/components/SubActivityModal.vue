<script setup lang="ts">
import { watch, computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useEDTStore from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/store/edtStore'
import { useEDTActions } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/composables/useEDTActions'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { subActivitySchema } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/validations/edtValidation'
import AddEditSubActivityForm from './AddEditSubActivityForm.vue'
import DeleteSubActivity from './DeleteSubActivity.vue'

const modalStore = useModalStore()
const edtStore = useEDTStore()
const { createSubActivity, updateSubActivity, deleteSubActivity } = useEDTActions()

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(subActivitySchema),
    validateOnMount: false,
    initialValues: {
        name: '',
        active: true
    }
})

watch(
    () => edtStore.selectedSubActivity,
    (subActivity) => {
        if (subActivity) {
            setValues({
                name: subActivity.name,
                active: subActivity.active
            })
        } else {
            resetForm({ values: { name: '', active: true } })
        }
    },
    { immediate: true }
)

const modalMap = {
    CREATE: {
        component: AddEditSubActivityForm,
        action: createSubActivity
    },
    EDIT: {
        component: AddEditSubActivityForm,
        action: updateSubActivity
    },
    DELETE: {
        component: DeleteSubActivity,
        action: deleteSubActivity
    }
}

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[edtStore.subactivityModalId]?.type
    return modalMap[modalType as keyof typeof modalMap]?.component
})

const onSubmit = async () => {
    const modalType = modalStore.modals[edtStore.subactivityModalId]?.type

    if (modalType === 'CREATE') {
        await handleSubmit(async (formValues) => {
            if (!edtStore.parentContext) return
            const success = await createSubActivity(edtStore.parentContext.dni, formValues)
            if (success) {
                edtStore.clearSubActivity()
                modalStore.close(edtStore.subactivityModalId)
            }
        })()
        return
    }

    if (modalType === 'EDIT') {
        await handleSubmit(async (formValues) => {
            if (!edtStore.selectedSubActivity) return
            const success = await updateSubActivity(
                `subactividad-${edtStore.selectedSubActivity.dni}`,
                edtStore.selectedSubActivity.dniActivity,
                formValues
            )
            if (success) {
                edtStore.clearSubActivity()
                modalStore.close(edtStore.subactivityModalId)
            }
        })()
        return
    }

    if (modalType === 'DELETE') {
        if (!edtStore.selectedSubActivity) return
        const success = await deleteSubActivity(`subactividad-${edtStore.selectedSubActivity.dni}`)
        if (success) {
            edtStore.clearSubActivity()
            modalStore.close(edtStore.subactivityModalId)
        }
    }
}

const onClose = () => {
    resetForm()
    edtStore.clearSubActivity()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="edtStore.subactivityModalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template #modalBody>
            <component :is="currentModalComponent" v-if="currentModalComponent" />
        </template>
    </BaseModal>
</template>
