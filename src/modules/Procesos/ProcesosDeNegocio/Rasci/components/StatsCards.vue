<script setup lang="ts">
import { computed } from 'vue'
import { useRasciStore } from '../store/rasciStore'

const rasciStore = useRasciStore()

const stats = computed(() => rasciStore.estadisticas)

// Determinar color de alerta para actividades sin accountable
const colorSinAccountable = computed(() => {
    const num = stats.value.actividadesSinAccountable
    if (num === 0) return 'text-success'
    if (num <= 2) return 'text-warning'
    return 'text-error'
})

// Determinar color para múltiples accountables
const colorMultiplesAccountables = computed(() => {
    const num = stats.value.actividadesConMultiplesAccountables
    if (num === 0) return 'text-success'
    if (num <= 2) return 'text-warning'
    return 'text-error'
})

// Determinar color para roles sin asignaciones
const colorRolesSinAsignaciones = computed(() => {
    const num = stats.value.rolesSinAsignaciones
    if (num === 0) return 'text-success'
    return 'text-error'
})
</script>

<template>
    <div class="stats-container">
        <div class="stats stats-vertical md:stats-horizontal shadow w-full">
            <!-- Total Actividades -->
            <div class="stat">
                <div class="stat-figure text-primary">
                    <span class="material-symbols-outlined text-4xl">checklist</span>
                </div>
                <div class="stat-title">Total Actividades</div>
                <div class="stat-value text-primary">{{ stats.totalActividades }}</div>
                <div class="stat-desc">En la matriz RASCI</div>
            </div>

            <!-- Total Roles -->
            <div class="stat">
                <div class="stat-figure text-secondary">
                    <span class="material-symbols-outlined text-4xl">groups</span>
                </div>
                <div class="stat-title">Total Roles / Puestos</div>
                <div class="stat-value text-secondary">{{ stats.totalRoles }}</div>
                <div class="stat-desc">Involucrados en el proceso</div>
            </div>

            <!-- Total Asignaciones -->
            <div class="stat">
                <div class="stat-figure text-accent">
                    <span class="material-symbols-outlined text-4xl">assignment</span>
                </div>
                <div class="stat-title">Total Asignaciones</div>
                <div class="stat-value text-accent">{{ stats.totalAsignaciones }}</div>
                <div class="stat-desc">
                    Promedio: {{ stats.promedioAsignacionesPorRol }} por rol
                </div>
            </div>

            <!-- Actividades sin Accountable -->
            <div class="stat">
                <div class="stat-figure" :class="colorSinAccountable">
                    <span class="material-symbols-outlined text-4xl">warning</span>
                </div>
                <div class="stat-title">Sin Accountable</div>
                <div class="stat-value" :class="colorSinAccountable">
                    {{ stats.actividadesSinAccountable }}
                </div>
                <div class="stat-desc">
                    {{ stats.actividadesSinAccountable === 0 ? '¡Perfecto!' : 'Actividades' }}
                </div>
            </div>

            <!-- Actividades con Múltiples Accountables -->
            <div class="stat">
                <div class="stat-figure" :class="colorMultiplesAccountables">
                    <span class="material-symbols-outlined text-4xl">group_add</span>
                </div>
                <div class="stat-title">Múltiples Accountables</div>
                <div class="stat-value" :class="colorMultiplesAccountables">
                    {{ stats.actividadesConMultiplesAccountables }}
                </div>
                <div class="stat-desc">
                    {{ stats.actividadesConMultiplesAccountables === 0 ? 'Ninguna' : 'Actividades' }}
                </div>
            </div>

            <!-- Roles sin Asignaciones -->
            <div class="stat">
                <div class="stat-figure" :class="colorRolesSinAsignaciones">
                    <span class="material-symbols-outlined text-4xl">person_off</span>
                </div>
                <div class="stat-title">Roles sin Asignación</div>
                <div class="stat-value" :class="colorRolesSinAsignaciones">
                    {{ stats.rolesSinAsignaciones }}
                </div>
                <div class="stat-desc">
                    {{ stats.rolesSinAsignaciones === 0 ? 'Todos asignados' : 'Roles inactivos' }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.stats-container {
    animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.stat-value {
    animation: countUp 0.8s ease-out;
}

@keyframes countUp {
    from {
        opacity: 0;
        transform: scale(0.5);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
