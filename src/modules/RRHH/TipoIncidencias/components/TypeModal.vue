<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useIncidenceTypeStore from '@/modules/RRHH/TipoIncidencias/store/incidenceTypeStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteType from '@/modules/RRHH/TipoIncidencias/components/DeleteType.vue'
import AddEditTypeForm from '@/modules/RRHH/TipoIncidencias/components/AddEditTypeForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import {
    incidenceTypeSchema,
    deleteIncidenceTypeSchema
} from '@/modules/RRHH/TipoIncidencias/validations/incidenceTypeValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useIncidenceTypeActions } from '@/modules/RRHH/TipoIncidencias/composables/useIncidenceTypeActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const incidenceTypeStore = useIncidenceTypeStore()
const modalStore = useModalStore()
const { createIncidenceType, editIncidenceType, deleteIncidenceType } = useIncidenceTypeActions()
const mode = computed(() => modalStore.modals[incidenceTypeStore.modalId]?.type)

const modalMap = {
    CREATE: {
        component: AddEditTypeForm,
        action: createIncidenceType,
        schemaValidation: incidenceTypeSchema
    },
    UPDATE: {
        component: AddEditTypeForm,
        action: editIncidenceType,
        schemaValidation: incidenceTypeSchema
    },
    DELETE: {
        component: DeleteType,
        action: deleteIncidenceType,
        schemaValidation: deleteIncidenceTypeSchema
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as 'CREATE' | 'UPDATE' | 'DELETE'
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const initialValues = {
    name: incidenceTypeStore.selectedIncidenceType?.name,
    parentCategoryId: incidenceTypeStore.selectedIncidenceType?.parentCategoryId,
    requiresDateRange: incidenceTypeStore.selectedIncidenceType?.requiresDateRange ?? false,
    requiresHours: incidenceTypeStore.selectedIncidenceType?.requiresHours ?? false,
    requiresJustification: incidenceTypeStore.selectedIncidenceType?.requiresJustification ?? false,
    status: incidenceTypeStore.selectedIncidenceType?.status ?? true,
    description: incidenceTypeStore.selectedIncidenceType?.description
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => incidenceTypeStore.selectedIncidenceType,
    (type) => {
        if (type) {
            setValues({
                name: type?.name,
                parentCategoryId: type?.parentCategoryId,
                requiresDateRange: type?.requiresDateRange ?? false,
                requiresHours: type?.requiresHours ?? false,
                requiresJustification: type?.requiresJustification ?? false,
                status: type?.status ?? true,
                description: type?.description
            })
        }
    },
    { immediate: true }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[incidenceTypeStore.modalId]?.type as
        | 'CREATE'
        | 'UPDATE'
        | 'DELETE'
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[incidenceTypeStore.modalId]?.type as
        | 'CREATE'
        | 'UPDATE'
        | 'DELETE'
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status == 'success') props.onRefresh?.()
        modalStore.close(incidenceTypeStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    incidenceTypeStore.setData()
}
</script>
<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="incidenceTypeStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
