<script setup lang="ts">
import type { OperationType } from '@/modules/MesaDeControl/PipelineDeOperaciones/types/operationTypes'
import useOperation from '@/modules/MesaDeControl/PipelineDeOperaciones/composables/useOperation'

const props = defineProps<{
    operation: OperationType
}>()


const emit = defineEmits<{
    (e: 'click', operation: OperationType): void
}>()

const { getSLAColor, getPriorityColor } = useOperation()

const handleClick = () => {
    emit('click', props.operation)
}

const hasIssues = () => {
    return props.operation.documents.some(d => d.status === 'rejected') ||
           props.operation.validations.some(v => v.status === 'failed')
}

const isComplete = () => {
    return props.operation.documents.every(d => d.status === 'verified') &&
           props.operation.validations.every(v => v.status === 'passed')
}
</script>

<template>
    <div 
        class="card bg-base-100 shadow-md hover:shadow-xl transition-shadow cursor-pointer border border-base-300 mb-3"
        @click="handleClick"
    >
        <div class="card-body p-4 space-y-3">
            <!-- Header -->
            <div class="flex items-start justify-between">
                <div>
                    <p class="font-semibold text-sm">{{ operation.clientName }}</p>
                    <p class="text-xs text-base-content/60">{{ operation.id }}</p>
                </div>
                <span class="badge badge-sm" :class="getPriorityColor(operation.priority)">
                    {{ operation.priority }}
                </span>
            </div>

            <!-- Type and Amount -->
            <div class="flex items-center gap-2 text-sm">
                <span class="material-symbols-outlined text-primary text-base">payments</span>
                <span class="font-medium">{{ operation.type }}</span>
                <span class="text-base-content/60">
                    ${{ operation.amount.toLocaleString('es-MX') }}
                </span>
            </div>

            <!-- Operator -->
            <div class="flex items-center gap-2">
                <div class="avatar placeholder">
                    <div class="bg-primary text-primary-content w-6 h-6 rounded-full">
                        <span class="text-xs">{{ operation.operator.initials }}</span>
                    </div>
                </div>
                <span class="text-xs text-base-content/60">{{ operation.operator.name }}</span>
            </div>

            <!-- SLA Timer -->
            <div class="flex items-center gap-2 pt-2 border-t border-base-300">
                <span class="material-symbols-outlined text-base" :class="getSLAColor(operation.timeInStage, operation.slaLimit)">
                    schedule
                </span>
                <span class="text-xs font-medium" :class="getSLAColor(operation.timeInStage, operation.slaLimit)">
                    {{ operation.timeInStage }} min / {{ operation.slaLimit }} min
                </span>
            </div>

            <!-- Status Indicators -->
            <div class="flex gap-1 pt-1">
                <span v-if="hasIssues()" class="material-symbols-outlined text-error text-base">error</span>
                <span v-if="isComplete()" class="material-symbols-outlined text-success text-base">check_circle</span>
            </div>
        </div>
    </div>
</template>
