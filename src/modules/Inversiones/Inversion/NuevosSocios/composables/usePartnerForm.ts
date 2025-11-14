import { ref } from 'vue'
import type { NewPartnerFormData } from '../types/partnerTypes'

export const usePartnerForm = () => {
    const currentStep = ref(1)
    const totalSteps = ref(6) // 6 pasos implementados
    const formData = ref<NewPartnerFormData>({})

    const nextStep = () => {
        if (currentStep.value < totalSteps.value) {
            currentStep.value++
        }
    }

    const previousStep = () => {
        if (currentStep.value > 1) {
            currentStep.value--
        }
    }

    const resetForm = () => {
        currentStep.value = 1
        formData.value = {}
    }

    return {
        currentStep,
        totalSteps,
        formData,
        nextStep,
        previousStep,
        resetForm
    }
}
