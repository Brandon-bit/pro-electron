<template>
    <BaseTitle 
        title="Alta de Socio" 
        subtitle="Alta de nuevo socio"
    />
    <div class="container mx-auto p-6">
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <!-- Stepper con navegación -->
                <div class="mb-6">
                    <div class="flex items-center justify-between mb-8 w-full">
                        <div class="flex items-center justify-between flex-1">
                            <template v-for="step in totalSteps" :key="step">
                                <div class="flex items-center flex-1">
                                    <div
                                        class="flex items-center justify-center w-10 h-10 rounded-full font-bold flex-shrink-0"
                                        :class="getStepClasses(step)"
                                    >
                                        {{ step }}
                                    </div>
                                    <div
                                        v-if="step < totalSteps"
                                        class="flex-1 h-1 mx-2"
                                        :class="step < currentStep ? 'bg-primary' : 'bg-base-300'"
                                    ></div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>

                <!-- Contenido del paso actual -->
                <div class="min-h-[400px]">
                    <Step1
                        v-if="currentStep === 1"
                        ref="step1Ref"
                        v-model="formData.step1"
                        @validation-change="(isValid) => stepValidation[0] = isValid"
                    />
                    <Step2
                        v-if="currentStep === 2"
                        ref="step2Ref"
                        v-model="formData.step2"
                        @validation-change="(isValid) => stepValidation[1] = isValid"
                    />
                    <Step3
                        v-if="currentStep === 3"
                        ref="step3Ref"
                        v-model="formData.step3"
                        @validation-change="(isValid) => stepValidation[2] = isValid"
                    />
                    <Step4
                        v-if="currentStep === 4"
                        ref="step4Ref"
                        v-model="formData.step4"
                        @validation-change="(isValid) => stepValidation[3] = isValid"
                    />
                    <Step5
                        v-if="currentStep === 5"
                        ref="step5Ref"
                        v-model="formData.step5"
                        @validation-change="(isValid) => stepValidation[4] = isValid"
                    />
                    <Step6
                        v-if="currentStep === 6"
                        ref="step6Ref"
                        :formData="formData"
                    />
                </div>

                <!-- Botones de navegación -->
                <div class="flex justify-between mt-8">
                    <BaseButton
                        text="Anterior"
                        variant="ghost"
                        :disabled="currentStep === 1"
                        @click="handlePrevious"
                    />
                    <BaseButton
                        v-if="currentStep < totalSteps"
                        text="Siguiente"
                        icon="arrow_forward"
                        @click="handleNext"
                    />
                    <BaseButton
                        v-else
                        text="Finalizar"
                        icon="check"
                        @click="handleSubmit"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/shared/components/BaseButton.vue'
import Step1 from '../components/steps/Step1.vue'
import Step2 from '../components/steps/Step2.vue'
import Step3 from '../components/steps/Step3.vue'
import Step4 from '../components/steps/Step4.vue'
import Step5 from '../components/steps/Step5.vue'
import Step6 from '../components/steps/Step6.vue'
import { usePartnerForm } from '../composables/usePartnerForm'
import BaseTitle from '@/shared/components/BaseTitle.vue'


const router = useRouter()

// Estado del formulario
const {
    currentStep,
    totalSteps,
    formData,
    nextStep,
    previousStep,
    resetForm
} = usePartnerForm()

// Referencias a los componentes de pasos
const step1Ref = ref<InstanceType<typeof Step1> | null>(null)
const step2Ref = ref<InstanceType<typeof Step2> | null>(null)
const step3Ref = ref<InstanceType<typeof Step3> | null>(null)
const step4Ref = ref<InstanceType<typeof Step4> | null>(null)
const step5Ref = ref<InstanceType<typeof Step5> | null>(null)
const step6Ref = ref<InstanceType<typeof Step6> | null>(null)

// Estado de validación por paso
const stepValidation = ref<boolean[]>([false, false, false, false, false, true])

// Obtener clases para el indicador de paso
const getStepClasses = (step: number) => {
    if (step === currentStep.value) {
        return 'bg-primary text-primary-content'
    } else if (step < currentStep.value) {
        return 'bg-success text-success-content'
    } else {
        return 'bg-base-300 text-base-content/50'
    }
}

// Manejar siguiente paso
const handleNext = async () => {
    // Validar el paso actual antes de avanzar
    if (currentStep.value === 1 && step1Ref.value) {
        const result = await step1Ref.value.validate()
        if (!result.valid) {
            return
        }
    }
    
    if (currentStep.value === 2 && step2Ref.value) {
        const result = await step2Ref.value.validate()
        if (!result.valid) {
            return
        }
    }
    
    if (currentStep.value === 3 && step3Ref.value) {
        const result = await step3Ref.value.validate()
        if (!result.valid) {
            return
        }
    }
    
    if (currentStep.value === 4 && step4Ref.value) {
        const result = await step4Ref.value.validate()
        if (!result.valid) {
            return
        }
    }
    
    if (currentStep.value === 5 && step5Ref.value) {
        const result = await step5Ref.value.validate()
        if (!result.valid) {
            return
        }
    }
    
    if (currentStep.value === 6 && step6Ref.value) {
        const result = await step6Ref.value.validate()
        if (!result.valid) {
            return
        }
    }
    
    nextStep()
}

// Manejar paso anterior
const handlePrevious = () => {
    previousStep()
}

// Manejar envío del formulario
const handleSubmit = async () => {
    try {
        console.log('Datos del formulario:', formData.value)
        alert('Socio registrado exitosamente')
        router.push('/inversiones/socios')
    } catch (error) {
        console.error('Error al registrar socio:', error)
        alert('Error al registrar el socio. Por favor, intente nuevamente.')
    }
}
</script>
