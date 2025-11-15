<script setup lang="ts">
import { onMounted, watch, computed } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import StageTracker from '@/modules/GestionDeProyectos/Operacion/ResumenDeProyectos/components/StageTracker.vue'
import useSummaryStore from '@/modules/GestionDeProyectos/Operacion/ResumenDeProyectos/store/summaryStore'
import { useSummaryActions } from '@/modules/GestionDeProyectos/Operacion/ResumenDeProyectos/composables/useSummaryActions'

const summaryStore = useSummaryStore()
const { loadAreas, loadProjects, getProjectStages, formatCurrency, exportToExcel } = useSummaryActions()

const selectedArea = computed({
    get: () => summaryStore.selectedArea,
    set: (value: string) => summaryStore.setSelectedArea(value)
})

onMounted(() => {
    loadAreas()
})

watch(() => summaryStore.selectedArea, (newArea) => {
    if (newArea) {
        loadProjects(newArea)
    }
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <BaseTitle 
                title="Resumen de Proyectos" 
                subtitle="Dashboard ejecutivo de proyectos por área"
            />
            <button
                @click="exportToExcel"
                :disabled="!selectedArea || summaryStore.projects.length === 0"
                class="btn btn-primary gap-2"
            >
                <span class="material-symbols-outlined">description</span>
                Exportar a Excel
            </button>
        </div>

        <!-- Filter Section -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="card-title text-lg">Filtros</h3>
                <div class="max-w-md">
                    <label class="text-sm font-medium mb-2 block">
                        Seleccionar Área
                    </label>
                    <select 
                        v-model="selectedArea" 
                        class="select select-bordered w-full"
                    >
                        <option value="" disabled>Selecciona un área</option>
                        <option 
                            v-for="area in summaryStore.areas" 
                            :key="area.id" 
                            :value="area.id"
                        >
                            {{ area.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Projects Matrix -->
        <div v-if="selectedArea" class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="card-title text-lg">
                    Proyectos - {{ summaryStore.getAreaName(selectedArea) }}
                </h3>
                
                <!-- Loading State -->
                <div v-if="summaryStore.isLoading" class="space-y-3">
                    <div v-for="i in 3" :key="i" class="skeleton h-16 w-full"></div>
                </div>
                
                <!-- Empty State -->
                <div v-else-if="summaryStore.projects.length === 0" class="flex flex-col items-center justify-center py-12 text-center">
                    <span class="material-symbols-outlined text-6xl opacity-30 mb-4">
                        folder_open
                    </span>
                    <h3 class="text-lg font-semibold mb-2">
                        No hay proyectos para mostrar
                    </h3>
                    <p class="text-sm opacity-70 max-w-md">
                        No se encontraron proyectos en el área seleccionada. 
                        Los proyectos aparecerán aquí una vez que sean registrados.
                    </p>
                </div>
                
                <!-- Projects Table -->
                <div v-else class="overflow-x-auto">
                    <table class="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th class="font-semibold">Proyecto</th>
                                <th class="font-semibold">Categoría</th>
                                <th class="font-semibold">Etapas</th>
                                <th class="font-semibold text-right">Importe Estimado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="project in summaryStore.projects" :key="project.id" class="hover">
                                <td>
                                    <div class="font-bold">
                                        {{ project.name }}
                                    </div>
                                    <div class="text-xs opacity-70 mt-1">
                                        Folio: {{ project.folio }}
                                    </div>
                                </td>
                                <td>
                                    <span class="badge badge-secondary">
                                        {{ summaryStore.getCategoryName(project.area, project.category) }}
                                    </span>
                                </td>
                                <td>
                                    <StageTracker :stages="getProjectStages(project.id)" />
                                </td>
                                <td class="text-right font-semibold">
                                    {{ formatCurrency(project.budget) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
