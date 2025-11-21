<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useEmailingStore } from '@/store/emailing';
import { Users, Plus, Upload, ArrowLeft, Trash2, UserPlus } from 'lucide-vue-next';
import CreateListaModal from './CreateListaModal.vue';
import AgregarContactoModal from './AgregarContactoModal.vue';
import ImportContactosModal from './ImportContactosModal.vue';

// Store
const emailingStore = useEmailingStore();
const { listas, contactosCurrentLista, isLoading, isLoadingContactos } = storeToRefs(emailingStore);

// Estado local
const isListaModalOpen = ref(false);
const isContactoModalOpen = ref(false);
const isImportModalOpen = ref(false);
const listaSeleccionada = ref<string | null>(null);

// Computadas
const hasListas = computed(() => listas.value.length > 0);
const hasContactos = computed(() => contactosCurrentLista.value.length > 0);
const nombreListaActual = computed(() => {
  if (!listaSeleccionada.value) return '';
  const lista = listas.value.find(l => l.id.toString() === listaSeleccionada.value);
  return lista?.nombreLista || '';
});

// Métodos
onMounted(async () => {
  await emailingStore.fetchListas();
});

const openNuevaListaModal = () => {
  console.log('Abriendo modal de Nueva Lista');
  isListaModalOpen.value = true;
};

const handleListaCreated = async () => {
  console.log('Lista creada, recargando listas...');
  // Recargar listas después de crear una nueva
  await emailingStore.fetchListas();
};

const handleContactoCreated = async () => {
  console.log('Contacto agregado, recargando contactos...');
  // Recargar contactos de la lista actual
  if (listaSeleccionada.value) {
    await emailingStore.fetchContactos(listaSeleccionada.value);
  }
};

const handleContactosImported = async () => {
  console.log('Contactos importados, recargando contactos...');
  // Recargar contactos de la lista actual
  if (listaSeleccionada.value) {
    await emailingStore.fetchContactos(listaSeleccionada.value);
  }
};

const handleSelectLista = async (idLista: string | number) => {
  listaSeleccionada.value = idLista.toString();
  await emailingStore.fetchContactos(idLista.toString());
};

const handleVolverAListas = () => {
  listaSeleccionada.value = null;
  emailingStore.setCurrentLista(null);
};

const handleDeleteLista = async (idLista: string | number) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta lista? Esta acción no se puede deshacer.')) {
    try {
      await emailingStore.deleteLista(idLista.toString());
    } catch (error) {
      console.error('Error deleting lista:', error);
      alert('Error al eliminar la lista. Por favor, intenta de nuevo.');
    }
  }
};

const handleDeleteContacto = async (idContacto: string | number) => {
  if (confirm('¿Eliminar este contacto de la lista?')) {
    try {
      // Verificar que haya una lista seleccionada
      if (!listaSeleccionada.value) {
        alert('No hay una lista seleccionada');
        return;
      }
      
      await emailingStore.deleteContacto(listaSeleccionada.value, idContacto.toString());
    } catch (error) {
      console.error('Error deleting contacto:', error);
      alert('Error al eliminar el contacto. Por favor, intenta de nuevo.');
    }
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- Vista de Listas -->
    <div v-if="!listaSeleccionada" class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center gap-3">
            <Users class="h-6 w-6 text-primary" />
            <h2 class="card-title">Listas de Audiencia</h2>
          </div>
          <button class="btn btn-sm btn-primary gap-2" @click="openNuevaListaModal">
            <Plus class="h-4 w-4" />
            Nueva Lista
          </button>
        </div>

        <div v-if="isLoading" class="text-center py-12">
          <span class="loading loading-spinner loading-lg"></span>
          <p class="text-sm text-gray-500 mt-2">Cargando listas...</p>
        </div>

        <div v-else-if="!hasListas" class="text-center py-12">
          <Users class="h-16 w-16 mx-auto mb-4 opacity-30" />
          <h3 class="font-semibold text-lg mb-2">No hay listas creadas aún</h3>
          <p class="text-sm text-gray-500 mb-4">Crea tu primera lista para empezar a gestionar contactos</p>
          <button class="btn btn-primary btn-sm gap-2" @click="openNuevaListaModal">
            <Plus class="h-4 w-4" />
            Crear Primera Lista
          </button>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="lista in listas" 
            :key="lista.id" 
            class="card bg-base-200 hover:bg-base-300 transition-colors cursor-pointer"
          >
            <div class="card-body">
              <div class="flex justify-between items-start">
                <div class="flex-1" @click="handleSelectLista(lista.id)">
                  <h3 class="font-semibold text-lg">{{ lista.nombreLista }}</h3>
                  <p class="text-sm text-gray-500 mt-1">{{ lista.descripcion }}</p>
                </div>
                <button 
                  class="btn btn-ghost btn-xs btn-circle text-error"
                  @click.stop="handleDeleteLista(lista.id)"
                  title="Eliminar lista"
                >
                  <Trash2 class="h-3 w-3" />
                </button>
              </div>
              
              <div class="divider my-2"></div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-sm">
                  <Users class="h-4 w-4 text-primary" />
                  <span class="font-semibold">{{ lista.totalContactos || 0 }}</span>
                  <span class="text-gray-500">contactos</span>
                </div>
                
                <button 
                  class="btn btn-xs btn-primary gap-1"
                  @click="handleSelectLista(lista.id)"
                >
                  Ver Contactos →
                </button>
              </div>
              
              <div class="text-xs text-gray-400 mt-2">
                Creada: {{ new Date(lista.fechaCreacion).toLocaleDateString() }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vista de Contactos (cuando hay lista seleccionada) -->
    <div v-else class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div class="flex items-center gap-3">
            <button class="btn btn-sm btn-ghost gap-2" @click="handleVolverAListas">
              <ArrowLeft class="h-4 w-4" />
              Volver a Listas
            </button>
            <div class="divider divider-horizontal mx-0"></div>
            <div>
              <h2 class="font-bold text-lg">{{ nombreListaActual }}</h2>
              <p class="text-sm text-gray-500">{{ contactosCurrentLista.length }} contactos</p>
            </div>
          </div>
          
          <div class="flex gap-2">
            <button class="btn btn-sm btn-secondary gap-2" @click="isImportModalOpen = true">
              <Upload class="h-4 w-4" />
              Importar CSV
            </button>
            <button class="btn btn-sm btn-primary gap-2" @click="isContactoModalOpen = true">
              <UserPlus class="h-4 w-4" />
              Agregar Contacto
            </button>
          </div>
        </div>

        <div v-if="isLoadingContactos" class="text-center py-12">
          <span class="loading loading-spinner loading-lg"></span>
          <p class="text-sm text-gray-500 mt-2">Cargando contactos...</p>
        </div>

        <div v-else-if="!hasContactos" class="text-center py-12">
          <Users class="h-16 w-16 mx-auto mb-4 opacity-30" />
          <h3 class="font-semibold text-lg mb-2">No hay contactos en esta lista</h3>
          <p class="text-sm text-gray-500 mb-4">Agrega contactos individualmente o importa desde un CSV</p>
          <div class="flex gap-2 justify-center">
            <button class="btn btn-sm btn-secondary gap-2" @click="isImportModalOpen = true">
              <Upload class="h-4 w-4" />
              Importar CSV
            </button>
            <button class="btn btn-sm btn-primary gap-2" @click="isContactoModalOpen = true">
              <UserPlus class="h-4 w-4" />
              Agregar Contacto
            </button>
          </div>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>Email</th>
                <th>Nombre Completo</th>
                <th>Teléfono</th>
                <th>Empresa</th>
                <th>Cargo</th>
                <th class="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="contacto in contactosCurrentLista" :key="contacto.id">
                <td class="font-mono text-sm">{{ contacto.email }}</td>
                <td>{{ contacto.nombre }} {{ contacto.apellido }}</td>
                <td>{{ contacto.telefono || '-' }}</td>
                <td>{{ contacto.empresa || '-' }}</td>
                <td>{{ contacto.cargo || '-' }}</td>
                <td class="text-right">
                  <button 
                    class="btn btn-xs btn-error btn-outline gap-1"
                    @click="handleDeleteContacto(contacto.id)"
                  >
                    <Trash2 class="h-3 w-3" />
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modales -->
    <CreateListaModal 
      v-model="isListaModalOpen" 
      @created="handleListaCreated"
    />
    <AgregarContactoModal 
      v-model="isContactoModalOpen" 
      :id-lista="listaSeleccionada"
      @created="handleContactoCreated"
    />
    <ImportContactosModal 
      v-model="isImportModalOpen" 
      :id-lista="listaSeleccionada"
      @imported="handleContactosImported"
    />
  </div>
</template>
