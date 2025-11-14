<script setup lang="ts">
import { onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import AlertsCard from '@/modules/DiagramasDeDecision/SPC/components/AlertsCard.vue'
import ControlChart from '@/modules/DiagramasDeDecision/SPC/components/ControlChart.vue'
import StatisticsSummary from '@/modules/DiagramasDeDecision/SPC/components/StatisticsSummary.vue'
import AddDataPointForm from '@/modules/DiagramasDeDecision/SPC/components/AddDataPointForm.vue'
import useSPCStore from '@/modules/DiagramasDeDecision/SPC/store/spcStore'
import { useSPCActions } from '@/modules/DiagramasDeDecision/SPC/composables/useSPCActions'

const spcStore = useSPCStore()
const { loadData, saveData } = useSPCActions()

onMounted(() => {
    loadData()
    if (spcStore.dataPoints.length > 0) {
        spcStore.calculateControlLimits()
    }
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Control Estadístico de Procesos (SPC)" 
                subtitle="Monitoreo de estabilidad y detección de variaciones"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">monitoring</span>
                </template>
            </BaseTitle>
            <button @click="saveData" class="btn btn-outline gap-2">
                <span class="material-symbols-outlined">save</span>
                Guardar
            </button>
        </div>

        <!-- Alerts -->
        <AlertsCard />

        <!-- Control Chart -->
        <ControlChart />

        <!-- Statistics Summary -->
        <StatisticsSummary />

        <!-- Add Data Point -->
        <AddDataPointForm />
    </div>
</template>
