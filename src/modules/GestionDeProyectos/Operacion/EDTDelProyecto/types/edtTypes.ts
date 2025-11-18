// ============================================
// API RESPONSE TYPES
// ============================================

// Sub-Actividad Response
export type SubActividadResponseType = {
    dni: number
    dniIniciativaActividad: number
    nombre: string
    activo: boolean
}

// Actividad Response
export type ActividadResponseType = {
    dni: number
    dniIniciativaEtapa: number
    nombre: string
    subActividades: SubActividadResponseType[]
    psn: number
    dias: number
    activo: boolean
}

// Etapa Response
export type EtapaResponseType = {
    dni: number
    dniIniciativa: number
    nombre: string
    actividades: ActividadResponseType[]
    psn: number
    activo: boolean
}

// EDT Complete Response
export type EDTResponseType = {
    dniIniciativa: number
    nombre: string
    etapas: EtapaResponseType[]
}

// Iniciativa Option
export type IniciativaOpcionType = {
    dni: number
    label: string
}

// ============================================
// API REQUEST TYPES
// ============================================

// Etapa Request
export type EtapaRequestType = {
    dni?: number | null
    dniIniciativa: number
    nombre: string
    psn: number
    activo: boolean
}

// Actividad Request
export type ActividadRequestType = {
    dni?: number | null
    dniIniciativaEtapa: number
    nombre: string
    psn: number
    dias: number
    activo: boolean
}

// Sub-Actividad Request
export type SubActividadRequestType = {
    dni?: number | null
    dniIniciativaActividad: number
    nombre: string
    activo: boolean
}

// ============================================
// FORM TYPES (for vee-validate)
// ============================================

export type EtapaFormType = {
    nombre: string
    psn: number
    activo: boolean
}

export type ActividadFormType = {
    nombre: string
    psn: number
    dias: number
    activo: boolean
}

export type SubActividadFormType = {
    nombre: string
    activo: boolean
}

// ============================================
// UI TYPES (for tree visualization)
// ============================================

export type EDTNodeType = {
    id: string
    name: string
    level: number
    children: EDTNodeType[]
    parentId: string | null
    psn?: number
    dias?: number
    activo?: boolean
    childrenCount?: number
}

// ============================================
// STORE TYPES
// ============================================

export type SelectedEtapaType = {
    dni: number
    nombre: string
    psn: number
    activo: boolean
}

export type SelectedActividadType = {
    dni: number
    dniEtapa: number
    nombre: string
    psn: number
    dias: number
    activo: boolean
}

export type SelectedSubActividadType = {
    dni: number
    dniActividad: number
    nombre: string
    activo: boolean
}
