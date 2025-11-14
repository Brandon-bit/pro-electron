<script setup lang="ts">
import { useRiskActions } from '@/modules/GestionDeProyectos/ControlDeRiesgos/composables/useRiskActions'

const { getCellColor, getRisksInCell } = useRiskActions()

const probabilityLevels = [5, 4, 3, 2, 1]
const impactLevels = [1, 2, 3, 4, 5]
</script>

<template>
    <div class="space-y-4">
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Matriz de Calor - Riesgos</h3>
            <div class="flex gap-2 items-center text-sm">
                <div class="flex items-center gap-1">
                    <div class="w-4 h-4 bg-success/20 border border-success"></div>
                    <span>Bajo (1-7)</span>
                </div>
                <div class="flex items-center gap-1">
                    <div class="w-4 h-4 bg-warning/20 border border-warning"></div>
                    <span>Medio (8-14)</span>
                </div>
                <div class="flex items-center gap-1">
                    <div class="w-4 h-4 bg-error/20 border border-error"></div>
                    <span>Alto (15-25)</span>
                </div>
            </div>
        </div>

        <div class="border rounded-lg overflow-hidden">
            <table class="table w-full">
                <thead>
                    <tr class="bg-base-200">
                        <th class="font-semibold">Probabilidad / Impacto</th>
                        <th v-for="imp in impactLevels" :key="imp" class="text-center font-semibold">
                            {{ imp }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="prob in probabilityLevels" :key="prob" class="border-t">
                        <td class="font-semibold bg-base-200">{{ prob }}</td>
                        <td 
                            v-for="imp in impactLevels" 
                            :key="`${prob}-${imp}`" 
                            :class="['text-center transition-colors', getCellColor(prob, imp)]"
                        >
                            <div v-if="getRisksInCell(prob, imp).length > 0" class="flex flex-col gap-1">
                                <span 
                                    v-for="risk in getRisksInCell(prob, imp)" 
                                    :key="risk.id" 
                                    class="badge badge-outline badge-sm"
                                >
                                    {{ risk.id }}
                                </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
                <p class="font-semibold mb-2">Escala de Probabilidad:</p>
                <ul class="space-y-1 opacity-70">
                    <li>5 - Muy Alta (&gt;80%)</li>
                    <li>4 - Alta (60-80%)</li>
                    <li>3 - Media (40-60%)</li>
                    <li>2 - Baja (20-40%)</li>
                    <li>1 - Muy Baja (&lt;20%)</li>
                </ul>
            </div>
            <div>
                <p class="font-semibold mb-2">Escala de Impacto:</p>
                <ul class="space-y-1 opacity-70">
                    <li>5 - Muy Alto (Crítico)</li>
                    <li>4 - Alto (Mayor)</li>
                    <li>3 - Medio (Moderado)</li>
                    <li>2 - Bajo (Menor)</li>
                    <li>1 - Muy Bajo (Insignificante)</li>
                </ul>
            </div>
        </div>
    </div>
</template>
