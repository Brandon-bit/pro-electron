<script setup lang="ts">
import { computed } from 'vue';
import { useBenchmarkingStore } from '@/store/benchmarking';
import { useSurveyManagement } from '../composables/useSurveyManagement';
import EntityCard from '@/shared/components/BaseCardEntity.vue';
import SurveyCard from './SurveyCard.vue';

// Emits
const emit = defineEmits<{
  (e: 'edit-survey', survey: any): void;
  (e: 'share-survey', survey: any): void;
}>();

const store = useBenchmarkingStore();
const surveyManagement = useSurveyManagement();


// Check if a brand is selected
const hasBrandSelected = computed(() => !!store.selectedBrandId);

// Computed properties with safe defaults
const surveys = computed(() => { 
  const surveysData = surveyManagement.surveys.value;  
  return Array.isArray(surveysData) ? surveysData : [];
});
const loading = computed(() => surveyManagement.loading.value || false);
const templates = computed(() => {
  const templatesData = store.templates;
  return Array.isArray(templatesData) ? templatesData : [];
});

// Modal state from store
const isStudyModalOpen = computed(() => store.isStudyModalOpen);
const isEditSurveyModalOpen = computed(() => store.isEditSurveyModalOpen);
const surveyToEdit = computed(() => store.surveyToEdit);

// Event handlers
const handleCreateSurvey = () => {
  surveyManagement.openCreateModal();
};

const handleEditSurvey = (survey: any) => { 
  emit('edit-survey', survey);
};

const handleDeleteSurvey = async (survey: any) => {
  if (confirm(`¿Estás seguro de eliminar "${survey.title}"?`)) {
    try {
      await surveyManagement.deleteSurvey(survey.id);
    } catch (err) {
      console.error("Error deleting survey:", err);
    }
  }
};

const handleShareSurvey = async (survey: any) => {
  emit('share-survey', survey);
};

const handleChangeStatus = async (survey: any, newStatus: string) => {
  try {
    await surveyManagement.changeSurveyStatus(survey.id, newStatus);
  } catch (err) {
    console.error("Error changing status:", err);
  }
};

const handleExportResults = async (survey: any) => {
  try {
    await surveyManagement.exportResults(survey.id);
  } catch (err) {
    console.error("Error exporting results:", err);
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- No Brand Selected State -->
    <div v-if="!hasBrandSelected" class="text-center py-16">
      <div class="text-6xl mb-4">🏢</div>
      <h3 class="text-2xl font-bold text-gray-700 mb-2">Selecciona una Marca</h3>
      <p class="text-gray-500 mb-6">
        Para comenzar a crear estudios de Benchmarking, primero selecciona una marca en el selector superior.
      </p>
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 max-w-md mx-auto text-left">
        <p class="text-sm text-gray-700">
          <strong>💡 Tip:</strong> Si no ves marcas disponibles, ve a 
          <strong>Gestión de Marcas</strong> para crear una nueva marca.
        </p>
      </div>
    </div>

    <!-- Brand Selected - Show Content -->
    <template v-else>
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-xl font-semibold">Estudios Creados</h2>
          <p class="text-sm text-gray-500 mt-1">
            Gestiona tus encuestas de Benchmarking y Mystery Shopper
          </p>
        </div>
        <button 
          class="btn btn-primary gap-2" 
          @click="handleCreateSurvey" 
          :disabled="loading"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Nuevo Estudio
        </button>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading && (!surveys || surveys.length === 0)" class="text-center py-12">
        <span class="loading loading-spinner loading-lg text-primary"></span>
        <p class="mt-4 text-gray-600">Cargando estudios...</p>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="!surveys || surveys.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">📊</div>
        <h3 class="text-xl font-bold text-gray-700 mb-2">No hay estudios creados</h3>
        
        <p class="text-gray-500 mb-6">
          Crea tu primer estudio de Benchmarking para comenzar a recopilar datos
        </p>
        <button 
          class="btn btn-primary btn-lg gap-2" 
          @click="handleCreateSurvey" 
           
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Crea tu primer estudio
        </button>
      </div>
      
      <!-- Survey Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SurveyCard
          v-for="survey in surveys.filter(s => s && s.id)"
          :key="survey.id"
          :survey="survey"
          :template="templates?.find((t: any) => t?.id === survey?.templateId) || null"
          @edit="handleEditSurvey"
          @delete="handleDeleteSurvey"
          @share="handleShareSurvey"
          @change-status="handleChangeStatus"
          @export="handleExportResults"
        /> 
      </div>
    </template>
  </div>
</template>
