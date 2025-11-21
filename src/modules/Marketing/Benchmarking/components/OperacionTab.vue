<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useBenchmarkingStore } from '@/store/benchmarking';
import { useExecutionManagement } from '../composables/useExecutionManagement';
import { useExecutionTable } from '../composables/useExecutionTable';
import BaseTable from '@/shared/components/BaseTable.vue';

const store = useBenchmarkingStore();
const executionManagement = useExecutionManagement();

// Check if a brand is selected
const hasBrandSelected = computed(() => !!store.selectedBrandId);

// Local state
const executionTableRef = ref<any>(null);

// Computed properties with safe defaults
const surveys = computed(() => {
  const surveysData = store.surveys;
  return Array.isArray(surveysData) ? surveysData : [];
});
const loading = computed(() => store.isLoading || false);
const selectedSurveyId = computed({
  get: () => executionManagement.selectedSurveyId.value,
  set: (value) => executionManagement.selectedSurveyId.value = value
});

// Table setup
const { getTableColumns } = useExecutionTable();
const tableColumns = getTableColumns();

// Helper functions
const getStatusLabel = (status: string) => {
  switch (status) {
    case "draft": return "Borrador";
    case "active": return "Activo";
    case "closed": return "Cerrado";
    case "archived": return "Archivado";
    default: return status;
  }
};

// Event handlers
const handleCreateExecution = async () => {
  if (!selectedSurveyId.value) return;
  
  try {
    await executionManagement.createExecutionWithPrompt(selectedSurveyId.value);
  } catch (err) {
    console.error("Error creating execution:", err);
  }
};

const handleExportResults = async () => {
  if (!selectedSurveyId.value) return;
  
  try {
    await executionManagement.exportSurveyResults(selectedSurveyId.value);
  } catch (err) {
    console.error("Error exporting results:", err);
  }
};

// Watcher for survey selection changes
watch(selectedSurveyId, async (newId) => {
  await nextTick();
  if (newId && executionTableRef.value) {
    executionTableRef.value.fetchData();
  }
});
</script>

<template>
  <div class="space-y-6">
    <!-- No Brand Selected State -->
    <div v-if="!hasBrandSelected" class="text-center py-16">
      <div class="text-6xl mb-4">⚙️</div>
      <h3 class="text-2xl font-bold text-gray-700 mb-2">Selecciona una Marca</h3>
      <p class="text-gray-500">
        Selecciona una marca para gestionar las operaciones de tus estudios
      </p>
    </div>

    <!-- Brand Selected - Show Content -->
    <template v-else>
      <div>
        <h2 class="text-xl font-semibold mb-1">Operación y Ejecuciones</h2>
        <p class="text-sm text-gray-500 mb-4">
          Asigna evaluadores y gestiona las ejecuciones de tus estudios
        </p>
      </div>

      <!-- Survey Selection Card -->
      <div class="card bg-base-100 border border-gray-300 shadow-lg p-6">
        <div class="flex flex-col sm:flex-row gap-4 items-center">
          <select 
            class="select select-bordered flex-1" 
            v-model="selectedSurveyId"
          >
            <option :value="null" disabled>Selecciona un estudio...</option>
            <option 
              v-for="survey in surveys" 
              :key="survey.id" 
              :value="survey.id"
            >
              {{ survey.title }} ({{ getStatusLabel(survey.status) }})
            </option>
          </select>
          
          <button 
            class="btn btn-primary gap-2" 
            :disabled="!selectedSurveyId || loading"
            @click="handleCreateExecution"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Añadir Ejecución
          </button>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="!selectedSurveyId" class="text-center py-16">
        <div class="text-6xl mb-4">📋</div>
        <h3 class="text-xl font-bold text-gray-700 mb-2">Selecciona un Estudio</h3>
        <p class="text-gray-500">
          Selecciona un estudio en el selector superior para ver y gestionar sus ejecuciones
        </p>
      </div>
      
      <!-- Executions Table -->
      <div v-else>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Ejecuciones del Estudio</h3>
          <button 
            class="btn btn-sm btn-outline gap-2"
            @click="handleExportResults"
            :disabled="loading"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            Exportar
          </button>
        </div>
        
        <BaseTable
          ref="executionTableRef"
          :headers="tableColumns"
          :fetch-callback="executionManagement.fetchExecutionsForTable"
        />
      </div>
    </template>
  </div>
</template>
