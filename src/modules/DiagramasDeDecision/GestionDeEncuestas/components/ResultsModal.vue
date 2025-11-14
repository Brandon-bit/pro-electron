<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import useSurveyStore from '@/modules/DiagramasDeDecision/GestionDeEncuestas/store/surveyStore'
import { showNotification } from '@/utils/toastNotifications'

const surveyStore = useSurveyStore()

const circleCircumference = 502 // 2 * PI * 80
const dashArray = computed(() => {
    if (!surveyStore.selectedSurvey?.readinessScore) return '0 502'
    const score = surveyStore.selectedSurvey.readinessScore
    return `${(score / 100) * circleCircumference} ${circleCircumference}`
})

const onSubmit = () => {
    surveyStore.clearSelectedSurvey()
}

const onClose = () => {
    surveyStore.clearSelectedSurvey()
}

const createTask = (action: string) => {
    showNotification(`Tarea creada: ${action}`, 'success')
}
</script>

<template>
    <BaseModal
        :modal-id="surveyStore.resultsModalId"
        :on-submit="onSubmit"
        :on-close="onClose"
        :is-submitting="false"
        :show-submit="false"
        size="large"
    >
        <template #modalBody>
            <div v-if="surveyStore.selectedSurvey" class="space-y-6">
                <!-- Readiness Score Global -->
                <div class="card bg-base-100 shadow-md">
                    <div class="card-body">
                        <h3 class="font-semibold text-lg mb-4">Readiness Score Global</h3>
                        
                        <!-- Circular Progress -->
                        <div class="flex items-center justify-center py-8">
                            <div class="relative w-48 h-48">
                                <svg class="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="80"
                                        stroke="currentColor"
                                        stroke-width="12"
                                        fill="none"
                                        class="text-base-300"
                                    />
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="80"
                                        stroke="currentColor"
                                        stroke-width="12"
                                        fill="none"
                                        :stroke-dasharray="dashArray"
                                        class="text-primary transition-all duration-1000"
                                    />
                                </svg>
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <span class="text-5xl font-bold text-primary">
                                        {{ surveyStore.selectedSurvey.readinessScore }}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Distribution -->
                        <div class="grid grid-cols-3 gap-4 mt-6">
                            <div class="text-center p-3 bg-error/10 rounded-lg">
                                <div class="text-2xl font-bold text-error">23%</div>
                                <div class="text-xs opacity-70 mt-1">Baja Preparación</div>
                            </div>
                            <div class="text-center p-3 bg-warning/10 rounded-lg">
                                <div class="text-2xl font-bold text-warning">45%</div>
                                <div class="text-xs opacity-70 mt-1">Media Preparación</div>
                            </div>
                            <div class="text-center p-3 bg-success/10 rounded-lg">
                                <div class="text-2xl font-bold text-success">32%</div>
                                <div class="text-xs opacity-70 mt-1">Alta Preparación</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recommended Actions -->
                <div class="card bg-base-100 shadow-md">
                    <div class="card-body">
                        <h3 class="font-semibold text-lg">Acciones Recomendadas</h3>
                        <p class="text-sm opacity-70 mb-4">Basadas en el análisis de resultados</p>

                        <div class="space-y-3">
                            <div class="flex items-center justify-between p-3 border border-base-300 rounded-lg">
                                <div>
                                    <div class="font-medium">Reforzar Formación - Área Finanzas</div>
                                    <div class="text-sm opacity-70">Score promedio: 45% (Bajo umbral)</div>
                                </div>
                                <button 
                                    @click="createTask('Reforzar Formación - Área Finanzas')"
                                    class="btn btn-sm btn-primary"
                                >
                                    Crear Tarea
                                </button>
                            </div>
                            <div class="flex items-center justify-between p-3 border border-base-300 rounded-lg">
                                <div>
                                    <div class="font-medium">Comunicado Adicional - Beneficios</div>
                                    <div class="text-sm opacity-70">37% no conoce los beneficios del cambio</div>
                                </div>
                                <button 
                                    @click="createTask('Comunicado Adicional - Beneficios')"
                                    class="btn btn-sm btn-primary"
                                >
                                    Crear Tarea
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </BaseModal>
</template>
