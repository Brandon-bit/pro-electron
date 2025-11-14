<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import BaseTitle from '@/shared/components/BaseTitle.vue'
import BpmnCanvas from '../components/bpmn/BpmnCanvas.vue'
import TaskPropertiesDialog from '../components/bpmn/TaskPropertiesDialog.vue'
import { useBpmnModeler } from '../composables/useBpmnModeler'
import { useDiagramTabs } from '../composables/useDiagramTabs'
import { useTaskProperties } from '../composables/useTaskProperties'
import { useDiagramExport } from '../composables/useDiagramExport'
import { getDiagramaDataMock } from '../services/diagramServiceMock'
import type { MDiagramaHoja } from '../types/bpmn.types'

// Importar estilos BPMN
// import 'bpmn-js/dist/assets/diagram-js.css'
// import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
// import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import '../styles/bpmn-custom.css'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const processId = Number(route.params.processId)
const diagramId = Number(route.params.diagramId)

// Estados
const isLoading = ref(true)
const model = ref<any>(null)

// Composables
const { modelers, initInstance, destroyAllInstances } = useBpmnModeler()
const { hojas, activeTab, isAddingSheet, agregarHoja, eliminarHoja, cambiarOrientacion, cambiarTab, getActiveTabIndex } = useDiagramTabs(processId, diagramId)
const { 
  isTaskDialogOpen, 
  formData, 
  visibleFields, 
  raciList, 
  openTaskForm, 
  handleSaveTask,
  showField,
  hideField,
  addRule,
  removeRule,
  addIndicator,
  removeIndicator,
  addDefinition,
  removeDefinition
} = useTaskProperties()
const { isSaving, isExporting, guardarDiagrama, guardarTodosLosDiagramas, exportarPDF } = useDiagramExport(processId, diagramId)

// Computed
const activeTabIndex = computed(() => getActiveTabIndex())
const activeModeler = computed(() => {
  const index = activeTabIndex.value
  return index >= 0 && modelers.value[index] ? modelers.value[index] : null
})
const hasUnsavedChanges = computed(() => {
  return modelers.value.some(m => m.hasUpd)
})

// Cargar datos
const loadData = async () => {
  try {
    isLoading.value = true
    console.log('[Editor] Cargando datos...', { processId, diagramId })
    
    const response = await getDiagramaDataMock(processId, diagramId)
    
    if (response.status === 'success') {
      model.value = response.data
      hojas.value = response.data.hojas
      
      // Establecer primera pestaña como activa
      if (hojas.value.length > 0) {
        activeTab.value = hojas.value[0].psn.toString()
      }
      
      console.log('[Editor] Datos cargados:', {
        proceso: response.data.proceso.nombre,
        hojas: hojas.value.length
      })
      
      // NO inicializar aquí - los componentes BpmnCanvas lo harán cuando se monten
      
      toast.success('Editor BPMN cargado correctamente')
    }
  } catch (error) {
    console.error('[Editor] Error cargando datos:', error)
    toast.error('Error al cargar el editor')
  } finally {
    isLoading.value = false
  }
}

// Inicializar modeler individual (llamado desde BpmnCanvas cuando se monta)
const handleInitModeler = async (hoja: MDiagramaHoja, index: number) => {
  console.log(`[Editor] Inicializando modeler para hoja ${index + 1}`)
  
  try {
    const modeler = await initInstance(hoja, index)
    if (modeler) {
      console.log(`[Editor] Modeler ${index + 1} inicializado correctamente`)
    }
  } catch (error) {
    console.error(`[Editor] Error inicializando hoja ${hoja.psn}:`, error)
    toast.error(`Error al cargar hoja ${index + 1}`)
  }
}

// Manejar click derecho en elemento
const handleElementContextMenu = (element: any, modeler: any) => {
  console.log('[Editor] Abriendo propiedades para:', element.type)
  openTaskForm(element, modeler)
}

// Guardar diagrama actual
const handleSave = async () => {
  if (!activeModeler.value) {
    toast.warning('No hay diagrama activo')
    return
  }
  
  await guardarDiagrama(activeModeler.value, true)
}

// Guardar todos los diagramas
const handleSaveAll = async () => {
  await guardarTodosLosDiagramas(modelers.value)
}

// Agregar nueva hoja
const handleAddSheet = async () => {
  await agregarHoja()
  // La inicialización del modeler ocurrirá automáticamente cuando
  // el nuevo BpmnCanvas se monte y emita el evento init-modeler
}

// Cambiar orientación
const handleChangeOrientation = async () => {
  const index = activeTabIndex.value
  if (index >= 0 && hojas.value[index]) {
    await cambiarOrientacion(hojas.value[index])
  }
}

// Actualizar campo del formulario
const handleUpdateField = (field: any, value: any) => {
  (formData as any)[field] = value
}

// Volver
const handleBack = () => {
  if (hasUnsavedChanges.value) {
    if (confirm('Hay cambios sin guardar. ¿Deseas salir sin guardar?')) {
      router.push({ name: 'Diagrama de Procesos' })
    }
  } else {
    router.push({ name: 'Diagrama de Procesos' })
  }
}

// Lifecycle
onMounted(async () => {
  console.log('[Editor] Vista montada')
  await loadData()
})

onUnmounted(() => {
  console.log('[Editor] Vista desmontada - destruyendo instancias')
  destroyAllInstances()
})
</script>

<template>
  <div class="container mx-auto p-6">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <BaseTitle
        :title="model?.proceso?.nombre || 'Editor de Diagrama BPMN'"
        subtitle="Edición visual de procesos de negocio"
      />
      <div class="flex gap-2">
        <button @click="handleBack" class="btn btn-ghost gap-2">
          <span class="material-symbols-outlined">arrow_back</span>
          Volver
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center items-center" style="height: 70vh;">
      <div class="text-center">
        <span class="loading loading-spinner loading-lg"></span>
        <p class="mt-4 text-base-content/70">Cargando editor BPMN...</p>
      </div>
    </div>

    <!-- Editor Principal -->
    <div v-else class="space-y-4">
      <!-- Barra de Herramientas -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body p-4">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <button 
                @click="handleSave" 
                :disabled="!activeModeler || isSaving"
                class="btn btn-primary btn-sm gap-2"
              >
                <span class="material-symbols-outlined">save</span>
                {{ isSaving ? 'Guardando...' : 'Guardar' }}
              </button>
              
              <button 
                @click="handleSaveAll" 
                :disabled="!hasUnsavedChanges || isSaving"
                class="btn btn-secondary btn-sm gap-2"
              >
                <span class="material-symbols-outlined">save_all</span>
                Guardar Todos
              </button>
              
              <div class="divider divider-horizontal"></div>
              
              <button 
                @click="exportarPDF" 
                :disabled="isExporting"
                class="btn btn-outline btn-sm gap-2"
              >
                <span class="material-symbols-outlined">picture_as_pdf</span>
                {{ isExporting ? 'Exportando...' : 'Exportar PDF' }}
              </button>
              
              <button 
                @click="handleChangeOrientation" 
                :disabled="!activeModeler"
                class="btn btn-outline btn-sm gap-2"
              >
                <span class="material-symbols-outlined">screen_rotation</span>
                Cambiar Orientación
              </button>
            </div>
            
            <div v-if="hasUnsavedChanges" class="badge badge-warning gap-2">
              <span class="material-symbols-outlined text-xs">warning</span>
              Cambios sin guardar
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs de Hojas -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-0">
          <!-- Tab Headers -->
          <div class="tabs tabs-boxed bg-base-200 p-2 rounded-t-2xl">
            <a 
              v-for="(hoja, index) in hojas" 
              :key="hoja.dni"
              :class="['tab gap-2', activeTab === hoja.psn.toString() ? 'tab-active' : '']"
              @click="cambiarTab(hoja.psn.toString())"
            >
              <span class="material-symbols-outlined text-sm">description</span>
              Hoja {{ index + 1 }}
              <span v-if="modelers[index]?.hasUpd" class="badge badge-warning badge-xs">●</span>
            </a>
            
            <button 
              @click="handleAddSheet" 
              :disabled="isAddingSheet"
              class="btn btn-sm btn-ghost gap-2 ml-2"
            >
              <span class="material-symbols-outlined">add</span>
              {{ isAddingSheet ? 'Agregando...' : 'Nueva Hoja' }}
            </button>
          </div>
          
          <!-- Tab Content -->
          <div class="p-4">
            <div v-for="(hoja, index) in hojas" :key="hoja.dni">
              <div v-show="activeTab === hoja.psn.toString()">
                <BpmnCanvas 
                  :hoja="hoja"
                  :hoja-index="index"
                  :modeler="modelers[index] || null"
                  :vertical="hoja.vertical"
                  @init-modeler="handleInitModeler"
                  @element-contextmenu="handleElementContextMenu"
                />
              </div>
            </div>
            
            <!-- Empty State -->
            <div v-if="hojas.length === 0" class="text-center py-12">
              <span class="material-symbols-outlined text-6xl text-base-content/30">note_add</span>
              <p class="mt-4 text-base-content/70">No hay hojas disponibles</p>
              <button @click="handleAddSheet" class="btn btn-primary mt-4">
                Crear Primera Hoja
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Diálogo de Propiedades -->
    <TaskPropertiesDialog
      :is-open="isTaskDialogOpen"
      :form-data="formData"
      :visible-fields="visibleFields"
      :raci-list="raciList"
      @update:is-open="isTaskDialogOpen = $event"
      @save="handleSaveTask"
      @show-field="showField"
      @hide-field="hideField"
      @update-field="handleUpdateField"
      @add-rule="addRule"
      @remove-rule="removeRule"
      @add-indicator="addIndicator"
      @remove-indicator="removeIndicator"
      @add-definition="addDefinition"
      @remove-definition="removeDefinition"
    />
  </div>
</template>
