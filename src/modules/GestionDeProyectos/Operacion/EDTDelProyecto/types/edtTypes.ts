// ============================================
// API RESPONSE TYPES
// ============================================

// Sub-Activity Response
export type SubActivityResponseType = {
    dni: number
    dniIniciativaActividad: number
    nombre: string
    activo: boolean
}

// Activity Response
export type ActivityResponseType = {
    dni: number
    dniIniciativaEtapa: number
    nombre: string
    subActividades: SubActivityResponseType[]
    psn: number
    dias: number
    activo: boolean
}

// Stage Response
export type StageResponseType = {
    dni: number
    dniIniciativa: number
    nombre: string
    actividades: ActivityResponseType[]
    psn: number
    activo: boolean
}

// EDT Complete Response
export type EDTResponseType = {
    dniIniciativa: number
    nombre: string
    etapas: StageResponseType[]
}

// Initiative Option
export type InitiativeOptionType = {
    dni: number
    label: string
}

// ============================================
// API REQUEST TYPES
// ============================================

// Stage Request
export type StageRequestType = {
    dni?: number | null
    dniIniciativa: number
    nombre: string
    psn: number
    activo: boolean
}

// Activity Request
export type ActivityRequestType = {
    dni?: number | null
    dniIniciativaEtapa: number
    nombre: string
    psn: number
    dias: number
    activo: boolean
}

// Sub-Activity Request
export type SubActivityRequestType = {
    dni?: number | null
    dniIniciativaActividad: number
    nombre: string
    activo: boolean
}

// ============================================
// FORM TYPES (for vee-validate)
// ============================================

export type StageFormType = {
    name: string
    psn: number
    active: boolean
}

export type ActivityFormType = {
    name: string
    psn: number
    days: number
    active: boolean
}

export type SubActivityFormType = {
    name: string
    active: boolean
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
    days?: number
    active?: boolean
    childrenCount?: number
}

// ============================================
// STORE TYPES
// ============================================

export type SelectedStageType = {
    dni: number
    name: string
    psn: number
    active: boolean
}

export type SelectedActivityType = {
    dni: number
    dniStage: number
    name: string
    psn: number
    days: number
    active: boolean
}

export type SelectedSubActivityType = {
    dni: number
    dniActivity: number
    name: string
    active: boolean
}
