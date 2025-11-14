<script setup lang="ts">
import useSPCStore from '@/modules/DiagramasDeDecision/SPC/store/spcStore'

const spcStore = useSPCStore()
</script>

<template>
    <div class="grid md:grid-cols-4 gap-4">
        <!-- Media -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="text-sm font-medium opacity-70">Media (X̄)</h3>
                <p class="text-2xl font-bold">{{ spcStore.controlLimits.mean.toFixed(2) }}</p>
            </div>
        </div>

        <!-- Desviación Estándar -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="text-sm font-medium opacity-70">Desv. Estándar (σ)</h3>
                <p class="text-2xl font-bold">{{ spcStore.controlLimits.sigma.toFixed(2) }}</p>
            </div>
        </div>

        <!-- UCL -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="text-sm font-medium opacity-70">UCL (Límite Superior)</h3>
                <p class="text-2xl font-bold text-error">{{ spcStore.controlLimits.ucl.toFixed(2) }}</p>
            </div>
        </div>

        <!-- LCL -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h3 class="text-sm font-medium opacity-70">LCL (Límite Inferior)</h3>
                <p class="text-2xl font-bold text-error">{{ spcStore.controlLimits.lcl.toFixed(2) }}</p>
            </div>
        </div>
    </div>
</template>
