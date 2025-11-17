<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import useInitiativeStore from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/store/initiativeStore'

const initiativeStore = useInitiativeStore()
const matrixChartDom = ref<HTMLDivElement | null>(null)
const matrixChartInstance = ref<echarts.ECharts | null>(null)

const initiatives = computed(() => initiativeStore.currentPageInitiatives)

const initMatrixChart = () => {
    if (!matrixChartDom.value) return

    const chart = echarts.init(matrixChartDom.value)
    matrixChartInstance.value = chart

    updateChartData()

    window.addEventListener('resize', () => {
        chart.resize()
    })
}

const updateChartData = () => {
    if (!matrixChartInstance.value) return

    // Preparar datos para el scatter plot
    const scatterData = initiatives.value.map(init => {
        const impactScore = init.impactScore ?? 5
        const effortScore = init.effortScore ?? 5
        return {
            value: [impactScore, effortScore],
            name: init.name,
            dni: init.dni,
            classification: init.classification
        }
    })

    matrixChartInstance.value.setOption({
        title: {
            show: false
        },
        grid: {
            left: '12%',
            right: '8%',
            top: '12%',
            bottom: '12%',
            containLabel: true
        },
        tooltip: {
            trigger: 'item',
            formatter: (params: any) => {
                const data = params.data
                return `<strong>${data.name}</strong><br/>
                        DNI: ${data.dni}<br/>
                        Clasificación: ${data.classification}<br/>
                        Impacto: ${data.value[0].toFixed(2)}<br/>
                        Esfuerzo: ${data.value[1].toFixed(2)}`
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#777',
            borderWidth: 1,
            textStyle: {
                color: '#fff',
                fontSize: 12
            }
        },
        xAxis: {
            name: 'Impacto',
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: {
                fontSize: 13,
                fontWeight: 'bold'
            },
            min: 0,
            max: 10,
            interval: 2.5,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#e5e7eb',
                    type: 'solid',
                    width: 2
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#9ca3af'
                }
            },
            axisTick: {
                show: true
            },
            axisLabel: {
                fontSize: 11,
                color: 'inherit'
            }
        },
        yAxis: {
            name: 'Esfuerzo',
            nameLocation: 'middle',
            nameGap: 40,
            nameTextStyle: {
                fontSize: 13,
                fontWeight: 'bold'
            },
            min: 0,
            max: 10,
            interval: 2.5,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#e5e7eb',
                    type: 'solid',
                    width: 2
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#9ca3af'
                }
            },
            axisTick: {
                show: true
            },
            axisLabel: {
                fontSize: 11,
                color: 'inherit'
            }
        },
        series: [
            {
                name: 'Iniciativas',
                type: 'scatter',
                symbolSize: 16,
                data: scatterData,
                itemStyle: {
                    color: '#8b5cf6',
                    borderColor: '#fff',
                    borderWidth: 2,
                    shadowBlur: 4,
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowOffsetY: 2
                },
                emphasis: {
                    itemStyle: {
                        color: '#7c3aed',
                        borderWidth: 3,
                        shadowBlur: 8,
                        shadowColor: 'rgba(139, 92, 246, 0.5)'
                    },
                    scale: 1.3
                },
                markArea: {
                    silent: true,
                    itemStyle: {
                        color: 'transparent'
                    },
                    label: {
                        show: true,
                        position: 'inside',
                        fontSize: 11,
                        color: '#6b7280',
                        fontWeight: 'normal'
                    },
                    data: [
                        [
                            {
                                name: 'Bajo Esfuerzo\nBajo Impacto',
                                xAxis: 0,
                                yAxis: 0
                            },
                            {
                                xAxis: 5,
                                yAxis: 5
                            }
                        ],
                        [
                            {
                                name: 'Bajo Esfuerzo\nAlto Impacto',
                                xAxis: 5,
                                yAxis: 0,
                                itemStyle: {
                                    color: 'rgba(34, 197, 94, 0.08)'
                                },
                                label: {
                                    color: '#16a34a',
                                    fontWeight: 'bold'
                                }
                            },
                            {
                                xAxis: 10,
                                yAxis: 5
                            }
                        ],
                        [
                            {
                                name: 'Alto Esfuerzo\nBajo Impacto',
                                xAxis: 0,
                                yAxis: 5
                            },
                            {
                                xAxis: 5,
                                yAxis: 10
                            }
                        ],
                        [
                            {
                                name: 'Alto Esfuerzo\nAlto Impacto',
                                xAxis: 5,
                                yAxis: 5
                            },
                            {
                                xAxis: 10,
                                yAxis: 10
                            }
                        ]
                    ]
                }
            }
        ]
    })
}

// Observar cambios en las iniciativas
watch(initiatives, () => {
    updateChartData()
}, { deep: true })

onMounted(() => {
    initMatrixChart()
})
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Matriz Esfuerzo vs Impacto</h2>
            <p class="text-sm opacity-70">Visualización gráfica de las iniciativas evaluadas</p>
            
            <div v-if="initiatives.length === 0" class="flex items-center justify-center h-[500px] bg-base-200 rounded-lg border border-base-300 mt-4">
                <div class="text-center">
                    <span class="material-symbols-outlined text-4xl opacity-30 mb-2 block">scatter_plot</span>
                    <p class="opacity-60">No hay iniciativas para mostrar en la matriz</p>
                </div>
            </div>
            
            <div v-else class="bg-base-100 rounded-lg mt-4">
                <div ref="matrixChartDom" class="w-full h-[500px]" />
            </div>
        </div>
    </div>
</template>
