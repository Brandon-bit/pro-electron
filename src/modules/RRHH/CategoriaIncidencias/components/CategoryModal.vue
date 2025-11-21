<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useIncidenceCategoryStore from '@/modules/RRHH/CategoriaIncidencias/store/incidenceCategoryStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import DeleteCategory from '@/modules/RRHH/CategoriaIncidencias/components/DeleteCategory.vue'
import AddEditCategoryForm from '@/modules/RRHH/CategoriaIncidencias/components/AddEditCategoryForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import {
    incidenceCategorySchema,
    deleteIncidenceCategorySchema
} from '@/modules/RRHH/CategoriaIncidencias/validations/incidenceCategoryValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useIncidenceCategoryActions } from '@/modules/RRHH/CategoriaIncidencias/composables/useIncidenceCategoryActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const incidenceCategoryStore = useIncidenceCategoryStore()
const modalStore = useModalStore()
const { createIncidenceCategory, editIncidenceCategory, deleteIncidenceCategory } =
    useIncidenceCategoryActions()
const mode = computed(() => modalStore.modals[incidenceCategoryStore.modalId]?.type)

const modalMap = {
    CREATE: {
        component: AddEditCategoryForm,
        action: createIncidenceCategory,
        schemaValidation: incidenceCategorySchema
    },
    UPDATE: {
        component: AddEditCategoryForm,
        action: editIncidenceCategory,
        schemaValidation: incidenceCategorySchema
    },
    DELETE: {
        component: DeleteCategory,
        action: deleteIncidenceCategory,
        schemaValidation: deleteIncidenceCategorySchema
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as 'CREATE' | 'UPDATE' | 'DELETE'
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const initialValues = {
    name: incidenceCategoryStore.selectedIncidenceCategory?.name,
    status: incidenceCategoryStore.selectedIncidenceCategory?.status ?? true,
    description: incidenceCategoryStore.selectedIncidenceCategory?.description
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    validateOnMount: false,
    initialValues: initialValues
})

watch(
    () => incidenceCategoryStore.selectedIncidenceCategory,
    (category) => {
        if (category) {
            setValues({
                name: category?.name,
                status: category?.status ?? true,
                description: category?.description
            })
        }
    },
    { immediate: true }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[incidenceCategoryStore.modalId]?.type as
        | 'CREATE'
        | 'UPDATE'
        | 'DELETE'
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[incidenceCategoryStore.modalId]?.type as
        | 'CREATE'
        | 'UPDATE'
        | 'DELETE'
    const action = modalMap[modalType]?.action
    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status == 'success') props.onRefresh?.()
        modalStore.close(incidenceCategoryStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    incidenceCategoryStore.setData()
}
</script>
<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="incidenceCategoryStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
