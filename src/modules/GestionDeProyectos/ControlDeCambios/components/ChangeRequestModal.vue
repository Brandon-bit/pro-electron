<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useChangeStore from '@/modules/GestionDeProyectos/ControlDeCambios/store/changeStore'
import type { NewChangeRequestType } from '@/modules/GestionDeProyectos/ControlDeCambios/types/changeTypes'

const modalStore = useModalStore()
const changeStore = useChangeStore()

const MODAL_ID = 'change-request-modal'

const formData = ref<NewChangeRequestType>({
    title: '',
    description: '',
    justification: '',
    requester: '',
    impact: {
        scope: '',
        schedule: '',
        cost: '',
        quality: '',
        risks: ''
    }
})

const isSubmitting = ref(false)

watch(() => changeStore.isModalOpen, (isOpen) => {
    if (isOpen) {
        const stepTitle = `Solicitud de Cambio - Paso ${changeStore.currentStep} de 3`
        modalStore.open(MODAL_ID, {
            title: stepTitle
        })
    } else {
        modalStore.close(MODAL_ID)
    }
})

watch(() => changeStore.currentStep, (step) => {
    if (changeStore.isModalOpen) {
        const stepTitle = `Solicitud de Cambio - Paso ${step} de 3`
        modalStore.updateModal(MODAL_ID, { title: stepTitle })
    }
})

const handleSubmit = () => {
    if (changeStore.currentStep === 1) {
        changeStore.setCurrentStep(2)
    } else if (changeStore.currentStep === 2) {
        changeStore.setCurrentStep(3)
    } else if (changeStore.currentStep === 3) {
        isSubmitting.value = true
        changeStore.addChangeRequest(formData.value)
        
        // Reset form
        formData.value = {
            title: '',
            description: '',
            justification: '',
            requester: '',
            impact: {
                scope: '',
                schedule: '',
                cost: '',
                quality: '',
                risks: ''
            }
        }
        
        isSubmitting.value = false
        changeStore.closeModal()
    }
}

const handleClose = () => {
    changeStore.closeModal()
}

const goBack = () => {
    if (changeStore.currentStep > 1) {
        changeStore.setCurrentStep(changeStore.currentStep - 1)
    }
}

const getSubmitButtonText = () => {
    if (changeStore.currentStep === 1) return 'Siguiente: Análisis de Impacto'
    if (changeStore.currentStep === 2) return 'Siguiente: Revisar'
    return 'Enviar a Aprobación'
}
</script>

<template>
    <BaseModal
        :modal-id="MODAL_ID"
        :on-submit="handleSubmit"
        :on-close="handleClose"
        :is-submitting="isSubmitting"
        :submit-text="getSubmitButtonText()"
    >
        <template #modalBody>
            <!-- Step 1: Información Básica -->
            <div v-if="changeStore.currentStep === 1" class="space-y-4">
                <h3 class="font-semibold text-lg">Información Básica</h3>
                
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Título del Cambio</span>
                    </label>
                    <input
                        v-model="formData.title"
                        type="text"
                        class="input input-bordered"
                        placeholder="Resumen breve del cambio propuesto"
                    />
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Descripción Detallada</span>
                    </label>
                    <textarea
                        v-model="formData.description"
                        class="textarea textarea-bordered"
                        placeholder="Describe el cambio en detalle..."
                        rows="4"
                    ></textarea>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Justificación</span>
                    </label>
                    <textarea
                        v-model="formData.justification"
                        class="textarea textarea-bordered"
                        placeholder="¿Por qué es necesario este cambio?"
                        rows="3"
                    ></textarea>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Solicitante</span>
                    </label>
                    <input
                        v-model="formData.requester"
                        type="text"
                        class="input input-bordered"
                        placeholder="Nombre del solicitante"
                    />
                </div>
            </div>

            <!-- Step 2: Análisis de Impacto -->
            <div v-if="changeStore.currentStep === 2" class="space-y-4">
                <h3 class="font-semibold text-lg">Análisis de Impacto</h3>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Impacto en Alcance</span>
                    </label>
                    <textarea
                        v-model="formData.impact.scope"
                        class="textarea textarea-bordered"
                        placeholder="¿Cómo afecta el alcance del proyecto?"
                        rows="2"
                    ></textarea>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Impacto en Cronograma</span>
                    </label>
                    <textarea
                        v-model="formData.impact.schedule"
                        class="textarea textarea-bordered"
                        placeholder="Ej: +2 semanas, -5 días, Sin impacto"
                        rows="2"
                    ></textarea>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Impacto en Costo</span>
                    </label>
                    <textarea
                        v-model="formData.impact.cost"
                        class="textarea textarea-bordered"
                        placeholder="Ej: +$10,000, -$2,000, Sin impacto"
                        rows="2"
                    ></textarea>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Impacto en Calidad</span>
                    </label>
                    <textarea
                        v-model="formData.impact.quality"
                        class="textarea textarea-bordered"
                        placeholder="¿Cómo afecta la calidad de los entregables?"
                        rows="2"
                    ></textarea>
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Riesgos Asociados</span>
                    </label>
                    <textarea
                        v-model="formData.impact.risks"
                        class="textarea textarea-bordered"
                        placeholder="¿Qué riesgos introduce o mitiga este cambio?"
                        rows="2"
                    ></textarea>
                </div>

                <button @click="goBack" class="btn btn-outline w-full">
                    Anterior
                </button>
            </div>

            <!-- Step 3: Revisar y Enviar -->
            <div v-if="changeStore.currentStep === 3" class="space-y-4">
                <h3 class="font-semibold text-lg">Revisar y Enviar</h3>
                
                <div class="card bg-base-200">
                    <div class="card-body">
                        <h4 class="card-title">{{ formData.title }}</h4>
                        
                        <div class="space-y-3">
                            <div>
                                <p class="text-sm font-semibold">Descripción:</p>
                                <p class="text-sm opacity-70">{{ formData.description }}</p>
                            </div>
                            
                            <div>
                                <p class="text-sm font-semibold">Justificación:</p>
                                <p class="text-sm opacity-70">{{ formData.justification }}</p>
                            </div>
                            
                            <div>
                                <p class="text-sm font-semibold">Solicitante:</p>
                                <p class="text-sm opacity-70">{{ formData.requester }}</p>
                            </div>
                            
                            <div class="divider"></div>
                            
                            <div>
                                <p class="font-semibold mb-2">Análisis de Impacto:</p>
                                <div class="space-y-2 text-sm">
                                    <div>
                                        <span class="font-semibold">Alcance:</span> {{ formData.impact.scope }}
                                    </div>
                                    <div>
                                        <span class="font-semibold">Cronograma:</span> {{ formData.impact.schedule }}
                                    </div>
                                    <div>
                                        <span class="font-semibold">Costo:</span> {{ formData.impact.cost }}
                                    </div>
                                    <div>
                                        <span class="font-semibold">Calidad:</span> {{ formData.impact.quality }}
                                    </div>
                                    <div>
                                        <span class="font-semibold">Riesgos:</span> {{ formData.impact.risks }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button @click="goBack" class="btn btn-outline w-full">
                    Anterior
                </button>
            </div>
        </template>
    </BaseModal>
</template>
