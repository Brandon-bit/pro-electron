<script setup lang="ts">
import { computed } from 'vue'
import { useReduccionStore } from '../store/reduccionStore'
import { useReduccionActions } from '../composables/useReduccionActions'

const reduccionStore = useReduccionStore()
const { 
    selectCadenaValor, 
    selectProceso, 
    selectProcesoNiv4,
    selectDiagramaAsis,
    selectDiagramaTobe,
    compararDiagramas
} = useReduccionActions()

// Combinar espacios y cvEspacios para el selector de procesos
const opcionesProcesos = computed(() => {
    return [...reduccionStore.espacios, ...reduccionStore.cvEspacios]
})

// Handlers
const handleCadenaValorChange = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value
    if (value) {
        selectCadenaValor(Number(value))
    }
}

const handleProcesoChange = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value
    if (value) {
        const index = Number(value)
        const proceso = opcionesProcesos.value[index]
        if (proceso) {
            selectProceso(proceso)
        }
    }
}

const handleProcesoNiv4Change = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value
    const tipo = value.split('-')[0]
    const index = Number(value.split('-')[1])
    
    if (tipo === 'asis') {
        const proceso = reduccionStore.opcionesProcesosNiv4Asis[index]
        if (proceso) selectProcesoNiv4(proceso)
    } else if (tipo === 'tobe') {
        const proceso = reduccionStore.opcionesProcesosNiv4Tobe[index]
        if (proceso) selectProcesoNiv4(proceso)
    }
}

const handleDiagramaAsisChange = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value
    if (value) {
        selectDiagramaAsis(Number(value))
    }
}

const handleDiagramaTobeChange = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value
    if (value) {
        selectDiagramaTobe(Number(value))
    }
}

const handleComparar = () => {
    compararDiagramas()
}
</script>

<template>
    <div class="filtros-cascada">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
            <!-- Cadena de Valor -->
            <div class="form-control">
                <label class="label">
                    <span class="label-text font-semibold">Cadena de Valor</span>
                </label>
                <select 
                    class="select select-bordered w-full"
                    :value="reduccionStore.filtros.idCV"
                    @change="handleCadenaValorChange"
                    :disabled="reduccionStore.isLoading"
                >
                    <option 
                        v-for="cv in reduccionStore.cadenasValor" 
                        :key="cv.dni" 
                        :value="cv.dni"
                    >
                        {{ cv.name }}
                    </option>
                </select>
            </div>

            <!-- Procesos -->
            <div class="form-control">
                <label class="label">
                    <span class="label-text font-semibold">Procesos</span>
                </label>
                <select 
                    class="select select-bordered w-full"
                    @change="handleProcesoChange"
                    :disabled="!reduccionStore.filtros.idCV || reduccionStore.isLoading"
                >
                    <option value="" selected disabled>Seleccionar...</option>
                    <optgroup label="Procesos">
                        <option 
                            v-for="(esp, index) in reduccionStore.espacios" 
                            :key="`esp-${esp.id}`" 
                            :value="index"
                        >
                            {{ esp.nombre }}
                        </option>
                    </optgroup>
                    <optgroup label="Cadena de Valor">
                        <option 
                            v-for="(cvEsp, index) in reduccionStore.cvEspacios" 
                            :key="`cv-${cvEsp.dni}`" 
                            :value="reduccionStore.espacios.length + index"
                        >
                            {{ cvEsp.titulo }}
                        </option>
                    </optgroup>
                </select>
            </div>

            <!-- Procesos Niv 4 -->
            <div class="form-control">
                <label class="label">
                    <span class="label-text font-semibold">Procesos Niv 4</span>
                </label>
                <select 
                    class="select select-bordered w-full"
                    @change="handleProcesoNiv4Change"
                    :disabled="!reduccionStore.filtros.idP || reduccionStore.isLoading"
                >
                    <option value="" selected disabled>Seleccionar...</option>
                    <optgroup label="Procesos ASIS">
                        <option 
                            v-for="(proc, index) in reduccionStore.opcionesProcesosNiv4Asis" 
                            :key="`asis-${proc.id || proc.dni}`" 
                            :value="`asis-${index}`"
                        >
                            {{ proc.nombre }}
                        </option>
                    </optgroup>
                    <optgroup label="Procesos TOBE">
                        <option 
                            v-for="(proc, index) in reduccionStore.opcionesProcesosNiv4Tobe" 
                            :key="`tobe-${proc.id || proc.dni}`" 
                            :value="`tobe-${index}`"
                        >
                            {{ proc.nombre }}
                        </option>
                    </optgroup>
                </select>
            </div>

            <!-- Diagramas ASIS -->
            <div class="form-control">
                <label class="label">
                    <span class="label-text font-semibold">Diagramas ASIS</span>
                </label>
                <select 
                    class="select select-bordered w-full"
                    :value="reduccionStore.filtros.idA"
                    @change="handleDiagramaAsisChange"
                    :disabled="!reduccionStore.filtros.idPr || reduccionStore.isLoading"
                >
                    <option :value="null" selected>Seleccionar...</option>
                    <option 
                        v-for="diag in reduccionStore.opcionesDiagramasAsis" 
                        :key="diag.dni" 
                        :value="diag.dni"
                    >
                        {{ diag.nombreDiag }}
                    </option>
                </select>
            </div>

            <!-- Diagramas TOBE -->
            <div class="form-control">
                <label class="label">
                    <span class="label-text font-semibold">Diagramas TOBE</span>
                </label>
                <select 
                    class="select select-bordered w-full"
                    :value="reduccionStore.filtros.idT"
                    @change="handleDiagramaTobeChange"
                    :disabled="!reduccionStore.filtros.idPr || reduccionStore.isLoading"
                >
                    <option :value="null" selected>Seleccionar...</option>
                    <option 
                        v-for="diag in reduccionStore.opcionesDiagramasTobe" 
                        :key="diag.dni" 
                        :value="diag.dni"
                    >
                        {{ diag.nombreDiag }}
                    </option>
                </select>
            </div>

            <!-- Botón Comparar -->
            <div class="form-control">
                <button 
                    class="btn btn-success w-full"
                    @click="handleComparar"
                    :disabled="!reduccionStore.puedeComparar || reduccionStore.isLoading"
                >
                    <span class="material-symbols-outlined">compare_arrows</span>
                    Comparar
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.filtros-cascada {
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
