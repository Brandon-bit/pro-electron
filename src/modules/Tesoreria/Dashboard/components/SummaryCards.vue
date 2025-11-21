<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTreasuryDashboard } from '@/modules/Tesoreria/Dashboard/composables/useTreasuryDashboard'
import StatCard from '@/modules/Tesoreria/Dashboard/components/StatCard.vue'
import type { TreasurySummary } from '@/modules/Tesoreria/Dashboard/types/dashboardTypes'

const { getTreasurySummary } = useTreasuryDashboard()
const summary = ref<TreasurySummary | null>(null)
const loading = ref(true)

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0
    }).format(amount)
}

onMounted(async () => {
    summary.value = await getTreasurySummary()
    loading.value = false
})
</script>

<template>
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="i in 4" :key="i" class="skeleton h-32"></div>
    </div>

    <div v-else-if="summary" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
            icon="account_balance_wallet"
            color="primary"
            title="Saldo Total"
            :value="formatCurrency(summary.totalBalance)"
            :description="`${summary.accountsCount} cuentas activas`"
        />

        <StatCard
            icon="arrow_downward"
            color="success"
            title="Ingresos del Mes"
            :value="formatCurrency(summary.totalIncome)"
            :description="`+${((summary.totalIncome / summary.totalBalance) * 100).toFixed(1)}% del saldo`"
        />

        <StatCard
            icon="arrow_upward"
            color="error"
            title="Egresos del Mes"
            :value="formatCurrency(summary.totalExpense)"
            :description="`-${((summary.totalExpense / summary.totalBalance) * 100).toFixed(1)}% del saldo`"
        />

        <StatCard
            icon="trending_up"
            color="info"
            title="Flujo Neto"
            :value="formatCurrency(summary.netCashFlow)"
            :description="`${summary.pendingReconciliations} conciliación(es) pendiente(s)`"
        />
    </div>
</template>
