<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTreasuryDashboard } from '@/modules/Tesoreria/Dashboard/composables/useTreasuryDashboard'
import type { RecentMovementSummary } from '@/modules/Tesoreria/Dashboard/types/dashboardTypes'

const { getRecentMovements } = useTreasuryDashboard()
const movements = ref<RecentMovementSummary[]>([])
const loading = ref(true)

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(Math.abs(amount))
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'short'
    })
}

const getMovementColor = (type: string) => {
    if (type === 'Ingreso') return 'text-success'
    if (type === 'Egreso') return 'text-error'
    return 'text-info'
}

const getMovementIcon = (type: string) => {
    if (type === 'Ingreso') return 'arrow_downward'
    if (type === 'Egreso') return 'arrow_upward'
    return 'swap_horiz'
}

onMounted(async () => {
    movements.value = await getRecentMovements()
    loading.value = false
})
</script>

<template>
    <div class="dashboard-card">
        <div class="card-body">
            <div class="flex items-center justify-between">
                <h3 class="card-title text-lg flex items-center gap-2">
                    <span class="material-symbols-outlined">receipt_long</span>
                    Últimos Movimientos
                </h3>
                <router-link to="/tesoreria/movimientos-bancarios" class="btn btn-ghost btn-sm">
                    Ver todos
                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </router-link>
            </div>

            <div v-if="loading" class="space-y-2 mt-4">
                <div v-for="i in 5" :key="i" class="skeleton h-14"></div>
            </div>

            <div v-else class="overflow-x-auto mt-4">
                <table class="table table-sm">
                    <tbody>
                        <tr v-for="movement in movements" :key="movement.id" class="movement-row">
                            <td>
                                <div class="flex items-center gap-2">
                                    <span
                                        :class="getMovementColor(movement.movementType)"
                                        class="material-symbols-outlined text-sm"
                                    >
                                        {{ getMovementIcon(movement.movementType) }}
                                    </span>
                                    <div>
                                        <p class="font-medium text-sm">{{ movement.concept }}</p>
                                        <p class="text-xs text-gray-500">
                                            {{ movement.bankAccountName }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="text-right">
                                <p class="text-xs text-gray-500">{{ formatDate(movement.date) }}</p>
                                <p
                                    :class="getMovementColor(movement.movementType)"
                                    class="font-semibold text-sm"
                                >
                                    {{ movement.amount < 0 ? '-' : '+' }}{{ formatCurrency(movement.amount) }}
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dashboard-card {
    background: hsl(var(--b1));
    border-radius: 1rem;
    border: 1px solid hsl(var(--bc) / 0.1);
    box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    transition: all 0.3s ease-in-out;
}

.dashboard-card:hover {
    box-shadow:
        0 20px 25px -5px rgb(0 0 0 / 0.1),
        0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.movement-row {
    transition: all 0.2s ease;
}

.movement-row:hover {
    background: hsl(var(--b2) / 0.5);
}
</style>
