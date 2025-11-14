<script setup lang="ts">
import useOperationStore from '@/modules/MesaDeControl/PipelineDeOperaciones/store/operationStore'
import useOperation from '@/modules/MesaDeControl/PipelineDeOperaciones/composables/useOperation'

const operationStore = useOperationStore()
const { getStatusBadgeClass } = useOperation()

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'passed': return 'check_circle'
        case 'pending': return 'schedule'
        case 'failed': return 'cancel'
        default: return 'help'
    }
}
 
const getStatusLabel = (status: string) => {
    switch (status) {
        case 'passed': return 'Aprobado'
        case 'pending': return 'En Proceso'
        case 'failed': return 'Falló'
        default: return 'Desconocido'
    }
}
</script>

<template>
    <div class="space-y-3 max-h-[400px] overflow-y-auto">
        <div 
            v-for="(validation, idx) in operationStore.selectedOperation?.validations" 
            :key="idx"
            class="card bg-base-100 border"
        >
            <div class="card-body p-4">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="font-medium">{{ validation.name }}</p>
                        <p v-if="validation.details" class="text-sm text-base-content/60 mt-1">
                            {{ validation.details }}
                        </p>
                    </div>
                    <div>
                        <span class="badge" :class="getStatusBadgeClass(validation.status)">
                            <span class="material-symbols-outlined text-xs mr-1">{{ getStatusIcon(validation.status) }}</span>
                            {{ getStatusLabel(validation.status) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!operationStore.selectedOperation?.validations.length" class="text-center py-8 text-base-content/40">
            <span class="material-symbols-outlined text-4xl">verified</span>
            <p class="text-sm mt-2">Sin validaciones</p>
        </div>
    </div>
</template>
