<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import { computed } from "vue";

const props = defineProps<{
  title?: string;
  subtitle?: string;
  series: { name: string; data: number[] }[]; // [{ name: 'Respuestas', data: [10, 5, 2] }]
  categories: string[]; // ['Label 1', 'Label 2', 'Label 3']
}>();

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    background: '#fff',
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 5,
      left: 3,
      blur: 6,
      opacity: 0.2,
    },
    toolbar: { show: false },
  },

  plotOptions: {
    bar: {
      borderRadius: 6,
      horizontal: false,
      columnWidth: '20%',
      distributed: true,
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.3,
      gradientToColors: ['#2563eb'],
      inverseColors: false,
      opacityFrom: 0.9,
      opacityTo: 0.6,
      stops: [0, 100],
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      colors: ['#111'],
      fontSize: '12px',
      fontWeight: 'bold',
    },
  },
  xaxis: {
    categories: props.categories,
  },
  colors: ['#3b82f6', '#10b981', '#f59e0b'],
}))

</script>

<template>
  <div class="bg-white rounded-lg shadow-sm p-4 space-y-2">
    <h3 v-if="props.title" class="text-base font-medium">{{ props.title }}</h3>
    <p v-if="props.subtitle" class="text-xs text-gray-500">{{ props.subtitle }}</p>
    <VueApexCharts
      type="bar"
      height="200"
     
      :options="chartOptions"
      :series="props.series"
    />
  </div>
</template>