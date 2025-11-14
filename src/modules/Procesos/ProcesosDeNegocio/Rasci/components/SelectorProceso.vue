<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRasciStore } from '../store/rasciStore'
import { useRasciActions } from '../composables/useRasciActions'

const rasciStore = useRasciStore()
const { seleccionarProceso } = useRasciActions()

const procesoSeleccionadoId = ref<number | null>(null)

// Watch para cargar cuando se selecciona un proceso
watch(procesoSeleccionadoId, async (newId) => {
    if (newId) {
        await seleccionarProceso(newId)
    }
})

// Si ya hay un proceso seleccionado, establecer el valor
watch(() => rasciStore.procesoSeleccionado, (proceso) => {
    if (proceso && procesoSeleccionadoId.value !== proceso.dni) {
        procesoSeleccionadoId.value = proceso.dni
    }
}, { immediate: true })
</script>

<template>
    <div class="form-control w-full">
        <label class="label">
            <span class="label-text font-semibold">
                <span class="material-symbols-outlined text-sm">process</span>
                Cargar datos de un proceso:
            </span>
        </label>
        <select 
            class="select select-bordered w-full"
            v-model="procesoSeleccionadoId"
            :disabled="rasciStore.isLoading"
        >
            <option :value="null" disabled selected>Seleccionar proceso...</option>
            <option 
                v-for="proceso in rasciStore.procesos" 
                :key="proceso.dni" 
                :value="proceso.dni"
            >
                {{ proceso.nombre }}
            </option>
        </select>
    </div>
</template>
