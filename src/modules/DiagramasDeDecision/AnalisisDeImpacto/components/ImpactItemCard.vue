<script setup lang="ts">
import { useImpactActions } from '@/modules/DiagramasDeDecision/AnalisisDeImpacto/composables/useImpactActions'
import type { ImpactItemType } from '@/modules/DiagramasDeDecision/AnalisisDeImpacto/types/impactTypes'

const props = defineProps<{
    item: ImpactItemType
}>()

const { getImpactBadgeClass, getImpactLabel } = useImpactActions()
</script>

<template>
    <div class="flex items-center justify-between p-3 border border-base-300 rounded-lg hover:bg-base-200 transition-colors">
        <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-base-content opacity-70">
                group
            </span>
            <div>
                <div class="font-medium">{{ item.role }}</div>
                <div class="text-sm opacity-70 flex items-center gap-1">
                    <span class="material-symbols-outlined text-xs">
                        account_tree
                    </span>
                    {{ item.process }}
                </div>
            </div>
        </div>
        <span :class="['badge', getImpactBadgeClass(item.impact)]">
            {{ getImpactLabel(item.impact) }}
        </span>
    </div>
</template>
