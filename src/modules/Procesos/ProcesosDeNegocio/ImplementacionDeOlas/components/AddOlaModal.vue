<script setup lang="ts">
import { ref, watch } from 'vue'
import { useOlaStore } from '../store/olaStore'
import { useOlaActions } from '../composables/useOlaActions'
import { useOlaUtils } from '../composables/useOlaUtils'
import type { OlaDescripcionType, TipoImplementacionType, PrioridadType } from '../types/ola.types'

interface Props {
    isOpen: boolean
}

interface Emits {
    (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const olaStore = useOlaStore()
const { createOla } = useOlaActions()
const { listaPrioridades, listaTiposImplementacion, listaOlas } = useOlaUtils()

// Form data
const formData = ref({
    concepto: '',
    tipoImplementacion: '' as TipoImplementacionType | '',
    prioridad: '' as PrioridadType | '',
    ola_descripcion: '' as OlaDescripcionType | ''
})

const isSubmitting = ref(false)

// Resetear formulario cuando se cierra
watch(() => props.isOpen, (newVal) => {
    if (!newVal) {
        resetForm()
    }
})

const resetForm = () => {
    formData.value = {
        concepto: '',
        tipoImplementacion: '',
        prioridad: '',
        ola_descripcion: ''
    }
}

const handleSubmit = async () => {
    // Validación
    if (!formData.value.concepto.trim()) {
        return
    }
    if (!formData.value.tipoImplementacion) {
        return
    }
    if (!formData.value.prioridad) {
        return
    }
    if (!formData.value.ola_descripcion) {
        return
    }

    if (!olaStore.procesoSeleccionado) {
        return
    }

    isSubmitting.value = true

    const result = await createOla({
        concepto: formData.value.concepto,
        tipoImplementacion: formData.value.tipoImplementacion as TipoImplementacionType,
        prioridad: formData.value.prioridad as PrioridadType,
        ola_descripcion: formData.value.ola_descripcion as OlaDescripcionType,
        dniProceso: olaStore.procesoSeleccionado.id
    })

    isSubmitting.value = false

    if (result) {
        emit('close')
    }
}

const handleClose = () => {
    emit('close')
}
</script>

<template>
    <div v-if="isOpen" class="modal modal-open">
        <div class="modal-box max-w-2xl">
            <h2 class="text-2xl font-bold mb-4">Agregar Ola</h2>
            <hr class="mb-4" />

            <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Concepto -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Concepto:</span>
                    </label>
                    <input
                        v-model="formData.concepto"
                        type="text"
                        class="input input-bordered w-full"
                        placeholder="Descripción del concepto"
                        required
                    />
                </div>

                <!-- Tipo de Implementación -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Tipo de Implementación:</span>
                    </label>
                    <select
                        v-model="formData.tipoImplementacion"
                        class="select select-bordered w-full"
                        required
                    >
                        <option value="" disabled>Seleccionar tipo</option>
                        <option v-for="tipo in listaTiposImplementacion" :key="tipo" :value="tipo">
                            {{ tipo }}
                        </option>
                    </select>
                </div>

                <!-- Prioridad -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Prioridad:</span>
                    </label>
                    <select
                        v-model="formData.prioridad"
                        class="select select-bordered w-full"
                        required
                    >
                        <option value="" disabled>Seleccionar prioridad</option>
                        <option v-for="prioridad in listaPrioridades" :key="prioridad" :value="prioridad">
                            {{ prioridad }}
                        </option>
                    </select>
                </div>

                <!-- Ola -->
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Ola:</span>
                    </label>
                    <select
                        v-model="formData.ola_descripcion"
                        class="select select-bordered w-full"
                        required
                    >
                        <option value="" disabled>Seleccionar ola</option>
                        <option v-for="ola in listaOlas" :key="ola" :value="ola">
                            {{ ola }}
                        </option>
                    </select>
                </div>

                <!-- Botones -->
                <div class="modal-action">
                    <button
                        type="button"
                        @click="handleClose"
                        class="btn btn-error"
                        :disabled="isSubmitting"
                    >
                        <span class="material-symbols-outlined">close</span>
                        Cerrar
                    </button>
                    <button
                        type="submit"
                        class="btn btn-success"
                        :disabled="isSubmitting"
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
