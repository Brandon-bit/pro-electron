<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Template, Survey, SurveyType } from '../types/benchmarkingTypes';

// Props y Emits
const props = defineProps<{
  modelValue: boolean;
  survey: Survey | null;
  templates: Template[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'updateSurvey', surveyId: string, updatedData: Partial<Survey>): void;
}>();

// Lógica Interna del Modal
const modalRef = ref<HTMLDialogElement | null>(null);

// Estado local para el formulario
const editSurvey = ref({
  type: 'benchmarking' as SurveyType,
  templateId: null as string | null,
  title: '',
  description: ''
});

// Cargar datos del survey cuando se abre el modal
const loadSurveyData = () => {
  if (props.survey) {
    editSurvey.value = {
      type: props.survey.type,
      templateId: props.survey.templateId || null,
      title: props.survey.title,
      description: props.survey.description || ''
    };
  }
};

// Resetea el formulario
const resetForm = () => {
  editSurvey.value = {
    type: 'benchmarking',
    templateId: null,
    title: '',
    description: ''
  };
};

// Lógica de Emisión
const handleUpdateClick = () => {
  if (!props.survey) return;
  
  // Emite la data actualizada al padre
  emit('updateSurvey', props.survey.id, {
    title: editSurvey.value.title,
    description: editSurvey.value.description,
    type: editSurvey.value.type,
    accountId: props.survey.accountId,
    brandId: props.survey.brandId,
    createdAt: props.survey.createdAt,
    updatedAt: new Date().toISOString(),
    createdBy: props.survey.createdBy, 
    status: props.survey.status,
    templateId: editSurvey.value.templateId || undefined
  });
  console.log('props de survey:', props.survey);
  
  // Cierra el modal
  closeModal();
};

// Cierra el modal
const closeModal = () => {
  emit('update:modelValue', false);
};

// Sincronización con <dialog>
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    loadSurveyData();
    modalRef.value?.showModal();
  } else {
    modalRef.value?.close();
  }
});
</script>

<template>
  <dialog ref="modalRef" class="modal">
    <div class="modal-box w-11/12 max-w-2xl">
      <h3 class="font-bold text-lg">Editar Estudio</h3>
      <p class="py-2 text-sm text-base-content/70">
        Modifica los datos de tu estudio de mercado
      </p>

      <div class="space-y-4 mt-4">
        
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Tipo de Estudio</span>
          </label>
          <select class="select select-bordered" v-model="editSurvey.type">
            <option value="benchmarking">Benchmarking</option>
            <option value="mystery">Mystery Shopper</option>
          </select>
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Plantilla (Opcional)</span>
          </label>
          <select class="select select-bordered" v-model="editSurvey.templateId">
            <option :value="null">Selecciona una plantilla</option>
            <option v-for="template in templates" :key="template.id" :value="template.id">
              {{ template.name }}
            </option>
          </select>
        </div>

        <div class="form-control w-full">
          <label class="label" for="edit-title">
            <span class="label-text">Título del Estudio *</span>
          </label>
          <input
            type="text"
            id="edit-title"
            v-model="editSurvey.title"
            placeholder="Ej: Análisis de Competencia Q1"
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control w-full">
          <label class="label" for="edit-description">
            <span class="label-text">Descripción</span>
          </label>
          <textarea
            id="edit-description"
            v-model="editSurvey.description"
            placeholder="Describe el objetivo de este estudio..."
            class="textarea textarea-bordered w-full"
            rows="4"
          ></textarea>
        </div>
      </div>

      <div class="modal-action mt-6">
        <button class="btn btn-ghost" @click="closeModal">Cancelar</button>
        <button 
          class="btn btn-primary" 
          @click="handleUpdateClick"
          :disabled="!editSurvey.title"
        >
          Guardar Cambios
        </button>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal">close</button>
    </form>
  </dialog>
</template>
