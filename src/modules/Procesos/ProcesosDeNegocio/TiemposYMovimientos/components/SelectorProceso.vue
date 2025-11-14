<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTiemposStore } from '../store/tiemposStore'
import { useTiemposActions } from '../composables/useTiemposActions'

const tiemposStore = useTiemposStore()
const { loadTabla } = useTiemposActions()

const procesoSeleccionadoId = ref<number | null>(null)

watch(procesoSeleccionadoId, async (newId) => {
    if (newId) {
        await loadTabla(newId)
    }
})

watch(() => tiemposStore.procesoSeleccionado, (proceso) => {
    if (proceso && procesoSeleccionadoId.value !== proceso.id) {
        procesoSeleccionadoId.value = proceso.id
    }
}, { immediate: true })
</script>

<template>
    <div class="form-control w-full">
        <label class="label">
            <span class="label-text font-semibold flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">process</span>
                Cargar datos de un proceso:
            </span>
        </label>
        <select 
            class="select select-bordered w-full"
            v-model="procesoSeleccionadoId"
            :disabled="tiemposStore.isLoading"
        >
            <option :value="null" disabled selected>Seleccionar proceso...</option>
            <option 
                v-for="proceso in tiemposStore.procesos" 
                :key="proceso.id" 
                :value="proceso.id"
            >
                {{ proceso.nombre }}
            </option>
        </select>
    </div>
</template>
