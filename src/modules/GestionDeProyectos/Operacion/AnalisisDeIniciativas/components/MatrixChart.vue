<script setup lang="ts">
import type { InitiativeType } from '@/modules/GestionDeProyectos/Operacion/AnalisisDeIniciativas/types/initiativeTypes'

defineProps<{
    initiatives: InitiativeType[]
}>()

const getPositionStyle = (initiative: InitiativeType) => {
    // Normalizar scores a porcentajes (0-100)
    const xPercent = (initiative.impactScore / 10) * 100
    const yPercent = 100 - ((initiative.effortScore / 10) * 100) // Invertir Y para que alto esfuerzo esté arriba
    
    return {
        left: `${xPercent}%`,
        top: `${yPercent}%`
    }
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Matriz Esfuerzo vs Impacto</h2>
            <p class="text-sm opacity-70">Visualización gráfica de las iniciativas evaluadas</p>
            
            <div class="relative w-full h-[500px] bg-base-200 rounded-lg border border-base-300 mt-4">
                <!-- Grid -->
                <div class="absolute inset-0 grid grid-cols-2 grid-rows-2">
                    <div class="border-r border-b border-base-300 p-4 flex items-center justify-center">
                        <span class="text-sm opacity-70">Bajo Esfuerzo / Bajo Impacto</span>
                    </div>
                    <div class="border-b border-base-300 p-4 flex items-center justify-center bg-success/10">
                        <span class="text-sm font-medium">Bajo Esfuerzo / Alto Impacto</span>
                    </div>
                    <div class="border-r border-base-300 p-4 flex items-center justify-center">
                        <span class="text-sm opacity-70">Alto Esfuerzo / Bajo Impacto</span>
                    </div>
                    <div class="p-4 flex items-center justify-center">
                        <span class="text-sm opacity-70">Alto Esfuerzo / Alto Impacto</span>
                    </div>
                </div>

                <!-- Axes labels -->
                <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-4">
                    <span class="font-medium rotate-[-90deg] block w-20 origin-center">Esfuerzo</span>
                </div>
                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-4">
                    <span class="font-medium">Impacto</span>
                </div>

                <!-- Points -->
                <div
                    v-for="initiative in initiatives"
                    :key="initiative.id"
                    class="absolute w-4 h-4 rounded-full bg-primary shadow-lg cursor-pointer hover:scale-125 transition-transform -translate-x-1/2 -translate-y-1/2 tooltip"
                    :style="getPositionStyle(initiative)"
                    :data-tip="initiative.name"
                />
            </div>
        </div>
    </div>
</template>
