<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useMarketingEstrategiaStore } from '@/store/marketing_estrategia';
import { 
  Plus, Target, TrendingUp, Calendar, DollarSign, 
  BarChart3, ExternalLink, Loader
} from 'lucide-vue-next';

const router = useRouter();
const estrategiaStore = useMarketingEstrategiaStore();
const { campanias, isLoading } = storeToRefs(estrategiaStore);

// Estado local
const selectedBrandId = ref('');
const brands = ref<any[]>([]);
const isCrearModalOpen = ref(false);
const isMetricasModalOpen = ref(false);
const metricas = ref<any>(null);
const loadingMetricas = ref(false);

// Datos del formulario de nueva campaña
const nuevaCampaniaForm = ref({
  nombre: '',
  descripcion: '',
  presupuesto: 0,
  fechaInicio: '',
  fechaFin: ''
});

// Computed
const hasCampanias = computed(() => campanias.value.length > 0);

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

const openCrearModal = () => {
  // Resetear formulario
  nuevaCampaniaForm.value = {
    nombre: '',
    descripcion: '',
    presupuesto: 0,
    fechaInicio: '',
    fechaFin: ''
  };
  isCrearModalOpen.value = true;
};

const closeCrearModal = () => {
  isCrearModalOpen.value = false;
};

const handleCreateCampania = async () => {
  try {
    // Validar que haya una marca seleccionada
    if (!selectedBrandId.value) {
      alert('Por favor, selecciona una marca primero');
      return;
    }

    // Validar campos requeridos
    if (!nuevaCampaniaForm.value.nombre || !nuevaCampaniaForm.value.fechaInicio || !nuevaCampaniaForm.value.fechaFin) {
      alert('Por favor, completa todos los campos requeridos');
      return;
    }

    // Asegurar que el store tenga la marca actual
    estrategiaStore.setCurrentAccount(selectedBrandId.value);

    // Crear la campaña
    await estrategiaStore.createCampania({
      Nombre: nuevaCampaniaForm.value.nombre,
      Descripcion: nuevaCampaniaForm.value.descripcion,
      Presupuesto: nuevaCampaniaForm.value.presupuesto,
      FechaInicio: nuevaCampaniaForm.value.fechaInicio,
      FechaFin: nuevaCampaniaForm.value.fechaFin
    });

    alert('Campaña creada exitosamente');
    closeCrearModal();
  } catch (error) {
    console.error('Error creating campaña:', error);
    alert('Error al crear la campaña. Por favor, intenta de nuevo.');
  }
};

const goToProyecto = (campania: any) => {
  const proyectoId = campania.idProyecto || campania.proyectoAsociado?.id;
  if (proyectoId) {
    router.push(`/marketing/proyectos/${proyectoId}`);
  } else {
    alert('Esta campaña no tiene un proyecto asociado');
  }
};

const verMetricas = async (campania: any) => {
  try {
    loadingMetricas.value = true;
    const result = await estrategiaStore.fetchMetricasCampania(campania.id.toString());
    metricas.value = result;
    isMetricasModalOpen.value = true;
  } catch (error) {
    console.error('Error loading métricas:', error);
    alert('Error al cargar las métricas');
  } finally {
    loadingMetricas.value = false;
  }
};

const closeMetricasModal = () => {
  isMetricasModalOpen.value = false;
  metricas.value = null;
};

const getEstadoBadgeClass = (estado: string) => {
  switch (estado.toLowerCase()) {
    case 'planificacion':
      return 'badge-info';
    case 'activa':
      return 'badge-success';
    case 'pausada':
      return 'badge-warning';
    case 'finalizada':
      return 'badge-ghost';
    default:
      return 'badge-ghost';
  }
};

const getEstadoLabel = (estado: string) => {
  switch (estado.toLowerCase()) {
    case 'planificacion':
      return 'Planificación';
    case 'activa':
      return 'Activa';
    case 'pausada':
      return 'Pausada';
    case 'finalizada':
      return 'Finalizada';
    default:
      return estado;
  }
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(value);
};

const formatDate = (dateString: string) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Watch para cambios en la marca seleccionada
watch(selectedBrandId, (newBrandId) => {
  if (newBrandId) {
    localStorage.setItem('selected_brand_id', newBrandId);
    estrategiaStore.setCurrentAccount(newBrandId);
    estrategiaStore.fetchCampanias();
  }
});

// Lifecycle
onMounted(async () => {
  await loadBrands();
  if (selectedBrandId.value) {
    estrategiaStore.fetchCampanias();
  }
});
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold flex items-center gap-3">
          <Target class="h-8 w-8 text-primary" />
          Estrategia de Campañas
        </h1>
        <p class="text-base-content/70 mt-1">
          Gestiona y monitorea tus campañas estratégicas de marketing
        </p>
      </div>
      <button class="btn btn-primary gap-2" @click="openCrearModal">
        <Plus class="h-5 w-5" />
        Nueva Campaña
      </button>
    </div>

    <!-- Selector de Marca -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex items-center gap-4">
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
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <Loader class="h-8 w-8 animate-spin text-primary" />
      <span class="ml-3 text-lg">Cargando campañas...</span>
    </div>

    <!-- Empty State -->
    <div v-else-if="!hasCampanias && !isLoading" class="card bg-base-100 shadow-xl">
      <div class="card-body items-center text-center py-12">
        <Target class="h-16 w-16 text-base-300 mb-4" />
        <h2 class="card-title text-2xl">No hay campañas creadas</h2>
        <p class="text-base-content/70 max-w-md">
          Comienza creando tu primera campaña estratégica para gestionar tus objetivos de marketing
        </p>
        <button class="btn btn-primary mt-4 gap-2" @click="openCrearModal">
          <Plus class="h-5 w-5" />
          Crear Primera Campaña
        </button>
      </div>
    </div>

    <!-- Grid de Campañas -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="campania in campanias" 
        :key="campania.id"
        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
      >
        <div class="card-body">
          <!-- Header del Card -->
          <div class="flex items-start justify-between">
            <h2 class="card-title text-lg">{{ campania.nombre }}</h2>
            <span class="badge" :class="getEstadoBadgeClass(campania.estado)">
              {{ getEstadoLabel(campania.estado) }}
            </span>
          </div>

          <!-- Descripción -->
          <p v-if="campania.descripcion" class="text-sm text-base-content/70 line-clamp-2">
            {{ campania.descripcion }}
          </p>

          <!-- Información de la Campaña -->
          <div class="space-y-2 mt-4">
            <!-- Presupuesto -->
            <div class="flex items-center gap-2 text-sm">
              <DollarSign class="h-4 w-4 text-success" />
              <span class="font-semibold">Presupuesto:</span>
              <span>{{ formatCurrency(campania.presupuesto) }}</span>
            </div>

            <!-- Fechas -->
            <div class="flex items-center gap-2 text-sm">
              <Calendar class="h-4 w-4 text-info" />
              <span class="font-semibold">Inicio:</span>
              <span>{{ formatDate(campania.fechaInicio) }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <Calendar class="h-4 w-4 text-warning" />
              <span class="font-semibold">Fin:</span>
              <span>{{ formatDate(campania.fechaFin) }}</span>
            </div>
          </div>

          <!-- Acciones del Card -->
          <div class="card-actions justify-end mt-4 gap-2">
            <!-- Ver Métricas -->
            <button 
              class="btn btn-sm btn-outline gap-2"
              @click="verMetricas(campania)"
              :disabled="loadingMetricas"
            >
              <BarChart3 class="h-4 w-4" />
              Métricas
            </button>

            <!-- Ir a Proyecto -->
            <button 
              v-if="campania.idProyecto || campania.proyectoAsociado"
              class="btn btn-sm btn-primary gap-2"
              @click="goToProyecto(campania)"
            >
              <ExternalLink class="h-4 w-4" />
              Ir a Proyecto
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Crear Campaña -->
    <div :class="['modal', { 'modal-open': isCrearModalOpen }]">
      <div class="modal-box max-w-2xl">
        <h3 class="font-bold text-2xl mb-4 flex items-center gap-2">
          <Plus class="h-6 w-6" />
          Nueva Campaña Estratégica
        </h3>

        <div class="space-y-4">
          <!-- Nombre -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Nombre de la Campaña *</span>
            </label>
            <input 
              v-model="nuevaCampaniaForm.nombre"
              type="text" 
              placeholder="Ej: Campaña Verano 2024"
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
              v-model="nuevaCampaniaForm.descripcion"
              placeholder="Describe los objetivos de la campaña..."
              class="textarea textarea-bordered h-24"
            ></textarea>
          </div>

          <!-- Presupuesto -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Presupuesto *</span>
            </label>
            <input 
              v-model.number="nuevaCampaniaForm.presupuesto"
              type="number" 
              placeholder="0.00"
              class="input input-bordered"
              min="0"
              step="0.01"
              required
            />
          </div>

          <!-- Fechas -->
          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Fecha de Inicio *</span>
              </label>
              <input 
                v-model="nuevaCampaniaForm.fechaInicio"
                type="date" 
                class="input input-bordered"
                required
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Fecha de Fin *</span>
              </label>
              <input 
                v-model="nuevaCampaniaForm.fechaFin"
                type="date" 
                class="input input-bordered"
                required
              />
            </div>
          </div>
        </div>

        <div class="modal-action">
          <button class="btn btn-ghost" @click="closeCrearModal">Cancelar</button>
          <button class="btn btn-primary" @click="handleCreateCampania">
            Crear Campaña
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="closeCrearModal">close</button>
      </form>
    </div>

    <!-- Modal Métricas -->
    <div :class="['modal', { 'modal-open': isMetricasModalOpen }]">
      <div class="modal-box max-w-4xl">
        <h3 class="font-bold text-2xl mb-4 flex items-center gap-2">
          <TrendingUp class="h-6 w-6" />
          Métricas de Campaña
        </h3>

        <div v-if="metricas" class="space-y-6">
          <!-- Resumen General -->
          <div class="stats stats-vertical lg:stats-horizontal shadow w-full">
            <div class="stat">
              <div class="stat-title">ROI</div>
              <div class="stat-value text-success">{{ metricas.roi }}%</div>
              <div class="stat-desc">Retorno de inversión</div>
            </div>

            <div class="stat">
              <div class="stat-title">Inversiones</div>
              <div class="stat-value text-primary">{{ formatCurrency(metricas.totalInversiones) }}</div>
              <div class="stat-desc">Total invertido</div>
            </div>

            <div class="stat">
              <div class="stat-title">Conversiones</div>
              <div class="stat-value">{{ metricas.conversiones }}</div>
              <div class="stat-desc">Tasa: {{ metricas.tasaConversion }}%</div>
            </div>

            <div class="stat">
              <div class="stat-title">Alcance</div>
              <div class="stat-value text-info">{{ metricas.alcance }}</div>
              <div class="stat-desc">Personas alcanzadas</div>
            </div>
          </div>

          <!-- Métricas Detalladas -->
          <div v-if="metricas.metricas && metricas.metricas.length > 0">
            <h4 class="font-semibold text-lg mb-3">Métricas Detalladas</h4>
            <div class="grid grid-cols-2 gap-4">
              <div 
                v-for="(metrica, index) in metricas.metricas" 
                :key="index"
                class="card bg-base-200"
              >
                <div class="card-body p-4">
                  <div class="flex items-center justify-between">
                    <span class="font-medium">{{ metrica.nombre }}</span>
                    <span 
                      class="badge" 
                      :class="{
                        'badge-success': metrica.tipo === 'positivo',
                        'badge-error': metrica.tipo === 'negativo',
                        'badge-ghost': metrica.tipo === 'neutral'
                      }"
                    >
                      {{ metrica.valor }} {{ metrica.unidad }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-action">
          <button class="btn" @click="closeMetricasModal">Cerrar</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="closeMetricasModal">close</button>
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
</style>
