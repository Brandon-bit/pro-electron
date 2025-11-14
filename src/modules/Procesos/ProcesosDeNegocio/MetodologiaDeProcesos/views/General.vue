<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import SelectProceso from '../components/SelectProceso.vue'
import FaseCard from '../components/FaseCard.vue'
import AddActividadModal from '../components/AddActividadModal.vue'
import DeleteActividadModal from '../components/DeleteActividadModal.vue'
import { useMetodologiaStore } from '../store/metodologiaStore'
import type { IFase, IActividad } from '../types/metodologia.types'

const metodologiaStore = useMetodologiaStore()

// Modales
const isAddModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedFase = ref<IFase | null>(null)
const selectedActividad = ref<IActividad | null>(null)

// Título dinámico
const subtitulo = computed(() => {
    return metodologiaStore.procesoSeleccionado?.nombre || ''
})

// Handlers
const openAddModal = (fase: IFase) => {
    console.log('[General] openAddModal llamado, fase:', fase.nombre)
    selectedFase.value = fase
    isAddModalOpen.value = true
    console.log('[General] Modal abierto, isAddModalOpen:', isAddModalOpen.value)
}

const closeAddModal = () => {
    console.log('[General] closeAddModal llamado')
    isAddModalOpen.value = false
    selectedFase.value = null
}

const openDeleteModal = (fase: IFase, actividad: IActividad) => {
    console.log('[General] openDeleteModal llamado')
    selectedFase.value = fase
    selectedActividad.value = actividad
    isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
    console.log('[General] closeDeleteModal llamado')
    isDeleteModalOpen.value = false
    selectedFase.value = null
    selectedActividad.value = null
}
</script>

<template>
    <div class="container mx-auto">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div class="flex-1">
                <BaseTitle 
                    title="Metodología de Procesos Nivel 4" 
                    :subtitle="subtitulo" 
                />
            </div>
            <div class="w-full md:w-auto md:min-w-[350px]">
                <SelectProceso />
            </div>
        </div>

        <div class="divider"></div>

        <!-- Loading State -->
        <div v-if="metodologiaStore.isLoading" class="flex justify-center items-center py-20">
            <div class="text-center">
                <span class="loading loading-spinner loading-lg"></span>
                <p class="mt-4 text-base-content/70">Cargando metodología...</p>
            </div>
        </div>

        <!-- Contenido Principal -->
        <div v-else-if="metodologiaStore.hasProcesoSeleccionado">
            <!-- Estadísticas -->
            <div class="stats stats-vertical md:stats-horizontal shadow mb-6 w-full">
                <div class="stat">
                    <div class="stat-figure text-primary">
                        <span class="material-symbols-outlined text-4xl">category</span>
                    </div>
                    <div class="stat-title">Total Fases</div>
                    <div class="stat-value text-primary">{{ metodologiaStore.fases.length }}</div>
                </div>
                
                <div class="stat">
                    <div class="stat-figure text-info">
                        <span class="material-symbols-outlined text-4xl">pending</span>
                    </div>
                    <div class="stat-title">En Progreso</div>
                    <div class="stat-value text-info">{{ metodologiaStore.contadorEstados.activas }}</div>
                </div>
                
                <div class="stat">
                    <div class="stat-figure text-success">
                        <span class="material-symbols-outlined text-4xl">check_circle</span>
                    </div>
                    <div class="stat-title">Completadas</div>
                    <div class="stat-value text-success">{{ metodologiaStore.contadorEstados.finalizadas }}</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <span class="material-symbols-outlined text-4xl">percent</span>
                    </div>
                    <div class="stat-title">Progreso Total</div>
                    <div class="stat-value">{{ metodologiaStore.progresoTotal }}%</div>
                    <div class="stat-desc">
                        <progress 
                            class="progress progress-primary w-full" 
                            :value="metodologiaStore.progresoTotal" 
                            max="100"
                        ></progress>
                    </div>
                </div>
            </div>

            <!-- Scroll Horizontal de Fases -->
            <div class="fases-container">
                <div class="fases-scroll">
                    <FaseCard
                        v-for="(fase, index) in metodologiaStore.fases"
                        :key="fase.dni"
                        :fase="fase"
                        :index="index"
                        @add-actividad="openAddModal"
                        @delete-actividad="openDeleteModal"
                    />
                </div>
            </div>
        </div>

        <!-- Estado Vacío -->
        <div v-else class="text-center py-20">
            <span class="material-symbols-outlined text-6xl text-base-content/30">timeline</span>
            <p class="mt-4 text-xl text-base-content/70">
                Selecciona un proceso para ver su metodología
            </p>
        </div>

        <!-- Modales -->
        <AddActividadModal 
            :is-open="isAddModalOpen" 
            :fase="selectedFase"
            @close="closeAddModal" 
        />
        
        <DeleteActividadModal 
            :is-open="isDeleteModalOpen" 
            :fase="selectedFase"
            :actividad="selectedActividad"
            @close="closeDeleteModal" 
        />
    </div>
</template>

<style scoped>
.fases-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    padding: 1rem 0 2rem;
}

.fases-scroll {
    display: flex;
    gap: 3rem;
    overflow-x: auto;
    padding: 1rem 1rem 3rem;
    scroll-behavior: smooth;
}

/* Scrollbar personalizado */
.fases-scroll::-webkit-scrollbar {
    height: 12px;
}

.fases-scroll::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 6px;
}

.fases-scroll::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 6px;
    border: 2px solid rgba(0, 0, 0, 0.05);
}

.fases-scroll::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(90deg, #764ba2 0%, #667eea 100%);
}

/* Animación de entrada */
.fases-scroll > * {
    animation: fadeInUp 0.5s ease-out;
    animation-fill-mode: both;
}

.fases-scroll > *:nth-child(1) { animation-delay: 0.1s; }
.fases-scroll > *:nth-child(2) { animation-delay: 0.2s; }
.fases-scroll > *:nth-child(3) { animation-delay: 0.3s; }
.fases-scroll > *:nth-child(4) { animation-delay: 0.4s; }
.fases-scroll > *:nth-child(5) { animation-delay: 0.5s; }
.fases-scroll > *:nth-child(6) { animation-delay: 0.6s; }

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
