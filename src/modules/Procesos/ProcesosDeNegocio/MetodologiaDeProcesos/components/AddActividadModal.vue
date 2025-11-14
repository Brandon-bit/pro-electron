<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMetodologiaStore } from '../store/metodologiaStore'
import { useMetodologiaActions } from '../composables/useMetodologiaActions'
import type { IFase } from '../types/metodologia.types'

interface Props {
    isOpen: boolean
    fase: IFase | null
}

interface Emits {
    (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const metodologiaStore = useMetodologiaStore()
const { createActividad } = useMetodologiaActions()

const nombreActividad = ref('')
const isSubmitting = ref(false)

// Resetear formulario cuando se cierra
watch(() => props.isOpen, (newVal) => {
    if (!newVal) {
        nombreActividad.value = ''
    }
})

const handleSubmit = async () => {
    if (!nombreActividad.value.trim()) return
    if (!props.fase) return
    if (!metodologiaStore.procesoSeleccionado) return

    isSubmitting.value = true

    const result = await createActividad({
        dniFase: props.fase.dni,
        nombre: nombreActividad.value.trim(),
        dniProc: metodologiaStore.procesoSeleccionado.id
    })

    isSubmitting.value = false

    if (result) {
        emit('close')
    }
}

const handleClose = () => {
    if (!isSubmitting.value) {
        emit('close')
    }
}
</script>

<template>
    <div v-if="isOpen && fase" class="modal modal-open">
        <div class="modal-box">
            <!-- Header -->
            <h3 class="font-bold text-lg mb-4">
                <span class="material-symbols-outlined align-middle text-primary">add_task</span>
                Agregar Actividad
            </h3>

            <p class="text-sm opacity-70 mb-4">
                Fase: <strong>{{ fase.nombre }}</strong>
            </p>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Nombre de la actividad:</span>
                    </label>
                    <input
                        v-model="nombreActividad"
                        type="text"
                        class="input input-bordered w-full"
                        placeholder="Ej: Definir objetivos del proceso"
                        required
                        autofocus
                        :disabled="isSubmitting"
                    />
                </div>

                <!-- Actions -->
                <div class="modal-action">
                    <button
                        type="button"
                        @click="handleClose"
                        class="btn btn-ghost"
                        :disabled="isSubmitting"
                    >
                        <span class="material-symbols-outlined">close</span>
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        class="btn btn-success"
                        :disabled="isSubmitting || !nombreActividad.trim()"
                    >
                        <span class="material-symbols-outlined">add</span>
                        {{ isSubmitting ? 'Agregando...' : 'Agregar' }}
                    </button>
                </div>
            </form>
        </div>
        <div class="modal-backdrop" @click="handleClose"></div>
    </div>
</template>
