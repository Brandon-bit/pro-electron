export type CauseType = {
    id: string
    text: string
    category: string
    weight: number
    votes: number
    evidence: string
}

export type CategoryType = {
    id: string
    name: string
    color: string
}

export type NewCauseType = {
    text: string
    category: string
}

export const CATEGORIES: CategoryType[] = [
    { id: 'machine', name: 'Máquina', color: '#570DF8' },
    { id: 'method', name: 'Método', color: '#F000B8' },
    { id: 'manpower', name: 'Mano de Obra', color: '#37CDBE' },
    { id: 'material', name: 'Materiales', color: '#FBBD23' },
    { id: 'environment', name: 'Medio Ambiente', color: '#F87272' },
    { id: 'measurement', name: 'Medición', color: '#36D399' }
]
