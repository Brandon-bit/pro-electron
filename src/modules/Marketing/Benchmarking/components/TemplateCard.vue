<script setup lang="ts">
import type { Template } from '../types/benchmarkingTypes';
import EntityCard from '@/shared/components/BaseCardEntity.vue';

interface Props {
  template: Template;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  edit: [template: Template];
  delete: [template: Template];
  manageQuestions: [template: Template];
}>();

// Event handlers
const handleEdit = () => {
  emit('edit', props.template);
};

const handleDelete = () => {
  emit('delete', props.template);
};

const handleManageQuestions = () => {
  emit('manageQuestions', props.template);
};
</script>

<template>
  <EntityCard
    :title="template.name"
    :description="template.description"
  >
    <template #details>
      <div class="flex justify-between">
        <span class="text-gray-500">Preguntas:</span>
        <span class="font-medium">{{ template.questions.length }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-500">Categoría:</span>
        <span class="font-medium">{{ template.category || 'General' }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-500">Tipo:</span>
        <span class="font-medium">
          <span :class="`badge ${template.isPublic ? 'badge-success' : 'badge-info'} badge-xs`">
            {{ template.isPublic ? 'Pública' : 'Privada' }}
          </span>
        </span>
      </div>
    </template>
    
    <template #actions>
      <button 
        @click="handleManageQuestions" 
        class="btn btn-xs btn-primary gap-1"
        title="Gestionar Preguntas"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
        </svg>
        Preguntas
      </button>
      
      <button 
        @click="handleEdit" 
        class="btn btn-xs btn-outline"
      >
        <span class="material-symbols-outlined text-sm mr-1">edit</span> 
        Editar
      </button>
      
      <div class="dropdown dropdown-left">
        <button tabindex="0" class="btn btn-xs btn-ghost">
          <span class="material-symbols-outlined">more_vert</span>
        </button>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a @click="handleDelete" class="text-error">
              <span class="material-symbols-outlined">delete</span>
              Eliminar
            </a>
          </li>
        </ul>
      </div>
    </template>
  </EntityCard>
</template>
