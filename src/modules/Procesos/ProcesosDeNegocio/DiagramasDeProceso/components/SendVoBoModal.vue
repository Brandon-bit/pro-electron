<script setup lang="ts">
import { ref, watch } from 'vue'
import type {
    ProcessType,
    CVProcessType,
    DiagramType,
    VoBoUserType
} from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/types/businessProcessTypes'
import {
    getVoBoUsersService,
    sendToVoBoService
} from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/services/businessProcessServices'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    isOpen: boolean
    process: ProcessType | CVProcessType | null
    diagram: DiagramType | null
}>()

const emit = defineEmits<{
    close: []
    sent: []
}>()

const internalUsers = ref<VoBoUserType[]>([])
const externalEmails = ref('')
const isLoading = ref(false)
const isSending = ref(false)

// Cargar usuarios cuando se abre el modal
watch(
    () => props.isOpen,
    async (isOpen) => {
        if (isOpen) {
            await loadInternalUsers()
            externalEmails.value = ''
        }
    }
)

const loadInternalUsers = async () => {
    try {
        isLoading.value = true
        const response = await getVoBoUsersService()
        if (response.success) {
            internalUsers.value = response.data
        }
    } catch (error) {
        showNotification('Error al cargar usuarios', 'error')
    } finally {
        isLoading.value = false
    }
}

const toggleUser = (user: VoBoUserType) => {
    user.selected = !user.selected
}

const handleSend = async () => {
    if (!props.process || !props.diagram) return

    // Obtener correos seleccionados
    const selectedInternalEmails = internalUsers.value
        .filter((u) => u.selected)
        .map((u) => u.correo)

    // Procesar correos externos
    const externalEmailsList = externalEmails.value
        .split(',')
        .map((e) => e.trim())
        .filter((e) => e.length > 0)

    const allEmails = [...selectedInternalEmails, ...externalEmailsList]

    // Validar que haya al menos un correo
    if (allEmails.length === 0) {
        showNotification('Debe seleccionar al menos un usuario o agregar un correo', 'warning')
        return
    }

    // Validar correos externos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    for (const email of externalEmailsList) {
        if (!emailRegex.test(email)) {
            showNotification(`Correo inválido: ${email}`, 'error')
            return
        }
    }

    try {
        isSending.value = true
        const response = await sendToVoBoService(props.process.id, allEmails)
        if (response.success) {
            showNotification(response.message, 'success')
            emit('sent')
            handleClose()
        } else {
            showNotification(response.message, 'error')
        }
    } catch (error) {
        showNotification('Error al enviar a VoBo', 'error')
    } finally {
        isSending.value = false
    }
}

const handleClose = () => {
    // Limpiar selecciones
    internalUsers.value.forEach((u) => (u.selected = false))
    externalEmails.value = ''
    emit('close')
}
</script>

<template>
    <div v-if="isOpen" class="modal modal-open">
        <!-- Backdrop para cerrar al hacer click fuera -->
        <div class="modal-backdrop" @click="handleClose"></div>
        
        <div class="modal-box max-w-3xl relative" style="z-index: 10000 !important;">
            <!-- Header -->
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h3 class="font-bold text-lg flex items-center gap-2">
                        <span class="material-symbols-outlined text-info">send</span>
                        Enviar a Visto Bueno (VoBo)
                    </h3>
                    <p class="text-sm text-base-content/70 mt-1">
                        {{ process?.nombre }} - Versión {{ diagram?.version }}
                    </p>
                </div>
                <button @click="handleClose" class="btn btn-sm btn-circle btn-ghost">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>

            <div class="divider my-2"></div>

            <!-- Usuarios Internos -->
            <div class="mb-6">
                <label class="label">
                    <span class="label-text font-semibold flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm">group</span>
                        Usuarios Internos
                    </span>
                </label>

                <div v-if="isLoading" class="flex justify-center py-8">
                    <span class="loading loading-spinner loading-md"></span>
                </div>

                <div
                    v-else-if="internalUsers.length > 0"
                    class="bg-base-200 rounded-lg p-4 max-h-64 overflow-y-auto"
                >
                    <div
                        v-for="user in internalUsers"
                        :key="user.id"
                        @click="toggleUser(user)"
                        class="form-control cursor-pointer hover:bg-base-300 p-2 rounded transition-colors"
                    >
                        <label class="label cursor-pointer justify-start gap-3">
                            <input
                                type="checkbox"
                                :checked="user.selected"
                                class="checkbox checkbox-primary"
                                @click.stop="toggleUser(user)"
                            />
                            <div class="flex flex-col">
                                <span class="font-medium">
                                    {{ user.nombre }} {{ user.apellidos }}
                                </span>
                                <span class="text-xs text-base-content/60">
                                    {{ user.correo }}
                                </span>
                            </div>
                        </label>
                    </div>
                </div>

                <div v-else class="text-center py-8 text-base-content/50">
                    No hay usuarios disponibles
                </div>
            </div>

            <!-- Correos Externos -->
            <div class="mb-6">
                <label class="label">
                    <span class="label-text font-semibold flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm">mail</span>
                        Correos Externos (Opcional)
                    </span>
                </label>
                <textarea
                    v-model="externalEmails"
                    class="textarea textarea-bordered w-full"
                    rows="3"
                    placeholder="correo1@ejemplo.com, correo2@ejemplo.com"
                ></textarea>
                <label class="label">
                    <span class="label-text-alt text-base-content/60">
                        Separe múltiples correos con comas
                    </span>
                </label>
            </div>

            <!-- Resumen -->
            <div class="alert alert-info mb-4">
                <span class="material-symbols-outlined">info</span>
                <div>
                    <p class="font-medium">
                        Total de destinatarios:
                        {{
                            internalUsers.filter((u) => u.selected).length +
                            externalEmails.split(',').filter((e) => e.trim()).length
                        }}
                    </p>
                    <p class="text-xs">
                        Se enviará una notificación a cada destinatario para revisar el
                        diagrama.
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <div class="modal-action">
                <button @click.stop="handleClose" class="btn btn-ghost" :disabled="isSending">
                    Cancelar
                </button>
                <button
                    @click.stop="handleSend"
                    class="btn btn-info gap-2"
                    :disabled="isSending || isLoading"
                >
                    <span class="material-symbols-outlined">send</span>
                    <span v-if="!isSending">Enviar a VoBo</span>
                    <span v-else>Enviando...</span>
                </button>
            </div>
        </div>
    </div>
</template>
