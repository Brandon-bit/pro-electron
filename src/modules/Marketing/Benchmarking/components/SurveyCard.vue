<script setup lang="ts">
import { computed } from 'vue';
import type { Survey, Template } from '../types/benchmarkingTypes';
import { useSurveyManagement } from '../composables/useSurveyManagement';
import EntityCard from '@/shared/components/BaseCardEntity.vue';

interface Props {
  survey: Survey;
  template?: Template | null;
}

const props = withDefaults(defineProps<Props>(), {
  template: null
});

const emit = defineEmits<{
  edit: [survey: Survey];
  delete: [survey: Survey];
  share: [survey: Survey];
  'change-status': [survey: Survey, status: string];
  export: [survey: Survey];
}>();

const surveyManagement = useSurveyManagement();

// Computed properties with safe access
const statusLabel = computed(() => {
  return props.survey ? surveyManagement.getStatusLabel(props.survey.status) : '';
});

const statusColor = computed(() => {
  return props.survey ? surveyManagement.getStatusColor(props.survey.status) : '';
});

const typeLabel = computed(() => {
  return props.survey ? surveyManagement.getTypeLabel(props.survey.type) : '';
});

const typeColor = computed(() => {
  return props.survey ? surveyManagement.getTypeColor(props.survey.type) : '';
});

const templateName = computed(() => {
  return props.template?.name || 'N/A';
});

// Event handlers
const handleEdit = () => {
  if (props.survey) {
    emit('edit', props.survey);
  }
};

const handleShare = () => {
  if (props.survey) {
    emit('share', props.survey);
  }
};

const handleDelete = () => {
  if (props.survey) {
    emit('delete', props.survey);
  }
};

const handleChangeStatus = (newStatus: string) => {
  if (props.survey) {
    emit('change-status', props.survey, newStatus);
  }
};

const handleExport = () => {
  if (props.survey) {
    emit('export', props.survey);
  }
};

const copyPublicUrl = async () => {
  if (props.survey?.publicUrl) {
    await navigator.clipboard.writeText(props.survey.publicUrl);
  }
};
</script>

<template>
  <div v-if="survey">
    <EntityCard
      :title="survey.title || ''"
      :description="survey.description || ''"
      :statusLabel="statusLabel"
      :statusClass="statusColor"
    >
      <template #details>
        <div class="flex justify-between">
          <span class="text-gray-500">Tipo:</span>
          <span class="font-medium">
            <span :class="`badge ${typeColor} badge-xs`">
              {{ typeLabel }}
            </span>
          </span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Respuestas:</span>
          <span class="font-medium">{{ survey.responses || 0 }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-500">Plantilla:</span>
          <span class="font-medium truncate max-w-[50%] text-right">
            {{ templateName }}
          </span>
        </div>
        <div v-if="survey.publicUrl" class="flex justify-between items-center">
          <span class="text-gray-500">URL Pública:</span>
          <button 
            @click="copyPublicUrl"
            class="btn btn-xs btn-ghost"
            title="Copiar URL"
          >
            <span class="material-symbols-outlined">content_copy</span>
          </button>
        </div>
      </template>
    
    <template #actions>
      <button 
        @click="handleEdit" 
        class="btn btn-xs btn-outline"
      >
        <span class="material-symbols-outlined text-sm mr-1">edit</span> 
        Editar
      </button>
      
      <button 
        v-if="survey.type === 'benchmarking' && survey.status === 'active'"
        @click="handleShare" 
        class="btn btn-xs btn-outline"
      >
        <span class="material-symbols-outlined text-sm mr-1">share</span> 
        Compartir
      </button>
      
      <div class="dropdown dropdown-left">
        <button tabindex="0" class="btn btn-xs btn-ghost">
          <span class="material-symbols-outlined">more_vert</span>
        </button>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <li v-if="survey.status === 'draft'">
            <a @click="handleChangeStatus('active')">
              <span class="material-symbols-outlined">play_arrow</span>
              Activar
            </a>
          </li>
          <li v-if="survey.status === 'active'">
            <a @click="handleChangeStatus('closed')">
              <span class="material-symbols-outlined">stop</span>
              Cerrar
            </a>
          </li>
          <li v-if="survey.status === 'closed'">
            <a @click="handleChangeStatus('archived')">
              <span class="material-symbols-outlined">archive</span>
              Archivar
            </a>
          </li>
          <li>
            <a @click="handleExport" class="text-warning">
              <span class="material-symbols-outlined">download</span>
              Exportar
            </a>
          </li>
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
  </div>
</template>
