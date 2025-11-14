<script setup lang="ts">
import { computed } from 'vue'
import { useTiemposStore } from '../store/tiemposStore'

const tiemposStore = useTiemposStore()

const kpis = computed(() => tiemposStore.kpisGlobales)
</script>

<template>
    <div class="dashboard-container">
        <!-- KPIs Cards -->
        <div class="stats stats-vertical md:stats-horizontal shadow w-full mb-6">
            <div class="stat">
                <div class="stat-figure text-primary">
                    <span class="material-symbols-outlined text-4xl">folder_open</span>
                </div>
                <div class="stat-title">Total Áreas</div>
                <div class="stat-value text-primary">{{ kpis.totalAreas }}</div>
                <div class="stat-desc">En monitoreo</div>
            </div>

            <div class="stat">
                <div class="stat-figure text-secondary">
                    <span class="material-symbols-outlined text-4xl">badge</span>
                </div>
                <div class="stat-title">Total Puestos</div>
                <div class="stat-value text-secondary">{{ kpis.totalPuestos }}</div>
                <div class="stat-desc">Con seguimiento</div>
            </div>

            <div class="stat">
                <div class="stat-figure text-accent">
                    <span class="material-symbols-outlined text-4xl">checklist</span>
                </div>
                <div class="stat-title">Total Actividades</div>
                <div class="stat-value text-accent">{{ kpis.totalActividades }}</div>
                <div class="stat-desc">{{ kpis.actividadesActivas }} activas</div>
            </div>

            <div class="stat">
                <div class="stat-figure text-info">
                    <span class="material-symbols-outlined text-4xl">trending_up</span>
                </div>
                <div class="stat-title">Promedio Efectividad</div>
                <div class="stat-value text-info">{{ kpis.promedioEfectividad }}%</div>
                <div class="stat-desc">Global del proceso</div>
            </div>
        </div>

        <!-- Mejor y Peor Efectividad -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="card bg-success/10 border border-success">
                <div class="card-body">
                    <h3 class="card-title text-success flex items-center gap-2">
                        <span class="material-symbols-outlined">thumb_up</span>
                        Mayor Efectividad
                    </h3>
                    <p class="text-2xl font-bold">{{ kpis.mayorEfectividad.nombre }}</p>
                    <p class="text-success text-xl">{{ kpis.mayorEfectividad.valor }}%</p>
                </div>
            </div>

            <div class="card bg-warning/10 border border-warning">
                <div class="card-body">
                    <h3 class="card-title text-warning flex items-center gap-2">
                        <span class="material-symbols-outlined">thumb_down</span>
                        Menor Efectividad
                    </h3>
                    <p class="text-2xl font-bold">{{ kpis.menorEfectividad.nombre }}</p>
                    <p class="text-warning text-xl">{{ kpis.menorEfectividad.valor }}%</p>
                </div>
            </div>
        </div>

        <!-- Placeholder para gráficas futuras -->
        <div class="alert alert-info">
            <span class="material-symbols-outlined">info</span>
            <span>Gráficas interactivas próximamente (Chart.js)</span>
        </div>
    </div>
</template>

<style scoped>
.dashboard-container {
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
