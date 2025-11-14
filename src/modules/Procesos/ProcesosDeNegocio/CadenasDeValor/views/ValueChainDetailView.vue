<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Edit2, Layers3 } from 'lucide-vue-next'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import ValueChainSection from '@procesos/ProcesosDeNegocio/CadenasDeValor/components/ValueChainSection.vue'
import ValueChainTitleModal from '@procesos/ProcesosDeNegocio/CadenasDeValor/components/ValueChainTitleModal.vue'
import AreaFormModal from '@procesos/ProcesosDeNegocio/CadenasDeValor/components/AreaFormModal.vue'
import ProcessLevel1FormModal from '@procesos/ProcesosDeNegocio/CadenasDeValor/components/ProcessLevel1FormModal.vue'
import ProcessLevel2FormModal from '@procesos/ProcesosDeNegocio/CadenasDeValor/components/ProcessLevel2FormModal.vue'
import ProcessLevel3FormModal from '@procesos/ProcesosDeNegocio/CadenasDeValor/components/ProcessLevel3FormModal.vue'
import DeleteConfirmationModal from '@procesos/ProcesosDeNegocio/CadenasDeValor/components/DeleteConfirmationModal.vue'
import { getValueChainByIdService, updateValueChainService } from '@procesos/ProcesosDeNegocio/CadenasDeValor/services/valueChainServices'
import { addAreaService, updateAreaService, deleteAreaService } from '@procesos/ProcesosDeNegocio/CadenasDeValor/services/areaServices'
import {
    addLevel1ProcessService,
    updateLevel1ProcessService,
    deleteLevel1ProcessService,
    addLevel2ProcessService,
    updateLevel2ProcessService,
    deleteLevel2ProcessService,
    addLevel3ProcessService,
    updateLevel3ProcessService,
    deleteLevel3ProcessService
} from '@procesos/ProcesosDeNegocio/CadenasDeValor/services/processServices'
import { mapValueChain } from '@procesos/ProcesosDeNegocio/CadenasDeValor/composables/mappingValueChainData'
import { useValueChainValidation } from '@procesos/ProcesosDeNegocio/CadenasDeValor/composables/useValueChainValidation'
import { showNotification } from '@/utils/toastNotifications'
import type { ValueChainType, AreaType, Level1ProcessType, Level2ProcessType, Level3ProcessType } from '@procesos/ProcesosDeNegocio/CadenasDeValor/types/valueChainType'

const route = useRoute()
const router = useRouter()
const { canDeleteArea, canDeleteLevel1, canDeleteLevel2, canDeleteLevel3 } = useValueChainValidation()

const valueChainId = ref<number>(Number(route.params.id))
const valueChain = ref<ValueChainType | null>(null)
const isLoading = ref(true)

const valueChainLabels: [string, string, string] = [
    'Generación de Oferta de Valor',
    'Habilitación de la Oferta',
    'Experiencia y Lealtad del Cliente'
]

// ============================================
// ESTADOS DE MODALES
// ============================================
const titleModal = ref({ isOpen: false })
const areaModal = ref({ isOpen: false, mode: 'create' as 'create' | 'edit', section: 'planning' as 'planning' | 'value' | 'support', space: 1 as 1 | 2 | 3, area: null as AreaType | null })
const level1Modal = ref({ isOpen: false, mode: 'create' as 'create' | 'edit', section: 'planning' as 'planning' | 'value' | 'support', area: null as AreaType | null, process: null as Level1ProcessType | null })
const level2Modal = ref({ isOpen: false, mode: 'create' as 'create' | 'edit', section: 'planning' as 'planning' | 'value' | 'support', area: null as AreaType | null, level1: null as Level1ProcessType | null, process: null as Level2ProcessType | null })
const level3Modal = ref({ isOpen: false, mode: 'create' as 'create' | 'edit', section: 'planning' as 'planning' | 'value' | 'support', area: null as AreaType | null, level1: null as Level1ProcessType | null, level2: null as Level2ProcessType | null, process: null as Level3ProcessType | null })
const deleteModal = ref({ isOpen: false, title: '', message: '', hasRelatedItems: false, relatedItemsMessage: '', onConfirm: () => {} })

// ============================================
// CARGA INICIAL
// ============================================
onMounted(async () => {
    await loadValueChain()
})

const loadValueChain = async () => {
    try {
        isLoading.value = true
        const response = await getValueChainByIdService(valueChainId.value)
        
        if (response.success) {
            valueChain.value = mapValueChain(response.data)
        } else {
            showNotification('Cadena de valor no encontrada', 'error')
            router.push('/procesos/procesos-de-negocio/cadenas-de-valor')
        }
    } catch (error) {
        console.error(error)
        showNotification('Error al cargar la cadena de valor', 'error')
    } finally {
        isLoading.value = false
    }
}

const goBack = () => {
    router.push('/procesos/procesos-de-negocio/cadenas-de-valor')
}

// ============================================
// EDITAR TÍTULO
// ============================================
const editTitle = () => {
    titleModal.value.isOpen = true
}

const handleTitleSubmit = async (data: { title: string }) => {
    try {
        const response = await updateValueChainService(valueChainId.value, { Titulo: data.title })
        if (response.success && valueChain.value) {
            valueChain.value.title = data.title
            showNotification(response.message, 'success')
        }
    } catch (error) {
        showNotification('Error al actualizar el título', 'error')
    }
    titleModal.value.isOpen = false
}

// ============================================
// GESTIÓN DE ÁREAS
// ============================================
const handleAddArea = (section: 'planning' | 'value' | 'support', space: 1 | 2 | 3) => {
    areaModal.value = { isOpen: true, mode: 'create', section, space, area: null }
}

const handleEditArea = (section: 'planning' | 'value' | 'support', area: AreaType) => {
    areaModal.value = { isOpen: true, mode: 'edit', section, space: area.space, area }
}

const handleAreaSubmit = async (data: { title: string }) => {
    try {
        if (areaModal.value.mode === 'create') {
            const sectionType = areaModal.value.section === 'planning' ? 'Planeación' : areaModal.value.section === 'value' ? 'Cadena de valor' : 'Soporte'
            const response = await addAreaService(valueChainId.value, sectionType, areaModal.value.space, data.title)
            
            if (response.success && valueChain.value) {
                const newArea: AreaType = {
                    id: response.data.dni,
                    title: response.data.titulo,
                    type: sectionType as any,
                    space: areaModal.value.space,
                    level1Processes: [],
                    hasConnections: false
                }
                
                const section = valueChain.value[areaModal.value.section]
                const spaceKey = `space${areaModal.value.space}` as 'space1' | 'space2' | 'space3'
                section[spaceKey].areas.push(newArea)
                
                showNotification(response.message, 'success')
            }
        } else if (areaModal.value.area) {
            const response = await updateAreaService(areaModal.value.area.id!, data.title)
            if (response.success) {
                areaModal.value.area.title = data.title
                showNotification(response.message, 'success')
            }
        }
    } catch (error) {
        showNotification('Error al guardar el área', 'error')
    }
    areaModal.value.isOpen = false
}

const handleDeleteArea = (section: 'planning' | 'value' | 'support', area: AreaType) => {
    const validation = canDeleteArea(area)
    
    deleteModal.value = {
        isOpen: true,
        title: validation.canDelete ? '¿Eliminar área?' : 'No se puede eliminar',
        message: validation.canDelete ? `¿Estás seguro de eliminar el área "${area.title}"?` : validation.message,
        hasRelatedItems: !validation.canDelete,
        relatedItemsMessage: validation.message,
        onConfirm: async () => {
            try {
                const response = await deleteAreaService(area.id!)
                if (response.success && valueChain.value) {
                    const sectionObj = valueChain.value[section]
                    const spaceKey = `space${area.space}` as 'space1' | 'space2' | 'space3'
                    const index = sectionObj[spaceKey].areas.findIndex(a => a.id === area.id)
                    if (index !== -1) {
                        sectionObj[spaceKey].areas.splice(index, 1)
                    }
                    showNotification(response.message, 'success')
                }
            } catch (error) {
                showNotification('Error al eliminar el área', 'error')
            }
            deleteModal.value.isOpen = false
        }
    }
}

// ============================================
// GESTIÓN DE PROCESOS NIVEL 1
// ============================================
const handleAddLevel1 = (section: 'planning' | 'value' | 'support', area: AreaType) => {
    level1Modal.value = { isOpen: true, mode: 'create', section, area, process: null }
}

const handleEditLevel1 = (section: 'planning' | 'value' | 'support', area: AreaType, process: Level1ProcessType) => {
    level1Modal.value = { isOpen: true, mode: 'edit', section, area, process }
}

const handleLevel1Submit = async (data: { title: string }) => {
    try {
        if (level1Modal.value.mode === 'create' && level1Modal.value.area) {
            const response = await addLevel1ProcessService(level1Modal.value.area.id!, data.title)
            if (response.success) {
                const newProcess: Level1ProcessType = {
                    id: response.data.dni,
                    title: response.data.titulo,
                    areaId: level1Modal.value.area.id!,
                    hasRelatedProcesses: false,
                    level2Processes: []
                }
                level1Modal.value.area.level1Processes.push(newProcess)
                showNotification(response.message, 'success')
            }
        } else if (level1Modal.value.process && level1Modal.value.area) {
            const response = await updateLevel1ProcessService(level1Modal.value.area.id!, level1Modal.value.process.id!, data.title)
            if (response.success) {
                level1Modal.value.process.title = data.title
                showNotification(response.message, 'success')
            }
        }
    } catch (error) {
        showNotification('Error al guardar el proceso', 'error')
    }
    level1Modal.value.isOpen = false
}

const handleDeleteLevel1 = (section: 'planning' | 'value' | 'support', area: AreaType, process: Level1ProcessType) => {
    const validation = canDeleteLevel1(process)
    
    deleteModal.value = {
        isOpen: true,
        title: validation.canDelete ? '¿Eliminar proceso?' : 'No se puede eliminar',
        message: validation.canDelete ? `¿Estás seguro de eliminar "${process.title}"?` : validation.message,
        hasRelatedItems: !validation.canDelete,
        relatedItemsMessage: validation.message,
        onConfirm: async () => {
            try {
                const response = await deleteLevel1ProcessService(area.id!, process.id!)
                if (response.success) {
                    const index = area.level1Processes.findIndex(p => p.id === process.id)
                    if (index !== -1) {
                        area.level1Processes.splice(index, 1)
                    }
                    showNotification(response.message, 'success')
                }
            } catch (error) {
                showNotification('Error al eliminar el proceso', 'error')
            }
            deleteModal.value.isOpen = false
        }
    }
}

// ============================================
// GESTIÓN DE PROCESOS NIVEL 2
// ============================================
const handleAddLevel2 = (section: 'planning' | 'value' | 'support', area: AreaType, level1: Level1ProcessType) => {
    level2Modal.value = { isOpen: true, mode: 'create', section, area, level1, process: null }
}

const handleEditLevel2 = (section: 'planning' | 'value' | 'support', area: AreaType, level1: Level1ProcessType, process: Level2ProcessType) => {
    level2Modal.value = { isOpen: true, mode: 'edit', section, area, level1, process }
}

const handleLevel2Submit = async (data: { title: string }) => {
    try {
        if (level2Modal.value.mode === 'create' && level2Modal.value.area && level2Modal.value.level1) {
            const response = await addLevel2ProcessService(level2Modal.value.area.id!, level2Modal.value.level1.id!, data.title)
            if (response.success) {
                const newProcess: Level2ProcessType = {
                    id: response.data.dni,
                    title: response.data.titulo,
                    level1Id: level2Modal.value.level1.id!,
                    hasRelatedProcesses: false,
                    showArrow: false,
                    level3Processes: []
                }
                level2Modal.value.level1.level2Processes.push(newProcess)
                showNotification(response.message, 'success')
            }
        } else if (level2Modal.value.process && level2Modal.value.area && level2Modal.value.level1) {
            const response = await updateLevel2ProcessService(level2Modal.value.area.id!, level2Modal.value.level1.id!, level2Modal.value.process.id!, data.title)
            if (response.success) {
                level2Modal.value.process.title = data.title
                showNotification(response.message, 'success')
            }
        }
    } catch (error) {
        showNotification('Error al guardar el grupo de procesos', 'error')
    }
    level2Modal.value.isOpen = false
}

const handleDeleteLevel2 = (section: 'planning' | 'value' | 'support', area: AreaType, level1: Level1ProcessType, process: Level2ProcessType) => {
    const validation = canDeleteLevel2(process)
    
    deleteModal.value = {
        isOpen: true,
        title: validation.canDelete ? '¿Eliminar grupo?' : 'No se puede eliminar',
        message: validation.canDelete ? `¿Estás seguro de eliminar "${process.title}"?` : validation.message,
        hasRelatedItems: !validation.canDelete,
        relatedItemsMessage: validation.message,
        onConfirm: async () => {
            try {
                const response = await deleteLevel2ProcessService(area.id!, level1.id!, process.id!)
                if (response.success) {
                    const index = level1.level2Processes.findIndex(p => p.id === process.id)
                    if (index !== -1) {
                        level1.level2Processes.splice(index, 1)
                    }
                    showNotification(response.message, 'success')
                }
            } catch (error) {
                showNotification('Error al eliminar el grupo', 'error')
            }
            deleteModal.value.isOpen = false
        }
    }
}

// ============================================
// GESTIÓN DE PROCESOS NIVEL 3
// ============================================
const handleAddLevel3 = (section: 'planning' | 'value' | 'support', area: AreaType, level1: Level1ProcessType, level2: Level2ProcessType) => {
    level3Modal.value = { isOpen: true, mode: 'create', section, area, level1, level2, process: null }
}

const handleEditLevel3 = (section: 'planning' | 'value' | 'support', area: AreaType, level1: Level1ProcessType, level2: Level2ProcessType, process: Level3ProcessType) => {
    level3Modal.value = { isOpen: true, mode: 'edit', section, area, level1, level2, process }
}

const handleLevel3Submit = async (data: { title: string; description: string }) => {
    try {
        if (level3Modal.value.mode === 'create' && level3Modal.value.area && level3Modal.value.level1 && level3Modal.value.level2) {
            const response = await addLevel3ProcessService(level3Modal.value.area.id!, level3Modal.value.level1.id!, level3Modal.value.level2.id!, data.title, data.description)
            if (response.success) {
                const newProcess: Level3ProcessType = {
                    id: response.data.dni,
                    title: response.data.titulo,
                    description: data.description,
                    level2Id: level3Modal.value.level2.id!,
                    hasRelatedProcesses: false
                }
                level3Modal.value.level2.level3Processes.push(newProcess)
                showNotification(response.message, 'success')
            }
        } else if (level3Modal.value.process && level3Modal.value.area && level3Modal.value.level1 && level3Modal.value.level2) {
            const response = await updateLevel3ProcessService(level3Modal.value.area.id!, level3Modal.value.level1.id!, level3Modal.value.level2.id!, level3Modal.value.process.id!, data.title, data.description)
            if (response.success) {
                level3Modal.value.process.title = data.title
                level3Modal.value.process.description = data.description
                showNotification(response.message, 'success')
            }
        }
    } catch (error) {
        showNotification('Error al guardar el proceso', 'error')
    }
    level3Modal.value.isOpen = false
}

const handleDeleteLevel3 = (section: 'planning' | 'value' | 'support', area: AreaType, level1: Level1ProcessType, level2: Level2ProcessType, process: Level3ProcessType) => {
    deleteModal.value = {
        isOpen: true,
        title: '¿Eliminar proceso?',
        message: `¿Estás seguro de eliminar "${process.title}"?`,
        hasRelatedItems: false,
        relatedItemsMessage: '',
        onConfirm: async () => {
            try {
                const response = await deleteLevel3ProcessService(area.id!, level1.id!, level2.id!, process.id!)
                if (response.success) {
                    const index = level2.level3Processes.findIndex(p => p.id === process.id)
                    if (index !== -1) {
                        level2.level3Processes.splice(index, 1)
                    }
                    showNotification(response.message, 'success')
                }
            } catch (error) {
                showNotification('Error al eliminar el proceso', 'error')
            }
            deleteModal.value.isOpen = false
        }
    }
}
</script>

<template>
    <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-start justify-between">
            <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                    <button class="btn btn-ghost btn-circle" @click="goBack">
                        <ArrowLeft :size="20" />
                    </button>
                    <BaseTitle 
                        :title="valueChain?.title || 'Cargando...'" 
                        subtitle="Gestión de Cadena de Valor"
                    />
                    <button class="btn btn-ghost btn-circle" @click="editTitle" title="Editar título">
                        <Edit2 :size="18" />
                    </button>
                </div>
                
                <div class="flex gap-2 ml-16">
                    <div class="badge badge-primary">
                        {{ valueChain?.isPrimary ? 'Principal' : 'Secundaria' }}
                    </div>
                    <div class="badge badge-ghost">ID: {{ valueChainId }}</div>
                </div>
            </div>

            <BaseButton 
                text="Regresar" 
                icon="arrow-left"
                @click="goBack" 
            />
        </div>

        <!-- Loading state -->
        <div v-if="isLoading" class="flex justify-center items-center py-20">
            <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>

        <!-- Content -->
        <div v-else-if="valueChain" class="space-y-8">
            
            <!-- PLANEACIÓN -->
            <div class="card bg-gradient-to-br from-info/5 to-info/10 shadow-lg border-t-4 border-info">
                <div class="card-body">
                    <div class="flex items-center gap-3 mb-6">
                        <Layers3 :size="28" class="text-info" />
                        <h2 class="text-2xl font-bold text-info">Planeación</h2>
                    </div>
                    
                    <ValueChainSection
                        :section="valueChain.planning"
                        section-type="Planeación"
                        @add-area="(space) => handleAddArea('planning', space)"
                        @edit-area="(area) => handleEditArea('planning', area)"
                        @delete-area="(area) => handleDeleteArea('planning', area)"
                        @add-level1="(area) => handleAddLevel1('planning', area)"
                        @edit-level1="(area, l1) => handleEditLevel1('planning', area, l1)"
                        @delete-level1="(area, l1) => handleDeleteLevel1('planning', area, l1)"
                        @add-level2="(area, l1) => handleAddLevel2('planning', area, l1)"
                        @edit-level2="(area, l1, l2) => handleEditLevel2('planning', area, l1, l2)"
                        @delete-level2="(area, l1, l2) => handleDeleteLevel2('planning', area, l1, l2)"
                        @add-level3="(area, l1, l2) => handleAddLevel3('planning', area, l1, l2)"
                        @edit-level3="(area, l1, l2, l3) => handleEditLevel3('planning', area, l1, l2, l3)"
                        @delete-level3="(area, l1, l2, l3) => handleDeleteLevel3('planning', area, l1, l2, l3)"
                    />
                </div>
            </div>

            <!-- CADENA DE VALOR -->
            <div class="card bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg border-t-4 border-primary">
                <div class="card-body">
                    <div class="flex items-center gap-3 mb-6">
                        <Layers3 :size="28" class="text-primary" />
                        <h2 class="text-2xl font-bold text-primary">Cadena de Valor</h2>
                    </div>
                    
                    <ValueChainSection
                        :section="valueChain.value"
                        section-type="Cadena de valor"
                        :space-labels="valueChainLabels"
                        @add-area="(space) => handleAddArea('value', space)"
                        @edit-area="(area) => handleEditArea('value', area)"
                        @delete-area="(area) => handleDeleteArea('value', area)"
                        @add-level1="(area) => handleAddLevel1('value', area)"
                        @edit-level1="(area, l1) => handleEditLevel1('value', area, l1)"
                        @delete-level1="(area, l1) => handleDeleteLevel1('value', area, l1)"
                        @add-level2="(area, l1) => handleAddLevel2('value', area, l1)"
                        @edit-level2="(area, l1, l2) => handleEditLevel2('value', area, l1, l2)"
                        @delete-level2="(area, l1, l2) => handleDeleteLevel2('value', area, l1, l2)"
                        @add-level3="(area, l1, l2) => handleAddLevel3('value', area, l1, l2)"
                        @edit-level3="(area, l1, l2, l3) => handleEditLevel3('value', area, l1, l2, l3)"
                        @delete-level3="(area, l1, l2, l3) => handleDeleteLevel3('value', area, l1, l2, l3)"
                    />
                </div>
            </div>

            <!-- SOPORTE -->
            <div class="card bg-gradient-to-br from-success/5 to-success/10 shadow-lg border-t-4 border-success">
                <div class="card-body">
                    <div class="flex items-center gap-3 mb-6">
                        <Layers3 :size="28" class="text-success" />
                        <h2 class="text-2xl font-bold text-success">Soporte</h2>
                    </div>
                    
                    <ValueChainSection
                        :section="valueChain.support"
                        section-type="Soporte"
                        @add-area="(space) => handleAddArea('support', space)"
                        @edit-area="(area) => handleEditArea('support', area)"
                        @delete-area="(area) => handleDeleteArea('support', area)"
                        @add-level1="(area) => handleAddLevel1('support', area)"
                        @edit-level1="(area, l1) => handleEditLevel1('support', area, l1)"
                        @delete-level1="(area, l1) => handleDeleteLevel1('support', area, l1)"
                        @add-level2="(area, l1) => handleAddLevel2('support', area, l1)"
                        @edit-level2="(area, l1, l2) => handleEditLevel2('support', area, l1, l2)"
                        @delete-level2="(area, l1, l2) => handleDeleteLevel2('support', area, l1, l2)"
                        @add-level3="(area, l1, l2) => handleAddLevel3('support', area, l1, l2)"
                        @edit-level3="(area, l1, l2, l3) => handleEditLevel3('support', area, l1, l2, l3)"
                        @delete-level3="(area, l1, l2, l3) => handleDeleteLevel3('support', area, l1, l2, l3)"
                    />
                </div>
            </div>

        </div>

        <!-- Error state -->
        <div v-else class="alert alert-error">
            <span>No se pudo cargar la cadena de valor</span>
        </div>

        <!-- MODALES -->
        <ValueChainTitleModal
            :is-open="titleModal.isOpen"
            :current-title="valueChain?.title || ''"
            @close="titleModal.isOpen = false"
            @submit="handleTitleSubmit"
        />

        <AreaFormModal
            :is-open="areaModal.isOpen"
            :mode="areaModal.mode"
            :area="areaModal.area"
            @close="areaModal.isOpen = false"
            @submit="handleAreaSubmit"
        />

        <ProcessLevel1FormModal
            :is-open="level1Modal.isOpen"
            :mode="level1Modal.mode"
            :process="level1Modal.process"
            @close="level1Modal.isOpen = false"
            @submit="handleLevel1Submit"
        />

        <ProcessLevel2FormModal
            :is-open="level2Modal.isOpen"
            :mode="level2Modal.mode"
            :process="level2Modal.process"
            @close="level2Modal.isOpen = false"
            @submit="handleLevel2Submit"
        />

        <ProcessLevel3FormModal
            :is-open="level3Modal.isOpen"
            :mode="level3Modal.mode"
            :process="level3Modal.process"
            @close="level3Modal.isOpen = false"
            @submit="handleLevel3Submit"
        />

        <DeleteConfirmationModal
            :is-open="deleteModal.isOpen"
            :title="deleteModal.title"
            :message="deleteModal.message"
            :has-related-items="deleteModal.hasRelatedItems"
            :related-items-message="deleteModal.relatedItemsMessage"
            @close="deleteModal.isOpen = false"
            @confirm="deleteModal.onConfirm"
        />
    </div>
</template>
