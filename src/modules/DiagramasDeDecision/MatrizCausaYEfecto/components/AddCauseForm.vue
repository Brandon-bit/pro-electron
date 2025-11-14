<script setup lang="ts">
import { ref } from 'vue'
import { useIshikawaActions } from '@/modules/DiagramasDeDecision/MatrizCausaYEfecto/composables/useIshikawaActions'
import { CATEGORIES } from '@/modules/DiagramasDeDecision/MatrizCausaYEfecto/types/ishikawaTypes'

const { handleAddCause } = useIshikawaActions()

const newCauseText = ref('')
const newCauseCategory = ref('machine')

const addCause = () => {
    const success = handleAddCause(newCauseText.value, newCauseCategory.value)
    if (success) {
        newCauseText.value = ''
        newCauseCategory.value = 'machine'
    }
}
</script>

<template>
    <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title gap-2">
                <span class="material-symbols-outlined">add_circle</span>
                Agregar Nueva Causa
            </h2>

            <div class="grid grid-cols-3 gap-4 mt-4">
                <!-- Descripción de la Causa -->
                <div class="col-span-2 form-control">
                    <label class="label">
                        <span class="label-text">Descripción de la Causa</span>
                    </label>
                    <input
                        v-model="newCauseText"
                        type="text"
                        class="input input-bordered"
                        placeholder="Ej: Equipos obsoletos sin actualización"
                    />
                </div>

                <!-- Categoría (6M) -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Categoría (6M)</span>
                    </label>
                    <select
                        v-model="newCauseCategory"
                        class="select select-bordered"
                    >
                        <option v-for="cat in CATEGORIES" :key="cat.id" :value="cat.id">
                            {{ cat.name }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Botón Agregar -->
            <div class="mt-4">
                <button @click="addCause" class="btn btn-primary gap-2">
                    <span class="material-symbols-outlined">add</span>
                    Agregar Causa
                </button>
            </div>
        </div>
    </div>
</template>
