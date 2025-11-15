<script setup lang="ts">
import { onMounted } from 'vue'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import ChangeRequestModal from '@/modules/GestionDeProyectos/Operacion/ControlDeCambios/components/ChangeRequestModal.vue'
import KanbanBoard from '@/modules/GestionDeProyectos/Operacion/ControlDeCambios/components/KanbanBoard.vue'
import StatsCards from '@/modules/GestionDeProyectos/Operacion/ControlDeCambios/components/StatsCards.vue'
import useChangeStore from '@/modules/GestionDeProyectos/Operacion/ControlDeCambios/store/changeStore'
import { useChangeActions } from '@/modules/GestionDeProyectos/Operacion/ControlDeCambios/composables/useChangeActions'

const changeStore = useChangeStore()
const { getStatusColor, loadChangeRequests, saveChangeRequests } = useChangeActions()

onMounted(() => {
    loadChangeRequests()
})
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <BaseTitle 
                title="Control de Cambios" 
                subtitle="Gestión formal de solicitudes de cambio al proyecto"
            >
                <template #icon>
                    <span class="material-symbols-outlined text-4xl">edit_document</span>
                </template>
            </BaseTitle>
            <div class="flex gap-2">
                <button @click="saveChangeRequests" class="btn btn-outline gap-2">
                    <span class="material-symbols-outlined">save</span>
                    Guardar
                </button>
                <button @click="changeStore.openModal()" class="btn btn-primary gap-2">
                    <span class="material-symbols-outlined">add</span>
                    Nueva Solicitud de Cambio
                </button>
            </div>
        </div>

        <!-- Tabs -->
        <div role="tablist" class="tabs tabs-boxed bg-base-200">
            <input type="radio" name="change_tabs" role="tab" class="tab" aria-label="Vista Kanban" checked />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 mt-4">
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <KanbanBoard />
                    </div>
                </div>
            </div>

            <input type="radio" name="change_tabs" role="tab" class="tab" aria-label="Lista de Solicitudes" />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 mt-4">
                <div class="space-y-4">
                    <div 
                        v-for="cr in changeStore.changeRequests" 
                        :key="cr.id" 
                        class="card bg-base-100 shadow-xl"
                    >
                        <div class="card-body">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-3">
                                    <h3 class="card-title">{{ cr.id }}</h3>
                                    <span :class="['badge', getStatusColor(cr.status)]">{{ cr.status }}</span>
                                </div>
                                <span class="text-sm opacity-70">{{ cr.dateRequested }}</span>
                            </div>

                            <div class="space-y-4">
                                <div>
                                    <h4 class="font-semibold text-lg mb-2">{{ cr.title }}</h4>
                                    <p class="opacity-70">{{ cr.description }}</p>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p class="text-sm font-semibold mb-1">Justificación:</p>
                                        <p class="text-sm opacity-70">{{ cr.justification }}</p>
                                    </div>
                                    <div>
                                        <p class="text-sm font-semibold mb-1">Solicitante:</p>
                                        <p class="text-sm opacity-70">{{ cr.requester }}</p>
                                    </div>
                                </div>

                                <div class="divider"></div>

                                <div>
                                    <p class="font-semibold mb-3">Análisis de Impacto:</p>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span class="font-semibold">Alcance:</span> {{ cr.impact.scope }}
                                        </div>
                                        <div>
                                            <span class="font-semibold">Cronograma:</span> {{ cr.impact.schedule }}
                                        </div>
                                        <div>
                                            <span class="font-semibold">Costo:</span> {{ cr.impact.cost }}
                                        </div>
                                        <div>
                                            <span class="font-semibold">Calidad:</span> {{ cr.impact.quality }}
                                        </div>
                                        <div class="md:col-span-2">
                                            <span class="font-semibold">Riesgos:</span> {{ cr.impact.risks }}
                                        </div>
                                    </div>
                                </div>

                                <div v-if="cr.decision" class="divider"></div>

                                <div v-if="cr.decision">
                                    <p class="text-sm font-semibold">Decisión ({{ cr.approver }}):</p>
                                    <p class="text-sm opacity-70">{{ cr.decision }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <input type="radio" name="change_tabs" role="tab" class="tab" aria-label="Estadísticas" />
            <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 mt-4">
                <StatsCards />
            </div>
        </div>

        <!-- Modal -->
        <ChangeRequestModal />
    </div>
</template>
