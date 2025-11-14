<script setup lang="ts">
import { onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import AnalysisWizard from '@/modules/DiagramasDeDecision/5PorQue/components/AnalysisWizard.vue'
import AnalysisTree from '@/modules/DiagramasDeDecision/5PorQue/components/AnalysisTree.vue'
import RootCauseSummary from '@/modules/DiagramasDeDecision/5PorQue/components/RootCauseSummary.vue'
import useFiveWhysStore from '@/modules/DiagramasDeDecision/5PorQue/store/fiveWhysStore'
import { useFiveWhysActions } from '@/modules/DiagramasDeDecision/5PorQue/composables/useFiveWhysActions'

const fiveWhysStore = useFiveWhysStore()
const { loadData, saveData } = useFiveWhysActions()

onMounted(() => {
    loadData()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Análisis de 5 Porqués" 
                subtitle="Descubre la causa raíz a través de preguntas iterativas"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">psychology</span>
                </template>
            </BaseTitle>
            <button @click="saveData" class="btn btn-outline gap-2">
                <span class="material-symbols-outlined">save</span>
                Guardar
            </button>
        </div>

        <!-- Problem Statement -->
        <div class="card bg-base-100 shadow-xl border-2 border-primary">
            <div class="card-body">
                <h2 class="card-title">Problema Identificado</h2>
                <p class="text-xl font-medium">{{ fiveWhysStore.problemStatement }}</p>
            </div>
        </div>

        <!-- Interactive Wizard -->
        <AnalysisWizard />

        <!-- Analysis Tree -->
        <AnalysisTree />

        <!-- Root Cause Summary -->
        <RootCauseSummary />
    </div>
</template>
