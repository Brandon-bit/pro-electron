<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTreasuryDashboard } from '@/modules/Tesoreria/Dashboard/composables/useTreasuryDashboard'
import type { TreasuryAlert } from '@/modules/Tesoreria/Dashboard/types/dashboardTypes'

const { getTreasuryAlerts } = useTreasuryDashboard()
const alerts = ref<TreasuryAlert[]>([])
const loading = ref(true)

const getAlertClass = (type: string) => {
    if (type === 'error') return 'alert-error'
    if (type === 'warning') return 'alert-warning'
    return 'alert-info'
}

const getAlertIcon = (type: string) => {
    if (type === 'error') return 'error'
    if (type === 'warning') return 'warning'
    return 'info'
}

onMounted(async () => {
    alerts.value = await getTreasuryAlerts()
    loading.value = false
})
</script>

<template>
    <div class="dashboard-card">
        <div class="card-body">
            <h3 class="card-title text-lg flex items-center gap-2">
                <span class="material-symbols-outlined">notifications</span>
                Alertas y Notificaciones
            </h3>

            <div v-if="loading" class="space-y-3 mt-4">
                <div v-for="i in 3" :key="i" class="skeleton h-20"></div>
            </div>

            <div v-else-if="alerts.length === 0" class="text-center py-8 text-gray-500">
                <span class="material-symbols-outlined text-4xl mb-2">check_circle</span>
                <p>No hay alertas pendientes</p>
            </div>

            <div v-else class="space-y-3 mt-4">
                <div
                    v-for="alert in alerts"
                    :key="alert.id"
                    :class="getAlertClass(alert.type)"
                    class="alert alert-custom"
                >
                    <span class="material-symbols-outlined">
                        {{ getAlertIcon(alert.type) }}
                    </span>
                    <div>
                        <h4 class="font-bold">{{ alert.title }}</h4>
                        <p class="text-sm">{{ alert.message }}</p>
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

.alert-custom {
    border-radius: 0.75rem;
    transition: all 0.2s ease;
}

.alert-custom:hover {
    transform: translateX(4px);
}
</style>
