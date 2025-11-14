<script setup lang="ts">
import useRiskStore from '@/modules/GestionDeProyectos/ControlDeRiesgos/store/riskStore'

const riskStore = useRiskStore()
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Total de Riesgos -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium opacity-70">Total de Riesgos</h3>
                    <span class="material-symbols-outlined opacity-50">warning</span>
                </div>
                <div class="text-2xl font-bold">{{ riskStore.risks.length }}</div>
                <p class="text-xs opacity-70">
                    {{ riskStore.activeRisks.length }} activos
                </p>
            </div>
        </div>

        <!-- Riesgos Altos -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium opacity-70">Riesgos Altos</h3>
                    <span class="material-symbols-outlined text-error">priority_high</span>
                </div>
                <div class="text-2xl font-bold">{{ riskStore.highRisks.length }}</div>
                <p class="text-xs opacity-70">
                    Requieren atención inmediata
                </p>
            </div>
        </div>

        <!-- Controles Activos -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium opacity-70">Controles Activos</h3>
                    <span class="material-symbols-outlined text-success">check_circle</span>
                </div>
                <div class="text-2xl font-bold">{{ riskStore.risksWithStrategy.length }}</div>
                <p class="text-xs opacity-70">
                    Con estrategia definida
                </p>
            </div>
        </div>
    </div>
</template>
