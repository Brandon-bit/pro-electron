<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useEmailingStore } from '@/store/emailing';
import { Mail, Plus, Edit, Trash2 } from 'lucide-vue-next';
import NuevaPlantillaModal from './NuevaPlantillaModal.vue';
import type { Template } from '@/modules/Marketing/Emailing/types/emailingTypes';

// Props
const props = defineProps<{
  idMarca: string; // ID de la marca actual
}>();

// Store
const emailingStore = useEmailingStore();

// Usar storeToRefs para mantener reactividad correcta
const { plantillas, isLoading } = storeToRefs(emailingStore);

// Estado local
const isModalOpen = ref(false);
const plantillaToEdit = ref<Template | null>(null);

// Computadas
const hasPlantillas = computed(() => plantillas.value.length > 0);

// Métodos
const openModal = () => {
  plantillaToEdit.value = null;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  plantillaToEdit.value = null;
};

const handleEditPlantilla = async (plantillaId: string | number) => {
  try {
    // Cargar el detalle completo de la plantilla (incluye contenidoHTML)
    const response: any = await emailingStore.fetchPlantillaById(plantillaId.toString());
    
    // El backend devuelve {success, message, data}, extraer solo data
    if (response && response.data) {
      plantillaToEdit.value = response.data;  // ✅ Extraer .data
      isModalOpen.value = true;
    }
  } catch (error) {
    console.error('Error cargando plantilla para editar:', error);
    alert('Error al cargar la plantilla. Por favor, intenta de nuevo.');
  }
};

const handleDeletePlantilla = async (plantillaId: string) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta plantilla?')) {
    try {
      await emailingStore.deletePlantilla(plantillaId);
    } catch (error) {
      console.error('Error deleting plantilla:', error);
      alert('Error al eliminar la plantilla. Por favor, intenta de nuevo.');
    }
  }
};

// Handler para cuando la plantilla se guarda exitosamente
const handlePlantillaSuccess = async () => {
  // 1. Recargar la lista de plantillas (usa currentAccountId del store)
  await emailingStore.fetchPlantillas();
  
  // 2. Cerrar el modal (después de que la recarga complete)
  isModalOpen.value = false;
  plantillaToEdit.value = null;
};

// Lifecycle
onMounted(async () => {
  // Cargar plantillas (usa currentAccountId del store)
  await emailingStore.fetchPlantillas();
});
</script>

<template>
  <div>
    <!-- Header con botón de Nueva Plantilla -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between items-center">
          <h2 class="card-title">Plantillas de Email</h2>
          <button class="btn btn-sm btn-primary" @click="openModal">
            <Plus class="mr-2 h-4 w-4" />
            Nueva Plantilla
          </button>
        </div>

        <!-- Estado de Carga -->
        <div v-if="isLoading" class="text-center py-12">
          <span class="loading loading-spinner loading-lg"></span>
          <p class="mt-4 text-gray-500">Cargando plantillas...</p>
        </div>

        <!-- Estado Vacío -->
        <div v-else-if="!hasPlantillas" class="text-center py-12 text-gray-500">
          <Mail class="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p class="font-semibold">No hay plantillas creadas aún</p>
          <p class="text-sm mt-2">Crea tu primera plantilla para empezar</p>
          <button class="btn btn-primary btn-sm mt-4" @click="openModal">
            <Plus class="mr-2 h-4 w-4" />
            Crear Plantilla
          </button>
        </div>

        <!-- Lista de Plantillas -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div
            v-for="plantilla in plantillas"
            :key="plantilla.id"
            class="card bg-base-200 hover:shadow-md transition-shadow"
          >
            <div class="card-body">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <h3 class="font-semibold truncate">{{ plantilla.nombrePlantilla }}</h3>
                  <p class="text-sm text-gray-500 truncate">{{ plantilla.asunto }}</p>
                </div>
                <div class="dropdown dropdown-end">
                  <label tabindex="0" class="btn btn-ghost btn-xs">⋮</label>
                  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a @click="handleEditPlantilla(plantilla.id)"><Edit class="h-4 w-4" /> Editar</a></li>
                    <li><a @click="handleDeletePlantilla(plantilla.id)" class="text-error"><Trash2 class="h-4 w-4" /> Eliminar</a></li>
                  </ul>
                </div>
              </div>
              
              <!-- Metadata -->
              <div class="mt-4 pt-4 border-t text-xs text-gray-500">
                <p>Creada: {{ new Date(plantilla.fechaCreacion).toLocaleDateString() }}</p>
              </div>

              <!-- Acciones -->
              <div class="card-actions justify-end mt-2">
                <button class="btn btn-xs btn-outline" @click="handleEditPlantilla(plantilla.id)">
                  Ver/Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para Nueva/Editar Plantilla -->
    <NuevaPlantillaModal
      v-model="isModalOpen"
      :plantilla-editar="plantillaToEdit"
      @success="handlePlantillaSuccess"
    />
  </div>
</template>
