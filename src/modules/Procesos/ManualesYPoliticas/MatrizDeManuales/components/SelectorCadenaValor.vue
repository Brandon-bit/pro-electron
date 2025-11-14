<script setup lang="ts">
import { ref, watch } from 'vue'
import { useManualesStore } from '../store/manualesStore'
import { useManualesActions } from '../composables/useManualesActions'

const manualesStore = useManualesStore()
const { loadDatosCV } = useManualesActions()

const cvSeleccionadaId = ref<number | null>(null)

watch(cvSeleccionadaId, async (newId) => {
    if (newId) {
        const cv = manualesStore.cadenasValor.find(c => c.dni === newId)
        if (cv) {
            manualesStore.setCV(cv)
            await loadDatosCV(newId)
        }
    } else {
        manualesStore.setCV(null)
        manualesStore.reset()
    }
})

watch(() => manualesStore.cvSeleccionada, (cv) => {
    if (cv && cvSeleccionadaId.value !== cv.dni) {
        cvSeleccionadaId.value = cv.dni
    } else if (!cv) {
        cvSeleccionadaId.value = null
    }
}, { immediate: true })
</script>

<template>
    <div class="form-control w-full">
        <label class="label">
            <span class="label-text font-semibold flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">account_tree</span>
                Cadena de Valor:
            </span>
        </label>
        <select 
            class="select select-bordered w-full"
            v-model="cvSeleccionadaId"
            :disabled="manualesStore.isLoading"
        >
            <option :value="null" disabled selected>Seleccionar cadena de valor...</option>
            <option 
                v-for="cv in manualesStore.cadenasValor" 
                :key="cv.dni" 
                :value="cv.dni"
            >
                {{ cv.name }}
            </option>
        </select>
    </div>
</template>
