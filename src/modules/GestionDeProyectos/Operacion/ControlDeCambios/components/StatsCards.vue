<script setup lang="ts">
import useChangeStore from '@/modules/GestionDeProyectos/Operacion/ControlDeCambios/store/changeStore'

const changeStore = useChangeStore()
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- Total Solicitudes -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium opacity-70">Total Solicitudes</h3>
                    <span class="material-symbols-outlined opacity-50">edit_document</span>
                </div>
                <div class="text-2xl font-bold">{{ changeStore.changeRequests.length }}</div>
            </div>
        </div>

        <!-- Pendientes -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium opacity-70">Pendientes</h3>
                    <span class="material-symbols-outlined text-accent">schedule</span>
                </div>
                <div class="text-2xl font-bold">{{ changeStore.pendingRequests.length }}</div>
            </div>
        </div>

        <!-- Aprobadas -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium opacity-70">Aprobadas</h3>
                    <span class="material-symbols-outlined text-success">check_circle</span>
                </div>
                <div class="text-2xl font-bold">{{ changeStore.approvedRequests.length }}</div>
            </div>
        </div>

        <!-- Rechazadas -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium opacity-70">Rechazadas</h3>
                    <span class="material-symbols-outlined text-error">thumb_down</span>
                </div>
                <div class="text-2xl font-bold">{{ changeStore.rejectedRequests.length }}</div>
            </div>
        </div>
    </div>
</template>
