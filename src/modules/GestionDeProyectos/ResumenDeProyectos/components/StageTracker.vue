<script setup lang="ts">
import type { ProjectStageType } from '@/modules/GestionDeProyectos/ResumenDeProyectos/types/summaryTypes'

defineProps<{
    stages: ProjectStageType[]
}>()
</script>

<template>
    <div v-if="stages.length === 0" class="text-sm opacity-70">
        Sin etapas definidas
    </div>
    
    <div v-else class="flex items-center gap-1">
        <div
            v-for="(stage, index) in stages"
            :key="index"
            class="group relative"
        >
            <div
                :class="[
                    'h-6 px-2 flex items-center justify-center text-xs font-medium rounded transition-all',
                    stage.isActive
                        ? 'bg-primary text-primary-content shadow-sm'
                        : 'bg-base-300 text-base-content/60'
                ]"
                :style="{ minWidth: `${100 / stages.length}px` }"
            >
                {{ index + 1 }}
            </div>
            <!-- Tooltip -->
            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-base-100 text-base-content text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-base-300">
                {{ stage.name }}
            </div>
        </div>
    </div>
</template>
