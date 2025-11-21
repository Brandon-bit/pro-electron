<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useEmailingStore } from '@/store/emailing';
import { Send, Plus, Trash2, FileText, Edit, Play } from 'lucide-vue-next';
import CreateCampaniaModal from './CreateCampaniaModal.vue';

// Store
const emailingStore = useEmailingStore();
const { campanias, isLoading, listas } = storeToRefs(emailingStore);

// Estado local
const isCampaniaModalOpen = ref(false);
const campaniaToEdit = ref<any>(null);

// Computadas
const hasCampanias = computed(() => campanias.value.length > 0);

// Métodos
onMounted(async () => {
  // Cargar datos necesarios para crear campañas
  await Promise.all([
    emailingStore.fetchCampanias(),
    emailingStore.fetchPlantillas(),
    emailingStore.fetchListas()
  ]);
});

const openNuevaCampaniaModal = () => {
  campaniaToEdit.value = null;
  isCampaniaModalOpen.value = true;
};

const handleDeleteCampania = async (idCampania: string | number) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta campaña? Esta acción no se puede deshacer.')) {
    try {
      await emailingStore.deleteCampania(idCampania.toString());
    } catch (error) {
      console.error('Error deleting campania:', error);
      alert('Error al eliminar la campaña. Por favor, intenta de nuevo.');
    }
  }
};

const handleEditCampania = (campania: any) => {
  campaniaToEdit.value = campania;
  isCampaniaModalOpen.value = true;
};

const handleSendCampania = async (idCampania: string | number, titulo: string) => {
  if (confirm(`¿Estás seguro de que deseas enviar la campaña "${titulo}"? Esta acción no se puede deshacer.`)) {
    try {
      await emailingStore.sendCampania(idCampania.toString());
      alert('Campaña enviada exitosamente.');
    } catch (error) {
      console.error('Error sending campania:', error);
      alert('Error al enviar la campaña. Por favor, intenta de nuevo.');
    }
  }
};

const handleEnviarAhora = async (campania: any) => {
  // Obtener información de la lista para mostrar número de suscriptores
  const lista = listas.value.find(l => l.id.toString() === campania.idLista?.toString() || l.id.toString() === campania.idListaAsociada?.toString());
  const numSuscriptores = lista?.totalContactos || 0;
  
  const confirmMessage = `¿Estás seguro de que deseas enviar la campaña "${campania.nombreCampania || campania.titulo}" a ${numSuscriptores} suscriptor(es) ahora? Esta acción no se puede deshacer.`;
  
  if (confirm(confirmMessage)) {
    try {
      await emailingStore.enviarCampania(campania.id.toString());
      // La alerta de éxito ya se muestra en el store
    } catch (error) {
      console.error('Error sending campania:', error);
      alert('Error al enviar la campaña. Por favor, intenta de nuevo.');
    }
  }
};

const getEstadoLabel = (estado: string | undefined) => {
  if (!estado) return 'Desconocido';
  
  switch (estado.toLowerCase()) {
    case 'borrador':
      return 'Borrador';
    case 'programada':
      return 'Programada';
    case 'enviada':
      return 'Enviada';
    case 'pausada':
      return 'Pausada';
    default:
      return 'Desconocido';
  }
};

const getEstadoBadgeClass = (estado: string | undefined) => {
  if (!estado) return 'badge-warning'; // Cambiado a warning para "Desconocido"
  
  switch (estado.toLowerCase()) {
    case 'borrador':
      return 'badge-ghost';
    case 'programada':
      return 'badge-info';
    case 'enviada':
      return 'badge-success';
    case 'pausada':
      return 'badge-warning';
    default:
      return 'badge-warning'; // Cambiado a warning para "Desconocido"
  }
};

// Exponer método para que el componente padre pueda abrirlo
defineExpose({
  openNuevaCampaniaModal
});
</script>

<template>
  <div class="space-y-6">
    <!-- Encabezado y botón Nueva Campaña -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center gap-3">
            <Send class="h-6 w-6 text-primary" />
            <h2 class="card-title">Campañas de Email</h2>
          </div>
          <button class="btn btn-sm btn-primary gap-2" @click="openNuevaCampaniaModal">
            <Plus class="h-4 w-4" />
            Nueva Campaña
          </button>
        </div>

        <div v-if="isLoading" class="text-center py-12">
          <span class="loading loading-spinner loading-lg"></span>
          <p class="text-sm text-gray-500 mt-2">Cargando campañas...</p>
        </div>

        <div v-else-if="!hasCampanias" class="text-center py-12">
          <Send class="h-16 w-16 mx-auto mb-4 opacity-30" />
          <h3 class="font-semibold text-lg mb-2">No hay campañas creadas aún</h3>
          <p class="text-sm text-gray-500 mb-4">
            Crea tu primera campaña de email marketing
          </p>
          <button class="btn btn-primary btn-sm gap-2" @click="openNuevaCampaniaModal">
            <Plus class="h-4 w-4" />
            Crear Primera Campaña
          </button>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>Título</th>
                <th>Asunto</th>
                <th>Estado</th>
                <th>Estadísticas</th>
                <th>Fecha Programada</th>
                <th>Fecha Envío</th>
                <th class="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="campania in campanias" :key="campania.id">
                <td>
                  <div class="flex items-center gap-2">
                    <FileText class="h-4 w-4 text-primary" />
                    <span class="font-semibold">{{ campania.titulo }}</span>
                  </div>
                </td>
                <td class="max-w-xs truncate">{{ campania.asunto }}</td>
                <td>
                  <span class="badge" :class="getEstadoBadgeClass(campania.estado || campania.estadoCampania)">
                    {{ getEstadoLabel(campania.estado || campania.estadoCampania) }}
                  </span>
                </td>
                <td>
                  <div class="text-xs space-y-1">
                    <div v-if="campania.totalEnviados">
                      <span class="font-semibold">{{ campania.totalEnviados }}</span> enviados
                    </div>
                    <div v-if="campania.totalAbiertos" class="text-success">
                      <span class="font-semibold">{{ campania.totalAbiertos }}</span> abiertos
                    </div>
                    <div v-if="campania.totalClicks" class="text-info">
                      <span class="font-semibold">{{ campania.totalClicks }}</span> clicks
                    </div>
                    <div v-if="!campania.totalEnviados && !campania.totalAbiertos && !campania.totalClicks" class="text-gray-400">
                      Sin datos
                    </div>
                  </div>
                </td>
                <td>
                  <span v-if="campania.fechaProgramada" class="text-sm">
                    {{ new Date(campania.fechaProgramada).toLocaleString() }}
                  </span>
                  <span v-else class="text-gray-400">-</span>
                </td>
                <td>
                  <span v-if="campania.fechaEnvio" class="text-sm">
                    {{ new Date(campania.fechaEnvio).toLocaleString() }}
                  </span>
                  <span v-else class="text-gray-400">-</span>
                </td>
                <td class="text-right">
                  <div class="flex gap-1 justify-end">
                    <!-- Botón Editar - Solo si no está enviada -->
                    <button 
                      v-if="(campania.estado || campania.estadoCampania)?.toLowerCase() !== 'enviada'"
                      class="btn btn-xs btn-primary btn-outline gap-1"
                      @click="handleEditCampania(campania)"
                      title="Editar campaña"
                    >
                      <Edit class="h-3 w-3" />
                    </button>
                    
                    <!-- Botón Enviar Ahora - Solo si no está enviada -->
                    <button 
                      v-if="(campania.estado || campania.estadoCampania)?.toLowerCase() !== 'enviada'"
                      class="btn btn-xs btn-warning btn-outline gap-1"
                      @click="handleEnviarAhora(campania)"
                      title="Enviar Ahora"
                    >
                      <Send class="h-3 w-3" />
                    </button>
                    
                    <!-- Botón Enviar - Solo si está en borrador -->
                    <button 
                      v-if="(campania.estado || campania.estadoCampania)?.toLowerCase() === 'borrador'"
                      class="btn btn-xs btn-success btn-outline gap-1"
                      @click="handleSendCampania(campania.id, campania.nombreCampania || campania.titulo || '')"
                      title="Enviar campaña"
                    >
                      <Play class="h-3 w-3" />
                    </button>
                    
                    <!-- Botón Eliminar -->
                    <button 
                      class="btn btn-xs btn-error btn-outline gap-1"
                      @click="handleDeleteCampania(campania.id)"
                      title="Eliminar campaña"
                    >
                      <Trash2 class="h-3 w-3" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal para Nueva Campaña -->
    <CreateCampaniaModal 
      v-model="isCampaniaModalOpen" 
      :campania-editar="campaniaToEdit" 
    />
  </div>
</template>
