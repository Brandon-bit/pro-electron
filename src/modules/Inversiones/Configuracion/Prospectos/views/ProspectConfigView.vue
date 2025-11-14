<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import AddItemModal from '../components/AddItemModal.vue'
import { useProspectConfig } from '../composables/useProspectConfig'
import type { ConfigType } from '../types/prospectConfigTypes'

const { 
    sectores, 
    estatusSeguimiento, 
    loading, 
    fetchSectores, 
    fetchEstatusSeguimiento,
    createSector,
    createEstatus,
    deleteSector,
    deleteEstatus
} = useProspectConfig()

const addItemModalRef = ref<InstanceType<typeof AddItemModal> | null>(null)
const currentConfigType = ref<ConfigType>('sector')

onMounted(() => {
    fetchSectores()
    fetchEstatusSeguimiento()
})

// Abrir modal para agregar sector
const openAddSectorModal = () => {
    currentConfigType.value = 'sector'
    addItemModalRef.value?.openModal('Agregar Sector')
}

// Abrir modal para agregar estatus
const openAddEstatusModal = () => {
    currentConfigType.value = 'estatus'
    addItemModalRef.value?.openModal('Agregar Estatus')
}

// Confirmar creación
const handleAddItem = async (descripcion: string) => {
    if (currentConfigType.value === 'sector') {
        await createSector(descripcion)
    } else {
        await createEstatus(descripcion)
    }
}

// Eliminar sector
const handleDeleteSector = async (id: string | number) => {
    if (confirm('¿Está seguro de eliminar este sector?')) {
        await deleteSector(id)
    }
}

// Eliminar estatus
const handleDeleteEstatus = async (id: string | number) => {
    if (confirm('¿Está seguro de eliminar este estatus?')) {
        await deleteEstatus(id)
    }
}
</script>

<template>
    <div>
        <BaseTitle 
            title="Configuración de Prospectos" 
            subtitle="Gestión de sectores y estatus de seguimiento"
        />
        
        <div class="container mx-auto p-6">
            <!-- Grid de 2 columnas -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Sectores -->
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title text-2xl justify-center mb-4">
                            Sectores
                        </h2>

                        <!-- Botón Agregar -->
                        <button 
                            class="btn btn-primary btn-sm mb-4"
                            @click="openAddSectorModal"
                        >
                            <span class="material-symbols-outlined text-sm">add</span>
                            Agregar
                        </button>

                        <!-- Tabla -->
                        <div v-if="sectores.length > 0" class="overflow-x-auto">
                            <table class="table table-sm w-full">
                                <thead class="bg-neutral text-neutral-content">
                                    <tr>
                                        <th>#</th>
                                        <th>Descripción</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(sector, index) in sectores" :key="sector.id">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ sector.descripcion }}</td>
                                        <td class="text-right">
                                            <button
                                                class="btn btn-error btn-xs"
                                                @click="handleDeleteSector(sector.id)"
                                            >
                                                <span class="material-symbols-outlined text-xs">close</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Mensaje cuando no hay sectores -->
                        <div v-else class="text-center py-4 text-base-content/50">
                            <p>No hay sectores registrados</p>
                        </div>
                    </div>
                </div>

                <!-- Estatus de Seguimiento -->
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title text-2xl justify-center mb-4">
                            Estatus de Seguimiento
                        </h2>

                        <!-- Botón Agregar -->
                        <button 
                            class="btn btn-primary btn-sm mb-4"
                            @click="openAddEstatusModal"
                        >
                            <span class="material-symbols-outlined text-sm">add</span>
                            Agregar
                        </button>

                        <!-- Tabla -->
                        <div v-if="estatusSeguimiento.length > 0" class="overflow-x-auto">
                            <table class="table table-sm w-full">
                                <thead class="bg-neutral text-neutral-content">
                                    <tr>
                                        <th>#</th>
                                        <th>Descripción</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(estatus, index) in estatusSeguimiento" :key="estatus.id">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ estatus.descripcion }}</td>
                                        <td class="text-right">
                                            <button
                                                class="btn btn-error btn-xs"
                                                @click="handleDeleteEstatus(estatus.id)"
                                            >
                                                <span class="material-symbols-outlined text-xs">close</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Mensaje cuando no hay estatus -->
                        <div v-else class="text-center py-4 text-base-content/50">
                            <p>No hay estatus registrados</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <AddItemModal
            ref="addItemModalRef"
            @confirm="handleAddItem"
        />
    </div>
</template>
