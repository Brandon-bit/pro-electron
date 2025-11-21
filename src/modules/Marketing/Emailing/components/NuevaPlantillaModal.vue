<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue';
import { useEmailingStore } from '@/store/emailing';
import EmailEditor from './EmailEditor.vue';
import type { Template } from '@/modules/Marketing/Emailing/types/emailingTypes';

// Props y Emits
const props = defineProps<{
  modelValue: boolean;
  plantillaEditar?: Template | null;
}>();

const tinyApiKey = ref(import.meta.env.VITE_TINY_MCE_API_KEY);
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'success'): void;
}>();

const emailStore = useEmailingStore();

// Detectar modo de edición
const isEditMode = computed(() => !!props.plantillaEditar);
const modalTitle = computed(() => isEditMode.value ? 'Editar Plantilla de Email' : 'Nueva Plantilla de Email');
const submitButtonText = computed(() => isEditMode.value ? 'Actualizar Plantilla' : 'Guardar Plantilla');

// Estado del formulario
const formData = ref({
  nombrePlantilla: '',
  asunto: '',
  contenidoHTML: ''
});

// Control para montaje/desmontaje del componente EmailEditor
// El componente hijo maneja toda la configuración de TinyMCE
const showEditorComponent = ref(false);

// Métodos
const resetForm = () => {
  formData.value = {
    nombrePlantilla: '',
    asunto: '',
    contenidoHTML: ''
  };
};

const handleSubmit = async () => {
  // 1. Validaciones
  if (!formData.value.nombrePlantilla || !formData.value.asunto) {
    alert('Por favor, completa los campos requeridos');
    return;
  }

  if (!emailStore.currentAccountId) {
    alert('Por favor, selecciona una marca antes de guardar la plantilla');
    return;
  }

  try {
    // 2. Guardar en Backend (Esperar a que termine)
    if (isEditMode.value && props.plantillaEditar) {
      await emailStore.updatePlantilla(props.plantillaEditar.id.toString(), {
        nombrePlantilla: formData.value.nombrePlantilla,
        asunto: formData.value.asunto,
        contenidoHTML: formData.value.contenidoHTML
      });
    } else {
      await emailStore.createPlantilla({
        nombrePlantilla: formData.value.nombrePlantilla,
        asunto: formData.value.asunto,
        contenidoHTML: formData.value.contenidoHTML,
        idMarca: emailStore.currentAccountId
      });
    }

    // 3. DESTRUCCIÓN CONTROLADA (El paso clave)
    // Primero, ocultamos el editor con el v-if
    showEditorComponent.value = false;
    
    // Esperamos a que Vue elimine físicamente el editor del DOM
    await nextTick();
    
    // Pequeña pausa de seguridad para el Garbage Collector de TinyMCE
    await new Promise(resolve => setTimeout(resolve, 50));

    // 4. AHORA sí cerramos el modal
    emit('update:modelValue', false);
    
    // 5. Emitir éxito para que el padre recargue si es necesario
    emit('success');

  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un error al guardar.');
    // Si falló, volvemos a mostrar el editor
    showEditorComponent.value = true;
  }
};

// Patrón de destrucción antes de cierre para evitar conflictos de DOM con TinyMCE
const closeModal = async () => {
  // 1. Destruir editor primero para evitar conflictos de DOM
  showEditorComponent.value = false;
  await nextTick();
  
  // 2. Ahora es seguro cerrar el modal
  emit('update:modelValue', false);
};

// Hard Reset Pattern: Destruir y recrear el editor completamente
// Observa tanto la apertura del modal como los cambios de plantilla
watch(
  () => [props.modelValue, props.plantillaEditar] as [boolean, Template | null],
  async ([isOpen, plantilla]: [boolean, Template | null]) => {
    // 1. SIEMPRE ocultar el editor primero (Destrucción)
    showEditorComponent.value = false;

    if (isOpen) {
      // 2. Esperar a que Vue elimine el editor del DOM
      await nextTick();

      // 3. Cargar los datos en las variables
      if (plantilla) {
        // Modo Edición
        formData.value = {
          nombrePlantilla: plantilla.nombrePlantilla,
          asunto: plantilla.asunto,
          contenidoHTML: plantilla.contenidoHTML || ''
        };
      } else {
        // Modo Creación
        resetForm();
      }

      // 4. Volver a mostrar el editor (Creación desde cero)
      // Un pequeño delay extra a veces ayuda a TinyMCE a limpiar sus iframes
      setTimeout(() => {
        showEditorComponent.value = true;
      }, 50);
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <div class="modal" :class="{'modal-open': modelValue}" role="dialog">
    <div class="modal-box w-11/12 max-w-4xl">
      <h3 class="font-bold text-lg">{{ modalTitle }}</h3>
      <p class="py-2 text-sm text-base-content/70">
        {{ isEditMode ? 'Modifica los datos de tu plantilla de email' : 'Crea una plantilla reutilizable para tus campañas de email marketing' }}
      </p>

      <!-- Formulario -->
      <div class="space-y-4 mt-4">
        <!-- Nombre de la Plantilla -->
        <div class="form-control w-full">
          <label class="label" for="plantilla-nombre">
            <span class="label-text">Nombre de la Plantilla *</span>
          </label>
          <input
            type="text"
            id="plantilla-nombre"
            v-model="formData.nombrePlantilla"
            placeholder="Ej: Bienvenida Clientes Nuevos"
            class="input input-bordered w-full"
            required
          />
        </div>

        <!-- Asunto del Email -->
        <div class="form-control w-full">
          <label class="label" for="plantilla-asunto">
            <span class="label-text">Asunto del Email *</span>
          </label>
          <input
            type="text"
            id="plantilla-asunto"
            v-model="formData.asunto"
            placeholder="Ej: ¡Bienvenido a nuestra comunidad!"
            class="input input-bordered w-full"
            required
          />
        </div>

        <!-- Editor de Texto Enriquecido (TinyMCE) -->
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Contenido HTML</span>
            <span class="label-text-alt" title="Puedes usar variables dinámicas: {{nombre}}, {{apellido}}, {{email}}, {{empresa}}">
              <div class="tooltip tooltip-left" data-tip="Puedes usar variables dinámicas: {{nombre}}, {{apellido}}, {{email}}, {{empresa}}">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </span>
          </label>
          <!-- Hard Reset: v-if destruye y recrea el componente EmailEditor completamente -->
          <EmailEditor 
            v-if="showEditorComponent"
            v-model="formData.contenidoHTML"
            :api-key="tinyApiKey"
          />
          <div v-else class="flex items-center justify-center h-[400px] bg-base-200 rounded-lg">
            <span class="loading loading-spinner loading-lg"></span>
          </div>
          <label class="label">
            <span class="label-text-alt text-gray-500">
              Usa el editor para crear el contenido de tu email
            </span>
          </label>
        </div>
      </div>

      <!-- Acciones del Modal -->
      <div class="modal-action mt-6">
        <button class="btn btn-ghost" @click="closeModal">Cancelar</button>
        <button 
          class="btn btn-primary" 
          @click="handleSubmit"
          :disabled="!formData.nombrePlantilla || !formData.asunto"
        >
          {{ submitButtonText }}
        </button>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal">close</button>
    </form>
  </div>
</template>

<style scoped>
/* Estilos adicionales para el editor si es necesario */
:deep(.tox-tinymce) {
  border-radius: 0.5rem;
}
</style>

<style>
/*
 * Corrección de Z-Index para TinyMCE dentro de un Modal
 *
 * Forzamos a los menús auxiliares de TinyMCE (dropdowns, popups)
 * a tener un z-index más alto que el modal (que suele ser 1000-1100).
 */
.tox-tinymce-aux { 
  z-index: 99999 !important; 
}
</style>
