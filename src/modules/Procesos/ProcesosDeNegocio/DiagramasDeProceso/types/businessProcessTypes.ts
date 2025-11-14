// ============================================
// CADENA DE VALOR
// ============================================
export type ValueChainType = {
    dni: number
    name: string
}

// ============================================
// ESPACIOS
// ============================================
export type SpaceType = {
    id: number
    nombre: string
    edit?: boolean // Para modo edición inline
    Procesos: ProcessType[] // Procesos dentro del espacio
}

export type ValueChainSpaceType = {
    dni: number
    titulo: string
    isCV: boolean // Indica que es un espacio de CV
    CVProcesos: CVProcessType[] // Procesos de cadena de valor
    lvls2?: Level2Type[] // Niveles 2 para crear procesos CV
}

// ============================================
// PROCESOS
// ============================================
export type ProcessType = {
    id: number
    nombre: string
    asis: boolean // true = Asis, false = ToBe
    edit?: boolean
    dniEspacio: number
    Diagramas: DiagramType[]
}

export type CVProcessType = {
    id: number
    nombre: string
    asis: boolean
    dniCV: number // ID de la cadena de valor
    dniLvl1: number // ID del espacio (nivel 1)
    dniLvl2?: number // ID del nivel 2 seleccionado
    dnisLvl3?: number[] // IDs de los niveles 3 seleccionados
    Diagramas: DiagramType[]
}

// ============================================
// NIVELES DE CADENA DE VALOR
// ============================================
export type Level2Type = {
    dni: number
    titulo: string
    lvls3: Level3Type[]
}

export type Level3Type = {
    id: number
    dni: number
    titulo: string
    selected: boolean // Para checkboxes
    inuse: boolean // Ya está siendo usado por otro proceso
}

// ============================================
// DIAGRAMAS
// ============================================
export type DiagramType = {
    dni: number
    version: number
    final: boolean // Versión marcada como final
    hasVoBo: boolean
    VoBo?: VoBoType[]
}

// ============================================
// VISTO BUENO (VoBo)
// ============================================
export type VoBoType = {
    id: number
    correo: string
    estatus: 'EnProceso' | 'Aprobado' | 'Rechazado' | 'Ajustes'
    comentarios: string
    fechaRevision?: Date
}

export type VoBoUserType = {
    id: number
    nombre: string
    apellidos: string
    correo: string
    selected: boolean
}

// ============================================
// FORMULARIOS
// ============================================
export type CreateSpaceFormType = {
    nombre: string
}

export type CreateProcessFormType = {
    nombre: string
    asis: boolean // true = Asis, false = ToBe
    dniEspacio: number
}

export type CreateCVProcessFormType = {
    nombre: string
    asis: boolean
    dniCV: number
    dniLvl1: number
    dniLvl2: number
    selectedLvl3Ids: number[]
}

export type RenameProcessFormType = {
    id: number
    nombre: string
}

export type CreateDiagramVersionFormType = {
    dniProceso: number
    archivoBpmn?: File | null // Archivo BPMN opcional
}

// ============================================
// RESPUESTAS DEL API
// ============================================
export type SpaceResponseType = {
    id: number
    nombre: string
}

export type ProcessResponseType = {
    id: number
    nombre: string
    asis: boolean
    dniEspacio: number
}

export type DiagramResponseType = {
    dni: number
    version: number
    final: boolean
    dniProceso: number
}
