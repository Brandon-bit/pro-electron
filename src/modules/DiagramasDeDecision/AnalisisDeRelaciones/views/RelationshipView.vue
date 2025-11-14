<script setup lang="ts">
import BaseTitle from '@/shared/components/BaseTitle.vue'
import MetricSelector from '@/modules/DiagramasDeDecision/AnalisisDeRelaciones/components/MetricSelector.vue'
import CorrelationHeatmap from '@/modules/DiagramasDeDecision/AnalisisDeRelaciones/components/CorrelationHeatmap.vue'
import ScatterPlot from '@/modules/DiagramasDeDecision/AnalisisDeRelaciones/components/ScatterPlot.vue'
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <BaseTitle 
            title="Análisis de Relaciones" 
            subtitle="Descubre correlaciones ocultas entre métricas del proyecto"
        >
            <template #icon>
                <span class="material-symbols-outlined text-4xl">hub</span>
            </template>
        </BaseTitle>

        <!-- Metric Selection -->
        <MetricSelector />

        <!-- Correlation Heatmap -->
        <CorrelationHeatmap />

        <!-- Scatter Plot Drill-Down -->
        <ScatterPlot />
    </div>
</template>
