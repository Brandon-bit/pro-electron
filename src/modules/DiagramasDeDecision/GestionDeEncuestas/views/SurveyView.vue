<script setup lang="ts">
import BaseTitle from '@/shared/components/BaseTitle.vue'
import SurveyCard from '@/modules/DiagramasDeDecision/GestionDeEncuestas/components/SurveyCard.vue'
import CreateSurveyModal from '@/modules/DiagramasDeDecision/GestionDeEncuestas/components/CreateSurveyModal.vue'
import ResultsModal from '@/modules/DiagramasDeDecision/GestionDeEncuestas/components/ResultsModal.vue'
import { useModalStore } from '@/shared/stores/modal.store'
import useSurveyStore from '@/modules/DiagramasDeDecision/GestionDeEncuestas/store/surveyStore'

const modalStore = useModalStore()
const surveyStore = useSurveyStore()

const openCreateModal = () => {
    modalStore.open(surveyStore.createModalId, {
        title: 'Crear Nueva Encuesta',
        type: 'CREATE'
    })
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Gestión de Encuestas" 
                subtitle="Herramienta integral para evaluación de preparación y adopción del cambio"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">poll</span>
                </template>
            </BaseTitle>
            <button @click="openCreateModal" class="btn btn-primary btn-lg gap-2">
                <span class="material-symbols-outlined">add</span>
                Nueva Encuesta
            </button>
        </div>

        <!-- Surveys List -->
        <div class="grid gap-4">
            <SurveyCard
                v-for="survey in surveyStore.surveys"
                :key="survey.id"
                :survey="survey"
            />
        </div>

        <!-- Modals -->
        <CreateSurveyModal />
        <ResultsModal />
    </div>
</template>
