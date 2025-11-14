<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import SelectorProceso from '../components/SelectorProceso.vue'
import DashboardGlobal from '../components/DashboardGlobal.vue'
import AreaAccordion from '../components/AreaAccordion.vue'
import { useTiemposStore } from '../store/tiemposStore'
import { useTiemposActions } from '../composables/useTiemposActions'
import { useCronometros } from '../composables/useCronometros'
import { useTiemposUtils } from '../composables/useTiemposUtils'

const tiemposStore = useTiemposStore()
const { loadProcesos } = useTiemposActions()
const { recuperarCronometros, detenerTodosLosIntervalos } = useCronometros()
const { exportarCSV, exportarExcel, exportarPDF } = useTiemposUtils()

onMounted(async () => {
    await loadProcesos()
    // Recuperar cronómetros activos si hay datos en localStorage
    recuperarCronometros()
})

onBeforeUnmount(() => {
    // Limpiar intervalos al desmontar
    detenerTodosLosIntervalos()
})

const handleExportarCSV = () => {
    exportarCSV(
        tiemposStore.tabla,
        tiemposStore.kpisGlobales,
        tiemposStore.tabla.Proceso.nombre
    )
}

const handleExportarExcel = () => {
    exportarExcel(
        tiemposStore.tabla,
        tiemposStore.kpisGlobales,
        tiemposStore.tabla.Proceso.nombre
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
                    :title="`Tiempos y Movimientos${tiemposStore.procesoSeleccionado ? ': ' + tiemposStore.procesoSeleccionado.nombre : ''}`" 
                    subtitle="Monitoreo de eficiencia operacional" 
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

        <!-- Botones de acción (placeholder) -->
        <div class="flex flex-wrap gap-2 mb-6" v-if="tiemposStore.hayDatos">
            <button class="btn btn-primary" disabled>
                <span class="material-symbols-outlined">add</span>
                Agregar Área
            </button>
            <button class="btn btn-secondary" disabled>
                <span class="material-symbols-outlined">settings</span>
                Admin Áreas y Puestos
            </button>
            <button class="btn btn-outline btn-success" @click="handleExportarCSV">
                <span class="material-symbols-outlined">download</span>
                Exportar CSV
            </button>
            <button class="btn btn-outline btn-info" @click="handleExportarExcel">
                <span class="material-symbols-outlined">download</span>
                Exportar Excel
            </button>
            <button class="btn btn-outline btn-secondary" @click="handleExportarPDF">
                <span class="material-symbols-outlined">print</span>
                Imprimir / PDF
            </button>
        </div>

        <div class="divider" v-if="tiemposStore.hayDatos"></div>

        <!-- Loading State -->
        <div v-if="tiemposStore.isLoading" class="flex justify-center items-center py-20">
            <div class="text-center">
                <span class="loading loading-spinner loading-lg"></span>
                <p class="mt-4 text-base-content/70">Cargando datos...</p>
            </div>
        </div>

        <!-- Contenido Principal -->
        <div v-else-if="tiemposStore.hayDatos">
            <!-- Dashboard Global -->
            <DashboardGlobal />

            <div class="divider"></div>

            <!-- Áreas y Puestos (Accordion) -->
            <div>
                <AreaAccordion 
                    v-for="(tm, index) in tiemposStore.tabla.Lista" 
                    :key="tm.dni"
                    :tm="tm"
                    :puestos-con-k-p-is="tiemposStore.puestosConKPIs"
                    :is-first="index === 0"
                />

                <!-- Mensaje si no hay áreas -->
                <div v-if="tiemposStore.tabla.Lista.length === 0" class="alert alert-info">
                    <span class="material-symbols-outlined">info</span>
                    <span>No hay áreas agregadas. Usa el botón "Agregar Área" para comenzar.</span>
                </div>
            </div>
        </div>

        <!-- Estado Vacío -->
        <div v-else class="text-center py-20">
            <span class="material-symbols-outlined text-6xl text-base-content/30">timer</span>
            <p class="mt-4 text-xl text-base-content/70">
                Selecciona un proceso para comenzar
            </p>
            <p class="text-sm text-base-content/50 mt-2">
                El sistema de cronómetros y cálculos está listo
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
    
    .alert {
        display: none;
    }
}
</style>
