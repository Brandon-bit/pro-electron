<script setup lang="ts">
import useOperationStore from '@/modules/MesaDeControl/PipelineDeOperaciones/store/operationStore'
import { useModalStore } from '@/shared/stores/modal.store'
import useOperation from '@/modules/MesaDeControl/PipelineDeOperaciones/composables/useOperation'

const props = defineProps<{
    onRefresh?: () => void
}>()

const operationStore = useOperationStore()
const modalStore = useModalStore()
const { getPriorityColor } = useOperation()

const openIncidentModal = () => {
    modalStore.open(operationStore.incidentModalId, { 
        type: 'INCIDENT', 
        title: 'Notificar Incidencia al Cliente' 
    })
}
 
const openApprovalModal = () => {
    modalStore.open(operationStore.approvalModalId, { 
        type: 'APPROVAL', 
        title: 'Confirmar Aprobación' 
    })
}
</script>

<template>
    <div class="card bg-base-100 border">
        <div class="card-body">
            <h3 class="card-title text-base">Información General</h3>
            
            <div class="grid grid-cols-2 gap-4 mt-4">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-base-content/60">person</span>
                    <div>
                        <p class="text-xs text-base-content/60">Cliente</p>
                        <p class="text-sm font-medium">{{ operationStore.selectedOperation?.clientName }}</p>
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-base-content/60">payments</span>
                    <div>
                        <p class="text-xs text-base-content/60">Tipo y Monto</p>
                        <p class="text-sm font-medium">
                            {{ operationStore.selectedOperation?.type }} - 
                            ${{ operationStore.selectedOperation?.amount.toLocaleString('es-MX') }}
                        </p>
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-base-content/60">schedule</span>
                    <div>
                        <p class="text-xs text-base-content/60">Tiempo en Etapa</p>
                        <p class="text-sm font-medium">{{ operationStore.selectedOperation?.timeInStage }} minutos</p>
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-base-content/60">shield</span>
                    <div>
                        <p class="text-xs text-base-content/60">Prioridad</p>
                        <span class="badge badge-sm" :class="getPriorityColor(operationStore.selectedOperation?.priority || 'Media')">
                            {{ operationStore.selectedOperation?.priority }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="flex gap-2 mt-6 pt-4 border-t">
                <button class="btn btn-outline btn-sm flex-1" @click="openIncidentModal">
                    <span class="material-symbols-outlined text-base">error</span>
                    Notificar Incidencia
                </button>
                
                <button 
                    v-if="operationStore.selectedOperation?.stage === 'Pendiente de Aprobación'"
                    class="btn btn-primary btn-sm flex-1" 
                    @click="openApprovalModal"
                >
                    <span class="material-symbols-outlined text-base">check_circle</span>
                    Aprobar Operación
                </button>
            </div>
        </div>
    </div>
</template>
