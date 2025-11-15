export type CharterStatus = 'Borrador' | 'En Revisión' | 'Aprobado'

export type CharterType = {
    id: string
    projectName: string
    description: string
    justification: string
    objectives: string
    scope: string
    exclusions: string
    milestones: string
    budget: string
    risks: string
    stakeholders: string
    projectManager: string
    sponsor: string
    status: CharterStatus
    version: string
    createdDate: string
    approvedDate?: string
}

export type NewCharterType = {
    projectName: string
    description: string
    justification: string
    objectives: string
    scope: string
    exclusions: string
    milestones: string
    budget: string
    risks: string
    stakeholders: string
    projectManager: string
    sponsor: string
    status: CharterStatus
    version: string
}
