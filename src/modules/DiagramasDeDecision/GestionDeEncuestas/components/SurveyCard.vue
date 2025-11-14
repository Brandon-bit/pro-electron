<script setup lang="ts">
import { useModalStore } from '@/shared/stores/modal.store'
import useSurveyStore from '@/modules/DiagramasDeDecision/GestionDeEncuestas/store/surveyStore'
import { useSurveyActions } from '@/modules/DiagramasDeDecision/GestionDeEncuestas/composables/useSurveyActions'
import type { SurveyType } from '@/modules/DiagramasDeDecision/GestionDeEncuestas/types/surveyTypes'

const props = defineProps<{
    survey: SurveyType
}>()

const modalStore = useModalStore()
const surveyStore = useSurveyStore()
const { getStatusBadgeClass, getStatusLabel } = useSurveyActions()

const progressPercentage = (props.survey.responses / props.survey.target) * 100

const openResults = () => {
    surveyStore.selectSurvey(props.survey)
    modalStore.open(surveyStore.resultsModalId, {
        title: `Resultados: ${props.survey.name}`,
        type: 'VIEW'
    })
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
        <div class="card-body">
            <!-- Header -->
            <div class="flex justify-between items-start mb-4">
                <div class="space-y-2">
                    <h3 class="card-title">{{ survey.name }}</h3>
                    <div class="flex gap-2">
                        <span :class="['badge', getStatusBadgeClass(survey.status)]">
                            {{ getStatusLabel(survey.status) }}
                        </span>
                        <span class="badge badge-outline">{{ survey.type }}</span>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button @click="openResults" class="btn btn-outline btn-sm gap-2">
                        <span class="material-symbols-outlined text-sm">bar_chart</span>
                        Resultados
                    </button>
                    <button class="btn btn-outline btn-sm gap-2">
                        <span class="material-symbols-outlined text-sm">settings</span>
                        Configurar
                    </button>
                    <button class="btn btn-outline btn-sm gap-2">
                        <span class="material-symbols-outlined text-sm">send</span>
                        Distribuir
                    </button>
                </div>
            </div>

            <!-- Progress -->
            <div class="space-y-2">
                <div class="flex justify-between text-sm">
                    <span class="opacity-70">Respuestas</span>
                    <span class="font-medium">{{ survey.responses }} / {{ survey.target }}</span>
                </div>
                <progress 
                    class="progress progress-primary w-full" 
                    :value="progressPercentage" 
                    max="100"
                ></progress>
            </div>

            <!-- Readiness Score -->
            <div v-if="survey.readinessScore" class="flex items-center justify-between p-3 bg-base-200 rounded-lg mt-4">
                <span class="text-sm font-medium">Readiness Score</span>
                <div class="flex items-center gap-2">
                    <progress 
                        class="progress progress-primary w-24" 
                        :value="survey.readinessScore" 
                        max="100"
                    ></progress>
                    <span class="text-2xl font-bold text-primary">{{ survey.readinessScore }}%</span>
                </div>
            </div>
        </div>
    </div>
</template>
