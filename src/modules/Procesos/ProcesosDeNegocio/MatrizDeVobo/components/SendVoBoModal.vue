<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVoBoStore } from '../store/voboStore'
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

const voboStore = useVoBoStore()
const { sendVoBoEmail } = useVoBoActions()
const isSending = ref(false)

// Obtener información del usuario responsable
const responsable = computed(() => {
    if (!props.vobo || !props.vobo.dniAutoriza) return null
    return voboStore.usuarios.find(u => u.dni === props.vobo!.dniAutoriza)
})

const handleConfirm = async () => {
    if (!props.vobo || !responsable.value) return

    isSending.value = true

    const result = await sendVoBoEmail({
        dni: props.vobo.dni,
        dniProc: props.vobo.Proceso.id
    })

    isSending.value = false

    if (result) {
        // Actualizar estado local
        props.vobo.dniEstatus = result.dni
        props.vobo.estatus = result.nombre
        emit('close')
    }
}

const handleClose = () => {
    if (!isSending.value) {
        emit('close')
    }
}
</script>

<template>
    <div v-if="isOpen && vobo && responsable" class="modal modal-open">
        <div class="modal-box max-w-2xl">
            <!-- Header -->
            <h3 class="font-bold text-lg mb-4">
                <span class="material-symbols-outlined text-primary align-middle">send</span>
                Enviar Correo de VoBo
            </h3>

            <!-- Content -->
            <div class="py-4">
                <p class="text-base mb-4">
                    ¿Estás seguro de enviar el correo de solicitud de VoBo?
                </p>

                <!-- Información del VoBo -->
                <div class="space-y-4">
                    <!-- Datos del VoBo -->
                    <div class="card bg-base-200">
                        <div class="card-body p-4">
                            <h4 class="font-semibold mb-2">Información del VoBo</h4>
                            <div class="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span class="text-base-content/70">Id:</span>
                                    <span class="font-semibold ml-2">{{ vobo.dni }}</span>
                                </div>
                                <div>
                                    <span class="text-base-content/70">Versión:</span>
                                    <span class="font-semibold ml-2">{{ vobo.Diagrama.version }}</span>
                                </div>
                                <div class="col-span-2">
                                    <span class="text-base-content/70">Proceso:</span>
                                    <span class="font-semibold ml-2">{{ vobo.Proceso.nombre }}</span>
                                </div>
                                <div class="col-span-2">
                                    <span class="text-base-content/70">Solicitante:</span>
                                    <span class="font-semibold ml-2">{{ vobo.solicitante }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Datos del Responsable -->
                    <div class="card bg-primary/10 border-2 border-primary">
                        <div class="card-body p-4">
                            <h4 class="font-semibold mb-2 flex items-center gap-2">
                                <span class="material-symbols-outlined">person</span>
                                Correo será enviado a:
                            </h4>
                            <div class="text-sm space-y-1">
                                <p>
                                    <strong>Nombre:</strong> 
                                    {{ responsable.nombre }} {{ responsable.apellidos }}
                                </p>
                                <p>
                                    <strong>Correo:</strong> 
                                    <a :href="`mailto:${responsable.correo}`" class="link link-primary">
                                        {{ responsable.correo }}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Archivos adjuntos -->
                    <div v-if="vobo.Archivos.length > 0" class="card bg-base-200">
                        <div class="card-body p-4">
                            <h4 class="font-semibold mb-2">Archivos adjuntos ({{ vobo.Archivos.length }})</h4>
                            <ul class="text-sm space-y-1">
                                <li v-for="(archivo, idx) in vobo.Archivos" :key="idx" class="flex items-center gap-2">
                                    <span class="material-symbols-outlined text-base">attach_file</span>
                                    {{ archivo.nombre }}{{ archivo.ext }}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Alerta informativa -->
                    <div class="alert alert-info">
                        <span class="material-symbols-outlined">info</span>
                        <span class="text-sm">
                            El responsable recibirá un correo con la solicitud de revisión y aprobación.
                        </span>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="modal-action">
                <button
                    type="button"
                    @click="handleClose"
                    class="btn btn-ghost"
                    :disabled="isSending"
                >
                    <span class="material-symbols-outlined">close</span>
                    Cancelar
                </button>
                <button
                    type="button"
                    @click="handleConfirm"
                    class="btn btn-primary"
                    :disabled="isSending"
                >
                    <span class="material-symbols-outlined">send</span>
                    {{ isSending ? 'Enviando...' : 'Enviar Correo' }}
                </button>
            </div>
        </div>
        <div class="modal-backdrop" @click="handleClose"></div>
    </div>
</template>
