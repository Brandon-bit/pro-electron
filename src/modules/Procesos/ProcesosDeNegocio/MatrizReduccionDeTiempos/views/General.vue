<script setup lang="ts">
import { onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import FiltrosCascada from '../components/FiltrosCascada.vue'
import StatsCards from '../components/StatsCards.vue'
import FormularioProyecto from '../components/FormularioProyecto.vue'
import TablaComparativa from '../components/TablaComparativa.vue'
import { useReduccionStore } from '../store/reduccionStore'
import { useReduccionActions } from '../composables/useReduccionActions'
import { useReduccionUtils } from '../composables/useReduccionUtils'

const reduccionStore = useReduccionStore()
const { loadInitialData } = useReduccionActions()
const { exportarCSV, exportarJSON, imprimirComparacion } = useReduccionUtils()

onMounted(() => {
    loadInitialData()
})

const handleExportarCSV = () => {
    exportarCSV(
        reduccionStore.actividadesAsis,
        reduccionStore.actividadesTobe,
        reduccionStore.tiempoTotalAsis,
        reduccionStore.tiempoTotalTobe,
        reduccionStore.reduccion.reduccionTiempo,
        reduccionStore.reduccion.reduccionActividades
    )
}

const handleExportarJSON = () => {
    exportarJSON(
        reduccionStore.actividadesAsis,
        reduccionStore.actividadesTobe,
        reduccionStore.tiempoTotalAsis,
        reduccionStore.tiempoTotalTobe,
        reduccionStore.reduccion.reduccionTiempo,
        reduccionStore.reduccion.reduccionActividades,
        reduccionStore.infoProyecto
    )
}
</script>

<template>
    <div class="container mx-auto">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div class="flex-1">
                <BaseTitle 
                    title="Matriz de Reducción de Tiempos" 
                    subtitle="Comparación AS-IS vs TO-BE" 
                />
            </div>
        </div>

        <div class="divider"></div>

        <!-- Filtros en Cascada -->
        <div class="mb-6">
            <FiltrosCascada />
        </div>

        <div class="divider"></div>

        <!-- Loading State -->
        <div v-if="reduccionStore.isLoading" class="flex justify-center items-center py-20">
            <div class="text-center">
                <span class="loading loading-spinner loading-lg"></span>
                <p class="mt-4 text-base-content/70">Cargando datos...</p>
            </div>
        </div>

        <!-- Contenido Principal (solo se muestra después de comparar) -->
        <div v-else-if="reduccionStore.showComparacion">
            <!-- Stats Cards -->
            <div class="mb-6">
                <StatsCards />
            </div>

            <div class="divider"></div>

            <!-- Formulario Información del Proyecto -->
            <div class="mb-6">
                <FormularioProyecto />
            </div>

            <div class="divider"></div>

            <!-- Botones de Exportación -->
            <div class="flex flex-wrap gap-2 mb-6">
                <button 
                    class="btn btn-outline btn-info"
                    @click="handleExportarCSV"
                >
                    <span class="material-symbols-outlined">download</span>
                    Exportar CSV
                </button>
                <button 
                    class="btn btn-outline btn-success"
                    @click="handleExportarJSON"
                >
                    <span class="material-symbols-outlined">download</span>
                    Exportar JSON
                </button>
                <button 
                    class="btn btn-outline btn-secondary"
                    @click="imprimirComparacion"
                >
                    <span class="material-symbols-outlined">print</span>
                    Imprimir
                </button>
            </div>

            <!-- Tablas Comparativas -->
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <!-- Tabla AS-IS -->
                <div v-if="reduccionStore.actividadesAsis.length > 0">
                    <TablaComparativa tipo="asis" />
                </div>

                <!-- Tabla TO-BE -->
                <div v-if="reduccionStore.actividadesTobe.length > 0">
                    <TablaComparativa tipo="tobe" />
                </div>
            </div>

            <!-- Mensaje si no hay ninguna tabla -->
            <div 
                v-if="reduccionStore.actividadesAsis.length === 0 && reduccionStore.actividadesTobe.length === 0"
                class="text-center py-20"
            >
                <span class="material-symbols-outlined text-6xl text-base-content/30">error</span>
                <p class="mt-4 text-xl text-base-content/70">
                    No se encontraron actividades para los diagramas seleccionados
                </p>
            </div>
        </div>

        <!-- Estado Vacío (antes de comparar) -->
        <div v-else class="text-center py-20">
            <span class="material-symbols-outlined text-6xl text-base-content/30">compare_arrows</span>
            <p class="mt-4 text-xl text-base-content/70">
                Selecciona los diagramas y presiona "Comparar" para ver los resultados
            </p>
        </div>
    </div>
</template>

<style scoped>
@media print {
    .btn {
        display: none;
    }
}
</style>
