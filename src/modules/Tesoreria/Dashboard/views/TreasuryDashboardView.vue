<script setup lang="ts">
import BaseTitle from '@/shared/components/BaseTitle.vue'
import SummaryCards from '@/modules/Tesoreria/Dashboard/components/SummaryCards.vue'
import AccountBalancesCard from '@/modules/Tesoreria/Dashboard/components/AccountBalancesCard.vue'
import CashFlowChart from '@/modules/Tesoreria/Dashboard/components/CashFlowChart.vue'
import RecentMovementsCard from '@/modules/Tesoreria/Dashboard/components/RecentMovementsCard.vue'
import AlertsCard from '@/modules/Tesoreria/Dashboard/components/AlertsCard.vue'
</script>

<template>
    <div class="space-y-6">
        <BaseTitle 
            title="Dashboard de Tesorería" 
            subtitle="Resumen general de cuentas y movimientos bancarios"
        />

        <!-- Summary Cards -->
        <SummaryCards />

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left Column - 2/3 width -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Cash Flow Chart -->
                <CashFlowChart />

                <!-- Recent Movements -->
                <RecentMovementsCard />
            </div>

            <!-- Right Column - 1/3 width -->
            <div class="space-y-6">
                <!-- Account Balances -->
                <AccountBalancesCard />

                <!-- Alerts -->
                <AlertsCard />
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="dashboard-card">
            <div class="card-body">
                <h3 class="card-title text-lg mb-4">Acciones Rápidas</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <router-link
                        to="/tesoreria/movimientos-bancarios"
                        class="btn btn-outline btn-primary"
                    >
                        <span class="material-symbols-outlined">add</span>
                        Nuevo Movimiento
                    </router-link>
                    <router-link
                        to="/tesoreria/conciliacion-bancaria"
                        class="btn btn-outline btn-secondary"
                    >
                        <span class="material-symbols-outlined">check_circle</span>
                        Conciliar
                    </router-link>
                    <router-link
                        to="/tesoreria/cuentas-bancarias"
                        class="btn btn-outline btn-accent"
                    >
                        <span class="material-symbols-outlined">account_balance</span>
                        Ver Cuentas
                    </router-link>
                    <router-link
                        to="/tesoreria/movimientos-bancarios"
                        class="btn btn-outline btn-info"
                    >
                        <span class="material-symbols-outlined">receipt_long</span>
                        Historial
                    </router-link>
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
