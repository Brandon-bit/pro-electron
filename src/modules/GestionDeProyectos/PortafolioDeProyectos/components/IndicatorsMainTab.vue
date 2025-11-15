<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import BaseFormSelect from '@/shared/components/BaseFormSelect.vue'

const leaders = [
  { id: 1, label: 'Líder A' },
  { id: 2, label: 'Líder B' },
  { id: 3, label: 'Líder C' },
]

const areas = [
  { id: 1, label: 'Área A' },
  { id: 2, label: 'Área B' },
  { id: 3, label: 'Área C' },
]

const statusChartDom = ref<HTMLDivElement | null>(null)
const statusChartInstance = ref<echarts.ECharts | null>(null)

const initStatusChart = () => {
  if (!statusChartDom.value) return

  const chart = echarts.init(statusChartDom.value)
  statusChartInstance.value = chart

  chart.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      show: false,
    },
    series: [
      {
        name: 'Estatus de proyectos',
        type: 'pie',
        radius: ['40%', '70%'],
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
          { value: 1, name: 'Arranque', itemStyle: { color: '#f97373' } },
          { value: 2, name: 'En ejecución', itemStyle: { color: '#facc15' } },
          { value: 0, name: 'Por concluir', itemStyle: { color: '#60a5fa' } },
          { value: 1, name: 'Concluido', itemStyle: { color: '#22c55e' } },
        ],
      },
    ],
  })

  window.addEventListener('resize', () => {
    chart.resize()
  })
}

const highlightSlice = (index: number) => {
  if (!statusChartInstance.value) return
  statusChartInstance.value.dispatchAction({
    type: 'highlight',
    seriesIndex: 0,
    dataIndex: index,
  })
}

const downplaySlice = (index: number) => {
  if (!statusChartInstance.value) return
  statusChartInstance.value.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: index,
  })
}

onMounted(() => {
  initStatusChart()
})
</script>

<template>
  <div>
    <div class="flex justify-end gap-2">
      <BaseFormSelect
        label="Líder"
        name="leader"
        :options="leaders"
        class="w-[25%]"
      />
      <BaseFormSelect
        label="Área"
        name="area"
        :options="areas"
        class="w-[25%]"
      />
    </div>
    <div class="flex gap-6 mt-6">
      <div class="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Arranque -->
        <div
          class="relative flex items-center justify-between rounded-2xl bg-base-100 shadow-sm border border-base-200/60 overflow-hidden"
          @mouseenter="highlightSlice(0)"
          @mouseleave="downplaySlice(0)"
        >
          <div class="h-full w-1 bg-error"></div>
          <div class="flex-1 px-4 py-3">
            <div class="text-xs font-semibold tracking-wide text-error mb-1">
              ARRANQUE
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-semibold text-base-content">1</span>
            </div>
            <div class="text-xs text-base-content/60 mt-1">25%</div>
          </div>
          <div class="px-4 pr-5 text-3xl font-semibold text-base-content/10 select-none">
            #
          </div>
        </div>

        <!-- En ejecución -->
        <div
          class="relative flex items-center justify-between rounded-2xl bg-base-100 shadow-sm border border-base-200/60 overflow-hidden"
          @mouseenter="highlightSlice(1)"
          @mouseleave="downplaySlice(1)"
        >
          <div class="h-full w-1 bg-warning"></div>
          <div class="flex-1 px-4 py-3">
            <div class="text-xs font-semibold tracking-wide text-warning mb-1">
              EN EJECUCIÓN
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-semibold text-base-content">2</span>
            </div>
            <div class="text-xs text-base-content/60 mt-1">50%</div>
          </div>
          <div class="px-4 pr-5 text-3xl font-semibold text-base-content/10 select-none">
            #
          </div>
        </div>

        <!-- Por concluir -->
        <div
          class="relative flex items-center justify-between rounded-2xl bg-base-100 shadow-sm border border-base-200/60 overflow-hidden"
          @mouseenter="highlightSlice(2)"
          @mouseleave="downplaySlice(2)"
        >
          <div class="h-full w-1 bg-info"></div>
          <div class="flex-1 px-4 py-3">
            <div class="text-xs font-semibold tracking-wide text-info mb-1">
              POR CONCLUIR
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-semibold text-base-content">0</span>
            </div>
            <div class="text-xs text-base-content/60 mt-1">0%</div>
          </div>
          <div class="px-4 pr-5 text-3xl font-semibold text-base-content/10 select-none">
            #
          </div>
        </div>

        <!-- Concluido -->
        <div
          class="relative flex items-center justify-between rounded-2xl bg-base-100 shadow-sm border border-base-200/60 overflow-hidden"
          @mouseenter="highlightSlice(3)"
          @mouseleave="downplaySlice(3)"
        >
          <div class="h-full w-1 bg-success"></div>
          <div class="flex-1 px-4 py-3">
            <div class="text-xs font-semibold tracking-wide text-success mb-1">
              CONCLUIDO
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-semibold text-base-content">1</span>
            </div>
            <div class="text-xs text-base-content/60 mt-1">25%</div>
          </div>
          <div class="px-4 pr-5 text-3xl font-semibold text-base-content/10 select-none">
            #
          </div>
        </div>
      </div>
      <div class="hidden lg:block flex-1 justify-center items-center">
        <div ref="statusChartDom" class="w-full h-64" />
      </div>
    </div>
  </div>
</template>
