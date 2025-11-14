// ===== TIPOS BASE BPMN =====
export interface MProceso {
  dni: number
  fecha: string
  nombre: string
  cantidadDiagramas: number
  habilitado: boolean
}

export interface MDiagramaHoja {
  dni: number
  doc: string        // XML BPMN
  psn: number        // Posición/número de hoja
  vertical: boolean  // Orientación (true=vertical, false=horizontal)
}

export interface MDDiagramaEditando {
  nombre: string
  fechaIni: string
  fechaFin: string
}

export interface MDDiagrama {
  dni: number
  idProceso: number
  idEstatus: number
  version: number
  fum: string
  final: boolean
  isCreator: boolean
  proceso: MProceso
  hojas: MDiagramaHoja[]
  editando: MDDiagramaEditando
}

// ===== TIPOS DE FORMULARIO =====
export interface TaskFormData {
  NumAct: string
  DescAct: string
  Dia: string
  Hrs: string
  Min: string
  R: string
  A: string
  C: string
  I: string
  Sla: string
  Ola: string
  Format: string
  RespAct: string
  System: string
  Inx: string
  Out: string
  ResAct: string
  Riesgos: string
  RiesgoColor: string
  BackgroundColor: string
  Controller: string
  RulesB: { t: string }[]
  Indicadores: { t: string }[]
  Definiciones: { t: string }[]
}

export interface SubProcessFormData {
  SPIsCV: boolean
  SPTipo: string
  SPDniEsp: number
  SPDniProc: number
  UrlExterna: string
}

export interface Espacio {
  id: number
  nombre: string
  isCV: boolean
  procesos: { id: number; nombre: string }[]
}

// ===== TIPOS DE MODELER =====
export interface BpmnModeler {
  ix: number
  dni: number
  hasUpd: boolean
  raci: string[]
  linkOut: string[]
  linkIn: string[]
  instance: any // bpmn-js instance
}

export interface VisibleFields {
  NumAct: boolean
  DescAct: boolean
  tiempos: boolean
  RACI: boolean
  docs: boolean
  formatos: boolean
  entradas: boolean
  resultante: boolean
  riesgos: boolean
  tablas: boolean
  rules: boolean
  indicadores: boolean
  definiciones: boolean
}
