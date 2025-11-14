<script setup lang="ts">
import { computed } from 'vue'
import { useTiemposUtils } from '../composables/useTiemposUtils'
import { useTiemposActions } from '../composables/useTiemposActions'
import TablaActividades from './TablaActividades.vue'

const props = defineProps<{
    dniTM: number
    puesto: any // Con KPIs calculados del store
}>()

const emit = defineEmits<{
    (e: 'editar-horas'): void
    (e: 'agregar-actividad'): void
    (e: 'quitar-puesto'): void
}>()

const { getColorOperacionLaboral, getColorEfectividad, formatearPorcentaje } = useTiemposUtils()
const { quitarPuesto } = useTiemposActions()

const colorOperacion = computed(() => getColorOperacionLaboral(props.puesto.operacionLaboral || 0))
const colorEfectividad = computed(() => getColorEfectividad(props.puesto.efectividadOperacional || 0))

const handleEliminarPuesto = async () => {
    if (confirm(`¿Eliminar puesto "${props.puesto.nombre}"? Se eliminarán todas sus actividades.`)) {
        await quitarPuesto(props.dniTM, props.puesto.dni)
        emit('quitar-puesto')
    }
}
</script>

<template>
    <div class="card bg-base-100 shadow-lg border border-base-300 mb-4">
        <div class="card-body">
            <!-- Header del puesto -->
            <div class="flex justify-between items-start mb-4">
                <h3 class="card-title text-lg">
                    <span class="material-symbols-outlined text-primary">badge</span>
                    {{ puesto.nombre }}
                </h3>
                <button 
                    class="btn btn-sm btn-error"
                    @click="handleEliminarPuesto"
                    title="Eliminar puesto"
                >
                    <span class="material-symbols-outlined">delete</span>
                    Eliminar
                </button>
            </div>

            <!-- 5 KPIs en grid -->
            <div class="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
                <!-- KPI 1: Tiempo Acumulado -->
                <div class="stat bg-primary/10 border-l-4 border-primary rounded-lg p-3">
                    <div class="stat-figure text-primary">
                        <span class="material-symbols-outlined">timer</span>
                    </div>
                    <div class="stat-title text-xs">Tiempo Acumulado</div>
                    <div class="stat-value text-sm">{{ puesto.strTiempoAcumulado || '0d:00:00:00' }}</div>
                </div>

                <!-- KPI 2: Tiempos Muertos -->
                <div class="stat bg-warning/10 border-l-4 border-warning rounded-lg p-3">
                    <div class="stat-figure text-warning">
                        <span class="material-symbols-outlined">schedule</span>
                    </div>
                    <div class="stat-title text-xs">Tiempos Muertos</div>
                    <div class="stat-value text-sm">{{ puesto.strTiemposMuertos || '00:00:00' }}</div>
                </div>

                <!-- KPI 3: Horas de Trabajo -->
                <div class="stat bg-info/10 border-l-4 border-info rounded-lg p-3">
                    <div class="stat-figure text-info">
                        <span class="material-symbols-outlined">work_history</span>
                    </div>
                    <div class="stat-title text-xs">
                        Horas Trabajo
                        <button 
                            class="btn btn-xs btn-ghost btn-circle ml-1"
                            @click="emit('editar-horas')"
                            title="Editar horas"
                        >
                            <span class="material-symbols-outlined text-xs">edit</span>
                        </button>
                    </div>
                    <div class="stat-value text-sm">{{ puesto.horasTrabajo || '08:00' }}</div>
                    <div class="stat-desc text-xs">{{ puesto.horaInicio }}-{{ puesto.horaFin }}</div>
                </div>

                <!-- KPI 4: % Operación Laboral -->
                <div 
                    class="stat rounded-lg p-3 border-l-4"
                    :class="[colorOperacion.bg, colorOperacion.border]"
                >
                    <div class="stat-figure" :class="colorOperacion.text">
                        <span class="material-symbols-outlined">trending_up</span>
                    </div>
                    <div class="stat-title text-xs">% Operación Laboral</div>
                    <div class="stat-value text-sm" :class="colorOperacion.text">
                        {{ formatearPorcentaje(puesto.operacionLaboral || 0) }}
                    </div>
                    <div class="stat-desc text-xs">
                        <span v-if="puesto.operacionLaboral >= 80">Excelente</span>
                        <span v-else-if="puesto.operacionLaboral >= 50">Aceptable</span>
                        <span v-else>Bajo</span>
                    </div>
                </div>

                <!-- KPI 5: % Efectividad Operacional -->
                <div 
                    class="stat rounded-lg p-3 border-l-4"
                    :class="[colorEfectividad.bg, colorEfectividad.border]"
                >
                    <div class="stat-figure" :class="colorEfectividad.text">
                        <span class="material-symbols-outlined">speed</span>
                    </div>
                    <div class="stat-title text-xs">% Efectividad</div>
                    <div class="stat-value text-sm" :class="colorEfectividad.text">
                        {{ formatearPorcentaje(puesto.efectividadOperacional || 0) }}
                    </div>
                    <div class="stat-desc text-xs">
                        <span v-if="puesto.efectividadOperacional <= 15">Óptimo</span>
                        <span v-else-if="puesto.efectividadOperacional <= 30">Regular</span>
                        <span v-else>Mejorable</span>
                    </div>
                </div>
            </div>

            <div class="divider my-2">Actividades</div>

            <!-- Tabla de Actividades -->
            <TablaActividades 
                :dni-t-m="dniTM"
                :dni-p="puesto.dni"
                :actividades="puesto.Actividades"
                @agregar-actividad="emit('agregar-actividad')"
            />
        </div>
    </div>
</template>

<style scoped>
.stat {
    padding: 0.75rem;
}

.stat-title {
    font-size: 0.7rem;
    font-weight: 600;
}

.stat-value {
    font-size: 1rem;
}

.stat-figure {
    font-size: 1.5rem;
}
</style>
