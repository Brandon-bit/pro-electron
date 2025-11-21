<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useBenchmarkingStore } from '@/store/benchmarking';
import { storeToRefs } from 'pinia';
import { useResults } from '../composables/useResults';
import DonutChart from '@/modules/Marketing/Dashboard/components/charts/donutChart.vue';
import BarChart from '@/modules/Marketing/Dashboard/components/charts/barChart.vue';
import type { AggregatedResult } from '../types/benchmarkingTypes';

const store = useBenchmarkingStore();

// Usar storeToRefs para reactividad correcta
const { surveys, templates, allSurveyResponses, selectedBrandId } = storeToRefs(store);

const { calculateAggregatedResults } = useResults();

// Check if a brand is selected
const hasBrandSelected = computed(() => !!selectedBrandId.value);

// Local state
const selectedSurveyId = ref<string | null>(null);
onMounted(() => {
  // Solo cargamos si el componente padre no lo ha hecho por alguna razón.
  if (store.selectedBrandId) {
    if (!store.surveys || store.surveys.length === 0) {
      console.warn('ResultadosTab: Faltaban Surveys, cargando...');
      store.fetchSurveys();
    }
    if (!store.templates || store.templates.length === 0) {
      console.warn('ResultadosTab: Faltaban Templates, cargando...');
      store.fetchTemplates();
    }
  }
});

// Watch para cuando el usuario SELECCIONA UN ESTUDIO
watch(selectedSurveyId, async (newSurveyId) => {
  if (newSurveyId) {
    try {
      // Llama a la acción que trae TODAS las respuestas para gráficas
      await store.fetchAllSurveyResponses(newSurveyId);
    } catch (err) {
      console.error("Error loading survey responses:", err);
    }
  }
});

// ¡NUEVO! Watch para cuando el usuario CAMBIA DE MARCA
watch(selectedBrandId, (newBrandId, oldBrandId) => {
  // Verificamos que realmente haya cambiado y que no sea la carga inicial
  if (newBrandId !== oldBrandId && oldBrandId !== null) {
    console.warn('ResultadosTab: ¡La marca cambió! Reseteando vista.');
    
    // 1. Reseteamos el dropdown de "Seleccionar Estudio"
    selectedSurveyId.value = null;
    
    // 2. Llamamos a la nueva acción para vaciar el array de respuestas de la marca anterior
    store.clearResultsState();
  }
});

const surveysWithResults = computed(() => {
  return surveys.value.filter(s => s.responses > 0);
});

const aggregatedResults = computed(() => {
  // --- GUARD CLAUSES ---
  if (!selectedSurveyId.value) return [];
  if (!surveys.value || surveys.value.length === 0) return [];
  if (!templates.value || templates.value.length === 0) return [];
  if (!allSurveyResponses.value || allSurveyResponses.value.length === 0) return [];
  // --- FIN DE GUARD CLAUSES ---

  // 1. Obtenemos los resultados base usando allSurveyResponses
  const baseResults = calculateAggregatedResults(
    selectedSurveyId.value,
    surveys.value,
    templates.value,
    allSurveyResponses.value
  );

  if (!baseResults) return [];

  // 2. ¡LA CORRECCIÓN! Iteramos y adjuntamos 'chartData' UNA SOLA VEZ
  return baseResults.map(result => {
    return {
      ...result,
      // Llamamos a getChartData aquí, una vez por ítem
      chartData: getChartData(result) 
    };
  });
});

// Helper functions
const getChartData = (result: AggregatedResult) => {
  // Guardia 1: Si no hay datos o no es un array, fuera.
  if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
    return null;
  }

  // Guardia 2: ¡LA CORRECCIÓN MÁS IMPORTANTE!
  // Filtramos ANTES de mapear, para excluir cualquier respuesta sin 'value'.
  const validData = result.data.filter(item => 
    item.value !== undefined && item.value !== null
  );

  // Guardia 3: Si después de filtrar no queda nada, fuera.
  if (validData.length === 0) {
    return null;
  }
  
  // Ahora es seguro mapear
  const series = validData.map(item => item.value);
  const labels = validData.map(item => item.name);
  
  return { series, labels };
};
</script>

<template>
  <div class="space-y-6">
    <!-- No Brand Selected State -->
    <div v-if="!hasBrandSelected" class="text-center py-16">
      <div class="text-6xl mb-4">📈</div>
      <h3 class="text-2xl font-bold text-gray-700 mb-2">Selecciona una Marca</h3>
      <p class="text-gray-500">
        Selecciona una marca para visualizar los resultados de tus estudios
      </p>
    </div>

    <!-- Brand Selected - Show Content -->
    <template v-else>
      <div>
        <h2 class="text-xl font-semibold mb-1">Resultados y Análisis</h2>
        <p class="text-sm text-gray-500 mb-4">
          Visualiza y analiza los resultados de tus encuestas con gráficos interactivos
        </p>
      </div>

      <!-- Survey Selection -->
      <div class="card bg-base-100 border border-gray-300 shadow-lg p-6">
        <h3 class="font-semibold mb-4">Seleccionar Estudio para Ver Resultados</h3>
        <select class="select select-bordered w-full" v-model="selectedSurveyId">
          <option :value="null" disabled>Selecciona un estudio con respuestas...</option>
          <option 
            v-for="survey in surveysWithResults" 
            :key="survey.id" 
            :value="survey.id"
          >
            {{ survey.title }} ({{ survey.responses }} respuestas)
          </option>
        </select>
      </div>

      <!-- Empty State - No Survey Selected -->
      <div v-if="!selectedSurveyId" class="text-center py-16">
        <div class="text-6xl mb-4">📊</div>
        <h3 class="text-xl font-bold text-gray-700 mb-2">Selecciona un Estudio</h3>
        <p class="text-gray-500">
          Selecciona un estudio con respuestas para visualizar sus resultados y análisis
        </p>
      </div>
    
    <!-- Empty State - No Results -->
    <div v-else-if="!aggregatedResults || aggregatedResults.length === 0" class="text-center py-12 text-gray-500">
      <span class="material-symbols-outlined text-4xl opacity-30 mb-2">sentiment_dissatisfied</span>
      <p>No hay resultados disponibles para este estudio.</p>
    </div>

    <!-- Results Display -->
    <div v-else class="space-y-8">
      <div 
        v-for="(result, index) in aggregatedResults" 
        :key="result.question.id" 
        class="card bg-base-100 border border-gray-200 shadow-sm rounded-lg overflow-hidden"
      >
        <div class="card-body p-6">
          <h3 class="card-title text-lg font-medium mb-4">
            {{ index + 1 }}. {{ result.question.text }}
            <span 
              v-if="result.average !== undefined" 
              class="ml-2 badge badge-outline badge-primary"
            >
              Promedio: {{ result.average.toFixed(2) }}
            </span>
          </h3>

          <div v-if="result.question.chartType === 'pie'" class="min-h-[300px]">
            <DonutChart
              v-if="result.chartData"
              :series="result.chartData.series"
              :labels="result.chartData.labels"
            />
            <div v-else class="text-sm text-gray-500 text-center py-4">
              No hay respuestas para esta pregunta.
            </div>
          </div>
          
          <div v-else-if="result.question.chartType === 'bar'" class="min-h-[300px]">
            <BarChart
              v-if="result.chartData"
              :series="[{ name: 'Respuestas', data: result.chartData.series }]"
              :categories="result.chartData.labels"
            />
            <div v-else class="text-sm text-gray-500 text-center py-4">
              No hay respuestas para esta pregunta.
            </div>
          </div>
          
          <div v-else-if="result.question.chartType === 'table'">
            <div v-if="result.data && Array.isArray(result.data) && result.data.length > 0">
              <h4 class="text-sm font-medium mb-2">Comentarios:</h4>
              <div class="max-h-60 overflow-y-auto space-y-2 pr-2 border rounded-md p-3">
                <div 
                  v-for="(item, rIndex) in result.data" 
                  :key="rIndex" 
                  class="text-sm border-b border-base-300 pb-2 last:border-b-0"
                >
                  <template v-if="item && item.comment !== null && item.comment !== undefined">
                    <p class="font-semibold text-xs text-gray-600 mb-1">{{ item.commenter || 'Anónimo' }}:</p>
                    <p>{{ item.comment }}</p>
                  </template>
                </div>
              </div>
            </div>
            <div v-else class="text-sm text-gray-500 text-center py-4">
              No hay comentarios para esta pregunta.
            </div>
          </div>
          
          <div v-else class="text-sm text-gray-500 text-center py-4">
            Visualización no disponible para este tipo de pregunta.
          </div>
        </div>
      </div>
    </div>
    </template>
  </div>
</template>
