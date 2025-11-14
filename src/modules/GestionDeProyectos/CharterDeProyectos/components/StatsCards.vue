<script setup lang="ts">
import useCharterStore from '@/modules/GestionDeProyectos/CharterDeProyectos/store/charterStore'

const charterStore = useCharterStore()
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <!-- Total Charters -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium opacity-70">Total Charters</h3>
                    <span class="material-symbols-outlined opacity-50">description</span>
                </div>
                <div class="text-2xl font-bold">{{ charterStore.totalCharters }}</div>
            </div>
        </div>

        <!-- En Revisión -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium opacity-70">En Revisión</h3>
                    <span class="material-symbols-outlined text-warning">schedule</span>
                </div>
                <div class="text-2xl font-bold">{{ charterStore.inReviewCharters.length }}</div>
            </div>
        </div>

        <!-- Aprobados -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium opacity-70">Aprobados</h3>
                    <span class="material-symbols-outlined text-success">check_circle</span>
                </div>
                <div class="text-2xl font-bold">{{ charterStore.approvedCharters.length }}</div>
            </div>
        </div>
    </div>
</template>
