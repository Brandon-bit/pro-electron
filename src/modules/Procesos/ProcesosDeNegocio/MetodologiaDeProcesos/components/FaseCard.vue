<script setup lang="ts">
import { onMounted, computed, watch, nextTick } from 'vue'
import { useMetodologiaUtils } from '../composables/useMetodologiaUtils'
import { useMetodologiaStore } from '../store/metodologiaStore'
import { useMetodologiaActions } from '../composables/useMetodologiaActions'
import type { IFase, IActividad } from '../types/metodologia.types'

interface Props {
    fase: IFase
    index: number
}

interface Emits {
    (e: 'add-actividad', fase: IFase): void
    (e: 'delete-actividad', fase: IFase, actividad: IActividad): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const metodologiaStore = useMetodologiaStore()
const { finalizarActividad } = useMetodologiaActions()
const {
    getFaseEstado,
    getFaseColors,
    calcularProgreso,
    useCronometro,
    formatTimeDiff,
    puedeMarcarActividad,
    puedeAgregarActividad,
    puedeEliminarActividad,
    getFaseIcon
} = useMetodologiaUtils()

// Estado y colores
const estado = computed(() => {
    const est = getFaseEstado(props.fase)
    console.log(`[FaseCard ${props.fase.nombre}] Estado computed:`, est, { activa: props.fase.activa, finalizada: props.fase.finalizada })
    return est
})
const colors = computed(() => {
    const cols = getFaseColors(estado.value)
    console.log(`[FaseCard ${props.fase.nombre}] Colors computed:`, cols.bg)
    return cols
})
const progreso = computed(() => {
    const prog = calcularProgreso(props.fase)
    console.log(`[FaseCard ${props.fase.nombre}] Progreso computed:`, prog)
    return prog
})

// Cronómetro
const { timeDiff, start: startCronometro, stop: stopCronometro } = useCronometro(props.fase)
const tiempoFormateado = computed(() => formatTimeDiff(timeDiff.value))

// Iniciar cronómetro si la fase está activa
onMounted(() => {
    if (props.fase.activa) {
        startCronometro()
    }
})

// Watch para detectar cuando la fase se activa
watch(() => props.fase.activa, (newVal, oldVal) => {
    console.log(`[FaseCard ${props.fase.nombre}] Watch activa:`, { newVal, oldVal, Start: props.fase.Start })
    if (newVal && !oldVal) {
        console.log(`[FaseCard ${props.fase.nombre}] 🎬 Fase RECIÉN ACTIVADA - Iniciando cronómetro`)
        // La fase acaba de activarse, iniciar cronómetro
        nextTick(() => {
            startCronometro()
            console.log(`[FaseCard ${props.fase.nombre}] ✅ Cronómetro iniciado`)
        })
    }
}, { immediate: false })

// Watch para detectar cuando la fase se finaliza y detener el cronómetro
watch(() => props.fase.finalizada, (newVal, oldVal) => {
    console.log(`[FaseCard ${props.fase.nombre}] Watch finalizada:`, { newVal, oldVal, End: props.fase.End })
    if (newVal && !oldVal) {
        console.log(`[FaseCard ${props.fase.nombre}] 🛑 Fase FINALIZADA - Deteniendo cronómetro`)
        // La fase acaba de finalizarse, detener cronómetro
        nextTick(() => {
            // Detener el intervalo del cronómetro
            stopCronometro()
            
            // Recalcular el tiempo final
            if (props.fase.Start && props.fase.End) {
                const { calculateTimeDiff } = useMetodologiaUtils()
                timeDiff.value = calculateTimeDiff(props.fase.Start, props.fase.End)
                console.log(`[FaseCard ${props.fase.nombre}] ✅ Cronómetro detenido, tiempo final:`, tiempoFormateado.value)
            }
        })
    }
}, { immediate: false })

// Handler para marcar actividad
const handleToggleActividad = async (actividad: IActividad) => {
    if (!puedeMarcarActividad(props.fase, actividad.finalizada)) return
    
    if (!metodologiaStore.procesoSeleccionado) return

    await finalizarActividad({
        dniFase: props.fase.dni,
        dni: actividad.dni,
        dniProc: metodologiaStore.procesoSeleccionado.id
    })
}

const handleAddActividad = () => {
    console.log('[FaseCard] Click en agregar actividad, fase:', props.fase.nombre)
    if (puedeAgregarActividad(props.fase)) {
        console.log('[FaseCard] Emitiendo evento add-actividad')
        emit('add-actividad', props.fase)
    } else {
        console.log('[FaseCard] No se puede agregar actividad (fase finalizada)')
    }
}

const handleDeleteActividad = (actividad: IActividad) => {
    if (puedeEliminarActividad(props.fase)) {
        emit('delete-actividad', props.fase, actividad)
    }
}
</script>

<template>
    <div class="fase-card" :class="[colors.bg, colors.border]">
        <!-- Header -->
        <div class="fase-header" :class="colors.text">
            <div class="flex items-center justify-between mb-2">
                <span class="badge" :class="colors.badge">Fase {{ index + 1 }}</span>
                <span class="material-symbols-outlined text-2xl">
                    {{ getFaseIcon(estado) }}
                </span>
            </div>
            <h3 class="text-xl font-bold mb-1">{{ fase.nombre }}</h3>
            <p v-if="fase.descripcion" class="text-sm opacity-70">{{ fase.descripcion }}</p>
        </div>

        <!-- Progress Bar -->
        <div class="fase-progress">
            <div class="flex justify-between text-xs mb-1">
                <span>Progreso</span>
                <span class="font-bold">{{ progreso }}%</span>
            </div>
            <progress 
                class="progress" 
                :class="estado === 'finalizada' ? 'progress-success' : 'progress-info'" 
                :value="progreso" 
                max="100"
            ></progress>
            <div class="text-xs text-center mt-1 opacity-70">
                {{ fase.Actividades.filter(a => a.finalizada).length }} / {{ fase.Actividades.length }} actividades
            </div>
        </div>

        <!-- Actividades -->
        <div class="fase-actividades">
            <div 
                v-for="(actividad, idx) in fase.Actividades" 
                :key="actividad.dni"
                class="actividad-item"
            >
                <div class="flex items-center gap-3">
                    <!-- Checkbox -->
                    <input 
                        type="checkbox"
                        :id="`ck_${fase.dni}_${idx}`"
                        :checked="actividad.finalizada"
                        @change="handleToggleActividad(actividad)"
                        :disabled="!puedeMarcarActividad(fase, actividad.finalizada)"
                        class="checkbox checkbox-sm"
                        :class="actividad.finalizada ? 'checkbox-success' : ''"
                    />
                    
                    <!-- Nombre -->
                    <label 
                        :for="`ck_${fase.dni}_${idx}`"
                        class="flex-1 cursor-pointer"
                        :class="{ 'line-through opacity-50': actividad.finalizada }"
                    >
                        {{ actividad.nombre }}
                    </label>
                    
                    <!-- Botón eliminar -->
                    <button 
                        v-if="puedeEliminarActividad(fase) && !actividad.finalizada"
                        @click="handleDeleteActividad(actividad)"
                        class="btn btn-ghost btn-xs text-error"
                        title="Eliminar actividad"
                    >
                        <span class="material-symbols-outlined text-base">delete</span>
                    </button>
                </div>
            </div>

            <!-- Sin actividades -->
            <div v-if="fase.Actividades.length === 0" class="text-center py-4 opacity-50 text-sm">
                Sin actividades
            </div>
        </div>

        <!-- Footer -->
        <div class="fase-footer">
            <!-- Botón agregar -->
            <button 
                v-if="puedeAgregarActividad(fase)"
                @click="handleAddActividad"
                class="btn btn-success btn-sm w-full mb-3"
            >
                <span class="material-symbols-outlined">add</span>
                Agregar actividad
            </button>

            <!-- Cronómetro / Estado -->
            <div class="cronometro-container">
                <!-- Fase Activa - Cronómetro -->
                <div v-if="estado === 'activa'" class="text-center">
                    <div class="flex items-center justify-center gap-2 text-info">
                        <span class="material-symbols-outlined animate-pulse">schedule</span>
                        <span class="font-mono text-lg font-bold">{{ tiempoFormateado }}</span>
                    </div>
                    <p class="text-xs opacity-70 mt-1">En progreso</p>
                </div>

                <!-- Fase Finalizada - Tiempo Total -->
                <div v-else-if="estado === 'finalizada'" class="text-center">
                    <div class="flex items-center justify-center gap-2 text-success">
                        <span class="material-symbols-outlined">check_circle</span>
                        <span class="font-mono text-lg font-bold">{{ tiempoFormateado }}</span>
                    </div>
                    <p class="text-xs opacity-70 mt-1">Completada</p>
                </div>

                <!-- Fase No Iniciada -->
                <div v-else class="alert alert-info alert-sm">
                    <span class="material-symbols-outlined">info</span>
                    <span class="text-sm">FASE NO INICIADA</span>
                </div>
            </div>
        </div>

        <!-- Flecha separadora -->
        <div class="fase-arrow">
            <span class="material-symbols-outlined">arrow_forward</span>
        </div>
    </div>
</template>

<style scoped>
.fase-card {
    min-width: 350px;
    max-width: 350px;
    border-width: 2px;
    border-style: solid;
    border-radius: 1rem;
    padding: 1.5rem;
    position: relative;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.fase-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

.fase-header {
    margin-bottom: 1rem;
}

.fase-progress {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 0.5rem;
}

.fase-actividades {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 1rem;
    padding: 0.5rem;
}

.actividad-item {
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 0.5rem;
    transition: all 0.2s ease;
}

.actividad-item:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateX(4px);
}

.fase-footer {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 1rem;
}

.cronometro-container {
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 0.5rem;
}

.fase-arrow {
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    color: currentColor;
    opacity: 0.3;
    font-size: 2rem;
}

/* Scrollbar personalizado */
.fase-actividades::-webkit-scrollbar {
    width: 6px;
}

.fase-actividades::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
}

.fase-actividades::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
}

.fase-actividades::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
}

/* Alert pequeño personalizado */
.alert-sm {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
}
</style>
