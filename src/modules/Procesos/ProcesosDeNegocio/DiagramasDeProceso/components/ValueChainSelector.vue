<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getValueChainsService } from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/services/businessProcessServices'
import type { ValueChainType } from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/types/businessProcessTypes'

const emit = defineEmits<{
    change: [valueChain: ValueChainType]
}>()

const valueChains = ref<ValueChainType[]>([])
const selectedCV = ref<number>(0)
const isLoading = ref(false)

onMounted(async () => {
    await loadValueChains()
})

const loadValueChains = async () => {
    try {
        isLoading.value = true
        const response = await getValueChainsService()
        if (response.success) {
            valueChains.value = response.data
            // Seleccionar la primera por defecto
            if (valueChains.value.length > 0) {
                selectedCV.value = valueChains.value[0].dni
                emit('change', valueChains.value[0])
            }
        }
    } catch (error) {
        console.error('Error al cargar cadenas de valor:', error)
    } finally {
        isLoading.value = false
    }
}

const handleChange = () => {
    const selected = valueChains.value.find((cv) => cv.dni === selectedCV.value)
    if (selected) {
        emit('change', selected)
    }
}
</script>

<template>
    <div class="form-control w-full max-w-xs">
        <label class="label">
            <span class="label-text font-semibold">Cargar datos de la cadena de valor:</span>
        </label>
        <select
            v-model="selectedCV"
            @change="handleChange"
            class="select select-bordered select-sm w-full"
            :disabled="isLoading"
        >
            <option disabled :value="0">Seleccionar cadena</option>
            <option v-for="cv in valueChains" :key="cv.dni" :value="cv.dni">
                {{ cv.name }}
            </option>
        </select>
    </div>
</template>
