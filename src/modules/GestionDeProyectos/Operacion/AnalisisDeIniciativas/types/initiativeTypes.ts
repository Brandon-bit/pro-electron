export type InitiativeType = {
    dni?: number
    classification: string
    name: string
    investment: 'Bajo' | 'Medio' | 'Alto'
    scope: 'Bajo' | 'Medio' | 'Alto'
    timeHorizon: 'Corto' | 'Medio' | 'Largo'
    savings: 'Bajo' | 'Medio' | 'Alto'
    benefits: 'Bajo' | 'Medio' | 'Alto'
    satisfaction: 'Bajo' | 'Medio' | 'Alto'
    inPrioritization: boolean
    effortScore?: number
    impactScore?: number
    strategicAlignment?: number
    active: boolean
}

export type InitiativeResponseType = {
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

export type InitiativeFormType = {
    classification: string
    name: string
    investment: 'Bajo' | 'Medio' | 'Alto'
    scope: 'Bajo' | 'Medio' | 'Alto'
    timeHorizon: 'Corto' | 'Medio' | 'Largo'
    savings: 'Bajo' | 'Medio' | 'Alto'
    benefits: 'Bajo' | 'Medio' | 'Alto'
    satisfaction: 'Bajo' | 'Medio' | 'Alto'
    active: boolean
}

export type MatrixCriteriaType = {
    alcance: number
    inversion: number
    horizonteDeTiempo: number
    ahorroIngresos: number
    beneficios: number
    satisfaccionAlCliente: number
}

export type CriteriaResponseType = {
    criteriosExisten: boolean
    alcance: number
    inversion: number
    horizonteDeTiempo: number
    ahorroIngresos: number
    beneficios: number
    satisfaccionAlCliente: number
}

export type CriteriaRequestType = {
    alcance: number
    inversion: number
    horizonteDeTiempo: number
    ahorroIngresos: number
    beneficios: number
    satisfaccionAlCliente: number
}
