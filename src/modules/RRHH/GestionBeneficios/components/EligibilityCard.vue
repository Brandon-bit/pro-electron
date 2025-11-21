<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton.vue'
import type { EmployeeEligibility } from '@/modules/RRHH/GestionBeneficios/types/benefitsTypes'

defineProps<{
    employee: EmployeeEligibility
}>()

const emit = defineEmits<{
    viewDetails: [employeeId: number]
}>()

const getRankLabel = (rank: string): string => {
    const labels: Record<string, string> = {
        top10: 'Top 10%',
        top25: 'Top 25%',
        above4_5: 'Score ≥ 4.5',
        above4_0: 'Score ≥ 4.0'
    }
    return labels[rank] || rank
}

const getRankColor = (rank: string): string => {
    const colors: Record<string, string> = {
        top10: 'success',
        top25: 'primary',
        above4_5: 'secondary',
        above4_0: 'warning'
    }
    return colors[rank] || 'base-300'
}
</script>

<template>
    <div class="eligibility-card">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
                <div class="avatar-wrapper">
                    <span class="avatar-initial">{{ employee.employeeName.charAt(0) }}</span>
                </div>
                <div>
                    <p class="font-semibold text-base-content">{{ employee.employeeName }}</p>
                    <p class="text-sm text-base-content/60">
                        {{ employee.employeePosition }} • 
                        Score: <span :class="`font-semibold text-${getRankColor(employee.performanceRank)}`">
                            {{ employee.score.toFixed(1) }}
                        </span> • 
                        {{ getRankLabel(employee.performanceRank) }}
                    </p>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <div class="text-right">
                    <p class="text-xs text-base-content/60">Puntos disponibles</p>
                    <p class="text-xl font-bold text-primary">{{ employee.totalPoints }}</p>
                </div>
                <div :class="`badge badge-${getRankColor(employee.performanceRank)} gap-1`">
                    Elegible: {{ employee.eligibleBenefits.length }} beneficios
                </div>
                <BaseButton
                    text="Ver Detalles"
                    variant="outline"
                    size="sm"
                    @click="emit('viewDetails', employee.employeeId)"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.eligibility-card {
    background: hsl(var(--b1));
    border-radius: 0.75rem;
    border: 1px solid hsl(var(--bc) / 0.12);
    padding: 1.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.04);
}

.eligibility-card:hover {
    box-shadow: 0 8px 16px -4px rgb(0 0 0 / 0.12);
    transform: translateY(-2px);
}

.avatar-wrapper {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: linear-gradient(135deg, hsl(var(--s)), hsl(var(--a)));
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar-initial {
    color: hsl(var(--sc));
    font-weight: 700;
    font-size: 1.25rem;
}
</style>
