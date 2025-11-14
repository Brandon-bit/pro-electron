<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import '@procesos/ProcesosDeNegocio/DiagramasDeProceso/styles/animations.css'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import ValueChainSelector from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/components/ValueChainSelector.vue'
import ValueChainAlert from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/components/ValueChainAlert.vue'
import SpacesPanel from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/components/SpacesPanel.vue'
import ProcessesPanel from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/components/ProcessesPanel.vue'
import SpaceFormModal from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/components/SpaceFormModal.vue'
import ProcessFormModal from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/components/ProcessFormModal.vue'
import CVProcessFormModal from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/components/CVProcessFormModal.vue'
import RenameProcessModal from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/components/RenameProcessModal.vue'
import DiagramAdminModal from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/components/DiagramAdminModal.vue'
import SendVoBoModal from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/components/SendVoBoModal.vue'
import ViewVoBoModal from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/components/ViewVoBoModal.vue'
import {
    getSpacesService,
    getValueChainSpacesService,
    createSpaceService,
    updateSpaceService,
    createProcessService,
    createCVProcessService,
    updateProcessService,
    getAllProcessesService,
    getValueChainsService
} from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/services/businessProcessServices'
import { showNotification } from '@/utils/toastNotifications'
import type {
    ValueChainType,
    SpaceType,
    ValueChainSpaceType,
    ProcessType,
    CVProcessType,
    DiagramType
} from '@procesos/ProcesosDeNegocio/DiagramasDeProceso/types/businessProcessTypes'

// ============================================
// STATE
// ============================================
const currentCV = ref<ValueChainType | null>(null)
const spaces = ref<SpaceType[]>([])
const cvSpaces = ref<ValueChainSpaceType[]>([])
const displayedProcesses = ref<(ProcessType | CVProcessType)[]>([])
const isLoading = ref(false)

// Estados de modales
const spaceModal = ref({ isOpen: false })
const processModal = ref({ isOpen: false, space: null as SpaceType | null })
const cvProcessModal = ref({ isOpen: false, cvSpace: null as ValueChainSpaceType | null })
const renameModal = ref({ isOpen: false, process: null as ProcessType | CVProcessType | null })
const diagramModal = ref({ isOpen: false, process: null as ProcessType | CVProcessType | null })
const sendVoBoModal = ref({
    isOpen: false,
    process: null as ProcessType | CVProcessType | null,
    diagram: null as DiagramType | null
})
const viewVoBoModal = ref({
    isOpen: false,
    process: null as ProcessType | CVProcessType | null,
    diagram: null as DiagramType | null
})

// ============================================
// COMPUTED
// ============================================
const showViewAllButton = computed(() => {
    return spaces.value.length > 0 || cvSpaces.value.length > 0
})

// ============================================
// LIFECYCLE
// ============================================
onMounted(async () => {
    // Cargar y seleccionar automáticamente la primera cadena de valor
    await loadInitialValueChain()
})

const loadInitialValueChain = async () => {
    try {
        const response = await getValueChainsService()
        if (response.success && response.data.length > 0) {
            // Seleccionar automáticamente la primera cadena de valor
            currentCV.value = response.data[0]
            await loadAllData()
        }
    } catch (error) {
        console.error('Error al cargar cadena de valor inicial:', error)
    }
}

// ============================================
// CADENA DE VALOR
// ============================================
const handleValueChainChange = async (cv: ValueChainType) => {
    currentCV.value = cv
    await loadAllData()
}

const loadAllData = async () => {
    if (!currentCV.value) return

    try {
        isLoading.value = true
        await Promise.all([loadSpaces(), loadCVSpaces()])
        await loadAllProcesses()
    } catch (error) {
        console.error('Error al cargar datos:', error)
        showNotification('Error al cargar los datos', 'error')
    } finally {
        isLoading.value = false
    }
}

// ============================================
// ESPACIOS
// ============================================
const loadSpaces = async () => {
    if (!currentCV.value) return

    const response = await getSpacesService(currentCV.value.dni)
    if (response.success) {
        spaces.value = response.data
    }
}

const loadCVSpaces = async () => {
    if (!currentCV.value) return

    const response = await getValueChainSpacesService(currentCV.value.dni)
    if (response.success) {
        cvSpaces.value = response.data
    }
}

const handleAddSpace = () => {
    spaceModal.value.isOpen = true
}

const handleSpaceSubmit = async (nombre: string) => {
    if (!currentCV.value) return

    try {
        const response = await createSpaceService({ nombre }, currentCV.value.dni)
        if (response.success) {
            spaces.value.push(response.data)
            showNotification(response.message, 'success')
            spaceModal.value.isOpen = false
        }
    } catch (error) {
        showNotification('Error al crear el espacio', 'error')
    }
}

const handleEditSpace = async (space: SpaceType) => {
    try {
        const response = await updateSpaceService(space)
        if (response.success) {
            showNotification(response.message, 'success')
        }
    } catch (error) {
        showNotification('Error al actualizar el espacio', 'error')
    }
}

const handleSelectSpace = (space: SpaceType | ValueChainSpaceType) => {
    // Mostrar procesos del espacio seleccionado
    if ('Procesos' in space) {
        displayedProcesses.value = space.Procesos
    } else if ('CVProcesos' in space) {
        displayedProcesses.value = space.CVProcesos
    }
}

// ============================================
// PROCESOS
// ============================================
const loadAllProcesses = async () => {
    const response = await getAllProcessesService()
    if (response.success) {
        displayedProcesses.value = response.data
    }
}

const handleAddProcess = (space: SpaceType) => {
    processModal.value = { isOpen: true, space }
}

const handleProcessSubmit = async (data: { nombre: string; asis: boolean }) => {
    if (!processModal.value.space) return

    try {
        const response = await createProcessService({
            nombre: data.nombre,
            asis: data.asis,
            dniEspacio: processModal.value.space.id
        })

        if (response.success) {
            // Actualizar la lista local
            processModal.value.space.Procesos.push(response.data)
            await loadAllProcesses()
            showNotification(response.message, 'success')
            processModal.value.isOpen = false
        }
    } catch (error) {
        showNotification('Error al crear el proceso', 'error')
    }
}

const handleAddCVProcess = (cvSpace: ValueChainSpaceType) => {
    cvProcessModal.value = { isOpen: true, cvSpace }
}

const handleCVProcessSubmit = async (data: {
    nombre: string
    asis: boolean
    dniLvl2: number
    selectedLvl3Ids: number[]
}) => {
    if (!cvProcessModal.value.cvSpace || !currentCV.value) return

    try {
        const response = await createCVProcessService({
            nombre: data.nombre,
            asis: data.asis,
            dniCV: currentCV.value.dni,
            dniLvl1: cvProcessModal.value.cvSpace.dni,
            dniLvl2: data.dniLvl2,
            selectedLvl3Ids: data.selectedLvl3Ids
        })

        if (response.success) {
            // Actualizar la lista local
            cvProcessModal.value.cvSpace.CVProcesos.push(response.data)
            await loadAllProcesses()
            showNotification(response.message, 'success')
            cvProcessModal.value.isOpen = false
        }
    } catch (error) {
        showNotification('Error al crear el proceso CV', 'error')
    }
}

const handleRenameProcess = (process: ProcessType | CVProcessType) => {
    renameModal.value = { isOpen: true, process }
}

const handleRenameSubmit = async (nombre: string) => {
    if (!renameModal.value.process) return

    try {
        const updatedProcess = { ...renameModal.value.process, nombre }
        const response = await updateProcessService(updatedProcess)

        if (response.success) {
            renameModal.value.process.nombre = nombre
            showNotification(response.message, 'success')
            renameModal.value.isOpen = false
        }
    } catch (error) {
        showNotification('Error al renombrar el proceso', 'error')
    }
}

const handleAdminDiagrams = (process: ProcessType | CVProcessType) => {
    diagramModal.value = { isOpen: true, process }
}

const handleVoBoAction = (diagram: DiagramType, action: 'send' | 'view') => {
    if (action === 'send') {
        sendVoBoModal.value = {
            isOpen: true,
            process: diagramModal.value.process,
            diagram: diagram
        }
    } else {
        viewVoBoModal.value = {
            isOpen: true,
            process: diagramModal.value.process,
            diagram: diagram
        }
    }
}

const handleVoBoSent = () => {
    // Cerrar modal de enviar y mostrar éxito
    sendVoBoModal.value.isOpen = false
    // Opcional: recargar diagramas si es necesario
}

const handleCloseSendVoBo = () => {
    sendVoBoModal.value = {
        isOpen: false,
        process: null,
        diagram: null
    }
}

const handleCloseViewVoBo = () => {
    viewVoBoModal.value = {
        isOpen: false,
        process: null,
        diagram: null
    }
}

const handleViewDetails = (process: CVProcessType) => {
    // Mostrar detalles del proceso CV
    showNotification(`Ver detalles de "${process.nombre}" - Disponible en Fase 3`, 'info')
}

const handleEditCVProcess = (process: CVProcessType) => {
    showNotification(`Editar proceso CV "${process.nombre}" - Disponible en Fase 3`, 'info')
}

const handleDeleteProcess = (process: ProcessType | CVProcessType) => {
    showNotification(`Eliminar proceso "${process.nombre}" - Función deshabilitada`, 'warning')
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <BaseTitle
                title="Administración de Procesos de Negocios"
                subtitle="Gestión de espacios y procesos"
            />
            <ValueChainSelector @change="handleValueChainChange" />
        </div>

        <!-- Loading state -->
        <div v-if="isLoading" class="flex justify-center items-center py-20">
            <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>

        <!-- Content con Cadena de Valor seleccionada -->
        <div v-else-if="currentCV" class="space-y-6">
            <!-- Info de CV actual -->
            <div class="card bg-primary/5 border border-primary/20">
                <div class="card-body p-4">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-primary text-2xl">
                            account_tree
                        </span>
                        <div>
                            <p class="text-sm text-base-content/70">Cadena de valor:</p>
                            <h5 class="text-lg font-bold text-primary">{{ currentCV.name }}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Layout de 2 columnas -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Columna Izquierda: ESPACIOS -->
                <div class="card bg-base-100 shadow-lg border border-base-300">
                    <div class="card-body">
                        <SpacesPanel
                            :spaces="spaces"
                            :cv-spaces="cvSpaces"
                            @add-space="handleAddSpace"
                            @edit-space="handleEditSpace"
                            @select-space="handleSelectSpace"
                            @add-process="handleAddProcess"
                            @add-cv-process="handleAddCVProcess"
                        />
                    </div>
                </div>

                <!-- Columna Derecha: PROCESOS -->
                <div class="card bg-base-100 shadow-lg border border-base-300">
                    <div class="card-body">
                        <ProcessesPanel
                            :processes="displayedProcesses"
                            :show-view-all="showViewAllButton"
                            @view-all="loadAllProcesses"
                            @admin-diagrams="handleAdminDiagrams"
                            @rename="handleRenameProcess"
                            @delete="handleDeleteProcess"
                            @view-details="handleViewDetails"
                            @edit-cv-process="handleEditCVProcess"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- Sin cadena de valor seleccionada -->
        <div v-else class="grid grid-cols-12 gap-6">
            <ValueChainAlert />
        </div>

        <!-- MODALES -->
        <SpaceFormModal
            :is-open="spaceModal.isOpen"
            :dni-c-v="currentCV?.dni || 0"
            @close="spaceModal.isOpen = false"
            @submit="handleSpaceSubmit"
        />

        <ProcessFormModal
            :is-open="processModal.isOpen"
            :space="processModal.space"
            @close="processModal.isOpen = false"
            @submit="handleProcessSubmit"
        />

        <CVProcessFormModal
            :is-open="cvProcessModal.isOpen"
            :cv-space="cvProcessModal.cvSpace"
            :dni-c-v="currentCV?.dni || 0"
            @close="cvProcessModal.isOpen = false"
            @submit="handleCVProcessSubmit"
        />

        <RenameProcessModal
            :is-open="renameModal.isOpen"
            :process="renameModal.process"
            @close="renameModal.isOpen = false"
            @submit="handleRenameSubmit"
        />

        <DiagramAdminModal
            :is-open="diagramModal.isOpen"
            :process="diagramModal.process"
            @close="diagramModal.isOpen = false"
            @vobo-action="handleVoBoAction"
        />

        <SendVoBoModal
            :is-open="sendVoBoModal.isOpen"
            :process="sendVoBoModal.process"
            :diagram="sendVoBoModal.diagram"
            @close="handleCloseSendVoBo"
            @sent="handleVoBoSent"
        />

        <ViewVoBoModal
            :is-open="viewVoBoModal.isOpen"
            :process="viewVoBoModal.process"
            :diagram="viewVoBoModal.diagram"
            @close="handleCloseViewVoBo"
        />
    </div>
</template>
