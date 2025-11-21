<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal.vue'
import useBenefitCatalogStore from '@/modules/RRHH/GestionBeneficios/store/benefitCatalogStore'
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import BenefitCatalogForm from '@/modules/RRHH/GestionBeneficios/components/BenefitCatalogForm.vue'
import DeleteBenefitCatalog from '@/modules/RRHH/GestionBeneficios/components/DeleteBenefitCatalog.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { toTypedSchema } from '@vee-validate/zod'
import { useBenefitCatalogActions } from '@/modules/RRHH/GestionBeneficios/composables/useBenefitCatalogActions'
import { showNotification } from '@/utils/toastNotifications'
import { z } from 'zod'

const props = defineProps<{
    onRefresh?: () => void
}>()

const benefitStore = useBenefitCatalogStore()
const modalStore = useModalStore()
const { createBenefit, updateBenefit, deleteBenefit } = useBenefitCatalogActions()
const mode = computed(() => modalStore.modals[benefitStore.modalId]?.type)

const benefitSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    description: z.string().min(1, 'La descripción es requerida'),
    requiredScore: z.number().min(0, 'El score debe ser mayor o igual a 0').max(5, 'El score debe ser menor o igual a 5'),
    availableStock: z.number().min(0, 'El stock debe ser mayor o igual a 0')
})

const modalMap = {
    CREATE: {
        component: BenefitCatalogForm,
        action: createBenefit,
        schemaValidation: benefitSchema
    },
    UPDATE: {
        component: BenefitCatalogForm,
        action: updateBenefit,
        schemaValidation: benefitSchema
    },
    DELETE: {
        component: DeleteBenefitCatalog,
        action: deleteBenefit,
        schemaValidation: undefined
    }
}

const currentSchema = computed(() => {
    const modalType = mode.value as keyof typeof modalMap
    return modalMap[modalType]?.schemaValidation || modalMap.CREATE.schemaValidation
})

const initialValues = {
    name: benefitStore.selectedBenefit?.name || '',
    description: benefitStore.selectedBenefit?.description || '',
    requiredScore: benefitStore.selectedBenefit?.requiredScore || 0,
    availableStock: benefitStore.selectedBenefit?.availableStock || 0
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: computed(() => toTypedSchema(currentSchema.value)),
    initialValues: initialValues,
    validateOnMount: false
})

watch(
    () => benefitStore.selectedBenefit,
    (current) => {
        if (mode.value === 'UPDATE' && current) {
            setValues({ 
                name: current.name,
                description: current.description,
                requiredScore: current.requiredScore,
                availableStock: current.availableStock
            })
        } else if (mode.value === 'CREATE') {
            resetForm()
            setValues({ name: '', description: '', requiredScore: 0, availableStock: 0 })
        }
    }
)

const currentModalComponent = computed(() => {
    const modalType = modalStore.modals[benefitStore.modalId]?.type as keyof typeof modalMap
    return modalMap[modalType]?.component
})

const onSubmit = handleSubmit(async (formValues) => {
    const modalType = modalStore.modals[benefitStore.modalId]?.type as keyof typeof modalMap
    const action = modalMap[modalType]?.action

    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(benefitStore.modalId)
    } catch (error) {
        console.error(error)
    }
})

const onClose = () => {
    resetForm()
    benefitStore.setData()
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="benefitStore.modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentModalComponent" />
        </template>
    </BaseModal>
</template>
