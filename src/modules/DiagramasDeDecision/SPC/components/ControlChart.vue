<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import useSPCStore from '@/modules/DiagramasDeDecision/SPC/store/spcStore'

const spcStore = useSPCStore()

const chartOptions = computed(() => ({
    chart: {
        type: 'line',
        height: 400,
        toolbar: {
            show: true
        },
        zoom: {
            enabled: true
        }
    },
    stroke: {
        width: 3,
        curve: 'straight'
    },
    colors: ['#570DF8'],
    markers: {
        size: 6,
        colors: spcStore.dataPoints.map(p => p.isOutOfControl ? '#F87272' : '#570DF8'),
        strokeColors: '#fff',
        strokeWidth: 2
    },
    xaxis: {
        categories: spcStore.dataPoints.map(p => p.sample),
        title: {
            text: 'Número de Muestra'
        }
    },
    yaxis: {
        title: {
            text: 'Valor'
        }
    },
    annotations: {
        yaxis: [
            {
                y: spcStore.controlLimits.ucl,
                borderColor: '#F87272',
                strokeDashArray: 5,
                label: {
                    text: `UCL: ${spcStore.controlLimits.ucl.toFixed(2)}`,
                    style: {
                        color: '#fff',
                        background: '#F87272'
                    }
                }
            },
            {
                y: spcStore.controlLimits.mean,
                borderColor: '#570DF8',
                strokeDashArray: 0,
                borderWidth: 2,
                label: {
                    text: `Media: ${spcStore.controlLimits.mean.toFixed(2)}`,
                    style: {
                        color: '#fff',
                        background: '#570DF8'
                    }
                }
            },
            {
                y: spcStore.controlLimits.lcl,
                borderColor: '#F87272',
                strokeDashArray: 5,
                label: {
                    text: `LCL: ${spcStore.controlLimits.lcl.toFixed(2)}`,
                    style: {
                        color: '#fff',
                        background: '#F87272'
                    }
                }
            }
        ]
    },
    tooltip: {
        y: {
            formatter: (value: number) => value.toFixed(2)
        }
    },
    legend: {
        show: true
    }
}))

const series = computed(() => [{
    name: 'Valor Medido',
    data: spcStore.dataPoints.map(p => p.value)
}])
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Gráfico de Control X̄ (Media)</h2>
            <p class="text-sm opacity-70">
                Límites de control calculados automáticamente (±3σ)
            </p>

            <div class="mt-4">
                <VueApexCharts
                    type="line"
                    height="400"
                    :options="chartOptions"
                    :series="series"
                />
            </div>
        </div>
    </div>
</template>
