<script setup lang="ts">
import { computed, watch } from 'vue'
import { useProcessDiagramActions } from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/composables/useProcessDiagramActions'
import { useModalStore } from '@/shared/stores/modal.store'
import useProcessDiagramStore from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/store/processDiagramStore'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useForm } from 'vee-validate'
import AddEditProcessDiagramForm from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/components/AddEditProcessDiagramForm.vue'
import DeleteProcessDiagram from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/components/DeleteProcessDiagram.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { createProcessDiagramSchema } from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/validations/processDiagramValidation'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const { createProcessDiagram, editProcessDiagram, deleteProcessDiagram } = useProcessDiagramActions()
const modalStore = useModalStore()
const processDiagramStore = useProcessDiagramStore()

const initialValues = {
    code: processDiagramStore.selectedProcessDiagram?.code || '',
    name: processDiagramStore.selectedProcessDiagram?.name || '',
    description: processDiagramStore.selectedProcessDiagram?.description || '',
    version: processDiagramStore.selectedProcessDiagram?.version || '1.0',
    active: processDiagramStore.selectedProcessDiagram?.active ?? true
}

const modalMap = {
    CREATE: {
        component: AddEditProcessDiagramForm,
        action: createProcessDiagram
    },
    EDIT: {
        component: AddEditProcessDiagramForm,
        action: editProcessDiagram
    },
    DELETE: {
        component: DeleteProcessDiagram,
        action: deleteProcessDiagram
    }
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(createProcessDiagramSchema),
    validateOnMount: false,
    initialValues: initialValues
})

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[processDiagramStore.modalId]?.type as 'CREATE' | 'EDIT' | 'DELETE'
    return modalMap[modalType]?.component
})

watch(
    () => processDiagramStore.selectedProcessDiagram,
    (diagram) => {
        if (diagram && diagram.id) {
            setValues({
                code: diagram.code,
                name: diagram.name,
                description: diagram.description || '',
                version: diagram.version,
                active: diagram.active
            })
        }
    },
    { immediate: true }
)

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[processDiagramStore.modalId].type as 'CREATE' | 'EDIT' | 'DELETE'
    try {
        let response
        if (modalType === 'DELETE') {
            response = await deleteProcessDiagram(processDiagramStore.selectedProcessDiagram.id ?? 0)
        } else {
            const action = modalMap[modalType]?.action as (data: any) => Promise<{ message: string; status: string; data: any }>
            response = await action(formValues)
        }
        
        showNotification(response.message, response.status)
        if (response.status === 'success') props.onRefresh?.()
        modalStore.close(processDiagramStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    processDiagramStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="processDiagramStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
