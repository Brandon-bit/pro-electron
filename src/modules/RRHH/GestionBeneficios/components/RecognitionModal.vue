<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { watch } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import RecognitionForm from '@/modules/RRHH/GestionBeneficios/components/RecognitionForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { useBenefitsActions } from '@/modules/RRHH/GestionBeneficios/composables/useBenefitsActions'
import { recognitionSchema } from '@/modules/RRHH/GestionBeneficios/validations/benefitsValidation'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    modalId: string
    onRefresh?: () => void
}>()

const modalStore = useModalStore()
const { createRecognition } = useBenefitsActions()

const initialValues = {
    toEmployeeName: '',
    toEmployeeId: undefined,
    category: 'teamwork' as const,
    message: '',
    points: 50
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(recognitionSchema),
    validateOnMount: false,
    initialValues: initialValues
})

// Watch for modal data changes
watch(
    () => modalStore.modals[props.modalId]?.data,
    (data) => {
        if (data) {
            setValues({
                toEmployeeId: data.toEmployeeId,
                category: data.category,
                message: data.message,
                points: data.points
            })
        } else {
            resetForm({ values: initialValues })
        }
    },
    { immediate: true }
)

const onSubmit = handleSubmit(async (formValues) => {
    try {
        const result = await createRecognition({
            toEmployeeId: formValues.toEmployeeId!,
            category: formValues.category,
            message: formValues.message,
            points: formValues.points
        })
        
        showNotification(result.message, result.status)
        
        if (result.status === 'success') {
            props.onRefresh?.()
            modalStore.close(props.modalId)
        }
    } catch (error) {
        console.error('Error creating recognition:', error)
        showNotification('Error al dar reconocimiento', 'error')
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
            <RecognitionForm />
        </template>
    </BaseModal>
</template>
