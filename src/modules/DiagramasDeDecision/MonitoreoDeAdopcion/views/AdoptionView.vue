<script setup lang="ts">
import BaseTitle from '@/shared/components/BaseTitle.vue'
import MetricCard from '@/modules/DiagramasDeDecision/MonitoreoDeAdopcion/components/MetricCard.vue'
import useAdoptionStore from '@/modules/DiagramasDeDecision/MonitoreoDeAdopcion/store/adoptionStore'

const adoptionStore = useAdoptionStore()
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle 
            title="Monitor de Adopción y Resistencia" 
            subtitle="Dashboard unificado de métricas de uso, sentimiento y casos de resistencia"
        >
            <template #icon>
                <span class="material-symbols-outlined text-4xl">monitoring</span>
            </template>
        </BaseTitle>

        <!-- Metrics Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
                v-for="metric in adoptionStore.metrics"
                :key="metric.id"
                :metric="metric"
            />
        </div>
    </div>
</template>
