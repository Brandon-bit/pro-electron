<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMetodologiaActions } from '../composables/useMetodologiaActions'
import type { IProceso } from '../types/metodologia.types'

const { loadProcesos, selectProceso } = useMetodologiaActions()

const procesos = ref<IProceso[]>([])
const procesoSeleccionadoId = ref<number | null>(null)
const isLoading = ref(false)

const cargarProcesos = async () => {
    isLoading.value = true
    procesos.value = await loadProcesos()
    isLoading.value = false
}

const onSelectProceso = async () => {
    if (procesoSeleccionadoId.value) {
        const proceso = procesos.value.find(p => p.id === procesoSeleccionadoId.value)
        if (proceso) {
            await selectProceso(proceso)
        }
    }
}

onMounted(() => {
    cargarProcesos()
})
</script>

<template>
    <div class="form-control w-full">
        <label class="label">
            <span class="label-text font-semibold">Cargar datos de un proceso:</span>
        </label>
        <select 
            v-model="procesoSeleccionadoId" 
            @change="onSelectProceso"
            class="select select-bordered w-full"
            :disabled="isLoading"
        >
            <option :value="null" disabled selected>Seleccionar proceso nivel 4</option>
            <option 
                v-for="proceso in procesos" 
                :key="proceso.id" 
                :value="proceso.id"
            >
                {{ proceso.nombre }}
            </option>
        </select>
    </div>
</template>
