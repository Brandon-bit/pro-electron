<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useTiemposActions } from '../composables/useTiemposActions'

const props = defineProps<{
    show: boolean
    dniTM: number
    dniP: number
    horaInicio: string
    horaFin: string
}>()

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'saved'): void
}>()

const { editarHorasTrabajo } = useTiemposActions()

const form = ref({
    tiempoInicio: '',
    tiempoFin: ''
})

const isSaving = ref(false)

// Calcular horas de trabajo
const horasCalculadas = computed(() => {
    if (!form.value.tiempoInicio || !form.value.tiempoFin) return '00:00'
    
    const [h1, m1] = form.value.tiempoInicio.split(':').map(Number)
    const [h2, m2] = form.value.tiempoFin.split(':').map(Number)
    
    let totalMinutes = (h2 * 60 + m2) - (h1 * 60 + m1)
    
    if (totalMinutes < 0) totalMinutes += 24 * 60 // Ajuste para cruce de medianoche
    
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
})

// Inicializar form cuando se muestra el modal
watch(() => props.show, (newVal) => {
    if (newVal) {
        form.value = {
            tiempoInicio: props.horaInicio || '08:00',
            tiempoFin: props.horaFin || '16:00'
        }
    }
}, { immediate: true })

const handleClose = () => {
    emit('close')
}

const handleGuardar = async () => {
    if (!form.value.tiempoInicio || !form.value.tiempoFin) {
        alert('Completa ambas horas')
        return
    }

    const [h1, m1] = form.value.tiempoInicio.split(':').map(Number)
    const [h2, m2] = form.value.tiempoFin.split(':').map(Number)
    
    if ((h2 * 60 + m2) <= (h1 * 60 + m1)) {
        alert('La hora de fin debe ser mayor a la hora de inicio')
        return
    }

    try {
        isSaving.value = true
        const success = await editarHorasTrabajo(
            props.dniTM,
            props.dniP,
            form.value.tiempoInicio,
            form.value.tiempoFin
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
                <span class="material-symbols-outlined">schedule</span>
                Editar Horas de Trabajo
            </h3>

            <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Hora de Inicio</span>
                    </label>
                    <input 
                        type="time" 
                        class="input input-bordered"
                        v-model="form.tiempoInicio"
                    />
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text font-semibold">Hora de Fin</span>
                    </label>
                    <input 
                        type="time" 
                        class="input input-bordered"
                        v-model="form.tiempoFin"
                    />
                </div>
            </div>

            <div class="alert alert-info mb-4">
                <span class="material-symbols-outlined">info</span>
                <div>
                    <p class="font-semibold">Horas de trabajo calculadas:</p>
                    <p class="text-2xl font-bold">{{ horasCalculadas }}</p>
                </div>
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
                    <span v-else class="material-symbols-outlined">check</span>
                    Guardar
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
