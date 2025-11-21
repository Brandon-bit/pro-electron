<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Template } from '../types/benchmarkingTypes';

// Props y Emits
const props = defineProps<{
  modelValue: boolean;
  template: Template | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'updateTemplate', templateId: string, updatedData: Partial<Template>): void;
}>();

// Lógica Interna del Modal
const modalRef = ref<HTMLDialogElement | null>(null);

// Estado local para el formulario
const editTemplate = ref({
  name: '',
  description: '',
  category: '',
  isPublic: false
});

// Cargar datos del template cuando se abre el modal
const loadTemplateData = () => {
  if (props.template) {
    editTemplate.value = {
      name: props.template.name,
      description: props.template.description || '',
      category: props.template.category || '',
      isPublic: props.template.isPublic
    };
  }
};

// Resetea el formulario
const resetForm = () => {
  editTemplate.value = {
    name: '',
    description: '',
    category: '',
    isPublic: false
  };
};

// Lógica de Emisión
const handleUpdateClick = () => {
  if (!props.template) return;
  
  // Emite la data actualizada al padre
  emit('updateTemplate', props.template.id, {
    name: editTemplate.value.name,
    description: editTemplate.value.description,
    category: editTemplate.value.category,
    isPublic: editTemplate.value.isPublic,
    accountId: props.template.accountId,
    questions: props.template.questions // Mantener las preguntas existentes
  });
  
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
    loadTemplateData();
    modalRef.value?.showModal();
  } else {
    modalRef.value?.close();
  }
});
</script>

<template>
  <dialog ref="modalRef" class="modal">
    <div class="modal-box w-11/12 max-w-2xl">
      <h3 class="font-bold text-lg">Editar Plantilla</h3>
      <p class="py-2 text-sm text-base-content/70">
        Modifica los datos de tu plantilla
      </p>

      <div class="space-y-4 mt-4">
        
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Nombre de la Plantilla *</span>
          </label>
          <input
            type="text"
            v-model="editTemplate.name"
            placeholder="Ej: Evaluación de Servicio al Cliente"
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Descripción</span>
          </label>
          <textarea
            v-model="editTemplate.description"
            placeholder="Describe el propósito de esta plantilla..."
            class="textarea textarea-bordered w-full"
            rows="3"
          ></textarea>
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Categoría</span>
          </label>
          <input
            type="text"
            v-model="editTemplate.category"
            placeholder="Ej: Servicio al Cliente"
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control">
          <label class="label cursor-pointer justify-start gap-3">
            <input
              v-model="editTemplate.isPublic"
              type="checkbox"
              class="checkbox checkbox-primary"
            />
            <span class="label-text font-semibold">Plantilla Pública</span>
          </label>
          <p class="text-xs text-gray-500 ml-9">
            Las plantillas públicas pueden ser usadas por otros usuarios
          </p>
        </div>
      </div>

      <div class="modal-action mt-6">
        <button class="btn btn-ghost" @click="closeModal">Cancelar</button>
        <button 
          class="btn btn-primary" 
          @click="handleUpdateClick"
          :disabled="!editTemplate.name"
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
