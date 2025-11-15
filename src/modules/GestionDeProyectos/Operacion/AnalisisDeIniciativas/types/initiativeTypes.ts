export type InitiativeType = {
    id?: number
    classification: string
    name: string
    investment: 'Bajo' | 'Medio' | 'Alto'
    scope: 'Bajo' | 'Medio' | 'Alto'
    timeHorizon: 'Corto' | 'Medio' | 'Largo'
    savings: 'Bajo' | 'Medio' | 'Alto'
    benefits: 'Bajo' | 'Medio' | 'Alto'
    satisfaction: 'Bajo' | 'Medio' | 'Alto'
    selected: boolean
    effortScore: number
    impactScore: number
    strategicAlignment: number
    creationDate?: Date
    active: boolean
}

export type InitiativeResponseType = {
    id: number
    clasificacion: string
    nombre: string
    inversion: 'Bajo' | 'Medio' | 'Alto'
    alcance: 'Bajo' | 'Medio' | 'Alto'
    horizonteTiempo: 'Corto' | 'Medio' | 'Largo'
    ahorro: 'Bajo' | 'Medio' | 'Alto'
    beneficios: 'Bajo' | 'Medio' | 'Alto'
    satisfaccion: 'Bajo' | 'Medio' | 'Alto'
    seleccionado: boolean
    puntajeEsfuerzo: number
    puntajeImpacto: number
    alineacionEstrategica: number
    fechaCreacion: Date
    activo: boolean
    eliminado: boolean
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
    effort: {
        investment: number
        scope: number
        timeHorizon: number
    }
    impact: {
        savings: number
        benefits: number
        satisfaction: number
    }
}
