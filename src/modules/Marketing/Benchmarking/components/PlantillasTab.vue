<script setup lang="ts">
import { computed } from 'vue';
import { useBenchmarkingStore } from '@/store/benchmarking';
import { useTemplateManagement } from '../composables/useTemplateManagement';
import TemplateCard from './TemplateCard.vue';

// Emits
const emit = defineEmits<{
  (e: 'manage-questions', template: any): void;
  (e: 'edit-template', template: any): void;
}>();

const store = useBenchmarkingStore();
const templateManagement = useTemplateManagement();

// Check if a brand is selected
const hasBrandSelected = computed(() => !!store.selectedBrandId);

// Computed properties with safe defaults
const filteredTemplates = computed(() => {
  const templatesData = templateManagement.filteredTemplates.value;
  return Array.isArray(templatesData) ? templatesData : [];
});
const loading = computed(() => templateManagement.loading.value || false);
const searchTerm = computed({
  get: () => templateManagement.searchTerm.value,
  set: (value) => templateManagement.searchTerm.value = value
});

// Event handlers
const handleCreateTemplate = () => {
  templateManagement.openCreateModal();
};

const handleEditTemplate = (template: any) => {
  emit('edit-template', template);
};

const handleDeleteTemplate = async (template: any) => {
  if (confirm(`¿Estás seguro de eliminar "${template.name}"?`)) {
    try {
      await templateManagement.deleteTemplate(template.id);
    } catch (err) {
      console.error("Error deleting template:", err);
    }
  }
};

const handleManageQuestions = (template: any) => {
  emit('manage-questions', template);
};
</script>

<template>
  <div class="space-y-6">
    <!-- No Brand Selected State -->
    <div v-if="!hasBrandSelected" class="text-center py-16">
      <div class="text-6xl mb-4">📝</div>
      <h3 class="text-2xl font-bold text-gray-700 mb-2">Selecciona una Marca</h3>
      <p class="text-gray-500 mb-6">
        Selecciona una marca para gestionar plantillas de preguntas
      </p>
    </div>

    <!-- Brand Selected - Show Content -->
    <template v-else>
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 class="text-xl font-semibold">Plantillas de Preguntas</h2>
          <p class="text-sm text-gray-500 mt-1">
            Crea y gestiona plantillas reutilizables para tus encuestas
          </p>
        </div>
        <div class="flex gap-2">
          <input
            type="text"
            placeholder="Buscar plantillas..."
            class="input input-bordered input-sm"
            v-model="searchTerm"
          />
          <button 
            class="btn btn-primary gap-2" 
            @click="handleCreateTemplate"
            :disabled="loading"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Nueva Plantilla
          </button>
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading && (!filteredTemplates || filteredTemplates.length === 0)" class="text-center py-12">
        <span class="loading loading-spinner loading-lg text-primary"></span>
        <p class="mt-4 text-gray-600">Cargando plantillas...</p>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="!filteredTemplates || filteredTemplates.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">📋</div>
        <h3 class="text-xl font-bold text-gray-700 mb-2">No hay plantillas</h3>
        <p class="text-gray-500 mb-6">
          {{ searchTerm ? 'No se encontraron plantillas con ese criterio' : 'Crea tu primera plantilla de preguntas para reutilizarla en múltiples estudios' }}
        </p>
        <button 
          v-if="!searchTerm"
          class="btn btn-primary btn-lg gap-2" 
          @click="handleCreateTemplate"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Crear Primera Plantilla
        </button>
      </div>
      
      <!-- Template Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TemplateCard
          v-for="template in filteredTemplates.filter(t => t && t.id)"
          :key="template.id"
          :template="template"
          @edit="handleEditTemplate"
          @delete="handleDeleteTemplate"
          @manage-questions="handleManageQuestions"
        />
      </div>
    </template>
  </div>
</template>
