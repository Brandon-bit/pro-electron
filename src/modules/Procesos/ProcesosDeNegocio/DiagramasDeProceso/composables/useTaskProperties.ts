import { ref, reactive } from 'vue'
import type { TaskFormData, VisibleFields } from '../types/bpmn.types'

export function useTaskProperties() {
  const isTaskDialogOpen = ref(false)
  const currentTask = ref<any>(null)
  const currentModeler = ref<any>(null)
  
  const raciList = ['Director', 'Gerente', 'Coordinador', 'Analista', 'Responsable de área']
  
  const formData = reactive<TaskFormData>({
    NumAct: '',
    DescAct: '',
    Dia: '',
    Hrs: '',
    Min: '',
    R: '',
    A: '',
    C: '',
    I: '',
    Sla: '',
    Ola: '',
    Format: '',
    RespAct: '',
    System: '',
    Inx: '',
    Out: '',
    ResAct: '',
    Riesgos: '',
    RiesgoColor: '',
    BackgroundColor: '',
    Controller: '',
    RulesB: [],
    Indicadores: [],
    Definiciones: []
  })
  
  const visibleFields = reactive<VisibleFields>({
    NumAct: true,
    DescAct: true,
    tiempos: false,
    RACI: false,
    docs: false,
    formatos: false,
    entradas: false,
    resultante: false,
    riesgos: false,
    tablas: false,
    rules: false,
    indicadores: false,
    definiciones: false
  })
  
  const openTaskForm = (element: any, modeler: any) => {
    currentTask.value = element
    currentModeler.value = modeler
    
    const bo = element.businessObject
    
    // Cargar datos del elemento BPMN
    formData.NumAct = bo.$attrs['py:NumAct'] || ''
    formData.DescAct = bo.$attrs['py:DescAct'] || ''
    formData.Dia = bo.$attrs['py:Dia'] || ''
    formData.Hrs = bo.$attrs['py:Hrs'] || ''
    formData.Min = bo.$attrs['py:Min'] || ''
    formData.R = bo.$attrs['py:R'] || ''
    formData.A = bo.$attrs['py:A'] || ''
    formData.C = bo.$attrs['py:C'] || ''
    formData.I = bo.$attrs['py:I'] || ''
    formData.Sla = bo.$attrs['py:Sla'] || ''
    formData.Ola = bo.$attrs['py:Ola'] || ''
    formData.Format = bo.$attrs['py:Format'] || ''
    formData.RespAct = bo.$attrs['py:RespAct'] || ''
    formData.System = bo.$attrs['py:System'] || ''
    formData.Inx = bo.$attrs['py:Inx'] || ''
    formData.Out = bo.$attrs['py:Out'] || ''
    formData.ResAct = bo.$attrs['py:ResAct'] || ''
    formData.Riesgos = bo.$attrs['py:Riesgos'] || ''
    formData.Controller = bo.$attrs['py:Controller'] || ''
    formData.RiesgoColor = bo.$attrs['py:RiesgoColor'] || ''
    formData.BackgroundColor = bo.$attrs['py:BackgroundColor'] || ''
    
    // Parsear arrays JSON
    try {
      formData.RulesB = JSON.parse(bo.$attrs['py:RulesB'] || '[]')
      formData.Indicadores = JSON.parse(bo.$attrs['py:Indicadores'] || '[]')
      formData.Definiciones = JSON.parse(bo.$attrs['py:Definiciones'] || '[]')
    } catch (e) {
      formData.RulesB = []
      formData.Indicadores = []
      formData.Definiciones = []
    }
    
    isTaskDialogOpen.value = true
    console.log('[TASK] Formulario abierto para:', element.id)
  }
  
  const handleSaveTask = () => {
    if (!currentTask.value || !currentModeler.value) return
    
    const modeling = currentModeler.value.instance.get('modeling')
    
    // Guardar todas las propiedades
    modeling.updateProperties(currentTask.value, {
      'py:NumAct': formData.NumAct,
      'py:DescAct': formData.DescAct,
      'py:Dia': formData.Dia,
      'py:Hrs': formData.Hrs,
      'py:Min': formData.Min,
      'py:R': formData.R,
      'py:A': formData.A,
      'py:C': formData.C,
      'py:I': formData.I,
      'py:Sla': formData.Sla,
      'py:Ola': formData.Ola,
      'py:Format': formData.Format,
      'py:RespAct': formData.RespAct,
      'py:System': formData.System,
      'py:Inx': formData.Inx,
      'py:Out': formData.Out,
      'py:ResAct': formData.ResAct,
      'py:Riesgos': formData.Riesgos,
      'py:Controller': formData.Controller,
      'py:RiesgoColor': formData.RiesgoColor,
      'py:BackgroundColor': formData.BackgroundColor,
      'py:RulesB': JSON.stringify(formData.RulesB),
      'py:Indicadores': JSON.stringify(formData.Indicadores),
      'py:Definiciones': JSON.stringify(formData.Definiciones)
    })
    
    isTaskDialogOpen.value = false
    console.log('[TASK] Propiedades guardadas')
  }
  
  const showField = (field: keyof VisibleFields) => {
    visibleFields[field] = true
  }
  
  const hideField = (field: keyof VisibleFields) => {
    visibleFields[field] = false
  }
  
  const addRule = () => {
    formData.RulesB.push({ t: '' })
  }
  
  const removeRule = (index: number) => {
    formData.RulesB.splice(index, 1)
  }
  
  const addIndicator = () => {
    formData.Indicadores.push({ t: '' })
  }
  
  const removeIndicator = (index: number) => {
    formData.Indicadores.splice(index, 1)
  }
  
  const addDefinition = () => {
    formData.Definiciones.push({ t: '' })
  }
  
  const removeDefinition = (index: number) => {
    formData.Definiciones.splice(index, 1)
  }
  
  return {
    isTaskDialogOpen,
    currentTask,
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
  }
}
