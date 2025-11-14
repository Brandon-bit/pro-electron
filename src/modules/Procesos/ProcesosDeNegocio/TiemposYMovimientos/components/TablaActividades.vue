<script setup lang="ts">
import { ref } from 'vue'
import { useCronometros } from '../composables/useCronometros'
import { useTiemposActions } from '../composables/useTiemposActions'
import { useTiemposUtils } from '../composables/useTiemposUtils'
import type { IActividad } from '../types/tiempos.types'

const props = defineProps<{
    dniTM: number
    dniP: number
    actividades: IActividad[]
}>()

const emit = defineEmits<{
    (e: 'agregar-actividad'): void
}>()

const { iniciarCronometro, finalizarCronometro, formatearDiff } = useCronometros()
const { editarActividad, quitarActividad } = useTiemposActions()
const { validarFormatoTiempo } = useTiemposUtils()

const handleIniciar = async (actividad: IActividad) => {
    await iniciarCronometro(props.dniTM, props.dniP, actividad.dni)
}

const handleFinalizar = async (actividad: IActividad) => {
    await finalizarCronometro(props.dniTM, props.dniP, actividad.dni)
}

const handleEditarActividad = async (actividad: IActividad) => {
    if (!validarFormatoTiempo(actividad.strTiempoMuerto)) {
        alert('Formato incorrecto. Usa hh:mm:ss')
        return
    }
    
    await editarActividad(
        props.dniTM,
        props.dniP,
        actividad.dni,
        actividad.dias,
        actividad.strTiempoMuerto,
        actividad.frecuencia
    )
}

const handleEliminar = async (actividad: IActividad) => {
    if (confirm(`¿Eliminar actividad "${actividad.nombre}"?`)) {
        await quitarActividad(props.dniTM, props.dniP, actividad.dni)
    }
}
</script>

<template>
    <div class="overflow-x-auto">
        <table class="table table-sm table-zebra">
            <thead class="bg-base-300">
                <tr class="text-center">
                    <th class="w-24">Cronómetro</th>
                    <th>Nombre</th>
                    <th class="w-20">Días<br/>medidos</th>
                    <th class="w-32">Tiempo de<br/>ejecución</th>
                    <th class="w-28">Tiempos muertos<br/>(hh:mm:ss)</th>
                    <th class="w-28">Frecuencia</th>
                    <th class="w-20">Personas</th>
                    <th>Recomendaciones</th>
                    <th class="w-16"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="act in actividades" :key="act.dni">
                    <!-- Botón Cronómetro -->
                    <td class="text-center">
                        <button 
                            v-if="!act.activa && !act.finalizada"
                            class="btn btn-xs btn-success"
                            @click="handleIniciar(act)"
                            title="Iniciar cronómetro"
                        >
                            <span class="material-symbols-outlined text-xs">play_arrow</span>
                            Iniciar
                        </button>
                        <button 
                            v-else-if="act.activa && !act.finalizada"
                            class="btn btn-xs btn-primary animate-pulse"
                            @click="handleFinalizar(act)"
                            title="Finalizar cronómetro"
                        >
                            <span class="material-symbols-outlined text-xs">stop</span>
                            Finalizar
                        </button>
                        <button 
                            v-else
                            class="btn btn-xs btn-ghost"
                            disabled
                            title="Cronómetro finalizado"
                        >
                            <span class="material-symbols-outlined text-xs">check</span>
                            Listo
                        </button>
                    </td>

                    <!-- Nombre -->
                    <td class="font-semibold">{{ act.nombre }}</td>

                    <!-- Días medidos -->
                    <td class="text-center">
                        <input 
                            type="number" 
                            class="input input-xs input-bordered w-16 text-center"
                            v-model.number="act.dias"
                            @change="handleEditarActividad(act)"
                            min="1"
                        />
                    </td>

                    <!-- Tiempo de ejecución -->
                    <td class="text-center">
                        <span v-if="act.dateDiff" class="badge badge-info badge-sm">
                            {{ formatearDiff(act.dateDiff) }}
                        </span>
                        <span v-else class="text-base-content/50">--:--:--</span>
                    </td>

                    <!-- Tiempos muertos -->
                    <td>
                        <input 
                            type="text" 
                            class="input input-xs input-bordered w-full text-center font-mono"
                            v-model="act.strTiempoMuerto"
                            @change="handleEditarActividad(act)"
                            placeholder="00:00:00"
                        />
                    </td>

                    <!-- Frecuencia -->
                    <td>
                        <select 
                            class="select select-xs select-bordered w-full"
                            v-model="act.frecuencia"
                            @change="handleEditarActividad(act)"
                        >
                            <option value="diario">Diario</option>
                            <option value="por evento">Por evento</option>
                        </select>
                    </td>

                    <!-- Personas -->
                    <td class="text-center">
                        <span class="badge badge-neutral badge-sm">{{ act.personas }}</span>
                    </td>

                    <!-- Recomendaciones -->
                    <td class="text-sm">{{ act.recomendaciones || '-' }}</td>

                    <!-- Eliminar -->
                    <td class="text-center">
                        <button 
                            class="btn btn-xs btn-error btn-circle"
                            @click="handleEliminar(act)"
                            title="Eliminar actividad"
                        >
                            <span class="material-symbols-outlined text-xs">delete</span>
                        </button>
                    </td>
                </tr>

                <!-- Fila vacía si no hay actividades -->
                <tr v-if="actividades.length === 0">
                    <td colspan="9" class="text-center text-base-content/50 py-4">
                        No hay actividades. Agrega una para empezar a cronometrar.
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Botón agregar actividad -->
        <div class="mt-4">
            <button 
                class="btn btn-sm btn-primary"
                @click="emit('agregar-actividad')"
            >
                <span class="material-symbols-outlined">add</span>
                Agregar Actividad
            </button>
        </div>
    </div>
</template>

<style scoped>
.table thead th {
    font-size: 0.75rem;
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: .7;
    }
}
</style>
