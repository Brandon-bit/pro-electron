<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const portfolioStatusChartDom = ref<HTMLDivElement | null>(null)
const portfolioStatusChartInstance = ref<echarts.ECharts | null>(null)

const portfolioComplianceChartDom = ref<HTMLDivElement | null>(null)
const portfolioComplianceChartInstance = ref<echarts.ECharts | null>(null)

const portfolioBudgetChartDom = ref<HTMLDivElement | null>(null)
const portfolioBudgetChartInstance = ref<echarts.ECharts | null>(null)

const portfolioStageCountChartDom = ref<HTMLDivElement | null>(null)
const portfolioStageCountChartInstance = ref<echarts.ECharts | null>(null)

const portfolioDelayCountChartDom = ref<HTMLDivElement | null>(null)
const portfolioDelayCountChartInstance = ref<echarts.ECharts | null>(null)

const portfolioDelayRangesChartDom = ref<HTMLDivElement | null>(null)
const portfolioDelayRangesChartInstance = ref<echarts.ECharts | null>(null)

const portfolioControlledDelayCountChartDom = ref<HTMLDivElement | null>(null)
const portfolioControlledDelayCountChartInstance = ref<echarts.ECharts | null>(null)

const portfolioControlledDelayRangesChartDom = ref<HTMLDivElement | null>(null)
const portfolioControlledDelayRangesChartInstance = ref<echarts.ECharts | null>(null)

const portfolioImmediateDelayCountChartDom = ref<HTMLDivElement | null>(null)
const portfolioImmediateDelayCountChartInstance = ref<echarts.ECharts | null>(null)

const portfolioImmediateDelayRangesChartDom = ref<HTMLDivElement | null>(null)
const portfolioImmediateDelayRangesChartInstance = ref<echarts.ECharts | null>(null)

const portfolioCriticalDelayCountChartDom = ref<HTMLDivElement | null>(null)
const portfolioCriticalDelayCountChartInstance = ref<echarts.ECharts | null>(null)

const portfolioCriticalDelayRangesChartDom = ref<HTMLDivElement | null>(null)
const portfolioCriticalDelayRangesChartInstance = ref<echarts.ECharts | null>(null)

const initPortfolioStatusChart = () => {
  if (!portfolioStatusChartDom.value) return

  const chart = echarts.init(portfolioStatusChartDom.value)
  portfolioStatusChartInstance.value = chart

  chart.setOption({
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: {
      orient: 'horizontal',
      top: 0,
      textStyle: { color: 'inherit', fontSize: 11 },
    },
    series: [
      {
        name: 'Estatus de Proyectos',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '60%'],
        itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
        label: { show: true, formatter: '{b}\n{d}%', fontSize: 11 },
        labelLine: { show: true, length: 10, length2: 8 },
        data: [
          { value: 2, name: 'Atraso Crítico', itemStyle: { color: '#ef4444' } },
          { value: 1, name: 'Atención Inmediata', itemStyle: { color: '#f97316' } },
          { value: 1, name: 'Atraso Controlado', itemStyle: { color: '#facc15' } },
          { value: 1, name: 'Atrasados', itemStyle: { color: '#eab308' } },
          { value: 1, name: 'En Tiempo', itemStyle: { color: '#22c55e' } },
          { value: 1, name: 'Finalizados', itemStyle: { color: '#6b7280' } },
        ],
      },
    ],
  })

  window.addEventListener('resize', () => chart.resize())
}

const initPortfolioComplianceChart = () => {
  if (!portfolioComplianceChartDom.value) return

  const chart = echarts.init(portfolioComplianceChartDom.value)
  portfolioComplianceChartInstance.value = chart

  chart.setOption({
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: {
      orient: 'horizontal',
      top: 0,
      textStyle: { color: 'inherit', fontSize: 11 },
    },
    series: [
      {
        name: 'Cumplimiento en tiempo',
        type: 'pie',
        radius: ['55%', '75%'],
        center: ['50%', '60%'],
        itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
        label: { show: true, formatter: '{b}\n{d}%', fontSize: 11 },
        labelLine: { show: true, length: 10, length2: 8 },
        data: [
          { value: 1, name: 'Proyectos IMPLEMENTADOS en tiempo', itemStyle: { color: '#22c55e' } },
          { value: 3, name: 'Proyectos NO IMPLEMENTADOS en tiempo', itemStyle: { color: '#ef4444' } },
        ],
      },
    ],
  })

  window.addEventListener('resize', () => chart.resize())
}

const initPortfolioBudgetChart = () => {
  if (!portfolioBudgetChartDom.value) return

  const chart = echarts.init(portfolioBudgetChartDom.value)
  portfolioBudgetChartInstance.value = chart

  chart.setOption({
    grid: { left: '6%', right: '4%', top: 30, bottom: 20, containLabel: true },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { top: 0, textStyle: { color: 'inherit', fontSize: 11 } },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
      axisLabel: { color: 'inherit', fontSize: 10 },
    },
    yAxis: {
      type: 'category',
      data: ['Presupuesto'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'inherit', fontSize: 11 },
    },
    series: [
      {
        name: 'Total Planeado',
        type: 'bar',
        barWidth: 16,
        itemStyle: { color: '#0ea5e9', borderRadius: 6 },
        data: [1000],
      },
      {
        name: 'Total Real',
        type: 'bar',
        barWidth: 16,
        itemStyle: { color: '#22c55e', borderRadius: 6 },
        data: [950],
      },
    ],
  })

  window.addEventListener('resize', () => chart.resize())
}

const initPortfolioStageCountChart = () => {
  if (!portfolioStageCountChartDom.value) return

  const chart = echarts.init(portfolioStageCountChartDom.value)
  portfolioStageCountChartInstance.value = chart

  chart.setOption({
    grid: { left: '8%', right: '4%', top: 30, bottom: 30, containLabel: true },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'category',
      data: ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Módulo de Proyectos'],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { color: 'inherit', fontSize: 10, interval: 0, rotate: 20 },
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
      axisLabel: { color: 'inherit', fontSize: 10 },
    },
    series: [
      {
        name: 'Proyectos',
        type: 'bar',
        barWidth: 18,
        itemStyle: { color: '#0f766e', borderRadius: [6, 6, 0, 0] },
        label: { show: true, position: 'top', fontSize: 10, color: 'inherit' },
        data: [1, 1, 1, 1],
      },
    ],
  })

  window.addEventListener('resize', () => chart.resize())
}

const initPortfolioDelayCountChart = () => {
  if (!portfolioDelayCountChartDom.value) return

  const chart = echarts.init(portfolioDelayCountChartDom.value)
  portfolioDelayCountChartInstance.value = chart

  chart.setOption({
    grid: { left: '10%', right: '4%', top: 30, bottom: 20, containLabel: true },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
      axisLabel: { color: 'inherit', fontSize: 10 },
    },
    yAxis: {
      type: 'category',
      data: ['Atraso crítico', 'Atención inmediata', 'Atraso controlado', 'Atrasados'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'inherit', fontSize: 10 },
    },
    series: [
      {
        name: 'Proyectos en atraso',
        type: 'bar',
        barWidth: 18,
        itemStyle: { color: '#eab308', borderRadius: 6 },
        label: { show: true, position: 'right', fontSize: 10, color: 'inherit' },
        data: [1, 1, 1, 1],
      },
    ],
  })

  window.addEventListener('resize', () => chart.resize())
}

const initPortfolioDelayRangesChart = () => {
  if (!portfolioDelayRangesChartDom.value) return

  const chart = echarts.init(portfolioDelayRangesChartDom.value)
  portfolioDelayRangesChartInstance.value = chart

  chart.setOption({
    grid: { left: '8%', right: '4%', top: 30, bottom: 30, containLabel: true },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'category',
      data: ['(-1 a -5)', '(-6 a -9)', '(-10 a -15)', '(> -15)'],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { color: 'inherit', fontSize: 10, interval: 0, rotate: 15 },
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
      axisLabel: { color: 'inherit', fontSize: 10 },
    },
    series: [
      {
        name: 'Proyectos atrasados',
        type: 'bar',
        barWidth: 18,
        itemStyle: { color: '#eab308', borderRadius: [6, 6, 0, 0] },
        label: { show: true, position: 'top', fontSize: 10, color: 'inherit' },
        data: [1, 1, 1, 1],
      },
    ],
  })

  window.addEventListener('resize', () => chart.resize())
}

const initPortfolioControlledDelayCountChart = () => {
  if (!portfolioControlledDelayCountChartDom.value) return

  const chart = echarts.init(portfolioControlledDelayCountChartDom.value)
  portfolioControlledDelayCountChartInstance.value = chart

  chart.setOption({
    grid: { left: '10%', right: '4%', top: 30, bottom: 20, containLabel: true },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
      axisLabel: { color: 'inherit', fontSize: 10 },
    },
    yAxis: {
      type: 'category',
      data: ['Innovación'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'inherit', fontSize: 10 },
    },
    series: [
      {
        name: 'Proyectos en atraso controlable',
        type: 'bar',
        barWidth: 18,
        itemStyle: { color: '#facc15', borderRadius: 6 },
        label: { show: true, position: 'right', fontSize: 10, color: 'inherit' },
        data: [1],
      },
    ],
  })

  window.addEventListener('resize', () => chart.resize())
}

const initPortfolioControlledDelayRangesChart = () => {
  if (!portfolioControlledDelayRangesChartDom.value) return

  const chart = echarts.init(portfolioControlledDelayRangesChartDom.value)
  portfolioControlledDelayRangesChartInstance.value = chart

  chart.setOption({
    grid: { left: '8%', right: '4%', top: 30, bottom: 30, containLabel: true },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'category',
      data: ['(-10 a -20)', '(-21 a -29)'],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { color: 'inherit', fontSize: 10, interval: 0, rotate: 15 },
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
      axisLabel: { color: 'inherit', fontSize: 10 },
    },
    series: [
      {
        name: 'Proyectos en atraso controlable',
        type: 'bar',
        barWidth: 18,
        itemStyle: { color: '#facc15', borderRadius: [6, 6, 0, 0] },
        label: { show: true, position: 'top', fontSize: 10, color: 'inherit' },
        data: [0, 1],
      },
    ],
  })

  window.addEventListener('resize', () => chart.resize())
}

const initPortfolioImmediateDelayCountChart = () => {
  if (!portfolioImmediateDelayCountChartDom.value) return

  const chart = echarts.init(portfolioImmediateDelayCountChartDom.value)
  portfolioImmediateDelayCountChartInstance.value = chart

  chart.setOption({
    grid: { left: '10%', right: '4%', top: 30, bottom: 20, containLabel: true },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
      axisLabel: { color: 'inherit', fontSize: 10 },
    },
    yAxis: {
      type: 'category',
      data: ['Innovación'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'inherit', fontSize: 10 },
    },
    series: [
      {
        name: 'Proyectos en atraso atención inmediata',
        type: 'bar',
        barWidth: 18,
        itemStyle: { color: '#f97316', borderRadius: 6 },
        label: { show: true, position: 'right', fontSize: 10, color: 'inherit' },
        data: [0],
      },
    ],
  })

  window.addEventListener('resize', () => chart.resize())
}

const initPortfolioImmediateDelayRangesChart = () => {
  if (!portfolioImmediateDelayRangesChartDom.value) return

  const chart = echarts.init(portfolioImmediateDelayRangesChartDom.value)
  portfolioImmediateDelayRangesChartInstance.value = chart

  chart.setOption({
    grid: { left: '8%', right: '4%', top: 30, bottom: 30, containLabel: true },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'category',
      data: ['(-30 a -40)', '(-41 a -49)'],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { color: 'inherit', fontSize: 10, interval: 0, rotate: 15 },
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
      axisLabel: { color: 'inherit', fontSize: 10 },
    },
    series: [
      {
        name: 'Proyectos en atraso atención inmediata',
        type: 'bar',
        barWidth: 18,
        itemStyle: { color: '#f97316', borderRadius: [6, 6, 0, 0] },
        label: { show: true, position: 'top', fontSize: 10, color: 'inherit' },
        data: [0, 0],
      },
    ],
  })

  window.addEventListener('resize', () => chart.resize())
}

const initPortfolioCriticalDelayCountChart = () => {
  if (!portfolioCriticalDelayCountChartDom.value) return

  const chart = echarts.init(portfolioCriticalDelayCountChartDom.value)
  portfolioCriticalDelayCountChartInstance.value = chart

  chart.setOption({
    grid: { left: '10%', right: '4%', top: 30, bottom: 20, containLabel: true },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
      axisLabel: { color: 'inherit', fontSize: 10 },
    },
    yAxis: {
      type: 'category',
      data: ['Proyectos', 'Desarrollo'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'inherit', fontSize: 10 },
    },
    series: [
      {
        name: 'Proyectos en atraso crítico',
        type: 'bar',
        barWidth: 18,
        itemStyle: { color: '#ef4444', borderRadius: 6 },
        label: { show: true, position: 'right', fontSize: 10, color: 'inherit' },
        data: [1, 1],
      },
    ],
  })

  window.addEventListener('resize', () => chart.resize())
}

const initPortfolioCriticalDelayRangesChart = () => {
  if (!portfolioCriticalDelayRangesChartDom.value) return

  const chart = echarts.init(portfolioCriticalDelayRangesChartDom.value)
  portfolioCriticalDelayRangesChartInstance.value = chart

  chart.setOption({
    grid: { left: '8%', right: '4%', top: 30, bottom: 30, containLabel: true },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'category',
      data: ['(-50 a -59)', '(-60 a -69)', '(-70 a -79)', '(-80 a -89)', '(-90 a -99)', '(< -100)'],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { color: 'inherit', fontSize: 10, interval: 0, rotate: 15 },
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#e5e7eb', type: 'dashed' } },
      axisLabel: { color: 'inherit', fontSize: 10 },
    },
    series: [
      {
        name: 'Proyectos en atraso crítico',
        type: 'bar',
        barWidth: 18,
        itemStyle: { color: '#ef4444', borderRadius: [6, 6, 0, 0] },
        label: { show: true, position: 'top', fontSize: 10, color: 'inherit' },
        data: [0, 0, 0, 0, 0, 2],
      },
    ],
  })

  window.addEventListener('resize', () => chart.resize())
}

onMounted(() => {
  initPortfolioStatusChart()
  initPortfolioComplianceChart()
  initPortfolioBudgetChart()
  initPortfolioStageCountChart()
  initPortfolioDelayCountChart()
  initPortfolioDelayRangesChart()
  initPortfolioControlledDelayCountChart()
  initPortfolioControlledDelayRangesChart()
  initPortfolioImmediateDelayCountChart()
  initPortfolioImmediateDelayRangesChart()
  initPortfolioCriticalDelayCountChart()
  initPortfolioCriticalDelayRangesChart()
})
</script>

<template>
  <div class="bg-base-100 border border-base-200/70 rounded-xl p-4 space-y-6">
    <!-- Bloque 1: Visión general del portafolio -->
    <div class="space-y-3">
      <h2 class="text-xs font-semibold uppercase tracking-wide text-base-content/60 px-1">
        Visión general del portafolio
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="card bg-base-100 border border-base-200/70 shadow-sm">
          <div class="card-body space-y-3">
            <h3 class="text-sm font-semibold text-base-content/80">
              Estatus de Proyectos
            </h3>
            <div class="bg-base-100 rounded-xl p-2">
              <div ref="portfolioStatusChartDom" class="w-full h-64" />
            </div>
          </div>
        </div>

        <div class="card bg-base-100 border border-base-200/70 shadow-sm">
          <div class="card-body space-y-3">
            <h3 class="text-sm font-semibold text-base-content/80">
              Cumplimiento de Implementación de Proyectos en Tiempo
            </h3>
            <div class="bg-base-100 rounded-xl p-2">
              <div ref="portfolioComplianceChartDom" class="w-full h-64" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bloque 2: Presupuesto y volumen de proyectos -->
    <div class="space-y-3">
      <h2 class="text-xs font-semibold uppercase tracking-wide text-base-content/60 px-1">
        Presupuesto y volumen de proyectos
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="card bg-base-100 border border-base-200/70 shadow-sm">
          <div class="card-body space-y-3">
            <h3 class="text-sm font-semibold text-base-content/80">
              Presupuesto Planeado vs Real
            </h3>
            <div class="bg-base-100 rounded-xl p-2">
              <div ref="portfolioBudgetChartDom" class="w-full h-64" />
            </div>
          </div>
        </div>

        <div class="card bg-base-100 border border-base-200/70 shadow-sm">
          <div class="card-body space-y-3">
            <h3 class="text-sm font-semibold text-base-content/80">
              Cantidad de Proyectos por Etapa
            </h3>
            <div class="bg-base-100 rounded-xl p-2">
              <div ref="portfolioStageCountChartDom" class="w-full h-64" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bloque 3: Atraso general -->
    <div class="space-y-3">
      <h2 class="text-xs font-semibold uppercase tracking-wide text-base-content/60 px-1">
        Proyectos con atraso (visión general)
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="card bg-base-100 border border-base-200/70 shadow-sm">
          <div class="card-body space-y-3">
            <h3 class="text-sm font-semibold text-base-content/80">
              Cantidad de proyectos con atraso
            </h3>
            <div class="bg-base-100 rounded-xl p-2">
              <div ref="portfolioDelayCountChartDom" class="w-full h-64" />
            </div>
          </div>
        </div>

        <div class="card bg-base-100 border border-base-200/70 shadow-sm">
          <div class="card-body space-y-3">
            <h3 class="text-sm font-semibold text-base-content/80">
              Proyectos atrasados por rangos
            </h3>
            <div class="bg-base-100 rounded-xl p-2">
              <div ref="portfolioDelayRangesChartDom" class="w-full h-64" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bloque 4: Atraso controlable -->
    <div class="space-y-3">
      <h2 class="text-xs font-semibold uppercase tracking-wide text-base-content/60 px-1">
        Proyectos en atraso controlable
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="card bg-base-100 border border-base-200/70 shadow-sm">
          <div class="card-body space-y-3">
            <h3 class="text-sm font-semibold text-base-content/80">
              Cantidad de proyectos en atraso controlable
            </h3>
            <div class="bg-base-100 rounded-xl p-2">
              <div ref="portfolioControlledDelayCountChartDom" class="w-full h-64" />
            </div>
          </div>
        </div>

        <div class="card bg-base-100 border border-base-200/70 shadow-sm">
          <div class="card-body space-y-3">
            <h3 class="text-sm font-semibold text-base-content/80">
              Proyectos en atraso controlable por rangos
            </h3>
            <div class="bg-base-100 rounded-xl p-2">
              <div ref="portfolioControlledDelayRangesChartDom" class="w-full h-64" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bloque 5: Atraso con atención inmediata -->
    <div class="space-y-3">
      <h2 class="text-xs font-semibold uppercase tracking-wide text-base-content/60 px-1">
        Proyectos en atraso con atención inmediata
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="card bg-base-100 border border-base-200/70 shadow-sm">
          <div class="card-body space-y-3">
            <h3 class="text-sm font-semibold text-base-content/80">
              Cantidad de proyectos en atraso atención inmediata
            </h3>
            <div class="bg-base-100 rounded-xl p-2">
              <div ref="portfolioImmediateDelayCountChartDom" class="w-full h-64" />
            </div>
          </div>
        </div>

        <div class="card bg-base-100 border border-base-200/70 shadow-sm">
          <div class="card-body space-y-3">
            <h3 class="text-sm font-semibold text-base-content/80">
              Proyectos en atraso atención inmediata por rangos
            </h3>
            <div class="bg-base-100 rounded-xl p-2">
              <div ref="portfolioImmediateDelayRangesChartDom" class="w-full h-64" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bloque 6: Atraso crítico -->
    <div class="space-y-3">
      <h2 class="text-xs font-semibold uppercase tracking-wide text-base-content/60 px-1">
        Proyectos en atraso crítico
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="card bg-base-100 border border-base-200/70 shadow-sm">
          <div class="card-body space-y-3">
            <h3 class="text-sm font-semibold text-base-content/80">
              Cantidad de proyectos en atraso crítico
            </h3>
            <div class="bg-base-100 rounded-xl p-2">
              <div ref="portfolioCriticalDelayCountChartDom" class="w-full h-64" />
            </div>
          </div>
        </div>

        <div class="card bg-base-100 border border-base-200/70 shadow-sm">
          <div class="card-body space-y-3">
            <h3 class="text-sm font-semibold text-base-content/80">
              Proyectos en atraso crítico por rangos
            </h3>
            <div class="bg-base-100 rounded-xl p-2">
              <div ref="portfolioCriticalDelayRangesChartDom" class="w-full h-64" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
