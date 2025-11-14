<script setup lang="ts">
import type { ProspectKPIType } from '@/modules/Inversiones/Inversion/Prospectos/types/prospectTypes'

defineProps<{
    kpi: ProspectKPIType
}>()
</script>

<template>
    <div class="card bg-base-100 shadow">
        <div class="card-body p-4">
            <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-base-content/70">{{ kpi.title }}</h3>
                <span class="material-symbols-outlined text-2xl" :class="kpi.color">
                    {{ kpi.icon }}
                </span>
            </div>
            <div class="mt-2">
                <p class="text-2xl font-bold">{{ kpi.value }}</p>
                <div class="flex items-center gap-2 mt-1">
                    <p class="text-xs text-base-content/60">{{ kpi.subtitle }}</p>
                    <span v-if="kpi.trend" class="text-xs font-semibold" :class="kpi.trend > 0 ? 'text-success' : 'text-error'">
                        {{ kpi.trend > 0 ? '+' : '' }}{{ kpi.trend }}%
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
