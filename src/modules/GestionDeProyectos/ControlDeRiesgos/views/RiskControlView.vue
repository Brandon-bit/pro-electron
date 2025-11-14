<script setup lang="ts">
import { onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import RiskModal from '@/modules/GestionDeProyectos/ControlDeRiesgos/components/RiskModal.vue'
import RiskHeatmap from '@/modules/GestionDeProyectos/ControlDeRiesgos/components/RiskHeatmap.vue'
import ControlHeatmap from '@/modules/GestionDeProyectos/ControlDeRiesgos/components/ControlHeatmap.vue'
import DashboardCards from '@/modules/GestionDeProyectos/ControlDeRiesgos/components/DashboardCards.vue'
import useRiskStore from '@/modules/GestionDeProyectos/ControlDeRiesgos/store/riskStore'
import { useRiskActions } from '@/modules/GestionDeProyectos/ControlDeRiesgos/composables/useRiskActions'

const riskStore = useRiskStore()
const { getRiskColor, getRiskLevel, loadRisks, saveRisks } = useRiskActions()

onMounted(() => {
    loadRisks()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Control de Riesgos" 
                subtitle="Gestión proactiva de riesgos del proyecto"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">warning</span>
                </template>
            </BaseTitle>
            <div class="flex gap-2">
                <button @click="saveRisks" class="btn btn-outline gap-2">
                    <span class="material-symbols-outlined">save</span>
                    Guardar
                </button>
                <button @click="riskStore.openModal()" class="btn btn-primary gap-2">
                    <span class="material-symbols-outlined">add</span>
                    Nuevo Riesgo
                </button>
            </div>
        </div>

        <!-- Tabs -->
        <div role="tablist" class="tabs tabs-boxed bg-base-200">
            <input type="radio" name="risk_tabs" role="tab" class="tab" aria-label="Registro de Riesgos" checked />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 mt-4">
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h3 class="card-title">Registro de Riesgos</h3>
                        <div class="overflow-x-auto">
                            <table class="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Descripción</th>
                                        <th>Categoría</th>
                                        <th>P x I</th>
                                        <th>Score</th>
                                        <th>Estrategia</th>
                                        <th>Responsable</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="risk in riskStore.risks" :key="risk.id" class="hover">
                                        <td class="font-medium">{{ risk.id }}</td>
                                        <td class="max-w-xs">{{ risk.description }}</td>
                                        <td>
                                            <span class="badge badge-outline">{{ risk.category }}</span>
                                        </td>
                                        <td>{{ risk.probability }} x {{ risk.impact }}</td>
                                        <td>
                                            <span :class="['badge', getRiskColor(risk.score)]">
                                                {{ risk.score }}
                                            </span>
                                        </td>
                                        <td>{{ risk.strategy }}</td>
                                        <td>{{ risk.responsible }}</td>
                                        <td>
                                            <span :class="['badge', risk.status === 'Activo' ? 'badge-primary' : 'badge-ghost']">
                                                {{ risk.status }}
                                            </span>
                                        </td>
                                        <td>
                                            <button class="btn btn-ghost btn-sm btn-square">
                                                <span class="material-symbols-outlined">edit</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <input type="radio" name="risk_tabs" role="tab" class="tab" aria-label="Matriz de Calor" />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 mt-4">
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <RiskHeatmap />
                    </div>
                </div>
            </div>

            <input type="radio" name="risk_tabs" role="tab" class="tab" aria-label="Controles" />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 mt-4">
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <ControlHeatmap />
                    </div>
                </div>
            </div>

            <input type="radio" name="risk_tabs" role="tab" class="tab" aria-label="Dashboard" />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 mt-4">
                <DashboardCards />
            </div>
        </div>

        <!-- Modal -->
        <RiskModal />
    </div>
</template>
