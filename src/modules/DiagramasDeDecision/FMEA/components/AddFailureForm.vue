<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFMEAActions } from '@/modules/DiagramasDeDecision/FMEA/composables/useFMEAActions'

const { handleAddRow } = useFMEAActions()

const newFailureMode = ref('')
const newEffect = ref('')
const newS = ref(5)
const newO = ref(5)
const newD = ref(5)

const calculatedRPN = computed(() => newS.value * newO.value * newD.value)

const addRow = () => {
    const success = handleAddRow(newFailureMode.value, newEffect.value, newS.value, newO.value, newD.value)
    if (success) {
        newFailureMode.value = ''
        newEffect.value = ''
        newS.value = 5
        newO.value = 5
        newD.value = 5
    }
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Agregar Modo de Falla</h2>
            
            <div class="grid grid-cols-5 gap-4 mt-4">
                <!-- Modo de Falla -->
                <div class="col-span-2 form-control">
                    <label class="label">
                        <span class="label-text">Modo de Falla</span>
                    </label>
                    <input
                        v-model="newFailureMode"
                        type="text"
                        class="input input-bordered"
                        placeholder="Ej: Fallo del servidor"
                    />
                </div>

                <!-- Efecto -->
                <div class="col-span-2 form-control">
                    <label class="label">
                        <span class="label-text">Efecto</span>
                    </label>
                    <input
                        v-model="newEffect"
                        type="text"
                        class="input input-bordered"
                        placeholder="Ej: Sistema inoperativo"
                    />
                </div>

                <!-- S -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">S</span>
                    </label>
                    <select v-model.number="newS" class="select select-bordered">
                        <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                    </select>
                </div>

                <!-- O -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">O</span>
                    </label>
                    <select v-model.number="newO" class="select select-bordered">
                        <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                    </select>
                </div>

                <!-- D -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">D</span>
                    </label>
                    <select v-model.number="newD" class="select select-bordered">
                        <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                    </select>
                </div>

                <!-- RPN Calculado -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">RPN</span>
                    </label>
                    <div class="h-12 flex items-center justify-center font-bold text-lg border-2 border-base-300 rounded-lg">
                        {{ calculatedRPN }}
                    </div>
                </div>

                <!-- Botón Agregar -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text opacity-0">.</span>
                    </label>
                    <button @click="addRow" class="btn btn-primary w-full gap-2">
                        <span class="material-symbols-outlined">add</span>
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
