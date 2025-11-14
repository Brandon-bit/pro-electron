<script setup lang="ts">
import useOperationStore from '@/modules/MesaDeControl/PipelineDeOperaciones/store/operationStore'
import useOperation from '@/modules/MesaDeControl/PipelineDeOperaciones/composables/useOperation'

const operationStore = useOperationStore()
const { getStatusBadgeClass } = useOperation()

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'verified': return 'check_circle'
        case 'pending': return 'schedule'
        case 'rejected': return 'error'
        default: return 'help'
    }
} 

const getStatusLabel = (status: string) => {
    switch (status) {
        case 'verified': return 'Verificado'
        case 'pending': return 'Pendiente'
        case 'rejected': return 'Requiere Revisión'
        default: return 'Desconocido'
    }
}
</script>

<template>
    <div class="space-y-3 max-h-[400px] overflow-y-auto">
        <div 
            v-for="(doc, idx) in operationStore.selectedOperation?.documents" 
            :key="idx"
            class="card bg-base-100 border"
        >
            <div class="card-body p-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-3xl text-base-content/60">description</span>
                        <div>
                            <p class="font-medium">{{ doc.name }}</p>
                            <p v-if="doc.issues && doc.issues.length > 0" class="text-xs text-error mt-1">
                                {{ doc.issues.join(', ') }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="badge" :class="getStatusBadgeClass(doc.status)">
                            <span class="material-symbols-outlined text-xs mr-1">{{ getStatusIcon(doc.status) }}</span>
                            {{ getStatusLabel(doc.status) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!operationStore.selectedOperation?.documents.length" class="text-center py-8 text-base-content/40">
            <span class="material-symbols-outlined text-4xl">folder_open</span>
            <p class="text-sm mt-2">Sin documentos</p>
        </div>
    </div>
</template>
