<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTreasuryDashboard } from '@/modules/Tesoreria/Dashboard/composables/useTreasuryDashboard'
import type { AccountBalanceSummary } from '@/modules/Tesoreria/Dashboard/types/dashboardTypes'

const { getAccountBalances } = useTreasuryDashboard()
const accounts = ref<AccountBalanceSummary[]>([])
const loading = ref(true)

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount)
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'short'
    })
}

onMounted(async () => {
    accounts.value = await getAccountBalances()
    loading.value = false
})
</script>

<template>
    <div class="dashboard-card">
        <div class="card-body">
            <h3 class="card-title text-lg flex items-center gap-2">
                <span class="material-symbols-outlined">account_balance</span>
                Saldos por Cuenta
            </h3>

            <div v-if="loading" class="space-y-3 mt-4">
                <div v-for="i in 3" :key="i" class="skeleton h-16"></div>
            </div>

            <div v-else class="space-y-3 mt-4">
                <div
                    v-for="account in accounts"
                    :key="account.id"
                    class="account-item"
                >
                    <div class="flex-1">
                        <p class="font-semibold">{{ account.name }}</p>
                        <p class="text-xs text-gray-500">
                            {{ account.bankName }} • Último mov: {{ formatDate(account.lastMovementDate) }}
                        </p>
                    </div>
                    <div class="text-right">
                        <p class="text-lg font-bold text-primary">
                            {{ formatCurrency(account.balance) }}
                        </p>
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

.account-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    background: hsl(var(--b2) / 0.5);
    border-radius: 0.75rem;
    transition: all 0.2s ease;
}

.account-item:hover {
    background: hsl(var(--b2));
    transform: translateX(4px);
}
</style>
