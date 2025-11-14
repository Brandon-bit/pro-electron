<script setup lang="ts">
import useRelationshipStore from '@/modules/DiagramasDeDecision/AnalisisDeRelaciones/store/relationshipStore'
import { useRelationshipActions } from '@/modules/DiagramasDeDecision/AnalisisDeRelaciones/composables/useRelationshipActions'

const relationshipStore = useRelationshipStore()
const { handleAnalyze } = useRelationshipActions()
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Selecciona las Métricas a Analizar</h2>
            <p class="text-sm opacity-70">Elige al menos 2 métricas para calcular correlaciones</p>

            <div class="grid md:grid-cols-3 gap-4 mt-4">
                <div
                    v-for="metric in relationshipStore.availableMetrics"
                    :key="metric.id"
                    class="form-control"
                >
                    <label class="label cursor-pointer justify-start gap-3">
                        <input
                            type="checkbox"
                            class="checkbox checkbox-primary"
                            :checked="relationshipStore.selectedMetrics.includes(metric.id)"
                            @change="relationshipStore.toggleMetric(metric.id)"
                        />
                        <span class="label-text">{{ metric.name }}</span>
                    </label>
                </div>
            </div>

            <div class="mt-6">
                <button @click="handleAnalyze" class="btn btn-primary btn-lg gap-2">
                    <span class="material-symbols-outlined">analytics</span>
                    Analizar Correlaciones
                </button>
            </div>
        </div>
    </div>
</template>
