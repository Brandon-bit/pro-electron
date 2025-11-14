<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import useParetoStore from '@/modules/DiagramasDeDecision/AnalisisDePareto/store/paretoStore'
import { useParetoActions } from '@/modules/DiagramasDeDecision/AnalisisDePareto/composables/useParetoActions'

const paretoStore = useParetoStore()
const { handleBarClick } = useParetoActions()

const chartKey = ref(0)

const chartOptions = computed(() => ({
    chart: {
        type: 'line' as const,
        height: 400,
        stacked: false,
        toolbar: {
            show: true
        },
        events: {
            dataPointSelection: (event: any, chartContext: any, config: any) => {
                const category = paretoStore.data[config.dataPointIndex]?.category
                if (category) {
                    handleBarClick(category)
                }
            }
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '50%',
            dataLabels: {
                position: 'top'
            }
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [0, 3],
        curve: 'smooth' as const
    },
    xaxis: {
        categories: paretoStore.data.map(d => d.category),
        labels: {
            rotate: -45,
            rotateAlways: true,
            style: {
                fontSize: '12px'
            }
        }
    },
    yaxis: [
        {
            title: {
                text: 'Frecuencia'
            },
            labels: {
                formatter: (val: number) => val.toFixed(0)
            }
        },
        {
            opposite: true,
            title: {
                text: '% Acumulado'
            },
            min: 0,
            max: 100,
            labels: {
                formatter: (val: number) => val.toFixed(1) + '%'
            }
        }
    ],
    tooltip: {
        shared: true,
        intersect: false,
        y: [
            {
                formatter: (val: number) => val.toFixed(0)
            },
            {
                formatter: (val: number) => val.toFixed(1) + '%'
            }
        ]
    },
    legend: {
        position: 'top' as const,
        horizontalAlign: 'left' as const
    },
    colors: ['#570DF8', '#F87272'],
    grid: {
        borderColor: '#e7e7e7',
        strokeDashArray: 3
    }
}))

const series = computed(() => [
    {
        name: 'Frecuencia',
        type: 'column',
        data: paretoStore.data.map(d => d.frequency)
    },
    {
        name: '% Acumulado',
        type: 'line',
        data: paretoStore.data.map(d => d.cumulativePercentage)
    }
])

// Force chart re-render when data changes
watch(() => paretoStore.data, () => {
    chartKey.value++
}, { deep: true })
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Diagrama de Pareto</h2>
            <p class="text-sm opacity-70">
                Las barras representan la frecuencia, la línea muestra el porcentaje acumulado
            </p>
            
            <div class="mt-4">
                <VueApexCharts
                    :key="chartKey"
                    type="line"
                    height="400"
                    :options="chartOptions"
                    :series="series"
                />
            </div>

            <!-- Selected Category Info -->
            <div v-if="paretoStore.selectedCategory" class="mt-4 p-4 bg-info/10 border border-info rounded-lg">
                <p class="text-sm font-medium">
                    Categoría seleccionada: <span class="text-info font-bold">{{ paretoStore.selectedCategory }}</span>
                </p>
                <p class="text-xs opacity-70 mt-1">
                    Los incidentes asociados se mostrarían filtrados aquí
                </p>
            </div>
        </div>
    </div>
</template>
