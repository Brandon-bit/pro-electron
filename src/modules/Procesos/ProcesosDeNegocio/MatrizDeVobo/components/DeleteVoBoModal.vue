<script setup lang="ts">
import { ref } from 'vue'
import { useVoBoActions } from '../composables/useVoBoActions'
import type { IVoBoManual } from '../types/vobo.types'

interface Props {
    isOpen: boolean
    vobo: IVoBoManual | null
}

interface Emits {
    (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { deleteVoBoManual } = useVoBoActions()
const isDeleting = ref(false)

const handleConfirm = async () => {
    if (!props.vobo) return

    isDeleting.value = true

    const success = await deleteVoBoManual(
        { dni: props.vobo.dni },
        props.vobo
    )

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
    <div v-if="isOpen && vobo" class="modal modal-open">
        <div class="modal-box">
            <!-- Header -->
            <h3 class="font-bold text-lg mb-4">
                <span class="material-symbols-outlined text-error align-middle">warning</span>
                Confirmar Eliminación
            </h3>

            <!-- Content -->
            <div class="py-4">
                <p class="text-base mb-4">
                    ¿Estás seguro de eliminar este VoBo?
                </p>
                
                <div class="alert alert-warning">
                    <span class="material-symbols-outlined">info</span>
                    <span>Si eliminas el VoBo no se podrán recuperar los datos</span>
                </div>

                <div class="mt-4 p-4 bg-base-200 rounded">
                    <p class="text-sm"><strong>Id:</strong> {{ vobo.dni }}</p>
                    <p class="text-sm"><strong>Proceso:</strong> {{ vobo.Proceso.nombre }}</p>
                    <p class="text-sm"><strong>Solicitante:</strong> {{ vobo.solicitante }}</p>
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
