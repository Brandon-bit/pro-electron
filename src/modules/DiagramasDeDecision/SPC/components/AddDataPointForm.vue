<script setup lang="ts">
import { ref } from 'vue'
import { useSPCActions } from '@/modules/DiagramasDeDecision/SPC/composables/useSPCActions'

const { handleAddDataPoint } = useSPCActions()

const newValue = ref('')

const addPoint = () => {
    const success = handleAddDataPoint(newValue.value)
    if (success) {
        newValue.value = ''
    }
}

const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        addPoint()
    }
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Agregar Nuevo Punto de Datos</h2>
            
            <div class="flex gap-4 mt-4">
                <div class="flex-1 form-control">
                    <label class="label">
                        <span class="label-text">Valor de la Medición</span>
                    </label>
                    <input
                        v-model="newValue"
                        type="number"
                        step="0.1"
                        class="input input-bordered"
                        placeholder="Ej: 24.5"
                        @keydown="handleKeyPress"
                    />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text opacity-0">.</span>
                    </label>
                    <button @click="addPoint" class="btn btn-primary gap-2">
                        <span class="material-symbols-outlined">add</span>
                        Agregar Punto
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
