<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type {
    ProcessType,
    CVProcessType,
    DiagramType,
    VoBoType
} from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/types/businessProcessTypes'
import { getVoBoDetailsService } from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/services/businessProcessServices'
import { showNotification } from '@/utils/toastNotifications'

const props = defineProps<{
    isOpen: boolean
    process: ProcessType | CVProcessType | null
    diagram: DiagramType | null
}>()

const emit = defineEmits<{
    close: []
}>()

const voboList = ref<VoBoType[]>([])
const isLoading = ref(false)

// Estadísticas
const stats = computed(() => {
    const total = voboList.value.length
    const aprobados = voboList.value.filter((v) => v.estatus === 'Aprobado').length
    const rechazados = voboList.value.filter((v) => v.estatus === 'Rechazado').length
    const enProceso = voboList.value.filter((v) => v.estatus === 'EnProceso').length
    const ajustes = voboList.value.filter((v) => v.estatus === 'Ajustes').length

    return { total, aprobados, rechazados, enProceso, ajustes }
})

// Cargar detalles cuando se abre el modal
watch(
    () => props.isOpen,
    async (isOpen) => {
        if (isOpen && props.process && props.diagram) {
            await loadVoBoDetails()
        }
    }
)

const loadVoBoDetails = async () => {
    if (!props.process || !props.diagram) return

    try {
        isLoading.value = true
        const response = await getVoBoDetailsService(props.process.id, props.diagram.dni)
        if (response.success) {
            voboList.value = response.data
        } else {
            showNotification(response.message, 'error')
        }
    } catch (error) {
        showNotification('Error al cargar detalles de VoBo', 'error')
    } finally {
        isLoading.value = false
    }
}

const getStatusBadgeClass = (status: string) => {
    const classes = {
        Aprobado: 'badge-success',
        Rechazado: 'badge-error',
        EnProceso: 'badge-warning',
        Ajustes: 'badge-info'
    }
    return classes[status as keyof typeof classes] || 'badge-ghost'
}

const getStatusIcon = (status: string) => {
    const icons = {
        Aprobado: 'check_circle',
        Rechazado: 'cancel',
        EnProceso: 'pending',
        Ajustes: 'edit_note'
    }
    return icons[status as keyof typeof icons] || 'help'
}

const getStatusText = (status: string) => {
    const texts = {
        Aprobado: 'Aprobado',
        Rechazado: 'Rechazado',
        EnProceso: 'En Proceso',
        Ajustes: 'Con Ajustes'
    }
    return texts[status as keyof typeof texts] || status
}

const handleClose = () => {
    emit('close')
}
</script>

<template>
    <div v-if="isOpen" class="modal modal-open">
        <!-- Backdrop para cerrar al hacer click fuera -->
        <div class="modal-backdrop" @click="handleClose"></div>
        
        <div class="modal-box max-w-4xl relative" style="z-index: 10000 !important;">
            <!-- Header -->
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h3 class="font-bold text-lg flex items-center gap-2">
                        <span class="material-symbols-outlined text-info">visibility</span>
                        Estado de Visto Bueno (VoBo)
                    </h3>
                    <p class="text-sm text-base-content/70 mt-1">
                        {{ process?.nombre }} - Versión {{ diagram?.version }}
                    </p>
                </div>
                <button @click.stop="handleClose" class="btn btn-sm btn-circle btn-ghost">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>

            <div class="divider my-2"></div>

            <!-- Estadísticas -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div class="stat bg-base-200 rounded-lg p-4">
                    <div class="stat-title text-xs">Total</div>
                    <div class="stat-value text-2xl">{{ stats.total }}</div>
                </div>
                <div class="stat bg-success/10 rounded-lg p-4">
                    <div class="stat-title text-xs text-success">Aprobados</div>
                    <div class="stat-value text-2xl text-success">{{ stats.aprobados }}</div>
                </div>
                <div class="stat bg-error/10 rounded-lg p-4">
                    <div class="stat-title text-xs text-error">Rechazados</div>
                    <div class="stat-value text-2xl text-error">{{ stats.rechazados }}</div>
                </div>
                <div class="stat bg-warning/10 rounded-lg p-4">
                    <div class="stat-title text-xs text-warning">Pendientes</div>
                    <div class="stat-value text-2xl text-warning">{{ stats.enProceso }}</div>
                </div>
            </div>

            <!-- Lista de VoBo -->
            <div class="mb-4">
                <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <span class="material-symbols-outlined text-sm">list</span>
                    Revisores ({{ voboList.length }})
                </h4>

                <div v-if="isLoading" class="flex justify-center py-12">
                    <span class="loading loading-spinner loading-lg"></span>
                </div>

                <div v-else-if="voboList.length > 0" class="space-y-3">
                    <div
                        v-for="vobo in voboList"
                        :key="vobo.id"
                        class="card bg-base-200 border border-base-300"
                    >
                        <div class="card-body p-4">
                            <div class="flex items-start justify-between gap-4">
                                <!-- Info del revisor -->
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <span class="material-symbols-outlined text-primary">
                                            person
                                        </span>
                                        <span class="font-medium">{{ vobo.correo }}</span>
                                    </div>

                                    <!-- Estado -->
                                    <div class="flex items-center gap-2 mb-2">
                                        <span
                                            :class="[
                                                'badge gap-1',
                                                getStatusBadgeClass(vobo.estatus)
                                            ]"
                                        >
                                            <span class="material-symbols-outlined text-xs">
                                                {{ getStatusIcon(vobo.estatus) }}
                                            </span>
                                            {{ getStatusText(vobo.estatus) }}
                                        </span>
                                        <span
                                            v-if="vobo.fechaRevision"
                                            class="text-xs text-base-content/60"
                                        >
                                            {{ new Date(vobo.fechaRevision).toLocaleDateString() }}
                                        </span>
                                    </div>

                                    <!-- Comentarios -->
                                    <div v-if="vobo.comentarios" class="mt-3">
                                        <p class="text-sm font-medium text-base-content/70 mb-1">
                                            Comentarios:
                                        </p>
                                        <div class="bg-base-100 p-3 rounded border border-base-300">
                                            <p class="text-sm">{{ vobo.comentarios }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center py-12 text-base-content/50">
                    <span class="material-symbols-outlined text-4xl mb-2">inbox</span>
                    <p>No hay revisiones registradas</p>
                </div>
            </div>

            <!-- Footer -->
            <div class="modal-action">
                <button @click.stop="handleClose" class="btn btn-ghost">Cerrar</button>
            </div>
        </div>
    </div>
</template>
