<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useBenchmarkingStore } from '@/store/benchmarking';
import { storeToRefs } from 'pinia';
import EstudiosTab from '../components/EstudiosTab.vue';
import PlantillasTab from '../components/PlantillasTab.vue';
import OperacionTab from '../components/OperacionTab.vue';
import ResultadosTab from '../components/ResultadosTab.vue';
import CreateStudyModal from '../components/CreateStudyModal.vue';
import CreateTemplateModal from '../components/CreateTemplateModal.vue';
import EditStudyModal from '../components/EditStudyModal.vue';
import ShareSurveyModal from '../components/ShareSurveyModal.vue';
import ManageQuestionsModal from '../components/ManageQuestionsModal.vue';
import EditTemplateModal from '../components/EditTemplateModal.vue';

// Store
const benchmarkingStore = useBenchmarkingStore();

// Reactive refs from store using storeToRefs for reactivity
const { 
  brands, 
  isLoadingBrands, 
  selectedBrandId,
  currentError,
  isStudyModalOpen,
  isTemplateModalOpen,
  templates,
  surveys
} = storeToRefs(benchmarkingStore);

// Local state for edit and share modals
const isEditModalOpen = ref(false);
const isShareModalOpen = ref(false);
const surveyToEdit = ref<any>(null);
const surveyToShare = ref<any>(null);

// Local state for questions modal
const isQuestionsModalOpen = ref(false);
const templateForQuestions = ref<any>(null);

// Local state for edit template modal
const isEditTemplateModalOpen = ref(false);
const templateToEdit = ref<any>(null);

// Local reactive state
const currentTab = ref('estudios');

// Computed properties
const activeTabComponent = computed(() => {
  switch (currentTab.value) {
    case 'estudios': return EstudiosTab;
    case 'plantillas': return PlantillasTab;
    case 'operacion': return OperacionTab;
    case 'resultados': return ResultadosTab;
    default: return EstudiosTab;
  }
});

// Data loading function
const loadData = async () => {
  if (!benchmarkingStore.selectedBrandId) {
    console.warn('No brand selected')
    return
  }
  
  try {
    await Promise.all([
      benchmarkingStore.fetchSurveys(),
      benchmarkingStore.fetchTemplates()
    ]);
  } catch (err) {
    console.error("Error loading data:", err);
  }
};

// Modal handlers - delegated to store
const handleSurveyCreated = async (newSurveyData: any) => {
  try {
    // El backend obtiene el accountId desde los claims del token
    await benchmarkingStore.createSurvey({
      ...newSurveyData,
      brandId: benchmarkingStore.selectedBrandId // El ID de la marca seleccionada
    });
    benchmarkingStore.closeStudyModal();
  } catch (err) {
    console.error("Error creating survey:", err);
  }
};

const handleTemplateCreated = async (newTemplateData: any) => {
  try {
    // El backend obtiene el accountId desde los claims del token
    const newTemplate = await benchmarkingStore.createTemplate({
      ...newTemplateData,
      brandId: benchmarkingStore.selectedBrandId, // El ID de la marca seleccionada
      isPublic: false,
      questions: []
    });
    
    benchmarkingStore.closeTemplateModal();
    
    // Abrir modal de preguntas inmediatamente después de crear
    if (newTemplate) {
      templateForQuestions.value = newTemplate;
      isQuestionsModalOpen.value = true;
    }
  } catch (err) {
    console.error("Error creating template:", err);
  }
};

// Manage questions handler
const handleManageQuestions = (template: any) => {
  templateForQuestions.value = template;
  isQuestionsModalOpen.value = true;
};

// Edit template handler
const handleEditTemplate = (template: any) => {
  templateToEdit.value = template;
  isEditTemplateModalOpen.value = true;
};

const handleUpdateTemplate = async (templateId: string, updatedData: any) => {
  try { 
    updatedData.brandId = benchmarkingStore.selectedBrandId; 
    await benchmarkingStore.updateTemplate(templateId, updatedData);
    isEditTemplateModalOpen.value = false;
    templateToEdit.value = null;
    // Recargar plantillas
    await benchmarkingStore.fetchTemplates();
  } catch (err) {
    console.error("Error updating template:", err);
    alert('Error al actualizar la plantilla. Por favor intenta de nuevo.');
  }
};

const handleSaveQuestions = async (templateId: string, questions: any[]) => {
  try {
    // Obtener la plantilla completa para enviar todos los campos requeridos
    const template = templateForQuestions.value;
    
    if (!template) {
      throw new Error('No se encontró la plantilla');
    }
    
    // Enviar todos los campos requeridos por el backend (TemplateRequest)
    // El backend obtiene accountId desde los claims del token
    await benchmarkingStore.updateTemplate(templateId, {
      name: template.name,
      description: template.description || '', // Backend requiere Description
      isPublic: template.isPublic ?? false,
      category: template.category || null,
      brandId: template.brandId,
      questions
    });
    
    isQuestionsModalOpen.value = false;
    templateForQuestions.value = null;
    // Recargar plantillas
    await benchmarkingStore.fetchTemplates();
  } catch (err) {
    console.error("Error saving questions:", err);
    alert('Error al guardar las preguntas. Por favor intenta de nuevo.');
  }
};

// Edit survey handler
const handleEditSurvey = (survey: any) => {
  surveyToEdit.value = survey;
  isEditModalOpen.value = true;
};

const handleUpdateSurvey = async (surveyId: string, updatedData: any) => {
  try {
    await benchmarkingStore.updateSurvey(surveyId, updatedData);
    isEditModalOpen.value = false;
    surveyToEdit.value = null;
  } catch (err) {
    console.error("Error updating survey:", err);
  }
};

// Share survey handler
const handleShareSurvey = (survey: any) => {
  surveyToShare.value = survey;
  isShareModalOpen.value = true;
};

const handleGeneratePublicUrl = async (surveyId: string) => {
  try {
    const publicUrl = await benchmarkingStore.generatePublicUrl(surveyId);
    // Recargar surveys para obtener la URL actualizada
    await benchmarkingStore.fetchSurveys();
    // Actualizar el survey local con la nueva URL
    if (publicUrl && surveyToShare.value && typeof surveyToShare.value === 'object') {
      surveyToShare.value = { ...surveyToShare.value, publicUrl };
    }
  } catch (err) {
    console.error("Error generating public URL:", err);
  }
};

// Watcher for brand changes
watch(selectedBrandId, async (newBrandId) => {
  if (newBrandId) {
    await loadData()
  }
});

// Lifecycle
onMounted(async () => {
  // Load brands first
  await benchmarkingStore.fetchBrands()
  // Then load data if brand is selected
  if (benchmarkingStore.selectedBrandId) {
    await loadData()
  }
});

</script>

<template>
  <div class="p-4 sm:p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold">Benchmarking & Mystery Shopper</h1>
        <p class="text-muted-foreground mt-2">
          Sistema avanzado de investigación de mercado y evaluación
        </p>
      </div>
      
      <!-- Dynamic Brand Selector -->
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600">Marca:</span>
        
        <!-- Loading State -->
        <div v-if="isLoadingBrands" class="flex items-center gap-2">
          <span class="loading loading-spinner loading-sm"></span>
          <span class="text-sm text-gray-500">Cargando marcas...</span>
        </div>
        
        <!-- Brand Selector -->
        <select 
          v-else-if="brands.length > 0"
          v-model="benchmarkingStore.selectedBrandId"
          class="select select-bordered select-sm"
          @change="loadData"
        >
          <option value="">Seleccionar marca</option>
          <option 
            v-for="brand in brands" 
            :key="brand.id" 
            :value="brand.id"
          >
            {{ brand.name }}
          </option>
        </select>
        
        <!-- No Brands State -->
        <div v-else class="text-sm text-gray-500">
          No se encontraron marcas.
        </div>
      </div>
    </div>

    <!-- Error Display -->
    <div v-if="currentError" class="alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ currentError }}</span>
      <button @click="benchmarkingStore.clearError()" class="btn btn-sm btn-ghost">✕</button>
    </div>

    <!-- Tabs -->
    <div class="w-full">
      <!-- Tab Headers -->
      <div class="tabs tabs-boxed bg-base-200 mb-4">
        <a 
          class="tab tab-lg"
          :class="{ 'tab-active': currentTab === 'estudios' }"
          @click="currentTab = 'estudios'"
        >
          📊 Estudios
        </a>
        <a 
          class="tab tab-lg"
          :class="{ 'tab-active': currentTab === 'plantillas' }"
          @click="currentTab = 'plantillas'"
        >
          📝 Plantillas
        </a>
        <a 
          class="tab tab-lg"
          :class="{ 'tab-active': currentTab === 'operacion' }"
          @click="currentTab = 'operacion'"
        >
          ⚙️ Operación
        </a>
        <a 
          class="tab tab-lg"
          :class="{ 'tab-active': currentTab === 'resultados' }"
          @click="currentTab = 'resultados'"
        >
          📈 Resultados
        </a>
      </div>
      
      <!-- Tab Content -->
      <div class="bg-base-100 rounded-box p-6 shadow-lg min-h-[500px]">
        <component 
          :is="activeTabComponent"
          @edit-survey="handleEditSurvey"
          @share-survey="handleShareSurvey"
          @manage-questions="handleManageQuestions"
          @edit-template="handleEditTemplate"
        />
      </div>
    </div>

    <!-- Modals -->
    <CreateStudyModal
      v-model="isStudyModalOpen"
      :templates="benchmarkingStore.templates"
      @create-survey="handleSurveyCreated"
    />
    
    <CreateTemplateModal
      v-model="isTemplateModalOpen"
      @create-template="handleTemplateCreated"
    />

    <EditStudyModal
      v-model="isEditModalOpen"
      :survey="surveyToEdit"
      :templates="benchmarkingStore.templates"
      @update-survey="handleUpdateSurvey"
    />

    <ShareSurveyModal
      v-model="isShareModalOpen"
      :survey="surveyToShare"
      @generate-url="handleGeneratePublicUrl"
    />

    <ManageQuestionsModal
      v-model="isQuestionsModalOpen"
      :template="templateForQuestions"
      @save-questions="handleSaveQuestions"
    />

    <EditTemplateModal
      v-model="isEditTemplateModalOpen"
      :template="templateToEdit"
      @update-template="handleUpdateTemplate"
    />
  </div>
</template>

<style scoped>
.tab-content {
  min-height: 400px;
}
.tabs-bordered .tab {
  border-bottom-width: 2px;
}
.tabs-bordered input[type="radio"]:checked + .tab {
  border-color: hsl(var(--bc)) hsl(var(--bc)) transparent;
  border-bottom-color: transparent;
}
.btn-xs .material-symbols-outlined {
  font-size: 1rem;
  vertical-align: middle;
}
.dropdown-content {
  z-index: 50;
}
</style>