<script setup lang="ts">
import { onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import SelectorProceso from '../components/SelectorProceso.vue'
import LeyendaRasci from '../components/LeyendaRasci.vue'
import StatsCards from '../components/StatsCards.vue'
import MatrizRasci from '../components/MatrizRasci.vue'
import { useRasciStore } from '../store/rasciStore'
import { useRasciActions } from '../composables/useRasciActions'
import { useRasciUtils } from '../composables/useRasciUtils'

const rasciStore = useRasciStore()
const { loadProcesos } = useRasciActions()
const { exportarCSV, exportarExcel, exportarPDF } = useRasciUtils()

onMounted(() => {
    loadProcesos()
})

const handleExportarCSV = () => {
    exportarCSV(
        rasciStore.matriz.Roles,
        rasciStore.actividadesConAccountables,
        rasciStore.totalesRasci,
        rasciStore.matriz.Proceso.nombre,
        true,
        rasciStore.estadisticas
    )
}

const handleExportarExcel = () => {
    exportarExcel(
        rasciStore.matriz.Roles,
        rasciStore.actividadesConAccountables,
        rasciStore.totalesRasci,
        rasciStore.matriz.Proceso.nombre,
        true,
        rasciStore.estadisticas
    )
}

const handleExportarPDF = () => {
    exportarPDF()
}
</script>

<template>
    <div class="container mx-auto">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div class="flex-1">
                <BaseTitle 
                    :title="`RASCI${rasciStore.procesoSeleccionado ? ': ' + rasciStore.procesoSeleccionado.nombre : ''}`" 
                    subtitle="Matriz de Responsabilidades" 
                />
            </div>
        </div>

        <div class="divider"></div>

        <!-- Selector de Proceso -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="md:col-span-1">
                <SelectorProceso />
            </div>
        </div>

        <div class="divider"></div>

        <!-- Loading State -->
        <div v-if="rasciStore.isLoading" class="flex justify-center items-center py-20">
            <div class="text-center">
                <span class="loading loading-spinner loading-lg"></span>
                <p class="mt-4 text-base-content/70">Cargando matriz RASCI...</p>
            </div>
        </div>

        <!-- Contenido Principal -->
        <div v-else-if="rasciStore.hayDatosCargados">
            <!-- Leyenda -->
            <div class="mb-6">
                <LeyendaRasci />
            </div>

            <div class="divider"></div>

            <!-- KPIs / Estadísticas -->
            <div class="mb-6">
                <StatsCards />
            </div>

            <div class="divider"></div>

            <!-- Botones de Exportación -->
            <div class="flex flex-wrap gap-2 mb-6">
                <button 
                    class="btn btn-outline btn-success"
                    @click="handleExportarCSV"
                >
                    <span class="material-symbols-outlined">download</span>
                    Exportar CSV
                </button>
                <button 
                    class="btn btn-outline btn-info"
                    @click="handleExportarExcel"
                >
                    <span class="material-symbols-outlined">download</span>
                    Exportar Excel
                </button>
                <button 
                    class="btn btn-outline btn-secondary"
                    @click="handleExportarPDF"
                >
                    <span class="material-symbols-outlined">print</span>
                    Imprimir / PDF
                </button>
            </div>

            <!-- Matriz RASCI -->
            <div>
                <MatrizRasci />
            </div>
        </div>

        <!-- Estado Vacío -->
        <div v-else class="text-center py-20">
            <span class="material-symbols-outlined text-6xl text-base-content/30">table_chart</span>
            <p class="mt-4 text-xl text-base-content/70">
                Selecciona un proceso para ver la matriz RASCI
            </p>
        </div>
    </div>
</template>

<style scoped>
@media print {
    .btn {
        display: none;
    }
    
    .divider {
        display: none;
    }
}
</style>
