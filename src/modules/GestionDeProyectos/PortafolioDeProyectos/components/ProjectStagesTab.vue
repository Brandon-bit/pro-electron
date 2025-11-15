<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'

const stageChartDom = ref<HTMLDivElement | null>(null)
const stageChartInstance = ref<echarts.ECharts | null>(null)

const initStageChart = () => {
  if (!stageChartDom.value) return

  const chart = echarts.init(stageChartDom.value)
  stageChartInstance.value = chart

  chart.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: '50%',
      top: 'middle',
      textStyle: {
        color: 'inherit',
        fontSize: 11,
      },
    },
    series: [
      {
        name: 'Etapas',
        type: 'pie',
        radius: ['40%', '60%'],
        center: ['25%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: '{b}\n{d}%',
          fontSize: 11,
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 8,
        },
        data: [
          { value: 1, name: 'Etapa 1 - Arranque', itemStyle: { color: '#38bdf8' } },
          { value: 1, name: 'Etapa 2 - Análisis', itemStyle: { color: '#f97373' } },
          { value: 1, name: 'Etapa 3 - Módulo de Proyectos', itemStyle: { color: '#22c55e' } },
        ],
      },
    ],
  })

  window.addEventListener('resize', () => {
    chart.resize()
  })
}

onMounted(() => {
  initStageChart()
})
</script>

<template>
  <div class="bg-base-100 border border-base-200/70 rounded-xl p-4 space-y-4">
    <div class="max-w-xs">
      <BaseFormSelect
        label="Seleccionar etapa"
        name="stage"
        :options="[
          { id: 1, label: 'Módulo de Proyectos' },
          { id: 2, label: 'Etapa 2' },
          { id: 3, label: 'Etapa 3' },
        ]"
      />
    </div>

    <div class="bg-base-100 border border-base-200/70 rounded-xl p-4">
      <div ref="stageChartDom" class="w-full h-72" />
    </div>
  </div>
</template>
