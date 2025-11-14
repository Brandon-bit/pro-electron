<script setup lang="ts">
import { ref } from 'vue'
import { useTiemposActions } from '../composables/useTiemposActions'

const props = defineProps<{
    show: boolean
    dniTM: number
    dniP: number
}>()

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'saved'): void
}>()

const { agregarActividad } = useTiemposActions()

const form = ref({
    nombre: '',
    personas: 1,
    recomendaciones: ''
})

const personas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const isSaving = ref(false)

const resetForm = () => {
    form.value = {
        nombre: '',
        personas: 1,
        recomendaciones: ''
    }
}

const handleClose = () => {
    resetForm()
    emit('close')
}

const handleGuardar = async () => {
    if (!form.value.nombre.trim()) {
        alert('El nombre es requerido')
        return
    }

    try {
        isSaving.value = true
        const success = await agregarActividad(
            props.dniTM,
            props.dniP,
            {
                nombre: form.value.nombre,
                personas: form.value.personas,
                recomendaciones: form.value.recomendaciones
            }
        )

        if (success) {
            emit('saved')
            handleClose()
        }
    } finally {
        isSaving.value = false
    }
}
</script>

<template>
    <div v-if="show" class="modal modal-open">
        <div class="modal-box">
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined">add_circle</span>
                Nueva Actividad
            </h3>

            <div class="form-control mb-4">
                <label class="label">
                    <span class="label-text font-semibold">Nombre *</span>
                </label>
                <input 
                    type="text" 
                    class="input input-bordered"
                    v-model="form.nombre"
                    placeholder="Ej: Ensamble de piezas"
                    autocomplete="off"
                />
            </div>

            <div class="form-control mb-4">
                <label class="label">
                    <span class="label-text font-semibold">Cantidad de personas</span>
                </label>
                <select class="select select-bordered" v-model.number="form.personas">
                    <option v-for="p in personas" :key="p" :value="p">{{ p }}</option>
                </select>
            </div>

            <div class="form-control mb-6">
                <label class="label">
                    <span class="label-text font-semibold">Recomendaciones</span>
                </label>
                <textarea 
                    class="textarea textarea-bordered" 
                    rows="4"
                    v-model="form.recomendaciones"
                    placeholder="Observaciones o recomendaciones..."
                ></textarea>
            </div>

            <div class="modal-action">
                <button 
                    class="btn btn-ghost"
                    @click="handleClose"
                    :disabled="isSaving"
                >
                    <span class="material-symbols-outlined">close</span>
                    Cancelar
                </button>
                <button 
                    class="btn btn-success"
                    @click="handleGuardar"
                    :disabled="isSaving"
                >
                    <span v-if="isSaving" class="loading loading-spinner loading-sm"></span>
                    <span v-else class="material-symbols-outlined">add</span>
                    Agregar
                </button>
            </div>
        </div>
        <div class="modal-backdrop" @click="handleClose"></div>
    </div>
</template>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
}
</style>
