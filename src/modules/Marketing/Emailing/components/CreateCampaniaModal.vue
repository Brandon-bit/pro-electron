<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useEmailingStore } from '@/store/emailing';
import type { Campania } from '../types/emailingTypes';

const props = defineProps<{
  modelValue: boolean;
  campaniaEditar?: Campania | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const emailStore = useEmailingStore();
const { plantillas, listas } = storeToRefs(emailStore);

// Estado del formulario
const formData = ref({
  titulo: '',
  asunto: '',
  idPlantilla: '',
  idLista: '',
  esBorrador: true,
  fechaProgramada: ''
});

const isFormValid = computed(() => {
  return formData.value.titulo.trim() && 
         formData.value.asunto.trim() && 
         formData.value.idPlantilla && 
         formData.value.idLista &&
         (formData.value.esBorrador || formData.value.fechaProgramada);
});

const isEditMode = computed(() => !!props.campaniaEditar);

// Métodos
const resetForm = () => {
  formData.value = {
    titulo: '',
    asunto: '',
    idPlantilla: '',
    idLista: '',
    esBorrador: true,
    fechaProgramada: ''
  };
};

const loadCampaniaData = () => {
  if (props.campaniaEditar) {
    // Mapear campos del backend a nombres del frontend
    const titulo = props.campaniaEditar.nombreCampania || props.campaniaEditar.titulo || '';
    const asunto = props.campaniaEditar.asunto || '';
    
    // Convertir IDs a string para asegurar compatibilidad con v-model de selects
    const idPlantillaStr = props.campaniaEditar.idPlantilla?.toString() || '';
    const idListaStr = (props.campaniaEditar.idListaAsociada || props.campaniaEditar.idLista)?.toString() || '';
    
    // Determinar estado desde campo del backend
    const estado = props.campaniaEditar.estadoCampania || props.campaniaEditar.estado || '';
    const esBorrador = estado.toLowerCase() === 'borrador' || estado.toLowerCase() === 'draft';
    
    formData.value = {
      titulo: titulo,
      asunto: asunto,
      idPlantilla: idPlantillaStr,
      idLista: idListaStr,
      esBorrador: esBorrador,
      fechaProgramada: props.campaniaEditar.fechaProgramada || ''
    };
  } else {
    resetForm();
  }
};

const handleSubmit = async () => {
  if (!isFormValid.value) {
    alert('Por favor, completa todos los campos requeridos');
    return;
  }

  try {
    if (isEditMode.value && props.campaniaEditar) {
      // Modo edición
      await emailStore.updateCampania(props.campaniaEditar.id.toString(), {
        Titulo: formData.value.titulo,
        Asunto: formData.value.asunto,
        IdPlantilla: formData.value.idPlantilla,
        IdLista: formData.value.idLista
      });
    } else {
      // Modo creación
      await emailStore.createCampania({
        titulo: formData.value.titulo,
        asunto: formData.value.asunto,
        idPlantilla: formData.value.idPlantilla,
        idLista: formData.value.idLista,
        esBorrador: formData.value.esBorrador,
        fechaProgramada: formData.value.fechaProgramada || undefined
      });
    }
    
    closeModal();
  } catch (error) {
    console.error('Error al guardar campaña:', error);
    alert('Error al guardar la campaña. Por favor, intenta de nuevo.');
  }
};

const closeModal = () => {
  emit('update:modelValue', false);
};

// Sincronizar el v-model
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    loadCampaniaData();
  }
});
</script>

<template>
  <div class="modal" :class="{'modal-open': modelValue}" role="dialog">
    <div class="modal-box w-11/12 max-w-3xl">
      <h3 class="font-bold text-lg">
        {{ isEditMode ? 'Editar Campaña de Email' : 'Nueva Campaña de Email' }}
      </h3>
      <p class="py-2 text-sm text-base-content/70">
        {{ isEditMode ? 'Modifica los datos de tu campaña' : 'Configura y programa tu campaña de email marketing' }}
      </p>

      <!-- Formulario -->
      <div class="space-y-4 mt-4">
        <!-- Título (Nombre Interno) -->
        <div class="form-control w-full">
          <label class="label" for="campania-titulo">
            <span class="label-text">Título de la Campaña (Nombre Interno) *</span>
          </label>
          <input
            type="text"
            id="campania-titulo"
            v-model="formData.titulo"
            placeholder="Ej: Lanzamiento Producto Q1 2025"
            class="input input-bordered w-full"
            required
          />
        </div>

        <!-- Asunto del Email -->
        <div class="form-control w-full">
          <label class="label" for="campania-asunto">
            <span class="label-text">Asunto del Email *</span>
          </label>
          <input
            type="text"
            id="campania-asunto"
            v-model="formData.asunto"
            placeholder="Ej: ¡Descubre nuestro nuevo producto!"
            class="input input-bordered w-full"
            required
          />
          <label class="label">
            <span class="label-text-alt text-gray-500">
              Este será el asunto que verán los destinatarios
            </span>
          </label>
        </div>

        <!-- Seleccionar Plantilla -->
        <div class="form-control w-full">
          <label class="label" for="campania-plantilla">
            <span class="label-text">Seleccionar Plantilla *</span>
          </label>
          <select
            id="campania-plantilla"
            v-model="formData.idPlantilla"
            class="select select-bordered w-full"
            required
          >
            <option value="" disabled>Selecciona una plantilla</option>
            <option 
              v-for="plantilla in plantillas" 
              :key="plantilla.id" 
              :value="plantilla.id.toString()"
            >
              {{ plantilla.nombrePlantilla }}
            </option>
          </select>
          <label class="label" v-if="plantillas.length === 0">
            <span class="label-text-alt text-warning">
              No hay plantillas disponibles. Crea una primero en la pestaña Plantillas.
            </span>
          </label>
        </div>

        <!-- Seleccionar Lista de Audiencia -->
        <div class="form-control w-full">
          <label class="label" for="campania-lista">
            <span class="label-text">Seleccionar Audiencia *</span>
          </label>
          <select
            id="campania-lista"
            v-model="formData.idLista"
            class="select select-bordered w-full"
            required
          >
            <option value="" disabled>Selecciona una lista</option>
            <option 
              v-for="lista in listas" 
              :key="lista.id" 
              :value="lista.id.toString()"
            >
              {{ lista.nombreLista }} ({{ lista.totalContactos || 0 }} contactos)
            </option>
          </select>
          <label class="label" v-if="listas.length === 0">
            <span class="label-text-alt text-warning">
              No hay listas disponibles. Crea una primero en la pestaña Audiencias.
            </span>
          </label>
        </div>

        <!-- Divider - Solo en modo creación -->
        <div v-if="!isEditMode" class="divider">Estado de la Campaña</div>

        <!-- Estado: Borrador vs Programar - Solo en modo creación -->
        <div v-if="!isEditMode" class="form-control">
          <label class="label cursor-pointer justify-start gap-4">
            <input 
              type="radio" 
              name="estado-campania" 
              class="radio radio-primary" 
              :checked="formData.esBorrador"
              @change="formData.esBorrador = true"
            />
            <span class="label-text">
              <span class="font-semibold">Guardar como Borrador</span>
              <span class="block text-xs text-gray-500">La campaña no se enviará, solo se guardará para editar después</span>
            </span>
          </label>
        </div>

        <div v-if="!isEditMode" class="form-control">
          <label class="label cursor-pointer justify-start gap-4">
            <input 
              type="radio" 
              name="estado-campania" 
              class="radio radio-primary" 
              :checked="!formData.esBorrador"
              @change="formData.esBorrador = false"
            />
            <span class="label-text">
              <span class="font-semibold">Programar/Enviar</span>
              <span class="block text-xs text-gray-500">Selecciona una fecha para programar el envío</span>
            </span>
          </label>
        </div>

        <!-- Fecha Programada (solo si no es borrador y en modo creación) -->
        <div v-if="!isEditMode && !formData.esBorrador" class="form-control w-full ml-8">
          <label class="label" for="campania-fecha">
            <span class="label-text">Fecha y Hora de Envío *</span>
          </label>
          <input
            type="datetime-local"
            id="campania-fecha"
            v-model="formData.fechaProgramada"
            class="input input-bordered w-full"
            :required="!formData.esBorrador"
          />
        </div>
      </div>

      <!-- Acciones del Modal -->
      <div class="modal-action mt-6">
        <button class="btn btn-ghost" @click="closeModal">Cancelar</button>
        <button 
          class="btn btn-primary" 
          @click="handleSubmit"
          :disabled="!isFormValid"
        >
          {{ isEditMode ? 'Actualizar Campaña' : (formData.esBorrador ? 'Guardar Borrador' : 'Programar Campaña') }}
        </button>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal">close</button>
    </form>
  </div>
</template>
