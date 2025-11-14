<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import FiltrosVoBo from '../components/FiltrosVoBo.vue'
import TablaProcesos from '../components/TablaProcesos.vue'
import TablaOlas from '../components/TablaOlas.vue'
import TablaManuales from '../components/TablaManuales.vue'
import DeleteVoBoModal from '../components/DeleteVoBoModal.vue'
import SendVoBoModal from '../components/SendVoBoModal.vue'
import { useVoBoStore } from '../store/voboStore'
import { useVoBoActions } from '../composables/useVoBoActions'
import type { IVoBoManual } from '../types/vobo.types'

const voboStore = useVoBoStore()
const { loadDataInicial, createVoBoManual } = useVoBoActions()

// Tabs
const activeTab = ref<'procesos' | 'olas' | 'manuales'>('procesos')

// Modales
const isDeleteModalOpen = ref(false)
const isSendModalOpen = ref(false)
const selectedVoBo = ref<IVoBoManual | null>(null)
const isCreatingVoBo = ref(false)

// Cargar datos al montar
onMounted(async () => {
    await loadDataInicial()
})

// Handlers de modales
const openDeleteModal = (vobo: IVoBoManual) => {
    selectedVoBo.value = vobo
    isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
    isDeleteModalOpen.value = false
    selectedVoBo.value = null
}

const openSendModal = (vobo: IVoBoManual) => {
    selectedVoBo.value = vobo
    isSendModalOpen.value = true
}

const closeSendModal = () => {
    isSendModalOpen.value = false
    selectedVoBo.value = null
}

const handleCreateVoBo = async () => {
    if (!voboStore.filtro.dniProc) return
    
    isCreatingVoBo.value = true
    
    const newVoBo = await createVoBoManual({
        dniProc: voboStore.filtro.dniProc
    })
    
    isCreatingVoBo.value = false
    
    if (newVoBo) {
        // Cambiar a tab de manuales para ver el nuevo VoBo
        activeTab.value = 'manuales'
    }
}

// Change tab
const changeTab = (tab: 'procesos' | 'olas' | 'manuales') => {
    activeTab.value = tab
}
</script>

<template>
    <div class="container mx-auto">
        <!-- Header -->
        <div class="mb-6">
            <BaseTitle title="Matriz VoBo" subtitle="Gestión de Vistos Buenos de Procesos" />
        </div>

        <!-- Filtros -->
        <div class="mb-6">
            <FiltrosVoBo />
        </div>

        <div class="divider"></div>

        <!-- Loading State -->
        <div v-if="voboStore.isLoading" class="flex justify-center items-center py-20">
            <div class="text-center">
                <span class="loading loading-spinner loading-lg"></span>
                <p class="mt-4 text-base-content/70">Cargando datos...</p>
            </div>
        </div>

        <!-- Contenido Principal -->
        <div v-else>
            <!-- Tabs -->
            <div class="tabs tabs-boxed mb-6">
                <button 
                    @click="changeTab('procesos')"
                    :class="['tab', { 'tab-active': activeTab === 'procesos' }]"
                >
                    <span class="material-symbols-outlined mr-2">account_tree</span>
                    Procesos
                </button>
                <button 
                    @click="changeTab('olas')"
                    :class="['tab', { 'tab-active': activeTab === 'olas' }]"
                >
                    <span class="material-symbols-outlined mr-2">waves</span>
                    Olas
                </button>
                <button 
                    @click="changeTab('manuales')"
                    :class="['tab', { 'tab-active': activeTab === 'manuales' }]"
                >
                    <span class="material-symbols-outlined mr-2">menu_book</span>
                    Manuales
                </button>
            </div>

            <!-- Tab Content -->
            <div class="bg-base-100 rounded-lg shadow-lg p-6">
                <!-- Tab Procesos -->
                <div v-show="activeTab === 'procesos'">
                    <TablaProcesos />
                </div>

                <!-- Tab Olas -->
                <div v-show="activeTab === 'olas'">
                    <TablaOlas />
                </div>

                <!-- Tab Manuales -->
                <div v-show="activeTab === 'manuales'">
                    <TablaManuales 
                        @open-create-modal="handleCreateVoBo"
                        @open-delete-modal="openDeleteModal"
                        @open-send-modal="openSendModal"
                    />
                </div>
            </div>
        </div>

        <!-- Modales -->
        <DeleteVoBoModal 
            :is-open="isDeleteModalOpen" 
            :vobo="selectedVoBo"
            @close="closeDeleteModal" 
        />
        
        <SendVoBoModal 
            :is-open="isSendModalOpen" 
            :vobo="selectedVoBo"
            @close="closeSendModal" 
        />
    </div>
</template>

