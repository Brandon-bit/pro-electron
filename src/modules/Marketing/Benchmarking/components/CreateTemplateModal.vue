<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Template } from '../types/benchmarkingTypes';

// --- Props y Emits ---
const props = defineProps<{
  modelValue: boolean; // Para usar v-model
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  // Emite solo el nombre y la descripción, el padre se encargará del resto
  (e: 'createTemplate', newTemplateData: { name: string; description: string }): void;
}>();

// --- Lógica Interna del Modal ---
const modalRef = ref<HTMLDialogElement | null>(null);

const newTemplate = ref({
  name: '',
  description: ''
});

const resetForm = () => {
  newTemplate.value = { name: '', description: '' };
};

const handleCreateClick = () => {
  if (!newTemplate.value.name) return; // Validación simple

  // Emite los datos del formulario al componente padre
  emit('createTemplate', newTemplate.value);
  closeModal();
};

const closeModal = () => {
  emit('update:modelValue', false);
};

// Sincroniza el v-model del padre con el <dialog>
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
    <div class="modal-box w-11/12 max-w-lg">
      <h3 class="font-bold text-lg">Crear Nueva Plantilla</h3>
      <p class="py-2 text-sm text-base-content/70">
        Define el nombre y descripción de tu plantilla reutilizable.
      </p>

      <!-- Formulario del Modal -->
      <div class="space-y-4 mt-4">
        <!-- Nombre de la Plantilla -->
        <div class="form-control w-full">
          <label class="label" for="template-name">
            <span class="label-text">Nombre de la Plantilla *</span>
          </label>
          <input
            type="text"
            id="template-name"
            v-model="newTemplate.name"
            placeholder="Ej: Evaluación de Servicio al Cliente"
            class="input input-bordered w-full"
          />
        </div>

        <!-- Descripción -->
        <div class="form-control w-full">
          <label class="label" for="template-description">
            <span class="label-text">Descripción</span>
          </label>
          <textarea
            id="template-description"
            v-model="newTemplate.description"
            placeholder="Describe el propósito de esta plantilla..."
            class="textarea textarea-bordered w-full"
            rows="3"
          ></textarea>
        </div>
      </div>

      <!-- Acciones del Modal -->
      <div class="modal-action mt-6">
        <button class="btn btn-ghost" @click="closeModal">Cancelar</button>
        <button 
          class="btn btn-primary" 
          @click="handleCreateClick"
          :disabled="!newTemplate.name"
        >
          Crear y Diseñar
        </button>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal">close</button>
    </form>
  </dialog>
</template>