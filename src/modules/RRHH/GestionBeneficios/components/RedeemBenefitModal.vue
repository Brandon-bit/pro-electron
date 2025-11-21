<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { watch } from 'vue'
import { z } from 'zod'
import BaseModal from '@/shared/components/BaseModal.vue'
import RedeemBenefitForm from '@/modules/RRHH/GestionBeneficios/components/RedeemBenefitForm.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import { useBenefitsActions } from '@/modules/RRHH/GestionBeneficios/composables/useBenefitsActions'
import { showNotification } from '@/utils/toastNotifications'
import { selectValidator } from '@/shared/validations/globalValidation'

const props = defineProps<{
    modalId: string
    onRefresh?: () => void
}>()

const modalStore = useModalStore()
const { redeemBenefit } = useBenefitsActions()

// Schema de validación
const redeemSchema = z.object({
    employeeId: selectValidator('Selecciona un empleado'),
    employeeName: z.string().optional()
})

const initialValues = {
    employeeId: undefined,
    employeeName: ''
}

const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(redeemSchema),
    validateOnMount: false,
    initialValues: initialValues
})

// Watch for modal data changes
watch(
    () => modalStore.modals[props.modalId]?.data,
    (data) => {
        if (data) {
            setValues({
                employeeId: data.employeeId,
                employeeName: data.employeeName || ''
            })
        } else {
            resetForm({ values: initialValues })
        }
    },
    { immediate: true }
)

const onSubmit = handleSubmit(async (formValues) => {
    try {
        const benefitId = modalStore.modals[props.modalId]?.data?.benefitId
        
        if (!benefitId) {
            showNotification('Error: No se encontró el beneficio', 'error')
            return
        }

        const result = await redeemBenefit(benefitId, formValues.employeeId!)
        
        showNotification(result.message, result.status)
        
        if (result.status === 'success') {
            props.onRefresh?.()
            modalStore.close(props.modalId)
        }
    } catch (error) {
        console.error('Error redeeming benefit:', error)
        showNotification('Error al canjear el beneficio', 'error')
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
            <RedeemBenefitForm />
        </template>
    </BaseModal>
</template>
