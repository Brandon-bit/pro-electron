<script setup lang="ts">
import type { OperationType, StageType } from '@/modules/MesaDeControl/PipelineDeOperaciones/types/operationTypes'
import OperationCard from './OperationCard.vue'

const props = defineProps<{
    stage: StageType
    operations: OperationType[]
}>()


const emit = defineEmits<{
    (e: 'selectOperation', operation: OperationType): void
}>()

const handleOperationClick = (operation: OperationType) => {
    emit('selectOperation', operation)
}
</script>

<template>
    <div class="flex-shrink-0 w-80">
        <div class="card border-2" :class="stage.color">
            <div class="card-body p-4">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="font-semibold text-sm">{{ stage.title }}</h3>
                    <span class="badge badge-secondary badge-sm">{{ operations.length }}</span>
                </div>
                
                <div class="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    <OperationCard 
                        v-for="operation in operations" 
                        :key="operation.id"
                        :operation="operation"
                        @click="handleOperationClick(operation)"
                    />
                    
                    <div v-if="operations.length === 0" class="text-center py-8 text-base-content/40">
                        <span class="material-symbols-outlined text-4xl">inbox</span>
                        <p class="text-sm mt-2">Sin operaciones</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
