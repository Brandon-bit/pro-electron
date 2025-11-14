import { ref } from 'vue'
import BpmnJS from 'bpmn-js/lib/Modeler'
import resizeTask from 'bpmn-js-task-resize/lib'
import SpanishTranslateModule from '../providers/SpanishTranslateModule'
import type { MDiagramaHoja, BpmnModeler } from '../types/bpmn.types'

export function useBpmnModeler() {
  const modelers = ref<BpmnModeler[]>([])
  
  // Extensión BPMN personalizada Proyectopolis
  const pyExtension = {
    name: "Proyectopolis",
    uri: "http://proyectopolis/schema/bpmn/py",
    prefix: "py",
    xml: { tagAlias: "lowerCase" },
    types: [{
      name: "AnalyzedNode",
      extends: ["bpmn:FlowNode"],
      properties: [
        { name: "NumAct", isAttr: true, type: "String" },
        { name: "DescAct", isAttr: true, type: "String" },
        { name: "Dia", isAttr: true, type: "String" },
        { name: "Hrs", isAttr: true, type: "String" },
        { name: "Min", isAttr: true, type: "String" },
        { name: "R", isAttr: true, type: "String" },
        { name: "A", isAttr: true, type: "String" },
        { name: "C", isAttr: true, type: "String" },
        { name: "I", isAttr: true, type: "String" },
        { name: "Format", isAttr: true, type: "String" },
        { name: "Sla", isAttr: true, type: "String" },
        { name: "Ola", isAttr: true, type: "String" },
        { name: "RespAct", isAttr: true, type: "String" },
        { name: "System", isAttr: true, type: "String" },
        { name: "Inx", isAttr: true, type: "String" },
        { name: "Out", isAttr: true, type: "String" },
        { name: "ResAct", isAttr: true, type: "String" },
        { name: "Riesgos", isAttr: true, type: "String" },
        { name: "RiesgoColor", isAttr: true, type: "String" },
        { name: "BackgroundColor", isAttr: true, type: "String" },
        { name: "Controller", isAttr: true, type: "String" },
        { name: "RulesB", isAttr: true, type: "String" },
        { name: "Indicadores", isAttr: true, type: "String" },
        { name: "Definiciones", isAttr: true, type: "String" },
        { name: "SPDniEsp", isAttr: true, type: "Number" },
        { name: "SPDniProc", isAttr: true, type: "Number" },
        { name: "UrlExterna", isAttr: true, type: "String" }
      ]
    }]
  }
  
  const initInstance = async (hoja: MDiagramaHoja, hix: number) => {
    const container = document.getElementById(`container-${hoja.psn}`)
    if (!container) {
      console.error(`[BPMN] Contenedor no encontrado: container-${hoja.psn}`)
      return null
    }
    
    console.log(`[BPMN] Inicializando instancia para hoja ${hoja.psn}`)
    
    const instance = new BpmnJS({
      container,
      keyboard: { bindTo: window },
      moddleExtensions: { py: pyExtension },
      taskResizingEnabled: true,
      additionalModules: [
        SpanishTranslateModule,
        resizeTask
      ]
    })
    
    try {
      if (hoja.doc && hoja.doc.trim() !== '') {
        await instance.importXML(hoja.doc)
        console.log(`[BPMN] XML importado para hoja ${hoja.psn}`)
      } else {
        await instance.createDiagram()
        console.log(`[BPMN] Diagrama nuevo creado para hoja ${hoja.psn}`)
      }
    } catch (error) {
      console.error(`[BPMN] Error al cargar diagrama:`, error)
      throw error
    }
    
    const modeler: BpmnModeler = {
      ix: hix,
      dni: hoja.dni,
      hasUpd: false,
      raci: [],
      linkOut: [],
      linkIn: [],
      instance
    }
    
    modelers.value.push(modeler)
    
    // Configurar eventos de cambio
    instance.on('commandStack.changed', () => {
      const index = modelers.value.findIndex(m => m.dni === modeler.dni)
      if (index !== -1) {
        modelers.value[index].hasUpd = true
      }
      console.log(`[BPMN] Cambio detectado en hoja ${hoja.psn}`)
    })
    
    console.log(`[BPMN] Instancia inicializada exitosamente`)
    return modeler
  }
  
  const destroyInstance = (dni: number) => {
    const index = modelers.value.findIndex(m => m.dni === dni)
    if (index !== -1) {
      const modeler = modelers.value[index]
      if (modeler.instance && modeler.instance.destroy) {
        modeler.instance.destroy()
      }
      modelers.value.splice(index, 1)
      console.log(`[BPMN] Instancia destruida: ${dni}`)
    }
  }
  
  const destroyAllInstances = () => {
    modelers.value.forEach(modeler => {
      if (modeler.instance && modeler.instance.destroy) {
        modeler.instance.destroy()
      }
    })
    modelers.value = []
    console.log('[BPMN] Todas las instancias destruidas')
  }
  
  const getModelerByDni = (dni: number): BpmnModeler | undefined => {
    return modelers.value.find(m => m.dni === dni)
  }
  
  return {
    modelers,
    pyExtension,
    initInstance,
    destroyInstance,
    destroyAllInstances,
    getModelerByDni
  }
}
