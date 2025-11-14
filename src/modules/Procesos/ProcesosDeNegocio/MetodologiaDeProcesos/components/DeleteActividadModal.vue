<script setup lang="ts">
import { ref } from 'vue'
import { useMetodologiaStore } from '../store/metodologiaStore'
import { useMetodologiaActions } from '../composables/useMetodologiaActions'
import type { IFase, IActividad } from '../types/metodologia.types'

interface Props {
    isOpen: boolean
    fase: IFase | null
    actividad: IActividad | null
}

interface Emits {
    (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const metodologiaStore = useMetodologiaStore()
const { deleteActividad } = useMetodologiaActions()
const isDeleting = ref(false)

const handleConfirm = async () => {
    if (!props.fase || !props.actividad) return
    if (!metodologiaStore.procesoSeleccionado) return

    isDeleting.value = true

    const success = await deleteActividad({
        dniFase: props.fase.dni,
        dni: props.actividad.dni,
        dniProc: metodologiaStore.procesoSeleccionado.id
    })

    isDeleting.value = false

    if (success) {
        emit('close')
    }
}

const handleClose = () => {
    if (!isDeleting.value) {
        emit('close')
    }
}
</script>

<template>
    <div v-if="isOpen && fase && actividad" class="modal modal-open">
        <div class="modal-box">
            <!-- Header -->
            <h3 class="font-bold text-lg mb-4">
                <span class="material-symbols-outlined text-error align-middle">warning</span>
                Eliminar Actividad
            </h3>

            <!-- Content -->
            <div class="py-4">
                <p class="text-base mb-4">
                    ¿Estás seguro de eliminar esta actividad?
                </p>
                
                <div class="alert alert-warning">
                    <span class="material-symbols-outlined">info</span>
                    <span>Si eliminas la actividad no se podrán recuperar los datos</span>
                </div>

                <div class="mt-4 p-4 bg-base-200 rounded">
                    <p class="text-sm"><strong>Fase:</strong> {{ fase.nombre }}</p>
                    <p class="text-sm"><strong>Actividad:</strong> {{ actividad.nombre }}</p>
                </div>
            </div>

            <!-- Actions -->
            <div class="modal-action">
                <button
                    type="button"
                    @click="handleClose"
                    class="btn btn-ghost"
                    :disabled="isDeleting"
                >
                    <span class="material-symbols-outlined">close</span>
                    Cancelar
                </button>
                <button
                    type="button"
                    @click="handleConfirm"
                    class="btn btn-error"
                    :disabled="isDeleting"
                >
                    <span class="material-symbols-outlined">delete</span>
                    {{ isDeleting ? 'Eliminando...' : 'Eliminar' }}
                </button>
            </div>
        </div>
        <div class="modal-backdrop" @click="handleClose"></div>
    </div>
</template>
