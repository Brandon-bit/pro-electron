export type ChangeStatus = 'Abierta' | 'En Análisis' | 'Pendiente Aprobación' | 'Aprobada' | 'Rechazada' | 'Implementada'

export type ImpactType = {
    scope: string
    schedule: string
    cost: string
    quality: string
    risks: string
}

export type ChangeRequestType = {
    id: string
    title: string
    description: string
    justification: string
    requester: string
    dateRequested: string
    status: ChangeStatus
    impact: ImpactType
    approver?: string
    decision?: string
}

export type NewChangeRequestType = {
    title: string
    description: string
    justification: string
    requester: string
    impact: ImpactType
}
