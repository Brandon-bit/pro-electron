<script setup lang="ts">
import type { ProvisionalPaymentKPIType } from '@/modules/Fiscal/Provisionales/types/provisionalPaymentTypes'

const props = defineProps<{
    kpi: ProvisionalPaymentKPIType
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
                <p class="text-xs text-base-content/60 mt-1">{{ kpi.subtitle }}</p>
            </div>
        </div>
    </div>
</template>
