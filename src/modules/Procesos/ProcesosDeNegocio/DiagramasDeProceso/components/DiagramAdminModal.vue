<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import type {
    ProcessType,
    CVProcessType,
    DiagramType
} from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/types/businessProcessTypes'
import DiagramVersionsTable from './DiagramVersionsTable.vue'
import AddDiagramVersionModal from './AddDiagramVersionModal.vue'
import {
    getDiagramsByProcessService,
    createDiagramVersionService,
    markDiagramAsFinalService,
    deleteDiagramVersionService
} from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/services/businessProcessServices'
import { showNotification } from '@/utils/toastNotifications'

const router = useRouter()

const props = defineProps<{
    isOpen: boolean
    process: ProcessType | CVProcessType | null
}>()

const emit = defineEmits<{
    close: []
    voboAction: [diagram: DiagramType, action: 'send' | 'view']
}>()

const diagrams = ref<DiagramType[]>([])
const isLoading = ref(false)
const isCreating = ref(false)
const showAddVersionModal = ref(false)

const processName = computed(() => props.process?.nombre || '')

// Cargar diagramas cuando se abre el modal
watch(
    () => props.isOpen,
    async (isOpen) => {
        if (isOpen && props.process) {
            await loadDiagrams()
        }
    }
)

const loadDiagrams = async () => {
    if (!props.process) return

    try {
        isLoading.value = true
        const response = await getDiagramsByProcessService(props.process.id)
        if (response.success) {
            diagrams.value = response.data
        }
    } catch (error) {
        showNotification('Error al cargar las versiones', 'error')
    } finally {
        isLoading.value = false
    }
}

const handleAddVersion = () => {
    showAddVersionModal.value = true
}

const handleAddVersionSubmit = async (file: File | null) => {
    if (!props.process || isCreating.value) return

    try {
        isCreating.value = true
        showAddVersionModal.value = false
        
        const response = await createDiagramVersionService(props.process.id)
        if (response.success) {
            if (file) {
                showNotification(`${response.message} (Archivo: ${file.name})`, 'success')
            } else {
                showNotification(response.message, 'success')
            }
            await loadDiagrams()
        } else {
            showNotification(response.message, 'error')
        }
    } catch (error) {
        showNotification('Error al crear nueva versión', 'error')
    } finally {
        isCreating.value = false
    }
}

const handleMarkFinal = async (diagramId: number) => {
    if (!props.process) return

    try {
        const response = await markDiagramAsFinalService(props.process.id, diagramId)
        if (response.success) {
            showNotification(response.message, 'success')
            await loadDiagrams()
        } else {
            showNotification(response.message, 'error')
        }
    } catch (error) {
        showNotification('Error al marcar como final', 'error')
    }
}

const handleDelete = async (diagramId: number) => {
    if (!props.process) return

    // Confirmación
    if (!confirm('¿Está seguro de eliminar esta versión?')) return

    try {
        const response = await deleteDiagramVersionService(props.process.id, diagramId)
        if (response.success) {
            showNotification(response.message, 'success')
            await loadDiagrams()
        } else {
            showNotification(response.message, 'error')
        }
    } catch (error) {
        showNotification('Error al eliminar versión', 'error')
    }
}

const handleSendVoBo = (diagramId: number) => {
    const diagram = diagrams.value.find((d) => d.dni === diagramId)
    if (diagram) {
        emit('voboAction', diagram, 'send')
    }
}

const handleViewVoBo = (diagramId: number) => {
    const diagram = diagrams.value.find((d) => d.dni === diagramId)
    if (diagram) {
        emit('voboAction', diagram, 'view')
    }
}

const handleExportWord = (diagramId: number) => {
    const diagram = diagrams.value.find((d) => d.dni === diagramId)
    if (diagram) {
        // Simulación de descarga
        showNotification(
            `Exportando versión ${diagram.version} a Word... (Simulación - Backend requerido)`,
            'info'
        )
        
        // En producción, sería algo como:
        // const response = await exportDiagramToWordService(props.process.id, diagramId)
        // window.open(response.data.downloadUrl, '_blank')
    }
}

const handleExportPdf = (diagramId: number) => {
    const diagram = diagrams.value.find((d) => d.dni === diagramId)
    if (diagram) {
        // Simulación de descarga
        showNotification(
            `Exportando versión ${diagram.version} a PDF... (Simulación - Backend requerido)`,
            'info'
        )
        
        // En producción, sería algo como:
        // const response = await exportDiagramToPdfService(props.process.id, diagramId)
        // window.open(response.data.downloadUrl, '_blank')
    }
}

const handleEditDiagram = (diagramId: number) => {
    // Navegar a la vista de edición del diagrama
    // La ruta será /procesos/procesos-de-negocio/diagramas-de-proceso/editor/:processId/:diagramId
    if (props.process) {
        router.push({
            name: 'EditarDiagrama',
            params: {
                processId: props.process.id,
                diagramId: diagramId
            }
        })
    }
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
                        <span class="material-symbols-outlined text-primary">folder_open</span>
                        Administrar Diagramas
                    </h3>
                    <p class="text-sm text-base-content/70 mt-1">{{ processName }}</p>
                </div>
                <button @click.stop="handleClose" class="btn btn-sm btn-circle btn-ghost">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>

            <div class="divider my-2"></div>

            <!-- Botón agregar versión -->
            <div class="flex justify-between items-center mb-4">
                <p class="text-sm text-base-content/70">
                    Versiones disponibles: <strong>{{ diagrams.length }}</strong>
                </p>
                <button
                    @click.stop="handleAddVersion"
                    :disabled="isCreating"
                    class="btn btn-primary btn-sm gap-2"
                >
                    <span class="material-symbols-outlined">add</span>
                    <span v-if="!isCreating">Agregar Versión</span>
                    <span v-else>Creando...</span>
                </button>
            </div>

            <!-- Tabla de versiones -->
            <DiagramVersionsTable
                :diagrams="diagrams"
                :is-loading="isLoading"
                @edit="handleEditDiagram"
                @mark-final="handleMarkFinal"
                @delete="handleDelete"
                @export-word="handleExportWord"
                @export-pdf="handleExportPdf"
                @send-vo-bo="handleSendVoBo"
                @view-vo-bo="handleViewVoBo"
            />

            <!-- Footer -->
            <div class="modal-action">
                <button @click.stop="handleClose" class="btn btn-ghost">Cerrar</button>
            </div>
        </div>
    </div>

    <!-- Modal Agregar Versión -->
    <AddDiagramVersionModal
        :is-open="showAddVersionModal"
        :process="process"
        @close="showAddVersionModal = false"
        @submit="handleAddVersionSubmit"
    />
</template>
