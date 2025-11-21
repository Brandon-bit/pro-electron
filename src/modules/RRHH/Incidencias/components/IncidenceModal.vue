<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useIncidencesStore from '@/modules/RRHH/Incidencias/store/incidencesStore'
import DeleteConfirmation from '@/modules/RRHH/Incidencias/components/DeleteConfirmation.vue'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import IncidenceForm from '@/modules/RRHH/Incidencias/components/IncidenceForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import {
    createIncidenceSchema,
    updateIncidenceSchema,
    deleteIncidenceSchema
} from '@/modules/RRHH/Incidencias/validations/incidencesValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useIncidenceActions } from '@/modules/RRHH/Incidencias/composables/useIncidencesActions'
import { showNotification } from '@/utils/toastNotifications'

type ModalMode = 'CREATE' | 'UPDATE' | 'DELETE'

const props = defineProps<{
    onRefresh?: () => void
}>()

const incidencesStore = useIncidencesStore()
const modalStore = useModalStore()
const { createIncidence, updateIncidence, deleteIncidence } = useIncidenceActions()
const mode = computed(() => modalStore.modals[incidencesStore.modalId]?.type)

const modalMap = {
    CREATE: {
        component: IncidenceForm,
        action: createIncidence,
        schemaValidation: createIncidenceSchema
    },
    UPDATE: {
        component: IncidenceForm,
        action: updateIncidence,
        schemaValidation: updateIncidenceSchema
    },
    DELETE: {
        component: DeleteConfirmation,
        action: deleteIncidence,
        schemaValidation: deleteIncidenceSchema
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as ModalMode
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const getInitialValues = () => {
    const selected = incidencesStore.selectedIncidence

    if (mode.value === 'UPDATE' && selected) {
        return {
            employeeId: selected.employeeId,
            employeeName: selected.employeeName,
            category: selected.category,
            type: selected.type,
            startDate: selected.startDate,
            endDate: selected.endDate || '',
            hours: selected.hours || undefined,
            justified: selected.justified || false,
            comments: selected.comments || '',
            evidence: null,
            status: selected.status
        }
    }

    return {
        employeeId: 0,
        employeeName: '',
        category: '',
        type: '',
        startDate: '',
        endDate: '',
        hours: undefined,
        justified: false,
        comments: '',
        evidence: null
    }
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: getInitialValues(),
    validateOnMount: false
})

watch(
    () => [incidencesStore.selectedIncidence, mode.value] as const,
    ([current, currentMode]) => {
        if (
            currentMode === 'UPDATE' &&
            current &&
            typeof current === 'object' &&
            'employeeId' in current
        ) {
            setValues({
                employeeId: current.employeeId,
                employeeName: current.employeeName,
                category: current.category,
                type: current.type,
                startDate: current.startDate,
                endDate: current.endDate || '',
                hours: current.hours || undefined,
                justified: current.justified || false,
                comments: current.comments || '',
                evidence: null,
                status: current.status
            })
        } else if (currentMode === 'CREATE') {
            resetForm({ values: getInitialValues() })
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[incidencesStore.modalId]?.type as ModalMode
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[incidencesStore.modalId]?.type as ModalMode
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues as any)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(incidencesStore.modalId)
    } catch (error) {
        console.error(error)
        showNotification('Ocurrió un error al procesar la solicitud', 'error')
    }
})

const onClose = () => {
    resetForm()
    incidencesStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="incidencesStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
