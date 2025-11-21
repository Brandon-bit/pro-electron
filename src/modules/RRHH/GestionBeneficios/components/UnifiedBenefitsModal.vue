<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { showNotification } from '@/utils/toastNotifications'

// Catalog
import BenefitCatalogForm from '@/modules/RRHH/GestionBeneficios/components/BenefitCatalogForm.vue'
import DeleteBenefitCatalog from '@/modules/RRHH/GestionBeneficios/components/DeleteBenefitCatalog.vue'
import useBenefitCatalogStore from '@/modules/RRHH/GestionBeneficios/store/benefitCatalogStore'
import { useBenefitCatalogActions } from '@/modules/RRHH/GestionBeneficios/composables/useBenefitCatalogActions'

// Recognition
import RecognitionForm from '@/modules/RRHH/GestionBeneficios/components/RecognitionForm.vue'

// Config
import ConfigBenefitForm from '@/modules/RRHH/GestionBeneficios/components/ConfigBenefitForm.vue'

// Redeem
import RedeemBenefitForm from '@/modules/RRHH/GestionBeneficios/components/RedeemBenefitForm.vue'

// Matrix
import MatrixForm from '@/modules/RRHH/GestionBeneficios/components/MatrixForm.vue'

// Validations
import { z } from 'zod'

const props = defineProps<{
    modalId: string
    onRefresh?: () => void
}>()

const modalStore = useModalStore()
const benefitCatalogStore = useBenefitCatalogStore()
const { createBenefit, updateBenefit, deleteBenefit } = useBenefitCatalogActions()

// Schemas
const benefitCatalogSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    description: z.string().min(1, 'La descripción es requerida'),
    requiredScore: z.number().min(0).max(5),
    availableStock: z.number().min(0)
})

const recognitionSchema = z.object({
    employeeId: z.number(),
    points: z.number().min(1),
    message: z.string().min(1)
})

const configSchema = z.object({
    benefitId: z.number(),
    isActive: z.boolean().optional()
})

const redeemSchema = z.object({
    benefitId: z.number().optional(),
    employeeId: z.number().optional()
})

const matrixSchema = z.object({
    minScore: z.number().min(0).max(5),
    maxScore: z.number().min(0).max(5),
    benefits: z.string().min(1)
})

// Modal Map
const modalMap: Record<string, any> = {
    // Catalog
    'benefit-catalog-modal-CREATE': {
        component: BenefitCatalogForm,
        action: createBenefit,
        schema: benefitCatalogSchema
    },
    'benefit-catalog-modal-UPDATE': {
        component: BenefitCatalogForm,
        action: updateBenefit,
        schema: benefitCatalogSchema
    },
    'benefit-catalog-modal-DELETE': {
        component: DeleteBenefitCatalog,
        action: deleteBenefit,
        schema: undefined
    },
    // Recognition
    'recognition-modal-CREATE': {
        component: RecognitionForm,
        action: async () => ({ message: 'Reconocimiento creado', status: 'success' }),
        schema: recognitionSchema
    },
    // Config
    'config-modal-CREATE': {
        component: ConfigBenefitForm,
        action: async () => ({ message: 'Configuración guardada', status: 'success' }),
        schema: configSchema
    },
    'config-modal-EDIT': {
        component: ConfigBenefitForm,
        action: async () => ({ message: 'Configuración actualizada', status: 'success' }),
        schema: configSchema
    },
    // Redeem
    'redeem-modal-CREATE': {
        component: RedeemBenefitForm,
        action: async () => ({ message: 'Beneficio canjeado', status: 'success' }),
        schema: redeemSchema
    },
    // Matrix
    'benefits-matrix-modal-CREATE': {
        component: MatrixForm,
        action: async () => ({ message: 'Matriz creada exitosamente', status: 'success' }),
        schema: matrixSchema
    },
    'benefits-matrix-modal-EDIT': {
        component: MatrixForm,
        action: async () => ({ message: 'Matriz actualizada exitosamente', status: 'success' }),
        schema: matrixSchema
    }
}

const modalType = computed(() => modalStore.modals[props.modalId]?.type)
const modalKey = computed(() => `${props.modalId}-${modalType.value}`)
const currentConfig = computed(() => modalMap[modalKey.value] || modalMap[`${props.modalId}-CREATE`])

const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: computed(() => 
        currentConfig.value?.schema ? toTypedSchema(currentConfig.value.schema) : undefined
    ),
    validateOnMount: false
})

const onSubmit = handleSubmit(async (formValues) => {
    const action = currentConfig.value?.action
    
    if (!action) {
        modalStore.close(props.modalId)
        return
    }

    try {
        const { message, status } = await action(formValues)
        showNotification(message, status)
        if (status === 'success') props.onRefresh?.()
        modalStore.close(props.modalId)
    } catch (error) {
        console.error(error)
        showNotification('Error al procesar la solicitud', 'error')
    }
})

const onClose = () => {
    resetForm()
    if (props.modalId === benefitCatalogStore.modalId) {
        benefitCatalogStore.setData()
    }
}
</script>

<template>
    <BaseModal
        :onSubmit="onSubmit"
        :modalId="modalId"
        :isSubmitting="isSubmitting"
        :onClose="onClose"
    >
        <template v-slot:modalBody>
            <component :is="currentConfig?.component" />
        </template>
    </BaseModal>
</template>
