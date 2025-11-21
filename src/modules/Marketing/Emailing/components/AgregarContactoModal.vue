<script setup lang="ts">
import { ref, watch } from 'vue';
import { useEmailingStore } from '@/store/emailing';

const props = defineProps<{
  modelValue: boolean;
  idLista: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'created'): void;
}>();

const emailStore = useEmailingStore();

// Estado del formulario
const formData = ref({
  email: '',
  nombre: '',
  apellido: '',
  telefono: '',
  empresa: '',
  cargo: ''
});

// Métodos
const resetForm = () => {
  formData.value = {
    email: '',
    nombre: '',
    apellido: '',
    telefono: '',
    empresa: '',
    cargo: ''
  };
};

const handleSubmit = async () => {
  if (!formData.value.email.trim()) {
    alert('Por favor, ingresa un email');
    return;
  }

  if (!props.idLista) {
    alert('No se ha seleccionado una lista');
    return;
  }

  try {
    await emailStore.addContacto(props.idLista, {
      email: formData.value.email,
      nombre: formData.value.nombre || undefined,
      apellido: formData.value.apellido || undefined,
      telefono: formData.value.telefono || undefined,
      empresa: formData.value.empresa || undefined,
      cargo: formData.value.cargo || undefined
    });
    
    // Emitir evento de creación exitosa
    emit('created');
    closeModal();
  } catch (error) {
    console.error('Error al agregar contacto:', error);
    alert('Error al agregar el contacto. Por favor, intenta de nuevo.');
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
      <h3 class="font-bold text-lg">Agregar Contacto</h3>
      <p class="py-2 text-sm text-base-content/70">
        Agrega un nuevo contacto a la lista
      </p>

      <!-- Formulario -->
      <div class="space-y-4 mt-4">
        <!-- Email (Requerido) -->
        <div class="form-control w-full">
          <label class="label" for="contacto-email">
            <span class="label-text">Email *</span>
          </label>
          <input
            type="email"
            id="contacto-email"
            v-model="formData.email"
            placeholder="contacto@ejemplo.com"
            class="input input-bordered w-full"
            required
          />
        </div>

        <!-- Nombre y Apellido -->
        <div class="grid grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label" for="contacto-nombre">
              <span class="label-text">Nombre</span>
            </label>
            <input
              type="text"
              id="contacto-nombre"
              v-model="formData.nombre"
              placeholder="Juan"
              class="input input-bordered w-full"
            />
          </div>

          <div class="form-control">
            <label class="label" for="contacto-apellido">
              <span class="label-text">Apellido</span>
            </label>
            <input
              type="text"
              id="contacto-apellido"
              v-model="formData.apellido"
              placeholder="Pérez"
              class="input input-bordered w-full"
            />
          </div>
        </div>

        <!-- Teléfono -->
        <div class="form-control w-full">
          <label class="label" for="contacto-telefono">
            <span class="label-text">Teléfono</span>
          </label>
          <input
            type="tel"
            id="contacto-telefono"
            v-model="formData.telefono"
            placeholder="+52 555-1234"
            class="input input-bordered w-full"
          />
        </div>

        <!-- Empresa y Cargo -->
        <div class="grid grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label" for="contacto-empresa">
              <span class="label-text">Empresa</span>
            </label>
            <input
              type="text"
              id="contacto-empresa"
              v-model="formData.empresa"
              placeholder="Acme Inc"
              class="input input-bordered w-full"
            />
          </div>

          <div class="form-control">
            <label class="label" for="contacto-cargo">
              <span class="label-text">Cargo</span>
            </label>
            <input
              type="text"
              id="contacto-cargo"
              v-model="formData.cargo"
              placeholder="Gerente"
              class="input input-bordered w-full"
            />
          </div>
        </div>
      </div>

      <!-- Acciones del Modal -->
      <div class="modal-action mt-6">
        <button class="btn btn-ghost" @click="closeModal">Cancelar</button>
        <button 
          class="btn btn-primary" 
          @click="handleSubmit"
          :disabled="!formData.email.trim()"
        >
          Agregar Contacto
        </button>
      </div>
    </div>

    <!-- Backdrop clickeable para cerrar -->
    <div class="modal-backdrop" @click="closeModal"></div>
  </div>
</template>
