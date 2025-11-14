<script setup lang="ts">
import useRelationshipStore from '@/modules/DiagramasDeDecision/AnalisisDeRelaciones/store/relationshipStore'
import { useRelationshipActions } from '@/modules/DiagramasDeDecision/AnalisisDeRelaciones/composables/useRelationshipActions'

const relationshipStore = useRelationshipStore()
const { getCorrelationColor, getCorrelationLabel } = useRelationshipActions()

const handleCellClick = (metric1: string, metric2: string) => {
    relationshipStore.selectCell(metric1, metric2)
}
</script>

<template>
    <div 
        v-if="relationshipStore.correlationMatrix.length > 0"
        class="card bg-base-100 shadow-xl"
    >
        <div class="card-body">
            <h2 class="card-title">Mapa de Calor - Matriz de Correlación</h2>
            <p class="text-sm opacity-70">
                Haz clic en una celda para ver el gráfico de dispersión detallado
            </p>

            <div class="overflow-x-auto mt-4">
                <table class="table table-sm border-collapse w-full">
                    <thead>
                        <tr>
                            <th class="border border-base-300"></th>
                            <th
                                v-for="metric in relationshipStore.uniqueMetrics"
                                :key="metric"
                                class="border border-base-300 text-xs font-medium min-w-[100px] text-center"
                            >
                                {{ metric }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="metric1 in relationshipStore.uniqueMetrics"
                            :key="metric1"
                        >
                            <td class="border border-base-300 font-medium text-xs">
                                {{ metric1 }}
                            </td>
                            <td
                                v-for="metric2 in relationshipStore.uniqueMetrics"
                                :key="metric2"
                                :class="[
                                    'border border-base-300 text-center cursor-pointer transition-transform hover:scale-105 p-4',
                                    getCorrelationColor(
                                        relationshipStore.correlationMatrix.find(
                                            r => r.metric1 === metric1 && r.metric2 === metric2
                                        )?.correlation || 0
                                    )
                                ]"
                                @click="handleCellClick(metric1, metric2)"
                            >
                                <div class="font-bold text-lg">
                                    {{
                                        (relationshipStore.correlationMatrix.find(
                                            r => r.metric1 === metric1 && r.metric2 === metric2
                                        )?.correlation || 0).toFixed(3)
                                    }}
                                </div>
                                <div class="text-xs opacity-75">
                                    {{
                                        getCorrelationLabel(
                                            relationshipStore.correlationMatrix.find(
                                                r => r.metric1 === metric1 && r.metric2 === metric2
                                            )?.correlation || 0
                                        )
                                    }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
