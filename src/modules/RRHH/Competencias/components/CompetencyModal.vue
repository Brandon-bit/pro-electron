<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useCompetencyStore from '@/modules/RRHH/Competencias/store/competencyStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import CompetencyForm from '@/modules/RRHH/Competencias/components/CompetencyForm.vue'
import DeleteCompetency from '@/modules/RRHH/Competencias/components/DeleteCompetency.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { createUpdateCompetencySchema } from '@/modules/RRHH/Competencias/validations/competencyValidation'
import { toTypedSchema } from '@vee-validate/zod'
import { useCompetencyActions } from '@/modules/RRHH/Competencias/composables/useCompetencyActions'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    onRefresh?: () => void
}>()

const competencyStore = useCompetencyStore()
const modalStore = useModalStore()
const { createCompetency, updateCompetency, deleteCompetency } = useCompetencyActions()
const mode = computed(() => modalStore.modals[competencyStore.modalId]?.type)

const modalMap = {
    CREATE: {
        component: CompetencyForm,
        action: createCompetency,
        schemaValidation: createUpdateCompetencySchema
    },
    UPDATE: {
        component: CompetencyForm,
        action: updateCompetency,
        schemaValidation: createUpdateCompetencySchema
    },
    DELETE: {
        component: DeleteCompetency,
        action: deleteCompetency,
        schemaValidation: undefined
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as keyof typeof modalMap
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const initialValues = {
    name: competencyStore.selectedCompetency?.name || '',
    description: competencyStore.selectedCompetency?.description || '',
    category: competencyStore.selectedCompetency?.category || 'technical',
    active: competencyStore.selectedCompetency?.active ?? true
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => competencyStore.selectedCompetency,
    (current) => {
        if (mode.value === 'UPDATE' && current) {
            setValues({ ...current })
        } else if (mode.value === 'CREATE') {
            resetForm()
            setValues({ name: '', description: '', category: 'technical', active: true })
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[competencyStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[competencyStore.modalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action

    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(competencyStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    competencyStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="competencyStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
