<script setup lang="ts">
import useFiveWhysStore from '@/modules/DiagramasDeDecision/5PorQue/store/fiveWhysStore'

const fiveWhysStore = useFiveWhysStore()
</script>

<template>
    <div 
        v-if="fiveWhysStore.rootCauseSteps.length > 0"
        class="card bg-base-100 shadow-xl border-2 border-accent"
    >
        <div class="card-body">
            <h2 class="card-title text-accent gap-2">
                <span class="material-symbols-outlined">verified</span>
                Causa Raíz Identificada
            </h2>
            
            <div class="space-y-3 mt-4">
                <div
                    v-for="step in fiveWhysStore.rootCauseSteps"
                    :key="step.id"
                    class="p-4 bg-accent/10 rounded-lg"
                >
                    <p class="text-lg font-medium">{{ step.answer }}</p>
                    <p class="text-sm opacity-70 mt-2">
                        Identificada en el paso {{ step.id }} del análisis
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
