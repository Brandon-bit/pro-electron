<script setup lang="ts">
import { computed } from 'vue'
import { useReduccionStore } from '../store/reduccionStore'
import { useReduccionUtils } from '../composables/useReduccionUtils'

const reduccionStore = useReduccionStore()
const { formatearTiempoTotal } = useReduccionUtils()

// Calcular porcentaje numérico para progress bars
const porcentajeReduccionTiempo = computed(() => {
    return parseInt(reduccionStore.reduccion.reduccionTiempo) || 0
})

const porcentajeReduccionActividades = computed(() => {
    return parseInt(reduccionStore.reduccion.reduccionActividades) || 0
})

// Determinar el color del KPI según el porcentaje
const getColorClass = (porcentaje: number) => {
    if (porcentaje >= 50) return 'text-success'
    if (porcentaje >= 25) return 'text-warning'
    return 'text-error'
}
</script>

<template>
    <div class="stats-container">
        <div class="stats stats-vertical md:stats-horizontal shadow w-full">
            <!-- Reducción de Tiempo -->
            <div class="stat">
                <div class="stat-figure" :class="getColorClass(porcentajeReduccionTiempo)">
                    <span class="material-symbols-outlined text-5xl">schedule</span>
                </div>
                <div class="stat-title">Reducción de Tiempo del Proceso</div>
                <div class="stat-value" :class="getColorClass(porcentajeReduccionTiempo)">
                    {{ reduccionStore.reduccion.reduccionTiempo }}
                </div>
                <div class="stat-desc">
                    <progress 
                        class="progress w-full"
                        :class="porcentajeReduccionTiempo >= 50 ? 'progress-success' : porcentajeReduccionTiempo >= 25 ? 'progress-warning' : 'progress-error'"
                        :value="porcentajeReduccionTiempo" 
                        max="100"
                    ></progress>
                </div>
            </div>

            <!-- Reducción de Actividades -->
            <div class="stat">
                <div class="stat-figure" :class="getColorClass(porcentajeReduccionActividades)">
                    <span class="material-symbols-outlined text-5xl">
                        format_list_numbered</span>
                </div>
                <div class="stat-title">Reducción de Actividades</div>
                <div class="stat-value" :class="getColorClass(porcentajeReduccionActividades)">
                    {{ reduccionStore.reduccion.reduccionActividades }}
                </div>
                <div class="stat-desc">
                    <progress 
                        class="progress w-full"
                        :class="porcentajeReduccionActividades >= 50 ? 'progress-success' : porcentajeReduccionActividades >= 25 ? 'progress-warning' : 'progress-error'"
                        :value="porcentajeReduccionActividades" 
                        max="100"
                    ></progress>
                </div>
            </div>

            <!-- Tiempo Total ASIS -->
            <div class="stat">
                <div class="stat-figure text-info">
                    <span class="material-symbols-outlined text-5xl">timer</span>
                </div>
                <div class="stat-title">Tiempo Total AS-IS</div>
                <div class="stat-value text-info text-2xl">
                    {{ formatearTiempoTotal(reduccionStore.tiempoTotalAsis) }}
                </div>
                <div class="stat-desc">{{ reduccionStore.actividadesAsis.length }} actividades</div>
            </div>

            <!-- Tiempo Total TOBE -->
            <div class="stat">
                <div class="stat-figure text-success">
                    <span class="material-symbols-outlined text-5xl">timer</span>
                </div>
                <div class="stat-title">Tiempo Total TO-BE</div>
                <div class="stat-value text-success text-2xl">
                    {{ formatearTiempoTotal(reduccionStore.tiempoTotalTobe) }}
                </div>
                <div class="stat-desc">{{ reduccionStore.actividadesTobe.length }} actividades</div>
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
