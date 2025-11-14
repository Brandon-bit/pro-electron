<script setup lang="ts">
import { computed } from 'vue'
import { useReduccionStore } from '../store/reduccionStore'
import { useReduccionActions } from '../composables/useReduccionActions'
import { useReduccionUtils } from '../composables/useReduccionUtils'
import type { TipoDiagrama } from '../types/reduccion.types'

interface Props {
    tipo: TipoDiagrama
}

const props = defineProps<Props>()

const reduccionStore = useReduccionStore()
const { updateTiempoEsperaAsis, updateTiempoEsperaTobe } = useReduccionActions()
const { getColorConfig } = useReduccionUtils()

const colors = computed(() => getColorConfig(props.tipo))

const actividades = computed(() => {
    return props.tipo === 'asis' ? reduccionStore.actividadesAsis : reduccionStore.actividadesTobe
})

const tiempoTotal = computed(() => {
    return props.tipo === 'asis' ? reduccionStore.tiempoTotalAsis : reduccionStore.tiempoTotalTobe
})

const titulo = computed(() => {
    return props.tipo === 'asis' ? 'AS-IS (Estado Actual)' : 'TO-BE (Estado Futuro)'
})

// Sumas para el footer
const sumaTEfecDias = computed(() => actividades.value.reduce((sum, a) => sum + a.tEfecDias, 0))
const sumaTEfecHrs = computed(() => actividades.value.reduce((sum, a) => sum + a.tEfecHrs, 0))
const sumaTEfecMin = computed(() => actividades.value.reduce((sum, a) => sum + a.tEfecMin, 0))

const sumaTEspDia = computed(() => actividades.value.reduce((sum, a) => sum + a.tEspDia, 0))
const sumaTEspHrs = computed(() => actividades.value.reduce((sum, a) => sum + a.tEspHrs, 0))
const sumaTEspMin = computed(() => actividades.value.reduce((sum, a) => sum + a.tEspMin, 0))

// Handlers para cambios en inputs
const handleTimeChange = (index: number, field: 'tEspDia' | 'tEspHrs' | 'tEspMin', value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0)
    
    if (props.tipo === 'asis') {
        updateTiempoEsperaAsis(index, field, numValue)
    } else {
        updateTiempoEsperaTobe(index, field, numValue)
    }
}
</script>

<template>
    <div class="tabla-container" :class="colors.bg">
        <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
                <!-- Header -->
                <thead :class="colors.text">
                    <tr class="border-b-2" :class="colors.border">
                        <th colspan="6" class="text-center text-lg">
                            <span class="badge badge-lg" :class="colors.badge">{{ titulo }}</span>
                        </th>
                    </tr>
                    <tr :class="colors.text">
                        <th class="w-12">#</th>
                        <th class="min-w-[200px]">Descripción de la Actividad</th>
                        <th class="min-w-[150px]">Responsable</th>
                        <th class="w-32">
                            Tiempo Efectivo
                            <br />
                            <small class="opacity-70">Días/Hrs/Min</small>
                        </th>
                        <th class="w-32">
                            Tiempo de Espera
                            <br />
                            <small class="opacity-70">Días/Hrs/Min</small>
                        </th>
                        <th class="w-32">
                            Tiempo Total
                            <br />
                            <small class="opacity-70">Días/Hrs/Min</small>
                        </th>
                    </tr>
                </thead>

                <!-- Body -->
                <tbody>
                    <tr v-for="(act, index) in actividades" :key="act.dni" class="hover">
                        <!-- # -->
                        <td class="text-center font-bold">{{ index + 1 }}</td>

                        <!-- Descripción -->
                        <td>{{ act.descActividad }}</td>

                        <!-- Responsable -->
                        <td>{{ act.responsable }}</td>

                        <!-- Tiempo Efectivo (solo lectura) -->
                        <td class="text-center font-mono">
                            <div class="flex justify-center gap-1">
                                <span class="badge badge-ghost">{{ act.tEfecDias }}</span>
                                :
                                <span class="badge badge-ghost">{{ act.tEfecHrs }}</span>
                                :
                                <span class="badge badge-ghost">{{ act.tEfecMin }}</span>
                            </div>
                        </td>

                        <!-- Tiempo de Espera (EDITABLE) -->
                        <td>
                            <div class="flex flex-col gap-1">
                                <input 
                                    type="number" 
                                    min="0"
                                    class="input input-sm input-bordered w-full"
                                    :value="act.tEspDia"
                                    @input="(e) => handleTimeChange(index, 'tEspDia', (e.target as HTMLInputElement).value)"
                                    placeholder="Días"
                                />
                                <input 
                                    type="number" 
                                    min="0"
                                    class="input input-sm input-bordered w-full"
                                    :value="act.tEspHrs"
                                    @input="(e) => handleTimeChange(index, 'tEspHrs', (e.target as HTMLInputElement).value)"
                                    placeholder="Horas"
                                />
                                <input 
                                    type="number" 
                                    min="0"
                                    class="input input-sm input-bordered w-full"
                                    :value="act.tEspMin"
                                    @input="(e) => handleTimeChange(index, 'tEspMin', (e.target as HTMLInputElement).value)"
                                    placeholder="Min"
                                />
                            </div>
                        </td>

                        <!-- Tiempo Total (calculado) -->
                        <td class="text-center font-mono font-bold" :class="colors.text">
                            <div class="flex justify-center gap-1">
                                <span class="badge" :class="colors.badge">{{ act.tTDia }}</span>
                                :
                                <span class="badge" :class="colors.badge">{{ act.tTHrs }}</span>
                                :
                                <span class="badge" :class="colors.badge">{{ act.tTMin }}</span>
                            </div>
                        </td>
                    </tr>

                    <!-- Mensaje si no hay actividades -->
                    <tr v-if="actividades.length === 0">
                        <td colspan="6" class="text-center py-8 opacity-50">
                            <span class="material-symbols-outlined text-4xl">inbox</span>
                            <p>No hay actividades para mostrar</p>
                        </td>
                    </tr>
                </tbody>

                <!-- Footer con totales -->
                <tfoot v-if="actividades.length > 0" class="font-bold" :class="colors.text">
                    <tr :class="colors.bg">
                        <td class="text-center">TOTAL</td>
                        <td class="text-center">{{ actividades.length }}</td>
                        <td></td>
                        <td class="text-center font-mono">
                            <div class="flex justify-center gap-1">
                                <span class="badge badge-lg" :class="colors.badge">{{ sumaTEfecDias }}</span>
                                :
                                <span class="badge badge-lg" :class="colors.badge">{{ sumaTEfecHrs }}</span>
                                :
                                <span class="badge badge-lg" :class="colors.badge">{{ sumaTEfecMin }}</span>
                            </div>
                        </td>
                        <td class="text-center font-mono">
                            <div class="flex justify-center gap-1">
                                <span class="badge badge-lg" :class="colors.badge">{{ sumaTEspDia }}</span>
                                :
                                <span class="badge badge-lg" :class="colors.badge">{{ sumaTEspHrs }}</span>
                                :
                                <span class="badge badge-lg" :class="colors.badge">{{ sumaTEspMin }}</span>
                            </div>
                        </td>
                        <td class="text-center font-mono text-lg">
                            <div class="flex justify-center gap-1">
                                <span class="badge badge-lg" :class="colors.badge">{{ tiempoTotal.ttdias }}</span>
                                :
                                <span class="badge badge-lg" :class="colors.badge">{{ tiempoTotal.tthrs }}</span>
                                :
                                <span class="badge badge-lg" :class="colors.badge">{{ tiempoTotal.ttmin }}</span>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<style scoped>
.tabla-container {
    border-radius: 1rem;
    padding: 1rem;
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

/* Inputs más pequeños en la tabla */
.input-sm {
    height: 2rem;
    min-height: 2rem;
    font-size: 0.875rem;
}
</style>
