<script setup lang="ts">
import { ref, watch } from 'vue';
import { useEmailingStore } from '@/store/emailing';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'created'): void;
}>();

const emailStore = useEmailingStore();

// Estado del formulario
const formData = ref({
  nombreLista: '',
  descripcion: ''
});

// Métodos
const resetForm = () => {
  formData.value = {
    nombreLista: '',
    descripcion: ''
  };
};

const handleSubmit = async () => {
  if (!formData.value.nombreLista.trim()) {
    alert('Por favor, ingresa un nombre para la lista');
    return;
  }

  try {
    await emailStore.createLista({
      nombreLista: formData.value.nombreLista,
      descripcion: formData.value.descripcion
    });
    
    // Emitir evento de creación exitosa
    emit('created');
    closeModal();
  } catch (error) {
    console.error('Error al crear lista:', error);
    alert('Error al crear la lista. Por favor, intenta de nuevo.');
  }
};

const closeModal = () => {
  emit('update:modelValue', false);
};

// Sincronizar el v-model
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    resetForm();
  }
});
</script>

<template>
  <div class="modal" :class="{'modal-open': modelValue}" role="dialog">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Nueva Lista de Audiencia</h3>
      <p class="py-2 text-sm text-base-content/70">
        Crea una lista para organizar tus contactos
      </p>

      <!-- Formulario -->
      <div class="space-y-4 mt-4">
        <!-- Nombre de la Lista -->
        <div class="form-control w-full">
          <label class="label" for="lista-nombre">
            <span class="label-text">Nombre de la Lista *</span>
          </label>
          <input
            type="text"
            id="lista-nombre"
            v-model="formData.nombreLista"
            placeholder="Ej: Clientes VIP 2025"
            class="input input-bordered w-full"
            required
          />
        </div>

        <!-- Descripción -->
        <div class="form-control w-full">
          <label class="label" for="lista-descripcion">
            <span class="label-text">Descripción</span>
          </label>
          <textarea
            id="lista-descripcion"
            v-model="formData.descripcion"
            placeholder="Breve descripción de esta lista..."
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
          @click="handleSubmit"
          :disabled="!formData.nombreLista.trim()"
        >
          Crear Lista
        </button>
      </div>
    </div>

    <!-- Backdrop clickeable para cerrar -->
    <div class="modal-backdrop" @click="closeModal"></div>
  </div>
</template>
