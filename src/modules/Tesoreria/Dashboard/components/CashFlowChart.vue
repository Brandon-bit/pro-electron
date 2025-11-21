<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useTreasuryDashboard } from '@/modules/Tesoreria/Dashboard/composables/useTreasuryDashboard'
import type { CashFlowData } from '@/modules/Tesoreria/Dashboard/types/dashboardTypes'

const { getCashFlowData } = useTreasuryDashboard()
const cashFlowData = ref<CashFlowData[]>([])
const loading = ref(true)

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0
    }).format(amount)
}

const maxValue = computed(() => {
    if (cashFlowData.value.length === 0) return 0
    return Math.max(
        ...cashFlowData.value.map((d) => Math.max(d.income, d.expense))
    )
})

const getBarHeight = (value: number) => {
    if (maxValue.value === 0) return 0
    return (value / maxValue.value) * 100
}

onMounted(async () => {
    cashFlowData.value = await getCashFlowData()
    loading.value = false
})
</script>

<template>
    <div class="dashboard-card">
        <div class="card-body">
            <h3 class="card-title text-lg flex items-center gap-2">
                <span class="material-symbols-outlined">bar_chart</span>
                Flujo de Efectivo Mensual
            </h3>

            <div v-if="loading" class="skeleton h-64 mt-4"></div>

            <div v-else class="mt-6">
                <!-- Chart -->
                <div class="flex items-end justify-around h-64 gap-4">
                    <div
                        v-for="(data, index) in cashFlowData"
                        :key="index"
                        class="flex-1 flex flex-col items-center gap-2"
                    >
                        <div class="w-full flex gap-1 items-end justify-center h-48">
                            <!-- Income bar -->
                            <div
                                class="w-1/2 bg-success rounded-t transition-all hover:opacity-80 cursor-pointer relative group"
                                :style="{ height: `${getBarHeight(data.income)}%` }"
                                :title="`Ingresos: ${formatCurrency(data.income)}`"
                            >
                                <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-success opacity-0 group-hover:opacity-100 transition-opacity">
                                    {{ formatCurrency(data.income) }}
                                </div>
                            </div>
                            <!-- Expense bar -->
                            <div
                                class="w-1/2 bg-error rounded-t transition-all hover:opacity-80 cursor-pointer relative group"
                                :style="{ height: `${getBarHeight(data.expense)}%` }"
                                :title="`Egresos: ${formatCurrency(data.expense)}`"
                            >
                                <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-error opacity-0 group-hover:opacity-100 transition-opacity">
                                    {{ formatCurrency(data.expense) }}
                                </div>
                            </div>
                        </div>
                        <p class="text-sm font-medium">{{ data.period }}</p>
                    </div>
                </div>

                <!-- Legend -->
                <div class="flex justify-center gap-6 mt-6">
                    <div class="flex items-center gap-2">
                        <div class="w-4 h-4 bg-success rounded"></div>
                        <span class="text-sm">Ingresos</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-4 h-4 bg-error rounded"></div>
                        <span class="text-sm">Egresos</span>
                    </div>
                </div>
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
</style>
