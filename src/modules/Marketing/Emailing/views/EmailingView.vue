<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue';
// Importa los iconos
import { Plus, Mail, Users, BarChart, Send } from 'lucide-vue-next';
import PlantillasTab from '../components/PlantillasTab.vue';
import CampaniasTab from '../components/CampaniasTab.vue';
import AudienciasTab from '../components/AudienciasTab.vue';
import { useEmailingStore } from '@/store/emailing';
import { storeToRefs } from 'pinia';

// Store
const emailingStore = useEmailingStore();

// Reactive refs from store using storeToRefs for reactivity
const { 
  brands, 
  isLoadingBrands, 
  currentAccountId,
  currentError,
  campanias,
  listas
} = storeToRefs(emailingStore);

// Referencia al componente hijo CampaniasTab
const campaniasTabRef = ref<InstanceType<typeof CampaniasTab> | null>(null);

// --- Lógica para las Pestañas (Tabs) ---
const activeTab = ref('campaigns'); // 'campaigns', 'lists', 'templates'

// Data loading function
const loadData = async () => {
  if (!emailingStore.currentAccountId) {
    console.warn('No account selected');
    return;
  }
  
  try {
    await Promise.all([
      emailingStore.fetchCampanias(),
      emailingStore.fetchListas(),
      emailingStore.fetchPlantillas()
    ]);
  } catch (err) {
    console.error("Error loading data:", err);
  }
};

// Watcher for account changes
watch(currentAccountId, async (newAccountId) => {
  if (newAccountId) {
    await loadData();
  }
});

// Lifecycle
onMounted(async () => {
  // Load brands first
  await emailingStore.fetchBrands();
  // Then load data if account is selected
  if (emailingStore.currentAccountId) {
    await loadData();
  }
});

// --- Lógica para los Datos Computados de las Tarjetas (desde store) ---
const totalSubscribers = computed(() => {
  return listas.value.reduce((sum, lista) => sum + (lista.totalContactos || 0), 0);
});

const totalCampaniasEnviadas = computed(() => {
  return campanias.value.filter(c => c.estado?.toLowerCase() === 'enviada').length;
});

const totalSent = computed(() => {
  return campanias.value.reduce((sum, c) => sum + (c.totalEnviados || 0), 0);
});

const totalOpened = computed(() => {
  return campanias.value.reduce((sum, c) => sum + (c.totalAbiertos || 0), 0);
});

const totalClicked = computed(() => {
  return campanias.value.reduce((sum, c) => sum + (c.totalClicks || 0), 0);
});

const openRate = computed(() => {
  if (totalSent.value === 0) return '0.0%';
  return ((totalOpened.value / totalSent.value) * 100).toFixed(1) + '%';
});

const clickThroughRate = computed(() => {
  if (totalOpened.value === 0) return '0.0%';
  return ((totalClicked.value / totalOpened.value) * 100).toFixed(1) + '%';
});

// Función para abrir modal de nueva campaña desde botón global
const handleNuevaCampana = async () => {
  activeTab.value = 'campaigns';
  await nextTick();
  campaniasTabRef.value?.openNuevaCampaniaModal();
};
</script>

<template>
  <div class="p-4 sm:p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold">E-mailing</h1>
        <p class="text-muted-foreground mt-2">
          Gestiona campañas de email marketing y audiencias
        </p>
      </div>
      
      <!-- Dynamic Brand Selector -->
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600">Marca:</span>
        
        <!-- Loading State -->
        <div v-if="isLoadingBrands" class="flex items-center gap-2">
          <span class="loading loading-spinner loading-sm"></span>
          <span class="text-sm text-gray-500">Cargando marcas...</span>
        </div>
        
        <!-- Brand Selector -->
        <select 
          v-else-if="brands.length > 0"
          v-model="emailingStore.currentAccountId"
          class="select select-bordered select-sm"
          @change="loadData"
        >
          <option value="">Seleccionar marca</option>
          <option 
            v-for="brand in brands" 
            :key="brand.id" 
            :value="brand.id"
          >
            {{ brand.name }}
          </option>
        </select>
        
        <!-- No Brands State -->
        <div v-else class="text-sm text-gray-500">
          No se encontraron marcas.
        </div>
      </div>
    </div>

    <!-- Error Display -->
    <div v-if="currentError" class="alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ currentError }}</span>
      <button @click="emailingStore.clearError()" class="btn btn-sm btn-ghost">✕</button>
    </div>
    
    <div class="flex justify-end items-center">
      <button class="btn btn-primary" @click="handleNuevaCampana">
        <Plus class="mr-2 h-4 w-4" />
        Nueva Campaña
      </button>
    </div>

    <!-- Cards de Resumen -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center justify-between"><h3 class="card-title text-sm font-medium">Campañas Enviadas</h3><Send class="h-4 w-4 text-gray-400" /></div>
          <p class="text-2xl font-bold mt-2">{{ totalCampaniasEnviadas }}</p><p class="text-xs text-gray-500">Total</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center justify-between"><h3 class="card-title text-sm font-medium">Tasa de Apertura</h3><Mail class="h-4 w-4 text-gray-400" /></div>
          <p class="text-2xl font-bold mt-2">{{ openRate }}</p><p class="text-xs text-green-600">+5% vs mes anterior</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center justify-between"><h3 class="card-title text-sm font-medium">Click-Through Rate</h3><BarChart class="h-4 w-4 text-gray-400" /></div>
          <p class="text-2xl font-bold mt-2">{{ clickThroughRate }}</p><p class="text-xs text-green-600">+2.1% vs mes anterior</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="flex items-center justify-between"><h3 class="card-title text-sm font-medium">Suscriptores Totales</h3><Users class="h-4 w-4 text-gray-400" /></div>
          <p class="text-2xl font-bold mt-2">{{ totalSubscribers.toLocaleString() }}</p><p class="text-xs text-gray-500">En todas las listas</p>
        </div>
      </div>
    </div>

    <!-- Sistema de Pestañas (Tabs) -->
    <div>
      <div role="tablist" class="tabs tabs-boxed">
        <a role="tab" class="tab" :class="{'tab-active': activeTab === 'campaigns'}" @click="activeTab = 'campaigns'">Campañas</a>
        <a role="tab" class="tab" :class="{'tab-active': activeTab === 'lists'}" @click="activeTab = 'lists'">Listas de Audiencias</a>
        <a role="tab" class="tab" :class="{'tab-active': activeTab === 'templates'}" @click="activeTab = 'templates'">Plantillas</a>
      </div>

      <div class="mt-4">
        <!-- Contenido de la Pestaña "Campañas" -->
        <div v-if="activeTab === 'campaigns'">
          <CampaniasTab ref="campaniasTabRef" />
        </div>

        <!-- Contenido de la Pestaña "Listas de Audiencias" -->
        <div v-if="activeTab === 'lists'">
          <AudienciasTab />
        </div>
        
        <!-- Contenido de la Pestaña "Plantillas" -->
        <div v-if="activeTab === 'templates'">
          <PlantillasTab :id-marca="currentAccountId || ''" />
        </div>
      </div>
    </div>
  </div>
</template>