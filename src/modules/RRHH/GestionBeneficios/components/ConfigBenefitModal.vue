<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { watch } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import ConfigBenefitForm from '@/modules/RRHH/GestionBeneficios/components/ConfigBenefitForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { useBenefitsActions } from '@/modules/RRHH/GestionBeneficios/composables/useBenefitsActions'
import { benefitConfigSchema } from '@/modules/RRHH/GestionBeneficios/validations/benefitsValidation'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    modalId: string
    onRefresh?: () => void
}>()

const modalStore = useModalStore()
const { configureBenefit } = useBenefitsActions()

const initialValues = {
    name: '',
    description: '',
    availableQuantity: 0,
    minScore: 0
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(benefitConfigSchema),
    validateOnMount: false,
    initialValues: initialValues
})

// Watch for modal data changes
watch(
    () => modalStore.modals[props.modalId]?.data,
    (data) => {
        if (data) {
            setValues({
                name: data.name,
                description: data.description,
                availableQuantity: data.availableQuantity,
                minScore: data.minScore
            })
        } else {
            resetForm({ values: initialValues })
        }
    },
    { immediate: true }
)

const onSubmit = handleSubmit(async (formValues) => {
    try {
        const result = await configureBenefit({
            name: formValues.name,
            description: formValues.description,
            availableQuantity: formValues.availableQuantity,
            minScore: formValues.minScore
        })
        
        showNotification(result.message, result.status)
        
        if (result.status === 'success') {
            props.onRefresh?.()
            modalStore.close(props.modalId)
        }
    } catch (error) {
        console.error('Error configuring benefit:', error)
        showNotification('Error al configurar el beneficio', 'error')
    }
})

const onClose = () => {
    resetForm({ values: initialValues })
}
</script>

<template>
    <BaseModal
        :modal-id="modalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="isSubmitting"
    >
        <template v-slot:modalBody>
            <ConfigBenefitForm />
        </template>
    </BaseModal>
</template>
