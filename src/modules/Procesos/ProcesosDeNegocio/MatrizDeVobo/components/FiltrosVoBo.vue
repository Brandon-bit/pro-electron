<script setup lang="ts">
import { computed } from 'vue'
import { useVoBoStore } from '../store/voboStore'
import { useVoBoActions } from '../composables/useVoBoActions'

const voboStore = useVoBoStore()
const { selectCadenaValor, selectEspacio, selectProceso } = useVoBoActions()

// Computed para v-model
const selectedCV = computed({
    get: () => voboStore.filtro.dniCV,
    set: (value) => {
        if (value) selectCadenaValor(value)
    }
})

const selectedEsp = computed({
    get: () => voboStore.filtro.dniEsp,
    set: (value) => {
        if (value) selectEspacio(value)
    }
})

const selectedProc = computed({
    get: () => voboStore.filtro.dniProc,
    set: (value) => {
        if (value) selectProceso(value)
    }
})

// Opciones combinadas de espacios
const opcionesEspacios = computed(() => {
    const opciones: Array<{ value: number, label: string, isGroup?: boolean, disabled?: boolean }> = []
    
    // Espacios normales
    if (voboStore.espacios.length > 0) {
        opciones.push({ value: 0, label: '-- Procesos --', isGroup: true, disabled: true })
        voboStore.espacios.forEach(esp => {
            opciones.push({ value: esp.id, label: esp.nombre })
        })
    }
    
    // Espacios de CV
    if (voboStore.cvEspacios.length > 0) {
        opciones.push({ value: 0, label: '-- Cadena de Valor --', isGroup: true, disabled: true })
        voboStore.cvEspacios.forEach(cvEsp => {
            opciones.push({ value: cvEsp.dni, label: cvEsp.titulo })
        })
    }
    
    return opciones
})

// Opciones combinadas de procesos
const opcionesProcesos = computed(() => {
    const opciones: Array<{ value: number, label: string, isGroup?: boolean, disabled?: boolean }> = []
    
    // Procesos AsIs
    if (voboStore.procesosAsIs.length > 0) {
        opciones.push({ value: 0, label: '-- Procesos AsIs --', isGroup: true, disabled: true })
        voboStore.procesosAsIs.forEach(proc => {
            opciones.push({ value: proc.id, label: proc.nombre })
        })
    }
    
    // Procesos ToBe
    if (voboStore.procesosToBe.length > 0) {
        opciones.push({ value: 0, label: '-- Procesos ToBe --', isGroup: true, disabled: true })
        voboStore.procesosToBe.forEach(proc => {
            opciones.push({ value: proc.id, label: proc.nombre })
        })
    }
    
    return opciones
})
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Cadena de Valor -->
        <div class="form-control">
            <label class="label">
                <span class="label-text font-semibold">Cadena de Valor</span>
            </label>
            <select 
                v-model="selectedCV" 
                class="select select-bordered w-full"
            >
                <option :value="0" disabled>Seleccionar...</option>
                <option 
                    v-for="cv in voboStore.cadenasValor" 
                    :key="cv.dni" 
                    :value="cv.dni"
                >
                    {{ cv.name }}
                </option>
            </select>
        </div>

        <!-- Espacios -->
        <div class="form-control">
            <label class="label">
                <span class="label-text font-semibold">Espacios</span>
            </label>
            <select 
                v-model="selectedEsp" 
                class="select select-bordered w-full"
                :disabled="!voboStore.hasFiltroCV || voboStore.isLoadingEspacios"
            >
                <option :value="0" disabled>Seleccionar...</option>
                <option 
                    v-for="opcion in opcionesEspacios" 
                    :key="opcion.value" 
                    :value="opcion.value"
                    :disabled="opcion.disabled"
                    :class="{ 'font-bold': opcion.isGroup }"
                >
                    {{ opcion.label }}
                </option>
            </select>
            <span v-if="voboStore.isLoadingEspacios" class="loading loading-spinner loading-sm mt-1"></span>
        </div>

        <!-- Procesos -->
        <div class="form-control">
            <label class="label">
                <span class="label-text font-semibold">Procesos</span>
            </label>
            <select 
                v-model="selectedProc" 
                class="select select-bordered w-full"
                :disabled="!voboStore.hasFiltroEsp"
            >
                <option :value="0" disabled>Seleccionar...</option>
                <option 
                    v-for="opcion in opcionesProcesos" 
                    :key="opcion.value" 
                    :value="opcion.value"
                    :disabled="opcion.disabled"
                    :class="{ 'font-bold': opcion.isGroup }"
                >
                    {{ opcion.label }}
                </option>
            </select>
        </div>
    </div>
</template>
