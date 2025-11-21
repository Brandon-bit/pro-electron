<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useMarketingEstrategiaStore } from '@/store/marketing_estrategia';
import type { Tarea } from '../types/estrategiaTypes';
import { 
  KanbanSquare, Plus, ArrowLeft, Loader, AlertCircle,
  GripVertical, Trash2, Edit, Clock, Flag
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const estrategiaStore = useMarketingEstrategiaStore();
const { kanbanBoard, currentProyecto, isLoading, proyectos } = storeToRefs(estrategiaStore);

// Estado local
const selectedBrandId = ref('');
const selectedProyectoId = ref('');
const brands = ref<any[]>([]);
const isCrearTareaModalOpen = ref(false);
const selectedColumnaEstado = ref('');
const draggedTarea = ref<Tarea | null>(null);

// Formulario de nueva tarea
const nuevaTareaForm = ref({
  titulo: '',
  descripcion: '',
  prioridad: 'media' as 'baja' | 'media' | 'alta' | 'urgente',
  asignadoA: '',
  fechaVencimiento: ''
});

// Computed
const hasKanbanBoard = computed(() => kanbanBoard.value !== null);
const hasProyectos = computed(() => proyectos.value.length > 0);

// Métodos
const loadBrands = async () => {
  // Esta función debería cargar marcas desde un store de marcas
  // Por simplicidad, inicializamos con marca predeterminada
  const storedBrandId = localStorage.getItem('selected_brand_id');
  if (storedBrandId) {
    selectedBrandId.value = storedBrandId;
    estrategiaStore.setCurrentAccount(storedBrandId);
  }
};

const goBack = () => {
  router.push('/marketing/estrategia');
};

const openCrearTareaModal = (estadoColumna: string) => {
  selectedColumnaEstado.value = estadoColumna;
  // Reset form
  nuevaTareaForm.value = {
    titulo: '',
    descripcion: '',
    prioridad: 'media',
    asignadoA: '',
    fechaVencimiento: ''
  };
  isCrearTareaModalOpen.value = true;
};

const closeCrearTareaModal = () => {
  isCrearTareaModalOpen.value = false;
};

const handleCreateTarea = async () => {
  try {
    if (!nuevaTareaForm.value.titulo) {
      alert('El título es requerido');
      return;
    }

    await estrategiaStore.createTarea(selectedProyectoId.value, {
      Titulo: nuevaTareaForm.value.titulo,
      Descripcion: nuevaTareaForm.value.descripcion,
      Estado: selectedColumnaEstado.value,
      Prioridad: nuevaTareaForm.value.prioridad,
      AsignadoA: nuevaTareaForm.value.asignadoA || undefined,
      FechaVencimiento: nuevaTareaForm.value.fechaVencimiento || undefined
    });

    closeCrearTareaModal();
  } catch (error) {
    console.error('Error creating tarea:', error);
    alert('Error al crear la tarea');
  }
};

const handleDeleteTarea = async (tareaId: string) => {
  if (!confirm('¿Estás seguro de eliminar esta tarea?')) {
    return;
  }

  try {
    await estrategiaStore.deleteTarea(tareaId);
  } catch (error) {
    console.error('Error deleting tarea:', error);
    alert('Error al eliminar la tarea');
  }
};

// ========== DRAG & DROP ==========

const handleDragStart = (event: DragEvent, tarea: Tarea) => {
  draggedTarea.value = tarea;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', (event.target as HTMLElement).innerHTML);
  }
  
  // Agregar clase visual
  (event.target as HTMLElement).classList.add('opacity-50');
};

const handleDragEnd = (event: DragEvent) => {
  (event.target as HTMLElement).classList.remove('opacity-50');
  draggedTarea.value = null;
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
};

const handleDragEnter = (event: DragEvent) => {
  event.preventDefault();
  const columna = (event.currentTarget as HTMLElement);
  columna.classList.add('bg-primary', 'bg-opacity-10');
};

const handleDragLeave = (event: DragEvent) => {
  const columna = (event.currentTarget as HTMLElement);
  columna.classList.remove('bg-primary', 'bg-opacity-10');
};

const handleDrop = async (event: DragEvent, nuevoEstado: string) => {
  event.preventDefault();
  
  const columna = (event.currentTarget as HTMLElement);
  columna.classList.remove('bg-primary', 'bg-opacity-10');

  if (!draggedTarea.value) return;

  // Si la tarea ya está en esta columna, no hacer nada
  if (draggedTarea.value.estado === nuevoEstado) {
    return;
  }

  try {
    // Optimistic update via store action
    await estrategiaStore.updateTareaStatus(
      draggedTarea.value.id.toString(), 
      nuevoEstado
    );
  } catch (error) {
    console.error('Error moving tarea:', error);
    alert('Error al mover la tarea');
  }
};

// Helpers
const getPrioridadBadgeClass = (prioridad: string) => {
  switch (prioridad.toLowerCase()) {
    case 'urgente':
      return 'badge-error';
    case 'alta':
      return 'badge-warning';
    case 'media':
      return 'badge-info';
    case 'baja':
      return 'badge-ghost';
    default:
      return 'badge-ghost';
  }
};

const getPrioridadLabel = (prioridad: string) => {
  return prioridad.charAt(0).toUpperCase() + prioridad.slice(1);
};

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString('es-MX', {
    month: 'short',
    day: 'numeric'
  });
};

const isVencida = (fechaVencimiento: string | undefined) => {
  if (!fechaVencimiento) return false;
  return new Date(fechaVencimiento) < new Date();
};

// Watch para cambios en la marca seleccionada
watch(selectedBrandId, (newBrandId) => {
  if (newBrandId) {
    localStorage.setItem('selected_brand_id', newBrandId);
    estrategiaStore.setCurrentAccount(newBrandId);
    estrategiaStore.fetchProyectos();
    selectedProyectoId.value = '';
    estrategiaStore.kanbanBoard = null;
  }
});

// Watch para cambios en el proyecto seleccionado
watch(selectedProyectoId, (newProyectoId) => {
  if (newProyectoId) {
    estrategiaStore.fetchKanbanBoard(newProyectoId);
  }
});

// Lifecycle
onMounted(async () => {
  await loadBrands();
  if (selectedBrandId.value) {
    estrategiaStore.fetchProyectos();
  }
});
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button class="btn btn-ghost btn-sm" @click="goBack">
          <ArrowLeft class="h-5 w-5" />
          Volver
        </button>
        <div>
          <h1 class="text-3xl font-bold flex items-center gap-3">
            <KanbanSquare class="h-8 w-8 text-primary" />
            {{ currentProyecto?.nombre || 'Gestión de Proyectos' }}
          </h1>
          <p v-if="currentProyecto?.descripcion" class="text-base-content/70 mt-1">
            {{ currentProyecto.descripcion }}
          </p>
        </div>
      </div>
    </div>

    <!-- Selectores de Marca y Proyecto -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex items-center gap-6">
          <!-- Selector de Marca -->
          <div class="flex items-center gap-3">
            <label class="label">
              <span class="label-text font-semibold">Seleccionar Marca:</span>
            </label>
            <select 
              v-model="selectedBrandId" 
              class="select select-bordered w-full max-w-xs"
            >
              <option value="">Selecciona una marca</option>
              <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                {{ brand.nombre }}
              </option>
            </select>
          </div>

          <!-- Selector de Proyecto -->
          <div v-if="selectedBrandId" class="flex items-center gap-3">
            <label class="label">
              <span class="label-text font-semibold">Seleccionar Proyecto:</span>
            </label>
            <select 
              v-model="selectedProyectoId" 
              class="select select-bordered w-full max-w-xs"
              :disabled="!hasProyectos"
            >
              <option value="">Selecciona un proyecto</option>
              <option v-for="proyecto in proyectos" :key="proyecto.id" :value="proyecto.id">
                {{ proyecto.nombre }}
              </option>
            </select>
          </div>
        </div>

        <!-- Mensaje si no hay proyectos -->
        <div v-if="selectedBrandId && !hasProyectos && !isLoading" class="alert alert-info mt-4">
          <AlertCircle class="h-4 w-4" />
          <span>No hay proyectos disponibles para esta marca.</span>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <Loader class="h-10 w-10 animate-spin text-primary" />
      <span class="ml-3 text-lg">Cargando tablero Kanban...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="!hasKanbanBoard" class="card bg-base-100 shadow-xl">
      <div class="card-body items-center text-center py-12">
        <AlertCircle class="h-16 w-16 text-error mb-4" />
        <h2 class="card-title text-2xl">No se pudo cargar el proyecto</h2>
        <p class="text-base-content/70">
          Verifica que el proyecto exista o intenta recargar la página
        </p>
        <button class="btn btn-primary mt-4" @click="goBack">
          Volver a Campañas
        </button>
      </div>
    </div>

    <!-- Tablero Kanban -->
    <div v-else class="overflow-x-auto pb-4">
      <div class="flex gap-4 min-w-max">
        <!-- Columna por cada estado -->
        <div 
          v-for="columna in kanbanBoard?.columnas" 
          :key="columna.estado"
          class="flex-shrink-0 w-80"
        >
          <!-- Header de Columna -->
          <div class="card bg-base-200 shadow-lg">
            <div class="card-body p-4">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-lg">
                  {{ columna.titulo }}
                  <span class="badge badge-sm ml-2">{{ columna.tareas.length }}</span>
                </h3>
                <button 
                  class="btn btn-xs btn-ghost btn-circle"
                  @click="openCrearTareaModal(columna.estado)"
                  title="Agregar tarea"
                >
                  <Plus class="h-4 w-4" />
                </button>
              </div>

              <!-- Drop Zone -->
              <div 
                class="space-y-3 min-h-[500px] transition-colors duration-200 rounded-lg p-2"
                @dragover="handleDragOver"
                @dragenter="handleDragEnter"
                @dragleave="handleDragLeave"
                @drop="handleDrop($event, columna.estado)"
              >
                <!-- Tarjeta de Tarea -->
                <div 
                  v-for="tarea in columna.tareas" 
                  :key="tarea.id"
                  class="card bg-base-100 shadow hover:shadow-lg cursor-move transition-all"
                  draggable="true"
                  @dragstart="handleDragStart($event, tarea)"
                  @dragend="handleDragEnd"
                >
                  <div class="card-body p-4">
                    <!-- Header de Tarjeta -->
                    <div class="flex items-start justify-between gap-2">
                      <div class="flex-1">
                        <h4 class="font-semibold text-sm">{{ tarea.titulo }}</h4>
                        <p v-if="tarea.descripcion" class="text-xs text-base-content/70 mt-1 line-clamp-2">
                          {{ tarea.descripcion }}
                        </p>
                      </div>
                      <GripVertical class="h-4 w-4 text-base-content/40 flex-shrink-0" />
                    </div>

                    <!-- Metadata -->
                    <div class="flex flex-wrap gap-2 mt-3">
                      <!-- Prioridad -->
                      <span 
                        class="badge badge-sm" 
                        :class="getPrioridadBadgeClass(tarea.prioridad)"
                      >
                        <Flag class="h-3 w-3 mr-1" />
                        {{ getPrioridadLabel(tarea.prioridad) }}
                      </span>

                      <!-- Fecha de Vencimiento -->
                      <span 
                        v-if="tarea.fechaVencimiento"
                        class="badge badge-sm"
                        :class="isVencida(tarea.fechaVencimiento) ? 'badge-error' : 'badge-ghost'"
                      >
                        <Clock class="h-3 w-3 mr-1" />
                        {{ formatDate(tarea.fechaVencimiento) }}
                      </span>
                    </div>

                    <!-- Asignado -->
                    <div v-if="tarea.asignadoA" class="text-xs text-base-content/60 mt-2">
                      Asignado: {{ tarea.asignadoA }}
                    </div>

                    <!-- Acciones -->
                    <div class="flex gap-1 mt-3 pt-2 border-t border-base-300">
                      <button 
                        class="btn btn-xs btn-ghost btn-square"
                        title="Editar tarea"
                      >
                        <Edit class="h-3 w-3" />
                      </button>
                      <button 
                        class="btn btn-xs btn-ghost btn-square text-error"
                        @click="handleDeleteTarea(tarea.id.toString())"
                        title="Eliminar tarea"
                      >
                        <Trash2 class="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Empty State de Columna -->
                <div 
                  v-if="columna.tareas.length === 0"
                  class="text-center text-base-content/40 py-8"
                >
                  <p class="text-sm">No hay tareas</p>
                  <button 
                    class="btn btn-sm btn-ghost mt-2"
                    @click="openCrearTareaModal(columna.estado)"
                  >
                    <Plus class="h-4 w-4" />
                    Agregar tarea
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Crear Tarea -->
    <div :class="['modal', { 'modal-open': isCrearTareaModalOpen }]">
      <div class="modal-box max-w-2xl">
        <h3 class="font-bold text-2xl mb-4 flex items-center gap-2">
          <Plus class="h-6 w-6" />
          Nueva Tarea
        </h3>

        <div class="space-y-4">
          <!-- Título -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Título de la Tarea *</span>
            </label>
            <input 
              v-model="nuevaTareaForm.titulo"
              type="text" 
              placeholder="Ej: Diseñar banner para redes sociales"
              class="input input-bordered"
              required
            />
          </div>

          <!-- Descripción -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Descripción</span>
            </label>
            <textarea 
              v-model="nuevaTareaForm.descripcion"
              placeholder="Describe los detalles de la tarea..."
              class="textarea textarea-bordered h-24"
            ></textarea>
          </div>

          <!-- Prioridad y Asignado -->
          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Prioridad</span>
              </label>
              <select 
                v-model="nuevaTareaForm.prioridad"
                class="select select-bordered"
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Asignado a</span>
              </label>
              <input 
                v-model="nuevaTareaForm.asignadoA"
                type="text" 
                placeholder="Nombre del asignado"
                class="input input-bordered"
              />
            </div>
          </div>

          <!-- Fecha de Vencimiento -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Fecha de Vencimiento</span>
            </label>
            <input 
              v-model="nuevaTareaForm.fechaVencimiento"
              type="date" 
              class="input input-bordered"
            />
          </div>
        </div>

        <div class="modal-action">
          <button class="btn btn-ghost" @click="closeCrearTareaModal">Cancelar</button>
          <button class="btn btn-primary" @click="handleCreateTarea">
            Crear Tarea
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="closeCrearTareaModal">close</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  display: -moz-box;
  display: box;
  -webkit-line-clamp: 2;
  -moz-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
}

/* Animaciones suaves para drag & drop */
.card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
}
</style>
