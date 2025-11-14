<script setup lang="ts">
import { onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import ParetoChart from '@/modules/DiagramasDeDecision/AnalisisDePareto/components/ParetoChart.vue'
import DataTable from '@/modules/DiagramasDeDecision/AnalisisDePareto/components/DataTable.vue'
import { useParetoActions } from '@/modules/DiagramasDeDecision/AnalisisDePareto/composables/useParetoActions'

const { loadData, saveData } = useParetoActions()

onMounted(() => {
    loadData()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Análisis de Pareto" 
                subtitle="Regla 80/20 - Identifica las causas vitales"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">bar_chart</span>
                </template>
            </BaseTitle>
            <button @click="saveData" class="btn btn-outline gap-2">
                <span class="material-symbols-outlined">save</span>
                Guardar
            </button>
        </div>

        <!-- Chart Visualization -->
        <ParetoChart />

        <!-- Data Table -->
        <DataTable />
    </div>
</template>
