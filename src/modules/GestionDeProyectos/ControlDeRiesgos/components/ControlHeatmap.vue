<script setup lang="ts">
import useRiskStore from '@/modules/GestionDeProyectos/ControlDeRiesgos/store/riskStore'
import { useRiskActions } from '@/modules/GestionDeProyectos/ControlDeRiesgos/composables/useRiskActions'

const riskStore = useRiskStore()
const { getRiskColor, getRiskLevel } = useRiskActions()
</script>

<template>
    <div class="space-y-4">
        <h3 class="text-lg font-semibold">Matriz de Calor - Controles</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
                v-for="risk in riskStore.risksWithStrategy" 
                :key="risk.id" 
                class="card bg-base-100 shadow-xl"
            >
                <div class="card-body p-4">
                    <div class="flex items-center justify-between mb-2">
                        <h4 class="card-title text-sm">{{ risk.id }}</h4>
                        <span :class="['badge', getRiskColor(risk.score)]">
                            {{ getRiskLevel(risk.score) }}
                        </span>
                    </div>
                    <div class="space-y-2 text-sm">
                        <p class="font-medium">{{ risk.description }}</p>
                        <div class="flex items-center gap-2 opacity-70">
                            <span class="font-semibold">Estrategia:</span>
                            <span class="badge badge-outline badge-sm">{{ risk.strategy }}</span>
                        </div>
                        <div class="opacity-70">
                            <span class="font-semibold">Acciones:</span> {{ risk.actions }}
                        </div>
                        <div class="opacity-70">
                            <span class="font-semibold">Responsable:</span> {{ risk.responsible }}
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="font-semibold">Estado:</span>
                            <span :class="['badge badge-sm', risk.status === 'Activo' ? 'badge-primary' : 'badge-ghost']">
                                {{ risk.status }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
