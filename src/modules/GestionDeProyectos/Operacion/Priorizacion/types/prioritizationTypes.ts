export type PrioritizedProjectType = {
    id?: number
    name: string
    classification: string
    strategicAlignment: number
    roi: string
    risks: string
    resources: string
    priority: number
    creationDate?: Date
    active: boolean
}

export type PrioritizedProjectResponseType = {
    id: number
    nombre: string
    clasificacion: string
    alineacionEstrategica: number
    roi: string
    riesgos: string
    recursos: string
    prioridad: number
    fechaCreacion: Date
    activo: boolean
    eliminado: boolean
}

export type PrioritizedProjectFormType = {
    name: string
    classification: string
    strategicAlignment: number
    roi: string
    risks: string
    resources: string
    priority: number
    active: boolean
}
