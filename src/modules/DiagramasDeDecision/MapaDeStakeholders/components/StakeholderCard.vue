<script setup lang="ts">
import { useStakeholderActions } from '@/modules/DiagramasDeDecision/MapaDeStakeholders/composables/useStakeholderActions'
import type { StakeholderType } from '@/modules/DiagramasDeDecision/MapaDeStakeholders/types/stakeholderTypes'

const props = defineProps<{
    stakeholder: StakeholderType
}>()

const { getInitials } = useStakeholderActions()
</script>

<template>
    <div class="flex items-center gap-2 p-2 bg-base-100 rounded-lg shadow cursor-move hover:shadow-lg transition-shadow">
        <div class="avatar placeholder">
            <div class="bg-neutral text-neutral-content rounded-full w-8">
                <span class="text-xs">{{ getInitials(stakeholder.name) }}</span>
            </div>
        </div>
        <div class="flex-1">
            <div class="text-sm font-medium">{{ stakeholder.name }}</div>
            <div class="text-xs opacity-70">{{ stakeholder.role }}</div>
        </div>
        <span class="badge badge-outline badge-sm">{{ stakeholder.engagement }}</span>
    </div>
</template>
