<script setup lang="ts">
import { onMounted, watch, onUnmounted } from 'vue'
import type { MDiagramaHoja, BpmnModeler } from '../../types/bpmn.types'

interface Props {
  hoja: MDiagramaHoja
  hojaIndex: number
  modeler: BpmnModeler | null
  vertical?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  vertical: true
})

const emit = defineEmits<{
  'init-modeler': [hoja: MDiagramaHoja, index: number]
  'element-contextmenu': [element: any, modeler: BpmnModeler]
}>()

const containerId = `container-${props.hoja.psn}`
const HIGH_PRIORITY = 1500

// Configurar eventos BPMN
const setupEvents = () => {
  if (!props.modeler) return
  
  console.log('[BpmnCanvas] Configurando eventos para hoja', props.hoja.psn)
  
  // Click derecho para abrir formulario de propiedades
  props.modeler.instance.on('element.contextmenu', HIGH_PRIORITY, (event: any) => {
    const element = event.element
    
    if (element.type === 'bpmn:Task' || 
        element.type.includes('Task') ||
        element.type === 'bpmn:SubProcess') {
      event.preventDefault()
      console.log('[BpmnCanvas] Click derecho en:', element.type)
      emit('element-contextmenu', element, props.modeler!)
    }
  })
  
  // Doble click para editar nombre directamente
  props.modeler.instance.on('element.dblclick', HIGH_PRIORITY, (event: any) => {
    const directEdit = props.modeler!.instance.get('directEditing')
    directEdit.activate(event.element)
    console.log('[BpmnCanvas] Doble click - activando edición directa')
  })
}

// Observar cambios en el modeler
watch(() => props.modeler, (newModeler) => {
  if (newModeler) {
    setupEvents()
  }
}, { immediate: true })

onMounted(() => {
  console.log('[BpmnCanvas] Montado - Container ID:', containerId)
  
  // Emitir evento para que el padre inicialice el modeler
  // AHORA el contenedor SÍ existe en el DOM
  emit('init-modeler', props.hoja, props.hojaIndex)
})

onUnmounted(() => {
  console.log('[BpmnCanvas] Desmontado - Hoja:', props.hoja.psn)
})
</script>

<template>
  <div
    :id="containerId"
    :class="[
      'py-djs-container',
      'grid',
      vertical ? '' : 'py-djs-horizontal'
    ]"
    style="height: 70vh; width: 100%; position: relative;"
  >
    <!-- El canvas BPMN se renderiza aquí automáticamente -->
  </div>
</template>

<style scoped>
/* Los estilos principales vienen de bpmn-custom.css */
.py-djs-container {
  background-color: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
</style>
