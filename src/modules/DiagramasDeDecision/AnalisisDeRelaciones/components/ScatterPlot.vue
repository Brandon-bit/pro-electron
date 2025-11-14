<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import useRelationshipStore from '@/modules/DiagramasDeDecision/AnalisisDeRelaciones/store/relationshipStore'

const relationshipStore = useRelationshipStore()

const chartOptions = computed(() => ({
    chart: {
        type: 'scatter',
        height: 400,
        toolbar: {
            show: true
        },
        zoom: {
            enabled: true
        }
    },
    xaxis: {
        title: {
            text: relationshipStore.selectedCell?.x || ''
        },
        tickAmount: 10
    },
    yaxis: {
        title: {
            text: relationshipStore.selectedCell?.y || ''
        },
        tickAmount: 7
    },
    colors: ['#570DF8'],
    markers: {
        size: 8
    },
    grid: {
        borderColor: '#e7e7e7',
        strokeDashArray: 3
    },
    tooltip: {
        x: {
            formatter: (value: number) => `${relationshipStore.selectedCell?.x}: ${value}`
        },
        y: {
            formatter: (value: number) => `${relationshipStore.selectedCell?.y}: ${value}`
        }
    }
}))

const series = computed(() => [{
    name: 'Datos del Proyecto',
    data: relationshipStore.scatterData.map(point => [point.x, point.y])
}])
</script>

<template>
    <div 
        v-if="relationshipStore.selectedCell"
        class="card bg-base-100 shadow-xl"
    >
        <div class="card-body">
            <h2 class="card-title">Gráfico de Dispersión Detallado</h2>
            <p class="text-sm opacity-70">
                Relación entre <strong>{{ relationshipStore.selectedCell.x }}</strong> y 
                <strong>{{ relationshipStore.selectedCell.y }}</strong>
            </p>

            <div class="mt-4">
                <VueApexCharts
                    type="scatter"
                    height="400"
                    :options="chartOptions"
                    :series="series"
                />
            </div>

            <div class="mt-4 p-4 bg-base-200 rounded-lg">
                <p class="text-sm font-medium">
                    Coeficiente de Correlación de Pearson (r): 
                    <span class="text-lg font-bold ml-2">
                        {{ relationshipStore.selectedCorrelation?.correlation.toFixed(3) }}
                    </span>
                </p>
                <p class="text-xs opacity-70 mt-1">
                    Una correlación positiva indica que ambas métricas tienden a aumentar juntas.
                    Una correlación negativa indica que cuando una aumenta, la otra disminuye.
                </p>
            </div>
        </div>
    </div>
</template>
