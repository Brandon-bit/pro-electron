<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Template, Survey, SurveyType } from '../types/benchmarkingTypes';

// --- 1. Props y Emits ---

// Define las props que el componente padre le pasará
const props = defineProps<{
  modelValue: boolean; // Usamos modelValue para poder usar v-model (para abrir/cerrar)
  templates: Template[]; // La lista de plantillas para el dropdown
}>();

// Define los eventos que este modal puede emitir
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void; // Para v-model
  (e: 'createSurvey', newSurveyData: Omit<Survey, 'id' | 'responses' | 'status' | 'createdAt'>): void;
}>();

// --- 2. Lógica Interna del Modal ---

const modalRef = ref<HTMLDialogElement | null>(null);

// Estado local para el formulario
const newSurvey = ref({
  type: 'benchmarking' as SurveyType,
  templateId: null as string | null,
  title: '',
  description: ''
});

// Resetea el formulario
const resetForm = () => {
  newSurvey.value = {
    type: 'benchmarking',
    templateId: null,
    title: '',
    description: ''
  };
};

// --- 3. Lógica de Emisión ---

// Cuando el usuario da clic en "Crear"
const handleCreateClick = () => {
  // 1. Emite la data del formulario al padre
  emit('createSurvey', {
    title: newSurvey.value.title,
    description: newSurvey.value.description,
    type: newSurvey.value.type,
    templateId: newSurvey.value.templateId || undefined // Convierte null a undefined
  });
  
  // 2. Cierra el modal (avisando al padre)
  closeModal();
};

// Cierra el modal (avisando al padre)
const closeModal = () => {
  emit('update:modelValue', false);
};

// --- 4. Sincronización con <dialog> ---

// Observa la prop 'modelValue' (que viene del v-model del padre)
// para abrir o cerrar el <dialog> de DaisyUI
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    resetForm();
    modalRef.value?.showModal();
  } else {
    modalRef.value?.close();
  }
});
</script>

<template>
  <dialog ref="modalRef" class="modal">
    <div class="modal-box w-11/12 max-w-2xl">
      <h3 class="font-bold text-lg">Crear Nuevo Estudio</h3>
      <p class="py-2 text-sm text-base-content/70">
        Configura los datos básicos de tu estudio de mercado
      </p>

      <div class="space-y-4 mt-4">
        
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Tipo de Estudio</span>
          </label>
          <select class="select select-bordered" v-model="newSurvey.type">
            <option value="benchmarking">Benchmarking</option>
            <option value="mystery">Mystery Shopper</option>
          </select>
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Plantilla (Opcional)</span>
          </label>
          <select class="select select-bordered" v-model="newSurvey.templateId">
            <option :value="null">Selecciona una plantilla</option>
            <option v-for="template in templates" :key="template.id" :value="template.id">
              {{ template.name }}
            </option>
          </select>
        </div>

        <div class="form-control w-full">
          <label class="label" for="title">
            <span class="label-text">Título del Estudio *</span>
          </label>
          <input
            type="text"
            id="title"
            v-model="newSurvey.title"
            placeholder="Ej: Análisis de Competencia Q1"
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control w-full">
          <label class="label" for="description">
            <span class="label-text">Descripción</span>
          </label>
          <textarea
            id="description"
            v-model="newSurvey.description"
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
          @click="handleCreateClick"
          :disabled="!newSurvey.title"
        >
          Crear Estudio
        </button>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal">close</button>
    </form>
  </dialog>
</template>