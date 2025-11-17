export type PrioritizedProjectType = {
    priority: number
    roi: number
    risk: 'Bajo' | 'Medio' | 'Alto'
    resources: number
    dni: number
    classification: string
    name: string
    investment: 'Bajo' | 'Medio' | 'Alto'
    scope: 'Bajo' | 'Medio' | 'Alto'
    timeHorizon: 'Corto' | 'Medio' | 'Largo'
    savings: 'Bajo' | 'Medio' | 'Alto'
    benefits: 'Bajo' | 'Medio' | 'Alto'
    satisfaction: 'Bajo' | 'Medio' | 'Alto'
    inPrioritization: boolean
    active: boolean
}

export type PrioritizedProjectResponseType = {
    prioridad: number
    roi: number
    riesgo: 'Bajo' | 'Medio' | 'Alto'
    recursos: number
    dni: number
    clasificacion: string
    nombre: string
    impactoInversion: 'Bajo' | 'Medio' | 'Alto'
    impactoAlcance: 'Bajo' | 'Medio' | 'Alto'
    impactoHorizonteDeTiempo: 'Corto' | 'Medio' | 'Largo'
    impactoAhorroIngresos: 'Bajo' | 'Medio' | 'Alto'
    impactoBeneficios: 'Bajo' | 'Medio' | 'Alto'
    impactoSatisfaccionCliente: 'Bajo' | 'Medio' | 'Alto'
    enPriorizacion: boolean
    activo: boolean
}

export type PrioritizedProjectUpdateType = {
    prioridad: number
    roi: number
    riesgo: 'Bajo' | 'Medio' | 'Alto'
    recursos: number
    dni: number
    clasificacion: string
    nombre: string
    impactoInversion: 'Bajo' | 'Medio' | 'Alto'
    impactoAlcance: 'Bajo' | 'Medio' | 'Alto'
    impactoHorizonteDeTiempo: 'Corto' | 'Medio' | 'Largo'
    impactoAhorroIngresos: 'Bajo' | 'Medio' | 'Alto'
    impactoBeneficios: 'Bajo' | 'Medio' | 'Alto'
    impactoSatisfaccionCliente: 'Bajo' | 'Medio' | 'Alto'
    activo: boolean
}
