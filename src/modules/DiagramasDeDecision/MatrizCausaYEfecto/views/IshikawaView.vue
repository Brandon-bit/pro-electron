<script setup lang="ts">
import { onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import FishboneDiagram from '@/modules/DiagramasDeDecision/MatrizCausaYEfecto/components/FishboneDiagram.vue'
import AddCauseForm from '@/modules/DiagramasDeDecision/MatrizCausaYEfecto/components/AddCauseForm.vue'
import CauseDetailModal from '@/modules/DiagramasDeDecision/MatrizCausaYEfecto/components/CauseDetailModal.vue'
import useIshikawaStore from '@/modules/DiagramasDeDecision/MatrizCausaYEfecto/store/ishikawaStore'
import { useIshikawaActions } from '@/modules/DiagramasDeDecision/MatrizCausaYEfecto/composables/useIshikawaActions'

const ishikawaStore = useIshikawaStore()
const { loadData, saveData } = useIshikawaActions()

onMounted(() => {
    loadData()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Diagrama de Ishikawa (Causa y Efecto)" 
                subtitle="Análisis de espina de pescado - Método de las 6M"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">account_tree</span>
                </template>
            </BaseTitle>
            <button @click="saveData" class="btn btn-outline gap-2">
                <span class="material-symbols-outlined">save</span>
                Guardar
            </button>
        </div>

        <!-- Problem Statement -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="text-center">
                    <h2 class="text-2xl font-bold text-primary">
                        Problema: {{ ishikawaStore.problemStatement }}
                    </h2>
                </div>
            </div>
        </div>

        <!-- Fishbone Diagram -->
        <FishboneDiagram />

        <!-- Add Cause Form -->
        <AddCauseForm />

        <!-- Cause Detail Modal -->
        <CauseDetailModal />
    </div>
</template>
