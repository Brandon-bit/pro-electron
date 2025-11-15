export type RiskType = {
    id: string
    description: string
    cause: string
    effect: string
    probability: number
    impact: number
    score: number
    strategy: string
    actions: string
    responsible: string
    status: string
    category: string
}

export type NewRiskType = {
    description: string
    cause: string
    effect: string
    probability: number
    impact: number
    strategy: string
    actions: string
    responsible: string
    category: string
}

export type RiskLevel = 'Bajo' | 'Medio' | 'Alto'

export type RiskCategory = 'Cronograma' | 'Costo' | 'Alcance' | 'Calidad' | 'Recursos' | 'Técnico'

export type RiskStrategy = 'Evitar' | 'Mitigar' | 'Transferir' | 'Aceptar' | 'Explotar' | 'Mejorar'

export type RiskStatus = 'Activo' | 'Cerrado' | 'En Seguimiento'
